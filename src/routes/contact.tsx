import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { createEnquiry, getSettings } from "@/lib/admin-data";

import contactHeroV2 from "@/assets/contact-hero-v2.webp";
import contactSecond from "@/assets/contact-hero.webp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - Request a Quote | Zardosi Atelier" },
      {
        name: "description",
        content:
          "Request a quote or book a consultation with our embroidery atelier - response within two working days.",
      },
      { property: "og:title", content: "Contact - Zardosi Atelier" },
      { property: "og:description", content: "Begin a project with our embroidery atelier." },
      { property: "og:url", content: "/contact" },
      { property: "og:image", content: contactHeroV2 },
    ],
    links: [{ rel: "canonical", href: "https://www.zardosiatelier.com/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { data: settings } = useQuery({
    queryKey: ["settings-public"],
    queryFn: () => getSettings(),
    staleTime: 0,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const email = settings?.email ?? "zardosiatelier@gmail.com";
  const phoneNumber = settings?.phone ?? "8826023527";
  const phoneHref = `tel:${phoneNumber.replace(/\D/g, "")}`;
  const address = settings?.address ?? "New Delhi - Paris - New York";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const form = new FormData(e.currentTarget);
      const attachment = form.get("file") as File | null;
      const attachmentLine = attachment?.name ? `\nAttachment filename: ${attachment.name}` : "";
      await createEnquiry({
        data: {
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          phone: String(form.get("whatsapp") ?? ""),
          message: `Brand: ${String(form.get("brand") ?? "")}\nCountry: ${String(form.get("country") ?? "")}\n\n${String(form.get("brief") ?? "")}${attachmentLine}`,
        },
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="Begin"
        title="Request a"
        italic="feasibility review."
        description="Share your project and our atelier will respond within two working days with a tailored proposal."
        image={contactHeroV2}
      />

      <section style={{ background: "#F4EFE7" }}>
        <Reveal>
          <div
            className="relative overflow-hidden mx-auto max-w-[1320px]"
            style={{
              borderBottom: "1px solid rgba(212,175,55,0.18)",
              transition: "box-shadow 0.7s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "0 0 0 1px rgba(212,175,55,0.32)";
              const img = el.querySelector("img") as HTMLElement | null;
              if (img) img.style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "none";
              const img = el.querySelector("img") as HTMLElement | null;
              if (img) img.style.transform = "scale(1)";
            }}
          >
            <img
              src={contactSecond}
              alt="Fountain pen, wax seal and gold-embroidered silk swatch - luxury atelier still-life"
              className="w-full object-cover"
              style={{
                maxHeight: "360px",
                objectPosition: "center center",
                transition: "transform 1.4s cubic-bezier(0.19,1,0.22,1)",
                display: "block",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, rgba(6,3,1,0.68) 0%, rgba(0,0,0,0.15) 45%, rgba(6,3,1,0.55) 100%)",
              }}
            />
            <div className="absolute bottom-0 left-0 p-6 sm:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]">
                Begin - Your Commission
              </p>
              <h2 className="mt-2 font-serif text-3xl leading-tight text-white sm:text-4xl">
                Every great piece begins <span className="italic">with a letter.</span>
              </h2>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="luxury-silk-bg py-10 sm:py-12">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 px-5 sm:px-6 lg:grid-cols-[1fr_1.35fr] lg:px-10">
          <Reveal>
            <span className="eyebrow">Studio</span>
            <h2 className="mt-3 font-serif text-4xl">Contact</h2>
            <div className="mt-7 space-y-6 text-[15px] font-medium">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">Email</p>
                <a href={`mailto:${email}`} className="mt-2 inline-block font-serif text-xl gold-link">
                  {email}
                </a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">Phone</p>
                <a
                  href={phoneHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block font-serif text-xl gold-link"
                >
                  {phoneNumber}
                </a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">Studio</p>
                <p className="mt-2 font-serif text-xl">{address}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            {submitted ? (
              <div className="border border-gold/20 bg-champagne p-8 text-center">
                <span className="eyebrow">Thank You</span>
                <h3 className="mt-4 font-serif text-3xl">Inquiry Received</h3>
                <p className="mt-3 text-sm text-ink-soft">
                  Our atelier team will contact you shortly.
                </p>
              </div>
            ) : (
              <form className="border border-gold/20 bg-champagne p-5 sm:p-8" onSubmit={handleSubmit}>
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
                        htmlFor={`input-${name}`}
                        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-ink-soft"
                      >
                        {label}
                      </label>
                      <input
                        id={`input-${name}`}
                        name={name}
                        type={type}
                        required={type !== "file"}
                        className="w-full border-b border-ink/25 bg-transparent py-2 text-[15px] font-medium transition-colors file:mr-3 file:border-0 file:bg-transparent file:text-[10px] file:uppercase file:tracking-[0.2em] file:text-gold focus:border-gold focus:outline-none"
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="input-brief"
                      className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-ink-soft"
                    >
                      Project Brief
                    </label>
                    <textarea
                      id="input-brief"
                      name="brief"
                      rows={4}
                      required
                      className="w-full border-b border-ink/25 bg-transparent py-2 text-[15px] font-medium transition-colors focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-8 w-full border border-ink bg-ink px-8 py-4 text-[10px] font-bold uppercase tracking-[0.24em] text-ivory transition-colors hover:border-gold hover:bg-gold hover:text-[#120c09] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Send Request"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}


