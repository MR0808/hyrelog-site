import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { BlogCard } from '@/components/blog/BlogCard';

// Dynamically import heavy components to reduce initial bundle size
const MDXRenderer = dynamic(
  () => import('@/components/blog/MDXRenderer').then((mod) => ({ default: mod.MDXRenderer })),
  {
    loading: () => <div className="animate-pulse">Loading content...</div>,
  }
);

const ArticleTOC = dynamic(
  () => import('@/components/blog/ArticleTOC').then((mod) => ({ default: mod.ArticleTOC }))
);
import {
  getBlogPost,
  getBlogPostMDX,
  getRelatedPosts,
  getAllBlogSlugs,
} from '@/lib/blog';
import { siteMetadata } from '@/lib/siteMetadata';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const url = post.canonicalUrl || `${siteMetadata.siteUrl}/blog/${post.slug}`;

  return {
    title: `HyreLog Blog — ${post.title}`,
    description: post.description,
    keywords: post.tags?.join(', ') || post.categories.join(', '),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      section: post.categories[0],
      tags: post.tags || post.categories,
      images: [
        {
          url: `${siteMetadata.siteUrl}${post.ogImage}`,
          width: 1200,
          height: 630,
          alt: post.ogImageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`${siteMetadata.siteUrl}${post.ogImage}`],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  const mdxData = getBlogPostMDX(slug);

  if (!post || !mdxData) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.categories, 3);

  // Enhanced JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    alternativeHeadline: post.subtitle,
    description: post.description,
    image: {
      '@type': 'ImageObject',
      url: `${siteMetadata.siteUrl}${post.ogImage}`,
      width: 1200,
      height: 630,
      alt: post.ogImageAlt || post.title,
    },
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      url: post.authorUrl || `${siteMetadata.siteUrl}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'HyreLog',
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}/HyreLogLogoLight.png`,
        width: 120,
        height: 40,
      },
      url: siteMetadata.siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.canonicalUrl || `${siteMetadata.siteUrl}/blog/${post.slug}`,
    },
    articleSection: post.categories.join(', '),
    keywords: post.tags?.join(', ') || post.categories.join(', '),
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readingTimeMinutes || 5}M`,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    ...(post.categories.length > 0 && {
      about: post.categories.map((category) => ({
        '@type': 'Thing',
        name: category,
      })),
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <div className="py-12">
          {/* Breadcrumbs */}
          <nav className="mb-8 text-sm text-gray-600 dark:text-gray-400">
            <ol className="flex items-center gap-2">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href="/blog"
                  className="transition-colors hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Blog
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900 dark:text-gray-200">{post.title}</li>
            </ol>
          </nav>

          <div className="grid gap-12 lg:grid-cols-4">
            {/* Main Content */}
            <article className="lg:col-span-3">
              {/* Header */}
              <header className="mb-8">
                <div className="mb-4 flex flex-wrap gap-2">
                  {post.categories.map((category) => {
                    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <Link
                        key={category}
                        href={`/blog/categories/${categorySlug}`}
                        className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        {category}
                      </Link>
                    );
                  })}
                </div>
                <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
                  {post.title}
                </h1>
                {post.subtitle && (
                  <p className="mb-4 text-2xl font-medium text-gray-700 dark:text-gray-300">
                    {post.subtitle}
                  </p>
                )}
                <p className="mb-6 text-xl text-gray-600 dark:text-gray-400">
                  {post.description}
                </p>
                <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                  <span>{post.author}</span>
                  <span>•</span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {post.updatedAt && (
                    <>
                      <span>•</span>
                      <time dateTime={post.updatedAt}>
                        Updated {new Date(post.updatedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </>
                  )}
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {/* Featured Image */}
              <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <Image
                  src={post.ogImage}
                  alt={post.ogImageAlt || post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                />
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <MDXRenderer content={mdxData.content} />
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <ArticleTOC content={mdxData.content} />
            </aside>
          </div>

          {/* CTA Section */}
          <section className="mt-16 rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-8 dark:border-gray-800 dark:from-gray-900 dark:to-gray-800">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Ready to solve your audit trail challenges?
              </h2>
              <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
                HyreLog provides production-grade audit trails with cryptographic integrity,
                comprehensive compliance support, and developer-friendly APIs. Stop relying on
                ad-hoc logs and fragile exports—get an immutable source of truth for your
                security and compliance needs.
              </p>
              <Link
                href="/#early-access"
                className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
              >
                Join the Early Access Waitlist
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </section>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 border-t border-gray-200 pt-12 dark:border-gray-800">
              <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
                Related Posts
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </section>
          )}
        </div>
      </Container>
    </>
  );
}

