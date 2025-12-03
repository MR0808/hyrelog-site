import type { Metadata } from 'next';
import { BlogIndexClient } from './BlogIndexClient';
import { SiteStructuredData } from '@/components/SiteStructuredData';
import { getAllBlogPosts, getAllCategories } from '@/lib/blog';
import { siteMetadata } from '@/lib/siteMetadata';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on audit trails, security, compliance, and modern SaaS architecture. Learn about immutable logging, hash chains, SOC 2, ISO 27001, GDPR, and more.',
  alternates: {
    canonical: `${siteMetadata.siteUrl}/blog`,
  },
  openGraph: {
    title: 'HyreLog Blog',
    description:
      'Insights on audit trails, security, compliance, and modern SaaS architecture.',
    url: `${siteMetadata.siteUrl}/blog`,
    siteName: siteMetadata.openGraph.siteName,
    type: 'website',
  },
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getAllBlogPosts(),
    getAllCategories(),
  ]);

  return (
    <>
      <SiteStructuredData currentPath="/blog" />
      <BlogIndexClient initialPosts={posts} categories={categories} />
    </>
  );
}

