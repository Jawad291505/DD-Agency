// Generates /sitemap.xml at build time.
export default function sitemap() {
    return [
        {
            url: 'https://diversify.digital',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
    ]
}
