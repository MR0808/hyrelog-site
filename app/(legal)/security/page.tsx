import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { siteMetadata } from "@/lib/siteMetadata";

export const metadata: Metadata = {
  title: "Security",
  description: "HyreLog's security practices and commitment to protecting your audit trail data.",
  alternates: {
    canonical: `${siteMetadata.siteUrl}/security`,
  },
  openGraph: {
    title: "Security | HyreLog",
    description: "HyreLog's security practices and commitment to protecting your audit trail data.",
    url: `${siteMetadata.siteUrl}/security`,
    siteName: siteMetadata.openGraph.siteName,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SecurityPage() {
  return (
    <Section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Security
          </h1>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300">
              Security is a first-class concern at HyreLog. We&apos;re building a platform that you can trust with your most critical audit trail data.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Our security practices include (and will expand as we approach launch):
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Encryption in transit:</strong> All data transmitted to and from HyreLog is encrypted using TLS 1.3.
              </li>
              <li>
                <strong>Encryption at rest:</strong> All stored data is encrypted using industry-standard encryption.
              </li>
              <li>
                <strong>Principle of least privilege:</strong> Access controls are designed to grant only the minimum permissions necessary.
              </li>
              <li>
                <strong>Regional data centers:</strong> Data is stored in region-specific data centers to meet regulatory and performance requirements.
              </li>
              <li>
                <strong>Hash-chain integrity:</strong> The cryptographic hash-chain ensures that any tampering with audit events is immediately detectable.
              </li>
              <li>
                <strong>Regular security audits:</strong> We plan to conduct regular security assessments and penetration testing.
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              As we build out the platform, we&apos;ll publish more detailed security documentation, including our SOC 2 Type II certification plans, security architecture, and incident response procedures.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              If you have security questions or want to report a security issue, please{" "}
              <a href="/contact" className="text-gray-900 underline dark:text-gray-100">
                contact us
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

