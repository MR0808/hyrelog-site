import type { Metadata } from "next";
import Link from "next/link";
import { LeadMagnetForm } from "./lead-magnet-form";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "SOC 2 Audit Trail Checklist",
  description:
    "Download our free SOC 2 audit trail checklist to prepare for security reviews and compliance.",
  path: "/resources/soc2-audit-trail-checklist",
});

const MAGNET = "soc2-audit-trail-checklist";

export default function Soc2ChecklistPage() {
  const webPageLd = webPageJsonLd({
    title: "SOC 2 Audit Trail Checklist",
    description:
      "Download the SOC 2 audit trail checklist for security reviews and compliance readiness.",
    path: "/resources/soc2-audit-trail-checklist",
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "SOC 2 Audit Trail Checklist", path: "/resources/soc2-audit-trail-checklist" },
  ]);

  return (
    <div className="py-16 md:py-20">
      <JsonLd data={[webPageLd, breadcrumbLd]} />
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-xl">
          <h1 className="text-3xl font-bold tracking-tight">
            SOC 2 Audit Trail Checklist
          </h1>
          <p className="mt-4 text-muted-foreground">
            A practical checklist to prepare your audit trail for SOC 2 and security reviews.
            Get the PDF delivered to your inbox.
          </p>
          <LeadMagnetForm magnet={MAGNET} />
          <p className="mt-6 text-sm text-muted-foreground">
            <Link href="/security" className="underline hover:no-underline">
              Learn how HyreLog supports SOC 2 audit trails
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
