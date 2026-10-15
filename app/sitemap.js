// Generates /sitemap.xml at build time.
import { POSTS } from '@/data/blog'

export const dynamic = 'force-static'

const SITE_URL = 'https://www.diversifydigitalglobal.online'

const ROUTES = [
    { path: '', priority: 1 },
    { path: '/work', priority: 0.8 },
    { path: '/case-study', priority: 0.8 },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/team', priority: 0.6 },
]

export default function sitemap() {
    const pages = ROUTES.map(({ path, priority, changeFrequency = 'monthly' }) => ({
        url: `${SITE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
    }))
    const posts = POSTS.map((p) => ({
        url: `${SITE_URL}/blog/${p.slug}`,
        lastModified: new Date(`${p.date}T00:00:00Z`),
        changeFrequency: 'yearly',
        priority: 0.7,
        images: [`${SITE_URL}${p.image.src}`],
    }))
    return [...pages, ...posts]
}
