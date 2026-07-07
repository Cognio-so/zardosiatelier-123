import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { Lens } from "@/registry/magicui/lens";
import categoryHero from "@/assets/category-hero.png";
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
      { property: "og:image", content: categoryHero },
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

/** Reusable hover-enhanced category card */
function CategoryCard({ s }: { s: (typeof industries)[number] }) {
  return (
    <div
      className="flex h-full flex-col overflow-hidden bg-[#FAF7F2]"
      style={{
        border: "1px solid rgba(212,175,55,0.20)",
        transition: "border-color 0.7s cubic-bezier(0.4,0,0.2,1), box-shadow 0.7s cubic-bezier(0.4,0,0.2,1)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(212,175,55,0.72)";
        el.style.boxShadow = "0 0 0 1px rgba(212,175,55,0.38), 0 12px 48px rgba(0,0,0,0.18)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(212,175,55,0.20)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Image with zoom + overlay */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "4/3", cursor: "pointer" }}
        data-preview-image={s.img}
      >
        <Lens zoomFactor={2.2} lensSize={140} isStatic={false}>
          <img
            src={s.img}
            alt={s.label}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            style={{ transition: "transform 1.3s cubic-bezier(0.19,1,0.22,1)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          />
        </Lens>
        {/* Gradient overlay on image section */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(8,5,3,0.62) 0%, transparent 55%)",
            opacity: 0,
            transition: "opacity 0.65s cubic-bezier(0.4,0,0.2,1)",
          }}
          ref={(el) => {
            if (!el) return;
            const parent = el.parentElement!;
            const show = () => (el.style.opacity = "1");
            const hide = () => (el.style.opacity = "0");
            parent.addEventListener("mouseenter", show);
            parent.addEventListener("mouseleave", hide);
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 pt-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-[0.75px] bg-[#D4AF37]/40" />
          <div className="size-1 bg-[#D4AF37] rotate-45 opacity-60" />
          <div className="w-6 h-[0.75px] bg-[#D4AF37]/40" />
        </div>

        <h3 className="mb-3 font-serif text-[26px] leading-tight text-[#1A1A1A]">
          {s.label}
        </h3>
        <p className="flex-1 text-[15px] font-medium leading-7 text-[#2B2722]">{s.desc}</p>

        <Link
          to="/contact"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A672C] sm:w-auto"
          style={{
            border: "1px solid rgba(212,175,55,0.50)",
            transition: "background 0.4s ease, color 0.4s ease, border-color 0.4s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "#D4AF37";
            el.style.color = "#120C09";
            el.style.borderColor = "#D4AF37";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "transparent";
            el.style.color = "#8A672C";
            el.style.borderColor = "rgba(212,175,55,0.50)";
          }}
        >
          View Projects
          <span style={{ transition: "transform 0.3s ease" }}>→</span>
        </Link>
      </div>
    </div>
  );
}

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

        {/* Featured flat-lay hero image for the category page */}
        <div className="mx-auto mb-10 max-w-[1320px] px-5 sm:px-6 lg:px-10">
          <div
            className="relative overflow-hidden"
            style={{
              border: "1px solid rgba(212,175,55,0.22)",
              maxHeight: "340px",
            }}
          >
            <img
              src={categoryHero}
              alt="Bridal lehenga fabric with 3D floral embroidery — flat-lay"
              className="w-full object-cover object-center"
              style={{ maxHeight: "340px" }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 50%, rgba(0,0,0,0.45) 100%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]">
                Bridal · 3D Floral Embroidery
              </p>
              <h2 className="mt-2 font-serif text-3xl leading-tight text-white sm:text-4xl">
                Couture flat-lay — <span className="italic">lehenga fabric.</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-5 px-5 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-10">
          {industries.map((s, i) => (
            <Reveal key={s.label} delay={(i % 3) * 100} className="group">
              <CategoryCard s={s} />
            </Reveal>
          ))}
        </div>
      </section>
      <CTABand />
    </PageShell>
  );
}
