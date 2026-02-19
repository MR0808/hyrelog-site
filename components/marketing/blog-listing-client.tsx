"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { type BlogPost } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, List, ChevronLeft, ChevronRight, PanelLeftClose, PanelLeft } from "lucide-react";

const PER_PAGE_GRID = 9;
const PER_PAGE_LIST = 10;

type ViewMode = "grid" | "list";
type SortKey = "date-desc" | "date-asc" | "title-asc" | "title-desc";

interface BlogListingClientProps {
  posts: BlogPost[];
  tags: string[];
  categories: string[];
}

export function BlogListingClient({
  posts: initialPosts,
  tags,
  categories,
}: BlogListingClientProps) {
  const searchParams = useSearchParams();
  const tagFromUrl = searchParams.get("tag");
  const categoryFromUrl = searchParams.get("category");

  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [sort, setSort] = useState<SortKey>("date-desc");
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const selectedTag = tagFromUrl ?? null;
  const selectedCategory = categoryFromUrl ?? null;

  const filtered = useMemo(() => {
    let list = initialPosts;
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.frontmatter.title.toLowerCase().includes(q) ||
          p.frontmatter.description.toLowerCase().includes(q) ||
          p.frontmatter.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.frontmatter.categories.some((c) => c.toLowerCase().includes(q))
      );
    }
    if (selectedTag) {
      list = list.filter((p) => p.frontmatter.tags.includes(selectedTag));
    }
    if (selectedCategory) {
      list = list.filter((p) => p.frontmatter.categories.includes(selectedCategory));
    }
    const sorted = [...list].sort((a, b) => {
      switch (sort) {
        case "date-desc":
          return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
        case "date-asc":
          return new Date(a.frontmatter.date).getTime() - new Date(b.frontmatter.date).getTime();
        case "title-asc":
          return a.frontmatter.title.localeCompare(b.frontmatter.title);
        case "title-desc":
          return b.frontmatter.title.localeCompare(a.frontmatter.title);
        default:
          return 0;
      }
    });
    return sorted;
  }, [initialPosts, query, selectedTag, selectedCategory, sort]);

  const perPage = viewMode === "grid" ? PER_PAGE_GRID : PER_PAGE_LIST;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  const sidebar = (
    <aside
      className={cn(
        "shrink-0 border-r pr-6 transition-[width] ease-in-out",
        sidebarOpen ? "w-56" : "w-0 overflow-hidden pr-0 opacity-0"
      )}
    >
      <nav className="space-y-6" aria-label="Blog filters">
        {categories.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground">Categories</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/blog"
                  className={cn(
                    "block rounded-md px-2 py-1.5 text-sm transition-colors",
                    !selectedCategory && !selectedTag
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  All
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/blog?category=${encodeURIComponent(cat)}`}
                    className={cn(
                      "block rounded-md px-2 py-1.5 text-sm transition-colors",
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {tags.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground">Tags</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/blog"
                  className={cn(
                    "block rounded-md px-2 py-1.5 text-sm transition-colors",
                    !selectedTag && !selectedCategory
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  All
                </Link>
              </li>
              {tags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className={cn(
                      "block rounded-md px-2 py-1.5 text-sm transition-colors",
                      selectedTag === tag
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </aside>
  );

  return (
    <div className="mt-8 flex gap-6">
      {sidebar}

      <div className="min-w-0 flex-1 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setSidebarOpen((o) => !o)}
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {sidebarOpen ? (
                <PanelLeftClose className="size-4" />
              ) : (
                <PanelLeft className="size-4" />
              )}
            </Button>
            <Input
              type="search"
              placeholder="Search posts..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="max-w-sm"
              aria-label="Search blog posts"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort:</span>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as SortKey);
                setPage(1);
              }}
              className="rounded-md border bg-background px-2 py-1.5 text-sm"
              aria-label="Sort posts"
            >
              <option value="date-desc">Newest first</option>
              <option value="date-asc">Oldest first</option>
              <option value="title-asc">Title A–Z</option>
              <option value="title-desc">Title Z–A</option>
            </select>
            <div className="flex rounded-md border">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn("rounded-r-none", viewMode === "list" && "bg-muted")}
                onClick={() => {
                  setViewMode("list");
                  setPage(1);
                }}
                aria-label="List view"
              >
                <List className="size-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn("rounded-l-none", viewMode === "grid" && "bg-muted")}
                onClick={() => {
                  setViewMode("grid");
                  setPage(1);
                }}
                aria-label="Grid view"
              >
                <LayoutGrid className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t pt-8">
          {paginated.length === 0 ? (
            <p className="text-muted-foreground">No posts match your filters.</p>
          ) : viewMode === "list" ? (
            <ul className="space-y-8">
              {paginated.map((post) => (
                <li key={post.slug} className="border-b pb-8 last:border-0 last:pb-0">
                  <BlogCard
                    post={post}
                    variant="list"
                    onTagClick={() => setPage(1)}
                    onCategoryClick={() => setPage(1)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid grid-cols-3 gap-6 list-none p-0 m-0">
              {paginated.map((post) => (
                <li key={post.slug}>
                  <BlogCard
                    post={post}
                    variant="grid"
                    onTagClick={() => setPage(1)}
                    onCategoryClick={() => setPage(1)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {totalPages > 1 && (
          <nav
            className="flex items-center justify-center gap-2 border-t pt-8"
            aria-label="Pagination"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </Button>
          </nav>
        )}
      </div>
    </div>
  );
}

function BlogCard({
  post,
  variant,
  onTagClick,
  onCategoryClick,
}: {
  post: BlogPost;
  variant: "list" | "grid";
  onTagClick: () => void;
  onCategoryClick: () => void;
}) {
  const image = post.frontmatter.image ?? post.frontmatter.ogImage;
  const postLink = `/blog/${post.slug}`;

  const meta = (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 text-muted-foreground",
        variant === "grid" ? "mt-3 text-xs" : "mt-3 text-sm"
      )}
    >
      <time dateTime={post.frontmatter.date}>
        {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: variant === "grid" ? "short" : "long",
          day: "numeric",
        })}
      </time>
      <span>·</span>
      <span>{post.readingTimeMinutes} min read</span>
      {(post.frontmatter.categories.length > 0 || post.frontmatter.tags.length > 0) && (
        <>
          <span>·</span>
          <span className="flex flex-wrap gap-1">
            {post.frontmatter.categories.slice(0, variant === "grid" ? 1 : 2).map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${encodeURIComponent(cat)}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onCategoryClick();
                }}
              >
                <Badge variant="secondary" className="text-xs hover:bg-secondary/80">
                  {cat}
                </Badge>
              </Link>
            ))}
            {post.frontmatter.tags.slice(0, variant === "grid" ? 2 : 3).map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick();
                }}
              >
                <Badge variant="outline" className="text-xs hover:bg-muted">
                  {tag}
                </Badge>
              </Link>
            ))}
          </span>
        </>
      )}
    </div>
  );

  if (variant === "grid") {
    return (
      <article className="group overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md">
        <Link href={postLink} className="block">
          {image && (
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
              <Image
                src={image}
                alt=""
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          )}
          <div className="p-4">
            <h2 className="font-semibold tracking-tight text-foreground group-hover:underline line-clamp-2">
              {post.frontmatter.title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {post.frontmatter.description}
            </p>
          </div>
        </Link>
        <div className="px-4 pb-4">{meta}</div>
      </article>
    );
  }

  return (
    <article className="flex gap-4">
      {image && (
        <Link href={postLink} className="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg bg-muted group block">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover transition-opacity group-hover:opacity-90"
            sizes="160px"
          />
        </Link>
      )}
      <div className="min-w-0 flex-1">
        <Link href={postLink} className="group block">
          <h2 className="text-xl font-semibold tracking-tight text-foreground group-hover:underline md:text-2xl">
            {post.frontmatter.title}
          </h2>
          <p className="mt-2 text-muted-foreground line-clamp-2">
            {post.frontmatter.description}
          </p>
        </Link>
        {meta}
      </div>
    </article>
  );
}
