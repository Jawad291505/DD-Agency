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
                        <div className="container max-w-4xl">
                            <nav aria-label="Breadcrumb" className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/35">
                                <ol className="flex flex-wrap items-center gap-2">
                                    <li><a href="/" className="transition-colors hover:text-white">Home</a></li>
                                    <li aria-hidden="true">/</li>
                                    <li><a href="/blog" className="transition-colors hover:text-white">Blog</a></li>
                                    <li aria-hidden="true">/</li>
                                    <li aria-current="page" className="truncate text-violet-300/70">{post.category}</li>
                                </ol>
                            </nav>
                            <h1 className="display mt-6 text-[2.2rem] leading-[1.08] text-white sm:text-[3.4rem]">{post.title}</h1>
                            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.66rem] uppercase tracking-[0.15em] text-white/40">
                                <span>By {post.author}</span>
                                <span aria-hidden="true">·</span>
                                <time dateTime={post.date}>{formatDate(post.date)}</time>
                                <span aria-hidden="true">·</span>
                                <span>{readingTime(post)} min read</span>
                            </p>
                        </div>
                        <div className="container mt-10 max-w-5xl">
                            <figure className="overflow-hidden rounded-3xl border border-white/[0.06]">
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

                    <div className="container max-w-3xl pb-20 pt-6 sm:pb-28">
                        {headings.length > 2 && (
                            <nav aria-label="Table of contents" className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-violet-300/70">In this article</p>
                                <ol className="mt-4 space-y-2">
                                    {headings.map((h) => (
                                        <li key={h.text}>
                                            <a href={`#${headingId(h.text)}`} className="text-[0.92rem] text-white/55 transition-colors hover:text-white">
                                                {h.text}
                                            </a>
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                        )}

                        <div className="mt-4">
                            <RichText blocks={post.content} />
                        </div>

                        <div className="mt-16 flex flex-col items-start gap-5 rounded-3xl border border-violet-400/20 bg-violet-500/[0.06] p-8 sm:flex-row sm:items-center sm:justify-between">
                            <p className="font-serif text-[1.3rem] text-white">Building something that needs to grow?</p>
                            <a href={REGISTER_CLIENT_URL} className="btn btn-primary shrink-0 text-[0.75rem]">Start a project</a>
                        </div>

                        <div className="mt-12 flex flex-wrap gap-4">
                            <a href="/blog" className="btn btn-ghost text-[0.75rem]">← All articles</a>
                        </div>

                        {related.length > 0 && (
                            <aside className="mt-16" aria-label="More articles">
                                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-violet-300/70">Keep reading</p>
                                <ul className="mt-5 space-y-4">
                                    {related.map((p) => (
                                        <li key={p.slug}>
                                            <a href={`/blog/${p.slug}`} className="font-serif text-[1.15rem] text-white/80 transition-colors hover:text-white">{p.title}</a>
                                        </li>
                                    ))}
                                </ul>
                            </aside>
                        )}
                    </div>
                </article>
            </main>

            <Footer />
        </>
    )
}
