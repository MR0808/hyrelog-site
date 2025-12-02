import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { siteMetadata } from '@/lib/siteMetadata';

export const metadata: Metadata = {
    title: 'About',
    description:
        'Learn about HyreLog and the story behind building a dedicated audit trail platform for modern SaaS and enterprise systems.',
    openGraph: {
        title: 'About HyreLog',
        description:
            'Learn about HyreLog and the story behind building a dedicated audit trail platform for modern SaaS and enterprise systems.',
        url: `${siteMetadata.siteUrl}/about`
    }
};

export default function AboutPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About HyreLog',
        description:
            'Learn about HyreLog and the story behind building a dedicated audit trail platform for modern SaaS and enterprise systems.',
        url: `${siteMetadata.siteUrl}/about`,
        mainEntity: {
            '@type': 'Organization',
            name: 'HyreLog',
            founder: {
                '@type': 'Person',
                name: 'Mark Rosenberg',
                jobTitle: 'Founder'
            }
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero Section */}
            <Section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
                <Container>
                    <div className="relative mx-auto max-w-4xl">
                        <div className="mb-6 inline-block rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
                            Our Story
                        </div>
                        <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                            Why HyreLog Exists
                        </h1>
                        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
                            <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                                HyreLog wasn&apos;t created as a feature or a
                                nice-to-have add-on. It was created because of a
                                persistent, painful problem that kept showing up
                                across countless products and teams: audit
                                trails were always an afterthought.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* The Real Pattern Section */}
            <Section>
                <Container>
                    <div className="mx-auto max-w-5xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                                The Real Pattern Behind the Problem
                            </h2>
                            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                        </div>
                        <p className="mb-8 text-center text-lg text-gray-600 dark:text-gray-400">
                            Across different industries, tech stacks, and team
                            sizes, the same thing kept happening:
                        </p>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                    <svg
                                        className="h-6 w-6 text-blue-600 dark:text-blue-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                </div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    Bolted on at the end
                                </p>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    Audit logging was added as an afterthought
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                    <svg
                                        className="h-6 w-6 text-purple-600 dark:text-purple-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                        />
                                    </svg>
                                </div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    Scattered everywhere
                                </p>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    Events across triggers, logs, analytics, and
                                    exports
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-900/30">
                                    <svg
                                        className="h-6 w-6 text-pink-600 dark:text-pink-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    Inconsistent formats
                                </p>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    Each system recorded things differently, or
                                    not at all
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                                    <svg
                                        className="h-6 w-6 text-red-600 dark:text-red-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                </div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    Scrambling to reconstruct
                                </p>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    When things went wrong, teams had to piece
                                    together the past
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                                    <svg
                                        className="h-6 w-6 text-orange-600 dark:text-orange-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                </div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    Auditor panic
                                </p>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    When auditors arrived, everyone panicked
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                                    <svg
                                        className="h-6 w-6 text-gray-600 dark:text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    Buried in logs
                                </p>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    Security incidents left truth buried in a
                                    mess of logs
                                </p>
                            </div>
                        </div>
                        <div className="mt-8 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 text-center dark:border-gray-800 dark:from-gray-900 dark:to-gray-950">
                            <p className="text-lg text-gray-700 dark:text-gray-300">
                                You could have a beautifully built product, but
                                behind the scenes the record of who did what,
                                when, and how was fragile, inconsistent, or
                                incomplete.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* The Pain Section */}
            <Section className="bg-gray-50 dark:bg-gray-900/50">
                <Container>
                    <div className="mx-auto max-w-5xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                                The Pain Behind the Scenes
                            </h2>
                            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                        </div>
                        <p className="mb-8 text-center text-lg text-gray-600 dark:text-gray-400">
                            Teams often believed they had &quot;logging&quot;
                            handled. But when pressure hit, a security incident,
                            customer dispute, or compliance request, the cracks
                            showed:
                        </p>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <p className="font-medium text-gray-900 dark:text-white">
                                    No single source of truth
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <p className="font-medium text-gray-900 dark:text-white">
                                    No guarantee of integrity
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <p className="font-medium text-gray-900 dark:text-white">
                                    No way to prove something hadn&apos;t been
                                    altered
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <p className="font-medium text-gray-900 dark:text-white">
                                    No consistent structure across services
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:col-span-2 lg:col-span-1">
                                <p className="font-medium text-gray-900 dark:text-white">
                                    No real trust in the timeline
                                </p>
                            </div>
                        </div>
                        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                People spent hours or days sifting through logs,
                                stitching together CSVs, grepping servers, or
                                reverse-engineering user behaviour. What should
                                have been obvious became forensic
                                reconstruction.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* The Insight Section */}
            <Section>
                <Container>
                    <div className="mx-auto max-w-5xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                                The Insight
                            </h2>
                            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                        </div>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                    The common thread wasn&apos;t a lack of
                                    effort, it was a missing layer.
                                </p>
                                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                    Modern products have authentication layers,
                                    billing layers, and monitoring layers, but
                                    no dedicated audit layer.
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-purple-50 p-8 dark:border-gray-800 dark:from-blue-950/20 dark:to-purple-950/20">
                                <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                    A layer that is:
                                </p>
                                <ul className="space-y-3 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                    <li className="flex items-start gap-3">
                                        <span className="mt-1.5 shrink-0 text-blue-600 dark:text-blue-400">
                                            ✓
                                        </span>
                                        <span>
                                            Purpose-built for recording
                                            sensitive actions
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-1.5 shrink-0 text-blue-600 dark:text-blue-400">
                                            ✓
                                        </span>
                                        <span>Immutable by design</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-1.5 shrink-0 text-blue-600 dark:text-blue-400">
                                            ✓
                                        </span>
                                        <span>
                                            Structured instead of &quot;whatever
                                            logs happen to exist&quot;
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-1.5 shrink-0 text-blue-600 dark:text-blue-400">
                                            ✓
                                        </span>
                                        <span>
                                            Centralised instead of spread across
                                            microservices
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-1.5 shrink-0 text-blue-600 dark:text-blue-400">
                                            ✓
                                        </span>
                                        <span>Easy to integrate</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-1.5 shrink-0 text-blue-600 dark:text-blue-400">
                                            ✓
                                        </span>
                                        <span>
                                            Trusted enough to stand up in an
                                            audit or incident investigation
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Why HyreLog Was Created */}
            <Section className="bg-gray-50 dark:bg-gray-900/50">
                <Container>
                    <div className="mx-auto max-w-5xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                                Why HyreLog Was Created
                            </h2>
                            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                        </div>
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                    HyreLog exists to give teams a reliable,
                                    tamper-proof, developer-friendly audit trail
                                    they can trust on day one, instead of
                                    scrambling to bolt something together later.
                                </p>
                                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                    It&apos;s not about vanity metrics or
                                    dashboards. It&apos;s about truth,
                                    integrity, and operational confidence.
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50 to-pink-50 p-8 dark:border-gray-800 dark:from-purple-950/20 dark:to-pink-950/20">
                                <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                    It&apos;s for the moment someone asks:
                                </p>
                                <ul className="space-y-3 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                    <li className="flex items-start gap-3">
                                        <span className="mt-1.5 shrink-0 text-purple-600 dark:text-purple-400">
                                            &quot;
                                        </span>
                                        <span>
                                            Who changed this permission?&quot;
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-1.5 shrink-0 text-purple-600 dark:text-purple-400">
                                            &quot;
                                        </span>
                                        <span>
                                            When was this feature enabled?&quot;
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-1.5 shrink-0 text-purple-600 dark:text-purple-400">
                                            &quot;
                                        </span>
                                        <span>
                                            Why did this export occur?&quot;
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="mt-1.5 shrink-0 text-purple-600 dark:text-purple-400">
                                            &quot;
                                        </span>
                                        <span>
                                            How do we prove this data
                                            wasn&apos;t altered?&quot;
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 text-center dark:border-gray-800 dark:bg-gray-900">
                            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                HyreLog makes those answers clear, consistent,
                                and verifiable.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* A Dedicated Audit Layer */}
            <Section>
                <Container>
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-8 text-center">
                            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                                A Dedicated Audit Layer for Modern Systems
                            </h2>
                            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                        </div>
                        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 to-purple-50 p-10 shadow-lg dark:border-gray-800 dark:from-blue-950/20 dark:to-purple-950/20">
                            <p className="mb-4 text-center text-xl font-semibold text-gray-900 dark:text-white">
                                The goal is simple:
                            </p>
                            <p className="mb-8 text-center text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                Make trustworthy audit trails effortless to
                                implement and impossible to compromise.
                            </p>
                            <div className="space-y-4">
                                <div className="rounded-lg border border-blue-200 bg-white p-4 dark:border-blue-800 dark:bg-gray-900">
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                        No more guesswork.
                                    </p>
                                </div>
                                <div className="rounded-lg border border-purple-200 bg-white p-4 dark:border-purple-800 dark:bg-gray-900">
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                        No more scattered logs.
                                    </p>
                                </div>
                                <div className="rounded-lg border border-pink-200 bg-white p-4 dark:border-pink-800 dark:bg-gray-900">
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                        No more fragile evidence trails.
                                    </p>
                                </div>
                            </div>
                            <p className="mt-8 text-center text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                Just a clean, cryptographically secured history
                                of everything that matters.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Founder Section */}
            <Section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-950">
                <Container>
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                                About the founder
                            </h2>
                            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                        </div>

                        <div className="grid gap-8 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
                                    <div className="flex items-start gap-4">
                                        <Image
                                            src="/rosenberg.jpg"
                                            alt="Mark Rosenberg"
                                            width={80}
                                            height={80}
                                            className="rounded-xl object-cover"
                                        />
                                        <div>
                                            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                                                Mark Rosenberg
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Founder & Product Leader
                                            </p>
                                        </div>
                                    </div>
                                    <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                                        Mark has a background in strategy,
                                        product management, and technology
                                        leadership. He has managed technical
                                        teams, founded startups, and delivered
                                        systems in highly regulated
                                        environments.
                                    </p>
                                    <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                                        HyreLog is a reflection of those
                                        experiences: practical, developer-first,
                                        and focused on giving teams the tools
                                        they need to build trustworthy systems
                                        without endless bespoke work.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                                    <div className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
                                        25+
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Years Experience
                                    </div>
                                </div>
                                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                                    <div className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
                                        10+
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Industries Served
                                    </div>
                                </div>
                                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                                    <div className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
                                        🇦🇺
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Based in Melbourne
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* CTA Section */}
            <Section>
                <Container>
                    <div className="mx-auto max-w-3xl">
                        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-12 text-center dark:border-gray-800 dark:from-gray-900 dark:to-gray-950">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                                Want to shape the future of HyreLog?
                            </h2>
                            <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                                Join our early access program and help us build
                                the audit trail platform you need.
                            </p>
                            <Link
                                href="/#early-access"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-8 py-4 text-base font-medium text-white transition-all hover:bg-gray-800 hover:shadow-lg dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                            >
                                Join the early access list
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </Container>
            </Section>
        </>
    );
}
