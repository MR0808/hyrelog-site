"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/product", label: "Product" },
  { href: "/security", label: "Security" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const logoSrc =
    mounted && resolvedTheme === "dark"
      ? "/brand/hyrelog-logo-light.png"
      : "/brand/hyrelog-logo-dark.png";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-foreground text-background font-bold text-sm">
            {!logoError && (
              <Image
                src={logoSrc}
                alt=""
                width={120}
                height={32}
                className="object-contain p-1.5 size-full"
                unoptimized
                onError={() => setLogoError(true)}
              />
            )}
            {logoError && <span className="text-sm font-bold">H</span>}
          </span>
          <span className="font-semibold text-lg">HyreLog</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/book-demo">Book a demo</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t md:hidden bg-background">
          <nav className="container flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <Link href="/book-demo" onClick={() => setOpen(false)}>
                Book a demo
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
