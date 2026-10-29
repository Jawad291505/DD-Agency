import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import BrandStory from '@/components/sections/BrandStory'
import Services from '@/components/sections/Services'
import GrowthJourney from '@/components/sections/GrowthJourney'

import Coverage from '@/components/sections/Coverage'
import TechEcosystem from '@/components/sections/TechEcosystem'


import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import FloatingCTA from '@/components/ui/FloatingCTA'
import ScrollProgress from '@/components/effects/ScrollProgress'
import Preloader from '@/components/effects/Preloader'

const SITE_URL = 'https://www.diversifydigitalglobal.online'
const ORG_ID = `${SITE_URL}/#organization`
const LOGO_ID = `${SITE_URL}/#logo`
const LOGO_URL = `${SITE_URL}/.well-known/appspecific/logo.png`
const EMAIL = 'diversifydigitalglobal@gmail.com'
const DESCRIPTION =
    'Diversify Digital Global builds and scales software — web platforms, mobile apps, cloud infrastructure and AI products — backed by SEO and digital marketing.'

const services = [
    ['Web & App Development', 'Software development', 'Custom web platforms, e-commerce stores and mobile apps (iOS, Android and PWAs) engineered for speed, scalability and conversion.'],
    ['Cloud & DevOps', 'Cloud infrastructure', 'Cloud infrastructure setup, deployment and ongoing monitoring and maintenance.'],
    ['AI & Automation', 'Artificial intelligence solutions', 'AI integration into products and workflows, including automation and AI-powered applications.'],
    ['SEO & Content', 'Search engine optimization', 'Technical SEO, content strategy and performance optimisation focused on visibility and revenue.'],
    ['Social Media Marketing', 'Social media marketing', 'Community building and social media campaigns across major platforms.'],
    ['Paid Advertising', 'Paid advertising', 'Google Ads and Meta Ads campaigns tracked against pipeline and revenue.'],
    ['Branding & Creative', 'Branding and design', 'Brand identity and creative design for digital products and campaigns.'],
]

const navigation = [
    ['Services', `${SITE_URL}/#services`],
    ['Work', `${SITE_URL}/work`],
    ['Case Studies', `${SITE_URL}/case-study`],
    ['Blog', `${SITE_URL}/blog`],
    ['Team', `${SITE_URL}/team`],
    ['Contact', `${SITE_URL}/#contact`],
]

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': ['Organization', 'ProfessionalService'],
            '@id': ORG_ID,
            name: 'Diversify Digital Global',
            alternateName: 'DiversifyDigital',
            url: `${SITE_URL}/`,
            logo: { '@type': 'ImageObject', '@id': LOGO_ID, url: LOGO_URL, contentUrl: LOGO_URL, caption: 'Diversify Digital Global' },
            image: { '@id': LOGO_ID },
            description: DESCRIPTION,
            slogan: 'Software Engineering · Cloud · AI · Digital Growth',
            email: EMAIL,
            contactPoint: [
                { '@type': 'ContactPoint', telephone: '+92-320-4330801', contactType: 'customer service', email: EMAIL, availableLanguage: ['English'] },
                { '@type': 'ContactPoint', telephone: '+92-327-0738599', contactType: 'sales', email: EMAIL, availableLanguage: ['English'] },
            ],
            areaServed: ['North America', 'Europe', 'Middle East', 'South Asia', 'Southeast Asia', 'Australia and New Zealand'].map((name) => ({ '@type': 'Place', name })),
            knowsAbout: [
                'Software development',
                'Web development',
                'Mobile app development',
                'Cloud infrastructure',
                'AI and automation',
                'Search engine optimization',
                'Digital marketing',
                'Paid advertising',
                'Branding and design',
            ],
            sameAs: [
                'https://www.linkedin.com/company/diversifydigital/',
                'https://www.instagram.com/diversify.digital',
                'https://twitter.com/diversifydigital',
            ],
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Services',
                itemListElement: services.map(([name, serviceType, description]) => ({
                    '@type': 'Offer',
                    itemOffered: { '@type': 'Service', name, serviceType, description, provider: { '@id': ORG_ID } },
                })),
            },
        },
        {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: `${SITE_URL}/`,
            name: 'Diversify Digital Global',
            description: 'Software Engineering, Cloud & Digital Growth',
            inLanguage: 'en-US',
            publisher: { '@id': ORG_ID },
        },
        {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/#webpage`,
            url: `${SITE_URL}/`,
            name: 'Diversify Digital Global — Software Engineering, Cloud & Digital Growth',
            description: DESCRIPTION,
            isPartOf: { '@id': `${SITE_URL}/#website` },
            about: { '@id': ORG_ID },
            primaryImageOfPage: { '@id': LOGO_ID },
            inLanguage: 'en-US',
        },
        {
            '@type': 'SiteNavigationElement',
            '@id': `${SITE_URL}/#navigation`,
            name: navigation.map(([name]) => name),
            url: navigation.map(([, url]) => url),
        },
    ],
}

export default function Home() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
            <Preloader />
            <Navbar />
            <ScrollProgress />
            <main>
                <Hero />
                <BrandStory />
                <Services />
                <GrowthJourney />


                <Coverage />
                <TechEcosystem />


                <Contact />
            </main>
            <Footer />
            <FloatingCTA />
        </>
    )
}
