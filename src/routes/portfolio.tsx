import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import p5 from "@/assets/portfolio-5.jpg";
import p6 from "@/assets/portfolio-6.jpg";
import gown from "@/assets/collection-gown.jpg";
import bridal from "@/assets/collection-bridal.jpg";
import handbag from "@/assets/collection-handbag.jpg";
import aari from "@/assets/technique-aari.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Couture Embroidery Archive | Zardosi Atelier" },
      {
        name: "description",
        content:
          "Selected couture embroidery work for global fashion houses — bridal, eveningwear, accessories.",
      },
      { property: "og:title", content: "Portfolio — Zardosi Atelier" },
      { property: "og:description", content: "A curated archive of luxury hand embroidery work." },
      { property: "og:url", content: "/portfolio" },
      { property: "og:image", content: p1 },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: PortfolioPage,
});

const items = [
  { src: p1, tag: "Couture · Zardosi", caption: "Embroidered Evening Cape" },
  { src: gown, tag: "Couture · Gold Thread", caption: "La Sérénade Gown" },
  { src: p4, tag: "Bridal · Lace Border", caption: "Lace-Bordered Bridal Veil" },
  { src: bridal, tag: "Bridal · Crystal", caption: "Veil of Pearls Bodice" },
  { src: p6, tag: "Couture · 3D Florals", caption: "Cascading Petal Skirt" },
  { src: p5, tag: "Atelier · Process", caption: "Hand-set Gold Thread Study" },
  { src: p3, tag: "Accessory · Crystal", caption: "All-Over Crystal Minaudière" },
  { src: handbag, tag: "Accessory · Bead", caption: "Petit Bijou Handbag" },
  { src: p2, tag: "Menswear · Tonal", caption: "Tonal Lapel Detail" },
  { src: aari, tag: "Technique · Aari", caption: "Fine Aari Motif Study" },
];

function PortfolioPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Atelier · Archive"
        title="Selected"
        italic="work."
        description="A curated archive of recent commissions — couture, bridal, accessories and atelier studies."
        image={p1}
      />
      <section className="luxury-silk-bg py-16">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {items.map((p, i) => (
              <Reveal key={i} delay={(i % 3) * 100} className="mb-6 break-inside-avoid">
                <div className="group relative overflow-hidden luxury-card cursor-pointer" data-preview-image={p.src}>
                  <img
                    src={p.src}
                    alt={p.caption}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-ink/0 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    <div className="p-6">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-gold-soft">
                        {p.tag}
                      </p>
                      <h4 className="mt-2 font-serif text-2xl text-ivory">{p.caption}</h4>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </PageShell>
  );
}
