import nodemailer from "nodemailer";
import type { Enquiry } from "./admin-data";

function getEmailConfig() {
  return {
    gmailUser: process.env.GMAIL_USER ?? "",
    gmailAppPassword: process.env.GMAIL_APP_PASSWORD ?? "",
    notificationEmail: process.env.NOTIFICATION_EMAIL ?? "aryanthealgohype@gmail.com",
    mailFrom: process.env.MAIL_FROM ?? process.env.GMAIL_USER ?? "zardosiatelier@gmail.com",
  };
}

function buildTextBody(enquiry: Enquiry) {
  return [
    "A new client enquiry was submitted on Zardosi Atelier.",
    "",
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Phone / WhatsApp: ${enquiry.phone || "Not provided"}`,
    `Received At: ${enquiry.createdAt}`,
    `Status: ${enquiry.status}`,
    "",
    "Message:",
    enquiry.message,
  ].join("\n");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildHtmlBody(enquiry: Enquiry) {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1b1b1b">
      <h2 style="margin:0 0 16px">New Client Enquiry</h2>
      <p style="margin:0 0 16px">A new client form has been submitted on Zardosi Atelier.</p>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        <tr><td style="padding:8px 12px;border:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px 12px;border:1px solid #ddd">${escapeHtml(enquiry.name)}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px 12px;border:1px solid #ddd">${escapeHtml(enquiry.email)}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #ddd"><strong>Phone / WhatsApp</strong></td><td style="padding:8px 12px;border:1px solid #ddd">${escapeHtml(enquiry.phone || "Not provided")}</td></tr>
        <tr><td style="padding:8px 12px;border:1px solid #ddd"><strong>Received At</strong></td><td style="padding:8px 12px;border:1px solid #ddd">${escapeHtml(enquiry.createdAt)}</td></tr>
      </table>
      <div style="margin-top:16px">
        <strong>Message</strong>
        <pre style="white-space:pre-wrap;font-family:Arial,sans-serif;background:#f7f3ed;padding:16px;border:1px solid #e6dccf">${escapeHtml(enquiry.message)}</pre>
      </div>
    </div>
  `;
}

export async function sendEnquiryNotificationEmail(enquiry: Enquiry) {
  const { gmailUser, gmailAppPassword, notificationEmail, mailFrom } = getEmailConfig();

  if (!gmailUser || !gmailAppPassword) {
    return {
      sent: false,
      skipped: true,
      reason: "GMAIL_USER or GMAIL_APP_PASSWORD is not configured.",
    };
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  await transporter.sendMail({
    from: mailFrom,
    to: notificationEmail,
    replyTo: enquiry.email,
    subject: `New enquiry from ${enquiry.name}`,
    text: buildTextBody(enquiry),
    html: buildHtmlBody(enquiry),
  });

  return { sent: true, skipped: false };
}
