import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import { TypingAnimation } from "@/registry/magicui/typing-animation";
import Text3DFlip from "@/registry/magicui/text-3d-flip";
import { Lens } from "@/registry/magicui/lens";
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

import heroEmbroidery from "@/assets/hero-embroidery.webp";
import heroVideo from "@/assets/hero-video.mp4";
import techniqueZardosiNew from "@/assets/technique-zardosi-new.webp";
import techniqueCrystalNew from "@/assets/technique-crystal-new.webp";
import technique3dNew from "@/assets/technique-3d-new.webp";
import techniqueBeadworkNew from "@/assets/technique-beadwork-new.webp";

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
    name: "Zardosi",
    desc: "Metallic gold threadwork rooted in centuries of courtly craft.",
    image: techniqueBeadworkNew,
  },
  {
    name: "Crystal Work",
    desc: "Hand-set crystals and sequins for couture light and shadow.",
    image: technique3dNew,
  },
  {
    name: "3D Floral",
    desc: "Sculpted silk petals layered with pearl and bead cores.",
    image: techniqueCrystalNew,
  },
  {
    name: "Beadwork",
    desc: "Glass, pearl and seed-bead compositions stitched by hand.",
    image: techniqueZardosiNew,
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
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    // Only load the heavy video after mount to avoid blocking FCP/LCP
    const timer = setTimeout(() => {
      setLoadVideo(true);
    }, 1500); // 1.5s delay allows initial paint to finish cleanly
    return () => clearTimeout(timer);
  }, []);

  return (
    <SiteShell>
      <section className="relative min-h-screen w-full overflow-hidden bg-[#160f0b]">
        {/* Full-screen cinematic video / Poster placeholder */}
        {loadVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroEmbroidery}
            className="absolute inset-0 h-full w-full object-cover animate-fade-in"
            aria-hidden="true"
          >
            <source src={heroVideo} type="video/mp4" />
            <track kind="captions" src="" label="No captions available" default />
          </video>
        ) : (
          <img
            src={heroEmbroidery}
            alt="Hand embroidery craftsmanship header background"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
        )}

        {/* Cinematic Dark Gradient Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ 
            background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.85) 100%), linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 40%, rgba(0,0,0,0.7) 100%)" 
          }} 
        />

        {/* Content Area with Glass Panel */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] items-center px-6 pb-28 pt-32 sm:pt-36 lg:pt-32">
          <div 
            className="w-full max-w-[700px] border border-white/10 p-8 backdrop-blur-[12px] sm:p-12 lg:p-12 animate-fade-in"
            style={{ 
              backgroundColor: "rgba(15,15,15,0.28)",
            }}
          >
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold-soft">
                Haute Couture Embroidery — India
              </p>
              <TypingAnimation
                as="h1"
                duration={40}
                delay={200}
                className="mt-6 font-serif text-[46px] leading-[1.02] text-white sm:text-[64px] lg:text-[76px] font-normal tracking-normal text-left"
              >
                Hand embroidery for the world's *finest labels.*
              </TypingAnimation>
              <p className="mt-8 max-w-[50ch] text-base font-medium leading-relaxed text-white/90 sm:text-lg">
                We craft and export luxury embroidered pieces for couture houses, designers and
                premium brands — every stitch finished by master karigars and checked twice before it
                ships.
              </p>
              <p className="mt-6 font-serif text-lg italic text-gold-soft/90">
                Patches / Bags / Headbands / Gowns / Bespoke commissions
              </p>
              <div className="mt-10 flex flex-wrap gap-5">
                <Link
                  to="/contact"
                  className="w-full border border-gold bg-gold px-10 py-5 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-[#120c09] transition-all hover:bg-transparent hover:text-white sm:w-auto"
                >
                  Start With a Sample
                </Link>
                <a
                  href="https://wa.me/918826023527"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-white/40 bg-white/5 px-10 py-5 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white backdrop-blur-sm transition-all hover:bg-white hover:text-[#120c09] sm:w-auto"
                >
                  WhatsApp the Atelier
                </a>
              </div>
            </Reveal>
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

      <section className="bg-[#EFE8DD] py-12 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
          <Reveal className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">Embroidery Techniques</span>
              <Text3DFlip
                as="h2"
                className="mt-3 font-serif text-4xl leading-tight sm:text-6xl text-ink"
                textClassName="text-ink"
                flipTextClassName="text-gold-soft"
                rotateDirection="top"
                staggerDuration={0.03}
                staggerFrom="first"
                transition={{ type: "spring", damping: 25, stiffness: 160 }}
              >
                A vocabulary of luxury hand-craft.
              </Text3DFlip>
            </div>
            <Link to="/services" className="gold-link text-[10px] uppercase tracking-[0.3em]">
              All Services
            </Link>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {techniques.map((item, i) => (
              <Reveal key={item.name} delay={i * 80}>
                <article className="group">
                  <div className="aspect-[4/5] overflow-hidden bg-[#E5D8C8]">
                    <Lens zoomFactor={2.2} lensSize={140} isStatic={false}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </Lens>
                  </div>
                  <h3 className="mt-4 font-serif text-3xl leading-tight text-ink">{item.name}</h3>
                  <p className="mt-2 text-[15px] font-medium leading-7 text-ink-soft">
                    {item.desc}
                  </p>
                </article>
              </Reveal>
            ))}
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
                  <Icon name={item.icon} className="size-5 text-gold" />
                  <p className="mt-6 text-sm font-medium text-ink">{item.title}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-4 px-0 py-8">
            <div className="grid gap-8 border-y border-ink/10 py-8 text-center md:grid-cols-3">
              <div>
                <p className="font-serif text-5xl text-gold sm:text-6xl">120+</p>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.24em] text-ink-soft">
                  Collections Supported
                </p>
              </div>
              <div>
                <p className="font-serif text-5xl text-gold sm:text-6xl">18</p>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.24em] text-ink-soft">
                  Markets Served
                </p>
              </div>
              <div>
                <p className="font-serif text-5xl italic text-gold sm:text-6xl">Fast-track</p>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.24em] text-ink-soft">
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
            </h2>

            <Accordion type="single" collapsible className="mt-7 w-full">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${i}`}
                  className="border-b border-ink/10 py-3"
                >
                  <AccordionTrigger className="text-left font-serif text-2xl hover:text-gold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-[70ch] pt-3 text-[15px] font-medium leading-7 text-ink-soft">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <LeadSection />
    </SiteShell>
  );
}

function LeadSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
                href="https://wa.me/918826023527?text=Hello%20Zardosi%20Atelier%2C%20I%27d%20like%20to%20discuss%20a%20couture%20embroidery%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-gold bg-gold px-8 py-4 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-[#120c09] transition hover:bg-transparent"
              >
                WhatsApp +91 88260 23527
              </a>
              <a
                href="mailto:atelier@zardosiatelier.com"
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
              {submitted ? (
                <div className="py-16 text-center">
                  <span className="eyebrow">Thank You</span>
                  <h3 className="mt-4 font-serif text-3xl">Inquiry Received</h3>
                  <p className="mt-3 text-sm text-ink-soft">
                    Our atelier team will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Full Name" name="name" />
                    <Field label="Email Address" name="email" type="email" />
                  </div>
                  <Field label="Project Type" name="subject" />
                  <div>
                    <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-ink-soft">
                      Project Details
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      className="w-full resize-none border-b border-ink/15 bg-transparent py-2 text-sm outline-none transition focus:border-gold"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-ink px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-ivory transition hover:bg-gold hover:text-[#120c09] sm:w-auto"
                  >
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label 
        htmlFor={`field-${name}`}
        className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-ink-soft"
      >
        {label}
      </label>
      <input
        id={`field-${name}`}
        name={name}
        type={type}
        required
        className="w-full border-b border-ink/15 bg-transparent py-2 text-sm outline-none transition focus:border-gold"
      />
    </div>
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

