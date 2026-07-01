import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import processHero from "@/assets/process-hero.png";

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
      { property: "og:image", content: processHero },
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
        image={processHero}
      />

      {/* Process materials hero image */}
      <section
        className="py-0"
        style={{ background: "#F4EFE7" }}
      >
        <Reveal>
          <div
            className="relative overflow-hidden mx-auto max-w-[1320px]"
            style={{
              borderBottom: "1px solid rgba(212,175,55,0.18)",
              transition: "box-shadow 0.7s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "0 0 0 1px rgba(212,175,55,0.30)";
              const img = el.querySelector("img") as HTMLElement | null;
              if (img) img.style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "none";
              const img = el.querySelector("img") as HTMLElement | null;
              if (img) img.style.transform = "scale(1)";
            }}
          >
            <img
              src={processHero}
              alt="Embroidery sampling process — zari spools, crystals and silk swatch flat-lay"
              className="w-full object-cover object-center"
              style={{
                maxHeight: "420px",
                transition: "transform 1.4s cubic-bezier(0.19,1,0.22,1)",
                display: "block",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, transparent 40%, rgba(6,4,2,0.70) 100%)",
              }}
            />
            <div className="absolute bottom-0 right-0 p-6 sm:p-10 text-right">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]">
                Process · Sampling Studio
              </p>
              <h2 className="mt-2 font-serif text-3xl leading-tight text-white">
                Materials before <span className="italic">the needle.</span>
              </h2>
            </div>
          </div>
        </Reveal>
      </section>

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
                  <p className="mt-3 max-w-3xl text-[15px] font-medium leading-7 text-ink-soft">
                    {p.desc}
                  </p>
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
