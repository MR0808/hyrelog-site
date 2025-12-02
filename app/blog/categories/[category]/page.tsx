import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogListItem } from '@/components/blog/BlogListItem';
import { getBlogPostsByCategory, getAllCategories } from '@/lib/blog';
import { BlogIndexClient } from '../BlogIndexClient';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    category: category.toLowerCase(),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const posts = await getBlogPostsByCategory(category);
  const allCategories = await getAllCategories();

  if (posts.length === 0) {
    notFound();
  }

  const categoryName = posts[0].categories.find(
    (cat) => cat.toLowerCase() === category.toLowerCase()
  ) || category;

  return (
    <Container>
      <div className="py-12">
        {/* Header */}
        <div className="mb-12">
          <nav className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            <Link
              href="/blog"
              className="transition-colors hover:text-gray-900 dark:hover:text-gray-200"
            >
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-gray-200">{categoryName}</span>
          </nav>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            {categoryName}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
          </p>
        </div>

        {/* Posts */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </Container>
  );
}

