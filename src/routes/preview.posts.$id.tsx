import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CalendarDays, Clock3, Eye } from "lucide-react";
import { PortableText } from "@/components/blog/PortableText";
import { SiteShell } from "@/components/site/SiteShell";
import { getPreviewPost } from "@/lib/emdash-preview.server";

export const Route = createFileRoute("/preview/posts/$id")({
  loader: async ({ params }) => {
    const result = await getPreviewPost({ data: { id: params.id } });
    if (result.status === "unauthorized" || result.status === "not-found") throw notFound();
    return result;
  },
  head: () => ({
    meta: [
      { title: "Post preview | Zardosi Atelier" },
      { name: "robots", content: "noindex,nofollow,noarchive" },
      { name: "referrer", content: "no-referrer" },
    ],
  }),
  component: PreviewPostPage,
});

function formatDate(value: string | null) {
  if (!value) return "Draft";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function readingTime(content: Array<{ children?: Array<{ text?: string }> }>) {
  const words = content
    .flatMap((block) => block.children || [])
    .map((span) => span.text || "")
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 210));
}

function PreviewPostPage() {
  const result = Route.useLoaderData();
  const post = result.post;

  if (!post) {
    return (
      <SiteShell>
        <main className="journal-page journal-error">
          <h1>Preview is temporarily unavailable.</h1>
          <p>Save the draft and try again in a moment.</p>
        </main>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <main className="journal-page journal-article">
        <div className="journal-preview-banner" role="status">
          <span>
            <Eye aria-hidden="true" /> Saved draft preview
          </span>
          <div>
            <a href={`/blog/${encodeURIComponent(post.slug)}`}>Open published page</a>
            <a href="/api/cms/preview/exit">Close preview</a>
          </div>
        </div>

        <header className="journal-article__header journal-shell">
          <Link to="/blog" className="journal-back">
            Journal
          </Link>
          <p className="journal-kicker">Saved draft</p>
          <h1>{post.title}</h1>
          {post.excerpt && <p className="journal-article__deck">{post.excerpt}</p>}
          <div className="journal-article__meta">
            <span>
              <CalendarDays aria-hidden="true" /> {formatDate(post.publishedAt)}
            </span>
            <span>
              <Clock3 aria-hidden="true" /> {readingTime(post.content)} min read
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

        <article className="journal-article__body journal-shell">
          <aside aria-label="Preview details">
            <span>Status</span>
            <strong>Saved draft</strong>
            <span>Words by</span>
            <strong>{post.author}</strong>
          </aside>
          <PortableText value={post.content} />
        </article>
      </main>
    </SiteShell>
  );
}
