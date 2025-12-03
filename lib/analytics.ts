/**
 * Google Analytics 4 utility functions
 * Use these functions to track custom events throughout your application
 */

import { hasConsent } from './cookieConsent';

// Track custom events (only if consent is given)
export const trackEvent = (
  eventName: string,
  eventParams?: {
    [key: string]: string | number | boolean | undefined;
  }
) => {
  // Only track if consent is given
  if (!hasConsent()) {
    return;
  }

  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', eventName, eventParams);
};

// Common event tracking functions
export const analytics = {
  // Track button clicks
  trackButtonClick: (buttonName: string, location?: string) => {
    trackEvent('button_click', {
      button_name: buttonName,
      location: location || window.location.pathname,
    });
  },

  // Track form submissions
  trackFormSubmit: (formName: string, success: boolean) => {
    trackEvent('form_submit', {
      form_name: formName,
      success: success.toString(),
    });
  },

  // Track link clicks
  trackLinkClick: (linkText: string, destination: string) => {
    trackEvent('link_click', {
      link_text: linkText,
      link_destination: destination,
    });
  },

  // Track blog post views
  trackBlogPostView: (postSlug: string, postTitle: string) => {
    trackEvent('blog_post_view', {
      post_slug: postSlug,
      post_title: postTitle,
    });
  },

  // Track search queries
  trackSearch: (searchQuery: string, resultsCount: number) => {
    trackEvent('search', {
      search_term: searchQuery,
      results_count: resultsCount,
    });
  },

  // Track newsletter signups
  trackNewsletterSignup: (source: string) => {
    trackEvent('newsletter_signup', {
      source: source,
    });
  },

  // Track early access signups
  trackEarlyAccessSignup: () => {
    trackEvent('early_access_signup', {
      timestamp: new Date().toISOString(),
    });
  },
};

