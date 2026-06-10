import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import hero from "@/assets/portfolio-5.jpg";
import gown from "@/assets/collection-gown.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Atelier | Maison Auréline" },
      {
        name: "description",
        content:
          "Maison Auréline is a luxury embroidery atelier built on multi-generational craftsmanship — serving global fashion houses.",
      },
      { property: "og:title", content: "About — Maison Auréline" },
      {
        property: "og:description",
        content: "A luxury embroidery atelier serving global fashion houses.",
      },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: hero },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="The Maison"
        title="A studio of"
        italic="hands."
        description="Maison Auréline is built on multi-generational embroidery — restrained, considered, and held to the standards of the houses we serve."
        image={hero}
      />
      <section className="bg-ivory py-28">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="eyebrow">Our Approach</span>
            <h2 className="mt-5 font-serif text-4xl sm:text-5xl leading-[1.1]">
              Quiet craft. <span className="italic">Loud results.</span>
            </h2>
            <p className="mt-6 text-ink-soft leading-relaxed">
              Founded as a small studio commissioned by independent couture ateliers, Maison
              Auréline has grown into a 30-artisan house with dedicated pods for sampling,
              production, and finishing. Our clients include houses in Paris, Milan, New York and
              beyond.
            </p>
            <p className="mt-6 text-ink-soft leading-relaxed">
              We work under NDA, in restricted-access rooms, with documented quality checkpoints at
              every stage. The result: embroidered surfaces that hold up under runway light and
              editorial macro.
            </p>
          </Reveal>
          <Reveal delay={150} className="aspect-[4/5] overflow-hidden">
            <img src={gown} alt="Atelier" className="h-full w-full object-cover" />
          </Reveal>
        </div>
      </section>
      <CTABand />
    </PageShell>
  );
}
