'use client';

import { useEffect, useRef } from 'react';
import { analytics } from '@/lib/analytics';

interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
  resultsCount?: number;
}

export function BlogSearch({ value, onChange, resultsCount }: BlogSearchProps) {
  const previousValueRef = useRef(value);
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Track search after user stops typing (debounce)
    if (value && value !== previousValueRef.current && value.length > 2) {
      debounceTimerRef.current = setTimeout(() => {
        analytics.trackSearch(value, resultsCount || 0);
      }, 1000);
    }

    previousValueRef.current = value;

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [value, resultsCount]);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search blog posts..."
        className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-gray-600 dark:focus:ring-gray-600"
      />
    </div>
  );
}

