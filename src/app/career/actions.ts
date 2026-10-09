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

export type ApplicationField = "name" | "email" | "phone" | "position" | "message" | "cv";

export type ApplicationFieldError =
  | "required"
  | "invalid"
  | "tooLong"
  | "tooShort"
  | "cvRequired"
  | "cvType"
  | "cvSize";

export type ApplicationState = {
  status: "idle" | "success" | "error";
  code?: "validation" | MailErrorCode;
  fieldErrors?: Partial<Record<ApplicationField, ApplicationFieldError>>;
  values?: Partial<Record<Exclude<ApplicationField, "cv">, string>>;
};

// Keep in sync with CV_MAX_BYTES in CareerApplicationForm and bodySizeLimit in next.config.ts.
const MAX_CV_BYTES = 4 * 1024 * 1024;

// Extension plus file signature, so a renamed executable does not pass as a CV.
const CV_TYPES: { ext: string; mime: string; magic: number[] }[] = [
  { ext: "pdf", mime: "application/pdf", magic: [0x25, 0x50, 0x44, 0x46] },
  {
    ext: "docx",
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    magic: [0x50, 0x4b, 0x03, 0x04],
  },
  { ext: "doc", mime: "application/msword", magic: [0xd0, 0xcf, 0x11, 0xe0] },
];

async function checkCv(file: File) {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const type = CV_TYPES.find((t) => t.ext === ext);
  if (!type) return { error: "cvType" as const };
  if (file.size > MAX_CV_BYTES) return { error: "cvSize" as const };
  const bytes = Buffer.from(await file.arrayBuffer());
  if (!type.magic.every((b, i) => bytes[i] === b)) return { error: "cvType" as const };
  return { bytes, type };
}

export async function sendApplication(
  _prev: ApplicationState,
  formData: FormData
): Promise<ApplicationState> {
  const values = {
    name: readField(formData, "name"),
    email: readField(formData, "email"),
    phone: readField(formData, "phone"),
    position: readField(formData, "position"),
    message: readField(formData, "message", true),
  };

  if (readField(formData, "company")) {
    return { status: "success" };
  }

  const fieldErrors: ApplicationState["fieldErrors"] = {};
  if (!values.name) fieldErrors.name = "required";
  else if (values.name.length < 2) fieldErrors.name = "tooShort";
  else if (values.name.length > 120) fieldErrors.name = "tooLong";

  if (!values.email) fieldErrors.email = "required";
  else if (values.email.length > 200 || !EMAIL_RE.test(values.email)) fieldErrors.email = "invalid";

  if (!values.phone) fieldErrors.phone = "required";
  else if (values.phone.length > 40 || !PHONE_RE.test(values.phone)) fieldErrors.phone = "invalid";

  if (!values.position) fieldErrors.position = "required";
  else if (values.position.length > 120) fieldErrors.position = "tooLong";

  if (values.message.length > 5000) fieldErrors.message = "tooLong";

  const cv = formData.get("cv");
  let attachment: { filename: string; content: Buffer; contentType: string } | null = null;
  if (!(cv instanceof File) || cv.size === 0) {
    fieldErrors.cv = "cvRequired";
  } else {
    const checked = await checkCv(cv);
    if ("error" in checked) {
      fieldErrors.cv = checked.error;
    } else {
      const safeName = values.name.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "") || "aday";
      attachment = {
        filename: `CV-${safeName}.${checked.type.ext}`,
        content: checked.bytes,
        contentType: checked.type.mime,
      };
    }
  }

  if (Object.keys(fieldErrors).length > 0 || !attachment) {
    return { status: "error", code: "validation", fieldErrors, values };
  }

  if (await isRateLimited("career")) {
    return { status: "error", code: "rateLimited", values };
  }

  const { text, html } = renderMail(
    [
      ["Pozisyon", values.position],
      ["Ad Soyad", values.name],
      ["E-posta", values.email],
      ["Telefon", values.phone],
      ["Özgeçmiş", attachment.filename],
    ],
    values.message,
    "bazgy.com kariyer başvuru formu üzerinden gönderildi. Özgeçmiş ekte."
  );

  const error = await sendSiteMail({
    to: process.env.CAREER_TO || undefined,
    replyTo: { name: values.name, address: values.email },
    subject: `İş başvurusu: ${values.position} — ${values.name}`,
    text,
    html,
    attachments: [attachment],
  });
  if (error) return { status: "error", code: error, values };

  return { status: "success" };
}
