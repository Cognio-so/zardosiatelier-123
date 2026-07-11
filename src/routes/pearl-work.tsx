import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

import p01 from "@/assets/pearl-work-page-1.jpeg";
import p02 from "@/assets/pearl-work-page-2.jpeg";
import p03 from "@/assets/pearl-work-page-3.jpeg";
import p04 from "@/assets/pearl-work-page-4.jpeg";
import p05 from "@/assets/pearl-work-page-5.jpeg";
import p06 from "@/assets/pearl-work-page-6.jpeg";
import p07 from "@/assets/pearl-work-page-7.jpeg";
import p08 from "@/assets/pearl-work-page-8.jpeg";
import p09 from "@/assets/pearl-work-page-9.jpeg";

export const Route = createFileRoute("/pearl-work")({
  head: () => ({
    meta: [
      { title: "Pearl Work & Seed Bead Embroidery | Zardosi Atelier" },
      { name: "description", content: "Intricate pearl and seed-bead compositions stitched by hand. Explore our gallery of bespoke pearl work for bridalwear and couture." },
      { property: "og:title", content: "Pearl Work Embroidery - Zardosi Atelier" },
      { property: "og:url", content: "/pearl-work" },
      { property: "og:image", content: p01 },
    ],
    links: [{ rel: "canonical", href: "https://www.zardosiatelier.com/pearl-work" }],
  }),
  component: PearlWorkPage,
});

const galleryImages = [
  { src: p01, alt: "Pearl Work - Delicate check pattern design 1" },
  { src: p02, alt: "Pearl Work - Detailed surface pattern 2" },
  { src: p03, alt: "Pearl Work - Diamond lattice detail 3" },
  { src: p04, alt: "Pearl Work - Bridal fabric swatch 4" },
  { src: p05, alt: "Pearl Work - Couture glass beads detail 5" },
  { src: p06, alt: "Pearl Work - Traditional flower motif 6" },
  { src: p07, alt: "Pearl Work - Hand-sewn micro composition 7" },
  { src: p08, alt: "Pearl Work - Elegant white beadwork 8" },
  { src: p09, alt: "Pearl Work - Intricate mesh layout 9" },
];

const stats = [
  { value: "9", label: "Couture Swatches" },
  { value: "Premium", label: "Glass Pearls & Seed Beads" },
  { value: "Hand", label: "Stitched by Karigars" },
];

function PearlWorkPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prevImage = useCallback(() =>
    setLightbox((i) => (i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length)), []);
  const nextImage = useCallback(() =>
    setLightbox((i) => (i === null ? null : (i + 1) % galleryImages.length)), []);

  // Keyboard navigation
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
      {/* Hero Banner */}
      <section className="relative min-h-[50vh] overflow-hidden bg-[#16120e] flex items-center">
        {/* Background Collage */}
        <div className="absolute inset-0 grid grid-cols-4 opacity-15 pointer-events-none">
          {[p01, p03, p05, p08].map((src, i) => (
            <div key={i} className="overflow-hidden">
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
        {/* Shadow Overlay */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(22,18,14,0.96) 0%, rgba(22,18,14,0.8) 50%, rgba(22,18,14,0.96) 100%)"
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />

        <div className="relative z-10 w-full px-6 py-20 text-center">
          <Reveal>
            {/* Elegant emblem separator */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-[#C9A84C]/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
              <div className="h-[1px] w-12 bg-[#C9A84C]/50" />
            </div>

            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.55em] mb-4 text-[#C9A84C]">
              Embroidery Technique
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white tracking-wide mb-5">
              Pearl Work
            </h1>
            <p className="mx-auto max-w-[54ch] text-base leading-relaxed text-white/70 sm:text-lg mb-10">
              A delicate craft of composing glass pearls, seed beads, and bugle beads into structural works of art. 
              Individually hand-stitched to capture soft light, creating a signature dimensional luster on luxury bridalwear and couture garments.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 mb-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-serif text-3xl sm:text-4xl text-[#C9A84C]">{s.value}</p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className="border bg-[#C9A84C] border-[#C9A84C] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#120c09] transition hover:bg-transparent hover:text-[#C9A84C]">
                Request Swatches
              </Link>
              <Link to="/" className="border border-white/20 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/80 transition hover:border-white hover:text-white">
                ← Home
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: "#F7F2EA" }}>
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl sm:text-5xl text-[#1A110B] mb-3">Pearl Work Gallery</h2>
              <p className="text-[14px] font-medium text-[#5A4D40] max-w-[50ch] mx-auto">
                Explore our curated collection of 9 hand-embroidered swatches, showing the intricate placement of pearls and crystal beads.
              </p>
            </div>
          </Reveal>

          {/* Pinterest-style columns grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-0">
            {galleryImages.map((img, idx) => (
              <Reveal key={idx} delay={Math.min(idx * 40, 300)}>
                <button
                  onClick={() => openLightbox(idx)}
                  className="group relative block w-full mb-4 overflow-hidden focus:outline-none break-inside-avoid"
                  aria-label={`View ${img.alt}`}
                >
                  <div className="relative overflow-hidden bg-[#ECE5D8] rounded-[2px]">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: "rgba(22,18,14,0.6)" }}>
                      <ZoomIn size={24} className="text-white mb-2" strokeWidth={1.5} />
                      <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white">Zoom Detail</span>
                    </div>
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full bg-[#C9A84C]" />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Craft Detail Section */}
      <section className="py-16 sm:py-20 bg-[#16120e] text-white relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6">
          <Reveal>
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C9A84C] block mb-2">Our Process</span>
                <h3 className="font-serif text-3xl sm:text-4xl mb-6">Stitched with precision, bead by bead.</h3>
                <p className="text-white/70 leading-8 text-[15px] font-medium mb-6">
                  Every pearl is stitched using premium high-durability threads onto base fabrics like silk velvet, organza, or tulle. We mix standard white pearls with subtle gold tints and glass seed beads to create beautiful floral scrolls, grid patterns, and customized motifs for couture fashion houses.
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                    <span className="text-[13px] font-bold tracking-wider text-white/90">Premium glass and baroque pearls</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                    <span className="text-[13px] font-bold tracking-wider text-white/90">Perfect balance of pearl heights and weights</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                    <span className="text-[13px] font-bold tracking-wider text-white/90">Reinforced dual-stitch loops for exports</span>
                  </div>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden border border-white/10 rounded">
                <img src={p01} alt="Pearl work detail close-up" className="w-full h-full object-cover opacity-90" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand />

      {/* Lightbox Modal */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "rgba(10,8,6,0.97)" }}
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-white/15 text-white/80 transition hover:border-[#C9A84C] hover:text-[#C9A84C]"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.35em] text-white/50">
            {lightbox + 1} / {galleryImages.length}
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5 flex-wrap px-4">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === lightbox ? "18px" : "5px",
                  height: "5px",
                  backgroundColor: i === lightbox ? "#C9A84C" : "rgba(255,255,255,0.3)",
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
            className="flex flex-col items-center max-h-[85vh] max-w-[88vw] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              className="max-h-[80vh] max-w-[88vw] object-contain shadow-2xl"
              style={{ border: "1px solid rgba(201,168,76,0.1)" }}
            />
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
