import './globals.css'
import { Inter, Fraunces } from 'next/font/google'
import SmoothScroll from './components/SmoothScroll'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Preloader from './components/Preloader'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
    weight: ['400', '500', '600', '700'],
})

const fraunces = Fraunces({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-fraunces',
    style: ['normal', 'italic'],
    axes: ['opsz'],
})

const SITE_URL = 'https://diversify.digital'
const TITLE = 'Diversify Digital — Digital Marketing That Moves Brands'
const DESCRIPTION =
    'Diversify Digital helps ambitious brands grow through SEO, web development, digital solutions and Meta advertising.'

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: TITLE,
        template: '%s · Diversify Digital',
    },
    description: DESCRIPTION,
    applicationName: 'Diversify Digital',
    keywords: [
        'SEO services',
        'web development',
        'digital marketing agency',
        'Meta ads',
        'digital solutions',
    ],
    authors: [{ name: 'Diversify Digital' }],
    creator: 'Diversify Digital',
    publisher: 'Diversify Digital',
    alternates: {
        canonical: SITE_URL,
    },
    openGraph: {
        type: 'website',
        url: SITE_URL,
        siteName: 'Diversify Digital',
        title: TITLE,
        description: DESCRIPTION,
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: DESCRIPTION,
        creator: '@diversifydigital',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
    },
    category: 'business',
}

export const viewport = {
    themeColor: '#4b236d',
    width: 'device-width',
    initialScale: 1,
}

// JSON-LD structured data for richer search results.
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
        <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body>
                <Preloader />
                <ScrollProgress />
                <Cursor />
                <SmoothScroll>{children}</SmoothScroll>
            </body>
        </html>
    )
}
