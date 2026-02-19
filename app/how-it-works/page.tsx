import type { Metadata } from "next";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { JsonLd } from "@/components/seo/json-ld";
import {
  SITE_NAME,
  SITE_URL,
  breadcrumbJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import { HowItWorksEventSchema } from "@/components/marketing/how-it-works/event-schema";
import { HowItWorksFinalCta } from "@/components/marketing/how-it-works/final-cta";
import { HowItWorksHero } from "@/components/marketing/how-it-works/hero";
import { HowItWorksRegions } from "@/components/marketing/how-it-works/regions";
import { HowItWorksSecurityFaq } from "@/components/marketing/how-it-works/security-faq";
import { HowItWorksStepper } from "@/components/marketing/how-it-works/stepper";

const PATH = "/how-it-works";
const URL = `${SITE_URL}${PATH}`;
const TITLE = "How HyreLog works — Immutable, region-aware audit logging";
const DESCRIPTION =
  "Capture audit events via API/SDK, protect with tamper-evident integrity and residency controls, and prove compliance with auditor-ready exports.";
const OG_IMAGE = `${SITE_URL}/og-default.png`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: URL,
    languages: {
      "en-US": URL,
      "x-default": URL,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function HowItWorksPage() {
  const webPageLd = webPageJsonLd({
    title: TITLE,
    description: DESCRIPTION,
    path: PATH,
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "How it works", path: PATH },
  ]);

  return (
    <div>
      <JsonLd data={[webPageLd, breadcrumbLd]} />
      <HowItWorksHero />
      <HowItWorksStepper />
      <Separator />
      <HowItWorksEventSchema />
      <HowItWorksRegions />
      <HowItWorksSecurityFaq />
      <HowItWorksFinalCta />
      <section className="pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <p className="mx-auto max-w-3xl text-center text-sm text-muted-foreground">
            Explore implementation and controls in{" "}
            <Link href="/security" className="underline underline-offset-4">
              Security
            </Link>
            , view plans in{" "}
            <Link href="/pricing" className="underline underline-offset-4">
              Pricing
            </Link>
            , or{" "}
            <Link href="/contact" className="underline underline-offset-4">
              Contact
            </Link>{" "}
            us directly.
          </p>
        </div>
      </section>
    </div>
  );
}
