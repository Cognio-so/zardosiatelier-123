import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Feather } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { listPublishedPosts } from "@/lib/emdash-blog.server";

export const Route = createFileRoute("/blog")({
  loader: () => listPublishedPosts({ data: { page: 1 } }),
  head: () => ({
    meta: [
      { title: "The Journal | Zardosi Atelier" },
      {
        name: "description",
        content:
          "Stories of hand embroidery, couture craft, and the artisans behind every Zardosi Atelier creation.",
      },
      { property: "og:title", content: "The Journal | Zardosi Atelier" },
      { property: "og:url", content: "https://www.zardosiatelier.com/blog" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.zardosiatelier.com/blog" }],
  }),
  component: BlogIndexPage,
});

function formatDate(value: string | null) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function BlogIndexPage() {
  const result = Route.useLoaderData();

  return (
    <SiteShell>
      <main className="journal-page">
        <header className="journal-masthead">
          <div className="journal-masthead__thread" aria-hidden="true" />
          <div className="journal-shell journal-masthead__inner">
            <p className="journal-kicker">Notes from the atelier</p>
            <h1>The Journal</h1>
            <p className="journal-deck">
              The craft, people, and precise handwork behind couture embroidery.
            </p>
          </div>
        </header>

        <section className="journal-shell journal-list" aria-labelledby="journal-latest">
          <div className="journal-section-heading">
            <h2 id="journal-latest">Latest stories</h2>
            <span>
              {result.posts.length ? `${result.posts.length} articles` : "From our workrooms"}
            </span>
          </div>

          {result.stale && (
            <p className="journal-notice">
              Showing the latest saved edition while the journal reconnects.
            </p>
          )}

          {result.status === "ok" && result.posts.length > 0 ? (
            <div className="journal-grid">
              {result.posts.map((post, index) => (
                <article
                  className={`journal-card ${index === 0 ? "journal-card--feature" : ""}`}
                  key={post.id}
                >
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="journal-card__image-link"
                  >
                    {post.image ? (
                      <img
                        src={post.image.src}
                        alt={post.image.alt}
                        width={post.image.width}
                        height={post.image.height}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    ) : (
                      <span className="journal-card__placeholder">
                        <Feather aria-hidden="true" />
                      </span>
                    )}
                  </Link>
                  <div className="journal-card__body">
                    <p className="journal-card__meta">
                      {formatDate(post.publishedAt)}
                      {post.author ? ` · ${post.author}` : ""}
                    </p>
                    <h3>
                      <Link to="/blog/$slug" params={{ slug: post.slug }}>
                        {post.title}
                      </Link>
                    </h3>
                    {post.excerpt && <p className="journal-card__excerpt">{post.excerpt}</p>}
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="journal-card__read"
                    >
                      Read story <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="journal-empty">
              <Feather aria-hidden="true" />
              <h2>
                {result.status === "unavailable"
                  ? "The journal is briefly unavailable."
                  : "The first story is being stitched."}
              </h2>
              <p>
                {result.status === "unavailable"
                  ? "Please return in a few minutes. The rest of the atelier remains open."
                  : "New notes on craft, couture, and hand embroidery will appear here soon."}
              </p>
              <Link to="/portfolio">Explore our portfolio</Link>
            </div>
          )}
        </section>
      </main>
    </SiteShell>
  );
}
