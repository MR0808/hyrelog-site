'use client';

import { useEffect, useMemo, useState } from 'react';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogListItem } from '@/components/blog/BlogListItem';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { BlogFilters } from '@/components/blog/BlogFilters';
import { BlogSort } from '@/components/blog/BlogSort';
import { BlogViewToggle } from '@/components/blog/BlogViewToggle';
import { BlogPagination } from '@/components/blog/BlogPagination';
import { Container } from '@/components/Container';
import { BlogPost } from '@/lib/blog';

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

        {/* Filters and Search */}
        <div className="mb-8 grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <div className="mb-4">
              <BlogSearch value={searchQuery} onChange={setSearchQuery} />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <BlogSort value={sortBy} onChange={setSortBy} />
              <BlogViewToggle view={viewMode} onChange={setViewMode} />
            </div>
          </div>
          <div className="lg:col-span-1">
            <BlogFilters categories={categories} />
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
              <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
    </Container>
  );
}

