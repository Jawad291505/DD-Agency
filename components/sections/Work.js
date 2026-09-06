'use client'

import { IMAGES } from '@/data/images'
import { Reveal, ImageReveal } from '@/lib/motion'
import { REGISTER_CLIENT_URL } from '@/data/links'

/**
 * Case-study framework. Copy is intentionally capability-led rather than
 * quoting invented client metrics. The `metrics` array is wired through the UI
 * so real, verified numbers can be dropped in per project without touching layout.
 */
const PROJECTS = [
    {
        title: 'Trendwood',
        category: 'Web · Social · SEO',
        summary:
            'A large furniture retailer given full-stack digital support — brand graphics, ongoing website maintenance, social media management and technical SEO, all under one roof.',
        image: IMAGES.gallery1,
        metrics: [
            { label: 'Focus', value: 'Full-stack presence' },
            { label: 'Scope', value: 'Graphics · Web · Social · SEO' },
        ],
        featured: true,
    },
    {
        title: 'Agora',
        category: 'App · Web Development',
        summary:
            'An app that makes democratic participation effortless, keeping an open line between politicians and the public they represent.',
        image: IMAGES.gallery3,
        metrics: [
            { label: 'Focus', value: 'Civic engagement' },
            { label: 'Scope', value: 'App → Web' },
        ],
    },
    {
        title: 'Fitoo',
        category: 'Web · Ads · SEO',
        summary:
            'A fitness service provider taken online end to end — website, ad campaigns, SEO, graphic design and a consistent presence across every channel.',
        image: IMAGES.gallery2,
        metrics: [
            { label: 'Focus', value: 'Online presence' },
            { label: 'Scope', value: 'Web · Ads · SEO · Design' },
        ],
    },
    {
        title: 'Eyesight Ltd.',
        category: 'Ad Campaigns · Video',
        summary:
            'Performance ad campaigns paired with in-house videography, built to turn attention into measurable demand.',
        image: IMAGES.gallery4,
        metrics: [
            { label: 'Focus', value: 'Demand generation' },
            { label: 'Scope', value: 'Campaigns → Video' },
        ],
    },
]

function Metrics({ items, tone = 'light' }) {
    const border = tone === 'dark' ? 'border-white/15' : 'border-ink/10'
    const label = tone === 'dark' ? 'text-paper/50' : 'text-ink/45'
    const value = tone === 'dark' ? 'text-violet-light' : 'text-violet'
    return (
        <dl className={`mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border ${border}`}>
            {items.map((m) => (
                <div key={m.label} className={`${tone === 'dark' ? 'bg-white/[0.03]' : 'bg-paper-deep'} px-5 py-4`}>
                    <dt className={`font-mono text-[0.64rem] uppercase tracking-wide ${label}`}>
                        {m.label}
                    </dt>
                    <dd className={`mt-1 font-serif text-lg ${value}`}>{m.value}</dd>
                </div>
            ))}
        </dl>
    )
}

export default function Work() {
    const [featured, ...rest] = PROJECTS

    return (
        <section id="work" className="section overflow-hidden bg-paper">
            <div className="container">
                <Reveal className="grid grid-cols-1 items-end gap-8 md:grid-cols-2">
                    <div>
                        <div className="label label-line text-ink/60">Selected work</div>
                        <h2 className="mt-6 display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] text-ink">
                            Work built to
                            <br />
                            <span className="italic">move the numbers.</span>
                        </h2>
                    </div>
                    <p className="max-w-[400px] text-ink/60 md:justify-self-end md:text-right">
                        A look at the kind of challenges we take on. Full case studies with verified
                        results are shared on request.
                    </p>
                </Reveal>

                {/* Featured project */}
                <ImageReveal className="mt-14">
                    <div className="group grid grid-cols-1 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-deep via-violet-900 to-ink text-paper shadow-glow lg:grid-cols-2">
                        <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto">
                            <img
                                src={featured.image}
                                alt={featured.title}
                                loading="lazy"
                                data-cursor-label="View"
                                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-editorial group-hover:scale-[1.05]"
                            />
                            <span className="absolute left-6 top-6 rounded-full bg-violet px-4 py-1.5 font-mono text-[0.64rem] font-semibold uppercase tracking-wide text-paper">
                                Featured
                            </span>
                        </div>
                        <div className="flex flex-col justify-center p-8 md:p-12">
                            <p className="font-mono text-[0.7rem] uppercase tracking-wide text-violet-light">
                                {featured.category}
                            </p>
                            <h3 className="mt-4 display text-[clamp(1.9rem,3.6vw,2.8rem)] leading-tight text-paper">
                                {featured.title}
                            </h3>
                            <p className="mt-4 max-w-[420px] text-paper/65">{featured.summary}</p>
                            <Metrics items={featured.metrics} tone="dark" />
                        </div>
                    </div>
                </ImageReveal>

                {/* Supporting projects */}
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {rest.map((p, i) => (
                        <ImageReveal key={p.title} delay={(i % 3) * 0.08}>
                            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-surface-gradient transition-shadow duration-500 hover:shadow-soft">
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={p.image}
                                        alt={p.title}
                                        loading="lazy"
                                        data-cursor-label="View"
                                        className="h-full w-full object-cover transition-transform duration-[1.2s] ease-editorial group-hover:scale-[1.06]"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col p-7">
                                    <p className="font-mono text-[0.66rem] uppercase tracking-wide text-ink/45">
                                        {p.category}
                                    </p>
                                    <h3 className="mt-3 font-serif text-[1.4rem] leading-tight text-ink">
                                        {p.title}
                                    </h3>
                                    <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/60">
                                        {p.summary}
                                    </p>
                                </div>
                            </article>
                        </ImageReveal>
                    ))}
                </div>

                <Reveal
                    className="frame-gradient mt-14 flex flex-col items-center gap-6 rounded-3xl px-8 py-12 text-center"
                    style={{ '--frame-bg': '#ECE5F7' }}
                >
                    <p className="display text-[clamp(1.4rem,3vw,2.1rem)] leading-snug text-ink">
                        Your project could be the next one here.
                    </p>
                    <a href={REGISTER_CLIENT_URL} data-cursor-label="Let's talk" className="btn btn-primary">
                        Start your project
                    </a>
                </Reveal>
            </div>
        </section>
    )
}
