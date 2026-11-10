import crypto from "node:crypto";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type { StoredEnquiry } from "./contact-types";

type DeliveryResult = {
  adminMessageId?: string;
  clientMessageId?: string;
  confirmationSent: boolean;
};

export type EmailAttachment = { fileName: string; fileType: string; buffer: Buffer };

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
  const websiteUrl = (process.env.WEBSITE_URL ?? "https://www.zardosiatelier.com").replace(
    /\/$/,
    "",
  );
  const smtpUser = (process.env.SMTP_USER ?? process.env.GMAIL_USER ?? "").trim();
  const smtpPass = (process.env.SMTP_PASS ?? process.env.GMAIL_APP_PASSWORD ?? "").trim();
  const fromValue = (process.env.MAIL_FROM_EMAIL ?? process.env.MAIL_FROM ?? smtpUser).trim();
  const fromEmail = parseMailbox(fromValue || "zardosiatelier@gmail.com");
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
      "zardosiatelier@gmail.com"
    ).trim(),
    replyInbox: (process.env.REPLY_INBOX ?? fromEmail).trim(),
  };
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
    "Brand / Maison:",
    enquiry.brand || "Not provided",
    "",
    "Country:",
    enquiry.country || "Not provided",
    "",
    "WhatsApp / Phone:",
    enquiry.whatsapp || "Not provided",
    "",
    "Design File:",
    enquiry.file?.fileName || "Not attached",
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

