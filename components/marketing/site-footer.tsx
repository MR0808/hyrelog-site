import Link from "next/link";
import { NewsletterForm } from "@/components/marketing/newsletter-form";

const footerLinks = {
  product: [
    { href: "/product", label: "Product" },
    { href: "/security", label: "Security" },
    { href: "/pricing", label: "Pricing" },
  ],
  resources: [
    { href: "/blog", label: "Blog" },
    { href: "/book-demo", label: "Book a demo" },
    { href: "/resources/soc2-audit-trail-checklist", label: "SOC 2 Checklist" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="font-semibold text-lg">
              HyreLog
            </Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              Compliance-grade audit logging. Immutable trails, multi-region residency, auditor-ready exports.
            </p>
            <div className="mt-6">
              <h4 className="font-medium text-sm mb-2">Newsletter</h4>
              <NewsletterForm sourcePlacement="footer" />
            </div>
          </div>
          <div>
            <h4 className="font-medium text-sm">Product</h4>
            <ul className="mt-3 space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm">Resources & Legal</h4>
            <ul className="mt-3 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} HyreLog. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
