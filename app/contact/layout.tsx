import type { Metadata } from "next";
import { siteMetadata } from "@/lib/siteMetadata";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the HyreLog team about early access, partnerships, or questions.",
  alternates: {
    canonical: `${siteMetadata.siteUrl}/contact`,
  },
  openGraph: {
    title: "Contact | HyreLog",
    description: "Get in touch with the HyreLog team about early access, partnerships, or questions.",
    url: `${siteMetadata.siteUrl}/contact`,
    siteName: siteMetadata.openGraph.siteName,
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

