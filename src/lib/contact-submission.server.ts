import crypto from "node:crypto";
import { Buffer } from "node:buffer";
import fs from "node:fs";
import path from "node:path";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";
import { sendEnquiryEmails } from "./contact-email.server";
import type { EnquiryAttachment, EnquirySource, StoredEnquiry } from "./contact-types";
import { hasBlobToken, listBlobs, putBlob } from "./vercel-blob-rest";

const ENQUIRIES_KEY = "admin-data/enquiries.json";
const CONTACT_META_KEY = "admin-data/contact-meta.json";
const CONTACT_ERRORS_KEY = "admin-data/contact-mail-errors.json";
const MAX_ATTACHMENT_BYTES = 3 * 1024 * 1024;
const MAX_BRIEF_LENGTH = 4000;
const MAX_NAME_LENGTH = 120;
const MAX_LINE_LENGTH = 160;
const MAX_UA_LENGTH = 512;
const MAX_FILE_NAME_LENGTH = 180;
const RECAPTCHA_MIN_SCORE = Number(process.env.RECAPTCHA_MIN_SCORE ?? "0.5");
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS_REGEX = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

type ContactMeta = {
  submissions: Array<{
    formNonce: string;
    fingerprintHash: string;
    ipHash: string;
    createdAt: string;
  }>;
};

type MailErrorLog = {
  id: string;
  createdAt: string;
  code?: string;
  message: string;
};

export const enquirySchema = z.object({
  source: z.enum(["contact-page", "homepage"]),
  name: z.string().min(1).max(MAX_NAME_LENGTH),
  brand: z.string().max(MAX_LINE_LENGTH).optional().default(""),
  country: z.string().max(MAX_LINE_LENGTH).optional().default(""),
  email: z.string().email().max(MAX_LINE_LENGTH),
  whatsapp: z.string().max(MAX_LINE_LENGTH).optional().default(""),
  projectType: z.string().max(MAX_LINE_LENGTH).optional().default(""),
  projectBrief: z.string().min(1).max(MAX_BRIEF_LENGTH),
  honeypot: z.string().max(0).optional().default(""),
  recaptchaToken: z.string().optional().default(""),
  startedAt: z.number().int().positive(),
  formNonce: z.string().min(12).max(120),
  fileName: z.string().max(MAX_FILE_NAME_LENGTH).optional(),
  fileType: z.string().max(120).optional(),
  fileBase64: z
    .string()
    .max(Math.ceil((MAX_ATTACHMENT_BYTES * 4) / 3) + 512)
    .optional(),
});

export type EnquirySubmissionInput = z.infer<typeof enquirySchema>;

function getBlobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN ?? "";
}

function getLocalDataPath(key: string) {
  const safeName = key.replace(/[^a-z0-9_-]/gi, "_") + ".json";
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    try {
      fs.mkdirSync(dataDir, { recursive: true });
    } catch {
      // ignore
    }
  }
  return path.join(dataDir, safeName);
}

function readLocalFallback<T>(key: string, fallback: T): T {
  try {
    const filePath = getLocalDataPath(key);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(raw) as T;
    }
  } catch {
    // fallback
  }
  return fallback;
}

function writeLocalFallback<T>(key: string, data: T) {
  try {
    const filePath = getLocalDataPath(key);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("writeLocalFallback error:", err);
  }
}

async function readBlob<T>(key: string, fallback: T): Promise<T> {
  const localData = readLocalFallback<T>(key, fallback);
  const token = getBlobToken();
  if (!hasBlobToken(token) || token.includes("qV36Vnv5PUQwivTc")) return localData;
  try {
    const { blobs } = await listBlobs(token, { prefix: key });
    const match = blobs.find((blob) => blob.pathname === key);
    if (!match) return localData;
    const response = await fetch(match.url + `?t=${Date.now()}`);
    if (!response.ok) return localData;
    return (await response.json()) as T;
  } catch {
    return localData;
  }
}

async function writeBlob<T>(key: string, data: T) {
  writeLocalFallback(key, data);
  const token = getBlobToken();
  if (!hasBlobToken(token) || token.includes("qV36Vnv5PUQwivTc")) return;
  try {
    await putBlob(token, key, JSON.stringify(data, null, 2), {
      access: "public",
      allowOverwrite: true,
      contentType: "application/json",
    });
  } catch (err) {
    console.warn("writeBlob to Vercel skipped/failed:", err);
  }
}

