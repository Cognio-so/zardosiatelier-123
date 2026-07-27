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
  logoUrl: string;
  companyName: string;
  address: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function compressHtml(html: string) {
  return html.replace(/>\s+</g, "><").replace(/\s{2,}/g, " ").trim();
}

function formatTimestamp(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toUTCString();
}

function getMailConfig(): MailConfig {
  const websiteUrl = (process.env.WEBSITE_URL ?? "https://www.zardosiatelier.com").replace(
    /\/$/,
    "",
  );
  const fromEmail = (process.env.MAIL_FROM_EMAIL ?? "info@zardosiatelier.com").trim();
  const fromName = (process.env.MAIL_FROM_NAME ?? "Zardosi Atelier").trim();
  const logoUrl = process.env.EMAIL_LOGO_URL ?? `${websiteUrl}/email-logo.png`;
  const smtpUser = (process.env.SMTP_USER ?? process.env.GMAIL_USER ?? "").trim();
  const smtpPass = (process.env.SMTP_PASS ?? process.env.GMAIL_APP_PASSWORD ?? "").trim();
  const host = (process.env.SMTP_HOST ?? "smtp.gmail.com").trim();
  const port = Number(process.env.SMTP_PORT ?? "465");
  const websiteHost = new URL(websiteUrl).host;

  return {
    host,
    port,
    secure: String(process.env.SMTP_SECURE ?? "true") !== "false",
    user: smtpUser,
    pass: smtpPass,
    fromEmail,
    fromName,
    websiteUrl,
    websiteHost,
    businessInbox: (process.env.BUSINESS_INBOX ?? fromEmail).trim(),
    replyInbox: (process.env.REPLY_INBOX ?? fromEmail).trim(),
    logoUrl,
    companyName: process.env.COMPANY_NAME ?? "Zardosi Atelier",
    address: process.env.COMPANY_ADDRESS ?? "Mumbai, Maharashtra, India",
  };
}

function ensureProductionMailConfig(config: MailConfig) {
  if (!config.user || !config.pass) {
    throw new Error("SMTP_USER and SMTP_PASS must be configured.");
  }

  if (!/^[^@\s]+@zardosiatelier\.com$/i.test(config.fromEmail)) {
    throw new Error("MAIL_FROM_EMAIL must use the zardosiatelier.com domain.");
  }
}

function createTransport(config: MailConfig) {
  const options: SMTPTransport.Options = {
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: true,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      minVersion: "TLSv1.2",
      servername: config.host,
      rejectUnauthorized: true,
    },
  };

  return nodemailer.createTransport(options);
}

function generateMessageId(domain: string) {
  return `<${crypto.randomUUID()}.${Date.now()}@${domain}>`;
}

function buildMailHeaders(messageId: string, replyTo: string, returnPath: string, priority: string) {
  return {
    "Message-ID": messageId,
    Date: new Date().toUTCString(),
    "MIME-Version": "1.0",
    "Content-Type": 'text/html; charset="UTF-8"',
    "Reply-To": replyTo,
    "Return-Path": returnPath,
    "X-Mailer": "Zardosi Atelier Enquiry System",
    Priority: priority,
    "X-Priority": priority === "high" ? "1" : "3",
  };
}

