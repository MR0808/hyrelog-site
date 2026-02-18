import type { Metadata } from "next";
import Link from "next/link";
import { BookDemoForm } from "./book-demo-form";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Book a demo",
  description: "Schedule a demo of HyreLog — compliance-grade audit logging for modern SaaS.",
  path: "/book-demo",
});

export default function BookDemoPage() {
  return (
    <div className="py-16 md:py-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-xl">
          <h1 className="text-3xl font-bold tracking-tight">Book a demo</h1>
          <p className="mt-4 text-muted-foreground">
            Tell us a bit about your team and we&apos;ll get in touch to schedule a walkthrough.
          </p>
          <BookDemoForm />
          <p className="mt-8 text-sm text-muted-foreground">
            <Link href="/contact" className="underline hover:no-underline">
              Prefer to email? Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
