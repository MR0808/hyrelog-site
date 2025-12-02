import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { MDXRenderer } from '@/components/blog/MDXRenderer';
import { ArticleTOC } from '@/components/blog/ArticleTOC';
import { BlogCard } from '@/components/blog/BlogCard';
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

  const url = `${siteMetadata.siteUrl}/blog/${post.slug}`;

  return {
    title: `HyreLog Blog — ${post.title}`,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: `${siteMetadata.siteUrl}${post.ogImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: `${siteMetadata.siteUrl}${post.ogImage}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'HyreLog',
      logo: {
        '@type': 'ImageObject',
        url: `${siteMetadata.siteUrl}/HyreLogLogoLight.png`,
      },
    },
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
                  {post.categories.map((category) => (
                    <Link
                      key={category}
                      href={`/blog/categories/${encodeURIComponent(category.toLowerCase())}`}
                      className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
                <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
                  {post.title}
                </h1>
                <p className="mb-6 text-xl text-gray-600 dark:text-gray-400">
                  {post.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                  <span>{post.author}</span>
                  <span>•</span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>
              </header>

              {/* Featured Image */}
              <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <Image
                  src={post.ogImage}
                  alt={post.title}
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

