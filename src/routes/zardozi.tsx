import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageShell, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { useState, useEffect, useCallback, useMemo } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { getPortfolioItems } from "@/lib/portfolio-admin";

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

export const Route = createFileRoute("/zardozi")({
  head: () => ({
    meta: [
      { title: "Zardozi Embroidery - Metallic Gold Threadwork | Zardosi Atelier" },
      { name: "description", content: "Centuries-old zardozi metallic gold threadwork crafted by master karigars. Explore our complete gallery of zardozi embroidery for luxury couture." },
      { property: "og:title", content: "Zardozi Embroidery - Zardosi Atelier" },
      { property: "og:url", content: "/zardozi" },
      { property: "og:image", content: z01 },
    ],
    links: [{ rel: "canonical", href: "https://www.zardosiatelier.com/zardozi" }],
  }),
  component: ZardoziPage,
});

const staticGalleryImages = [
  { src: z01, alt: "Zardozi paisley motif - gold thread on white silk" },
  { src: z02, alt: "Zardozi embroidery detail close-up" },
  { src: z03, alt: "Zardozi needlework - fine metallic craftsmanship" },
  { src: z04, alt: "Zardozi gold threadwork panel" },
  { src: z05, alt: "Zardozi embellishment on couture fabric" },
  { src: z06, alt: "Zardozi floral motif in metallic thread" },
  { src: z07, alt: "Zardozi hand embroidery - artisan work" },
  { src: z08, alt: "Zardozi - intricate gold design" },
  { src: z09, alt: "Zardozi embroidery pattern detail" },
  { src: z10, alt: "Zardozi metallic work - close up" },
  { src: z11, alt: "Zardozi couture embroidery panel" },
  { src: z12, alt: "Zardozi silk threadwork" },
  { src: z13, alt: "Zardozi embroidery - ornate detail" },
  { src: z14, alt: "Zardozi floral arrangement in gold" },
  { src: z15, alt: "Zardozi surface embroidery sample" },
  { src: z16, alt: "Zardozi artisan work - luxury finish" },
  { src: z17, alt: "Zardozi gold work detail" },
  { src: z18, alt: "Zardozi embroidery - heritage craft" },
  { src: z19, alt: "Zardozi pattern - symmetrical motif" },
  { src: z20, alt: "Zardozi embroidery - couture finish" },
  { src: z21, alt: "Zardozi detailed needlework" },
  { src: z22, alt: "Zardozi gold embroidery on fabric" },
  { src: z23, alt: "Zardozi hand-stitched panel" },
  { src: z24, alt: "Zardozi - luxury embellishment" },
  { src: z25, alt: "Zardozi design with gemstone accents" },
  { src: z26, alt: "Zardozi embroidery - artisan crafted" },
  { src: z27, alt: "Zardozi surface work - export quality" },
  { src: z28, alt: "Zardozi embroidery - fine detail" },
  { src: z29, alt: "Zardozi embroidery - artisan detail" },
  { src: z30, alt: "Zardozi embroidery - gold threadwork" },
  { src: z31, alt: "Zardozi embroidery - ornate motif" },
  { src: z32, alt: "Zardozi embroidery - couture panel" },
  { src: z33, alt: "Zardozi embroidery - surface embellishment" },
  { src: z34, alt: "Zardozi embroidery - heritage craft" },
  { src: z35, alt: "Zardozi embroidery - luxury finish" },
  { src: z36, alt: "Zardozi embroidery - karigan work" },
  { src: z37, alt: "Zardozi embroidery - export quality" },
];

const stats = [
  { value: "500+", label: "Years of Heritage" },
  { value: "37", label: "Signature Designs" },
  { value: "100%", label: "Hand Stitched" },
];

