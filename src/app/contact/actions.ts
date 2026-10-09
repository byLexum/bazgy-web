"use server";

import {
  EMAIL_RE,
  PHONE_RE,
  isRateLimited,
  readField,
  renderMail,
  sendSiteMail,
  type MailErrorCode,
} from "@/lib/mail";

export type ContactField = "name" | "email" | "phone" | "subject" | "message";

export type ContactFieldError = "required" | "invalid" | "tooLong" | "tooShort";

export type ContactErrorCode = "validation" | MailErrorCode;

export type ContactState = {
  status: "idle" | "success" | "error";
  code?: ContactErrorCode;
  fieldErrors?: Partial<Record<ContactField, ContactFieldError>>;
  values?: Partial<Record<ContactField, string>>;
};

const LIMITS: Record<ContactField, { max: number; min?: number; required: boolean }> = {
  name: { max: 120, min: 2, required: true },
  email: { max: 200, required: true },
  phone: { max: 40, required: false },
  subject: { max: 160, required: false },
  message: { max: 5000, min: 10, required: true },
};

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const values = {
    name: readField(formData, "name"),
    email: readField(formData, "email"),
    phone: readField(formData, "phone"),
    subject: readField(formData, "subject"),
    message: readField(formData, "message", true),
  };

  // Honeypot: real visitors never see or fill this field. Pretend it worked.
  if (readField(formData, "company")) {
    return { status: "success" };
  }

  const fieldErrors: ContactState["fieldErrors"] = {};
  for (const field of Object.keys(LIMITS) as ContactField[]) {
    const value = values[field];
    const rule = LIMITS[field];
    if (!value) {
      if (rule.required) fieldErrors[field] = "required";
      continue;
    }
    if (value.length > rule.max) fieldErrors[field] = "tooLong";
    else if (rule.min && value.length < rule.min) fieldErrors[field] = "tooShort";
  }
  if (values.email && !fieldErrors.email && !EMAIL_RE.test(values.email)) {
    fieldErrors.email = "invalid";
  }
  if (values.phone && !fieldErrors.phone && !PHONE_RE.test(values.phone)) {
    fieldErrors.phone = "invalid";
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", code: "validation", fieldErrors, values };
  }

  if (await isRateLimited("contact")) {
    return { status: "error", code: "rateLimited", values };
  }

  const { text, html } = renderMail(
    [
      ["Ad Soyad", values.name],
      ["E-posta", values.email],
      ["Telefon", values.phone || "—"],
      ["Konu", values.subject || "—"],
    ],
    values.message,
    "bazgy.com iletişim formu üzerinden gönderildi."
  );

  const error = await sendSiteMail({
    replyTo: { name: values.name, address: values.email },
    subject: `Web sitesi iletişim formu: ${values.subject || values.name}`,
    text,
    html,
  });
  if (error) return { status: "error", code: error, values };

  return { status: "success" };
}
