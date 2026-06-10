import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import {
  Crown,
  Layers,
  Diamond,
  Package,
  Globe,
  PenTool,
  Sparkles,
  Users,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import heroEmbroidery from "@/assets/hero-embroidery.jpg";
import heroVideo from "@/assets/hero-video.mp4";
import collectionGown from "@/assets/collection-gown.jpg";
import collectionBridal from "@/assets/collection-bridal.jpg";
import collectionHandbag from "@/assets/collection-handbag.jpg";
import techniqueAari from "@/assets/technique-aari.jpg";
import techniqueCrystal from "@/assets/technique-crystal.jpg";
import technique3d from "@/assets/technique-3d.jpg";
import techniqueBead from "@/assets/technique-bead.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Auréline — Luxury Hand Embroidery & Couture Manufacturing" },
      {
        name: "description",
        content:
          "Maison Auréline is a luxury hand embroidery atelier serving global fashion houses — from couture sampling to production-scale execution.",
      },
      { property: "og:title", content: "Maison Auréline — Luxury Hand Embroidery Atelier" },
      {
        property: "og:description",
        content:
          "Couture-level hand embroidery, beadwork, zardosi and crystal work for the world's most discerning fashion houses.",
      },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroEmbroidery },
      { property: "twitter:image", content: heroEmbroidery },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const collection = [
  {
    title: "La Sérénade",
    caption: "Couture Gowns · Gold Zardosi",
    image: collectionGown,
    aspect: "3/4",
  },
  {
    title: "Veil of Pearls",
    caption: "Bridal Couture · Crystal & Pearl",
    image: collectionBridal,
    aspect: "3/4",
  },
  {
    title: "Petit Bijou",
    caption: "Luxury Accessories · Mixed Media",
    image: collectionHandbag,
    aspect: "3/4",
  },
];

const techniques = [
  {
    name: "Zardosi",
    desc: "Metallic gold threadwork rooted in centuries of courtly craft.",
    image: heroEmbroidery,
  },
  {
    name: "Crystal Work",
    desc: "Hand-set crystals and sequins for couture light and shadow.",
    image: techniqueCrystal,
  },
  {
    name: "3D Floral",
    desc: "Sculpted silk petals layered with pearl and bead cores.",
    image: technique3d,
  },
  {
    name: "Beadwork",
    desc: "Glass, pearl and seed-bead compositions stitched by hand.",
    image: techniqueBead,
  },
];

const whyChoose = [
  { title: "30+ Skilled Artisans", desc: "Multi-generational embroiderers led by atelier directors.", icon: "Crown" },
  { title: "Sampling to Production", desc: "From a single swatch to scaled production runs.", icon: "Layers" },
  { title: "Couture-Level Quality", desc: "Calibrated to haute couture finishing standards.", icon: "Diamond" },
  { title: "Flexible Order Quantities", desc: "From bespoke editions to commercial runs.", icon: "Package" },
  { title: "Export Experience", desc: "Documented logistics into Paris, Milan, New York.", icon: "Globe" },
  { title: "Custom Design Execution", desc: "Translation of mood boards into technical embroidery.", icon: "PenTool" },
  { title: "Premium Materials", desc: "Sourcing of finest silk threads, crystals, and beads.", icon: "Sparkles" },
  { title: "Dedicated Project Support", desc: "Single point of contact for your design team.", icon: "Users" },
  { title: "Design Confidentiality", desc: "NDA-protected studio with restricted access protocols.", icon: "ShieldCheck" },
  { title: "Fast Sampling", desc: "Initial swatches within 7–14 days of brief lock.", icon: "Zap" },
];

const process = [
  {
    n: "01",
    title: "SHARE DESIGN",
    desc: "Sketches, tech packs or mood boards via our secure client portal.",
  },
  {
    n: "02",
    title: "TECHNICAL REVIEW",
    desc: "Material feasibility, stitch density, and production timing.",
  },
  { n: "03", title: "SAMPLING", desc: "Precision swatches or full prototypes for approval." },
  { n: "04", title: "APPROVAL", desc: "Sign-off on embellishment, colour accuracy and material." },
  { n: "05", title: "PRODUCTION", desc: "Hand-executed manufacturing by dedicated artisan pods." },
  {
    n: "06",
    title: "GLOBAL DELIVERY",
    desc: "Insured logistics directly to your studio or factory.",
  },
];

const faqs = [
  {
    question: "Do you work with luxury brands outside India?",
    answer: "Yes, we serve global fashion houses across Paris, Milan, New York, and London, with streamlined export logistics and documented customs compliance.",
  },
  {
    question: "Can you develop embroidery from design references and sketches?",
    answer: "Absolutely. Our design team specializes in translating mood boards, sketches, and tech packs into technical embroidery swatches.",
  },
  {
    question: "Do you support both low-volume sampling and larger production runs?",
    answer: "Yes, we are built for flexibility — from single couture editions and sampling to scaled commercial production runs.",
  },
  {
    question: "What kind of products can be embellished?",
    answer: "We embroider on couture gowns, bridalwear, womenswear, menswear, accessories (bags, shoes), and individual luxury components.",
  },
];

