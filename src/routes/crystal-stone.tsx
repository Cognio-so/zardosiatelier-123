import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageShell, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { Lens } from "@/registry/magicui/lens";
import { useState, useEffect, useCallback, useMemo } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { getPortfolioItems } from "@/lib/portfolio-admin";

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

export const Route = createFileRoute("/crystal-stone")({
  head: () => ({
    meta: [
      { title: "Crystal & Stone Work Embroidery | Zardosi Atelier" },
      {
        name: "description",
        content:
          "Hand-set crystals, zircons, Swarovski stones and Cutdana beads for couture brilliance. Explore our gallery of bespoke crystal and stone embroidery.",
      },
      { property: "og:title", content: "Crystal & Stone Work - Zardosi Atelier" },
      { property: "og:url", content: "/crystal-stone" },
      { property: "og:image", content: c01 },
    ],
    links: [{ rel: "canonical", href: "https://www.zardosiatelier.com/crystal-stone" }],
  }),
  component: CrystalStonePage,
});

const staticGalleryImages = [
  { src: c01, alt: "Amethyst Floral Scrollwork on Silk" },
  { src: c02, alt: "Multi-Stone Couture Panel Detail" },
  { src: c03, alt: "Gold Zircon Cluster Motif" },
  { src: c04, alt: "Hand-Set Swarovski Embellishments" },
  { src: c05, alt: "Cutdana Bugle Bead Border" },
  { src: c06, alt: "Dimensional Crystal Lattice Work" },
  { src: c07, alt: "Scattered Stone and Sequin Mix" },
  { src: c08, alt: "Stone Paisley Motif Swatch" },
  { src: c09, alt: "Full Panel Stonework Composition" },
  { src: c10, alt: "Mirror & Crystal Hand Embroidery" },
  { src: c11, alt: "Delicate Zircon Surface Overlay" },
  { src: c12, alt: "Symmetrical Mandala Stonework" },
  { src: c13, alt: "Couture Gown Crystal Embellishment" },
  { src: c14, alt: "Lace and Stone Bridal Border" },
  { src: c15, alt: "Full-Coverage Crystal Netting" },
  { src: c16, alt: "Burgundy Stone Inlay Detail" },
  { src: c17, alt: "Fine Crystal Mesh Close-up" },
  { src: c18, alt: "Floral Stone Cluster Motif" },
  { src: c19, alt: "Emerald-Tone Stone Panel" },
  { src: c20, alt: "Dual-Tone Crystal Scatter Swatch" },
  { src: c21, alt: "Rich Jewel-Tone Crystal Embroidery" },
];

const stats = [
  { value: "21", label: "Couture Swatches" },
  { value: "Swarovski", label: "& Premium Stones" },
  { value: "Hand", label: "Set by Artisans" },
];

const features = [
  "Swarovski crystals, zircons and glass stones",
  "Cutdana, bugle beads and flat-back rhinestones",
  "Hand-set precision placement on silk & organza",
  "Custom colour matching for couture specifications",
  "Export-ready with reinforced settings",
];

