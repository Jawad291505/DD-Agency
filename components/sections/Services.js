'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { REGISTER_CLIENT_URL } from '@/data/links'

const EASE = [0.22, 1, 0.36, 1]

const SERVICES = [
    {
        id: 'seo', phase: 'ATTENTION', no: '01', title: 'SEO', headline: 'Get found where it matters',
        desc: 'Rank for what buyers actually search — technical foundations, content and authority that move you up and keep you there.',
        color: '#a78bfa',
        image: '/services/seo.webp',
        subs: [
            { name: 'Technical SEO', detail: 'Site speed, crawlability, indexing and structured data that give search engines no reason to skip you' },
            { name: 'Content Strategy', detail: 'Topic clusters, keyword mapping and editorial calendars built around real buyer intent' },
            { name: 'Link Building', detail: 'Authority and trust signals from real sources, not spammy shortcuts that put your rankings at risk' },
            { name: 'Local SEO', detail: 'Google Business optimization, citations and map pack visibility for brands that live and win locally' },
        ],
    },
    {
        id: 'ads', phase: 'DISCOVERY', no: '02', title: 'Google & Meta Ads', headline: 'Ads built for intent — not just reach',
        desc: 'Paid campaigns built on intent, not guesswork. Every dollar tracked back to real pipeline — not vanity clicks.',
        color: '#8b5cf6',
        image: '/services/googleads.webp',
        subs: [
            { name: 'Search & Shopping Ads', detail: 'Capture demand at the exact moment someone\'s ready to buy' },
            { name: 'Meta Campaigns', detail: 'Reach, retarget, and convert across Facebook & Instagram' },
            { name: 'Conversion Tracking', detail: 'Full-funnel attribution, no black boxes, no guesswork' },
            { name: 'Creative Testing', detail: 'Continuous iteration on the ads, copy, and creative that actually convert' },
        ],
    },
    {
        id: 'web', phase: 'EXPERIENCE', no: '03', title: 'Web & App Development', headline: 'Build the thing people land on',
        desc: 'Fast, considered, conversion-ready builds — from marketing sites to full digital products — so every visitor you earn actually sticks around.',
        color: '#7c3aed',
        image: '/services/development.webp',
        subs: [
            { name: 'Web Development', detail: 'Marketing sites, e-commerce stores, custom builds engineered for speed and conversion' },
            { name: 'App Development', detail: 'Native and cross-platform apps built for real users, not just app-store screenshots' },
            { name: 'Performance Engineering', detail: 'Page speed, accessibility, and Core Web Vitals tuned so nothing slows growth down' },
            { name: 'Ongoing Maintenance', detail: 'We don\'t disappear at launch. Updates, monitoring, and support keep things running long after go-live' },
        ],
    },
    {
        id: 'brand', phase: 'IDENTITY', no: '04', title: 'Branding & Creative', headline: 'Don\'t just look good. Be memorable.',
        desc: 'A brand isn\'t a logo file — it\'s every impression people form of you. We build identities that hold their shape across every screen, page, and platform.',
        color: '#6d28d9',
        image: '/services/branding.webp',
        subs: [
            { name: 'Brand Identity', detail: 'Logo, design system, brand guidelines' },
            { name: 'Graphic Design', detail: 'Campaign creative, social assets, print collateral' },
            { name: 'Messaging & Voice', detail: 'What you say, how you say it, and why it sticks' },
            { name: 'Video & Photography', detail: 'Real, in-house production — no stock footage' },
        ],
    },
    {
        id: 'social', phase: 'ENGAGEMENT', no: '05', title: 'Social Media', headline: 'Social that actually works',
        desc: 'Followers are easy. A real audience isn\'t. We build consistent social presence, on-brand, and built to convert — not just rack up likes.',
        color: '#c084fc',
        image: '/services/socialmedia.webp',
        subs: [
            { name: 'Content Calendars', detail: 'Planned, not improvised' },
            { name: 'Community Management', detail: 'Actual conversations, not silence' },
            { name: 'Platform Strategy', detail: 'Focused effort where your audience actually is' },
            { name: 'Performance Reporting', detail: 'Data that tells you what to do next' },
        ],
    },
    {
        id: 'strategy', phase: 'GROWTH', no: '06', title: 'Growth Strategy', headline: 'One roadmap. No guesswork.',
        desc: 'Disconnected tactics don\'t compound. A plan does. We build the roadmap that ties every channel to one goal — and we run it.',
        color: '#a855f7',
        image: '/services/growthstrategy.webp',
        subs: [
            { name: 'Growth Audits', detail: 'Where you\'re leaking opportunity' },
            { name: 'Road mapping', detail: 'Quarter-by-quarter priorities, sequenced by impact' },
            { name: 'Cross-Channel Strategy', detail: 'SEO, paid, brand, and product, working toward the same numbers' },
            { name: 'Reporting & Iteration', detail: 'Real numbers, reviewed on a real cadence, with changes made when the data calls for it' },
        ],
    },
]