const portfolio = [
  { src: portfolio1, tag: "Couture · Zardosi", caption: "Embroidered Evening Cape" },
  { src: portfolio4, tag: "Bridal · Lace Border", caption: "Lace-Bordered Bridal Veil" },
  { src: portfolio6, tag: "Couture · 3D Florals", caption: "Cascading Petal Skirt" },
  { src: portfolio5, tag: "Atelier · Process", caption: "Hand-set Gold Thread Study" },
  { src: portfolio3, tag: "Accessory · Crystal", caption: "All-Over Crystal Minaudière" },
  { src: portfolio2, tag: "Menswear · Tonal", caption: "Tonal Lapel Detail" },
];

function HomePage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-ink">
        {/* Hero background video — autoplay, muted, loop */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroEmbroidery}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0.85 }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Cinematic vignette + gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/20 to-ink/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/35 via-transparent to-ink/35" />


        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="max-w-5xl text-center">
            <p
              className="eyebrow !text-gold-soft animate-fade-up"
              style={{ animationDelay: "100ms" }}
            >
              Maison · Atelier · Established
            </p>
            <h1
              className="mt-8 font-serif text-[40px] leading-[1.05] text-ivory sm:text-6xl lg:text-[78px] text-balance animate-fade-up"
              style={{ animationDelay: "300ms" }}
            >
              Luxury Hand Embroidery <br className="hidden sm:block" />
              <span className="italic font-normal">for Global Maisons</span>
            </h1>
            <p
              className="mx-auto mt-8 max-w-[58ch] text-base sm:text-lg text-ivory/80 leading-relaxed animate-fade-up"
              style={{ animationDelay: "500ms" }}
            >
              From couture sampling to production-scale execution, we transform fashion concepts
              into luxury embroidered masterpieces.
            </p>
            <div
              className="mt-12 flex flex-wrap justify-center gap-4 animate-fade-up"
              style={{ animationDelay: "700ms" }}
            >
              <Link
                to="/contact"
                className="border border-gold bg-gold px-10 py-4 text-[10px] uppercase tracking-[0.3em] text-ivory transition-all duration-500 hover:bg-transparent hover:text-ivory"
              >
                Request Quote
              </Link>
              <Link
                to="/contact"
                className="border border-ivory/40 px-10 py-4 text-[10px] uppercase tracking-[0.3em] text-ivory transition-colors duration-500 hover:bg-ivory hover:text-ink"
              >
                Send Your Design
              </Link>
              <Link
                to="/portfolio"
                className="px-2 py-4 text-[10px] uppercase tracking-[0.3em] text-ivory gold-link"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-ivory/15 bg-ink/30 backdrop-blur-sm">
          <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-px md:grid-cols-4">
            {[
              ["30+", "Master Artisans"],
              ["Sampling", "To Production"],
              ["Global", "Export Standards"],
              ["Couture", "Quality Controlled"],
            ].map(([k, v]) => (
              <div key={v} className="px-6 py-6 text-center">
                <div className="font-serif italic text-lg sm:text-xl text-gold-soft">{k}</div>
                <div className="mt-1 text-[9px] uppercase tracking-[0.3em] text-ivory/60">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="bg-ivory py-28 sm:py-40">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <Reveal className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
            <div className="max-w-2xl">
              <span className="eyebrow">Chapter 01 — Featured</span>
              <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-balance">
                Couture artistry for the <br />
                world's finest <span className="italic">maisons</span>.
              </h2>
            </div>
            <Link to="/portfolio" className="text-[10px] uppercase tracking-[0.3em] gold-link">
              View All Collections →
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-14">
            {collection.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 120}
                className={`group cursor-pointer ${i === 1 ? "lg:mt-24" : ""}`}
              >
                <div className="relative overflow-hidden aspect-[3/4] bg-linen luxury-card">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    width={1024}
                    height={1366}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </div>
                <div className="mt-6">
                  <h3 className="font-serif text-2xl">{c.title}</h3>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.28em] text-ink-soft">
                    {c.caption}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EMBROIDERY TECHNIQUES */}
      <section className="bg-ivory py-28 sm:py-40">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <Reveal className="flex flex-col md:flex-row justify-between items-baseline gap-6 mb-16">
            <div>
              <span className="eyebrow">Embroidery Techniques</span>
              <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
                A vocabulary of luxury <br />
                hand-craft.
              </h2>
            </div>
            <Link to="/services" className="text-[10px] uppercase tracking-[0.3em] gold-link">
              All Services →
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {techniques.map((t, i) => (
              <Reveal key={t.name} delay={i * 100} className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden bg-linen mb-6 luxury-card">
                  <img
                    src={t.image}
                    alt={t.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.06]"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-2xl mb-3">{t.name}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed pr-4">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-linen py-28 sm:py-40">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <Reveal className="mb-20">
            <span className="eyebrow">Why Maison Auréline</span>
            <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              A partner built for luxury brands.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {whyChoose.map((w, i) => (
              <Reveal
                key={w.title}
                delay={i * 50}
                className="bg-ivory p-8 ring-1 ring-ink/5 flex flex-col items-start"
              >
                <div className="size-10 grid place-items-center bg-champagne text-gold mb-8 rounded-full">
                  <Icon name={w.icon} className="size-5" />
                </div>
                <h3 className="font-serif text-lg leading-tight mb-4">{w.title}</h3>
                <p className="text-[11px] text-ink-soft leading-relaxed uppercase tracking-wider">
                  {w.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-ivory border-y border-ink/5 py-32">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 items-center text-center md:text-left">
            <Reveal delay={100} className="flex flex-col items-center">
              <span className="font-serif text-6xl lg:text-8xl text-gold-soft mb-4">120+</span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-ink-soft">
                Collections Supported
              </span>
            </Reveal>
            <Reveal delay={200} className="flex flex-col items-center">
              <span className="font-serif text-6xl lg:text-8xl text-gold-soft mb-4">18</span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-ink-soft">
                Markets Served
              </span>
            </Reveal>
            <Reveal delay={300} className="flex flex-col items-center">
              <span className="font-serif text-5xl lg:text-7xl text-gold-soft mb-4 italic">
                Fast-track
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-ink-soft">
                Sampling Turnaround
              </span>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="bg-linen py-28 sm:py-40 overflow-hidden">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <Reveal className="mb-20">
            <span className="eyebrow">Our Process</span>
            <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              From sketch to ceremony.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {process.map((p, i) => (
              <Reveal
                key={p.n}
                delay={i * 80}
                className="bg-ivory p-8 ring-1 ring-ink/5 flex flex-col items-start"
              >
                <span className="font-serif text-2xl text-gold mb-10">{p.n}</span>
                <h4 className="font-serif text-sm tracking-[0.15em] mb-4 uppercase">{p.title}</h4>
                <p className="text-[11px] text-ink-soft leading-relaxed uppercase tracking-wider">
                  {p.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO MASONRY */}
      <section className="bg-ivory py-28 sm:py-40">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <Reveal className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
            <div>
              <span className="eyebrow">Chapter 06 — Portfolio</span>
              <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
                Selected <span className="italic">work</span>.
              </h2>
            </div>
            <Link to="/portfolio" className="text-[10px] uppercase tracking-[0.3em] gold-link">
              Full Archive →
            </Link>
          </Reveal>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
            {portfolio.map((p, i) => (
              <Reveal key={i} delay={(i % 3) * 100} className="mb-6 break-inside-avoid">
                <div className="group relative overflow-hidden luxury-card">
                  <img
                    src={p.src}
                    alt={p.caption}
                    loading="lazy"
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

      {/* FAQs */}
      <section className="bg-linen py-28 sm:py-40">
        <div className="mx-auto max-w-[1000px] px-6">
          <Reveal className="mb-16">
            <span className="eyebrow">Questions</span>
            <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              Working with our <br />
              <span className="italic">atelier</span>.
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-ink/10 py-4">
                  <AccordionTrigger className="text-left font-serif text-xl hover:no-underline hover:text-gold transition-colors">
                    {f.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-ink-soft leading-relaxed pt-4 text-base max-w-[60ch]">
                    {f.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* LEAD GEN */}
      <LeadSection />
    </SiteShell>
  );
}

function LeadSection() {
  return (
    <section className="bg-ivory py-32 sm:py-48" id="quote">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal className="bg-linen p-12 sm:p-24 text-center ring-1 ring-ink/5">
          <span className="eyebrow">Begin a Commission</span>
          <h2 className="mt-8 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] max-w-[20ch] mx-auto">
            Let us translate your vision into couture-grade craftsmanship.
          </h2>
          <div className="mt-16 flex flex-wrap justify-center gap-6">
            <a
              href="https://wa.me/918826023527"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-ivory px-10 py-5 text-[10px] uppercase tracking-[0.3em] transition-all hover:bg-ink flex items-center gap-3"
            >
              WhatsApp +91 88260 23527
            </a>
            <a
              href="mailto:atelier@aureline.studio"
              className="border border-ink/20 text-ink px-10 py-5 text-[10px] uppercase tracking-[0.3em] transition-all hover:bg-ink hover:text-ivory"
            >
              Email the Atelier
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.3em] text-ink-soft block mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={type !== "file"}
        className="w-full border-b border-ink/15 bg-transparent py-2 text-sm focus:border-gold focus:outline-none transition-colors file:mr-3 file:border-0 file:bg-transparent file:text-[10px] file:uppercase file:tracking-[0.2em] file:text-gold"
      />
    </div>
  );
}

function Icon({ name, className }: { name: string; className?: string }) {
  const icons: Record<string, any> = {
    Crown,
    Layers,
    Diamond,
    Package,
    Globe,
    PenTool,
    Sparkles,
    Users,
    ShieldCheck,
    Zap,
  };
  const Component = icons[name] || Crown;
  return <Component className={className} />;
}
