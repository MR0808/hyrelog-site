# Analytics & Event Tracking Implementation

This document outlines all the analytics tracking that has been implemented across the HyreLog site.

## ✅ What's Implemented

### 1. GDPR Cookie Consent Banner
- **Component**: `components/CookieConsent.tsx`
- **Features**:
  - Shows banner on first visit
  - Accept/Reject options
  - Stores consent in cookie (365 days)
  - Only loads GA4 if consent is given
  - IP anonymization enabled

### 2. Google Analytics 4 Integration
- **Component**: `components/GoogleAnalytics.tsx`
- **Features**:
  - Only loads if consent is given
  - IP anonymization (`anonymize_ip: true`)
  - Automatic page view tracking
  - Route change tracking

### 3. Event Tracking Utilities
- **File**: `lib/analytics.ts`
- **All tracking functions check consent before tracking**

#### Available Tracking Functions:

1. **Button Clicks**
   ```typescript
   analytics.trackButtonClick(buttonName, location)
   ```
   - Tracks: Hero CTA buttons, FAQ links, About page CTAs

2. **Form Submissions**
   ```typescript
   analytics.trackFormSubmit(formName, success)
   ```
   - Tracks: Early Access Form (success/failure)

3. **Link Clicks**
   ```typescript
   analytics.trackLinkClick(linkText, destination)
   ```
   - Tracks: External links, internal navigation

4. **Blog Post Views**
   ```typescript
   analytics.trackBlogPostView(postSlug, postTitle)
   ```
   - Tracks: Every blog post view automatically

5. **Search Queries**
   ```typescript
   analytics.trackSearch(searchQuery, resultsCount)
   ```
   - Tracks: Blog search with debouncing (1 second delay)

6. **Newsletter Signups**
   ```typescript
   analytics.trackNewsletterSignup(source)
   ```
   - Available for future newsletter integration

7. **Early Access Signups**
   ```typescript
   analytics.trackEarlyAccessSignup()
   ```
   - Tracks: Successful early access form submissions

## 📍 Where Tracking Is Implemented

### Homepage (`app/page.tsx`)
- ✅ "Join Early Access" button (Hero section)
- ✅ "View Roadmap" button (Hero section)
- ✅ "View all FAQs" link
- ✅ Early Access Form submission (success/failure)

### About Page (`app/about/page.tsx`)
- ✅ "Join the early access list" CTA button

### Blog Index (`app/blog/BlogIndexClient.tsx`)
- ✅ Search queries (debounced, tracks after 1 second)
- ✅ Search results count

### Blog Posts (`app/blog/[slug]/page.tsx`)
- ✅ Blog post views (automatic on page load)
- ✅ Uses `BlogPostViewTracker` component

### Early Access Form (`components/EarlyAccessForm.tsx`)
- ✅ Form submission (success)
- ✅ Form submission (failure)
- ✅ Early access signup event

### Blog Search (`components/blog/BlogSearch.tsx`)
- ✅ Search queries with debouncing
- ✅ Results count tracking

## 🔒 Privacy & GDPR Compliance

### Cookie Consent
- Banner appears on first visit
- Consent stored in cookie (`hyrelog-cookie-consent`)
- Cookie expires after 365 days
- Users can accept or reject

### IP Anonymization
- Enabled by default: `anonymize_ip: true`
- Applied to all GA4 tracking

### Consent Checking
- All tracking functions check `hasConsent()` before tracking
- No tracking occurs if user rejects cookies
- GA4 script doesn't load if consent not given

## 🎯 Event Names in GA4

When viewing events in Google Analytics, you'll see:

- `button_click` - Button clicks with `button_name` and `location`
- `form_submit` - Form submissions with `form_name` and `success`
- `link_click` - Link clicks with `link_text` and `link_destination`
- `blog_post_view` - Blog views with `post_slug` and `post_title`
- `search` - Search queries with `search_term` and `results_count`
- `newsletter_signup` - Newsletter signups with `source`
- `early_access_signup` - Early access signups

## 📊 Viewing Events in Google Analytics

1. Go to Google Analytics → **Reports** → **Engagement** → **Events**
2. Events appear within 24-48 hours (or use Realtime for immediate view)
3. Click on an event to see parameters (button_name, location, etc.)

## 🧪 Testing

### Test Cookie Consent
1. Clear cookies or use incognito mode
2. Visit site - banner should appear
3. Click "Reject" - GA4 should not load
4. Reload page - banner should not appear (consent stored)
5. Clear cookies again
6. Click "Accept" - GA4 should load

### Test Event Tracking
1. Accept cookies
2. Open browser DevTools → Network tab
3. Filter by "collect" or "google-analytics"
4. Perform actions:
   - Click buttons
   - Submit forms
   - Search blog
   - View blog posts
5. Check Network tab for GA4 requests
6. Check Google Analytics Realtime → Events

## 🚀 Adding New Tracking

To add tracking to a new component:

```typescript
'use client';

import { analytics } from '@/lib/analytics';

export function MyComponent() {
  const handleClick = () => {
    analytics.trackButtonClick('My Button', '/my-page');
    // ... rest of handler
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

Or use the `TrackedLink` component:

```typescript
import { TrackedLink } from '@/components/TrackedLink';

<TrackedLink
  href="/somewhere"
  eventName="My Link"
  location="/current-page"
>
  Click here
</TrackedLink>
```

## 📝 Notes

- All tracking respects user consent
- No tracking occurs if consent is rejected
- IP addresses are anonymized
- Events are debounced where appropriate (search)
- Tracking is non-blocking (doesn't affect page performance)

---

**Last Updated**: January 2025
**Status**: Fully implemented and GDPR compliant

