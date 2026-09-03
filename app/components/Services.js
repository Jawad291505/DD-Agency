'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Reveal } from './motion'
import { REGISTER_CLIENT_URL } from './links'

const EASE = [0.22, 1, 0.36, 1]

const GROUPS = [
    {
        id: 'growth',
        no: '01',
        kicker: 'Digital Growth',
        title: 'Get found and get chosen',
        blurb: 'Demand generation across search and social that turns attention into pipeline.',
        services: [
            { name: 'SEO', value: 'Rank for what your buyers actually search.' },
            { name: 'Google Ads', value: 'Capture high-intent demand, profitably.' },
            { name: 'Meta Ads', value: 'Scroll-stopping campaigns that convert.' },
            { name: 'Social Media', value: 'Build an audience that buys and returns.' },
        ],
    },
    {
        id: 'technology',
        no: '02',
        kicker: 'Technology',
        title: 'Products that perform',
        blurb: 'Fast, scalable digital experiences engineered to convert and easy to grow with.',
        services: [
            { name: 'Web Development', value: 'Sites that load fast and sell harder.' },
            { name: 'App Development', value: 'Mobile products people come back to.' },
            { name: 'E-commerce', value: 'Storefronts built to lift order value.' },
            { name: 'Digital Solutions', value: 'Custom tooling that removes friction.' },
        ],
    },
    {
        id: 'creative',
        no: '03',
        kicker: 'Creative',
        title: 'Impossible to ignore',
        blurb: 'Brand and content systems that make you distinct, credible and memorable.',
        services: [
            { name: 'Branding', value: 'Identity that earns instant recognition.' },
            { name: 'Graphic Design', value: 'Considered visuals on every touchpoint.' },
            { name: 'Content Creation', value: 'Stories worth paying attention to.' },
            { name: 'Creative Direction', value: 'One consistent voice, everywhere.' },
        ],
    },
]

export default function Services() {
    const [open, setOpen] = useState('growth')
    const reduce = useReducedMotion()

    return (
        <section id="services" className="section relative grain overflow-hidden bg-violet-900 text-paper">
            <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-20 h-[30rem] w-[30rem] rounded-full bg-violet-bright/25 blur-[140px]" />
            <div className="container relative z-10">
                <Reveal className="grid grid-cols-1 items-end gap-8 md:grid-cols-2">
                    <div>
                        <div className="label label-line text-violet-light">What we do</div>
                        <h2 className="mt-6 display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] text-paper">
                            One partner for
                            <br />
                            <span className="italic text-violet-light">the whole journey.</span>
                        </h2>
                    </div>
                    <p className="max-w-[420px] text-paper/60 md:justify-self-end md:text-right">
                        No stitching together five vendors. Strategy, growth, technology and creative —
                        aligned, accountable, and pulling in the same direction.
                    </p>
                </Reveal>

                {/* Interactive accordion of service worlds */}
                <div className="mt-16 border-t border-white/12">
                    {GROUPS.map((g) => {
                        const isOpen = open === g.id
                        return (
                            <div key={g.id} className="border-b border-white/12">
                                <button
                                    type="button"
                                    onClick={() => setOpen(isOpen ? '' : g.id)}
                                    aria-expanded={isOpen}
                                    className="group flex w-full items-center gap-5 py-7 text-left md:gap-8 md:py-9"
                                >
                                    <span className={`font-mono text-sm transition-colors duration-300 ${isOpen ? 'text-violet-light' : 'text-paper/40'}`}>
                                        {g.no}
                                    </span>
                                    <span className="flex-1">
                                        <span
                                            className={`block display text-[clamp(1.9rem,5vw,3.4rem)] leading-[1.05] transition-colors duration-300 ${isOpen ? 'text-paper' : 'text-paper/55 group-hover:text-paper'}`}
                                        >
                                            {g.title}
                                        </span>
                                    </span>
                                    <span
                                        className={`hidden shrink-0 font-mono text-[0.7rem] uppercase tracking-wide sm:block ${isOpen ? 'text-violet-light' : 'text-paper/40'}`}
                                    >
                                        {g.kicker}
                                    </span>
                                    <span
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-editorial ${isOpen ? 'rotate-45 border-violet bg-violet text-paper' : 'border-white/25 text-paper group-hover:border-white/60'}`}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    </span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key="panel"
                                            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                                            animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                                            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: EASE }}
                                            className="overflow-hidden"
                                        >
                                            <div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-12 md:gap-8">
                                                <div className="md:col-span-4 md:pl-14">
                                                    <p className="max-w-[320px] text-paper/60">{g.blurb}</p>
                                                    <a
                                                        href={REGISTER_CLIENT_URL}
                                                        className="link-underline mt-6 inline-flex text-violet-light"
                                                    >
                                                        Discuss {g.kicker.toLowerCase()}
                                                    </a>
                                                </div>
                                                <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/12 sm:grid-cols-2 md:col-span-8">
                                                    {g.services.map((s, i) => (
                                                        <motion.div
                                                            key={s.name}
                                                            initial={reduce ? {} : { opacity: 0, y: 14 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.4, ease: EASE, delay: 0.08 + i * 0.05 }}
                                                            className="group/item relative bg-white/[0.03] p-6 transition-colors duration-500 hover:bg-violet hover:text-paper"
                                                        >
                                                            <span className="font-mono text-[0.66rem] text-violet-light transition-colors duration-500 group-hover/item:text-paper/60">
                                                                {String(i + 1).padStart(2, '0')}
                                                            </span>
                                                            <h4 className="mt-3 font-serif text-[1.3rem] leading-tight">{s.name}</h4>
                                                            <p className="mt-2 text-[0.9rem] leading-relaxed text-paper/55 transition-colors duration-500 group-hover/item:text-paper/80">
                                                                {s.value}
                                                            </p>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
