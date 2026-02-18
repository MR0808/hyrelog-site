import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  author?: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  readingTimeMinutes: number;
}

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR);
  const slugs = new Set<string>();
  for (const f of files) {
    if (f.endsWith(".mdx")) slugs.add(f.replace(/\.mdx$/, ""));
    if (f.endsWith(".md")) slugs.add(f.replace(/\.md$/, ""));
  }
  return Array.from(slugs);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const mdPath = path.join(CONTENT_DIR, `${slug}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!fullPath) return null;
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogFrontmatter;
  if (!frontmatter.published) return null;
  return {
    slug,
    frontmatter: {
      ...frontmatter,
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    },
    content,
    readingTimeMinutes: estimateReadingTime(content),
  };
}

export function getAllPosts(): BlogPost[] {
  const slugs = getBlogSlugs();
  const posts = slugs
    .map((s) => getPostBySlug(s))
    .filter((p): p is BlogPost => p !== null);
  return posts.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === currentSlug);
  if (!current) return all.slice(0, limit);
  const currentTags = new Set(current.frontmatter.tags);
  const scored = all
    .filter((p) => p.slug !== currentSlug)
    .map((p) => {
      const tagOverlap = p.frontmatter.tags.filter((t) => currentTags.has(t)).length;
      return { post: p, score: tagOverlap };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const set = new Set<string>();
  posts.forEach((p) => p.frontmatter.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}
