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

// Zardozi imports
import z01 from "@/assets/zardozi-1.jpeg";
import z02 from "@/assets/zardozi-2.jpg";
import z03 from "@/assets/zardozi-3.jpg";
import z04 from "@/assets/zardozi-4.jpg";
import z05 from "@/assets/zardozi-5.jpg";
import z06 from "@/assets/zardozi-6.jpeg";
import z07 from "@/assets/zardozi-7.jpeg";
import z08 from "@/assets/zardozi-8.jpeg";
import z09 from "@/assets/zardozi-9.jpeg";
import z10 from "@/assets/zardozi-10.jpeg";
import z11 from "@/assets/zardozi-11.jpeg";
import z12 from "@/assets/zardozi-12.jpeg";
import z13 from "@/assets/zardozi-13.jpeg";
import z14 from "@/assets/zardozi-14.jpeg";
import z15 from "@/assets/zardozi-15.jpeg";
import z16 from "@/assets/zardozi-16.jpeg";
import z17 from "@/assets/zardozi-17.jpeg";
import z18 from "@/assets/zardozi-18.jpeg";
import z19 from "@/assets/zardozi-19.jpeg";
import z20 from "@/assets/zardozi-20.jpeg";
import z21 from "@/assets/zardozi-21.jpeg";
import z22 from "@/assets/zardozi-22.jpeg";
import z23 from "@/assets/zardozi-23.jpeg";
import z24 from "@/assets/zardozi-24.jpeg";
import z25 from "@/assets/zardozi-25.jpeg";
import z26 from "@/assets/zardozi-26.jpeg";
import z27 from "@/assets/zardozi-27.jpeg";
import z28 from "@/assets/zardozi-28.jpeg";
import z29 from "@/assets/zardozi-29.jpeg";
import z30 from "@/assets/zardozi-30.jpeg";
import z31 from "@/assets/zardozi-31.jpeg";
import z32 from "@/assets/zardozi-32.jpeg";
import z33 from "@/assets/zardozi-33.jpeg";
import z34 from "@/assets/zardozi-34.jpeg";
import z35 from "@/assets/zardozi-35.jpeg";
import z36 from "@/assets/zardozi-36.jpeg";
import z37 from "@/assets/zardozi-37.jpeg";

// Sequin imports
import s01 from "@/assets/sequin-1.jpg";
import s02 from "@/assets/sequin-2.jpg";
import s03 from "@/assets/sequin-3.jpeg";
import s04 from "@/assets/sequin-4.jpeg";
import s05 from "@/assets/sequin-5.jpg";
import s06 from "@/assets/sequin-6.jpg";

// Crystal & Stone imports
import c01 from "@/assets/crystal-1.jpeg";
import c02 from "@/assets/crystal-2.jpeg";
import c03 from "@/assets/crystal-3.jpeg";
import c04 from "@/assets/crystal-4.jpeg";
import c05 from "@/assets/crystal-5.jpeg";
import c06 from "@/assets/crystal-6.jpeg";
import c07 from "@/assets/crystal-7.jpeg";
import c08 from "@/assets/crystal-8.jpeg";
import c09 from "@/assets/crystal-9.jpeg";
import c10 from "@/assets/crystal-10.jpeg";
import c11 from "@/assets/crystal-11.jpeg";
import c12 from "@/assets/crystal-12.jpeg";
import c13 from "@/assets/crystal-13.jpeg";
import c14 from "@/assets/crystal-14.jpeg";
import c15 from "@/assets/crystal-15.jpeg";
import c16 from "@/assets/crystal-16.jpeg";
import c17 from "@/assets/crystal-17.jpeg";
import c18 from "@/assets/crystal-18.jpeg";
import c19 from "@/assets/crystal-19.jpeg";
import c20 from "@/assets/crystal-20.jpeg";
import c21 from "@/assets/crystal-21.jpeg";

