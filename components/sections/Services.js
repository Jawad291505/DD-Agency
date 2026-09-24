'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { REGISTER_CLIENT_URL } from '@/data/links'

const EASE = [0.22, 1, 0.36, 1]

const SERVICES = [
    {
        id: 'web', phase: 'ENGINEERING', no: '01', title: 'Web & App Development', headline: 'Software that performs from day one',
        desc: 'Custom web platforms, e-commerce stores and mobile apps — engineered for speed, scalability and conversion. We build what your business actually needs, not a template with your logo on it.',
        color: '#7c3aed',
        image: '/services/development.webp',
        subs: [
            { name: 'Web Development', detail: 'Marketing sites, SaaS platforms, e-commerce stores and custom builds engineered for speed and conversion' },
            { name: 'App Development', detail: 'Native and cross-platform apps built for real users — iOS, Android and progressive web apps' },
            { name: 'Performance Engineering', detail: 'Page speed, accessibility, Core Web Vitals and load optimisation tuned so nothing slows growth down' },
            { name: 'Ongoing Maintenance', detail: 'We don\'t disappear at launch. Updates, monitoring, and support keep things running long after go-live' },
        ],
    },
    {
        id: 'ai', phase: 'INTELLIGENCE', no: '02', title: 'AI & Automation', headline: 'Put AI to work inside your product',
        desc: 'We integrate large language models, computer vision and predictive analytics into real workflows — not demos. Practical AI that saves time, cuts cost and opens new revenue.',
        color: '#a855f7',
        image: '/services/growthstrategy.webp',
        subs: [
            { name: 'LLM Integration', detail: 'OpenAI, Anthropic, open-source models — wired into your product or internal tools' },
            { name: 'Workflow Automation', detail: 'Repetitive processes replaced with intelligent pipelines that learn and improve' },
            { name: 'Data Pipelines', detail: 'ETL, real-time processing and analytics infrastructure built for clean, actionable data' },
            { name: 'Custom Model Training', detail: 'Fine-tuned models trained on your domain data for higher accuracy where it matters' },
        ],
    },
    {
        id: 'seo', phase: 'VISIBILITY', no: '03', title: 'SEO & Content', headline: 'Get found where it matters',
        desc: 'Rank for what buyers actually search — technical foundations, content and authority that move you up and keep you there.',
        color: '#a78bfa',
        image: '/services/seo.webp',
        subs: [
            { name: 'Technical SEO', detail: 'Site speed, crawlability, indexing and structured data that give search engines no reason to skip you' },
            { name: 'Content Strategy', detail: 'Topic clusters, keyword mapping and editorial calendars built around real buyer intent' },
            { name: 'Link Building', detail: 'Authority and trust signals from real sources, not spammy shortcuts that put your rankings at risk' },
            { name: 'Local SEO', detail: 'Google Business optimisation, citations and map pack visibility for brands that win locally' },
        ],
    },
    {
        id: 'social', phase: 'COMMUNITY', no: '04', title: 'Social Media Marketing', headline: 'Turn followers into customers',
        desc: 'Strategy, content and community management across every platform that matters — building an audience that engages, trusts and buys.',
        color: '#6d28d9',
        image: '/services/socialmedia.webp',
        subs: [
            { name: 'Social Strategy', detail: 'Platform-by-platform plans built around your audience, goals and brand voice' },
            { name: 'Content Creation', detail: 'Reels, carousels, stories and posts designed to stop the scroll and drive action' },
            { name: 'Community Management', detail: 'Timely replies, moderation and relationship-building that keep your audience engaged' },
            { name: 'Analytics & Growth', detail: 'Clear reporting on reach, engagement and conversions so every post earns its place' },
        ],
    },
    {
        id: 'ads', phase: 'ACQUISITION', no: '05', title: 'Paid Advertising', headline: 'Ads built for intent — not just reach',
        desc: 'Paid campaigns built on intent, not guesswork. Every dollar tracked back to real pipeline — not vanity clicks.',
        color: '#8b5cf6',
        image: '/services/googleads.webp',
        subs: [
            { name: 'Search & Shopping Ads', detail: 'Capture demand at the exact moment someone\'s ready to buy' },
            { name: 'Meta Campaigns', detail: 'Reach, retarget, and convert across Facebook & Instagram' },
            { name: 'Conversion Tracking', detail: 'Full-funnel attribution, no black boxes, no guesswork' },
            { name: 'Creative Testing', detail: 'Continuous iteration on ads, copy and creative that actually convert' },
        ],
    },
    {
        id: 'brand', phase: 'IDENTITY', no: '06', title: 'Branding & Creative', headline: 'Don\'t just look good. Be memorable.',
        desc: 'A brand isn\'t a logo file — it\'s every impression people form of you. We build identities that hold their shape across every screen, page and platform.',
        color: '#c084fc',
        image: '/services/branding.webp',
        subs: [
            { name: 'Brand Identity', detail: 'Logo, design system, brand guidelines' },
            { name: 'Graphic Design', detail: 'Campaign creative, social assets, print collateral' },
            { name: 'Messaging & Voice', detail: 'What you say, how you say it, and why it sticks' },
            { name: 'Video & Photography', detail: 'Real, in-house production — no stock footage' },
        ],
    },
]

