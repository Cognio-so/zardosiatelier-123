import { useState } from "react";
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
import techniqueZardosiNew from "@/assets/technique-zardosi-new.png";
import techniqueCrystalNew from "@/assets/technique-crystal-new.png";
import technique3dNew from "@/assets/technique-3d-new.png";
import techniqueBeadworkNew from "@/assets/technique-beadwork-new.png";

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
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const techniques = [
  {
    name: "Zardosi",
    desc: "Metallic gold threadwork rooted in centuries of courtly craft.",
    image: techniqueZardosiNew,
  },
  {
    name: "Crystal Work",
    desc: "Hand-set crystals and sequins for couture light and shadow.",
    image: techniqueCrystalNew,
  },
  {
    name: "3D Floral",
    desc: "Sculpted silk petals layered with pearl and bead cores.",
    image: technique3dNew,
  },
  {
    name: "Beadwork",
    desc: "Glass, pearl and seed-bead compositions stitched by hand.",
    image: techniqueBeadworkNew,
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
  return (
    <SiteShell>
      <section className="relative min-h-[760px] overflow-hidden bg-[#3d2b20] pt-28 text-ivory">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroEmbroidery}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#160f0b]/45 via-[#160f0b]/12 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#160f0b]/20 via-transparent to-[#160f0b]/38" />
        <div className="absolute bottom-0 left-0 right-0 border-y border-gold/20 bg-[#160f0b]/30">
          <div className="mx-auto grid max-w-[1220px] gap-4 px-6 py-6 text-[10px] uppercase tracking-[0.32em] text-ivory md:grid-cols-4">
            <span>Low MOQ & Sampling</span>
            <span>Artwork Development</span>
            <span>In-House Design & QC</span>
            <span>Express Worldwide Shipping</span>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-[1220px] items-center px-6 pb-32">
          <div className="max-w-[780px] p-0 lg:-ml-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-gold-soft">
              Haute Couture Embroidery - Export Atelier - India
            </p>
            <h1 className="mt-8 font-serif text-[48px] leading-[0.98] text-white sm:text-[74px] lg:text-[92px]">
              Hand embroidery for the world's{" "}
              <span className="italic text-gold-soft">finest labels.</span>
            </h1>
            <p className="mt-8 max-w-[62ch] text-base font-medium leading-8 text-white/88">
              We craft and export luxury embroidered pieces for couture houses, designers and
              premium brands - every stitch finished by master karigars and checked twice before it ships.
            </p>
            <p className="mt-7 font-serif text-xl italic text-gold-soft">
              Patches / Bags / Headbands / Dresses / Gowns / Abayas / Bespoke commissions
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="border border-gold bg-gold px-10 py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#120c09] transition hover:border-ivory hover:bg-ivory"
              >
                Start With a Sample
              </Link>
              <a
                href="https://wa.me/918826023527"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ivory/65 bg-ivory/10 px-10 py-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-ivory transition hover:bg-ivory hover:text-[#120c09]"
              >
                WhatsApp the Atelier
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="luxury-silk-bg py-20 sm:py-28">
        <div className="mx-auto max-w-[1220px] px-6">
          <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">Embroidery Techniques</span>
              <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl">
                A vocabulary of luxury hand-craft.
              </h2>
            </div>
            <Link to="/services" className="gold-link text-[10px] uppercase tracking-[0.3em]">
              All Services
            </Link>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {techniques.map((item, i) => (
              <Reveal key={item.name} delay={i * 80}>
                <article className="group">
                  <div className="aspect-[3/4] overflow-hidden bg-linen">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl">{item.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{item.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#120c09] py-20 text-ivory">
        <div className="mx-auto max-w-[1220px] px-6">
          <Reveal>
            <span className="eyebrow !text-gold-soft">Our Process</span>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-white sm:text-5xl">
              From sketch to ceremony.
            </h2>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
              {process.map((step) => (
                <div key={step.n} className="border border-gold/35 bg-white/[0.04] px-6 py-7">
                  <span className="font-serif text-2xl text-gold-soft">{step.n}</span>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.24em] text-ivory/78">
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="luxury-silk-bg py-16">
        <div className="mx-auto max-w-[1220px] px-6">
          <Reveal className="px-0 py-12">
            <span className="eyebrow">Why Zardosi Atelier</span>
            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              A partner built for luxury brands.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {whyChoose.map((item) => (
                <div key={item.title} className="border border-gold/20 bg-ivory px-5 py-6">
                  <Icon name={item.icon} className="size-5 text-gold" />
                  <p className="mt-6 text-sm font-medium text-ink">{item.title}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-8 px-0 py-14">
            <div className="grid gap-12 border-y border-ink/10 py-12 text-center md:grid-cols-3">
              <div>
                <p className="font-serif text-5xl text-gold sm:text-6xl">120+</p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.36em] text-ink-soft">
                  Collections Supported
                </p>
              </div>
              <div>
                <p className="font-serif text-5xl text-gold sm:text-6xl">18</p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.36em] text-ink-soft">
                  Markets Served
                </p>
              </div>
              <div>
                <p className="font-serif text-5xl italic text-gold sm:text-6xl">Fast-track</p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.36em] text-ink-soft">
                  Sampling Turnaround
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="luxury-silk-bg py-16 sm:py-24">
        <div className="mx-auto max-w-[1220px] px-6">
          <Reveal className="px-0 py-12">
            <span className="eyebrow">Questions</span>
            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              Working with our atelier.
            </h2>

            <Accordion type="single" collapsible className="mt-10 w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.question} value={`item-${i}`} className="border-b border-ink/10 py-3">
                  <AccordionTrigger className="text-left font-serif text-xl hover:text-gold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-[70ch] pt-3 text-sm leading-7 text-ink-soft">
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
    <section className="luxury-silk-bg pb-20 sm:pb-28" id="quote">
      <div className="mx-auto max-w-[1220px] px-6">
        <Reveal className="border border-gold/20 bg-[#fffdf9] px-6 py-12 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Begin a Commission</span>
            <h2 className="mt-6 font-serif text-4xl leading-tight sm:text-5xl">
              Let us translate your vision into couture-grade craftsmanship.
            </h2>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-5">
              <a
                href="https://wa.me/918826023527?text=Hello%20Zardosi%20Atelier%2C%20I%27d%20like%20to%20discuss%20a%20couture%20embroidery%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-gold bg-gold px-8 py-4 text-center text-[10px] uppercase tracking-[0.3em] text-[#120c09] transition hover:bg-transparent"
              >
                WhatsApp +91 88260 23527
              </a>
              <a
                href="mailto:atelier@zardosiatelier.com"
                className="block border border-ink/15 px-8 py-4 text-center text-[10px] uppercase tracking-[0.3em] text-ink transition hover:border-gold hover:text-gold"
              >
                Email the Atelier
              </a>
              <p className="text-center text-sm leading-7 text-ink-soft lg:text-left">
                Send your sketches, references, quantity range and timeline. We will reply with the
                right sampling route for your project.
              </p>
            </div>

            <div className="border border-ink/10 bg-ivory p-6 sm:p-8">
              {submitted ? (
                <div className="py-16 text-center">
                  <span className="eyebrow">Thank You</span>
                  <h3 className="mt-4 font-serif text-3xl">Inquiry Received</h3>
                  <p className="mt-3 text-sm text-ink-soft">Our atelier team will contact you shortly.</p>
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
      <label className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-ink-soft">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required
        className="w-full border-b border-ink/15 bg-transparent py-2 text-sm outline-none transition focus:border-gold"
      />
    </div>
  );
}

function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
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
