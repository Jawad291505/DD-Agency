'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from './motion'
import { REGISTER_CLIENT_URL, REGISTER_TRAINER_URL } from './links'

const EASE = [0.22, 1, 0.36, 1]

const PATHS = [
    {
        n: '01',
        badge: 'Be found',
        title: 'SEO that earns attention',
        desc: 'Build a search presence that compounds. We turn technical foundations and useful content into qualified organic growth.',
        points: ['Technical SEO & audits', 'Content strategy', 'Search performance tracking'],
        cta: 'Talk about SEO',
        href: REGISTER_CLIENT_URL,
        featured: true,
    },
    {
        n: '02',
        badge: 'Build better',
        title: 'Digital experiences that convert',
        desc: 'From first sketch to final launch, we create fast, memorable websites and digital systems that make your next move easier.',
        points: ['Web design & development', 'Conversion-led UX', 'Scalable digital solutions'],
        cta: 'Start a project',
        href: REGISTER_TRAINER_URL,
        featured: false,
    },
]

export default function Paths() {
    const [hovered, setHovered] = useState(null)
    const reduce = useReducedMotion()

    return (
        <section id="register" className="section bg-primary text-ivory">
            <div className="container">
                <Reveal className="grid grid-cols-1 items-end gap-6 md:grid-cols-2">
                    <div>
                        <div className="label label-line text-sand">What we do</div>
                        <h2 className="mt-6 display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] text-ivory">
                            Two ways to
                            <br />
                            <span className="italic text-sand">grow.</span>
                        </h2>
                    </div>
                    <p className="max-w-[400px] text-ivory/60 md:justify-self-end md:text-right">
                        Whether you need to be found, build something better, or scale what is already
                        working, we bring the strategy and craft to move your business forward.
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
