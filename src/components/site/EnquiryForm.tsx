import { useMemo, useRef, useState } from "react";
import { submitEnquiry } from "@/lib/contact-form.server";
import { useRecaptchaV3 } from "@/hooks/useRecaptchaV3";

type EnquiryFormProps = {
  source: "contact-page" | "homepage";
  variant: "contact" | "lead";
  onSubmitted?: () => void;
  submitLabel?: string;
  className?: string;
};

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(reader.error ?? new Error("Unable to read file."));
    reader.readAsDataURL(file);
  });
}

function createNonce() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function clean(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

export function EnquiryForm({
  source,
  variant,
  onSubmitted,
  submitLabel,
  className,
}: EnquiryFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submittedOnce = useRef(false);
  const { enabled: recaptchaEnabled, ready, error: recaptchaError, execute } = useRecaptchaV3();
  const startedAt = useMemo(() => Date.now(), []);
  const formNonce = useMemo(() => createNonce(), []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || submittedOnce.current) return;

    const currentForm = event.currentTarget;
    setError(null);

    if (!currentForm.reportValidity()) return;

    const form = new FormData(currentForm);
    const name = clean(form.get("name"));
    const email = clean(form.get("email"));
    const projectType = clean(form.get("subject"));
    const projectBrief = clean(form.get("brief") ?? form.get("message"));

    if (!name || !email || !projectBrief) {
      setError("Please complete your name, email address, and project details.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    submittedOnce.current = true;
    setSubmitting(true);

    try {
      const file = form.get("file") as File | null;
      let fileBase64: string | undefined;
      let fileName: string | undefined;
      let fileType: string | undefined;

      if (file && file.size > 0) {
        if (file.size > 10 * 1024 * 1024) {
          throw new Error("Please upload a file smaller than 10 MB.");
        }
        fileBase64 = await fileToDataUrl(file);
        fileName = file.name;
        fileType = file.type || "application/octet-stream";
      }

      const recaptchaToken = ready ? await execute("enquiry_submit") : "recaptcha-not-ready";
      const result = await submitEnquiry({
        data: {
          source,
          name,
          brand: clean(form.get("brand")),
          country: clean(form.get("country")),
          email,
          whatsapp: clean(form.get("whatsapp") ?? form.get("phone")),
          projectType,
          projectBrief,
          honeypot: clean(form.get("website")),
          recaptchaToken,
          startedAt,
          formNonce,
          fileBase64,
          fileName,
          fileType,
        },
      });

      if (!result.success) {
        throw new Error(result.error || "Failed to send inquiry. Please try again.");
      }

      setSubmitted(true);
      onSubmitted?.();
      currentForm.reset();
    } catch (submissionError) {
      submittedOnce.current = false;
      const message = submissionError instanceof Error ? submissionError.message : "Failed to send inquiry.";
      console.error("Enquiry form submission failed:", submissionError);
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className={className}>
        <div className="border border-gold/20 bg-champagne p-8 text-center">
          <span className="eyebrow">Inquiry Sent Successfully</span>
          <h3 className="mt-4 font-serif text-3xl">Thank You</h3>
          <p className="mt-3 text-sm text-ink-soft">
            We have received your inquiry and sent a confirmation email to your inbox.
          </p>
        </div>
      </div>
    );
  }

  if (variant === "contact") {
    return (
      <form className={className ?? "border border-gold/20 bg-champagne p-5 sm:p-8"} onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[
            ["Full Name", "name", "text"],
            ["Brand / Maison", "brand", "text"],
            ["Country", "country", "text"],
            ["Email", "email", "email"],
            ["WhatsApp", "whatsapp", "text"],
            ["Upload Design", "file", "file"],
          ].map(([label, name, type]) => (
            <div key={name}>
              <label
                htmlFor={`input-${variant}-${name}`}
                className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-ink-soft"
              >
                {label}
              </label>
              <input
                id={`input-${variant}-${name}`}
                name={name}
                type={type}
                required={type !== "file" && name !== "brand" && name !== "country" && name !== "whatsapp"}
                accept={type === "file" ? ".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx" : undefined}
                className="w-full border-b border-ink/25 bg-transparent py-2 text-[15px] font-medium transition-colors file:mr-3 file:border-0 file:bg-transparent file:text-[10px] file:uppercase file:tracking-[0.2em] file:text-gold focus:border-gold focus:outline-none"
              />
            </div>
          ))}
          <div className="hidden" aria-hidden="true">
            <label htmlFor={`input-${variant}-website`}>Website</label>
            <input id={`input-${variant}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor={`input-${variant}-brief`}
              className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-ink-soft"
            >
              Project Brief
            </label>
            <textarea
              id={`input-${variant}-brief`}
              name="brief"
              rows={4}
              required
              maxLength={4000}
              className="w-full border-b border-ink/25 bg-transparent py-2 text-[15px] font-medium transition-colors focus:border-gold focus:outline-none"
            />
          </div>
        </div>
        {error ? <p className="mt-4 text-sm text-red-700">Failed to Send: {error}</p> : null}
        {recaptchaEnabled && !ready && !error ? <p className="mt-4 text-xs text-ink-soft">Loading security check...</p> : null}
        {recaptchaError && !error ? <p className="mt-4 text-xs text-ink-soft">{recaptchaError}</p> : null}
        <button
          type="submit"
          disabled={submitting}
          className="mt-8 w-full border border-ink bg-ink px-8 py-4 text-[10px] font-bold uppercase tracking-[0.24em] text-ivory transition-colors hover:border-gold hover:bg-gold hover:text-[#120c09] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Sending..." : submitLabel ?? "Send Request"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className ?? "space-y-6"} noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full Name" name="name" />
        <Field label="Email Address" name="email" type="email" />
      </div>
      <Field label="Project Type" name="subject" />
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`input-${variant}-website`}>Website</label>
        <input id={`input-${variant}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label
          htmlFor={`input-${variant}-message`}
          className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-ink-soft"
        >
          Project Details
        </label>
        <textarea
          id={`input-${variant}-message`}
          name="message"
          rows={4}
          required
          maxLength={4000}
          className="w-full resize-none border-b border-ink/15 bg-transparent py-2 text-sm outline-none transition focus:border-gold"
        />
      </div>
      {error ? <p className="text-sm text-red-700">Failed to Send: {error}</p> : null}
      {recaptchaEnabled && !ready && !error ? <p className="text-xs text-ink-soft">Loading security check...</p> : null}
      {recaptchaError && !error ? <p className="text-xs text-ink-soft">{recaptchaError}</p> : null}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-ink px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-ivory transition hover:bg-gold hover:text-[#120c09] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Sending..." : submitLabel ?? "Submit Inquiry"}
      </button>
    </form>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label
        htmlFor={`field-${name}`}
        className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-ink-soft"
      >
        {label}
      </label>
      <input
        id={`field-${name}`}
        name={name}
        type={type}
        required
        className="w-full border-b border-ink/15 bg-transparent py-2 text-sm outline-none transition focus:border-gold"
      />
    </div>
  );
}