function adminHtml(enquiry: StoredEnquiry, config: MailConfig) {
  const whatsappDigits = (enquiry.whatsapp || "").replace(/[^0-9]/g, "");
  return `
<div style="font-family: Georgia, 'Times New Roman', serif; background-color: #f7f3ec; padding: 32px 16px; color: #1a120c;">
  <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border: 1px solid #d4af37; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
    <div style="background-color: #120c08; padding: 28px 24px; text-align: center; border-bottom: 2px solid #c9a84c;">
      <h1 style="margin: 0; font-family: Georgia, serif; color: #f5f0e8; font-size: 24px; letter-spacing: 0.1em; text-transform: uppercase;">ZARDOSI ATELIER</h1>
      <p style="margin: 6px 0 0; color: #c9a84c; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; font-family: Arial, sans-serif;">New Commission Inquiry</p>
    </div>
    
    <div style="padding: 28px 24px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #2a2018;">
      <p style="margin: 0 0 20px; font-size: 15px; color: #5a483a;">A new client has submitted an inquiry through the website contact form:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr style="border-bottom: 1px solid #ede4d6;">
          <td style="padding: 10px 0; color: #8a7662; width: 140px; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Client Name</td>
          <td style="padding: 10px 0; color: #1a120c; font-size: 15px; font-weight: 600;">${escapeHtml(enquiry.name)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #ede4d6;">
          <td style="padding: 10px 0; color: #8a7662; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
          <td style="padding: 10px 0; font-size: 14px;"><a href="mailto:${escapeHtml(enquiry.email)}" style="color: #9c7324; text-decoration: underline; font-weight: 600;">${escapeHtml(enquiry.email)}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #ede4d6;">
          <td style="padding: 10px 0; color: #8a7662; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">WhatsApp / Phone</td>
          <td style="padding: 10px 0; color: #1a120c; font-size: 14px;">
            ${enquiry.whatsapp ? `<a href="https://wa.me/${escapeHtml(whatsappDigits)}" style="color: #128c7e; text-decoration: none; font-weight: bold;">📱 ${escapeHtml(enquiry.whatsapp)} (Chat on WhatsApp)</a>` : '<span style="color:#888;">Not provided</span>'}
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #ede4d6;">
          <td style="padding: 10px 0; color: #8a7662; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Brand / Maison</td>
          <td style="padding: 10px 0; color: #1a120c; font-size: 14px;">${escapeHtml(enquiry.brand || "Not provided")}</td>
        </tr>
        <tr style="border-bottom: 1px solid #ede4d6;">
          <td style="padding: 10px 0; color: #8a7662; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Country</td>
          <td style="padding: 10px 0; color: #1a120c; font-size: 14px;">${escapeHtml(enquiry.country || "Not provided")}</td>
        </tr>
        <tr style="border-bottom: 1px solid #ede4d6;">
          <td style="padding: 10px 0; color: #8a7662; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Project Type</td>
          <td style="padding: 10px 0; color: #1a120c; font-size: 14px; font-weight: 600;">${escapeHtml(enquiry.projectType || "General Commission")}</td>
        </tr>
        <tr style="border-bottom: 1px solid #ede4d6;">
          <td style="padding: 10px 0; color: #8a7662; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Design File</td>
          <td style="padding: 10px 0; color: #1a120c; font-size: 14px;">${escapeHtml(enquiry.file?.fileName || "None attached")}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #8a7662; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Submitted At</td>
          <td style="padding: 10px 0; color: #5a483a; font-size: 13px;">${formatTimestamp(enquiry.createdAt)}</td>
        </tr>
      </table>
      
      <div style="background-color: #faf6f0; border-left: 3px solid #c9a84c; padding: 18px; border-radius: 2px; margin-bottom: 24px;">
        <p style="margin: 0 0 8px; font-weight: bold; color: #8a7662; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Project Brief / Message:</p>
        <div style="white-space: pre-wrap; font-family: Georgia, serif; font-size: 15px; color: #1a120c; line-height: 1.7;">${escapeHtml(enquiry.projectBrief)}</div>
      </div>
      
      <div style="text-align: center; margin-top: 24px; padding-top: 20px; border-top: 1px solid #ede4d6;">
        <a href="mailto:${escapeHtml(enquiry.email)}?subject=Re: Your Commission Inquiry | Zardosi Atelier" style="display: inline-block; background-color: #c9a84c; color: #120c08; padding: 12px 28px; text-decoration: none; font-weight: bold; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; border-radius: 2px;">Reply to Client</a>
      </div>
    </div>
    
    <div style="background-color: #faf6f0; padding: 14px 24px; text-align: center; border-top: 1px solid #ede4d6; font-size: 11px; color: #8a7662;">
      Sent automatically by Zardosi Atelier Website · <a href="${escapeHtml(config.websiteUrl)}" style="color: #9c7324; text-decoration: none;">zardosiatelier.com</a>
    </div>
  </div>
</div>
  `;
}

function customerText(enquiry: StoredEnquiry, config: MailConfig) {
  return [
    `Dear ${enquiry.name},`,
    "",
    "Thank you for contacting Zardosi Atelier.",
    "",
    "We have successfully received your inquiry and project brief. Our design and karigar team will review your requirements and get back to you as soon as possible.",
    "",
    "Project Summary:",
    `Type: ${enquiry.projectType || "General Commission"}`,
    `Brand: ${enquiry.brand || "Not provided"}`,
    "",
    "If you have urgent questions, you can reach us via WhatsApp or Phone at +91 8826023527.",
    "",
    "Best Regards,",
    "Zardosi Atelier Team",
    config.websiteUrl,
  ].join("\n");
}

