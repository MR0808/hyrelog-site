'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/lib/blog';

interface BlogListItemProps {
  post: BlogPost;
}

export function BlogListItem({ post }: BlogListItemProps) {
  const router = useRouter();

  const handleCategoryClick = (e: React.MouseEvent, category: string) => {
    e.preventDefault();
    e.stopPropagation();
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    router.push(`/blog/categories/${categorySlug}`);
  };

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex gap-6 rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
    >
      <div className="relative hidden h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:block dark:bg-gray-800">
        <Image
          src={post.ogImage}
          alt={post.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="128px"
        />
      </div>
      <div className="flex-1">
        <div className="mb-3 flex flex-wrap gap-2">
          {post.categories.slice(0, 3).map((category) => (
            <button
              key={category}
              onClick={(e) => handleCategoryClick(e, category)}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {category}
            </button>
          ))}
        </div>
        <h3 className="mb-2 text-2xl font-semibold text-gray-900 transition-colors group-hover:text-gray-700 dark:text-white dark:group-hover:text-gray-300">
          {post.title}
        </h3>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          {post.description || post.excerpt}
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
          <span>{post.author}</span>
          <span>•</span>
          <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span>•</span>
          <span>{post.readingTime}</span>
        </div>
      </div>
    </Link>
  );
}

