// Generates /robots.txt at build time.
export const dynamic = 'force-static'

export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: '/team',
            },
            {
                userAgent: 'Googlebot-Image',
                disallow: ['/assets/owner/Jawad.webp'],
            },
        ],
        sitemap: 'https://diversify.digital/sitemap.xml',
    }
}