function customerHtml(enquiry: StoredEnquiry, config: MailConfig) {
  return `
<div style="font-family: Georgia, 'Times New Roman', serif; background-color: #f7f3ec; padding: 32px 16px; color: #1a120c;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #d4af37; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
    <div style="background-color: #120c08; padding: 32px 24px; text-align: center; border-bottom: 2px solid #c9a84c;">
      <h1 style="margin: 0; font-family: Georgia, serif; color: #f5f0e8; font-size: 26px; letter-spacing: 0.12em; text-transform: uppercase;">ZARDOSI ATELIER</h1>
      <p style="margin: 8px 0 0; color: #c9a84c; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; font-family: Arial, sans-serif;">Haute Couture Hand Embroidery</p>
    </div>
    
    <div style="padding: 32px 28px; font-family: Georgia, serif; font-size: 15px; line-height: 1.8; color: #2a2018;">
      <p style="font-size: 18px; color: #120c08; margin-top: 0;">Dear ${escapeHtml(enquiry.name)},</p>
      
      <p>Thank you for reaching out to <strong>Zardosi Atelier</strong>. We have successfully received your inquiry and project specifications.</p>
      
      <p>Our artisans specialize in bespoke hand embroidery, Zardozi, Resham, Crystal, Pearl, and Sequin embellishments for global couture and bridal fashion houses. We are currently reviewing your brief and will get back to you within 24 to 48 business hours.</p>
      
      <div style="background-color: #faf6f0; border-left: 3px solid #c9a84c; padding: 16px 20px; margin: 24px 0;">
        <p style="margin: 0 0 6px; font-family: Arial, sans-serif; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; color: #8a7662;">Summary of your request:</p>
        <p style="margin: 0; font-size: 14px; color: #1a120c;"><strong>Project Type:</strong> ${escapeHtml(enquiry.projectType || "General Commission")}</p>
        <p style="margin: 4px 0 0; font-size: 14px; color: #5a483a;"><strong>Brand / Maison:</strong> ${escapeHtml(enquiry.brand || "Independent / Private")}</p>
      </div>

      <p>For urgent requirements or immediate sample requests, you can contact us directly via WhatsApp or phone:</p>

      <p style="font-family: Arial, sans-serif; font-size: 14px; margin: 20px 0; line-height: 1.7;">
        <strong>Phone / WhatsApp:</strong> <a href="https://wa.me/918826023527" style="color: #9c7324; text-decoration: none; font-weight: bold;">+91 8826023527</a><br>
        <strong>Email:</strong> <a href="mailto:${escapeHtml(config.businessInbox)}" style="color: #9c7324; text-decoration: none;">${escapeHtml(config.businessInbox)}</a><br>
        <strong>Website:</strong> <a href="${escapeHtml(config.websiteUrl)}" style="color: #9c7324; text-decoration: none;">${escapeHtml(config.websiteUrl)}</a>
      </p>

      <p style="margin-bottom: 0;">With warm regards,<br>
      <strong>Zardosi Atelier Team</strong><br>
      <span style="font-size: 13px; color: #8a7662;">Mumbai, Maharashtra, India</span></p>
    </div>
    
    <div style="background-color: #120c08; padding: 14px 24px; text-align: center; font-size: 11px; color: #8a7662; font-family: Arial, sans-serif;">
      © 2026 Zardosi Atelier · All rights reserved.
    </div>
  </div>
</div>
  `;
}

/**
 * Deliver emails using the Resend REST API.
 * Uses process.env.RESEND_API_KEY.
 */
