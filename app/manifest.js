// Web app manifest for PWA-style metadata.
export const dynamic = 'force-static'

export default function manifest() {
    return {
        name: 'Diversify Digital Global — IT & Digital Solutions',
        short_name: 'Diversify',
        description: 'Software engineering, cloud infrastructure, AI and digital marketing for ambitious businesses.',
        start_url: '/',
        display: 'standalone',
        background_color: '#F5F2FB',
        theme_color: '#2A1263',
    }
}