// Resham & Zari imports
import r01 from "@/assets/resham-zari-page-1.jpeg";
import r02 from "@/assets/resham-zari-page-2.jpeg";
import r03 from "@/assets/resham-zari-page-3.jpeg";
import r04 from "@/assets/resham-zari-page-4.jpeg";
import r05 from "@/assets/resham-zari-page-5.jpeg";
import r06 from "@/assets/resham-zari-page-6.jpeg";
import r07 from "@/assets/resham-zari-page-7.jpeg";
import r08 from "@/assets/resham-zari-page-8.jpeg";
import r09 from "@/assets/resham-zari-page-9.jpeg";
import r10 from "@/assets/resham-zari-page-10.jpeg";
import r11 from "@/assets/resham-zari-page-11.jpeg";
import r12 from "@/assets/resham-zari-page-12.jpeg";
import r13 from "@/assets/resham-zari-page-13.jpeg";
import r14 from "@/assets/resham-zari-page-14.jpeg";
import r15 from "@/assets/resham-zari-page-15.jpeg";
import r16 from "@/assets/resham-zari-page-16.jpeg";
import r17 from "@/assets/resham-zari-page-17.jpeg";
import r18 from "@/assets/resham-zari-page-18.jpeg";
import r19 from "@/assets/resham-zari-page-19.jpeg";
import r20 from "@/assets/resham-zari-page-20.jpeg";
import r21 from "@/assets/resham-zari-page-21.jpeg";
import r22 from "@/assets/resham-zari-page-22.jpeg";
import r23 from "@/assets/resham-zari-page-23.png";

