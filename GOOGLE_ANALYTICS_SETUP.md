# Google Analytics 4 Setup Guide

This guide will help you set up Google Analytics 4 (GA4) for your HyreLog site.

## ✅ What's Already Implemented

- Google Analytics component (`components/GoogleAnalytics.tsx`)
- Automatic page view tracking
- Custom event tracking utilities (`lib/analytics.ts`)
- Optimized script loading (afterInteractive strategy)
- Preconnect/DNS-prefetch for performance

## 📋 Step-by-Step Setup

### 1. Create a Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click **"Admin"** (gear icon) in the bottom left
4. In the **Property** column, click **"Create Property"**
5. Fill in:
   - Property name: `HyreLog`
   - Reporting time zone: Your timezone
   - Currency: Your currency
6. Click **"Next"** and fill in business information
7. Click **"Create"**

### 2. Get Your Measurement ID

1. After creating the property, you'll see **"Data Streams"**
2. Click **"Add stream"** → **"Web"**
3. Fill in:
   - Website URL: `https://hyrelog.com`
   - Stream name: `HyreLog Website`
4. Click **"Create stream"**
5. You'll see your **Measurement ID** (format: `G-XXXXXXXXXX`)
6. Copy this ID

### 3. Add Measurement ID to Your Environment Variables

Create a `.env.local` file in the root of your project (if it doesn't exist):

```bash
# .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Important**: Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### 4. Deploy and Verify

1. **Restart your development server**:
   ```bash
   npm run dev
   ```

2. **Visit your site** and check:
   - Open browser DevTools → Network tab
   - Filter by "gtag" or "google-analytics"
   - You should see requests to `googletagmanager.com`

3. **Verify in Google Analytics**:
   - Go to Google Analytics → **Reports** → **Realtime**
   - Visit your site
   - You should see yourself as an active user within 30 seconds

## 🎯 Using Custom Event Tracking

The site includes utility functions for tracking custom events. Import and use them like this:

```typescript
import { analytics } from '@/lib/analytics';

// Track button clicks
analytics.trackButtonClick('Join Early Access', '/homepage');

// Track form submissions
analytics.trackFormSubmit('Early Access Form', true);

// Track blog post views
analytics.trackBlogPostView('understanding-audit-trails', 'Understanding Audit Trails');

// Track search queries
analytics.trackSearch('audit trails', 15);

// Track newsletter signups
analytics.trackNewsletterSignup('footer');

// Track early access signups
analytics.trackEarlyAccessSignup();
```

## 📊 What Gets Tracked Automatically

- **Page views**: Automatically tracked on every route change
- **Page paths**: Full URL paths are tracked
- **User sessions**: Automatically handled by GA4

## 🔒 Privacy & Compliance

### GDPR Considerations

If you're serving users in the EU, you may need to:

1. **Add a cookie consent banner** (recommended)
2. **Only load GA4 after consent** (modify `GoogleAnalytics.tsx`)
3. **Anonymize IP addresses** (already configured in the script)

### IP Anonymization

The current setup includes IP anonymization. To enable it explicitly, you can modify the config:

```typescript
gtag('config', GA_MEASUREMENT_ID, {
  page_path: window.location.pathname,
  anonymize_ip: true, // Add this for GDPR compliance
});
```

## 🚀 Advanced Configuration

### Track Custom Events in Components

Example: Track when someone clicks "Join Early Access":

```typescript
'use client';

import { analytics } from '@/lib/analytics';

export function EarlyAccessButton() {
  const handleClick = () => {
    analytics.trackButtonClick('Join Early Access', '/homepage');
    // ... rest of your click handler
  };

  return (
    <button onClick={handleClick}>
      Join Early Access
    </button>
  );
}
```

### Track Blog Post Views

In your blog post page (`app/blog/[slug]/page.tsx`), you can add:

```typescript
'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

export function BlogPostViewTracker({ slug, title }: { slug: string; title: string }) {
  useEffect(() => {
    analytics.trackBlogPostView(slug, title);
  }, [slug, title]);

  return null;
}
```

## 🐛 Troubleshooting

### GA4 Not Tracking?

1. **Check environment variable**:
   - Ensure `.env.local` exists
   - Ensure `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
   - Restart your dev server after adding it

2. **Check browser console**:
   - Open DevTools → Console
   - Look for errors related to `gtag` or `google-analytics`

3. **Check Network tab**:
   - Filter by "gtag" or "google-analytics"
   - You should see requests to `googletagmanager.com`

4. **Verify Measurement ID format**:
   - Should start with `G-` followed by alphanumeric characters
   - Example: `G-ABC123XYZ`

### Events Not Showing in GA4?

- **Real-time reports**: Check Realtime → Events (may take a few minutes)
- **Standard reports**: Events appear in Reports → Engagement → Events (may take 24-48 hours)
- **Debug mode**: Use GA4 DebugView for real-time event debugging

## 📚 Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [GA4 Event Tracking](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Next.js Script Component](https://nextjs.org/docs/pages/api-reference/next/script)

## ✅ Checklist

- [ ] Created GA4 property
- [ ] Got Measurement ID
- [ ] Added `NEXT_PUBLIC_GA_MEASUREMENT_ID` to `.env.local`
- [ ] Restarted dev server
- [ ] Verified tracking in browser DevTools
- [ ] Verified in GA4 Realtime reports
- [ ] (Optional) Added custom event tracking
- [ ] (Optional) Set up cookie consent banner

---

**Note**: The site currently uses both Umami and Google Analytics. You can keep both or remove Umami if you prefer to use only GA4.