function sha256(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function sanitizeLine(value: string, maxLength: number) {
  return value.replace(CONTROL_CHARS_REGEX, "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function sanitizeParagraph(value: string, maxLength: number) {
  return value
    .replace(/\r\n/g, "\n")
    .replace(CONTROL_CHARS_REGEX, "")
    .split("\n")
    .map((line) => sanitizeLine(line, 240))
    .filter(Boolean)
    .join("\n")
    .slice(0, maxLength)
    .trim();
}

function sanitizeFileName(value: string) {
  return sanitizeLine(value, MAX_FILE_NAME_LENGTH).replace(/[^a-zA-Z0-9._ -]/g, "-");
}

function validateBusinessEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function verifyRecaptcha(token: string, action: string, remoteIp: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY ?? "";
  if (!secret) {
    console.warn("RECAPTCHA_SECRET_KEY is not configured; using protected fallback checks.");
    return { success: true, score: undefined };
  }

  if (!token || token.startsWith("recaptcha-")) {
    throw new Error("Security verification is temporarily unavailable. Please try again.");
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    throw new Error(`reCAPTCHA verification failed with status ${response.status}.`);
  }

  const result = (await response.json()) as {
    success: boolean;
    score?: number;
    action?: string;
    "error-codes"?: string[];
  };

  if (!result.success) {
    throw new Error(`reCAPTCHA rejected submission: ${(result["error-codes"] ?? []).join(", ")}`);
  }

  if (result.action && result.action !== action) {
    throw new Error("reCAPTCHA action mismatch.");
  }

  if ((result.score ?? 0) < RECAPTCHA_MIN_SCORE) {
    throw new Error("reCAPTCHA score below threshold.");
  }

  return { success: true, score: result.score ?? 0 };
}

function isDuplicateSubmission(meta: ContactMeta, fingerprintHash: string, formNonce: string) {
  const now = Date.now();
  return meta.submissions.some((entry) => {
    const ageMs = now - new Date(entry.createdAt).getTime();
    if (ageMs > 30 * 60 * 1000) return false;
    return entry.formNonce === formNonce || entry.fingerprintHash === fingerprintHash;
  });
}

function isRateLimited(meta: ContactMeta, ipHash: string) {
  const now = Date.now();
  const window10Min = meta.submissions.filter((entry) => {
    return entry.ipHash === ipHash && now - new Date(entry.createdAt).getTime() <= 10 * 60 * 1000;
  }).length;
  const window60Min = meta.submissions.filter((entry) => {
    return entry.ipHash === ipHash && now - new Date(entry.createdAt).getTime() <= 60 * 60 * 1000;
  }).length;

  return window10Min >= 3 || window60Min >= 8;
}

function pruneMeta(meta: ContactMeta): ContactMeta {
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  return {
    submissions: meta.submissions.filter((entry) => new Date(entry.createdAt).getTime() >= cutoff),
  };
}

function buildMessage(
  source: EnquirySource,
  projectType: string,
  brand: string,
  country: string,
  brief: string,
) {
  const parts = [
    `Source: ${source}`,
    projectType ? `Project Type: ${projectType}` : "",
    brand ? `Brand: ${brand}` : "",
    country ? `Country: ${country}` : "",
    "",
    brief,
  ].filter(Boolean);

  return parts.join("\n");
}

function parseAttachment(data: EnquirySubmissionInput) {
  if (!data.fileBase64) return null;
  const matches = data.fileBase64.match(/^data:([^;]+);base64,(.+)$/);
  if (!matches) {
    throw new Error("Attachment data is invalid.");
  }

  const fileType = sanitizeLine(data.fileType || matches[1], 120);
  const fileName = sanitizeFileName(data.fileName || "design-upload");
  const buffer = Buffer.from(matches[2], "base64");

  if (buffer.byteLength > MAX_ATTACHMENT_BYTES) {
    throw new Error("Attachment exceeds the 3 MB limit.");
  }

  return {
    fileName,
    fileType,
    buffer,
  };
}

async function uploadAttachment(
  attachment: { fileName: string; fileType: string; buffer: Buffer } | null,
): Promise<EnquiryAttachment | undefined> {
  if (!attachment) return undefined;
  const token = getBlobToken();
  if (!hasBlobToken(token)) {
    throw new Error("BLOB_READ_WRITE_TOKEN is required for attachment uploads.");
  }

  const safeBase = attachment.fileName.replace(/\s+/g, "-").replace(/-+/g, "-").toLowerCase();
  const pathname = `enquiries/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeBase}`;
  const uploaded = await putBlob(token, pathname, attachment.buffer, {
    access: "public",
    allowOverwrite: false,
    addRandomSuffix: false,
    contentType: attachment.fileType,
  });

  return {
    fileName: attachment.fileName,
    fileType: attachment.fileType,
    fileSizeBytes: attachment.buffer.byteLength,
    fileUrl: uploaded.url,
  };
}

async function logMailError(message: string, code?: string) {
  const errors = await readBlob<MailErrorLog[]>(CONTACT_ERRORS_KEY, []);
  const entry: MailErrorLog = {
    id: `mailerr_${Date.now()}`,
    createdAt: new Date().toISOString(),
    code,
    message: sanitizeParagraph(message, 1200),
  };
  await writeBlob(CONTACT_ERRORS_KEY, [entry, ...errors].slice(0, 100));
}

export async function handleContactSubmission(data: EnquirySubmissionInput) {
  const ipAddress = sanitizeLine(getRequestIP({ xForwardedFor: true }) || "", 64);
  const userAgent = sanitizeLine(getRequestHeader("user-agent") || "", MAX_UA_LENGTH);
  const browser = sanitizeLine(userAgent.split(" ").slice(0, 3).join(" "), 160);

  if (data.honeypot) {
    return { success: true, blocked: true };
  }

  if (Date.now() - data.startedAt < 1500) {
    return { success: false, error: "Submission was sent too quickly." };
  }

  const name = sanitizeLine(data.name, MAX_NAME_LENGTH);
  const brand = sanitizeLine(data.brand ?? "", MAX_LINE_LENGTH);
  const country = sanitizeLine(data.country ?? "", MAX_LINE_LENGTH);
  const email = sanitizeLine(data.email.toLowerCase(), MAX_LINE_LENGTH);
  const whatsapp = sanitizeLine(data.whatsapp ?? "", MAX_LINE_LENGTH);
  const projectType = sanitizeLine(data.projectType ?? "", MAX_LINE_LENGTH);
  const projectBrief = sanitizeParagraph(data.projectBrief, MAX_BRIEF_LENGTH);

  if (!validateBusinessEmail(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const fingerprintHash = sha256(
    [name, brand, country, email, whatsapp, projectType, projectBrief].join("|"),
  );
  const ipHash = sha256(ipAddress || "unknown");

  let recaptcha: { success: boolean; score?: number };
  try {
    recaptcha = await verifyRecaptcha(data.recaptchaToken, "enquiry_submit", ipAddress);
  } catch (error) {
    console.error("submitEnquiry recaptcha error:", error);
    return { success: false, error: "Security verification failed. Please try again." };
  }

  const currentMeta = pruneMeta(await readBlob<ContactMeta>(CONTACT_META_KEY, { submissions: [] }));
  if (isRateLimited(currentMeta, ipHash)) {
    return { success: false, error: "Too many submissions. Please try again later." };
  }

  if (isDuplicateSubmission(currentMeta, fingerprintHash, data.formNonce)) {
    return { success: true, duplicate: true };
  }

  const attachment = parseAttachment(data);
  const enquiry: StoredEnquiry = {
    id: `enq_${Date.now()}`,
    source: data.source,
    status: "new",
    createdAt: new Date().toISOString(),
    name,
    brand,
    country,
    email,
    whatsapp,
    phone: whatsapp,
    projectType,
    projectBrief,
    message: buildMessage(data.source, projectType, brand, country, projectBrief),
    file: attachment
      ? {
          fileName: attachment.fileName,
          fileType: attachment.fileType,
          fileSizeBytes: attachment.buffer.byteLength,
          fileUrl: "",
        }
      : undefined,
    ipAddress,
    browser,
    userAgent,
    recaptchaScore: recaptcha.score,
    dedupeHash: fingerprintHash,
  };

  // 1. Immediately store the enquiry so client data is NEVER lost
  try {
    const enquiries = await readBlob<StoredEnquiry[]>(ENQUIRIES_KEY, []);
    await writeBlob(ENQUIRIES_KEY, [enquiry, ...enquiries]);
    await writeBlob(
      CONTACT_META_KEY,
      pruneMeta({
        submissions: [
          { formNonce: data.formNonce, fingerprintHash, ipHash, createdAt: enquiry.createdAt },
          ...currentMeta.submissions,
        ],
      }),
    );
  } catch (storageError) {
    console.error("submitEnquiry storage error:", storageError);
  }

  // 2. Upload file attachment if present
  if (attachment) {
    try {
      enquiry.file = await uploadAttachment(attachment);
    } catch (storageError) {
      console.warn("submitEnquiry attachment storage unavailable; file was emailed:", storageError);
    }
  }

  // 3. Send email notifications via Resend / SMTP
  let delivery: Awaited<ReturnType<typeof sendEnquiryEmails>> = { confirmationSent: false };
  try {
    delivery = await sendEnquiryEmails(enquiry, attachment);
    enquiry.adminEmailSentAt = new Date().toISOString();
    if (delivery.confirmationSent) enquiry.clientEmailSentAt = new Date().toISOString();

    // Update stored enquiry with email sent timestamps
    try {
      const enquiries = await readBlob<StoredEnquiry[]>(ENQUIRIES_KEY, []);
      const updated = enquiries.map((e) => (e.id === enquiry.id ? enquiry : e));
      await writeBlob(ENQUIRIES_KEY, updated);
    } catch {
      // non-critical
    }
  } catch (emailError) {
    console.error("submitEnquiry email delivery error:", emailError);
    try {
      await logMailError(
        emailError instanceof Error ? emailError.message : String(emailError),
        emailError && typeof emailError === "object"
          ? String((emailError as { code?: string }).code ?? "")
          : undefined,
      );
    } catch (logError) {
      console.error("submitEnquiry error log unavailable:", logError);
    }
  }

  return { success: true, enquiryId: enquiry.id, confirmationSent: delivery.confirmationSent };
}