export default function Services() {
    const [active, setActive] = useState(0)
    const reduce = useReducedMotion()
    const current = SERVICES[active]
    const pausedRef = useRef(false)
    const sectionRef = useRef(null)
    const visibleRef = useRef(false)

    // Auto-rotate every 2s, pause on hover or when offscreen / reduced motion
    useEffect(() => {
        if (reduce) return

        const el = sectionRef.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { visibleRef.current = e.isIntersecting },
            { threshold: 0.1 }
        )
        obs.observe(el)

        const id = setInterval(() => {
            if (pausedRef.current || !visibleRef.current) return
            setActive((prev) => (prev + 1) % SERVICES.length)
        }, 2000)

        return () => { clearInterval(id); obs.disconnect() }
    }, [reduce])

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
                            Digital Marketing services
                            <br />
                            <span className="italic text-gradient-violet">at Diversify Digital Global.</span>
                        </h2>
                    </div>
                    <p className="max-w-[400px] text-[1rem] text-white/65 md:text-right">
                        Every service we offer plays a role in one connected growth system. Nothing works in isolation —
                        each stage builds on the last.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr]">
                    <div
                        className="flex flex-col border-t border-white/[0.08]"
                        onMouseEnter={() => { pausedRef.current = true }}
                        onMouseLeave={() => { pausedRef.current = false }}
                    >
                        {SERVICES.map((s, i) => {
                            const isActive = active === i
                            return (
                                <button
                                    key={s.id}
                                    onClick={() => setActive(i)}
                                    className={`group flex items-center gap-4 border-b border-white/[0.08] py-5 text-left transition-all duration-500 ${isActive ? '' : 'hover:bg-white/[0.02]'}`}
                                >
                                    <span className={`font-mono text-[0.65rem] transition-colors duration-300 ${isActive ? 'text-violet-300' : 'text-white/25'}`}>{s.no}</span>
                                    <span className="flex-1">
                                        <span className={`block font-serif text-[clamp(1.1rem,2vw,1.4rem)] transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white/70'}`}>{s.title}</span>
                                        <span className={`block font-mono text-[0.6rem] uppercase tracking-wide transition-colors duration-300 ${isActive ? 'text-violet-300/70' : 'text-white/20'}`}>{s.phase}</span>
                                    </span>
                                    <span className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.7)]' : 'bg-white/15'}`} />
                                </button>
                            )
                        })}
                    </div>

                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current.id}
                                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, ease: EASE }}
                                className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 sm:p-10 md:p-12 backdrop-blur-sm"
                            >
                                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-violet-300/70">{current.phase}</span>
                                <h3 className="mt-4 display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight text-white">{current.headline}</h3>
                                <p className="mt-5 text-[0.98rem] leading-[1.7] text-white/65">{current.desc}</p>

                                {/* Sub-services grid */}
                                <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {current.subs.map((sub) => (
                                        <div key={sub.name} className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 transition-colors duration-300 hover:border-violet-500/20 hover:bg-violet-500/[0.04]">
                                            <span className="block text-[0.85rem] font-medium text-white/80">{sub.name}</span>
                                            <span className="mt-1 block text-[0.78rem] leading-relaxed text-white/40">{sub.detail}</span>
                                        </div>
                                    ))}
                                </div>

                                <a href={REGISTER_CLIENT_URL} className="link-underline mt-8 inline-flex text-violet-300">
                                    Discuss {current.title.toLowerCase()}
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </a>

                                {/* Service image below text */}
                                <div className="mt-8 flex items-center justify-center">
                                    <img
                                        src={current.image}
                                        alt={current.title}
                                        loading="lazy"
                                        draggable={false}
                                        className="h-[200px] w-[200px] object-contain sm:h-[260px] sm:w-[260px]"
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="mt-6 flex justify-center gap-2">
                            {SERVICES.map((_, i) => (
                                <button key={i} onClick={() => setActive(i)} aria-label={`Service ${i + 1}`}
                                    className={`h-1 rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-violet-400' : 'w-1 bg-white/20 hover:bg-white/30'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Why Choose Diversify Digital Global */}
                <div className="mt-24 border-t border-white/[0.06] pt-16">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr]">
                        <div>
                            <span className="label label-line text-violet-300/80">The difference</span>
                            <h3 className="mt-6 display text-[clamp(1.8rem,4vw,3rem)] leading-[1.08] text-white">
                                Why Choose Diversify Digital Global for{' '}
                                <span className="italic text-gradient-violet">Digital Marketing Services?</span>
                            </h3>
                        </div>
                        <div className="flex flex-col gap-4">
                            {[
                                { title: 'Strategy before tactics', desc: 'Every channel ties back to a real roadmap, not a checklist' },
                                { title: 'Built for the AI-era search', desc: 'Optimized for both traditional rankings and AI-driven discovery' },
                                { title: 'Technical foundation that supports growth', desc: 'Speed, structure, and clean code, done right' },
                                { title: 'Conversion is part of the plan', desc: 'Built to turn visitors into leads, not just clicks' },
                                { title: 'Measurement that connects to revenue', desc: 'Tracked against pipeline and revenue, not vanity metrics' },
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
            </div>
        </section>
    )
}
