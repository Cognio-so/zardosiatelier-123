import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { afterEach, mock, test } from "node:test";
import nodemailer from "nodemailer";
import { sendEnquiryEmails } from "../src/lib/contact-email.server.ts";

const enquiry = {
  id: "test-enquiry",
  source: "contact-page",
  status: "new",
  createdAt: "2026-11-06T10:00:00.000Z",
  name: "Contact Form Test",
  brand: "Test Maison",
  country: "India",
  email: "customer@example.com",
  whatsapp: "0000000000",
  phone: "0000000000",
  projectType: "Sampling",
  projectBrief: "Test design attachment",
  message: "Test design attachment",
  file: { fileName: "design.webp", fileType: "image/webp", fileSizeBytes: 6, fileUrl: "" },
  ipAddress: "127.0.0.1",
  browser: "test",
  userAgent: "test",
  dedupeHash: "test",
};

function configureMail() {
  process.env.SMTP_USER = "";
  process.env.SMTP_PASS = "";
  process.env.GMAIL_USER = "sender@example.com";
  process.env.GMAIL_APP_PASSWORD = "test-password";
  process.env.BUSINESS_INBOX = "studio@example.com";
  process.env.MAIL_FROM_EMAIL = "sender@example.com";
}

afterEach(() => {
  mock.restoreAll();
  delete process.env.GMAIL_USER;
  delete process.env.GMAIL_APP_PASSWORD;
  delete process.env.SMTP_USER;
  delete process.env.SMTP_PASS;
  delete process.env.BUSINESS_INBOX;
  delete process.env.MAIL_FROM_EMAIL;
});

test("sends the design attachment to the studio and confirms the customer", async () => {
  configureMail();
  const sent = [];
  mock.method(nodemailer, "createTransport", () => ({
    verify: async () => true,
    sendMail: async (message) => {
      sent.push(message);
      return { messageId: message.messageId };
    },
  }));

  const buffer = Buffer.from("design");
  const result = await sendEnquiryEmails(enquiry, {
    fileName: "design.webp",
    fileType: "image/webp",
    buffer,
  });

  assert.equal(result.confirmationSent, true);
  assert.equal(sent.length, 2);
  assert.equal(sent[0].to, "studio@example.com");
  assert.equal(sent[0].replyTo, enquiry.email);
  assert.match(sent[0].text, /Test Maison/);
  assert.equal(sent[0].attachments[0].filename, "design.webp");
  assert.equal(sent[0].attachments[0].contentType, "image/webp");
  assert.deepEqual(sent[0].attachments[0].content, buffer);
  assert.equal(sent[1].to, enquiry.email);
  assert.equal(sent[1].attachments, undefined);
});

test("reports a failed studio email as a failure", async () => {
  configureMail();
  mock.method(nodemailer, "createTransport", () => ({
    verify: async () => true,
    sendMail: async () => {
      throw new Error("SMTP rejected studio message");
    },
  }));

  await assert.rejects(sendEnquiryEmails(enquiry), /SMTP rejected studio message/);
});

test("does not report a delivered studio email as failed when confirmation fails", async () => {
  configureMail();
  mock.method(console, "error", () => {});
  let attempts = 0;
  mock.method(nodemailer, "createTransport", () => ({
    verify: async () => true,
    sendMail: async () => {
      attempts += 1;
      if (attempts === 2) throw new Error("Customer mailbox rejected message");
      return { messageId: "studio-message" };
    },
  }));

  const result = await sendEnquiryEmails(enquiry);
  assert.equal(attempts, 2);
  assert.equal(result.confirmationSent, false);
  assert.ok(result.adminMessageId);
});
