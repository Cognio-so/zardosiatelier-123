import { useState, useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import { Lens } from "@/registry/magicui/lens";
import { EnquiryForm } from "@/components/site/EnquiryForm";
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
  ArrowUpRight,
  PhoneCall,
} from "lucide-react";
import heroEmbroidery from "@/assets/hero-embroidery.webp";
import heroVideo from "@/assets/hero-video.mp4";
import zardoziPaisley from "@/assets/zardozi-paisley-opt.webp";
import reshamZariCard from "@/assets/resham-zari-card-opt.webp";
import pearlWorkCard from "@/assets/pearl-work-card-opt.webp";
import crystalCard from "@/assets/crystal-1-opt.webp";
import sequin3 from "@/assets/sequin-3-opt.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zardosi Atelier - Luxury Hand Embroidery & Export Atelier" },
      {
        name: "description",
        content:
          "Zardosi Atelier creates couture-grade hand embroidery, zardosi, crystal work and beadwork for luxury brands, couture designers and bridal houses.",
      },
      { property: "og:title", content: "Zardosi Atelier - Luxury Hand Embroidery" },
      {
        property: "og:description",
        content:
          "Hand embroidery for the world's finest labels - from sampling to production and global delivery.",
      },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroEmbroidery },
      { property: "twitter:image", content: heroEmbroidery },
    ],
    links: [{ rel: "canonical", href: "https://www.zardosiatelier.com/" }],
  }),
  component: HomePage,
});

const techniques = [
  {
    name: "Zardozi",
    desc: "Metallic gold threadwork rooted in centuries of courtly craft.",
    image: zardoziPaisley,
    images: null,
    href: "/zardozi",
  },
  {
    name: "Sequin",
    desc: "Thousands of hand-stitched sequins catching couture light with every movement.",
    image: sequin3,
    images: null,
    href: "/sequin",
  },
  {
    name: "Crystal & Stone Work",
    desc: "Hand-set crystals and stones for couture brilliance and shadow play.",
    image: crystalCard,
    images: null,
    href: "/crystal-stone",
  },
  {
    name: "Resham & Zari",
    desc: "Fine silk and gold Zari threads woven into intricate surface patterns.",
    image: reshamZariCard,
    images: null,
    href: "/resham-zari",
  },
  {
    name: "Pearl Work",
    desc: "Glass, pearl and seed-bead compositions stitched by hand.",
    image: pearlWorkCard,
    images: null,
    href: "/pearl-work",
  },
];

const whyChoose = [
  { title: "30+ Skilled Artisans", icon: "Crown" },
  { title: "Sampling to Production", icon: "Layers" },
  { title: "Couture-Level Quality", icon: "Diamond" },
  { title: "Flexible Order Quantities", icon: "Package" },
  { title: "Export Experience", icon: "Globe" },
  { title: "Custom Design Execution", icon: "PenTool" },
  { title: "Premium Materials", icon: "Sparkles" },
  { title: "Dedicated Project Support", icon: "Users" },
  { title: "Design Confidentiality", icon: "ShieldCheck" },
  { title: "Fast Sampling", icon: "Zap" },
];

const process = [
  { n: "01", title: "Share Design" },
  { n: "02", title: "Technical Review" },
  { n: "03", title: "Sampling" },
  { n: "04", title: "Approval" },
  { n: "05", title: "Production" },
  { n: "06", title: "Global Delivery" },
];

const faqs = [
  {
    question: "Do you work with luxury brands outside India?",
    answer:
      "Yes. We support international fashion houses, couture designers and bridal studios with export-ready communication, sampling and delivery.",
  },
  {
    question: "Can you develop embroidery from design references and sketches?",
    answer:
      "Yes. Share sketches, mood boards, tech packs or references and our team will translate them into workable embroidery samples.",
  },
  {
    question: "Do you support both low-volume sampling and larger production runs?",
    answer:
      "Yes. We can begin with swatches or prototypes, then scale the approved technique into controlled production.",
  },
  {
    question: "What kind of products can be embellished?",
    answer:
      "We work on gowns, bridalwear, womenswear, menswear, bags, headbands, patches, borders and bespoke couture components.",
  },
];

