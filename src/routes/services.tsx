import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { Lens } from "@/registry/magicui/lens";
import heroEmbroidery from "@/assets/hero-embroidery.webp";
import collectionGown from "@/assets/collection-gown.webp";
import collectionBridal from "@/assets/collection-bridal.webp";
import collectionHandbag from "@/assets/collection-handbag.webp";
import technique3d from "@/assets/technique-3d.webp";
import techniqueBead from "@/assets/technique-bead.webp";
import techniqueCrystal from "@/assets/technique-crystal.webp";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services - Couture Embroidery & Manufacturing | Zardosi Atelier" },
      {
        name: "description",
        content:
          "Couture embroidery sampling, hand-embroidered production, embellished panels and luxury handbag treatments for global fashion houses.",
      },
      { property: "og:title", content: "Services - Zardosi Atelier" },
      {
        property: "og:description",
        content: "Couture embroidery sampling and production for luxury fashion brands.",
      },
      { property: "og:url", content: "/services" },
      { property: "og:image", content: collectionGown },
    ],
    links: [{ rel: "canonical", href: "https://www.zardosiatelier.com/services" }],
  }),
  component: ServicesPage,
});

const services = [
  {
    name: "Couture Sampling",
    desc: "Precision swatches and prototypes for runway, lookbook and press samples - turnaround within seven to fourteen days.",
    image: heroEmbroidery,
  },
  {
    name: "Hand Embroidery for Fashion Brands",
    desc: "Calibrated hand embroidery across silk, organza, tulle and wool - built for couture finish at production scale.",
    image: collectionGown,
  },
  {
    name: "Bridal Embroidery Manufacturing",
    desc: "Heritage zardosi, crystal and pearl work for bridal ateliers - full gown embellishment to veil borders.",
    image: collectionBridal,
  },
  {
    name: "Luxury Handbag Embellishment",
    desc: "Bead, sequin and metallic work for leather and fabric handbags - production-tested for retail.",
    image: collectionHandbag,
  },
  {
    name: "Embellished Panels & Components",
    desc: "Standalone embroidered panels, motifs, appliqués and borders shipped to your manufacturing partner.",
    image: technique3d,
  },
  {
    name: "Mixed Media & Crystal Studies",
    desc: "Layered surfaces combining bead, crystal, sequin and thread - engineered for weight and structural integrity.",
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
        description="A full-spectrum embroidery offer - from a single sample to scaled production runs - held to the standards of haute couture."
        image={techniqueBead}
      />
      <section className="luxury-silk-bg py-10 sm:py-12">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-5 px-5 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-10">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) * 100} className="group">
              {/* Unified premium couture card */}
              <div className="flex h-full flex-col overflow-hidden border border-[#D4AF37]/25 bg-[#FAF7F2] transition-all duration-500 group-hover:border-[#D4AF37]/60">
                {/* Image section - clickable preview */}
                <div
                  className="overflow-hidden aspect-[4/3] cursor-pointer"
                  data-preview-image={s.image}
                >
                  <Lens zoomFactor={2.2} lensSize={140} isStatic={false}>
                    <img
                      src={s.image}
                      alt={s.name}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.08]"
                    />
                  </Lens>
                </div>

                {/* Content section */}
                <div className="flex flex-col flex-1 p-6 pt-5">
                  {/* Gold separator */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-[0.75px] bg-[#D4AF37]/40" />
                    <div className="size-1 bg-[#D4AF37] rotate-45 opacity-60" />
                    <div className="w-6 h-[0.75px] bg-[#D4AF37]/40" />
                  </div>

                  <h2 className="mb-3 font-serif text-[26px] leading-tight text-[#1A1A1A]">
                    {s.name}
                  </h2>
                  <p className="flex-1 text-[15px] font-medium leading-7 text-[#2B2722]">
                    {s.desc}
                  </p>

                  {/* Pill CTA */}
                  <Link
                    to="/contact"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 border border-[#D4AF37]/55 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A672C] transition-all duration-400 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#120c09] sm:w-auto"
                  >
                    Request Sampling
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
