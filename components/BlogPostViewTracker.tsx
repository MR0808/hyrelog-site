'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

interface BlogPostViewTrackerProps {
  slug: string;
  title: string;
}

export function BlogPostViewTracker({ slug, title }: BlogPostViewTrackerProps) {
  useEffect(() => {
    // Track blog post view on mount
    analytics.trackBlogPostView(slug, title);
  }, [slug, title]);

  return null;
}

