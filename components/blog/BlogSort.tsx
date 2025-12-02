'use client';

interface BlogSortProps {
  value: string;
  onChange: (value: string) => void;
}

const sortOptions = [
  { value: 'date-desc', label: 'Date (Newest → Oldest)' },
  { value: 'date-asc', label: 'Date (Oldest → Newest)' },
  { value: 'title-asc', label: 'Title (A → Z)' },
  { value: 'title-desc', label: 'Title (Z → A)' },
];

export function BlogSort({ value, onChange }: BlogSortProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Sort:
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-gray-600 dark:focus:ring-gray-600"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

