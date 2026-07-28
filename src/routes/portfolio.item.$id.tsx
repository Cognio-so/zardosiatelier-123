import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageShell, CTABand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { getPortfolioItems } from "@/lib/portfolio-admin";
import { categoryForTag } from "@/lib/portfolio-categories";

export const Route = createFileRoute("/portfolio/item/$id")({
  head: () => ({
    meta: [{ title: "Zardosi Atelier | Luxury Hand Embroidery & Export Atelier" }],
  }),
  component: PortfolioItemPage,
});

function PortfolioItemPage() {
  const { id } = Route.useParams();
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["portfolio", "item", id],
    queryFn: () => getPortfolioItems(),
    staleTime: 0,
  });
  const item = items.find((entry) => entry.id === id);
  const category = item ? categoryForTag(item.tag) : null;
  const related = item
    ? items.filter((entry) => entry.id !== item.id && entry.categorySlug === item.categorySlug).slice(0, 6)
    : [];

  return (
    <PageShell>
      <section className="luxury-silk-bg pt-32 pb-12 sm:pt-36 sm:pb-16">
        <div className="mx-auto max-w-[1220px] px-5 sm:px-6 lg:px-10">
          {isLoading ? (
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="aspect-[4/3] animate-pulse bg-[#E9DFD1]" />
              <div className="h-80 animate-pulse bg-[#EFE6DA]" />
            </div>
          ) : !item ? (
            <div className="border border-gold/20 bg-ivory px-6 py-16 text-center">
              <span className="eyebrow">Not Found</span>
              <h1 className="mt-3 font-serif text-4xl">This portfolio item is no longer available.</h1>
              <a href="/portfolio" className="gold-link mt-6 inline-block text-[10px] uppercase tracking-[0.3em]">
                Back to Portfolio
              </a>
            </div>
          ) : (
            <>
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <Reveal>
                  <div className="overflow-hidden border border-gold/20 bg-[#EDE5D8]">
                    <img src={item.url} alt={item.caption} className="h-auto w-full object-cover" />
                  </div>
                </Reveal>
                <Reveal delay={100}>
                  <div className="border border-gold/20 bg-ivory p-6 sm:p-8">
                    <span className="eyebrow">{item.tag}</span>
                    <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">{item.caption}</h1>
                    <p className="mt-5 text-sm font-medium leading-7 text-ink-soft">
                      Uploaded {new Date(item.uploadedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    {category && (
                      <a href={`/portfolio/${category.slug}`} className="gold-link mt-8 inline-block text-[10px] uppercase tracking-[0.3em]">
                        View all {category.name}
                      </a>
                    )}
                  </div>
                </Reveal>
              </div>

              {related.length > 0 && (
                <section className="mt-14">
                  <Reveal>
                    <span className="eyebrow">Related Work</span>
                    <h2 className="mt-2 font-serif text-4xl">More from this category.</h2>
                  </Reveal>
                  <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {related.map((relatedItem) => (
                      <a key={relatedItem.id} href={`/portfolio/item/${relatedItem.id}`} className="group block overflow-hidden bg-[#EDE5D8]">
                        <img src={relatedItem.url} alt={relatedItem.caption} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
                        <div className="bg-[#1A100B] px-4 py-4">
                          <p className="font-serif text-xl text-ivory">{relatedItem.caption}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </section>
      <CTABand />
    </PageShell>
  );
}