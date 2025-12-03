import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { FaqItem } from "@/components/FaqItem";
import { SiteStructuredData } from "@/components/SiteStructuredData";
import { siteMetadata } from "@/lib/siteMetadata";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about HyreLog, the audit trail API for modern SaaS and enterprise systems.",
  alternates: {
    canonical: `${siteMetadata.siteUrl}/faq`,
  },
  openGraph: {
    title: "FAQ | HyreLog",
    description: "Frequently asked questions about HyreLog, the audit trail API for modern SaaS and enterprise systems.",
    url: `${siteMetadata.siteUrl}/faq`,
    siteName: siteMetadata.openGraph.siteName,
    type: "website",
  },
};

const faqs = [
  {
    question: "What is HyreLog?",
    answer:
      "HyreLog is a production-grade audit trail API. It accepts structured events from your applications, secures them with a hash-chained ledger, and makes them queryable for security, compliance, and product teams. Unlike traditional logging solutions, HyreLog focuses on business-level events (who changed what, when) and stores them immutably with cryptographic guarantees.",
  },
  {
    question: "Who should use HyreLog?",
    answer:
      "HyreLog is designed for SaaS companies, internal platform teams, and enterprise applications that need a trustworthy, centralised record of changes and access, especially when preparing for SOC 2, ISO 27001, or dealing with high-stakes data. If you need to prove what happened, when, and by whom, HyreLog can help.",
  },
  {
    question: "How does hash-chain immutability work in simple terms?",
    answer:
      "Each event stores a reference (hash) to the previous event, forming a chain. When a new event is added, it includes a cryptographic hash of the previous event. If someone tries to change or delete an event in the middle, the chain no longer validates because the hashes won't match. HyreLog uses this pattern to detect tampering and provide strong integrity guarantees. Think of it like a blockchain, but optimized for audit trails.",
  },
  {
    question: "Does HyreLog make my product 'SOC 2 compliant' on its own?",
    answer:
      "No. HyreLog is designed to support the evidence needs of SOC 2 and similar frameworks, but it doesn't make you compliant by itself. Compliance is a broader program that includes policies, procedures, risk assessments, and multiple technical controls. HyreLog is one building block in your broader security and compliance program, specifically, it helps you maintain and prove the integrity of your audit trail evidence.",
  },
  {
    question: "Where will my data be stored?",
    answer:
      "Initially, HyreLog will prioritise hosting in Australia, with plans to expand into additional regions over time so teams can keep data closer to their customers and meet regional regulatory expectations. We're committed to transparency about data location and will provide clear documentation about where your events are stored.",
  },
  {
    question: "Will there be on-prem or self-hosted options?",
    answer:
      "Self-hosted options are being considered for the future, but the initial focus is on building a reliable, scalable cloud service. If you have specific requirements for on-premises deployment, please reach out, we'd love to understand your needs as we plan future offerings.",
  },
  {
    question: "What will pricing look like?",
    answer:
      "Pricing details are still being finalised, but the plan is to offer predictable tiered plans based on event volume and features, with an accessible entry-level plan for smaller teams. We're committed to transparent, usage-based pricing that scales with your needs. Join the early access list to be notified when pricing is announced.",
  },
  {
    question: "How can I get involved as a design partner?",
    answer:
      "We're actively looking for design partners who can help shape HyreLog's direction. If you have a clear need for audit trails and are willing to provide feedback during early development, please join the early access list and mention your interest in design partnership. We'll reach out to discuss how we can work together.",
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <SiteStructuredData currentPath="/faq" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Everything you need to know about HyreLog
              </p>
            </div>
            <div className="space-y-0 rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
              {faqs.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