function HomePage() {
  const phoneDigits = "8826023527";

  return (
    <SiteShell>
      {/* ═══ HERO SECTION ═══ */}
      <section className="za-hero">
        {/* Background video */}
        <video
          className="za-hero__bg-video"
          src={heroVideo}
          poster={heroEmbroidery}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />

        {/* Dark overlay — left to right */}
        <div className="za-hero__overlay" />

        {/* ── Card ── */}
        <div className="za-hero__card" role="main">

          {/* Decorative gold line */}
          <div className="za-hero__gold-line" />

          {/* Eyebrow */}
          <p className="za-hero__eyebrow">
            Haute Couture Embroidery — India
          </p>

          {/* Main heading */}
          <h1 className="za-hero__heading">
            Hand embroidery
            <br />
            for the world's
            <br />
            <em className="za-hero__heading-em">finest</em> labels.
          </h1>

          {/* Description */}
          <p className="za-hero__desc">
            We craft and export luxury embroidered pieces for couture houses,
            designers and premium brands. Every stitch is finished by master
            karigars and checked twice before it ships.
          </p>

          {/* Service tags */}
          <p className="za-hero__tags">
            Patches&nbsp;/&nbsp;Bags&nbsp;/&nbsp;Headbands&nbsp;/&nbsp;Gowns&nbsp;/&nbsp;Bespoke&nbsp;/&nbsp;Commissions
          </p>

          {/* CTA buttons */}
          <div className="za-hero__btns">
            <Link to="/contact" className="za-hero__btn za-hero__btn--primary">
              Start With a Sample
              <ArrowUpRight className="za-hero__btn-icon" strokeWidth={2.2} />
            </Link>
            <a href={`tel:${phoneDigits}`} className="za-hero__btn za-hero__btn--secondary">
              Call the Atelier
              <PhoneCall className="za-hero__btn-icon" strokeWidth={2.2} />
            </a>
          </div>

        </div>

        {/* Bottom ticker */}
        <div className="za-hero__ticker">
          <span>Low MOQ &amp; Sampling</span>
          <span className="za-hero__ticker-dot" />
          <span>Artwork Development</span>
          <span className="za-hero__ticker-dot" />
          <span>In-House Design &amp; QC</span>
          <span className="za-hero__ticker-dot" />
          <span>Express Worldwide Shipping</span>
        </div>
      </section>

      <section className="bg-[#EFE8DD] py-10 sm:py-14">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
          <Reveal className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end lg:mb-10">
            <div className="max-w-[980px]">
              <span className="eyebrow text-[11px]">Embroidery Techniques</span>
              <h2 className="mt-3 font-serif text-4xl leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
                A vocabulary of luxury hand-craft.
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="gold-link shrink-0 text-[11px] font-bold uppercase tracking-[0.32em]"
            >
              Explore Portfolio
            </Link>
          </Reveal>

          <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
            {techniques.map((item, i) => {
              const cardInner = (
                <article className="group cursor-pointer text-center">
                  <Lens zoomFactor={2.1} lensSize={120} isStatic={false}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#E5D8C8]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* View hint for sequin card */}
                    {"href" in item && (
                      <div className="absolute inset-0 flex items-end justify-center pb-10 pointer-events-none">
                        <span className="translate-y-2 text-[9px] font-bold uppercase tracking-[0.35em] text-white bg-black/50 px-3 py-1.5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                          View All Images →
                        </span>
                      </div>
                    )}
                    </div>
                  </Lens>
                  <h3 className="mt-4 font-serif text-[26px] leading-tight text-ink sm:text-[28px]">
                    {item.name}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[26ch] text-[14px] font-medium leading-6 text-ink-soft sm:text-[15px]">
                    {item.desc}
                  </p>
                </article>
              );

              return (
                <Reveal key={item.name} delay={i * 70}>
                  {"href" in item ? (
                    <a href={item.href} className="block">
                      {cardInner}
                    </a>
                  ) : (
                    cardInner
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#1A100B] py-12 text-ivory sm:py-16">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
          <Reveal>
            <span className="eyebrow !text-gold-soft">Our Process</span>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-white sm:text-5xl">
              From sketch to ceremony.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {process.map((step) => (
                <div
                  key={step.n}
                  className="min-h-[128px] border border-gold/40 bg-white/[0.06] px-6 py-6"
                >
                  <span className="font-serif text-2xl text-gold-soft">{step.n}</span>
                  <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-ivory/90">
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="luxury-silk-bg py-10 sm:py-12">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
          <Reveal className="px-0 py-8">
            <span className="eyebrow">Why Zardosi Atelier</span>
            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              A partner built for luxury brands.
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {whyChoose.map((item) => (
                <div
                  key={item.title}
                  className="min-h-[112px] border border-gold/25 bg-ivory px-5 py-5"
                >
                  <Icon name={item.icon} className="size-6 text-gold" />
                  <p className="mt-6 text-[20px] font-medium leading-relaxed text-ink sm:text-[22px]">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-4 px-0 py-8">
            <div className="grid items-end gap-8 border-y border-ink/10 py-12 text-center sm:py-16 md:grid-cols-3 md:gap-6">
              <div>
                <div className="font-serif text-[52px] sm:text-[68px] md:text-[78px] font-light leading-none text-[#D4AF37]">
                  <CountUp target={150} suffix="+" duration={2000} />
                </div>
                <p className="mt-4 text-[11px] font-bold uppercase leading-relaxed tracking-[0.22em] text-[#A69C98] sm:text-[12px]">
                  Collections Supported
                </p>
              </div>
              <div>
                <div className="font-serif text-[52px] sm:text-[68px] md:text-[78px] font-light leading-none text-[#D4AF37]">
                  <CountUp target={18} duration={1600} />
                </div>
                <p className="mt-4 text-[11px] font-bold uppercase leading-relaxed tracking-[0.22em] text-[#A69C98] sm:text-[12px]">
                  Markets Served
                </p>
              </div>
              <div>
                <div className="font-serif text-[38px] sm:text-[48px] md:text-[56px] italic font-light leading-none text-[#D4AF37]">
                  Fast-track
                </div>
                <p className="mt-4 text-[11px] font-bold uppercase leading-relaxed tracking-[0.22em] text-[#A69C98] sm:text-[12px]">
                  Sampling Turnaround
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="luxury-silk-bg py-10 sm:py-12">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
          <Reveal className="px-0 py-8">
            <span className="eyebrow">Questions</span>
            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              Working with our atelier.
            </h2>{" "}
            <div className="mt-7 w-full">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-ink/10 py-5">
                  <summary className="cursor-pointer list-none font-serif text-2xl transition hover:text-gold">
                    {faq.question}
                  </summary>
                  <p className="max-w-[70ch] pt-3 text-[15px] font-medium leading-7 text-ink-soft">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <LeadSection />
    </SiteShell>
  );
}

function CountUp({
  target,
  suffix = "",
  duration = 1800,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function LeadSection() {
  const email = "info@zardosiatelier.com";

  return (
    <section className="luxury-silk-bg pb-12 sm:pb-16" id="quote">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
        <Reveal className="border border-gold/25 bg-[#fffdf9] px-5 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Begin a Commission</span>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Let us translate your vision into couture-grade craftsmanship.
            </h2>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-5">
              <a
                href={`mailto:${email}`}
                className="block border border-ink/25 px-8 py-4 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-ink transition hover:border-gold hover:text-gold"
              >
                Email the Atelier
              </a>
              <p className="text-center text-[15px] font-medium leading-7 text-ink-soft lg:text-left">
                Send your sketches, references, quantity range and timeline. We will reply with the
                right sampling route for your project.
              </p>
            </div>

            <div className="border border-ink/10 bg-ivory p-6 sm:p-8">
              <EnquiryForm source="homepage" variant="lead" submitLabel="Submit Inquiry" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Icon({ name, className }: { name: string; className?: string }) {
  const icons: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
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
  return <Component className={className} strokeWidth={1.5} />;
}






























