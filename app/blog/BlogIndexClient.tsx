'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { Container } from '@/components/Container';
import { BlogPost } from '@/lib/blog';

// Dynamically import blog components to reduce initial bundle size
const BlogCard = dynamic(
  () => import('@/components/blog/BlogCard').then((mod) => ({ default: mod.BlogCard }))
);
const BlogListItem = dynamic(
  () => import('@/components/blog/BlogListItem').then((mod) => ({ default: mod.BlogListItem }))
);
const BlogSearch = dynamic(
  () => import('@/components/blog/BlogSearch').then((mod) => ({ default: mod.BlogSearch }))
);
const BlogFilters = dynamic(
  () => import('@/components/blog/BlogFilters').then((mod) => ({ default: mod.BlogFilters }))
);
const BlogSort = dynamic(
  () => import('@/components/blog/BlogSort').then((mod) => ({ default: mod.BlogSort }))
);
const BlogViewToggle = dynamic(
  () => import('@/components/blog/BlogViewToggle').then((mod) => ({ default: mod.BlogViewToggle }))
);
const BlogPagination = dynamic(
  () => import('@/components/blog/BlogPagination').then((mod) => ({ default: mod.BlogPagination }))
);

interface BlogIndexClientProps {
  initialPosts: BlogPost[];
  categories: string[];
}

export function BlogIndexClient({ initialPosts, categories }: BlogIndexClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = initialPosts;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
      );
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [initialPosts, searchQuery, sortBy]);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredAndSortedPosts.slice(start, end);
  }, [filteredAndSortedPosts, currentPage, pageSize]);

  const totalPages = Math.ceil(
    filteredAndSortedPosts.length / pageSize
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

  return (
    <Container>
      <div className="py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            HyreLog Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Insights on audit trails, security, compliance, and modern SaaS
            architecture.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Search and Sort Bar */}
            <div className="mb-6">
              <div className="mb-4">
                <BlogSearch value={searchQuery} onChange={setSearchQuery} />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <BlogSort value={sortBy} onChange={setSortBy} />
                <BlogViewToggle view={viewMode} onChange={setViewMode} />
              </div>
            </div>

            {/* Results count */}
            <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
              Showing {paginatedPosts.length} of {filteredAndSortedPosts.length} posts
            </div>

            {/* Blog Posts */}
            {paginatedPosts.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  No blog posts found. Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                    {paginatedPosts.map((post) => (
                      <BlogCard key={post.slug} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="mb-12 space-y-6">
                    {paginatedPosts.map((post) => (
                      <BlogListItem key={post.slug} post={post} />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <BlogPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    pageSize={pageSize}
                    onPageSizeChange={setPageSize}
                    totalPosts={filteredAndSortedPosts.length}
                  />
                )}
              </>
            )}
          </div>

          {/* Sidebar - Categories */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <BlogFilters categories={categories} />
            </div>
          </aside>
        </div>
      </div>
    </Container>
  );
}

