import { createFileRoute } from "@tanstack/react-router";
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
  { label: "Haute Couture", desc: "Runway-grade embroidery for Paris and Milan shows.", img: gown },
  { label: "Bridal Labels", desc: "Heritage and contemporary bridalwear ateliers.", img: bridal },
  {
    label: "Designer Womenswear",
    desc: "Seasonal embellishment for ready-to-wear collections.",
    img: p6,
  },
  {
    label: "Designer Menswear",
    desc: "Tonal embroidery and patch programs for tailoring.",
    img: p2,
  },
  {
    label: "Luxury Accessories",
    desc: "Embellished handbags, belts and headpieces.",
    img: handbag,
  },
  {
    label: "Costume & Editorial",
    desc: "Embroidery for film, opera and editorial projects.",
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
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {industries.map((s, i) => (
            <Reveal key={s.label} delay={(i % 3) * 100} className="group">
              <div className="overflow-hidden aspect-[4/5] luxury-card">
                <img
                  src={s.img}
                  alt={s.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.06]"
                />
              </div>
              <h3 className="mt-6 font-serif text-2xl">{s.label}</h3>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CTABand />
    </PageShell>
  );
}
