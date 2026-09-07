import './globals.css'
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google'
import SmoothScroll from '@/components/effects/SmoothScroll'
import Cursor from '@/components/effects/Cursor'
import Preloader from '@/components/effects/Preloader'
import Torch from '@/components/effects/Torch'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
    weight: ['300', '400', '500', '600', '700'],
})

const fraunces = Fraunces({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-fraunces',
    style: ['normal', 'italic'],
    axes: ['opsz'],
})

const jetbrains = JetBrains_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-mono',
    weight: ['400', '500'],
})

const SITE_URL = 'https://diversify.digital'
const TITLE = 'Diversify Digital — Digital Marketing That Moves Brands'
const DESCRIPTION =
    'Diversify Digital helps ambitious brands grow through SEO, web development, digital solutions and Meta advertising.'

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: { default: TITLE, template: '%s · Diversify Digital' },
    description: DESCRIPTION,
    applicationName: 'Diversify Digital',
    keywords: ['SEO services', 'web development', 'digital marketing agency', 'Meta ads', 'digital solutions'],
    authors: [{ name: 'Diversify Digital' }],
    creator: 'Diversify Digital',
    publisher: 'Diversify Digital',
    alternates: { canonical: SITE_URL },
    openGraph: { type: 'website', url: SITE_URL, siteName: 'Diversify Digital', title: TITLE, description: DESCRIPTION, locale: 'en_US' },
    twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, creator: '@diversifydigital' },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    category: 'business',
}

export const viewport = {
    themeColor: '#0a0a0f',
    width: 'device-width',
    initialScale: 1,
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Diversify Digital',
    url: SITE_URL,
    description: DESCRIPTION,
    sameAs: [],
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`}>
            <head>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            </head>
            <body>
                <Preloader />
                <Torch />
                <Cursor />
                <SmoothScroll>{children}</SmoothScroll>
            </body>
        </html>
    )
}