function renderShell(title: string, intro: string, body: string, config: MailConfig) {
  return compressHtml(`<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <title>${escapeHtml(title)}</title>
    </head>
    <body style="margin:0;padding:0;background-color:#f4efe7;color:#1a1612;font-family:Georgia,'Times New Roman',serif;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f4efe7;margin:0;padding:24px 0;">
        <tr>
          <td align="center">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:680px;background-color:#fffdf9;border:1px solid #e6ddcf;">
              <tr>
                <td style="padding:28px 32px 20px;border-bottom:1px solid #efe6d8;background:#14100d;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td valign="middle">
                        <img src="${escapeHtml(config.logoUrl)}" width="144" alt="${escapeHtml(config.companyName)} logo" style="display:block;border:0;max-width:144px;height:auto;">
                      </td>
                      <td align="right" valign="middle" style="font-family:Arial,sans-serif;font-size:12px;line-height:18px;color:#d1b177;letter-spacing:0.18em;text-transform:uppercase;">
                        Haute Couture Embroidery
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:34px 32px 12px;">
                  <header>
                    <h1 style="margin:0 0 12px;font-size:30px;line-height:1.2;font-weight:400;color:#17120f;">${escapeHtml(title)}</h1>
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;line-height:24px;color:#54493f;">${escapeHtml(intro)}</p>
                  </header>
                </td>
              </tr>
              <tr>
                <td style="padding:0 32px 32px;">
                  <main>${body}</main>
                </td>
              </tr>
              <tr>
                <td style="padding:18px 32px 28px;border-top:1px solid #efe6d8;background:#faf6ef;">
                  <footer>
                    <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:12px;line-height:20px;color:#6a5d52;">
                      ${escapeHtml(config.companyName)}<br>${escapeHtml(config.address)}
                    </p>
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;line-height:20px;color:#6a5d52;">
                      <a href="${escapeHtml(config.websiteUrl)}" style="color:#8f6b36;text-decoration:none;">${escapeHtml(config.websiteHost)}</a>
                    </p>
                  </footer>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`);
}

function renderAdminHtml(enquiry: StoredEnquiry, config: MailConfig) {
  const rows = [
    ["Name", enquiry.name],
    ["Brand", enquiry.brand || "Not provided"],
    ["Country", enquiry.country || "Not provided"],
    ["Email", enquiry.email],
    ["WhatsApp", enquiry.whatsapp || "Not provided"],
    ["Project Brief", enquiry.projectBrief],
    ["File Link", enquiry.file?.fileUrl ?? "No file attached"],
    ["Timestamp", formatTimestamp(enquiry.createdAt)],
    ["IP", enquiry.ipAddress || "Unavailable"],
    ["Browser", enquiry.browser || "Unavailable"],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:12px 14px;border:1px solid #e9dfd1;width:180px;font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#3f342c;background:#faf5ee;">${escapeHtml(label)}</td><td style="padding:12px 14px;border:1px solid #e9dfd1;font-family:Arial,sans-serif;font-size:14px;line-height:22px;color:#2a241e;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return renderShell(
    "New Enquiry | Zardosi Atelier",
    "A website enquiry has been received and stored in the enquiry log.",
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin:0 0 20px;">${rows}</table>`,
    config,
  );
}

function renderClientHtml(enquiry: StoredEnquiry, config: MailConfig) {
  return renderShell(
    "We’ve Received Your Enquiry | Zardosi Atelier",
    "Thank you for contacting Zardosi Atelier.",
    `<p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:15px;line-height:24px;color:#54493f;">We have successfully received your enquiry for ${escapeHtml(enquiry.brand || config.companyName)}.</p>
    <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:15px;line-height:24px;color:#54493f;">Our couture team will review your request and respond within 24-48 business hours.</p>
    <p style="margin:0 0 18px;font-family:Arial,sans-serif;font-size:15px;line-height:24px;color:#54493f;">This is an automated confirmation email.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;margin:0;">
      <tr><td style="padding:12px 14px;border:1px solid #e9dfd1;width:180px;font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#3f342c;background:#faf5ee;">Reference</td><td style="padding:12px 14px;border:1px solid #e9dfd1;font-family:Arial,sans-serif;font-size:14px;line-height:22px;color:#2a241e;">${escapeHtml(enquiry.id)}</td></tr>
      <tr><td style="padding:12px 14px;border:1px solid #e9dfd1;width:180px;font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#3f342c;background:#faf5ee;">Submitted</td><td style="padding:12px 14px;border:1px solid #e9dfd1;font-family:Arial,sans-serif;font-size:14px;line-height:22px;color:#2a241e;">${escapeHtml(formatTimestamp(enquiry.createdAt))}</td></tr>
    </table>`,
    config,
  );
}

