// Generates /sitemap.xml at build time.
export const dynamic = 'force-static'

export default function sitemap() {
    return [
        {
            url: 'https://www.diversifydigitalglobal.online',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
    ]
}
