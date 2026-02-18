import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pricing",
  description:
    "HyreLog pricing: transparent tiers, usage-based options, and enterprise plans for compliance-grade audit logging with immutable trails and multi-region residency.",
  path: "/pricing",
});

const tiers = [
  {
    name: "Starter",
    description: "For teams evaluating audit logging",
    price: "Contact us",
    features: [
      "Up to 100K events/month",
      "Single region",
      "7-day retention",
      "CSV/JSON export",
      "Email support",
    ],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Growth",
    description: "For scaling SaaS with compliance needs",
    price: "Usage-based",
    features: [
      "Higher event volumes",
      "Multi-region option",
      "Configurable retention",
      "Auditor-ready exports",
      "RBAC & webhooks",
      "Priority support",
    ],
    cta: "Book a demo",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "Custom requirements and SLAs",
    price: "Custom",
    features: [
      "Custom volumes and regions",
      "Dedicated support",
      "SSO / SAML",
      "Custom retention & archive",
      "Evidence packages",
      "SLA guarantees",
    ],
    cta: "Talk to us",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div>
      <section className="border-b py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Pricing</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Simple tiers with usage-based options. Enterprise plans for custom volumes,
              regions, and SLAs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={tier.highlighted ? "border-primary shadow-md" : ""}
              >
                <CardHeader>
                  {tier.highlighted && (
                    <span className="mb-2 inline-block text-xs font-medium text-primary">
                      Recommended
                    </span>
                  )}
                  <h2 className="text-xl font-semibold">{tier.name}</h2>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                  <p className="text-2xl font-bold">{tier.price}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="size-4 shrink-0 text-green-600 dark:text-green-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="w-full"
                    variant={tier.highlighted ? "default" : "outline"}
                  >
                    <Link href="/contact?ref=pricing">{tier.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/30 py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold">Usage-based pricing</h2>
            <p className="mt-4 text-muted-foreground">
              Beyond starter, pricing scales with event volume and retention. No surprise
              lock-in — we’ll work with you on volume and region requirements. Contact us for
              a quote.
            </p>
            <Button asChild className="mt-6">
              <Link href="/contact?ref=pricing">Get a quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
