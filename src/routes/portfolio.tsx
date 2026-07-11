import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageShell, PageHero, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { Lens } from "@/registry/magicui/lens";
import { getPortfolioItems, type PortfolioItem } from "@/lib/portfolio-admin";
import portfolioHero from "@/assets/portfolio-hero.webp";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio - Couture Embroidery Archive | Zardosi Atelier" },
      {
        name: "description",
        content:
          "Selected couture embroidery work pulled directly from the Zardosi Atelier admin portfolio.",
      },
      { property: "og:title", content: "Portfolio - Zardosi Atelier" },
      { property: "og:description", content: "A curated archive of luxury hand embroidery work." },
      { property: "og:url", content: "/portfolio" },
      { property: "og:image", content: portfolioHero },
    ],
    links: [{ rel: "canonical", href: "https://www.zardosiatelier.com/portfolio" }],
  }),
  component: PortfolioPage,
});

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <a
      href={`/portfolio/item/${item.id}`}
      className="group relative block cursor-pointer overflow-hidden bg-[#FAF7F2]"
      style={{
        border: "1px solid rgba(212,175,55,0.18)",
        transition:
          "border-color 0.7s cubic-bezier(0.4,0,0.2,1), box-shadow 0.7s cubic-bezier(0.4,0,0.2,1)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(212,175,55,0.72)";
        el.style.boxShadow = "0 0 0 1px rgba(212,175,55,0.38), 0 8px 40px rgba(0,0,0,0.22)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(212,175,55,0.18)";
        el.style.boxShadow = "none";
      }}
    >
      <Lens zoomFactor={2.2} lensSize={140} isStatic={false}>
        <img
          src={item.url}
          alt={item.caption}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full object-cover transition duration-[1400ms] group-hover:scale-[1.07]"
        />
      </Lens>
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to top, rgba(8,5,3,0.88) 0%, rgba(8,5,3,0.30) 40%, transparent 100%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A84C]">{item.tag}</p>
        <h2 className="mt-2 font-serif text-3xl leading-tight text-[#F5F0E8]">{item.caption}</h2>
      </div>
    </a>
  );
}

function PortfolioPage() {
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["portfolio"],
    queryFn: () => getPortfolioItems(),
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  return (
    <PageShell>
      <PageHero
        eyebrow="Atelier - Archive"
        title="Selected"
        italic="work."
        description="A curated archive of recent commissions - couture, bridal, accessories and atelier studies."
        image={portfolioHero}
      />
      <section className="luxury-silk-bg py-10 sm:py-12">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#C9A84C]">
                Admin Portfolio
              </span>
              <div style={{ height: "1px", flex: 1, background: "rgba(201,168,76,0.2)" }} />
              <span className="text-[10px] text-[#9A8878]">
                {isLoading ? "Loading archive..." : `${items.length} item${items.length !== 1 ? "s" : ""}`}
              </span>
            </div>
          </Reveal>

          {isLoading ? (
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="mb-6 h-80 break-inside-avoid animate-pulse bg-[#E9DFD1]" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="border border-gold/20 bg-ivory px-6 py-16 text-center">
              <span className="eyebrow">Portfolio Empty</span>
              <h2 className="mt-3 font-serif text-4xl">No portfolio items yet.</h2>
              <p className="mx-auto mt-3 max-w-[52ch] text-sm font-medium text-ink-soft">
                Add or seed images in the Admin Panel and they will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
              {items.map((item, i) => (
                <Reveal key={item.id} delay={(i % 3) * 100} className="mb-6 break-inside-avoid">
                  <PortfolioCard item={item} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
      <CTABand />
    </PageShell>
  );
}