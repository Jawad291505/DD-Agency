'use client'

import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Reveal } from '@/lib/motion'

const EASE = [0.22, 1, 0.36, 1]

// No portraits — clients are represented by name and title only.
const ITEMS = [
    {
        quote:
            'Diversify handle everything — our site, our graphics, our social, our SEO — as one team. It feels less like hiring an agency and more like adding a department.',
        name: 'Ahsan Chaudhary',
        role: 'Managing Director',
        company: 'Trendwood',
        service: 'Web · Social · SEO',
    },
    {
        quote:
            'They understood what we were building from day one. The app and the site came together exactly as we needed, and they kept the whole rollout calm and on schedule.',
        name: 'Georgie',
        role: 'Founder',
        company: 'Agora',
        service: 'App · Web Development',
    },
    {
        quote:
            'From the website to the ad campaigns to the design work, everything finally speaks with one voice. Our online presence went from scattered to something we are proud of.',
        name: 'Umer Shabbir',
        role: 'Founder',
        company: 'Fitoo',
        service: 'Web · Ads · SEO',
    },
    {
        quote:
            'The campaigns and the video work are tied together properly. Every recommendation comes back to a real business outcome, never a vanity metric.',
        name: 'Ihsanullah',
        role: 'Director',
        company: 'Eyesight Ltd.',
        service: 'Ad Campaigns · Video',
    },
]

export default function Testimonials() {
    const [index, setIndex] = useState(0)
    const [dir, setDir] = useState(1)
    const reduce = useReducedMotion()

    const go = useCallback(
        (next) => {
            setDir(next > index || (index === ITEMS.length - 1 && next === 0) ? 1 : -1)
            setIndex((next + ITEMS.length) % ITEMS.length)
        },
        [index]
    )

    useEffect(() => {
        if (reduce) return
        const id = setInterval(() => {
            setDir(1)
            setIndex((i) => (i + 1) % ITEMS.length)
        }, 6500)
        return () => clearInterval(id)
    }, [reduce])

    const active = ITEMS[index]

    const variants = {
        enter: (d) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * 40 }),
        center: { opacity: 1, x: 0 },
        exit: (d) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * -40 }),
    }

    return (
        <section
            id="testimonials"
            className="section relative grain overflow-hidden bg-gradient-to-b from-ink via-violet-900 to-violet-900 text-paper"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-40 top-1/4 hidden h-[30rem] w-[30rem] rounded-full bg-violet-bright/20 blur-[150px] md:block"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 bottom-0 hidden h-[26rem] w-[26rem] rounded-full bg-violet/25 blur-[150px] md:block"
            />

            <div className="container relative z-10">
                <Reveal className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="label label-line text-violet-light">Client stories</div>
                        <h2 className="mt-6 display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.05] text-paper">
                            Don&apos;t take
                            <span className="italic text-gradient-light"> our word for it.</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => go(index - 1)}
                            aria-label="Previous testimonial"
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-paper transition-all duration-300 ease-editorial hover:border-transparent hover:bg-paper hover:text-ink"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5" />
                                <path d="m12 19-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => go(index + 1)}
                            aria-label="Next testimonial"
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-paper transition-all duration-300 ease-editorial hover:border-transparent hover:bg-paper hover:text-ink"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </Reveal>

                {/* Quote */}
                <div className="relative min-h-[320px] md:min-h-[300px]">
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-10 -left-2 select-none font-serif text-[8rem] leading-none text-gradient-light md:-top-16 md:text-[12rem]"
                    >
                        &ldquo;
                    </span>

                    <AnimatePresence mode="wait" custom={dir}>
                        <motion.div
                            key={index}
                            custom={dir}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.6, ease: EASE }}
                            className="relative"
                        >
                            <blockquote>
                                <p className="max-w-[62rem] display text-[clamp(1.5rem,3.6vw,2.9rem)] leading-[1.24] text-paper">
                                    {active.quote}
                                </p>
                            </blockquote>

                            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
                                <span className="h-px w-12 bg-gradient-to-r from-violet-bright to-transparent" />
                                <div>
                                    <p className="font-serif text-xl text-paper">{active.name}</p>
                                    <p className="mt-1 font-mono text-[0.72rem] uppercase tracking-wide text-paper/55">
                                        {active.role} · {active.company}
                                    </p>
                                </div>
                                <span className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-[0.66rem] font-medium uppercase tracking-wide text-violet-light">
                                    {active.service}
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Client selector — name + title, no imagery */}
                <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/12 sm:grid-cols-2 lg:grid-cols-4">
                    {ITEMS.map((t, i) => {
                        const isActive = i === index
                        return (
                            <button
                                key={t.name}
                                type="button"
                                onClick={() => go(i)}
                                aria-current={isActive}
                                className={`group relative p-6 text-left transition-all duration-500 ease-editorial ${isActive
                                    ? 'bg-gradient-to-br from-violet to-violet-deep'
                                    : 'bg-white/[0.03] hover:bg-white/[0.06]'
                                    }`}
                            >
                                <span
                                    className={`font-mono text-[0.66rem] transition-colors duration-300 ${isActive ? 'text-paper/60' : 'text-violet-light'
                                        }`}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <p className="mt-3 font-serif text-[1.15rem] leading-tight text-paper">
                                    {t.name}
                                </p>
                                <p
                                    className={`mt-1 font-mono text-[0.68rem] uppercase tracking-wide transition-colors duration-300 ${isActive ? 'text-paper/60' : 'text-paper/40'
                                        }`}
                                >
                                    {t.role} · {t.company}
                                </p>
                                <span
                                    className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-violet-bright transition-transform duration-500 ease-editorial ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                        }`}
                                />
                            </button>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
