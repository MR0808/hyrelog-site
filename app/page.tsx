import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { FeatureCard } from '@/components/FeatureCard';
import { FaqItem } from '@/components/FaqItem';
import { EarlyAccessForm } from '@/components/EarlyAccessForm';
import { SiteStructuredData } from '@/components/SiteStructuredData';
import { TrackedLink } from '@/components/TrackedLink';
import { siteMetadata } from '@/lib/siteMetadata';

export const metadata: Metadata = {
    title: 'HyreLog | Secure. Immutable. Auditable.',
    description: siteMetadata.description,
    alternates: {
        canonical: siteMetadata.siteUrl
    },
    openGraph: {
        title: siteMetadata.title,
        description: siteMetadata.description,
        url: siteMetadata.siteUrl,
        siteName: siteMetadata.openGraph.siteName,
        type: 'website',
        locale: 'en_AU'
    },
    twitter: {
        card: 'summary_large_image',
        title: siteMetadata.title,
        description: siteMetadata.description,
        creator: siteMetadata.twitter.handle
    }
};

function ProductMock() {
    return (
        <div className="relative rounded-lg border border-gray-200 bg-gray-900 p-4 shadow-2xl dark:border-gray-800">
            <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex gap-4">
                <div className="w-32 space-y-2">
                    <div className="rounded bg-gray-800 px-3 py-2 text-xs text-gray-400">
                        Workspaces
                    </div>
                    <div className="rounded bg-gray-800 px-3 py-2 text-xs text-gray-400">
                        Projects
                    </div>
                    <div className="rounded bg-blue-600 px-3 py-2 text-xs text-white">
                        Events
                    </div>
                    <div className="rounded bg-gray-800 px-3 py-2 text-xs text-gray-400">
                        API Keys
                    </div>
                </div>
                <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between border-b border-gray-800 pb-2">
                        <div className="text-xs font-medium text-gray-300">
                            Events
                        </div>
                        <div className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-400">
                            Immutable chain verified ✓
                        </div>
                    </div>
                    <div className="space-y-2">
                        {[
                            {
                                time: '10:23:45',
                                actor: 'user@example.com',
                                action: 'login',
                                resource: 'auth',
                                hash: 'a3f2...'
                            },
                            {
                                time: '10:24:12',
                                actor: 'admin@example.com',
                                action: 'update',
                                resource: 'settings',
                                hash: 'b7e1...'
                            },
                            {
                                time: '10:25:03',
                                actor: 'user@example.com',
                                action: 'export',
                                resource: 'data',
                                hash: 'c9d4...'
                            }
                        ].map((event, i) => (
                            <div
                                key={i}
                                className="grid grid-cols-5 gap-2 text-xs text-gray-400"
                            >
                                <div>{event.time}</div>
                                <div className="truncate">{event.actor}</div>
                                <div>{event.action}</div>
                                <div>{event.resource}</div>
                                <div className="font-mono">{event.hash}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <Section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div>
                            <div className="mb-4 inline-block rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
                                Secure. Immutable. Auditable.
                            </div>
                            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
                                The audit trail API for modern SaaS and
                                enterprise systems.
                            </h1>
                            <p className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                                HyreLog is a dedicated audit trail platform that
                                captures every critical action in your product,
                                secures it with cryptographic hash-chains, and
                                makes it easy to prove what happened, when, and
                                by whom. Stop relying on ad-hoc logs and fragile
                                exports, use an immutable source of truth.
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <TrackedLink
                                    href="#early-access"
                                    className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                                    eventName="Join Early Access"
                                    location="Hero Section"
                                >
                                    Join Early Access
                                </TrackedLink>
                                <TrackedLink
                                    href="#roadmap"
                                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                                    eventName="View Roadmap"
                                    location="Hero Section"
                                >
                                    View Roadmap
                                </TrackedLink>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <ProductMock />
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Feature Highlights */}
            <Section>
                <Container>
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                            Built for trust and compliance
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Everything you need for production-grade audit
                            trails
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <FeatureCard
                            icon={
                                <svg
                                    className="h-8 w-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                            }
                            title="Immutable Event Ledger"
                            description="HyreLog stores events in a hash-chained ledger so that every action is linked to the previous one. If someone tries to tamper with history, the chain breaks. You get cryptographic assurance that your audit trail is intact."
                        />
                        <FeatureCard
                            icon={
                                <svg
                                    className="h-8 w-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            }
                            title="Built for Compliance and Governance"
                            description="HyreLog is designed to support SOC 2, ISO 27001, and GDPR-aligned audit requirements. It doesn't replace your entire compliance program, but it gives you a reliable, queryable trail of evidence for investigations, access reviews, and regulatory questions."
                        />
                        <FeatureCard
                            icon={
                                <svg
                                    className="h-8 w-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                    />
                                </svg>
                            }
                            title="Developer-First API"
                            description="Integrate via a simple, well-documented REST API. Use workspace- and project-scoped API keys, send structured JSON events, and query by actor, resource, time window, and more. No agents, no black boxes—just clear endpoints."
                        />
                        <FeatureCard
                            icon={
                                <svg
                                    className="h-8 w-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            }
                            title="Search, Export, and Investigations"
                            description="HyreLog will ship a dashboard for investigating incidents and audits: filtered views, user timelines, resource histories, and exportable reports for auditors and security teams."
                        />
                    </div>
                </Container>
            </Section>

            {/* How It Works */}
            <Section className="bg-gray-50 dark:bg-gray-900/50">
                <Container>
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                            How HyreLog works
                        </h2>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="text-center">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900">
                                <span className="text-xl font-bold">1</span>
                            </div>
                            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                                Send events
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Your application sends JSON audit events to
                                HyreLog whenever important actions happen,
                                logins, permission changes, data exports,
                                configuration updates, and more.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900">
                                <span className="text-xl font-bold">2</span>
                            </div>
                            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                                HyreLog secures them
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                HyreLog validates and normalises each event,
                                then writes it into a hash-chained ledger. Each
                                entry references the previous one, creating an
                                append-only trail.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900">
                                <span className="text-xl font-bold">3</span>
                            </div>
                            <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                                You prove it
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                When security, compliance, or leadership teams
                                ask &quot;who did what, and when?&quot;, you can
                                answer with confidence. Use the API and future
                                dashboards to trace user journeys, investigate
                                incidents, or export evidence for auditors.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Roadmap */}
            <Section id="roadmap">
                <Container>
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                            Roadmap
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            What&apos;s coming next
                        </p>
                    </div>
                    <div className="mx-auto max-w-3xl space-y-6">
                        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                            <div className="mb-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                                Early Access
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Core API, event ingestion, hash-chain ledger,
                                basic querying.
                            </p>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                            <div className="mb-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                                Public Beta
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Dashboards, filters, user/resource timelines,
                                CSV/JSON exports.
                            </p>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                            <div className="mb-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                                Regional Data Stores
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Region-specific deployments (starting in
                                Australia, then expanding to other
                                jurisdictions).
                            </p>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                            <div className="mb-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                                Compliance Toolkit
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Tools and guidance to help teams use HyreLog as
                                part of SOC 2 / ISO 27001 / GDPR evidence
                                collection.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Early Access Form */}
            <Section
                id="early-access"
                className="bg-gray-50 dark:bg-gray-900/50"
            >
                <Container>
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                            Join Early Access
                        </h2>
                        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                            Be among the first to use HyreLog. We&apos;ll notify
                            you when early access is available.
                        </p>
                        <EarlyAccessForm />
                    </div>
                </Container>
            </Section>

            {/* FAQ Preview */}
            <Section>
                <Container>
                    <div className="mx-auto max-w-3xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                                Frequently Asked Questions
                            </h2>
                        </div>
                        <div className="mb-8 space-y-0 rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                            <FaqItem
                                question="What is HyreLog?"
                                answer="HyreLog is a production-grade audit trail API. It accepts structured events from your applications, secures them with a hash-chained ledger, and makes them queryable for security, compliance, and product teams."
                            />
                            <FaqItem
                                question="Who is HyreLog for?"
                                answer="HyreLog is designed for SaaS companies, internal platform teams, and enterprise applications that need a trustworthy, centralised record of changes and access, especially when preparing for SOC 2, ISO 27001, or dealing with high-stakes data."
                            />
                            <FaqItem
                                question="How is this different from normal application logs?"
                                answer="Traditional logs are scattered, mutable, and often tied to infrastructure, not business actions. HyreLog focuses on structured, business-level events (who changed what, when) and stores them immutably with a hash-chain so you can trust the history."
                            />
                            <FaqItem
                                question="When is HyreLog launching?"
                                answer="HyreLog is currently in early development. The team is onboarding early design partners first, then expanding into a broader public beta. Join the early access list to hear when it's ready."
                            />
                        </div>
                        <div className="text-center">
                            <Link
                                href="/faq"
                                className="inline-flex items-center text-sm font-medium text-gray-900 transition-colors hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
                            >
                                View all FAQs
                                <svg
                                    className="ml-2 h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Site Structured Data (Organization, WebSite, Navigation, Breadcrumbs) */}
            <SiteStructuredData currentPath="/" />

            {/* SoftwareApplication Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'SoftwareApplication',
                        '@id': `${siteMetadata.siteUrl}/#software`,
                        name: 'HyreLog',
                        applicationCategory: 'DeveloperApplication',
                        operatingSystem: 'Web',
                        url: siteMetadata.siteUrl,
                        description:
                            'HyreLog is an immutable, hash-chained audit trail API that captures structured events from SaaS platforms and enterprise systems. Built for SOC 2, ISO 27001, and GDPR-aligned compliance.',
                        publisher: {
                            '@id': `${siteMetadata.siteUrl}/#organization`
                        },
                        image: [
                            {
                                '@type': 'ImageObject',
                                url: `${siteMetadata.siteUrl}/HyreLogLogoLight.png`,
                                width: 1200,
                                height: 400,
                                name: 'HyreLog Logo'
                            }
                        ],
                        logo: {
                            '@type': 'ImageObject',
                            url: `${siteMetadata.siteUrl}/HyreLogLogoLight.png`,
                            width: 1200,
                            height: 400
                        },
                        audience: {
                            '@type': 'Audience',
                            audienceType: 'Developers'
                        },
                        featureList: [
                            'Immutable hash-chained audit logs',
                            'REST API for event ingestion',
                            'SOC 2 and ISO 27001 compliance support',
                            'GDPR-aligned data handling',
                            'Multi-tenant SaaS architecture',
                            'Regional data storage'
                        ],
                        softwareVersion: '1.0.0',
                        releaseNotes:
                            'Early access - Production-grade audit trail API for modern SaaS platforms'
                    })
                }}
            />
        </>
    );
}