function renderAdminText(enquiry: StoredEnquiry, config: MailConfig) {
  return [
    `New Enquiry | ${config.companyName}`,
    "",
    `Name: ${enquiry.name}`,
    `Brand: ${enquiry.brand || "Not provided"}`,
    `Country: ${enquiry.country || "Not provided"}`,
    `Email: ${enquiry.email}`,
    `WhatsApp: ${enquiry.whatsapp || "Not provided"}`,
    `Project Brief: ${enquiry.projectBrief}`,
    `File Link: ${enquiry.file?.fileUrl ?? "No file attached"}`,
    `Timestamp: ${formatTimestamp(enquiry.createdAt)}`,
    `IP: ${enquiry.ipAddress || "Unavailable"}`,
    `Browser: ${enquiry.browser || "Unavailable"}`,
    "",
    config.websiteUrl,
  ].join("\n");
}

function renderClientText(enquiry: StoredEnquiry, config: MailConfig) {
  return [
    `We’ve Received Your Enquiry | ${config.companyName}`,
    "",
    "Thank you for contacting Zardosi Atelier.",
    "We have successfully received your enquiry.",
    "Our couture team will review your request and respond within 24-48 business hours.",
    "This is an automated confirmation email.",
    "",
    `Reference: ${enquiry.id}`,
    `Submitted: ${formatTimestamp(enquiry.createdAt)}`,
    "",
    config.websiteUrl,
  ].join("\n");
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
      if (!isRetryableSmtpError(error) || delay === delays[delays.length - 1]) {
        break;
      }
    }
  }
  throw lastError;
}

function ensureSizeBudget(html: string, text: string) {
  const totalBytes = Buffer.byteLength(html, "utf8") + Buffer.byteLength(text, "utf8");
  if (totalBytes > 100_000) {
    throw new Error("Generated email exceeded the allowed size budget.");
  }
}

export async function sendEnquiryEmails(enquiry: StoredEnquiry): Promise<DeliveryResult> {
  const config = getMailConfig();
  ensureProductionMailConfig(config);

  const transporter = createTransport(config);
  const adminMessageId = generateMessageId(config.websiteHost);
  const clientMessageId = generateMessageId(config.websiteHost);

  const adminHtml = renderAdminHtml(enquiry, config);
  const adminText = renderAdminText(enquiry, config);
  const clientHtml = renderClientHtml(enquiry, config);
  const clientText = renderClientText(enquiry, config);

  ensureSizeBudget(adminHtml, adminText);
  ensureSizeBudget(clientHtml, clientText);

  const from = `"${config.fromName}" <${config.fromEmail}>`;

  await withRetry(async () => {
    await transporter.sendMail({
      from,
      to: config.businessInbox,
      replyTo: enquiry.email,
      sender: config.replyInbox,
      envelope: {
        from: config.replyInbox,
        to: config.businessInbox,
      },
      subject: "New Enquiry | Zardosi Atelier",
      text: adminText,
      html: adminHtml,
      headers: buildMailHeaders(adminMessageId, enquiry.email, config.replyInbox, "high"),
      priority: "high",
      date: new Date(),
      messageId: adminMessageId,
    });
  });

  await withRetry(async () => {
    await transporter.sendMail({
      from,
      to: enquiry.email,
      replyTo: config.businessInbox,
      sender: config.replyInbox,
      envelope: {
        from: config.replyInbox,
        to: enquiry.email,
      },
      subject: "We’ve Received Your Enquiry | Zardosi Atelier",
      text: clientText,
      html: clientHtml,
      headers: buildMailHeaders(clientMessageId, config.businessInbox, config.replyInbox, "normal"),
      priority: "normal",
      date: new Date(),
      messageId: clientMessageId,
    });
  });

  return { adminMessageId, clientMessageId };
}
