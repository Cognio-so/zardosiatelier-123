import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { Lens } from "@/registry/magicui/lens";
import { useState, useEffect } from "react";
import { getPortfolioItems, type PortfolioItem } from "@/lib/portfolio-admin";

import portfolioHero from "@/assets/portfolio-hero.webp";
import p1 from "@/assets/portfolio-1.webp";
import p2 from "@/assets/portfolio-2.webp";
import p3 from "@/assets/portfolio-3.webp";
import p4 from "@/assets/portfolio-4.webp";
import p5 from "@/assets/portfolio-5.webp";
import p6 from "@/assets/portfolio-6.webp";
import gown from "@/assets/collection-gown.webp";
import bridal from "@/assets/collection-bridal.webp";
import handbag from "@/assets/collection-handbag.webp";
import aari from "@/assets/technique-aari.webp";

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
      { property: "og:image", content: portfolioHero },
    ],
    links: [{ rel: "canonical", href: "https://www.zardosiatelier.com/portfolio" }],
  }),
  component: PortfolioPage,
});

type StaticItem = { src: string; tag: string; caption: string; isDynamic?: false };
type GalleryItem = StaticItem | (PortfolioItem & { src: string });

const staticItems: StaticItem[] = [
  { src: portfolioHero, tag: "Couture · Zardosi", caption: "Zardosi Gold Thread Macro" },
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

function PortfolioCard({ src, tag, caption }: { src: string; tag: string; caption: string }) {
  return (
    <div
      className="group relative cursor-pointer overflow-hidden bg-[#FAF7F2]"
      data-preview-image={src}
      style={{
        border: "1px solid rgba(212,175,55,0.18)",
        transition: "border-color 0.7s cubic-bezier(0.4,0,0.2,1), box-shadow 0.7s cubic-bezier(0.4,0,0.2,1)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(212,175,55,0.72)";
        el.style.boxShadow = "0 0 0 1px rgba(212,175,55,0.38), 0 8px 40px rgba(0,0,0,0.22)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(212,175,55,0.18)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Zoom image */}
      <Lens zoomFactor={2.2} lensSize={140} isStatic={false}>
        <img
          src={src}
          alt={caption}
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-cover"
          style={{ transition: "transform 1.4s cubic-bezier(0.19,1,0.22,1)", display: "block" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.07)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
        />
      </Lens>

      {/* Dark gradient overlay — fades in on hover */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(8,5,3,0.88) 0%, rgba(8,5,3,0.30) 40%, transparent 100%)",
          opacity: 0,
          transition: "opacity 0.65s cubic-bezier(0.4,0,0.2,1)",
        }}
        ref={(el) => {
          if (!el) return;
          const parent = el.parentElement!;
          const show = () => (el.style.opacity = "1");
          const hide = () => (el.style.opacity = "0");
          parent.addEventListener("mouseenter", show);
          parent.addEventListener("mouseleave", hide);
        }}
      />

      {/* Slide-up text */}
      <div
        className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 pointer-events-none"
        style={{
          transform: "translateY(14px)",
          opacity: 0,
          transition: "transform 0.65s cubic-bezier(0.19,1,0.22,1), opacity 0.55s ease",
        }}
        ref={(el) => {
          if (!el) return;
          const parent = el.parentElement!;
          const show = () => { el.style.transform = "translateY(0)"; el.style.opacity = "1"; };
          const hide = () => { el.style.transform = "translateY(14px)"; el.style.opacity = "0"; };
          parent.addEventListener("mouseenter", show);
          parent.addEventListener("mouseleave", hide);
        }}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A84C]">{tag}</p>
        <h2 className="mt-2 font-serif text-3xl leading-tight text-[#F5F0E8]">{caption}</h2>
      </div>
    </div>
  );
}

function PortfolioPage() {
  const [dynamicItems, setDynamicItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    getPortfolioItems()
      .then(setDynamicItems)
      .catch(() => {/* silently fall back to static items */});
  }, []);

  const allItems: GalleryItem[] = [
    ...dynamicItems.map((d) => ({ ...d, src: d.url })),
    ...staticItems,
  ];

  return (
    <PageShell>
      <PageHero
        eyebrow="Atelier · Archive"
        title="Selected"
        italic="work."
        description="A curated archive of recent commissions — couture, bridal, accessories and atelier studies."
        image={portfolioHero}
      />
      <section className="luxury-silk-bg py-10 sm:py-12">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
          {dynamicItems.length > 0 && (
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#C9A84C]">
                  Latest Work
                </span>
                <div style={{ height: "1px", flex: 1, background: "rgba(201,168,76,0.2)" }} />
                <span className="text-[10px] text-[#9A8878]">
                  {dynamicItems.length} new addition{dynamicItems.length !== 1 ? "s" : ""}
                </span>
              </div>
            </Reveal>
          )}
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {allItems.map((p, i) => (
              <Reveal key={`${p.caption}-${i}`} delay={(i % 3) * 100} className="mb-6 break-inside-avoid">
                <PortfolioCard src={p.src} tag={p.tag} caption={p.caption} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </PageShell>
  );
}
