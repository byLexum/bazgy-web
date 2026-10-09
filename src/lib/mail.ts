// Server-side only: imported from "use server" action files.
import { headers } from "next/headers";
import nodemailer, { type Attachment } from "nodemailer";

export type MailErrorCode = "rateLimited" | "unavailable" | "failed";

// Best-effort throttle per server instance; enough to blunt a script hammering
// the forms without pulling in a datastore for a corporate site.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

export async function isRateLimited(scope: string) {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const key = `${scope}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Single-line fields end up in mail headers; never let a newline through.
export function readField(formData: FormData, name: string, multiline = false) {
  const raw = formData.get(name);
  const value = typeof raw === "string" ? raw.trim() : "";
  return multiline ? value : value.replace(/[\r\n]+/g, " ");
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_RE = /^[0-9+()\-\s.]{7,}$/;

export function renderMail(rows: [string, string][], body: string, footer: string) {
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", body, "", "—", footer].join("\n");
  const html = `
    <table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="color:#666;padding-right:16px;vertical-align:top">${k}</td><td>${escapeHtml(v)}</td></tr>`
        )
        .join("")}
    </table>
    ${body ? `<p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;white-space:pre-wrap;margin-top:20px">${escapeHtml(body)}</p>` : ""}
    <p style="font-family:Arial,sans-serif;font-size:12px;color:#999;margin-top:28px">${escapeHtml(footer)}</p>
  `;
  return { text, html };
}

export async function sendSiteMail(options: {
  to?: string;
  replyTo: { name: string; address: string };
  subject: string;
  text: string;
  html: string;
  attachments?: Attachment[];
}): Promise<MailErrorCode | null> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    console.error("[mail] SMTP_HOST, SMTP_USER and SMTP_PASS must be set to send mail.");
    return "unavailable";
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;

  try {
    const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
    await transporter.sendMail({
      from: { name: "BAZ Web Sitesi", address: process.env.CONTACT_FROM || user },
      to: options.to || process.env.CONTACT_TO || "info@bazgy.com",
      replyTo: options.replyTo,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments,
    });
    return null;
  } catch (error) {
    console.error("[mail] sending failed:", error);
    return "failed";
  }
}