export default function Services() {
    const [active, setActive] = useState(0)
    const [hovered, setHovered] = useState(false)
    const [visible, setVisible] = useState(false)
    const reduce = useReducedMotion()
    const current = SERVICES[active]
    const sectionRef = useRef(null)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 })
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    // Rotation is driven by the progress bar CSS animation ending (6s), paused on hover / offscreen
    const next = () => setActive((prev) => (prev + 1) % SERVICES.length)
    const playing = !reduce && visible && !hovered

    return (
        <section id="services" ref={sectionRef} className="relative overflow-hidden bg-[#100b20] py-[clamp(5rem,10vw,9rem)]">
            {/* Seamless transition gradients */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#100b20] to-transparent z-[2]" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#100b20] to-transparent z-[2]" />
            {/* Brighter ambient glows */}
            <div className="absolute -right-40 top-20 h-[34rem] w-[34rem] rounded-full bg-violet-600/40 blur-[150px]" />
            <div className="absolute -left-40 bottom-10 h-[28rem] w-[28rem] rounded-full bg-violet-400/30 blur-[140px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[550px] rounded-full bg-violet-500/25 blur-[150px]" />
            <div className="absolute inset-0 grain" />

            <div className="container relative z-10">
                <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2">
                    <div>
                        <span className="label label-line text-violet-300/80">What we do</span>
                        <h2 className="mt-6 display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] text-white">
                            Everything your brand needs
                            <br />
                            <span className="italic text-gradient-violet">to grow.</span>
                        </h2>
                    </div>
                    <p className="max-w-[400px] text-[1rem] text-white/65 md:text-right">
                        Software, infrastructure and marketing working as one system. Every service plays a role in your growth —
                        nothing operates in isolation.
                    </p>
                </div>

                <style>{`@keyframes svc-progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
                <div
                    className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    {/* Service selector */}
                    <div className="flex flex-col border-t border-white/[0.08]">
                        {SERVICES.map((s, i) => {
                            const isActive = active === i
                            return (
                                <button
                                    key={s.id}
                                    onClick={() => setActive(i)}
                                    aria-pressed={isActive}
                                    className={`group relative flex items-center gap-5 border-b border-white/[0.08] px-2 py-6 text-left transition-colors duration-500 ${isActive ? 'bg-white/[0.03]' : 'hover:bg-white/[0.02]'}`}
                                >
                                    <span className={`font-mono text-[0.75rem] transition-colors duration-500 ${isActive ? 'text-violet-300' : 'text-white/25'}`}>{s.no}</span>
                                    <span className="flex-1">
                                        <span className={`block font-serif text-[clamp(1.25rem,2.2vw,1.7rem)] transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/45 group-hover:text-white/70'}`}>{s.title}</span>
                                        <span className={`mt-1 block font-mono text-[0.65rem] uppercase tracking-[0.18em] transition-colors duration-500 ${isActive ? 'text-violet-300/80' : 'text-white/20'}`}>{s.phase}</span>
                                    </span>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className={`transition-all duration-500 ${isActive ? 'translate-x-0 text-violet-300 opacity-100' : '-translate-x-2 text-white opacity-0 group-hover:opacity-40'}`}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    {isActive && (
                                        <span className="absolute bottom-[-1px] left-0 right-0 h-px overflow-hidden bg-white/[0.06]">
                                            <span
                                                key={`bar-${active}`}
                                                onAnimationEnd={next}
                                                className="block h-full origin-left bg-gradient-to-r from-violet-500 to-violet-300"
                                                style={reduce ? { transform: 'scaleX(1)' } : {
                                                    animation: 'svc-progress 6s linear forwards',
                                                    animationPlayState: playing ? 'running' : 'paused',
                                                }}
                                            />
                                        </span>
                                    )}
                                </button>
                            )
                        })}
                    </div>

                    {/* Showcase */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current.id}
                                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: reduce ? 0 : -12 }}
                                transition={{ duration: 0.6, ease: EASE }}
                                className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
                            >
                                {/* Hero visual */}
                                <div className="relative flex h-[300px] items-center justify-center overflow-hidden sm:h-[400px] lg:h-[460px]">
                                    <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 55%, ${current.color}66 0%, ${current.color}1f 45%, transparent 72%)` }} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#100b20]/90 via-transparent to-transparent" />
                                    <span aria-hidden className="pointer-events-none absolute -right-2 -top-6 select-none font-serif text-[9rem] leading-none text-white/[0.04] sm:text-[12rem]">{current.no}</span>
                                    <motion.img
                                        src={current.image}
                                        alt={current.title}
                                        draggable={false}
                                        initial={{ scale: reduce ? 1 : 0.94, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.8, ease: EASE }}
                                        className="relative h-[85%] w-[85%] object-contain drop-shadow-[0_30px_60px_rgba(124,58,237,0.45)]"
                                    />
                                    <span className="absolute left-6 top-6 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-violet-200/80">{current.no} / 0{SERVICES.length} · {current.phase}</span>
                                </div>

                                <div className="p-8 sm:p-10">
                                    <h3 className="display text-[clamp(1.7rem,3vw,2.5rem)] leading-tight text-white">{current.headline}</h3>
                                    <p className="mt-4 text-[1rem] leading-[1.75] text-white/65">{current.desc}</p>

                                    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        {current.subs.map((sub, i) => (
                                            <motion.div
                                                key={sub.name}
                                                initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, ease: EASE, delay: reduce ? 0 : 0.2 + i * 0.07 }}
                                                className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 transition-colors duration-300 hover:border-violet-500/25 hover:bg-violet-500/[0.05]"
                                            >
                                                <span className="block text-[0.9rem] font-medium text-white/85">{sub.name}</span>
                                                <span className="mt-1 block text-[0.8rem] leading-relaxed text-white/45">{sub.detail}</span>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <a href={REGISTER_CLIENT_URL} className="link-underline mt-8 inline-flex text-violet-300">
                                        Discuss {current.title.toLowerCase()}
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </a>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Why Choose Diversify Digital Global */}
                <div className="mt-24 border-t border-white/[0.06] pt-16">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr]">
                        <div>
                            <span className="label label-line text-violet-300/80">The difference</span>
                            <h3 className="mt-6 display text-[clamp(1.8rem,4vw,3rem)] leading-[1.08] text-white">
                                What Makes Diversify Digital Global{' '}
                                <span className="italic text-gradient-violet">the Right Choice?</span>
                            </h3>
                        </div>
                        <div className="flex flex-col gap-4">
                            {[
                                { title: 'Engineering-first approach', desc: 'Clean architecture, tested code and scalable infrastructure — not just pages that look nice' },
                                { title: 'Full product lifecycle', desc: 'From first wireframe to production deployment and ongoing maintenance under one roof' },
                                { title: 'Built for the AI era', desc: 'We integrate AI into products and workflows, not just slide decks' },
                                { title: 'Technical foundation that supports growth', desc: 'Speed, structure, security and clean code — done right from day one' },
                                { title: 'Marketing that ties back to revenue', desc: 'SEO, paid media and creative tracked against pipeline, not vanity metrics' },
                                { title: 'Transparent reporting', desc: 'Clear numbers, on a cadence you can count on' },
                            ].map((item, i) => (
                                <div key={item.title} className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition-colors duration-300 hover:border-violet-500/15 hover:bg-violet-500/[0.03]">
                                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600/20">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-violet-300">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                    </span>
                                    <div>
                                        <span className="block text-[0.92rem] font-medium text-white/80">{item.title}</span>
                                        <span className="mt-0.5 block text-[0.82rem] text-white/45">{item.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Our Process */}
                <div className="mt-24 border-t border-white/[0.06] pt-16">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="label label-line mx-auto text-violet-300/80">How we work</span>
                        <h3 className="mt-6 display text-[clamp(1.8rem,4vw,3rem)] leading-[1.08] text-white">
                            Precision Engineering:{' '}
                            <span className="italic text-gradient-violet">How We Turn Strategy into Growth</span>
                        </h3>
                        <p className="mx-auto mt-4 max-w-lg text-[0.95rem] text-white/55">
                            Diversify Digital Global follows a clear, data-driven process to deliver reliable results — from first audit to compounding growth.
                        </p>
                    </div>
                    <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
                        {[
                            { step: '01', title: 'Research & Architecture', desc: 'Understand your market, users and technical landscape before writing a single line of code or launching a single campaign.' },
                            { step: '02', title: 'Build & Optimise', desc: 'Engineer the product, set up infrastructure, optimise for search — building the foundation that everything else runs on.' },
                            { step: '03', title: 'Launch & Scale', desc: 'Go live, drive acquisition, measure everything and feed learnings back into the next iteration. Growth that compounds.' },
                        ].map((s) => (
                            <div key={s.step} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors duration-300 hover:border-violet-500/15 hover:bg-violet-500/[0.03]">
                                <span className="font-mono text-[0.7rem] text-violet-300/70">Step {s.step}</span>
                                <h4 className="mt-3 font-serif text-[1.1rem] text-white/85">{s.title}</h4>
                                <p className="mt-2 text-[0.85rem] leading-relaxed text-white/45">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
