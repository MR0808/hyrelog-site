import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getBlogSlugs, getRelatedPosts } from "@/lib/blog";
import { buildMetadata, blogPostingJsonLd } from "@/lib/seo";
import { MarkdownContent } from "@/components/marketing/markdown-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewsletterForm } from "@/components/marketing/newsletter-form";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return buildMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    path: `/blog/${slug}`,
    openGraph: {
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: post.frontmatter.author ? [post.frontmatter.author] : undefined,
    },
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);
  const jsonLd = blogPostingJsonLd({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    slug: post.slug,
    datePublished: post.frontmatter.date,
    author: post.frontmatter.author,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <header className="mb-10">
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ← Blog
              </Link>
              <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                {post.frontmatter.title}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                {post.frontmatter.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <time dateTime={post.frontmatter.date}>
                  {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>·</span>
                <span>{post.readingTimeMinutes} min read</span>
                {post.frontmatter.author && (
                  <>
                    <span>·</span>
                    <span>{post.frontmatter.author}</span>
                  </>
                )}
                {post.frontmatter.tags.length > 0 && (
                  <span className="ml-2 flex gap-1">
                    {post.frontmatter.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </span>
                )}
              </div>
            </header>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <MarkdownContent content={post.content} />
            </div>

            {related.length > 0 && (
              <aside className="mt-16 border-t pt-10">
                <h2 className="text-lg font-semibold">Related posts</h2>
                <ul className="mt-4 space-y-2">
                  {related.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="text-muted-foreground hover:text-foreground hover:underline"
                      >
                        {p.frontmatter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            <aside className="mt-16 rounded-lg border bg-muted/30 p-6">
              <h2 className="text-lg font-semibold">Get compliance tips in your inbox</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Subscribe for updates on audit logging and security reviews.
              </p>
              <NewsletterForm sourcePlacement="blog-post" />
            </aside>

            <div className="mt-12">
              <Button asChild variant="outline">
                <Link href="/blog">Back to blog</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