function CrystalStonePage() {
  const { data: portfolioItems = [] } = useQuery({
    queryKey: ["portfolio", "crystal-stone-page"],
    queryFn: () => getPortfolioItems(),
    staleTime: 0,
  });
  // Merge admin-uploaded images (from blob storage) with static default images.
  // Admin uploads appear first so new content is always visible at the top.
  const galleryImages = useMemo(() => {
    const adminUploaded = portfolioItems
      .filter((item) => item.categorySlug === "crystal-stone-work" && !item.id.startsWith("default-"))
      .map((item) => ({
        src: item.url,
        alt: item.caption || "Crystal and stone work portfolio image",
      }));
    return [...adminUploaded, ...staticGalleryImages];
  }, [portfolioItems]);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prevImage = useCallback(
    () => setLightbox((i) => (i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length)),
    []
  );
  const nextImage = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % galleryImages.length)),
    []
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, prevImage, nextImage]);

  return (
    <PageShell>
      {/* ── Hero Banner ─────────────────────────── */}
      <section className="relative min-h-[56vh] overflow-hidden flex items-center" style={{ backgroundColor: "#0D0B10" }}>
        {/* Background mosaic of crystal images */}
        <div className="absolute inset-0 grid grid-cols-5 opacity-[0.28] pointer-events-none">
          {[c01, c05, c09, c13, c17].map((src, i) => (
            <div key={i} className="overflow-hidden">
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        {/* Radial glow overlay - amethyst/purple tone for crystal luxury */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(120,60,180,0.18) 0%, transparent 70%), linear-gradient(to bottom, rgba(13,11,16,0.86) 0%, rgba(13,11,16,0.54) 50%, rgba(13,11,16,0.86) 100%)",
          }}
        />
        {/* Gold bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

        <div className="relative z-10 w-full px-6 py-24 text-center">
          <Reveal>
            {/* Gem ornament */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-[1px] w-16 bg-[#C9A84C]/50" />
              <div
                className="w-2 h-2 rotate-45"
                style={{ background: "#C9A84C" }}
              />
              <div className="h-[1px] w-16 bg-[#C9A84C]/50" />
            </div>

            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.55em] mb-4 text-[#C9A84C]">
              Embroidery Technique
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white tracking-wide mb-4 leading-[1.05]">
              Crystal &amp; <span className="italic font-normal">Stone Work</span>
            </h1>
            <p className="mx-auto max-w-[56ch] text-base leading-relaxed text-white/65 sm:text-lg mb-10">
              Each crystal and precious stone is hand-set with precision onto silk, organza and couture base fabrics. From
              Swarovski brilliance to Cutdana bugle beads - we craft embellishments that catch light at every angle and
              hold to export-grade standards.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 mb-10">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-serif text-3xl sm:text-4xl text-[#C9A84C]">{s.value}</p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="border bg-[#C9A84C] border-[#C9A84C] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#120c09] transition hover:bg-transparent hover:text-[#C9A84C]"
              >
                Request Swatches
              </Link>
              <Link
                to="/"
                className="border border-white/20 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/80 transition hover:border-white hover:text-white"
              >
                ← Home
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Gallery Section ──────────────────────── */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: "#F7F2EA" }}>
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.45em] text-[#C9A84C] block mb-3">
                Our Gallery
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#1A110B] mb-3">
                Crystal &amp; Stone Work Gallery
              </h2>
              <p className="text-[14px] font-medium text-[#5A4D40] max-w-[52ch] mx-auto leading-relaxed">
                21 hand-embroidered swatches showcasing the precision setting of crystals, zircons, Swarovski stones
                and Cutdana beads - from delicate scatter work to full-coverage couture panels.
              </p>
            </div>
          </Reveal>

          {/* Pinterest masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {galleryImages.map((img, idx) => (
              <Reveal key={idx} delay={Math.min(idx * 35, 280)}>
                <button
                  onClick={() => openLightbox(idx)}
                  className="group relative block w-full mb-4 overflow-hidden focus:outline-none break-inside-avoid"
                  aria-label={`View ${img.alt}`}
                >
                  <Lens zoomFactor={2.2} lensSize={132} isStatic={false}>
                    <div className="relative overflow-hidden bg-[#ECE5D8] rounded-[2px]">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: "rgba(13,11,16,0.65)" }}
                    >
                      <ZoomIn size={26} className="text-white mb-2" strokeWidth={1.5} />
                      <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white">View Detail</span>
                    </div>
                    {/* Gold bottom sweep */}
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full bg-[#C9A84C]" />
                  </div>
                </Lens>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Craft Detail Section ─────────────────── */}
      <section className="py-16 sm:py-20 relative overflow-hidden" style={{ backgroundColor: "#0D0B10" }}>
        {/* Subtle purple glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(100,40,160,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-white">
          <Reveal>
            <div className="grid gap-12 md:grid-cols-2 items-center">
              {/* Text side */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.45em] text-[#C9A84C] block mb-3">
                  Our Process
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl mb-6 leading-[1.1]">
                  Set with precision, <span className="italic font-normal">stone by stone.</span>
                </h3>
                <p className="text-white/65 leading-[1.9] text-[15px] font-medium mb-8">
                  Every crystal and stone is individually placed and secured using premium adhesives and hand-lock
                  stitching. We work with flat-back rhinestones, faceted zircons, glass stones, Cutdana beads and
                  Swarovski elements - each matched to your design specification and base fabric for maximum brilliance.
                </p>
                <ul className="flex flex-col gap-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span
                        className="shrink-0 w-1.5 h-1.5 rotate-45 inline-block"
                        style={{ background: "#C9A84C" }}
                      />
                      <span className="text-[13px] font-semibold tracking-wide text-white/85">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Feature image */}
              <div
                className="relative aspect-[4/3] overflow-hidden"
                style={{ border: "1px solid rgba(201,168,76,0.15)" }}
              >
                <img
                  src={c01}
                  alt="Amethyst crystal & stone embroidery close-up"
                  className="w-full h-full object-cover opacity-90"
                />
                {/* Subtle vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(13,11,16,0.35) 0%, transparent 60%)",
                  }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand />

      {/* ── Lightbox Modal ───────────────────────── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "rgba(10,8,13,0.97)" }}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-white/15 text-white/80 transition hover:border-[#C9A84C] hover:text-[#C9A84C]"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.35em] text-white/45">
            {lightbox + 1} / {galleryImages.length}
          </div>

          {/* Navigation dots */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5 flex-wrap px-4">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === lightbox ? "18px" : "5px",
                  height: "5px",
                  backgroundColor: i === lightbox ? "#C9A84C" : "rgba(255,255,255,0.25)",
                }}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 sm:left-8 flex h-12 w-12 items-center justify-center border border-white/15 text-white/80 transition hover:border-[#C9A84C] hover:text-[#C9A84C]"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Main Image */}
          <div
            className="flex flex-col items-center max-h-[88vh] max-w-[88vw] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              className="max-h-[78vh] max-w-[88vw] object-contain shadow-2xl"
              style={{ border: "1px solid rgba(201,168,76,0.12)" }}
            />
            {galleryImages[lightbox].alt && (
              <p className="mt-3 font-serif text-lg text-[#F5F0E8] text-center max-w-[60ch]">
                {galleryImages[lightbox].alt}
              </p>
            )}
          </div>

          {/* Right Arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 sm:right-8 flex h-12 w-12 items-center justify-center border border-white/15 text-white/80 transition hover:border-[#C9A84C] hover:text-[#C9A84C]"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </PageShell>
  );
}





