import crypto from "node:crypto";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type { StoredEnquiry } from "./contact-types";

type DeliveryResult = {
  adminMessageId?: string;
  clientMessageId?: string;
};

type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromEmail: string;
  fromName: string;
  websiteUrl: string;
  websiteHost: string;
  businessInbox: string;
  replyInbox: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-IN", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "Asia/Kolkata",
  });
}

function parseMailbox(value: string) {
  const match = value.match(/<([^>]+)>/);
  return (match?.[1] ?? value).replaceAll('"', "").trim();
}

function getMailConfig(): MailConfig {
  const websiteUrl = (process.env.WEBSITE_URL ?? "https://www.zardosiatelier.com").replace(/\/$/, "");
  const smtpUser = (process.env.SMTP_USER ?? process.env.GMAIL_USER ?? "").trim();
  const smtpPass = (process.env.SMTP_PASS ?? process.env.GMAIL_APP_PASSWORD ?? "").trim();
  const fromValue = (process.env.MAIL_FROM_EMAIL ?? process.env.MAIL_FROM ?? smtpUser).trim();
  const fromEmail = parseMailbox(fromValue || "aryanthealgohype@gmail.com");
  const fromName = (process.env.MAIL_FROM_NAME ?? "Zardosi Atelier").trim();
  const host = (process.env.SMTP_HOST ?? "smtp.gmail.com").trim();
  const port = Number(process.env.SMTP_PORT ?? "465");

  return {
    host,
    port,
    secure: String(process.env.SMTP_SECURE ?? "true") !== "false",
    user: smtpUser,
    pass: smtpPass,
    fromEmail,
    fromName,
    websiteUrl,
    websiteHost: new URL(websiteUrl).host,
    businessInbox: (
      process.env.BUSINESS_INBOX ??
      process.env.NOTIFICATION_EMAIL ??
      "aryanthealgohype@gmail.com"
    ).trim(),
    replyInbox: (process.env.REPLY_INBOX ?? fromEmail).trim(),
  };
}

function ensureMailConfig(config: MailConfig) {
  if (!config.user || !config.pass) {
    throw new Error("SMTP_USER/SMTP_PASS or GMAIL_USER/GMAIL_APP_PASSWORD must be configured.");
  }
  if (!config.businessInbox) {
    throw new Error("BUSINESS_INBOX or NOTIFICATION_EMAIL must be configured.");
  }
}

function createTransport(config: MailConfig) {
  const options: SMTPTransport.Options = {
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: !config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      minVersion: "TLSv1.2",
      servername: config.host,
    },
  };

  return nodemailer.createTransport(options);
}

function messageId(domain: string) {
  return `<${crypto.randomUUID()}.${Date.now()}@${domain}>`;
}

function adminText(enquiry: StoredEnquiry, config: MailConfig) {
  return [
    "---------------------------------------",
    "New Commission Inquiry Received",
    "",
    "Name:",
    enquiry.name,
    "",
    "Email:",
    enquiry.email,
    "",
    "Project Type:",
    enquiry.projectType || "Not provided",
    "",
    "Project Details:",
    enquiry.projectBrief,
    "",
    "Submitted At:",
    formatTimestamp(enquiry.createdAt),
    "",
    "Website:",
    config.websiteUrl,
    "",
    "User IP:",
    enquiry.ipAddress || "Unavailable",
    "---------------------------------------",
  ].join("\n");
}

function customerText(enquiry: StoredEnquiry, config: MailConfig) {
  return [
    `Dear ${enquiry.name},`,
    "",
    "Thank you for contacting Zardosi Atelier.",
    "",
    "We have successfully received your inquiry. Our team will review your requirements and get back to you as soon as possible.",
    "",
    "Best Regards,",
    "Zardosi Atelier",
    config.websiteUrl,
  ].join("\n");
}

function textToHtml(text: string) {
  return `<div style="font-family:Georgia,'Times New Roman',serif;background:#fbf7f1;color:#1f1a17;padding:28px"><pre style="white-space:pre-wrap;font-family:Arial,sans-serif;font-size:15px;line-height:1.7;margin:0">${escapeHtml(text)}</pre></div>`;
}

function isRetryableSmtpError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const err = error as { code?: string; responseCode?: number };
  if (typeof err.responseCode === "number" && [421, 450, 451, 452].includes(err.responseCode)) {
    return true;
  }
  return ["ETIMEDOUT", "ECONNECTION", "ESOCKET", "EENVELOPE"].includes(err.code ?? "");
}

async function withRetry<T>(task: () => Promise<T>) {
  const delays = [0, 600, 1800];
  let lastError: unknown;
  for (const delay of delays) {
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    try {
      return await task();
    } catch (error) {
      lastError = error;
      if (!isRetryableSmtpError(error)) break;
    }
  }
  throw lastError;
}

export async function sendEnquiryEmails(enquiry: StoredEnquiry): Promise<DeliveryResult> {
  const config = getMailConfig();
  ensureMailConfig(config);

  const transporter = createTransport(config);
  await transporter.verify();

  const from = `"${config.fromName}" <${config.fromEmail}>`;
  const adminMessageId = messageId(config.websiteHost);
  const clientMessageId = messageId(config.websiteHost);
  const adminBody = adminText(enquiry, config);
  const customerBody = customerText(enquiry, config);

  await withRetry(async () => {
    await transporter.sendMail({
      from,
      to: "aryanthealgohype@gmail.com",
      replyTo: enquiry.email,
      subject: "New Commission Inquiry | Zardosi Atelier",
      text: adminBody,
      html: textToHtml(adminBody),
      messageId: adminMessageId,
      date: new Date(),
    });
  });

  await withRetry(async () => {
    await transporter.sendMail({
      from,
      to: enquiry.email,
      replyTo: "aryanthealgohype@gmail.com",
      subject: "Thank You for Contacting Zardosi Atelier",
      text: customerBody,
      html: textToHtml(customerBody),
      messageId: clientMessageId,
      date: new Date(),
    });
  });

  return { adminMessageId, clientMessageId };
}
