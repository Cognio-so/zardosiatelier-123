import { createServerFn } from "@tanstack/react-start";
import { enquirySchema, handleContactSubmission } from "./contact-submission.server";

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator(enquirySchema)
  .handler(async ({ data }) => {
    return handleContactSubmission(data);
  });
