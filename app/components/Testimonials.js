'use client'

import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { IMAGES } from './images'
import { Reveal } from './motion'

const EASE = [0.22, 1, 0.36, 1]

const ITEMS = [
    {
        quote:
            'Diversify helped us turn a complicated offer into a digital experience that people understand, trust and act on. The growth has followed.',
        name: 'Maya Chen',
        role: 'Founder, Northstar Studio',
        img: IMAGES.portrait,
    },
    {
        quote:
            'Their SEO and content work doubled our organic pipeline in under a year. They feel less like an agency and more like part of our team.',
        name: 'Daniel Ree',
        role: 'CMO, Lumen Health',
        img: IMAGES.portrait2,
    },
    {
        quote:
            'The rebrand and new site completely changed how our market sees us. Every detail was considered, and the results speak for themselves.',
        name: 'Priya Anand',
        role: 'CEO, Vertex Labs',
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

    // Auto-advance, paused for reduced-motion users.
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
        <section id="testimonials" className="section bg-ivory">
            <div className="container">
                <Reveal className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="label label-line text-clay">Testimonials</div>
                        <h2 className="mt-6 display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] text-primary">
                            What our clients
                            <span className="italic text-clay"> say.</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => go(index - 1)}
                            aria-label="Previous testimonial"
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/25 text-primary transition-all duration-300 ease-editorial hover:border-primary hover:bg-primary hover:text-ivory"
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
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/25 text-primary transition-all duration-300 ease-editorial hover:border-primary hover:bg-primary hover:text-ivory"
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
                        <div className="relative mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-[24px]">
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
                        </div>
                    </div>

                    <div className="relative lg:col-span-8">
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
                                    <p className="display text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.2] text-primary">
                                        {active.quote}
                                    </p>
                                </blockquote>
                                <div className="mt-8 flex items-center gap-4">
                                    <span className="h-px w-10 bg-clay" />
                                    <div>
                                        <p className="font-serif text-lg text-primary">{active.name}</p>
                                        <p className="font-sans text-[0.72rem] uppercase tracking-editorial text-ink/50">
                                            {active.role}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Progress dots */}
                        <div className="mt-10 flex items-center gap-2.5">
                            {ITEMS.map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => go(i)}
                                    aria-label={`Go to testimonial ${i + 1}`}
                                    aria-current={i === index}
                                    className={`h-1.5 rounded-full transition-all duration-500 ease-editorial ${i === index ? 'w-10 bg-primary' : 'w-4 bg-ink/20 hover:bg-ink/40'
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
