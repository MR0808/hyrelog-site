import Link from "next/link";
import {
  Shield,
  Globe,
  FileCheck,
  Lock,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    title: "Instrument once",
    description: "Send events from your app via API or SDK. We handle ingestion, ordering, and integrity.",
    icon: Zap,
  },
  {
    title: "Store with integrity",
    description: "Every event is hashed and chained. Tampering is cryptographically detectable.",
    icon: Lock,
  },
  {
    title: "Export for auditors",
    description: "Region-specific retention, RBAC, and one-click exports in formats auditors expect.",
    icon: FileCheck,
  },
];

const features = [
  { title: "Tamper-evident logs", desc: "Hash-chain immutability", icon: Lock },
  { title: "Multi-region residency", desc: "Data stays where you need it", icon: Globe },
  { title: "Retention & archive", desc: "Hot storage and long-term archive", icon: FileCheck },
  { title: "Auditor-ready exports", desc: "CSV, JSON, and evidence packages", icon: FileCheck },
  { title: "RBAC & access control", desc: "Who can see what", icon: Shield },
  { title: "Webhooks", desc: "Real-time event streaming", icon: Zap },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-muted/50 to-background py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              Compliance-grade audit logging
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Immutable audit trails for modern SaaS.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              HyreLog is an audit logging platform that makes every critical action provable — who
              did what, when, and where — with cryptographic integrity and regional controls.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="text-base">
                <Link href="/book-demo">Book a demo</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link href="/product">See how it works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-b py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Built for teams under the microscope
            </h2>
            <p className="mt-4 text-muted-foreground">
              B2B SaaS going upmarket — fintech, health, HR, security, GovTech — facing SOC 2,
              GDPR, and security review pressure. When auditors ask &ldquo;how do you prove
              immutability?&rdquo; you need answers, not spreadsheets.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b bg-muted/30 py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <h2 className="text-center text-2xl font-semibold md:text-3xl">How it works</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
            Three steps from your app to auditor-ready evidence.
          </p>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <Card key={step.title}>
                <CardHeader>
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <step.icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="border-b py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <h2 className="text-center text-2xl font-semibold md:text-3xl">
            Everything you need for compliance-grade audit logs
          </h2>
          <div className="mx-auto mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
                  <f.icon className="size-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security review ready */}
      <section className="border-b bg-muted/30 py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Security review ready
            </h2>
            <p className="mt-4 text-muted-foreground">
              Designed for SOC 2, GDPR, and ISO-aligned environments. We give you the controls and
              evidence structure auditors expect — without the cost of building it yourself.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm">
                <CheckCircle2 className="size-4 text-green-600 dark:text-green-400" />
                Tamper-evident audit trail
              </div>
              <div className="flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm">
                <CheckCircle2 className="size-4 text-green-600 dark:text-green-400" />
                Data residency controls
              </div>
              <div className="flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm">
                <CheckCircle2 className="size-4 text-green-600 dark:text-green-400" />
                Retention & export
              </div>
            </div>
            <p className="mt-6">
              <Link href="/security" className="text-sm font-medium underline hover:no-underline">
                View Security
              </Link>
              {" · "}
              <Link href="/product" className="text-sm font-medium underline hover:no-underline">
                Integration & product
              </Link>
            </p>
            <Button asChild className="mt-4" variant="outline">
              <Link href="/security">View Security</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lead magnet CTA */}
      <section className="border-b py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Free: SOC 2 Audit Trail Checklist
            </h2>
            <p className="mt-2 text-muted-foreground">
              Prepare for security reviews with our practical checklist.
            </p>
            <Button asChild className="mt-4">
              <Link href="/resources/soc2-audit-trail-checklist">Get the checklist</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials placeholder */}
      <section className="border-b py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <h2 className="text-center text-2xl font-semibold md:text-3xl">
            Trusted by teams who take compliance seriously
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
            (Testimonials and case studies coming soon.)
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-8 text-center shadow-sm md:p-12">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Pass enterprise security reviews with tamper-evident logs.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Talk to us about your audit and residency requirements.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/book-demo">
                  Book a demo
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing">See pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
