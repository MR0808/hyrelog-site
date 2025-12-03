'use client';

import { useState, useEffect } from 'react';
import { getConsent, setConsent } from '@/lib/cookieConsent';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been given/rejected
    const consent = getConsent();
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => {
        setShowBanner(true);
        // Trigger animation
        setTimeout(() => setIsVisible(true), 10);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    setConsent('accepted');
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
    // Reload page to initialize GA4
    window.location.reload();
  };

  const handleReject = () => {
    setConsent('rejected');
    setIsVisible(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  if (!showBanner) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white shadow-2xl transition-all duration-300 dark:bg-gray-900 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="mx-auto max-w-7xl border-t border-gray-200 px-4 py-4 dark:border-gray-800 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
              Cookie Consent
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We use cookies to analyze site usage and improve your experience. Your IP address will
              be anonymized. You can accept or reject analytics cookies.{' '}
              <a
                href="/privacy"
                className="font-medium text-gray-900 underline dark:text-gray-100"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more
              </a>
            </p>
          </div>
          <div className="flex w-full gap-3 sm:w-auto">
            <button
              onClick={handleReject}
              className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="cursor-pointer rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

