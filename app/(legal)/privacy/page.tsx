import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "HyreLog's commitment to privacy and data protection.",
};

export default function PrivacyPage() {
  return (
    <Section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Privacy Policy
          </h1>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300">
              HyreLog is committed to protecting your privacy and handling your data responsibly. We understand that privacy and data protection are fundamental concerns, especially when dealing with audit trail data.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              A detailed privacy policy will be published closer to launch. This policy will cover:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
              <li>What information we collect and how we use it</li>
              <li>How we store and protect your data</li>
              <li>Your rights regarding your personal information</li>
              <li>Data retention and deletion policies</li>
              <li>Third-party services and data sharing</li>
              <li>Compliance with privacy regulations (GDPR, CCPA, etc.)</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              If you have questions about privacy or data handling, please{" "}
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

