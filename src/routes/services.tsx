import { createFileRoute } from "@tanstack/react-router";
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
      { title: "Services — Couture Embroidery & Manufacturing | Maison Auréline" },
      {
        name: "description",
        content:
          "Couture embroidery sampling, hand-embroidered production, embellished panels and luxury handbag treatments for global fashion houses.",
      },
      { property: "og:title", content: "Services — Maison Auréline" },
      { property: "og:description", content: "Couture embroidery sampling and production for luxury fashion brands." },
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
      <section className="bg-ivory py-28">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) * 100} className="group">
              <div className="overflow-hidden aspect-[4/5] luxury-card">
                <img
                  src={s.image}
                  alt={s.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.06]"
                />
              </div>
              <h3 className="mt-6 font-serif text-2xl">{s.name}</h3>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CTABand />
    </PageShell>
  );
}
