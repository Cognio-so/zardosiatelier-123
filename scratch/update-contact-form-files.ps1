$contactPath = "C:\Users\PC\Desktop\zardosiatelier-123-main\src\routes\contact.tsx"
$contactContent = @'
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { getSettings } from "@/lib/admin-data";

import portfolioHero from "@/assets/portfolio-hero.webp";
import zardoziPaisley from "@/assets/zardozi-paisley-opt.webp";

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
      { property: "og:image", content: portfolioHero },
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

  const email = settings?.email ?? "info@zardosiatelier.com";
  const phoneNumber = settings?.phone ?? "8826023527";
  const phoneHref = `tel:${phoneNumber.replace(/\D/g, "")}`;
  const address = settings?.address ?? "Mumbai, Maharashtra, India";

  return (
    <PageShell>
      <PageHero
        eyebrow="Begin"
        title="Request a"
        italic="feasibility review."
        description="Share your project and our atelier will respond within two working days with a tailored proposal."
        image={portfolioHero}
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
              src={zardoziPaisley}
              alt="Intricate gold zardozi paisley embroidery - luxury atelier craftsmanship"
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
                <p className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">Address</p>
                <p className="mt-2 font-serif text-xl text-ink">{address}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <EnquiryForm source="contact-page" variant="contact" submitLabel="Send Request" />
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
'@
Set-Content -LiteralPath $contactPath -Value $contactContent

$indexPath = "C:\Users\PC\Desktop\zardosiatelier-123-main\src\routes\index.tsx"
$indexText = Get-Content -LiteralPath $indexPath -Raw
$indexText = $indexText.Replace('import { createEnquiry } from "@/lib/admin-data";', 'import { EnquiryForm } from "@/components/site/EnquiryForm";')
$oldLead = @'
function LeadSection() {
  const [submitted, setSubmitted] = useState(false);
  const email = "zardosiatelier@gmail.com";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const projectType = String(form.get("subject") ?? "");
    await createEnquiry({
      data: {
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        phone: String(form.get("phone") ?? ""),
        message: projectType
          ? `Project Type: ${projectType}\n\n${String(form.get("message") ?? "")}`
          : String(form.get("message") ?? ""),
      },
    });
    setSubmitted(true);
  };

  return (
    <section className="luxury-silk-bg pb-12 sm:pb-16" id="quote">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
        <Reveal className="border border-gold/25 bg-[#fffdf9] px-5 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Begin a Commission</span>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Let us translate your vision into couture-grade craftsmanship.
            </h2>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-5">
              <a
                href={`mailto:${email}`}
                className="block border border-ink/25 px-8 py-4 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-ink transition hover:border-gold hover:text-gold"
              >
                Email the Atelier
              </a>
              <p className="text-center text-[15px] font-medium leading-7 text-ink-soft lg:text-left">
                Send your sketches, references, quantity range and timeline. We will reply with the
                right sampling route for your project.
              </p>
            </div>

            <div className="border border-ink/10 bg-ivory p-6 sm:p-8">
              {submitted ? (
                <div className="py-16 text-center">
                  <span className="eyebrow">Thank You</span>
                  <h3 className="mt-4 font-serif text-3xl">Inquiry Received</h3>
                  <p className="mt-3 text-sm text-ink-soft">
                    Our atelier team will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Full Name" name="name" />
                    <Field label="Email Address" name="email" type="email" />
                  </div>
                  <Field label="Project Type" name="subject" />
                  <div>
                    <label
                      htmlFor="project-details-index"
                      className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-ink-soft"
                    >
                      Project Details
                    </label>
                    <textarea
                      id="project-details-index"
                      name="message"
                      rows={4}
                      required
                      className="w-full resize-none border-b border-ink/15 bg-transparent py-2 text-sm outline-none transition focus:border-gold"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-ink px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-ivory transition hover:bg-gold hover:text-[#120c09] sm:w-auto"
                  >
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
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
'@
$newLead = @'
function LeadSection() {
  const email = "info@zardosiatelier.com";

  return (
    <section className="luxury-silk-bg pb-12 sm:pb-16" id="quote">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
        <Reveal className="border border-gold/25 bg-[#fffdf9] px-5 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Begin a Commission</span>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Let us translate your vision into couture-grade craftsmanship.
            </h2>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-5">
              <a
                href={`mailto:${email}`}
                className="block border border-ink/25 px-8 py-4 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-ink transition hover:border-gold hover:text-gold"
              >
                Email the Atelier
              </a>
              <p className="text-center text-[15px] font-medium leading-7 text-ink-soft lg:text-left">
                Send your sketches, references, quantity range and timeline. We will reply with the
                right sampling route for your project.
              </p>
            </div>

            <div className="border border-ink/10 bg-ivory p-6 sm:p-8">
              <EnquiryForm source="homepage" variant="lead" submitLabel="Submit Inquiry" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
'@
if (-not $indexText.Contains($oldLead.Trim())) {
  throw "Lead section block not found"
}
$indexText = $indexText.Replace($oldLead.Trim(), $newLead.Trim())
Set-Content -LiteralPath $indexPath -Value $indexText
