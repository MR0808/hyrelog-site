import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { CookieConsent } from '@/components/CookieConsent';
import { siteMetadata } from '@/lib/siteMetadata';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap'
});

export const metadata: Metadata = {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
        template: 'HyreLog | %s',
        default: siteMetadata.title
    },
    description: siteMetadata.description,
    keywords: siteMetadata.keywords,
    authors: [{ name: siteMetadata.author }],
    icons: {
        icon: [
            { url: '/icon0.svg', type: 'image/svg+xml' },
            { url: '/icon1.png', type: 'image/png' }
        ],
        apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }]
    },
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'HyreLog'
    },
    openGraph: {
        title: siteMetadata.title,
        description: siteMetadata.description,
        url: siteMetadata.siteUrl,
        siteName: siteMetadata.openGraph.siteName,
        type: 'website',
        locale: siteMetadata.openGraph.locale
    },
    twitter: {
        card: 'summary_large_image',
        title: siteMetadata.title,
        description: siteMetadata.description,
        creator: siteMetadata.twitter.handle,
        site: siteMetadata.twitter.site
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Preconnect to external domains for faster loading */}
                <link rel="preconnect" href="https://cloud.umami.is" />
                <link rel="dns-prefetch" href="https://cloud.umami.is" />
                <link rel="preconnect" href="https://www.googletagmanager.com" />
                <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
                <script
                    defer
                    src="https://cloud.umami.is/script.js"
                    data-website-id="ecc6fd5d-d316-4539-bbb9-4c996077d310"
                ></script>
            </head>
            <body
                className={`${inter.variable} min-h-screen bg-white font-sans antialiased dark:bg-linear-to-b dark:from-gray-950 dark:to-gray-900 dark:text-gray-100`}
                suppressHydrationWarning
            >
                <ThemeProvider>
                    <GoogleAnalytics />
                    <CookieConsent />
                    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
