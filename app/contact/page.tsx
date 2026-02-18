import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/marketing/contact-form";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with HyreLog. Book a demo or ask about compliance-grade audit logging, immutable audit trails, and multi-region data residency.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div>
      <section className="border-b py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-xl">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Contact us</h1>
            <p className="mt-4 text-muted-foreground">
              Book a demo or ask about audit logging for your stack. We’ll get back to you
              quickly.
            </p>
            <Suspense fallback={<div className="mt-8 h-64 animate-pulse rounded-md bg-muted" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
