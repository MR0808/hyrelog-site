import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

interface MDXRendererProps {
  content: string;
}

export function MDXRenderer({ content }: MDXRendererProps) {
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 {...props} className="mb-6 mt-8 text-4xl font-bold text-gray-900 dark:text-white" />
          ),
          h2: ({ node, ...props }) => (
            <h2 {...props} className="mb-4 mt-8 text-3xl font-semibold text-gray-900 dark:text-white" />
          ),
          h3: ({ node, ...props }) => (
            <h3 {...props} className="mb-3 mt-6 text-2xl font-semibold text-gray-900 dark:text-white" />
          ),
          h4: ({ node, ...props }) => (
            <h4 {...props} className="mb-2 mt-4 text-xl font-semibold text-gray-900 dark:text-white" />
          ),
          p: ({ node, ...props }) => (
            <p {...props} className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300" />
          ),
          a: ({ node, ...props }) => (
            <a
              {...props}
              className="text-blue-600 underline transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            />
          ),
          ul: ({ node, ...props }) => (
            <ul {...props} className="mb-4 ml-6 list-disc space-y-2 text-gray-700 dark:text-gray-300" />
          ),
          ol: ({ node, ...props }) => (
            <ol {...props} className="mb-4 ml-6 list-decimal space-y-2 text-gray-700 dark:text-gray-300" />
          ),
          li: ({ node, ...props }) => (
            <li {...props} className="leading-relaxed" />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              {...props}
              className="my-4 border-l-4 border-gray-300 pl-4 italic text-gray-600 dark:border-gray-700 dark:text-gray-400"
            />
          ),
          code: ({ node, inline, ...props }: any) => {
            return inline ? (
              <code
                {...props}
                className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-gray-800 dark:bg-gray-800 dark:text-gray-200"
              />
            ) : (
              <code {...props} className="block rounded-lg bg-gray-100 p-4 text-sm dark:bg-gray-800" />
            );
          },
          pre: ({ node, ...props }) => (
            <pre {...props} className="mb-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800" />
          ),
          hr: ({ node, ...props }) => (
            <hr {...props} className="my-8 border-gray-300 dark:border-gray-700" />
          ),
          img: ({ node, ...props }: any) => (
            <img
              {...props}
              className="my-6 rounded-lg border border-gray-200 dark:border-gray-800"
              alt={props.alt || ''}
            />
          ),
          table: ({ node, ...props }) => (
            <div className="my-6 overflow-x-auto">
              <table
                {...props}
                className="min-w-full divide-y divide-gray-300 border border-gray-300 dark:divide-gray-700 dark:border-gray-700"
              />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead {...props} className="bg-gray-50 dark:bg-gray-800" />
          ),
          tbody: ({ node, ...props }) => (
            <tbody {...props} className="divide-y divide-gray-200 dark:divide-gray-700" />
          ),
          th: ({ node, ...props }) => (
            <th
              {...props}
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300"
            />
          ),
          td: ({ node, ...props }) => (
            <td {...props} className="whitespace-nowrap px-6 py-4 text-sm text-gray-700 dark:text-gray-300" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