function ZardoziPage() {
  const { data: portfolioItems = [] } = useQuery({
    queryKey: ["portfolio", "zardozi-page"],
    queryFn: () => getPortfolioItems(),
    staleTime: 0,
  });
  // Merge admin-uploaded images (from blob storage) with static default images.
  // Admin uploads appear first so new content is always visible at the top.
  const galleryImages = useMemo(() => {
    const adminUploaded = portfolioItems
      .filter((item) => item.categorySlug === "zardozi" && !item.id.startsWith("default-"))
      .map((item) => ({
        src: item.url,
        alt: item.caption || "Zardozi embroidery portfolio image",
      }));
    return [...adminUploaded, ...staticGalleryImages];
  }, [portfolioItems]);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prevImage = useCallback(() =>
    setLightbox((i) => (i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length)), [galleryImages.length]);
  const nextImage = useCallback(() =>
    setLightbox((i) => (i === null ? null : (i + 1) % galleryImages.length)), [galleryImages.length]);

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
      {/* ── Hero ── */}
      <section className="relative min-h-[55vh] overflow-hidden bg-[#0d0a07] flex items-center">
        {/* Background collage */}
        <div className="absolute inset-0 grid grid-cols-4 opacity-25 pointer-events-none">
          {[z08, z12, z17, z22].map((src, i) => (
            <div key={i} className="overflow-hidden">
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, rgba(13,10,7,0.97) 0%, rgba(13,10,7,0.75) 50%, rgba(13,10,7,0.97) 100%)"
        }} />
        {/* Gold border lines */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: "linear-gradient(to bottom, transparent, #C9A84C, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-[3px]" style={{ background: "linear-gradient(to bottom, transparent, #C9A84C, transparent)" }} />

        <div className="relative z-10 w-full px-6 py-24 text-center">
          <Reveal>
            {/* Decorative element */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A84C]" />
              <div className="w-2 h-2 rotate-45 border border-[#C9A84C]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A84C]" />
            </div>

            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.55em] mb-5" style={{ color: "#C9A84C" }}>
              Embroidery Technique
            </span>
            <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl text-white leading-none tracking-tight mb-4">
              Zardozi
            </h1>
            <p className="font-serif italic text-2xl sm:text-3xl mb-6" style={{ color: "#C9A84C" }}>
              The Art of Metallic Gold
            </p>
            <p className="mx-auto max-w-[56ch] text-base font-medium leading-relaxed text-white/70 sm:text-lg mb-10">
              Born in the imperial courts of the Mughal era - zardozi is the art of embroidering with metallic threads,
              sequins and gemstones on rich fabrics. Each piece takes days of patient hand-craft by master karigars.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-12 mb-10">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-serif text-4xl" style={{ color: "#C9A84C" }}>{s.value}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact" className="border bg-[#C9A84C] border-[#C9A84C] px-10 py-4 text-[10px] font-bold uppercase tracking-[0.35em] text-[#0d0a07] transition-all duration-300 hover:bg-transparent hover:text-[#C9A84C]">
                Request Zardozi Sampling
              </Link>
              <Link to="/" className="border border-white/25 px-10 py-4 text-[10px] font-bold uppercase tracking-[0.35em] text-white/70 transition-all duration-300 hover:border-white hover:text-white">
                ← Back to Home
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Gallery Grid ── */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: "#F9F5EE" }}>
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">

          {/* Section Header */}
          <Reveal>
            <div className="flex flex-col items-center text-center mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-12 bg-[#C9A84C]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A84C]" />
                <div className="h-px w-12 bg-[#C9A84C]" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#C9A84C] mb-3">Gallery</span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#1A1008] mb-4">
                The craft, thread by thread.
              </h2>
              <p className="max-w-[55ch] text-[15px] font-medium leading-7 text-[#5C4A34]">
                {galleryImages.length} original pieces - each stitched by hand in our atelier. Click any image to explore it in full detail.
              </p>
            </div>
          </Reveal>

          {/* Masonry-style grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-0">
            {galleryImages.map((img, idx) => (
              <Reveal key={idx} delay={Math.min(idx * 30, 300)}>
                <button
                  onClick={() => openLightbox(idx)}
                  className="group relative block w-full mb-4 overflow-hidden focus:outline-none break-inside-avoid"
                  aria-label={`View: ${img.alt}`}
                >
                  <div className="relative overflow-hidden bg-[#EDE5D8]" style={{ borderRadius: "1px" }}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: "rgba(13,10,7,0.55)" }}>
                      <ZoomIn size={28} className="text-white mb-2" strokeWidth={1.5} />
                      <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/90">View Full</span>
                    </div>
                    {/* Gold bottom accent */}
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-600 group-hover:w-full"
                      style={{ backgroundColor: "#C9A84C" }} />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technique Info ── */}
      <section className="py-14 sm:py-20 bg-[#0d0a07] text-white relative overflow-hidden">
        {/* Decorative bg */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <img src={z01} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-start">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-8 bg-[#C9A84C]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.45em]" style={{ color: "#C9A84C" }}>The Heritage</span>
                </div>
                <h2 className="font-serif text-4xl sm:text-5xl leading-tight mb-6">
                  A craft born in the courts of the Mughal Empire.
                </h2>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[
                    { label: "Origin", value: "Mughal Era, India" },
                    { label: "Thread", value: "Gold & Silver Zari" },
                    { label: "Technique", value: "Hand Needle Work" },
                    { label: "Fabric", value: "Silk, Velvet, Organza" },
                  ].map((item) => (
                    <div key={item.label} className="border border-white/10 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A84C] mb-1">{item.label}</p>
                      <p className="text-sm font-medium text-white/80">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-5 text-[15px] font-medium leading-8 text-white/65">
                <p>
                  Zardozi (from Persian - zar meaning gold, dozi meaning needlework) is one of India's most refined
                  embroidery traditions. It flourished under Mughal patronage and has since become a hallmark of luxury
                  Indian fashion worldwide.
                </p>
                <p>
                  Our atelier practices traditional zardozi using fine gold and silver zari wire, dabka, salma-sitara,
                  and hand-set stones - all stitched by experienced karigars who have trained for years in this art form.
                </p>
                <p>
                  We execute zardozi commissions for couture houses, bridal labels, luxury accessory brands and
                  contemporary designers - from a single signature motif to a fully embroidered panel.
                </p>
                <Link
                  to="/contact"
                  className="mt-2 inline-block border border-[#C9A84C] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 hover:bg-[#C9A84C] hover:text-[#0d0a07]"
                  style={{ color: "#C9A84C" }}
                >
                  Commission a Piece
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand />

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "rgba(5,3,2,0.96)" }}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-white/15 text-white/70 transition-all duration-300 hover:border-[#C9A84C] hover:text-[#C9A84C]"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.35em] text-white/40">
            {lightbox + 1} / {galleryImages.length}
          </div>

          {/* Dots navigation */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === lightbox ? "20px" : "6px",
                  height: "6px",
                  backgroundColor: i === lightbox ? "#C9A84C" : "rgba(255,255,255,0.3)",
                }}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 sm:left-8 flex h-12 w-12 items-center justify-center border border-white/15 text-white/70 transition-all duration-300 hover:border-[#C9A84C] hover:text-[#C9A84C]"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image */}
          <div
            className="flex flex-col items-center max-h-[88vh] max-w-[88vw] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              className="max-h-[78vh] max-w-[88vw] object-contain shadow-2xl"
              style={{ border: "1px solid rgba(201,168,76,0.15)" }}
            />
            {galleryImages[lightbox].alt && (
              <p className="mt-3 font-serif text-lg text-[#F5F0E8] text-center max-w-[60ch]">
                {galleryImages[lightbox].alt}
              </p>
            )}
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 sm:right-8 flex h-12 w-12 items-center justify-center border border-white/15 text-white/70 transition-all duration-300 hover:border-[#C9A84C] hover:text-[#C9A84C]"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </PageShell>
  );
}
