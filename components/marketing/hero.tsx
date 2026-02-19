"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/marketing/logo";
import { ProductMock } from "@/components/marketing/product-mock";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-background py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-12 lg:gap-16">
          <div className="w-full max-w-xl text-center">
            <div className="mb-8 flex justify-center">
              <Logo size="lg" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Immutable audit trails for modern SaaS.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
              Pass enterprise security reviews with tamper-evident, region-aware audit logging.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="text-base">
                <Link href="/book-demo">Book a demo</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link href="/security">See security</Link>
              </Button>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              Typical integration: &lt; 1 day · Region controls · Auditor-ready exports
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <span className="rounded-full border bg-card px-4 py-2 text-sm text-muted-foreground">
                Supports SOC2-aligned environments
              </span>
              <span className="rounded-full border bg-card px-4 py-2 text-sm text-muted-foreground">
                GDPR / data residency controls
              </span>
              <span className="rounded-full border bg-card px-4 py-2 text-sm text-muted-foreground">
                Tamper-evident integrity proofs
              </span>
            </div>
          </div>
          <div className="w-full max-w-md">
            <ProductMock />
          </div>
        </div>
      </div>
    </section>
  );
}
