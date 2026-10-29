import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ConstellationBackground from '@/components/effects/ConstellationBackground'
import ScrollProgress from '@/components/effects/ScrollProgress'
import RichText, { headingId } from '@/components/blog/RichText'
import { POSTS, getPost, getAllPosts, readingTime, formatDate } from '@/data/blog'
import { REGISTER_CLIENT_URL } from '@/data/links'

const SITE_URL = 'https://www.diversifydigitalglobal.online'

// Static export: only the slugs listed in data/blog.js exist.
export const dynamicParams = false

export function generateStaticParams() {
    return POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
    const { slug } = await params
    const post = getPost(slug)
    if (!post) return {}
    const url = `${SITE_URL}/blog/${post.slug}`
    const image = { url: post.image.src, width: post.image.width, height: post.image.height, alt: post.image.alt }
    return {
        title: post.title,
        description: post.description,
        keywords: post.keywords,
        authors: [{ name: post.author }],
        alternates: { canonical: `/blog/${post.slug}` },
        openGraph: {
            type: 'article',
            url,
            siteName: 'Diversify Digital Global',
            title: post.title,
            description: post.description,
            publishedTime: post.date,
            modifiedTime: post.date,
            authors: [post.author],
            section: post.category,
            tags: post.keywords,
            images: [image],
        },
        twitter: { card: 'summary_large_image', title: post.title, description: post.description, images: [post.image.src] },
    }
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params
    const post = getPost(slug)
    if (!post) notFound()

    const url = `${SITE_URL}/blog/${post.slug}`
    const headings = post.content.filter((b) => b.type === 'h2')
    const related = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 2)
    const faqs = post.content.filter((b) => b.type === 'faq').flatMap((b) => b.items)
    const stripInline = (s) => s.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            image: [`${SITE_URL}${post.image.src}`],
            datePublished: post.date,
            dateModified: post.date,
            author: { '@type': 'Organization', name: post.author, url: SITE_URL },
            publisher: {
                '@type': 'Organization',
                name: 'Diversify Digital Global',
                url: SITE_URL,
                logo: { '@type': 'ImageObject', url: `${SITE_URL}/.well-known/appspecific/logo.png` },
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': url },
            articleSection: post.category,
            keywords: post.keywords.join(', '),
            inLanguage: 'en',
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
                { '@type': 'ListItem', position: 3, name: post.title, item: url },
            ],
        },
        ...(faqs.length
            ? [{
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faqs.map((f) => ({
                    '@type': 'Question',
                    name: f.q,
                    acceptedAnswer: { '@type': 'Answer', text: stripInline(f.a) },
                })),
            }]
            : []),
    ]

    return (
        <>
            <Navbar />
            <ScrollProgress />
            <ConstellationBackground />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <main className="relative z-10 min-h-screen">
                <article>
                    <header className="relative pt-28 sm:pt-36">
                        <div className="container max-w-6xl">
                            <nav aria-label="Breadcrumb" className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/60">
                                <ol className="flex flex-wrap items-center gap-2">
                                    <li><a href="/" className="transition-colors hover:text-white">Home</a></li>
                                    <li aria-hidden="true">/</li>
                                    <li><a href="/blog" className="transition-colors hover:text-white">Blog</a></li>
                                    <li aria-hidden="true">/</li>
                                    <li aria-current="page" className="truncate text-violet-300/70">{post.category}</li>
                                </ol>
                            </nav>
                            <h1 className="display mt-6 max-w-4xl text-[2.2rem] leading-[1.08] text-white sm:text-[3.4rem]">{post.title}</h1>
                            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-white/70">
                                <span>By {post.author}</span>
                                <span aria-hidden="true">·</span>
                                <time dateTime={post.date}>{formatDate(post.date)}</time>
                                <span aria-hidden="true">·</span>
                                <span>{readingTime(post)} min read</span>
                            </p>
                        </div>
                        <div className="container mt-10 max-w-6xl">
                            <figure className="overflow-hidden rounded-3xl border border-white/[0.08] shadow-2xl shadow-black/40">
                                <img
                                    src={post.image.src}
                                    alt={post.image.alt}
                                    width={post.image.width}
                                    height={post.image.height}
                                    fetchPriority="high"
                                    decoding="async"
                                    className="aspect-[16/9] w-full object-cover"
                                />
                            </figure>
                        </div>
                    </header>

                    <div className="container max-w-6xl pb-20 pt-10 sm:pb-28">
                        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start lg:gap-10">
                            {/* Opaque reading surface so the animated background never sits behind body copy. */}
                            <div className="min-w-0 rounded-3xl border border-white/[0.08] bg-[#140e28] px-5 py-9 shadow-2xl shadow-black/40 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
                                <div className="mx-auto max-w-[42rem]">
                                    {headings.length > 2 && (
                                        <details className="group mb-10 rounded-2xl border border-white/[0.08] bg-white/[0.03] lg:hidden">
                                            <summary className="flex cursor-pointer list-none items-center justify-between p-5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-violet-300 [&::-webkit-details-marker]:hidden">
                                                In this article
                                                <span aria-hidden="true" className="text-base transition-transform group-open:rotate-45">+</span>
                                            </summary>
                                            <ol className="space-y-3 px-5 pb-5">
                                                {headings.map((h, n) => (
                                                    <li key={h.text} className="flex gap-3 text-[0.95rem] leading-snug">
                                                        <span className="font-mono text-[0.8rem] text-violet-300/80">{String(n + 1).padStart(2, '0')}</span>
                                                        <a href={`#${headingId(h.text)}`} className="text-white/85 transition-colors hover:text-white">{h.text}</a>
                                                    </li>
                                                ))}
                                            </ol>
                                        </details>
                                    )}

                                    <RichText blocks={post.content} />

                                    <div className="mt-16 flex flex-col items-start gap-5 rounded-2xl border border-violet-400/25 bg-violet-500/[0.08] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                                        <p className="font-serif text-[1.3rem] leading-snug text-white">Building something that needs to grow?</p>
                                        <a href={REGISTER_CLIENT_URL} className="btn btn-primary shrink-0 text-[0.75rem]">Start a project</a>
                                    </div>
                                </div>
                            </div>

                            <aside className="hidden lg:block lg:sticky lg:top-28" aria-label="Article navigation">
                                {headings.length > 2 && (
                                    <nav aria-label="Table of contents" className="rounded-2xl border border-white/[0.08] bg-[#140e28] p-6">
                                        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-violet-300">In this article</p>
                                        <ol className="mt-5 space-y-3.5">
                                            {headings.map((h, n) => (
                                                <li key={h.text} className="flex gap-3 text-[0.88rem] leading-snug">
                                                    <span className="font-mono text-[0.75rem] text-violet-300/70">{String(n + 1).padStart(2, '0')}</span>
                                                    <a href={`#${headingId(h.text)}`} className="text-white/75 transition-colors hover:text-white">{h.text}</a>
                                                </li>
                                            ))}
                                        </ol>
                                    </nav>
                                )}
                                <a href="/blog" className="mt-5 inline-block font-mono text-[0.66rem] uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white">← All articles</a>
                            </aside>
                        </div>

                        <div className="mx-auto mt-14 max-w-[42rem] lg:mx-0 lg:max-w-none">
                            {related.length > 0 && (
                                <aside aria-label="More articles">
                                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-violet-300">Keep reading</p>
                                    <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                                        {related.map((p) => (
                                            <li key={p.slug}>
                                                <a href={`/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#140e28] transition-colors hover:border-violet-400/40">
                                                    <img src={p.image.src} alt="" width={p.image.width} height={p.image.height} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
                                                    <span className="p-5">
                                                        <span className="block font-mono text-[0.62rem] uppercase tracking-[0.18em] text-violet-300/80">{p.category}</span>
                                                        <span className="mt-2 block font-serif text-[1.15rem] leading-snug text-white">{p.title}</span>
                                                    </span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </aside>
                            )}
                            <div className="mt-10 lg:hidden">
                                <a href="/blog" className="btn btn-ghost text-[0.75rem]">← All articles</a>
                            </div>
                        </div>
                    </div>
                </article>
            </main>

            <Footer />
        </>
    )
}
