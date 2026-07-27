import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageShell, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { Lens } from "@/registry/magicui/lens";
import { useState, useEffect, useCallback, useMemo } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { getPortfolioItems } from "@/lib/portfolio-admin";

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

export const Route = createFileRoute("/resham-zari")({
  head: () => ({
    meta: [
      { title: "Resham & Zari Embroidery - Fine Silk & Metallic Threadwork | Zardosi Atelier" },
      { name: "description", content: "Explore our collection of hand-stitched Resham and Zari embroidery, blending fine silk and gold zari threads into intricate patterns." },
      { property: "og:title", content: "Resham & Zari Embroidery - Zardosi Atelier" },
      { property: "og:url", content: "/resham-zari" },
      { property: "og:image", content: r01 },
    ],
    links: [{ rel: "canonical", href: "https://www.zardosiatelier.com/resham-zari" }],
  }),
  component: ReshamZariPage,
});

const staticGalleryImages = [
  { src: r01, alt: "Fine Silk Resham Floral Spray on Cream Ground" },
  { src: r02, alt: "Gold Zari & Silk Threadwork Border Detail" },
  { src: r03, alt: "Intricate Resham Leaf & Vine Composition" },
  { src: r04, alt: "Multi-Color Silk Resham Medallion Motif" },
  { src: r05, alt: "Gold Zari Surface Stitching Swatch" },
  { src: r06, alt: "Dual-Tone Resham & Zari Floral Pattern" },
  { src: r07, alt: "Traditional Paisley Motif in Gold Zari" },
  { src: r08, alt: "Fine Silk Threadwork Fill & Shading" },
  { src: r09, alt: "Ornate Zari Threaded Architectural Motif" },
  { src: r10, alt: "High-Density Silk Resham Border Study" },
  { src: r11, alt: "Geometric Zari & Silk Grid Embroidery" },
  { src: r12, alt: "Botanical Silk Resham Embroidery Panel" },
  { src: r13, alt: "Gold Zari Filigree with Silk Accents" },
  { src: r14, alt: "Delicate Resham Stitching on Sheer Base" },
  { src: r15, alt: "Heritage Zari Threadwork Composition" },
  { src: r16, alt: "Contrast Resham Floral Embroidery Swatch" },
  { src: r17, alt: "Luminous Gold Zari Grid & Floral Fill" },
  { src: r18, alt: "Master Karigar Resham Thread Shading" },
  { src: r19, alt: "Symmetrical Silk Resham Crest Motif" },
  { src: r20, alt: "Gold Zari & Silk Threadwork Band" },
  { src: r21, alt: "Fine Resham Micro-Stitch Floral Swatch" },
  { src: r22, alt: "Rich Resham & Gold Zari Couture Surface" },
  { src: r23, alt: "Full Resham & Zari Tapestry Panel" },
];

const stats = [
  { value: "23", label: "Couture Swatches" },
  { value: "Premium", label: "Silk & Metallic Zari" },
  { value: "Artisan", label: "Hand-Crafted" },
];

function ReshamZariPage() {
  const { data: portfolioItems = [] } = useQuery({
    queryKey: ["portfolio", "resham-zari-page"],
    queryFn: () => getPortfolioItems(),
    staleTime: 0,
  });
  // Merge admin-uploaded images (from blob storage) with static default images.
  // Admin uploads appear first so new content is always visible at the top.
  const galleryImages = useMemo(() => {
    const adminUploaded = portfolioItems
      .filter((item) => item.categorySlug === "resham-zari" && !item.id.startsWith("default-"))
      .map((item) => ({
        src: item.url,
        alt: item.caption || "Resham and zari portfolio image",
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
      {/* Hero Banner */}
      <section className="relative min-h-[50vh] overflow-hidden bg-[#120e0b] flex items-center">
        {/* Background Collage */}
        <div className="absolute inset-0 grid grid-cols-4 opacity-38 pointer-events-none">
          {[r03, r06, r11, r16].map((src, i) => (
            <div key={i} className="overflow-hidden">
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
        {/* Dark gold gradient overlay */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(18,14,11,0.84) 0%, rgba(18,14,11,0.52) 50%, rgba(18,14,11,0.84) 100%)"
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A84C]/45 to-transparent" />

        <div className="relative z-10 w-full px-6 py-20 text-center">
          <Reveal>
            {/* Elegant Emblem */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-[#C9A84C]/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
              <div className="h-[1px] w-12 bg-[#C9A84C]/60" />
            </div>

            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.5em] mb-4 text-[#C9A84C]">
              Embroidery Technique
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white tracking-wide mb-5">
              Resham & Zari
            </h1>
            <p className="mx-auto max-w-[54ch] text-base leading-relaxed text-white/70 sm:text-lg mb-10">
              A harmonious blend of fine silk threads (Resham) and metallic gold/silver wires (Zari). 
              Stitched by hand onto delicate backdrops, this technique creates smooth textures, rich color shading, and structural depth.
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
                Enquire Now
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
              <h2 className="font-serif text-4xl sm:text-5xl text-[#1A110B] mb-3">Resham & Zari Gallery</h2>
              <p className="text-[14px] font-medium text-[#5A4D40] max-w-[50ch] mx-auto">
                Explore 23 high-resolution photos showcasing the detailed sheen of silk and shimmer of metallic embroidery.
              </p>
            </div>
          </Reveal>

          {/* Grid layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-0">
            {galleryImages.map((img, idx) => (
              <Reveal key={idx} delay={Math.min(idx * 30, 300)}>
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
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: "rgba(18,14,11,0.6)" }}>
                      <ZoomIn size={24} className="text-white mb-2" strokeWidth={1.5} />
                      <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white">Explore Details</span>
                    </div>
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full bg-[#C9A84C]" />
                  </div>
                </Lens>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Technique detail info card section */}
      <section className="py-16 sm:py-20 bg-[#120e0b] text-white relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-[1200px] px-6">
          <Reveal>
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C9A84C] block mb-2">Detailed Craft</span>
                <h3 className="font-serif text-3xl sm:text-4xl mb-6">Harmonious blending of matte silk and shiny metal.</h3>
                <p className="text-white/70 leading-8 text-[15px] font-medium mb-6">
                  Resham refers to premium silk threads known for their deep colors and soft, organic matte finish. Zari refers to metallic threads wrapped around a core, creating high-contrast reflections. By laying them side-by-side, our karigars achieve unmatched texture contrasts that make designs pop.
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                    <span className="text-[13px] font-bold tracking-wider text-white/90">Premium silk yarn sourcing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                    <span className="text-[13px] font-bold tracking-wider text-white/90">Precise color shading transitions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                    <span className="text-[13px] font-bold tracking-wider text-white/90">Fine gold/silver zari accents</span>
                  </div>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden border border-white/10 rounded">
                <img src={r01} alt="Resham and zari close-up" className="w-full h-full object-cover opacity-90" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand />

      {/* Lightbox component */}
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
            className="flex flex-col items-center max-h-[88vh] max-w-[88vw] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              className="max-h-[78vh] max-w-[88vw] object-contain shadow-2xl"
              style={{ border: "1px solid rgba(201,168,76,0.1)" }}
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





