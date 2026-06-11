import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import hero from "@/assets/technique-aari.jpg";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process — From Design to Delivery | Zardosi Atelier" },
      {
        name: "description",
        content:
          "Our six-step embroidery process: design share, technical review, sampling, approval, production, and global delivery.",
      },
      { property: "og:title", content: "Process — Zardosi Atelier" },
      {
        property: "og:description",
        content: "How we partner from design share to global delivery.",
      },
      { property: "og:url", content: "/process" },
      { property: "og:image", content: hero },
    ],
    links: [{ rel: "canonical", href: "/process" }],
  }),
  component: ProcessPage,
});

const process = [
  {
    n: "01",
    title: "Share Design",
    desc: "Sketches, tech packs or mood boards via our secure client portal. All correspondence is NDA-protected by default.",
  },
  {
    n: "02",
    title: "Technical Review",
    desc: "Our atelier directors review material feasibility, stitch density, and timing — and respond with a written assessment.",
  },
  {
    n: "03",
    title: "Sampling",
    desc: "Precision swatches or full prototypes are executed within seven to fourteen days, then shipped for approval.",
  },
  {
    n: "04",
    title: "Approval",
    desc: "Sign-off on embellishment weight, colour calibration, and material integrity ahead of production lock.",
  },
  {
    n: "05",
    title: "Production",
    desc: "Dedicated artisan pods execute production with daily QC and documented checkpoints.",
  },
  {
    n: "06",
    title: "Global Delivery",
    desc: "Insured, white-glove logistics directly to your design studio or manufacturing partner.",
  },
];

function ProcessPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Methodology"
        title="The path to"
        italic="production."
        description="A clear six-step path from first design share to global delivery — engineered for confidentiality, precision, and predictable timing."
        image={hero}
      />
      <section className="luxury-silk-bg py-10 sm:py-12">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-6 lg:px-10">
          <ol className="space-y-8 sm:space-y-10">
            {process.map((p, i) => (
              <Reveal
                key={p.n}
                delay={i * 80}
                as="li"
                className="grid grid-cols-1 items-baseline gap-4 border-b border-ink/10 pb-8 md:grid-cols-[96px_1fr]"
              >
                <span className="font-serif text-5xl italic text-gold">{p.n}</span>
                <div>
                  <h3 className="font-serif text-4xl leading-tight">{p.title}</h3>
                  <p className="mt-3 max-w-3xl text-[15px] font-medium leading-7 text-ink-soft">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <CTABand />
    </PageShell>
  );
}
