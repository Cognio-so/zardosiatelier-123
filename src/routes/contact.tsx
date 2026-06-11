import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import hero from "@/assets/portfolio-6.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Request a Quote | Zardosi Atelier" },
      {
        name: "description",
        content:
          "Request a quote or book a consultation with our embroidery atelier — response within two working days.",
      },
      { property: "og:title", content: "Contact — Zardosi Atelier" },
      { property: "og:description", content: "Begin a project with our embroidery atelier." },
      { property: "og:url", content: "/contact" },
      { property: "og:image", content: hero },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Begin"
        title="Request a"
        italic="feasibility review."
        description="Share your project and our atelier will respond within two working days with a tailored proposal."
        image={hero}
      />

      <section className="luxury-silk-bg py-10 sm:py-12">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 px-5 sm:px-6 lg:grid-cols-[1fr_1.35fr] lg:px-10">
          <Reveal>
            <span className="eyebrow">Studio</span>
            <h2 className="mt-3 font-serif text-4xl">Contact</h2>
            <div className="mt-7 space-y-6 text-[15px] font-medium">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">Email</p>
                <a
                  href="mailto:atelier@zardosiatelier.com"
                  className="mt-2 inline-block font-serif text-xl gold-link"
                >
                  atelier@zardosiatelier.com
                </a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">WhatsApp</p>
                <a
                  href="https://wa.me/918826023527"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block font-serif text-xl gold-link"
                >
                  +91 88260 23527
                </a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">Studio</p>
                <p className="mt-2 font-serif text-xl">New Delhi · Paris · New York</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form
              className="border border-gold/20 bg-champagne p-5 sm:p-8"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you. Our atelier will be in touch within two working days.");
              }}
            >
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
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-ink-soft">
                      {label}
                    </label>
                    <input
                      name={name}
                      type={type}
                      required={type !== "file"}
                      className="w-full border-b border-ink/25 bg-transparent py-2 text-[15px] font-medium transition-colors file:mr-3 file:border-0 file:bg-transparent file:text-[10px] file:uppercase file:tracking-[0.2em] file:text-gold focus:border-gold focus:outline-none"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-ink-soft">
                    Project Brief
                  </label>
                  <textarea
                    rows={4}
                    required
                    className="w-full border-b border-ink/25 bg-transparent py-2 text-[15px] font-medium transition-colors focus:border-gold focus:outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-8 w-full border border-ink bg-ink px-8 py-4 text-[10px] font-bold uppercase tracking-[0.24em] text-ivory transition-colors hover:border-gold hover:bg-gold hover:text-[#120c09]"
              >
                Send Request
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
