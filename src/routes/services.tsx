import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import heroEmbroidery from "@/assets/hero-embroidery.jpg";
import collectionGown from "@/assets/collection-gown.jpg";
import collectionBridal from "@/assets/collection-bridal.jpg";
import collectionHandbag from "@/assets/collection-handbag.jpg";
import technique3d from "@/assets/technique-3d.jpg";
import techniqueBead from "@/assets/technique-bead.jpg";
import techniqueCrystal from "@/assets/technique-crystal.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Couture Embroidery & Manufacturing | Zardosi Atelier" },
      {
        name: "description",
        content:
          "Couture embroidery sampling, hand-embroidered production, embellished panels and luxury handbag treatments for global fashion houses.",
      },
      { property: "og:title", content: "Services — Zardosi Atelier" },
      {
        property: "og:description",
        content: "Couture embroidery sampling and production for luxury fashion brands.",
      },
      { property: "og:url", content: "/services" },
      { property: "og:image", content: collectionGown },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const services = [
  {
    name: "Couture Sampling",
    desc: "Precision swatches and prototypes for runway, lookbook and press samples — turnaround within seven to fourteen days.",
    image: heroEmbroidery,
  },
  {
    name: "Hand Embroidery for Fashion Brands",
    desc: "Calibrated hand embroidery across silk, organza, tulle and wool — built for couture finish at production scale.",
    image: collectionGown,
  },
  {
    name: "Bridal Embroidery Manufacturing",
    desc: "Heritage zardosi, crystal and pearl work for bridal ateliers — full gown embellishment to veil borders.",
    image: collectionBridal,
  },
  {
    name: "Luxury Handbag Embellishment",
    desc: "Bead, sequin and metallic work for leather and fabric handbags — production-tested for retail.",
    image: collectionHandbag,
  },
  {
    name: "Embellished Panels & Components",
    desc: "Standalone embroidered panels, motifs, appliqués and borders shipped to your manufacturing partner.",
    image: technique3d,
  },
  {
    name: "Mixed Media & Crystal Studies",
    desc: "Layered surfaces combining bead, crystal, sequin and thread — engineered for weight and structural integrity.",
    image: techniqueCrystal,
  },
];

function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Atelier · Services"
        title="Couture services for"
        italic="global houses."
        description="A full-spectrum embroidery offer — from a single sample to scaled production runs — held to the standards of haute couture."
        image={techniqueBead}
      />
      <section className="luxury-silk-bg py-16">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) * 100} className="group">
              {/* Unified premium couture card */}
              <div
                className="flex flex-col overflow-hidden rounded-[24px] border border-[#D4AF37]/20 bg-[#FAF7F2] shadow-[0_12px_32px_-12px_rgba(0,0,0,0.05)] transition-all duration-500 group-hover:shadow-[0_24px_48px_-12px_rgba(212,175,55,0.12)] group-hover:-translate-y-2 group-hover:border-[#D4AF37]/50"
              >
                {/* Image section — clickable preview */}
                <div
                  className="overflow-hidden aspect-[4/3] cursor-pointer"
                  data-preview-image={s.image}
                >
                  <img
                    src={s.image}
                    alt={s.name}
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
                    {s.name}
                  </h3>
                  <p className="text-[13px] text-[#4A4A4A] leading-relaxed flex-1">
                    {s.desc}
                  </p>

                  {/* Pill CTA */}
                  <Link
                    to="/contact"
                    className="mt-5 self-start inline-flex items-center gap-2 border border-[#D4AF37]/35 rounded-full px-5 py-2 text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold transition-all duration-400 hover:bg-[#D4AF37] hover:text-[#FAF7F2] hover:border-[#D4AF37]"
                  >
                    Request Sampling
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
