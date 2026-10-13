// Generates /sitemap.xml at build time.
export const dynamic = 'force-static'

const SITE_URL = 'https://www.diversifydigitalglobal.online'

const ROUTES = [
    { path: '', priority: 1 },
    { path: '/work', priority: 0.8 },
    { path: '/case-study', priority: 0.8 },
    { path: '/team', priority: 0.6 },
]

export default function sitemap() {
    return ROUTES.map(({ path, priority }) => ({
        url: `${SITE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority,
    }))
}
