// Generates /robots.txt at build time.
export const dynamic = 'force-static'

export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: 'https://diversify.digital/sitemap.xml',
    }
}
