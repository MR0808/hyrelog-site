import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';

export interface BlogPost {
  title: string;
  subtitle?: string;
  description: string;
  date: string;
  updatedAt?: string;
  author: string;
  authorUrl?: string;
  categories: string[];
  tags?: string[];
  readingTime: string;
  readingTimeMinutes?: number;
  slug: string;
  content: string;
  ogImage: string;
  ogImageAlt?: string;
  canonicalUrl?: string;
  excerpt?: string;
  draft?: boolean;
}

const blogDirectory = path.join(process.cwd(), 'content', 'blog');

// Extract plain text from MDX for search indexing
async function extractPlainText(mdxContent: string): Promise<string> {
  const processor = remark().use(remarkGfm);
  const tree = processor.parse(mdxContent);
  let text = '';

  visit(tree, (node: any) => {
    if (node.type === 'text' || node.type === 'inlineCode') {
      text += node.value + ' ';
    }
    if (node.type === 'code') {
      text += node.value + ' ';
    }
  });

  return text.trim();
}

// Get all blog post slugs
export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const entries = fs.readdirSync(blogDirectory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

// Get a single blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(blogDirectory, slug, 'index.mdx');

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Auto-generate slug from folder name if not provided
  const postSlug = (data.slug as string) || slug;

  // Calculate reading time
  const readingTimeResult = readingTime(content);
  const readingTimeMinutes = Math.ceil(readingTimeResult.minutes);
  const readingTimeStr = `${readingTimeMinutes} min read`;

  // Extract plain text for search
  const plainText = await extractPlainText(content);

  // Filter out draft posts unless explicitly requested
  const isDraft = (data.draft as boolean) ?? false;

  return {
    title: (data.title as string) || '',
    subtitle: data.subtitle as string | undefined,
    description: (data.description as string) || '',
    date: (data.date as string) || new Date().toISOString().split('T')[0],
    updatedAt: data.updatedAt as string | undefined,
    author: (data.author as string) || 'Mark Rosenberg',
    authorUrl: data.authorUrl as string | undefined,
    categories: (data.categories as string[]) || [],
    tags: (data.tags as string[]) || [],
    readingTime: readingTimeStr,
    readingTimeMinutes,
    slug: postSlug,
    content: plainText, // Store plain text for search
    ogImage: (data.ogImage as string) || `/og/blog-${postSlug}.png`,
    ogImageAlt: data.ogImageAlt as string | undefined,
    canonicalUrl: data.canonicalUrl as string | undefined,
    excerpt: data.excerpt as string | undefined,
    draft: isDraft,
  };
}

// Get all blog posts
export async function getAllBlogPosts(includeDrafts: boolean = false): Promise<BlogPost[]> {
  const slugs = getAllBlogSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getBlogPost(slug);
      return post;
    })
  );

  return posts
    .filter((post): post is BlogPost => {
      if (post === null) return false;
      if (!includeDrafts && post.draft) return false;
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Newest first
    });
}

// Get blog posts by category
export async function getBlogPostsByCategory(
  category: string
): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter((post) =>
    post.categories.some(
      (cat) => cat.toLowerCase() === category.toLowerCase()
    )
  );
}

// Get related posts (by category, excluding current slug)
export async function getRelatedPosts(
  currentSlug: string,
  categories: string[],
  limit: number = 3
): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts
    .filter(
      (post) =>
        post.slug !== currentSlug &&
        post.categories.some((cat) => categories.includes(cat))
    )
    .slice(0, limit);
}

// Get all unique categories
export async function getAllCategories(): Promise<string[]> {
  const allPosts = await getAllBlogPosts();
  const categorySet = new Set<string>();
  allPosts.forEach((post) => {
    post.categories.forEach((cat) => categorySet.add(cat));
  });
  return Array.from(categorySet).sort();
}

// Get raw MDX content for rendering
export function getBlogPostMDX(slug: string): { content: string; data: any } | null {
  const fullPath = path.join(blogDirectory, slug, 'index.mdx');

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    content,
    data: {
      ...data,
      slug: data.slug || slug,
    },
  };
}

