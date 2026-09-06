'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { REGISTER_CLIENT_URL } from '@/data/links'
import Magnetic from '@/components/ui/Magnetic'
import Counter from '@/components/ui/Counter'

const EASE = [0.22, 1, 0.36, 1]

// The rotating word reframes the promise without changing the sentence.
const ROTATING = ['get found.', 'get chosen.', 'get remembered.', 'grow faster.']

const STATS = [
    { v: '80+', k: 'Brands launched' },
    { v: '3.4x', k: 'Avg. traffic lift' },
    { v: '9', k: 'Years building' },
]

const MARQUEE = [
    'SEO',
    'Google Ads',
    'Meta Ads',
    'Web Development',
    'App Development',
    'Branding',
    'Social Media',
    'Content',
    'Graphic Design',
]

export default function Hero() {
    const reduce = useReducedMotion()
    const [word, setWord] = useState(0)
    const sectionRef = useRef(null)

    // Parallax for the oversized "Diversify Digital" watermark as the hero exits.
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    })
    const markX = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '-7%'])
    const markY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '8%'])
    const markOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.06, 0.045, 0])

    useEffect(() => {
        if (reduce) return
        const id = setInterval(() => setWord((w) => (w + 1) % ROTATING.length), 2600)
        return () => clearInterval(id)
    }, [reduce])

    const line = {
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: '110%' },
        show: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: EASE, delay: 0.15 + i * 0.12 },
        }),
    }

    const marquee = [...MARQUEE, ...MARQUEE]

    return (
        <section ref={sectionRef} id="top" className="relative isolate overflow-hidden bg-paper text-ink">
            {/* Oversized parallax watermark — anchored into the lower-right space */}
            <motion.div
                aria-hidden="true"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.45 }}
                className="pointer-events-none absolute inset-x-0 bottom-[9%] z-0 md:bottom-[13%]"
            >
                <motion.div
                    style={{ x: markX, y: markY, opacity: reduce ? 0.05 : markOpacity }}
                    className="pr-6 text-right will-change-transform md:pr-10"
                >
                    <span className="whitespace-nowrap font-serif font-light leading-none tracking-[-0.045em] text-ink [font-size:clamp(2.5rem,11vw,10rem)]">
                        Diversify Digital
                    </span>
                </motion.div>
            </motion.div>

            {/* Blueprint grid + ambient accents */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div
                    className="absolute inset-0 bg-grid-ink"
                    style={{
                        backgroundSize: '64px 64px',
                        maskImage:
                            'radial-gradient(ellipse 90% 70% at 50% 30%, black, transparent 80%)',
                        WebkitMaskImage:
                            'radial-gradient(ellipse 90% 70% at 50% 30%, black, transparent 80%)',
                    }}
                />
                <div className="absolute -right-40 top-10 hidden h-[34rem] w-[34rem] rounded-full bg-violet/20 blur-[130px] md:block" />
                <div className="absolute -left-40 bottom-10 hidden h-[28rem] w-[28rem] rounded-full bg-violet-bright/15 blur-[130px] md:block" />
            </div>

            <div className="container relative z-10 flex min-h-[100svh] flex-col justify-center pb-14 pt-[clamp(7rem,14vh,10rem)]">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="flex flex-wrap items-center gap-x-4 gap-y-2"
                >
                    <span className="label label-line text-ink/70">
                        Digital marketing &amp; solutions
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-surface/60 px-3.5 py-1.5 font-mono text-[0.7rem] font-medium text-ink/70 backdrop-blur-sm">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet" />
                        </span>
                        Taking on new projects for 2026
                    </span>
                </motion.div>

                <h1 className="mt-8 display text-[clamp(2.8rem,8.5vw,7rem)] leading-[0.9] tracking-[-0.03em] text-ink">
                    <span className="block overflow-hidden pb-[0.2em] -mb-[0.2em]">
                        <motion.span custom={0} variants={line} initial="hidden" animate="show" className="block">
                            We build brands
                        </motion.span>
                    </span>
                    <span className="block overflow-hidden pb-[0.2em] -mb-[0.2em]">
                        <motion.span custom={1} variants={line} initial="hidden" animate="show" className="block">
                            that don&apos;t just show up —
                        </motion.span>
                    </span>
                    <span className="block overflow-hidden pb-[0.55em] -mb-[0.55em]">
                        <motion.span
                            custom={2}
                            variants={line}
                            initial="hidden"
                            animate="show"
                            className="flex flex-wrap items-baseline gap-x-4"
                        >
                            <span>they</span>
                            <span className="relative inline-grid">
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.span
                                        key={word}
                                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: '0.5em' }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: '-0.5em' }}
                                        transition={{ duration: 0.5, ease: EASE }}
                                        className="col-start-1 row-start-1 whitespace-nowrap italic text-violet text-gradient"
                                    >
                                        {ROTATING[word]}
                                    </motion.span>
                                </AnimatePresence>
                            </span>
                        </motion.span>
                    </span>
                </h1>

                <div className="mt-9 grid grid-cols-1 gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
                        className="max-w-[540px] text-[1.05rem] leading-relaxed text-ink/70"
                    >
                        Diversify Digital is a full-service growth partner — SEO, paid media, web &amp; app
                        development, branding and creative, all under one roof. Strategy that thinks, work
                        that performs.
                    </motion.p>

                    {/* Inline stat trio */}
                    <motion.dl
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, ease: EASE, delay: 0.9 }}
                        className="flex gap-8 md:justify-end"
                    >
                        {STATS.map((m) => (
                            <div key={m.k}>
                                <dd className="display text-[clamp(1.8rem,4vw,2.6rem)] leading-none text-ink">
                                    <Counter value={m.v} />
                                </dd>
                                <dt className="mt-2 font-mono text-[0.66rem] uppercase tracking-wide text-ink/45">
                                    {m.k}
                                </dt>
                            </div>
                        ))}
                    </motion.dl>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.72 }}
                    className="mt-11 flex flex-wrap items-center gap-4"
                >
                    <Magnetic strength={0.5}>
                        <a href={REGISTER_CLIENT_URL} data-cursor-label="Let's talk" className="btn btn-lime">
                            Start your project
                        </a>
                    </Magnetic>
                    <Magnetic strength={0.4}>
                        <a href="#work" className="btn btn-outline-ink">
                            See our work
                        </a>
                    </Magnetic>
                </motion.div>
            </div>

            {/* Service marquee — deep violet band anchored to the base */}
            <div className="relative z-10 bg-violet-900 py-4 text-paper">
                <div className="marquee-hover overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                    <div className="flex w-max animate-marquee items-center gap-10 pr-10">
                        {marquee.map((s, i) => (
                            <span
                                key={`${s}-${i}`}
                                className="flex items-center gap-10 font-mono text-[0.76rem] font-medium uppercase tracking-wide text-paper/55"
                            >
                                {s}
                                <span className="h-1 w-1 rounded-full bg-violet-bright" />
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
