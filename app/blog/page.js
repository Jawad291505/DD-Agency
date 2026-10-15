import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ConstellationBackground from '@/components/effects/ConstellationBackground'
import ScrollProgress from '@/components/effects/ScrollProgress'
import { getAllPosts, readingTime, formatDate } from '@/data/blog'

const SITE_URL = 'https://www.diversifydigitalglobal.online'
const TITLE = 'Blog — Insights on Software, Cloud, AI & Digital Growth'
const DESCRIPTION =
    'Practical insights from Diversify Digital Global on software engineering, cloud infrastructure, AI, SEO and digital marketing that drive real business growth.'

export const metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: '/blog' },
    openGraph: { type: 'website', url: `${SITE_URL}/blog`, siteName: 'Diversify Digital Global', title: TITLE, description: DESCRIPTION },
    twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

export default function BlogPage() {
    const posts = getAllPosts()

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Diversify Digital Global Blog',
        url: `${SITE_URL}/blog`,
        description: DESCRIPTION,
        publisher: { '@type': 'Organization', name: 'Diversify Digital Global', url: SITE_URL },
        blogPost: posts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            url: `${SITE_URL}/blog/${p.slug}`,
            datePublished: p.date,
            image: `${SITE_URL}${p.image.src}`,
        })),
    }

    return (
        <>
            <Navbar />
            <ScrollProgress />
            <ConstellationBackground />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <main className="relative z-10 min-h-screen">
                <section className="relative pt-28 pb-10 sm:pt-36 sm:pb-14">
                    <div className="container">
                        <span className="label label-line text-violet-300">Insights</span>
                        <h1 className="display mt-5 max-w-3xl text-[2.4rem] leading-[1.05] text-white sm:text-[3.6rem]">
                            The Diversify Digital <em className="text-violet-300">Blog</em>
                        </h1>
                        <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-white/50 sm:text-[1.1rem]">
                            Ideas on engineering, cloud, AI and marketing that work together to grow your business.
                        </p>
                        <div className="mt-10 h-px w-full bg-white/[0.06]" />
                    </div>
                </section>

                <section className="relative pb-24 sm:pb-32">
                    <div className="container grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post, i) => (
                            <article key={post.slug} className="group overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-colors duration-500 hover:border-violet-400/30">
                                <a href={`/blog/${post.slug}`} className="flex h-full flex-col" aria-label={post.title}>
                                    <div className="relative aspect-[16/9] overflow-hidden">
                                        <img
                                            src={post.image.src}
                                            alt={post.image.alt}
                                            width={post.image.width}
                                            height={post.image.height}
                                            loading={i < 3 ? 'eager' : 'lazy'}
                                            decoding="async"
                                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#100b20]/70 to-transparent" />
                                    </div>
                                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                                        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-violet-300/70">
                                            {post.category} · <time dateTime={post.date}>{formatDate(post.date)}</time>
                                        </p>
                                        <h2 className="mt-3 font-serif text-[1.35rem] leading-snug text-white">{post.title}</h2>
                                        <p className="mt-3 line-clamp-3 text-[0.92rem] leading-relaxed text-white/50">{post.description}</p>
                                        <div className="mt-auto flex items-center justify-between pt-6">
                                            <span className="font-mono text-[0.62rem] uppercase tracking-[0.15em] text-white/35">{readingTime(post)} min read</span>
                                            <span className="text-[0.8rem] font-semibold uppercase tracking-wide text-violet-300 transition-transform duration-300 group-hover:translate-x-1">
                                                Read article →
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}
