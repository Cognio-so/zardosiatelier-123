import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import gown from "@/assets/collection-gown.jpg";
import bridal from "@/assets/collection-bridal.jpg";
import handbag from "@/assets/collection-handbag.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p6 from "@/assets/portfolio-6.jpg";
import p1 from "@/assets/portfolio-1.jpg";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — Who We Serve | Zardosi Atelier" },
      {
        name: "description",
        content:
          "Couture houses, bridal labels, designer menswear, accessory brands — the industries our atelier serves.",
      },
      { property: "og:title", content: "Industries — Zardosi Atelier" },
      {
        property: "og:description",
        content: "Industries served by our luxury embroidery atelier.",
      },
      { property: "og:url", content: "/industries" },
      { property: "og:image", content: gown },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesPage,
});

const industries = [
  { label: "Haute Couture", desc: "Runway-grade embroidery for Paris and Milan shows, calibrated to the precise finishing standards of haute couture.", img: gown },
  { label: "Bridal Labels", desc: "Heritage and contemporary bridalwear ateliers specializing in zardosi, crystal and pearl embellishments.", img: bridal },
  {
    label: "Designer Womenswear",
    desc: "Seasonal embellishment programs for ready-to-wear collections across global fashion markets.",
    img: p6,
  },
  {
    label: "Designer Menswear",
    desc: "Tonal embroidery and patch programs for fine tailoring, lapels, and occasion-wear.",
    img: p2,
  },
  {
    label: "Luxury Accessories",
    desc: "Embellished handbags, belts, headpieces and scarves crafted for luxury retail standards.",
    img: handbag,
  },
  {
    label: "Costume & Editorial",
    desc: "Bespoke embroidery for film, opera, theatre and high-end editorial photography projects.",
    img: p1,
  },
];

function IndustriesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Atelier · Industries"
        title="Who we"
        italic="serve."
        description="From haute couture to designer menswear and luxury accessories, our studio partners with brands held to the highest finishing standards."
        image={gown}
      />
      <section className="luxury-silk-bg py-16">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {industries.map((s, i) => (
            <Reveal key={s.label} delay={(i % 3) * 100} className="group">
              {/* Unified premium couture card */}
              <div
                className="flex flex-col overflow-hidden rounded-[24px] border border-[#D4AF37]/20 bg-[#FAF7F2] shadow-[0_12px_32px_-12px_rgba(0,0,0,0.05)] transition-all duration-500 group-hover:shadow-[0_24px_48px_-12px_rgba(212,175,55,0.12)] group-hover:-translate-y-2 group-hover:border-[#D4AF37]/50"
              >
                {/* Image section — clickable preview */}
                <div
                  className="overflow-hidden aspect-[4/3] cursor-pointer"
                  data-preview-image={s.img}
                >
                  <img
                    src={s.img}
                    alt={s.label}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.08]"
                  />
                </div>

                {/* Content section */}
                <div className="flex flex-col flex-1 p-6 pt-5">
                  {/* Gold separator */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-[0.75px] bg-[#D4AF37]/40" />
                    <div className="size-1 bg-[#D4AF37] rotate-45 opacity-60" />
                    <div className="w-6 h-[0.75px] bg-[#D4AF37]/40" />
                  </div>

                  <h3 className="font-serif text-[22px] leading-snug text-[#1A1A1A] font-medium mb-3">
                    {s.label}
                  </h3>
                  <p className="text-[13px] text-[#4A4A4A] leading-relaxed flex-1">
                    {s.desc}
                  </p>

                  {/* Pill CTA */}
                  <Link
                    to="/contact"
                    className="mt-5 self-start inline-flex items-center gap-2 border border-[#D4AF37]/35 rounded-full px-5 py-2 text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold transition-all duration-400 hover:bg-[#D4AF37] hover:text-[#FAF7F2] hover:border-[#D4AF37]"
                  >
                    View Projects
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTABand />
    </PageShell>
  );
}
