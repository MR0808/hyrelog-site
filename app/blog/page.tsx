import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { BlogSearchClient } from "@/components/marketing/blog-search-client";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Articles on audit logging, SOC 2, GDPR, tamper-evident trails, data residency, and compliance for modern SaaS.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div>
      <section className="border-b py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Blog</h1>
            <p className="mt-4 text-muted-foreground">
              Audit logging, compliance, and security for modern SaaS. Tamper-evident trails,
              SOC 2, GDPR, and data residency.
            </p>
            <BlogSearchClient posts={posts} tags={tags} />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          {posts.length === 0 ? (
            <p className="text-muted-foreground">No posts yet.</p>
          ) : (
            <BlogSearchClient posts={posts} tags={tags} />
          )}
        </div>
      </section>
    </div>
  );
}
