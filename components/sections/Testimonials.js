'use client'

import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const ITEMS = [
    {
        quote: 'Diversify handle everything — our site, our graphics, our social, our SEO — as one team. It feels less like hiring an agency and more like adding a department.',
        name: 'Ahsan Chaudhary',
        role: 'Managing Director',
        company: 'Trendwood',
    },
    {
        quote: 'They understood what we were building from day one. The app and the site came together exactly as we needed, and they kept the whole rollout calm and on schedule.',
        name: 'Georgie',
        role: 'Founder',
        company: 'Agora',
    },
    {
        quote: 'From the website to the ad campaigns to the design work, everything finally speaks with one voice. Our online presence went from scattered to something we are proud of.',
        name: 'Umer Shabbir',
        role: 'Founder',
        company: 'Fitoo',
    },
    {
        quote: 'The campaigns and the video work are tied together properly. Every recommendation comes back to a real business outcome, never a vanity metric.',
        name: 'Ihsanullah',
        role: 'Director',
        company: 'Eyesight Ltd.',
    },
]

export default function Testimonials() {
    const [index, setIndex] = useState(0)
    const [dir, setDir] = useState(1)
    const reduce = useReducedMotion()

    const go = useCallback(
        (next) => {
            const n = (next + ITEMS.length) % ITEMS.length
            setDir(next > index ? 1 : -1)
            setIndex(n)
        },
        [index]
    )

    useEffect(() => {
        if (reduce) return
        const id = setInterval(() => {
            setDir(1)
            setIndex((i) => (i + 1) % ITEMS.length)
        }, 7000)
        return () => clearInterval(id)
    }, [reduce])

    const active = ITEMS[index]

    return (
        <section
            id="testimonials"
            className="relative overflow-hidden bg-[#0d0b14] py-[clamp(6rem,12vw,10rem)]"
        >
            {/* Calmer ambient — the pace slows down */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-violet-600/[0.10] blur-[180px]" />
            <div className="absolute inset-0 noise" />

            <div className="container relative z-10">
                {/* Header */}
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <span className="label label-line text-violet-400/60">Client stories</span>
                        <h2 className="mt-6 display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.05] text-white/90">
                            Don&apos;t take
                            <span className="italic text-gradient-violet"> our word for it.</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => go(index - 1)}
                            aria-label="Previous"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-white/25 hover:text-white"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                                <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => go(index + 1)}
                            aria-label="Next"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-white/25 hover:text-white"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Quote */}
                <div className="relative mt-16 min-h-[280px] md:min-h-[260px]">
                    {/* Big quotation mark */}
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-8 -left-2 select-none font-serif text-[8rem] leading-none text-violet-500/15 md:-top-12 md:text-[12rem]"
                    >
                        &ldquo;
                    </span>

                    <AnimatePresence mode="wait" custom={dir}>
                        <motion.div
                            key={index}
                            custom={dir}
                            initial={(d) => reduce ? { opacity: 0 } : { opacity: 0, x: d * 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={(d) => reduce ? { opacity: 0 } : { opacity: 0, x: d * -30 }}
                            transition={{ duration: 0.6, ease: EASE }}
                            className="relative"
                        >
                            <blockquote>
                                <p className="max-w-[56rem] display text-[clamp(1.4rem,3.2vw,2.6rem)] leading-[1.3] text-white/90">
                                    {active.quote}
                                </p>
                            </blockquote>

                            <div className="mt-10 flex flex-wrap items-center gap-5">
                                <span className="h-px w-12 bg-gradient-to-r from-violet-400/50 to-transparent" />
                                <div>
                                    <p className="font-serif text-lg text-white/80">{active.name}</p>
                                    <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-wide text-white/45">
                                        {active.role} · {active.company}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Selector dots */}
                <div className="mt-12 flex items-center gap-3">
                    {ITEMS.map((t, i) => (
                        <button
                            key={t.name}
                            onClick={() => go(i)}
                            aria-label={`Testimonial from ${t.name}`}
                            className={`group flex items-center gap-3 rounded-full border px-4 py-2 font-mono text-[0.65rem] uppercase tracking-wide transition-all duration-500 ${i === index
                                ? 'border-violet-500/30 bg-violet-500/10 text-violet-300'
                                : 'border-white/[0.06] text-white/25 hover:border-white/15 hover:text-white/40'
                                }`}
                        >
                            <span className="h-1 w-1 rounded-full bg-current" />
                            {t.company}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}
