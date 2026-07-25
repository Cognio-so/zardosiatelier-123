import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageShell, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { getPortfolioItems } from "@/lib/portfolio-admin";

import sequin1 from "@/assets/sequin-1.jpg";
import sequin2 from "@/assets/sequin-2.jpg";
import sequin3 from "@/assets/sequin-3-opt.webp";
import sequin4 from "@/assets/sequin-4.jpeg";
import sequin5 from "@/assets/sequin-5.jpg";
import sequin6 from "@/assets/sequin-6.jpg";

export const Route = createFileRoute("/sequin")({
  head: () => ({
    meta: [
      { title: "Sequin Embroidery - Hand-Stitched Couture | Zardosi Atelier" },
      { name: "description", content: "Thousands of hand-stitched sequins catching couture light with every movement. Explore our sequin embroidery work at Zardosi Atelier." },
      { property: "og:title", content: "Sequin Embroidery - Zardosi Atelier" },
      { property: "og:url", content: "/sequin" },
      { property: "og:image", content: sequin1 },
    ],
    links: [{ rel: "canonical", href: "https://www.zardosiatelier.com/sequin" }],
  }),
  component: SequinPage,
});

const staticGalleryImages = [
  { src: sequin1, alt: "Maroon & Gold Sequin Lattice Pattern" },
  { src: sequin2, alt: "Geometric Sequin & Metallic Beadwork" },
  { src: sequin3, alt: "3D Floral Sequin & Micro-Bead Close-up" },
  { src: sequin4, alt: "Full Couture Floral Sequin Panel" },
  { src: sequin5, alt: "Beaded Metallic Floral Sequin Work" },
  { src: sequin6, alt: "Dimensional 3D Sequin Blossom Detail" },
];

function SequinPage() {
  const { data: portfolioItems = [] } = useQuery({
    queryKey: ["portfolio", "sequin-page"],
    queryFn: () => getPortfolioItems(),
    staleTime: 0,
  });
  // Merge admin-uploaded images (from blob storage) with static default images.
  // Admin uploads appear first so new content is always visible at the top.
  const galleryImages = useMemo(() => {
    const adminUploaded = portfolioItems
      .filter((item) => item.categorySlug === "sequin" && !item.id.startsWith("default-"))
      .map((item) => ({
        src: item.url,
        alt: item.caption || "Sequin embroidery portfolio image",
      }));
    return [...adminUploaded, ...staticGalleryImages];
  }, [portfolioItems]);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prevImage = () => setLightbox((i) => (i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length));
  const nextImage = () => setLightbox((i) => (i === null ? null : (i + 1) % galleryImages.length));

  return (
    <PageShell>
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#160f0b]" style={{ minHeight: "38vh" }}>
        <img src={sequin1} alt="Sequin embroidery hero" className="absolute inset-0 h-full w-full object-cover opacity-40" fetchPriority="high" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(22,15,11,0.5) 0%, rgba(22,15,11,0.85) 100%)" }} />
        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-20 text-center">
          <Reveal>
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.45em]" style={{ color: "#C9A84C" }}>Embroidery Technique</span>
            <h1 className="mt-4 font-serif text-5xl leading-tight text-white sm:text-6xl lg:text-7xl">Sequin Work</h1>
            <p className="mx-auto mt-6 max-w-[52ch] text-base font-medium leading-relaxed text-white/75 sm:text-lg">
              Thousands of hand-stitched sequins catching couture light with every movement - crafted by master karigars for luxury fashion houses worldwide.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="border border-[#C9A84C] bg-[#C9A84C] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#120c09] transition hover:bg-transparent hover:text-white">Request a Sample</Link>
              <Link to="/" className="border border-white/30 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/80 transition hover:border-white hover:text-white">← Back to Home</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="bg-[#F5EFE6] py-12 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
          <Reveal>
            <span className="eyebrow">Gallery</span>
            <h2 className="mt-2 font-serif text-4xl leading-tight text-[#1A1A1A] sm:text-5xl">The craft, up close.</h2>
            <p className="mt-3 max-w-[60ch] text-[15px] font-medium leading-7 text-[#4A3F35]">Click any image to explore it in detail.</p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((img, idx) => (
              <Reveal key={idx} delay={idx * 60}>
                <button onClick={() => openLightbox(idx)} className="group relative block w-full overflow-hidden focus:outline-none" aria-label={`View ${img.alt}`}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#E5D8C8]">
                    <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/30">
                      <span className="translate-y-4 text-[10px] font-bold uppercase tracking-[0.35em] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">View Full</span>
                    </div>
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 group-hover:w-full" style={{ backgroundColor: "#C9A84C" }} />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Technique Description */}
      <section className="bg-[#1A100B] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: "#C9A84C" }}>The Technique</span>
                <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">What makes our sequin work couture-grade.</h2>
              </div>
              <div className="space-y-5 text-[15px] font-medium leading-8 text-white/70">
                <p>Each sequin is individually hand-stitched onto fabric - a painstaking process that ensures uniform coverage, texture depth, and long-term durability that machine application cannot replicate.</p>
                <p>We work with flat, cupped, paillette and 3D sequins in metallic, matte and holographic finishes. Custom colour matching for specific house palettes is available on request.</p>
                <p>Our sequin work is used on gowns, bridalwear, evening wear, headpieces, bags and standalone embroidered panels for global fashion brands.</p>
                <Link to="/contact" className="mt-4 inline-block border border-[#C9A84C] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A84C] transition hover:bg-[#C9A84C] hover:text-[#120c09]">Enquire About Sequin Work</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand />

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/92" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-white hover:text-white" aria-label="Close"><X size={20} /></button>
          <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-white hover:text-white sm:left-8" aria-label="Previous image"><ChevronLeft size={24} /></button>
          <div className="flex flex-col items-center max-h-[88vh] max-w-[90vw] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <img src={galleryImages[lightbox].src} alt={galleryImages[lightbox].alt} className="max-h-[80vh] max-w-[90vw] object-contain shadow-2xl" />
            <p className="mt-3 font-serif text-lg text-[#F5F0E8] text-center max-w-[60ch]">{galleryImages[lightbox].alt}</p>
            <p className="mt-1 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">{lightbox + 1} / {galleryImages.length}</p>
          </div>
          <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-white hover:text-white sm:right-8" aria-label="Next image"><ChevronRight size={24} /></button>
        </div>
      )}
    </PageShell>
  );
}
