'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from './motion'
import { REGISTER_CLIENT_URL } from './links'

const EASE = [0.22, 1, 0.36, 1]

const PATHS = [
    {
        n: '01',
        badge: 'One clear outcome',
        title: 'Start a project',
        desc: 'Perfect for a defined goal — a new website, a rebrand, an SEO overhaul or a launch campaign. Fixed scope, clear deliverables, a firm timeline.',
        points: ['Scoped deliverables', 'Fixed timeline & price', 'Launch-ready handover'],
        cta: 'Scope a project',
        href: REGISTER_CLIENT_URL,
        featured: false,
    },
    {
        n: '02',
        badge: 'Ongoing growth',
        title: 'Grow on a retainer',
        desc: 'Your marketing team on demand. A monthly partnership across any of our services, with a roadmap that compounds results month after month.',
        points: ['Dedicated team', 'Priority turnaround', 'Monthly strategy & reporting'],
        cta: 'Become a partner',
        href: REGISTER_CLIENT_URL,
        featured: true,
    },
]

export default function Paths() {
    const [hovered, setHovered] = useState(null)
    const reduce = useReducedMotion()

    return (
        <section id="engagements" className="section relative grain bg-primary text-ivory">
            <div className="container relative z-10">
                <Reveal className="grid grid-cols-1 items-end gap-6 md:grid-cols-2">
                    <div>
                        <div className="label label-line text-sand">How we work together</div>
                        <h2 className="mt-6 display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] text-ivory">
                            Two ways to
                            <br />
                            <span className="italic text-sand">work with us.</span>
                        </h2>
                    </div>
                    <p className="max-w-[400px] text-ivory/60 md:justify-self-end md:text-right">
                        Every service we offer can be delivered as a focused, one-off project or an
                        ongoing partnership. Pick the model that fits where your brand is right now.
                    </p>
                </Reveal>

                <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[24px] border border-white/12 md:grid-cols-2">
                    {PATHS.map((p, i) => (
                        <motion.a
                            key={p.n}
                            href={p.href}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-10% 0px' }}
                            transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
                            className={`group relative flex flex-col p-8 transition-colors duration-500 ease-editorial md:p-12 ${hovered === i ? 'bg-ivory text-primary' : 'bg-white/[0.03] text-ivory'
                                }`}
                        >
                            {p.featured && (
                                <span
                                    className={`absolute right-6 top-6 rounded-full px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-500 md:right-12 md:top-12 ${hovered === i ? 'bg-primary text-ivory' : 'bg-sand text-primary'
                                        }`}
                                >
                                    Most popular
                                </span>
                            )}

                            <div className="flex items-center justify-between">
                                <span className="font-sans text-xs uppercase tracking-editorial opacity-60">
                                    {p.badge}
                                </span>
                                <span className="font-sans text-xs tracking-editorial opacity-40">{p.n}</span>
                            </div>

                            <h3 className="mt-10 display text-[clamp(1.8rem,3.6vw,2.8rem)] leading-tight">
                                {p.title}
                            </h3>
                            <p
                                className={`mt-4 max-w-[360px] text-[0.98rem] transition-colors duration-500 ${hovered === i ? 'text-ink/70' : 'text-ivory/60'
                                    }`}
                            >
                                {p.desc}
                            </p>

                            <ul className="mt-8 flex flex-col gap-3">
                                {p.points.map((pt) => (
                                    <li
                                        key={pt}
                                        className={`flex items-center gap-3 text-[0.92rem] transition-colors duration-500 ${hovered === i ? 'text-ink/80' : 'text-ivory/75'
                                            }`}
                                    >
                                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current opacity-60">
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 6 9 17l-5-5" />
                                            </svg>
                                        </span>
                                        {pt}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-12 flex items-center gap-3 pt-8">
                                <span className="link-underline">{p.cta}</span>
                                <span
                                    className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 ease-editorial ${hovered === i
                                        ? 'border-primary bg-primary text-ivory'
                                        : 'border-white/25 text-ivory'
                                        }`}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 ease-editorial group-hover:translate-x-0.5">
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    )
}
