import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import hero from "@/assets/portfolio-6.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Request a Quote | Maison Auréline" },
      { name: "description", content: "Request a quote or book a consultation with our embroidery atelier — response within two working days." },
      { property: "og:title", content: "Contact — Maison Auréline" },
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

      <section className="bg-ivory py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-20">
          <Reveal>
            <span className="eyebrow">Studio</span>
            <h2 className="mt-5 font-serif text-3xl">Contact</h2>
            <div className="mt-10 space-y-8 text-sm">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">Email</p>
                <a href="mailto:atelier@aureline.studio" className="mt-2 inline-block font-serif text-xl gold-link">atelier@aureline.studio</a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">WhatsApp</p>
                <a href="https://wa.me/918826023527" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-serif text-xl gold-link">+91 88260 23527</a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">Studio</p>
                <p className="mt-2 font-serif text-xl">New Delhi · Paris · New York</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form
              className="bg-champagne p-8 sm:p-12 ring-1 ring-ink/5"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you. Our atelier will be in touch within two working days.");
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  ["Full Name", "name", "text"],
                  ["Brand / Maison", "brand", "text"],
                  ["Country", "country", "text"],
                  ["Email", "email", "email"],
                  ["WhatsApp", "whatsapp", "text"],
                  ["Upload Design", "file", "file"],
                ].map(([label, name, type]) => (
                  <div key={name}>
                    <label className="text-[10px] uppercase tracking-[0.3em] text-ink-soft block mb-2">{label}</label>
                    <input
                      name={name}
                      type={type}
                      required={type !== "file"}
                      className="w-full border-b border-ink/15 bg-transparent py-2 text-sm focus:border-gold focus:outline-none transition-colors file:mr-3 file:border-0 file:bg-transparent file:text-[10px] file:uppercase file:tracking-[0.2em] file:text-gold"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-ink-soft block mb-2">Project Brief</label>
                  <textarea rows={4} required className="w-full border-b border-ink/15 bg-transparent py-2 text-sm focus:border-gold focus:outline-none transition-colors" />
                </div>
              </div>
              <button type="submit" className="mt-10 w-full border border-ink bg-ink px-10 py-4 text-[10px] uppercase tracking-[0.35em] text-ivory transition-colors hover:bg-gold hover:border-gold">
                Send Request
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