// Pearl Work imports
import pr01 from "@/assets/pearl-work-page-1.jpeg";
import pr02 from "@/assets/pearl-work-page-2.jpeg";
import pr03 from "@/assets/pearl-work-page-3.jpeg";
import pr04 from "@/assets/pearl-work-page-4.jpeg";
import pr05 from "@/assets/pearl-work-page-5.jpeg";
import pr06 from "@/assets/pearl-work-page-6.jpeg";
import pr07 from "@/assets/pearl-work-page-7.jpeg";
import pr08 from "@/assets/pearl-work-page-8.jpeg";
import pr09 from "@/assets/pearl-work-page-9.jpeg";

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
  // ── Existing Portfolio Work ──
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

  // ── ZARDOZI GALLERY ──
  { src: z01, tag: "Couture · Zardozi", caption: "Zardozi Paisley Motif" },
  { src: z02, tag: "Couture · Zardozi", caption: "Detailed Gold Zardozi Border" },
  { src: z03, tag: "Couture · Zardozi", caption: "Fine Metallic Needlework Study" },
  { src: z04, tag: "Couture · Zardozi", caption: "Zardozi Ornate Panel" },
  { src: z05, tag: "Couture · Zardozi", caption: "Gold Zardozi Specimen Study" },
  { src: z06, tag: "Couture · Zardozi", caption: "Zardozi Floral Vine Motif" },
  { src: z07, tag: "Couture · Zardozi", caption: "Artisan Zardozi Adda Crafting" },
  { src: z08, tag: "Couture · Zardozi", caption: "Heritage Gold Zardozi Medallion" },
  { src: z09, tag: "Couture · Zardozi", caption: "Intricate Zardozi Mesh Panel" },
  { src: z10, tag: "Couture · Zardozi", caption: "Zardozi Metallic Gold Relief" },
  { src: z11, tag: "Couture · Zardozi", caption: "Couture Zardozi Swatch" },
  { src: z12, tag: "Couture · Zardozi", caption: "Zardozi Silk Thread Blend" },
  { src: z13, tag: "Couture · Zardozi", caption: "Fine Zardozi Leaf Pattern" },
  { src: z14, tag: "Couture · Zardozi", caption: "Symmetrical Zardozi Spray" },
  { src: z15, tag: "Couture · Zardozi", caption: "Zardozi Heavy Embellished Swatch" },
  { src: z16, tag: "Couture · Zardozi", caption: "Atelier Zardozi Gold Leaf" },
  { src: z17, tag: "Couture · Zardozi", caption: "Zardozi Micro Stitch Detail" },
  { src: z18, tag: "Couture · Zardozi", caption: "Heritage Gold Zardozi Lattice" },
  { src: z19, tag: "Couture · Zardozi", caption: "Zardozi Baroque Floral Cluster" },
  { src: z20, tag: "Couture · Zardozi", caption: "Zardozi Gold & Copper Threads" },
  { src: z21, tag: "Couture · Zardozi", caption: "Zardozi Handcrafted Corner Motif" },
  { src: z22, tag: "Couture · Zardozi", caption: "Zardozi Traditional Kalga Motif" },
  { src: z23, tag: "Couture · Zardozi", caption: "Zardozi Floral Border Specimen" },
  { src: z24, tag: "Couture · Zardozi", caption: "Fine Zardozi Metal Wire Layout" },
  { src: z25, tag: "Couture · Zardozi", caption: "Zardozi Swatch with Gems" },
  { src: z26, tag: "Couture · Zardozi", caption: "Detailed Zardozi Gold Scroll" },
  { src: z27, tag: "Couture · Zardozi", caption: "Zardozi Heavy Bridal Swatch" },
  { src: z28, tag: "Couture · Zardozi", caption: "Traditional Zardozi Medallion" },
  { src: z29, tag: "Couture · Zardozi", caption: "Zardozi Micro-Wire Floral Spray" },
  { src: z30, tag: "Couture · Zardozi", caption: "Zardozi Classical Wave Border" },
  { src: z31, tag: "Couture · Zardozi", caption: "Zardozi Royal Crest Embroidery" },
  { src: z32, tag: "Couture · Zardozi", caption: "Zardozi Gold & Tonal Silk Mesh" },
  { src: z33, tag: "Couture · Zardozi", caption: "Zardozi Floral Foliage Panel" },
  { src: z34, tag: "Couture · Zardozi", caption: "Atelier Zardozi Gold Crest" },
  { src: z35, tag: "Couture · Zardozi", caption: "Zardozi Couture Swatch Study" },
  { src: z36, tag: "Couture · Zardozi", caption: "Zardozi Heavy Gold Panel" },
  { src: z37, tag: "Couture · Zardozi", caption: "Zardozi Metallic Floral Vine" },

  // ── SEQUIN GALLERY ──
  { src: s01, tag: "Couture · Sequin", caption: "Deep Crimson Sequin Lattice" },
  { src: s02, tag: "Couture · Sequin", caption: "Muted Gold Sequin Lattice Panel" },
  { src: s03, tag: "Couture · Sequin", caption: "Dimensional 3D Floral Sequins" },
  { src: s04, tag: "Couture · Sequin", caption: "Full Coverage Floral Sequin Sprays" },
  { src: s05, tag: "Couture · Sequin", caption: "Metallic Bead & Sequin Swatch" },
  { src: s06, tag: "Couture · Sequin", caption: "Sequin Cluster Couture Embellishment" },

  // ── CRYSTAL & STONE GALLERY ──
  { src: c01, tag: "Couture · Crystal & Stone", caption: "Faceted Amethyst Flower Scroll" },
  { src: c02, tag: "Couture · Crystal & Stone", caption: "Jeweled Tone Stone Cluster Panel" },
  { src: c03, tag: "Couture · Crystal & Stone", caption: "Gold Zircon Cluster Swatch" },
  { src: c04, tag: "Couture · Crystal & Stone", caption: "Clear Swarovski Crystal Motif" },
  { src: c05, tag: "Couture · Crystal & Stone", caption: "Cutdana & Bugle Bead Border" },
  { src: c06, tag: "Couture · Crystal & Stone", caption: "Dimensional Crystal Lattice Detail" },
  { src: c07, tag: "Couture · Crystal & Stone", caption: "Scattered Glass Stone Scatter" },
  { src: c08, tag: "Couture · Crystal & Stone", caption: "Crystal Paisley Motif Swatch" },
  { src: c09, tag: "Couture · Crystal & Stone", caption: "Heavy Crystal & Bead Bridal Swatch" },
  { src: c10, tag: "Couture · Crystal & Stone", caption: "Mirror & Crystal Embroidery Panel" },
  { src: c11, tag: "Couture · Crystal & Stone", caption: "Delicate Zircon Cluster Spray" },
  { src: c12, tag: "Couture · Crystal & Stone", caption: "Symmetrical Crystal Mandala" },
  { src: c13, tag: "Couture · Crystal & Stone", caption: "Jeweled Gown Shoulder Embellishment" },
  { src: c14, tag: "Couture · Crystal & Stone", caption: "Beaded Bridal Border Swatch" },
  { src: c15, tag: "Couture · Crystal & Stone", caption: "Full-Coverage Crystal Netting" },
  { src: c16, tag: "Couture · Crystal & Stone", caption: "Deep Maroon Faceted Stone Inlay" },
  { src: c17, tag: "Couture · Crystal & Stone", caption: "Micro Crystal Net Pattern" },
  { src: c18, tag: "Couture · Crystal & Stone", caption: "Flower Medallion Stone Cluster" },
  { src: c19, tag: "Couture · Crystal & Stone", caption: "Emerald Green Stone Embellishment" },
  { src: c20, tag: "Couture · Crystal & Stone", caption: "Dual-Tone Crystal Scatter Pattern" },
  { src: c21, tag: "Couture · Crystal & Stone", caption: "Rich Emerald Crystal Border Swatch" },

  // ── RESHAM & ZARI GALLERY ──
  { src: r01, tag: "Couture · Resham & Zari", caption: "Resham Silk Floral Medallion" },
  { src: r02, tag: "Couture · Resham & Zari", caption: "Gold Zari Floral Vine Pattern" },
  { src: r03, tag: "Couture · Resham & Zari", caption: "Fine Silk Resham Corner Study" },
  { src: r04, tag: "Couture · Resham & Zari", caption: "Delicate Zari Border Layout" },
  { src: r05, tag: "Couture · Resham & Zari", caption: "Resham Tonal Floral Spray" },
  { src: r06, tag: "Couture · Resham & Zari", caption: "Detailed Zari Lattice panel" },
  { src: r07, tag: "Couture · Resham & Zari", caption: "Resham Silk Satin Stitch Motif" },
  { src: r08, tag: "Couture · Resham & Zari", caption: "Heritage Zari Gold Thread Scroll" },
  { src: r09, tag: "Couture · Resham & Zari", caption: "Resham Pastel Floral Study" },
  { src: r10, tag: "Couture · Resham & Zari", caption: "Zari Geometric Grid Pattern" },
  { src: r11, tag: "Couture · Resham & Zari", caption: "Fine Resham Silk Petals" },
  { src: r12, tag: "Couture · Resham & Zari", caption: "Detailed Zari Wave Border" },
  { src: r13, tag: "Couture · Resham & Zari", caption: "Resham Tonal Silk Border Swatch" },
  { src: r14, tag: "Couture · Resham & Zari", caption: "Zari Gold Embroidery Wave" },
  { src: r15, tag: "Couture · Resham & Zari", caption: "Resham Silk Miniature Motif" },
  { src: r16, tag: "Couture · Resham & Zari", caption: "Heavy Zari Bridal Border Swatch" },
  { src: r17, tag: "Couture · Resham & Zari", caption: "Resham Silk Floral vine border" },
  { src: r18, tag: "Couture · Resham & Zari", caption: "Zari Gold Leaf Vine Spray" },
  { src: r19, tag: "Couture · Resham & Zari", caption: "Resham & Zari Miniature Paisley" },
  { src: r20, tag: "Couture · Resham & Zari", caption: "Zari Gold Diamond Mesh" },
  { src: r21, tag: "Couture · Resham & Zari", caption: "Resham Silk Pastel Mandala" },
  { src: r22, tag: "Couture · Resham & Zari", caption: "Zari Traditional Kalga Panel" },
  { src: r23, tag: "Couture · Resham & Zari", caption: "Exquisite Resham & Zari Couture Fabric" },

  // ── PEARL WORK GALLERY ──
  { src: pr01, tag: "Couture · Pearl Work", caption: "Delicate Pearl Check Swatch" },
  { src: pr02, tag: "Couture · Pearl Work", caption: "Seed Bead & Glass Pearl Border" },
  { src: pr03, tag: "Couture · Pearl Work", caption: "Pearl Diamond Lattice Swatch" },
  { src: pr04, tag: "Couture · Pearl Work", caption: "Pearl Bridal Fabric Panel" },
  { src: pr05, tag: "Couture · Pearl Work", caption: "Intricate Baroque Pearl Cluster" },
  { src: pr06, tag: "Couture · Pearl Work", caption: "Glass Pearl Floral Scroll Motif" },
  { src: pr07, tag: "Couture · Pearl Work", caption: "Pearl Micro Seed Bead Lattice" },
  { src: pr08, tag: "Couture · Pearl Work", caption: "Elegant White Pearl Spray" },
  { src: pr09, tag: "Couture · Pearl Work", caption: "Glass Pearl mesh panel Swatch" },
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
