import type { Metadata } from "next";

const SITE_URL = process.env.SITE_URL ?? "https://hyrelog.com";
const SITE_NAME = "HyreLog";
const DEFAULT_DESCRIPTION =
  "HyreLog is compliance-grade audit logging infrastructure. Immutable, tamper-evident audit trails with multi-region data residency and auditor-ready exports for SOC2, GDPR, and enterprise security reviews.";

export interface SeoConfig {
  title: string;
  description?: string;
  path?: string;
  canonical?: string;
  noIndex?: boolean;
  openGraph?: {
    title?: string;
    description?: string;
    type?: "website" | "article";
    publishedTime?: string;
    authors?: string[];
    images?: string[];
  };
}

export function buildMetadata(config: SeoConfig): Metadata {
  const title = config.title === SITE_NAME ? config.title : `${config.title} | ${SITE_NAME}`;
  const description = config.description ?? DEFAULT_DESCRIPTION;
  const canonical = config.canonical ?? (config.path ? `${SITE_URL}${config.path}` : SITE_URL);
  const ogImage = `${SITE_URL}/og-default.png`;

  return {
    title,
    description,
    robots: config.noIndex ? { index: false, follow: false } : undefined,
    alternates: {
      canonical: { url: canonical },
      languages: {
        "en-US": canonical,
        "x-default": canonical,
      },
    },
    openGraph: {
      title: config.openGraph?.title ?? title,
      description: config.openGraph?.description ?? description,
      url: canonical,
      siteName: SITE_NAME,
      type: config.openGraph?.type ?? "website",
      publishedTime: config.openGraph?.publishedTime,
      authors: config.openGraph?.authors,
      images: config.openGraph?.images ?? [ogImage],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: config.openGraph?.title ?? title,
      description: config.openGraph?.description ?? description,
      images: config.openGraph?.images ?? [ogImage],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/hyrelog-logo-dark.png`,
    description: DEFAULT_DESCRIPTION,
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cloud",
    description: DEFAULT_DESCRIPTION,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function blogPostingJsonLd(params: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  const url = `${SITE_URL}/blog/${params.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: params.title,
    description: params.description,
    url,
    datePublished: params.datePublished,
    dateModified: params.dateModified ?? params.datePublished,
    author: params.author
      ? { "@type": "Person", name: params.author }
      : { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/hyrelog-logo-dark.png` },
    },
  };
}

export function webPageJsonLd(params: {
  title: string;
  description?: string;
  path?: string;
}) {
  const url = params.path ? `${SITE_URL}${params.path}` : SITE_URL;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: params.title,
    description: params.description ?? DEFAULT_DESCRIPTION,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function breadcrumbJsonLd(
  items: Array<{
    name: string;
    path?: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path ?? ""}`,
    })),
  };
}

export { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION };
