import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageShell, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { getPortfolioItems } from "@/lib/portfolio-admin";
import { categoryBySlug, portfolioCategories } from "@/lib/portfolio-categories";

export const Route = createFileRoute("/portfolio/$category")({
  head: ({ params }) => {
    const category = categoryBySlug(params.category);
    return {
      meta: [
        { title: `${category?.name ?? "Portfolio"} - Zardosi Atelier` },
        {
          name: "description",
          content: category?.description ?? "Explore Zardosi Atelier portfolio work by category.",
        },
      ],
    };
  },
  component: PortfolioCategoryPage,
});

function PortfolioCategoryPage() {
  const { category: slug } = Route.useParams();
  const category = categoryBySlug(slug) ?? portfolioCategories[0];
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["portfolio", slug],
    queryFn: () => getPortfolioItems(),
    staleTime: 0,
  });
  const filtered = items.filter((item) => item.categorySlug === slug);
  const heroImage = filtered[0]?.url;

  return (
    <PageShell>
      <section className="relative min-h-[50vh] overflow-hidden bg-[#120e0b] pt-24 text-white">
        {heroImage && <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(18,14,11,0.97),rgba(18,14,11,0.78))]" />
        <div className="relative z-10 mx-auto max-w-[1100px] px-6 py-20 text-center">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#C9A84C]">
              Portfolio Category
            </span>
            <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-7xl">{category.name}</h1>
            <p className="mx-auto mt-6 max-w-[62ch] text-base font-medium leading-8 text-white/72">
              {category.description}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="luxury-silk-bg py-12 sm:py-16">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
          <Reveal className="mb-8 text-center">
            <span className="eyebrow">Gallery</span>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl">{category.name} Work</h2>
            <p className="mt-3 text-sm font-medium text-ink-soft">
              {isLoading ? "Loading images..." : `${filtered.length} design${filtered.length !== 1 ? "s" : ""} in this collection`}
            </p>
          </Reveal>

          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] animate-pulse bg-[#E9DFD1]" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="border border-gold/20 bg-ivory px-6 py-16 text-center">
              <h3 className="font-serif text-3xl">No images in this category yet.</h3>
              <p className="mt-3 text-sm text-ink-soft">Upload one in Admin - Portfolio and choose {category.name}.</p>
            </div>
          ) : (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {filtered.map((item, index) => (
                <Reveal key={item.id} delay={Math.min(index * 40, 240)} className="mb-4 break-inside-avoid">
                  <a href={`/portfolio/item/${item.id}`} className="group block overflow-hidden bg-[#EDE5D8]">
                    <img src={item.url} alt={item.caption} loading="lazy" className="h-auto w-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="bg-[#1A100B] px-4 py-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]">{item.tag}</p>
                      <h3 className="mt-1 font-serif text-xl text-ivory">{item.caption}</h3>
                    </div>
                  </a>
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