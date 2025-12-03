"use client";

import { useState } from "react";

export function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 px-6 dark:border-gray-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex w-full items-center justify-between py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="pr-4 font-medium text-gray-900 dark:text-gray-100">
          {question}
        </span>
        <svg
          className={`h-5 w-5 shrink-0 text-gray-500 transition-transform dark:text-gray-400 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {answer}
        </div>
      )}
    </div>
  );
}

