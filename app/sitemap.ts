import type { MetadataRoute } from "next";
import { getBlogSlugs } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

const STATIC_PATHS = [
  "",
  "/product",
  "/security",
  "/pricing",
  "/blog",
  "/contact",
  "/book-demo",
  "/terms",
  "/privacy",
  "/compare/datadog",
  "/compare/cloudwatch",
  "/resources/soc2-audit-trail-checklist",
  "/resources/download",
  "/newsletter/confirm",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getBlogSlugs();
  const blogEntries = blogSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticEntries = STATIC_PATHS.map((path) => ({
    url: path ? `${SITE_URL}${path}` : SITE_URL,
    lastModified: new Date(),
    changeFrequency: (path === "" ? "weekly" : path === "/blog" ? "daily" : "monthly") as "daily" | "weekly" | "monthly" | "yearly",
    priority: path === "" ? 1 : path === "/blog" ? 0.9 : 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