async function sendViaResend(
  enquiry: StoredEnquiry,
  attachment: EmailAttachment | null | undefined,
  config: MailConfig,
): Promise<DeliveryResult> {
  const apiKey = (process.env.RESEND_API_KEY ?? "").trim();
  // Resend only accepts a sender on a verified domain in the account.
  // Using spatially.pro which is verified for sending in this Resend account.
  const fromEmail = (
    process.env.RESEND_FROM_EMAIL ?? "Zardosi Atelier <contact@spatially.pro>"
  ).trim();
  const businessInbox = config.businessInbox;
  const recipients = Array.from(new Set([businessInbox, "asset@thealgohype.com"])).filter(Boolean);

  const attachments = attachment
    ? [
        {
          filename: attachment.fileName,
          content: attachment.buffer.toString("base64"),
        },
      ]
    : undefined;

  // 1. Send Admin Notification to Atelier Inbox
  const adminRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: recipients,
      reply_to: enquiry.email,
      subject: `New Commission Inquiry from ${enquiry.name} | Zardosi Atelier`,
      text: adminText(enquiry, config),
      html: adminHtml(enquiry, config),
      attachments,
    }),
  });

  if (!adminRes.ok) {
    const errorBody = await adminRes.text();
    console.error("Resend admin email delivery failed:", adminRes.status, errorBody);
    throw new Error(`Resend email delivery failed (${adminRes.status}): ${errorBody}`);
  }

  const adminData = (await adminRes.json()) as { id?: string };
  const adminMessageId = adminData.id;

  // 2. Send Customer Confirmation Email
  let confirmationSent = false;
  let clientMessageId: string | undefined;

  if (enquiry.email && enquiry.email.includes("@")) {
    try {
      const clientRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [enquiry.email],
          reply_to: businessInbox,
          subject: "Thank You for Contacting Zardosi Atelier",
          text: customerText(enquiry, config),
          html: customerHtml(enquiry, config),
        }),
      });

      if (clientRes.ok) {
        const clientData = (await clientRes.json()) as { id?: string };
        clientMessageId = clientData.id;
        confirmationSent = true;
      } else {
        const err = await clientRes.text();
        console.warn("Resend client confirmation failed:", clientRes.status, err);
      }
    } catch (clientErr) {
      console.warn("Resend client confirmation error:", clientErr);
    }
  }

  return {
    adminMessageId,
    clientMessageId,
    confirmationSent,
  };
}

/**
 * Deliver emails using Nodemailer SMTP.
 */
async function sendViaSmtp(
  enquiry: StoredEnquiry,
  attachment: EmailAttachment | null | undefined,
  config: MailConfig,
): Promise<DeliveryResult> {
  if (!config.user || !config.pass) {
    throw new Error("SMTP credentials are not configured.");
  }

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

  const transporter = nodemailer.createTransport(options);
  await transporter.verify();

  const from = `"${config.fromName}" <${config.fromEmail}>`;
  const adminMessageId = `<${crypto.randomUUID()}.${Date.now()}@${config.websiteHost}>`;
  const clientMessageId = `<${crypto.randomUUID()}.${Date.now()}@${config.websiteHost}>`;

  await transporter.sendMail({
    from,
    to: config.businessInbox,
    replyTo: enquiry.email,
    subject: `New Commission Inquiry from ${enquiry.name} | Zardosi Atelier`,
    text: adminText(enquiry, config),
    html: adminHtml(enquiry, config),
    attachments: attachment
      ? [
          {
            filename: attachment.fileName,
            content: attachment.buffer,
            contentType: attachment.fileType,
          },
        ]
      : [],
    messageId: adminMessageId,
    date: new Date(),
  });

  let confirmationSent = false;
  try {
    await transporter.sendMail({
      from,
      to: enquiry.email,
      replyTo: config.replyInbox,
      subject: "Thank You for Contacting Zardosi Atelier",
      text: customerText(enquiry, config),
      html: customerHtml(enquiry, config),
      messageId: clientMessageId,
      date: new Date(),
    });
    confirmationSent = true;
  } catch (error) {
    console.error("SMTP enquiry confirmation email failed:", error);
  }

  return { adminMessageId, clientMessageId, confirmationSent };
}

export async function sendEnquiryEmails(
  enquiry: StoredEnquiry,
  attachment?: EmailAttachment | null,
): Promise<DeliveryResult> {
  const config = getMailConfig();

  // 1. Primary: If RESEND_API_KEY is available, use Resend API
  if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim()) {
    try {
      return await sendViaResend(enquiry, attachment, config);
    } catch (resendError) {
      console.error("sendViaResend failed, checking for SMTP fallback:", resendError);
      // Fall through to SMTP if configured
      if (config.user && config.pass) {
        return await sendViaSmtp(enquiry, attachment, config);
      }
      throw resendError;
    }
  }

  // 2. Fallback: Use Nodemailer SMTP
  return await sendViaSmtp(enquiry, attachment, config);
}
