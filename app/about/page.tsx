import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';

export const metadata: Metadata = {
    title: 'About',
    description:
        'Learn about HyreLog and the story behind building a dedicated audit trail platform for modern SaaS and enterprise systems.'
};

export default function AboutPage() {
    return (
        <>
            {/* Hero Section */}
            <Section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
                <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
                <Container>
                    <div className="relative mx-auto max-w-4xl text-center">
                        <div className="mb-6 inline-block rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
                            Our Story
                        </div>
                        <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                            About HyreLog
                        </h1>
                        <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-400">
                            A dedicated audit trail layer for the systems that
                            matter most.
                        </p>
                        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
                            <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                HyreLog exists because audit trails are too
                                important to be an afterthought.
                            </p>
                            <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                In many products, critical events are scattered
                                across application logs, monitoring tools, and
                                ad-hoc exports. When something goes wrong, or
                                when auditors show up, it&apos;s painful to
                                reconstruct what actually happened.
                            </p>
                            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                HyreLog takes a different approach: it gives you
                                a single, purpose-built audit layer with
                                cryptographic guarantees, opinionated structure,
                                and a developer-friendly API.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Origin Story */}
            <Section>
                <Container>
                    <div className="mx-auto max-w-5xl">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                                Why HyreLog was created
                            </h2>
                            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                        </div>

                        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                            <div className="space-y-6">
                                <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-purple-50 p-6 dark:border-gray-800 dark:from-blue-950/20 dark:to-purple-950/20">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white dark:bg-blue-500">
                                            <svg
                                                className="h-6 w-6"
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
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            The Problem
                                        </h3>
                                    </div>
                                    <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                                        HyreLog was founded by Mark Rosenberg, a
                                        product and technology leader based in
                                        Melbourne, Australia. Over more than a
                                        decade, Mark has worked across finance,
                                        logistics, retail, education, and
                                        government, leading teams and helping
                                        build SaaS products and internal
                                        platforms.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6 dark:border-gray-800 dark:from-purple-950/20 dark:to-pink-950/20">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 text-white dark:bg-purple-500">
                                            <svg
                                                className="h-6 w-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            The Pattern
                                        </h3>
                                    </div>
                                    <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                                        In project after project, the same
                                        pattern kept appearing: teams would
                                        scramble to bolt on &quot;audit
                                        logging&quot; late in the game. Events
                                        were spread across database triggers,
                                        log aggregators, and handwritten CSV
                                        exports. When incidents happened or
                                        auditors needed evidence, people spent
                                        days piecing together what should have
                                        been obvious.
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                                        <svg
                                            className="h-7 w-7"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        The Solution
                                    </h3>
                                </div>
                                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                                    HyreLog was born from the belief that audit
                                    trails deserve first-class
                                    infrastructure—just like authentication,
                                    billing, and observability. Instead of
                                    reinventing logging for every product, teams
                                    should be able to rely on a dedicated audit
                                    API that is secure, immutable, and auditable
                                    by design.
                                </p>
                            </div>
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
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                            <svg
                                                className="h-6 w-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                        </div>
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
                                        10+
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Years Experience
                                    </div>
                                </div>
                                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                                    <div className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
                                        5+
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
