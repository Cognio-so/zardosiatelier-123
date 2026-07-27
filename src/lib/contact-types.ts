export type EnquirySource = "contact-page" | "homepage";

export interface EnquiryAttachment {
  fileName: string;
  fileType: string;
  fileSizeBytes: number;
  fileUrl: string;
}

export interface StoredEnquiry {
  id: string;
  source: EnquirySource;
  status: "new" | "read" | "resolved";
  createdAt: string;
  readAt?: string;
  name: string;
  brand: string;
  country: string;
  email: string;
  whatsapp: string;
  phone: string;
  projectType: string;
  projectBrief: string;
  message: string;
  file?: EnquiryAttachment;
  ipAddress: string;
  browser: string;
  userAgent: string;
  recaptchaScore?: number;
  dedupeHash: string;
  adminEmailSentAt?: string;
  clientEmailSentAt?: string;
}
