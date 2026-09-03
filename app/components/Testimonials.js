'use client'

import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { IMAGES } from './images'
import { Reveal } from './motion'

const EASE = [0.22, 1, 0.36, 1]

const ITEMS = [
    {
        quote:
            'Diversify turned a complicated offer into a digital experience people understand, trust and act on. They feel less like an agency and more like part of our team.',
        name: 'Maya Chen',
        role: 'Founder',
        company: 'Northstar Studio',
        service: 'Web Development · SEO',
        img: IMAGES.portrait,
    },
    {
        quote:
            'Their SEO and content work rebuilt our organic pipeline from the ground up. Every recommendation was tied back to a business outcome, not a vanity metric.',
        name: 'Daniel Ree',
        role: 'CMO',
        company: 'Lumen Health',
        service: 'SEO · Content',
        img: IMAGES.portrait2,
    },
    {
        quote:
            'The rebrand and new site completely changed how our market sees us. Every detail was considered, and the strategy behind it was airtight.',
        name: 'Priya Anand',
        role: 'CEO',
        company: 'Vertex Labs',
        service: 'Branding · Web',
        img: IMAGES.portrait3,
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
        <section id="testimonials" className="section relative grain overflow-hidden bg-violet-900 text-paper">
            <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-violet-bright/20 blur-[140px]" />
            <div className="container relative z-10">
                <Reveal className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="label label-line text-violet-light">Client stories</div>
                        <h2 className="mt-6 display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.05] text-paper">
                            Don&apos;t take
                            <span className="italic text-violet-light"> our word for it.</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => go(index - 1)}
                            aria-label="Previous testimonial"
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-paper transition-all duration-300 ease-editorial hover:bg-paper hover:text-ink"
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
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-paper transition-all duration-300 ease-editorial hover:bg-paper hover:text-ink"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                    <div className="relative lg:col-span-4">
                        <div className="relative mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-[24px] ring-1 ring-white/10">
                            <AnimatePresence mode="wait" custom={dir}>
                                <motion.img
                                    key={active.img}
                                    src={active.img}
                                    alt={`Portrait of ${active.name}`}
                                    loading="lazy"
                                    custom={dir}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.6, ease: EASE }}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            </AnimatePresence>
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-900/70 to-transparent" />
                        </div>
                    </div>

                    <div className="relative lg:col-span-8">
                        <svg
                            aria-hidden="true"
                            className="h-10 w-10 text-violet-light"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M9.5 4C6.5 5.8 5 8.6 5 12.5V20h7v-8H8.2c0-2.3 1-4 3.3-5.3L9.5 4zm10 0c-3 1.8-4.5 4.6-4.5 8.5V20h7v-8h-3.8c0-2.3 1-4 3.3-5.3L19.5 4z" />
                        </svg>

                        <AnimatePresence mode="wait" custom={dir}>
                            <motion.div
                                key={index}
                                custom={dir}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.6, ease: EASE }}
                            >
                                <blockquote>
                                    <p className="mt-4 display text-[clamp(1.5rem,3.4vw,2.7rem)] leading-[1.22] text-paper">
                                        {active.quote}
                                    </p>
                                </blockquote>
                                <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
                                    <div className="flex items-center gap-4">
                                        <span className="h-px w-10 bg-violet-bright" />
                                        <div>
                                            <p className="font-serif text-lg text-paper">
                                                {active.name}
                                            </p>
                                            <p className="font-mono text-[0.7rem] uppercase tracking-wide text-paper/50">
                                                {active.role}, {active.company}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-[0.66rem] font-medium uppercase tracking-wide text-violet-light">
                                        {active.service}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="mt-10 flex items-center gap-2.5">
                            {ITEMS.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => go(i)}
                                    aria-label={`Go to testimonial ${i + 1}`}
                                    aria-current={i === index}
                                    className={`h-1.5 rounded-full transition-all duration-500 ease-editorial ${i === index ? 'w-10 bg-violet-bright' : 'w-4 bg-white/25 hover:bg-white/40'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
