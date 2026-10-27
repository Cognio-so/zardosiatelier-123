import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PortableText } from "@/components/blog/PortableText";
import { getPublishedPost } from "@/lib/emdash-blog.server";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const result = await getPublishedPost({ data: { slug: params.slug } });
    if (result.status === "not-found") throw notFound();
    return result;
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post;
    const title =
      post?.seo.title || (post ? `${post.title} | Zardosi Atelier` : "Journal | Zardosi Atelier");
    const description =
      post?.seo.description || post?.excerpt || "A story from the Zardosi Atelier journal.";
    const canonical = post?.seo.canonical || `https://www.zardosiatelier.com/blog/${params.slug}`;
    const image =
      post?.seo.image || post?.image?.src || "https://www.zardosiatelier.com/icon-512.png";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: post?.seo.noIndex ? "noindex,nofollow" : "index,follow" },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonical },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: BlogPostPage,
});

function formatDate(value: string | null) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function readingTime(post: { content: Array<{ children?: Array<{ text?: string }> }> }) {
  const words = post.content
    .flatMap((block) => block.children || [])
    .map((span) => span.text || "")
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 210));
}

function BlogPostPage() {
  const result = Route.useLoaderData();
  const post = result.post;

  if (!post) {
    return (
      <SiteShell>
        <main className="journal-page journal-error">
          <h1>The journal is briefly unavailable.</h1>
          <p>Please return in a few minutes.</p>
          <Link to="/blog">Back to the journal</Link>
        </main>
      </SiteShell>
    );
  }

  const canonical = post.seo.canonical || `https://www.zardosiatelier.com/blog/${post.slug}`;
  const description = post.seo.description || post.excerpt;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image: post.seo.image || post.image?.src,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Zardosi Atelier",
      logo: { "@type": "ImageObject", url: "https://www.zardosiatelier.com/icon-512.png" },
    },
    mainEntityOfPage: canonical,
  };

  return (
    <SiteShell>
      <main className="journal-page journal-article">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <header className="journal-article__header journal-shell">
          <Link to="/blog" className="journal-back">
            <ArrowLeft aria-hidden="true" /> Journal
          </Link>
          <p className="journal-kicker">From the atelier</p>
          <h1>{post.title}</h1>
          {post.excerpt && <p className="journal-article__deck">{post.excerpt}</p>}
          <div className="journal-article__meta">
            <span>
              <CalendarDays aria-hidden="true" /> {formatDate(post.publishedAt)}
            </span>
            <span>
              <Clock3 aria-hidden="true" /> {readingTime(post)} min read
            </span>
            <span>By {post.author}</span>
          </div>
        </header>

        {post.image && (
          <figure className="journal-article__hero journal-shell">
            <img
              src={post.image.src}
              alt={post.image.alt}
              width={post.image.width}
              height={post.image.height}
            />
          </figure>
        )}

        {result.stale && (
          <p className="journal-notice journal-shell">
            Showing the latest saved edition while the journal reconnects.
          </p>
        )}

        <article className="journal-article__body journal-shell">
          <aside aria-label="Article details">
            <span>Published</span>
            <strong>{formatDate(post.publishedAt)}</strong>
            <span>Words by</span>
            <strong>{post.author}</strong>
          </aside>
          <PortableText value={post.content} />
        </article>

        <footer className="journal-article__footer journal-shell">
          <p>Continue exploring the living traditions of hand embroidery.</p>
          <Link to="/blog">All journal stories</Link>
          <Link to="/portfolio">View the portfolio</Link>
        </footer>
      </main>
    </SiteShell>
  );
}
