'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface BlogFiltersProps {
  categories: string[];
  selectedCategory?: string;
}

export function BlogFilters({ categories, selectedCategory }: BlogFiltersProps) {
  const searchParams = useSearchParams();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
        Categories
      </h3>
      <div className="space-y-2">
        <Link
          href="/blog"
          className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
            !selectedCategory
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          }`}
        >
          All Posts
        </Link>
        {categories.map((category) => {
          const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
          const isSelected = selectedCategory?.toLowerCase().replace(/\s+/g, '-') === categorySlug;
          return (
            <Link
              key={category}
              href={`/blog/categories/${categorySlug}`}
              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                isSelected
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              {category}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

