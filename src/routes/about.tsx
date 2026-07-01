import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import aboutHero from "@/assets/about-hero.png";
import gown from "@/assets/collection-gown.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Atelier | Zardosi Atelier" },
      {
        name: "description",
        content:
          "Zardosi Atelier is a luxury embroidery atelier built on multi-generational craftsmanship — serving global fashion houses.",
      },
      { property: "og:title", content: "About — Zardosi Atelier" },
      {
        property: "og:description",
        content: "A luxury embroidery atelier serving global fashion houses.",
      },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: aboutHero },
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
        description="Zardosi Atelier is built on multi-generational embroidery — restrained, considered, and held to the standards of the houses we serve."
        image={aboutHero}
      />
      <section className="luxury-silk-bg py-10 sm:py-12">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-8 px-5 sm:px-6 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <span className="eyebrow">Our Approach</span>
            <h2 className="mt-3 font-serif text-4xl leading-[1.05] sm:text-5xl">
              Quiet craft. <span className="italic">Loud results.</span>
            </h2>
            <p className="mt-5 text-[16px] font-medium leading-7 text-ink-soft">
              Founded as a small studio commissioned by independent couture ateliers, Zardosi
              Atelier has grown into a 30-artisan house with dedicated pods for sampling,
              production, and finishing. Our clients include houses in Paris, Milan, New York and
              beyond.
            </p>
            <p className="mt-4 text-[16px] font-medium leading-7 text-ink-soft">
              We work under NDA, in restricted-access rooms, with documented quality checkpoints at
              every stage. The result: embroidered surfaces that hold up under runway light and
              editorial macro.
            </p>
          </Reveal>

          {/* Artisan hands image with hover zoom + gold border glow */}
          <Reveal delay={150}>
            <div
              className="aspect-[4/5] overflow-hidden"
              style={{
                border: "1px solid rgba(212,175,55,0.22)",
                transition: "border-color 0.7s cubic-bezier(0.4,0,0.2,1), box-shadow 0.7s cubic-bezier(0.4,0,0.2,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(212,175,55,0.70)";
                el.style.boxShadow = "0 0 0 1px rgba(212,175,55,0.35), 0 16px 56px rgba(0,0,0,0.22)";
                const img = el.querySelector("img") as HTMLElement | null;
                if (img) img.style.transform = "scale(1.06)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(212,175,55,0.22)";
                el.style.boxShadow = "none";
                const img = el.querySelector("img") as HTMLElement | null;
                if (img) img.style.transform = "scale(1)";
              }}
            >
              <img
                src={aboutHero}
                alt="Artisan hands hand-stitching zardosi embroidery on an adda frame"
                decoding="async"
                className="h-full w-full object-cover"
                style={{ transition: "transform 1.3s cubic-bezier(0.19,1,0.22,1)" }}
              />
            </div>
          </Reveal>
        </div>

        {/* Second editorial row with gown image */}
        <div className="mx-auto mt-10 max-w-[1180px] px-5 sm:px-6 lg:px-10">
          <Reveal>
            <div
              className="relative overflow-hidden"
              style={{
                border: "1px solid rgba(212,175,55,0.18)",
                transition: "border-color 0.7s ease, box-shadow 0.7s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(212,175,55,0.65)";
                el.style.boxShadow = "0 0 0 1px rgba(212,175,55,0.30)";
                const img = el.querySelector("img") as HTMLElement | null;
                if (img) img.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(212,175,55,0.18)";
                el.style.boxShadow = "none";
                const img = el.querySelector("img") as HTMLElement | null;
                if (img) img.style.transform = "scale(1)";
              }}
            >
              <img
                src={gown}
                alt="Atelier couture gown embroidery"
                decoding="async"
                className="w-full object-cover"
                style={{
                  maxHeight: "440px",
                  objectPosition: "center top",
                  transition: "transform 1.3s cubic-bezier(0.19,1,0.22,1)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to right, rgba(0,0,0,0.52) 0%, transparent 50%)",
                }}
              />
              <div className="absolute bottom-0 left-0 p-6 sm:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]">
                  Production · Couture
                </p>
                <h3 className="mt-2 font-serif text-3xl leading-tight text-white">
                  30 master artisans. <span className="italic">One standard.</span>
                </h3>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <CTABand />
    </PageShell>
  );
}
