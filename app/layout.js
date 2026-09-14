import './globals.css'
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google'
import SmoothScroll from '@/components/effects/SmoothScroll'
import Cursor from '@/components/effects/Cursor'
import Torch from '@/components/effects/Torch'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
    weight: ['400', '500', '600'],
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
const TITLE = 'Diversify Digital Global — Digital Marketing That Moves Brands'
const DESCRIPTION =
    'Diversify Digital Global helps ambitious brands grow through SEO, web development, digital solutions and Meta advertising.'

export const metadata = {
    metadataBase: new URL(SITE_URL),
    title: { default: TITLE, template: '%s · Diversify Digital Global' },
    description: DESCRIPTION,
    applicationName: 'Diversify Digital Global',
    keywords: ['SEO services', 'web development', 'digital marketing agency', 'Meta ads', 'digital solutions'],
    authors: [{ name: 'Diversify Digital Global' }],
    creator: 'Diversify Digital Global',
    publisher: 'Diversify Digital Global',
    alternates: { canonical: SITE_URL },
    openGraph: { type: 'website', url: SITE_URL, siteName: 'Diversify Digital Global', title: TITLE, description: DESCRIPTION, locale: 'en_US' },
    twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, creator: '@diversifydigital' },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    category: 'business',
}

export const viewport = {
    themeColor: '#100b20',
    width: 'device-width',
    initialScale: 1,
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Diversify Digital Global',
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
                <Torch />
                <Cursor />
                <SmoothScroll>{children}</SmoothScroll>
            </body>
        </html>
    )
}
