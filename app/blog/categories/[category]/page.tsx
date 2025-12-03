import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogListItem } from '@/components/blog/BlogListItem';
import { getAllBlogPosts, getAllCategories } from '@/lib/blog';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  // Convert URL slug back to category name format (hyphens to spaces)
  const categorySlug = category.replace(/-/g, ' ');
  
  // Find posts by matching category (case-insensitive, handle spaces/hyphens)
  const allPosts = await getAllBlogPosts();
  const posts = allPosts.filter((post) =>
    post.categories.some((cat) => {
      const normalizedCat = cat.toLowerCase().replace(/\s+/g, ' ');
      const normalizedSlug = categorySlug.toLowerCase();
      return normalizedCat === normalizedSlug;
    })
  );
  
  const allCategories = await getAllCategories();

  if (posts.length === 0) {
    notFound();
  }

  // Find the actual category name from the first post
  const categoryName = posts[0].categories.find(
    (cat) => cat.toLowerCase().replace(/\s+/g, ' ') === categorySlug.toLowerCase()
  ) || categorySlug;

  return (
    <Container>
      <div className="py-12">
        {/* Back to Blog Link */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="mb-8">
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
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>

          {/* Sidebar - Categories */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Categories
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/blog"
                    className="block rounded-lg px-3 py-2 text-sm transition-colors text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    All Posts
                  </Link>
                  {allCategories.map((cat) => {
                    const catSlug = cat.toLowerCase().replace(/\s+/g, '-');
                    const isSelected = catSlug === category.toLowerCase();
                    return (
                      <Link
                        key={cat}
                        href={`/blog/categories/${catSlug}`}
                        className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                          isSelected
                            ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                        }`}
                      >
                        {cat}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Container>
  );
}

