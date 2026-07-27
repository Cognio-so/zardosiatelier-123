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
      <section className="relative min-h-screen w-full overflow-hidden bg-[#160f0b]">
        <img
          src={heroEmbroidery}
          alt="Hand embroidery craftsmanship header background"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroEmbroidery}
          aria-hidden="true"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Cinematic Dark Gradient Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.85) 100%), linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 40%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Content Area with anchored left veil */}
        <div
          className="absolute inset-y-0 left-0 z-0 w-full max-w-[980px] backdrop-blur-[22px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(8,6,5,0.88) 0%, rgba(13,10,8,0.72) 38%, rgba(18,12,9,0.48) 68%, rgba(18,12,9,0.08) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[52vw] min-w-[320px] max-w-[760px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,8,6,0.9) 0%, rgba(11,8,6,0.76) 44%, rgba(11,8,6,0.36) 82%, rgba(11,8,6,0) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] items-center px-6 pb-28 pt-32 sm:px-10 sm:pt-36 lg:px-14 lg:pt-32">
          <div
            className="relative w-full max-w-[800px] overflow-hidden border border-white/7 px-8 py-10 backdrop-blur-[14px] sm:px-12 sm:py-12 lg:px-16 lg:py-16 animate-fade-in"
            style={{
              background:
                "linear-gradient(135deg, rgba(17,13,10,0.58) 0%, rgba(17,13,10,0.42) 54%, rgba(17,13,10,0.28) 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-y-0 -left-24 w-[58%]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(8,6,5,0.52) 0%, rgba(8,6,5,0.24) 58%, rgba(8,6,5,0) 100%)",
              }}
            />
            <div>
              <p className="animate-fade-up font-sans text-[13px] font-medium uppercase tracking-[0.42em] text-[#C7A26A]/88 sm:text-[14px]">
                Haute Couture Embroidery - India
              </p>
              <h1
                className="mt-7 max-w-[820px] animate-fade-up font-serif text-[46px] font-normal leading-[0.9] tracking-[-0.055em] text-[#F7F4EF] sm:text-[64px] md:text-[80px] xl:text-[96px]"
                style={{ WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", textShadow: "0 1px 18px rgba(0, 0, 0, 0.18)", animationDuration: "0.8s", animationTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)" }}
              >
                Hand embroidery
                <br />
                for the world's <span className="font-normal italic text-[#C7A26A]">finest</span>
                <br />
                labels.
              </h1>
              <p className="mt-10 max-w-[620px] animate-fade-up font-sans text-[19px] font-light leading-[1.8] text-[#DDD8D2]/90 sm:text-[21px] lg:text-[22px]">
                We craft and export luxury embroidered pieces for couture houses, designers and
                premium brands. Every stitch is finished by master karigars and checked twice
                before it ships.
              </p>
              <p className="mt-9 animate-fade-up font-serif text-[18px] italic font-normal leading-[1.6] text-[#C7A26A]/92 sm:text-[20px]">
                Patches / Bags / Headbands / Gowns / Bespoke commissions
              </p>
              <div className="mt-12 flex flex-nowrap items-center gap-3 sm:gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#CDA56A] bg-[#CDA56A] px-6 py-4 text-[10px] font-medium uppercase tracking-[0.24em] text-[#120c09] shadow-[0_10px_30px_rgba(205,165,106,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(205,165,106,0.28)] sm:px-7"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" strokeWidth={1.6} />
                  <span className="whitespace-nowrap">Start With a Sample</span>
                </Link>
                <a
                  href={`tel:${phoneDigits}`}
                  className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/20 bg-white/6 px-5 py-4 text-[10px] font-medium uppercase tracking-[0.22em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-[0_12px_30px_rgba(0,0,0,0.18)] sm:px-6"
                >
                  <PhoneCall className="h-3.5 w-3.5 shrink-0" strokeWidth={1.6} />
                  <span className="whitespace-nowrap">Call the Atelier</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ticker bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/40 py-5 backdrop-blur-md">
          <div className="mx-auto flex max-w-[1400px] flex-wrap justify-between gap-6 px-6 text-[9px] font-bold uppercase tracking-[0.35em] text-ivory/80">
            <span>Low MOQ & Sampling</span>
            <span className="hidden sm:inline">Artwork Development</span>
            <span className="hidden md:inline">In-House Design & QC</span>
            <span>Express Worldwide Shipping</span>
          </div>
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
            <div className="grid gap-10 border-y border-ink/10 py-14 text-center sm:py-20 md:grid-cols-3">
              <div>
                <div className="font-serif text-[86px] sm:text-[120px] md:text-[150px] font-light leading-none text-[#D4AF37]">
                  <CountUp target={150} suffix="+" duration={2000} />
                </div>
                <p className="mt-6 text-[13px] font-bold uppercase leading-relaxed tracking-[0.25em] text-[#A69C98]">
                  Collections Supported
                </p>
              </div>
              <div>
                <div className="font-serif text-[86px] sm:text-[120px] md:text-[150px] font-light leading-none text-[#D4AF37]">
                  <CountUp target={18} duration={1600} />
                </div>
                <p className="mt-6 text-[13px] font-bold uppercase leading-relaxed tracking-[0.25em] text-[#A69C98]">
                  Markets Served
                </p>
              </div>
              <div>
                <div className="font-serif text-[64px] sm:text-[92px] md:text-[112px] italic font-light leading-none text-[#D4AF37]">
                  Fast-track
                </div>
                <p className="mt-6 text-[13px] font-bold uppercase leading-relaxed tracking-[0.25em] text-[#A69C98]">
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














