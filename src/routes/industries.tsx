import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, CTABand } from "@/components/site/PageShell";
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
      { title: "Category — Who We Serve | Zardosi Atelier" },
      {
        name: "description",
        content:
          "Couture houses, bridal labels, designer menswear, accessory brands — the categories our atelier serves.",
      },
      { property: "og:title", content: "Category — Zardosi Atelier" },
      {
        property: "og:description",
        content: "Categories served by our luxury embroidery atelier.",
      },
      { property: "og:url", content: "/industries" },
      { property: "og:image", content: gown },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesPage,
});

const industries = [
  {
    label: "Haute Couture",
    desc: "Runway-grade embroidery for Paris and Milan shows, calibrated to the precise finishing standards of haute couture.",
    img: gown,
  },
  {
    label: "Bridal Labels",
    desc: "Heritage and contemporary bridalwear ateliers specializing in zardosi, crystal and pearl embellishments.",
    img: bridal,
  },
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
      <section className="luxury-silk-bg py-10 pt-28 sm:py-12 sm:pt-32">
        <div className="mx-auto mb-8 max-w-[1320px] px-5 sm:px-6 lg:px-10">
          <span className="eyebrow">Category</span>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-6xl">
            Categories we serve.
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] font-medium leading-7 text-ink-soft">
            From haute couture to designer menswear and luxury accessories, our studio partners with
            brands held to the highest finishing standards.
          </p>
        </div>
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-5 px-5 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-10">
          {industries.map((s, i) => (
            <Reveal key={s.label} delay={(i % 3) * 100} className="group">
              {/* Unified premium couture card */}
              <div className="flex h-full flex-col overflow-hidden border border-[#D4AF37]/25 bg-[#FAF7F2] transition-all duration-500 group-hover:border-[#D4AF37]/60">
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

                  <h3 className="mb-3 font-serif text-[26px] leading-tight text-[#1A1A1A]">
                    {s.label}
                  </h3>
                  <p className="flex-1 text-[15px] font-medium leading-7 text-[#2B2722]">
                    {s.desc}
                  </p>

                  {/* Pill CTA */}
                  <Link
                    to="/contact"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 border border-[#D4AF37]/55 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A672C] transition-all duration-400 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#120c09] sm:w-auto"
                  >
                    View Projects
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
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
