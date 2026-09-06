'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { IMAGES } from '@/data/images'
import { Reveal, Stagger, StaggerItem, ImageReveal } from '@/lib/motion'
import { REGISTER_CLIENT_URL } from '@/data/links'
import Counter from '@/components/ui/Counter'

const EASE = [0.22, 1, 0.36, 1]

/**
 * "About us" — a two-column section: a parallax image on the left, a
 * scroll-scrubbed manifesto on the right.
 *
 * Performance notes:
 *  - Each word's brightness is a framer MotionValue written straight to
 *    style.opacity on scroll — no React re-render, no layout.
 *  - The image parallax is a single translate on a pre-scaled image (no raster
 *    resize, fully compositor-driven).
 *  - The heading mask, light-sweep and badge run once on view.
 *  - Everything collapses to a static state for prefers-reduced-motion.
 */
const WORDS = [
    { t: 'We' }, { t: 'are' }, { t: 'a' },
    { t: 'full-service', a: true }, { t: 'growth', a: true }, { t: 'partner', a: true }, { t: '—' },
    { t: 'strategy,' }, { t: 'media,' }, { t: 'technology' }, { t: 'and' }, { t: 'creative' },
    { t: 'in' }, { t: 'one' }, { t: 'room,' },
    { t: 'run' }, { t: 'by' }, { t: 'senior', a: true }, { t: 'people,', a: true },
    { t: 'tied' }, { t: 'to' }, { t: 'real', a: true }, { t: 'outcomes,', a: true },
    { t: 'and' }, { t: 'built' }, { t: 'to' }, { t: 'last.', a: true },
]

const POINTS = [
    'Strategy that thinks before it spends.',
    'Senior people on the work, start to finish.',
    'Built to scale — long after launch day.',
]

const HEADING = ['One team,', 'every discipline,', 'one direction.']

function Word({ progress, index, total, word, reduce }) {
    const seg = 1 / total
    const start = Math.min(index * seg * 0.82, 0.95)
    const end = Math.min(start + seg * 2.6, 1)
    const opacity = useTransform(progress, [start, end], [0.14, 1])
    return (
        <>
            <motion.span
                style={reduce ? undefined : { opacity }}
                className={word.a ? 'text-violet' : 'text-ink'}
            >
                {word.t}
            </motion.span>{' '}
        </>
    )
}

export default function About() {
    const reduce = useReducedMotion()
    const sectionRef = useRef(null)
    const copyRef = useRef(null)

    // Parallax for the image while the whole section travels past.
    const { scrollYProgress: sectionProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })
    const imgY = useTransform(sectionProgress, [0, 1], reduce ? ['0%', '0%'] : ['-7%', '7%'])

    // Word-by-word illumination while the paragraph travels past.
    const { scrollYProgress: copyProgress } = useScroll({
        target: copyRef,
        offset: ['start 0.85', 'end 0.45'],
    })

    const maskLine = {
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: '110%' },
        show: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.9, ease: EASE, delay: 0.1 + i * 0.12 },
        }),
    }

    return (
        <section
            ref={sectionRef}
            id="about"
            className="section relative isolate torch overflow-hidden bg-paper"
        >
            <div className="container relative z-10">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    {/* Image */}
                    <div className="relative">
                        <ImageReveal>
                            <div
                                className="frame-gradient relative overflow-hidden rounded-[28px] shadow-glow"
                                style={{ '--frame-bg': '#F5F2FB' }}
                            >
                                <motion.img
                                    src={IMAGES.philosophy}
                                    alt="Abstract dimensional render representing Diversify Digital's craft"
                                    loading="lazy"
                                    style={{ y: imgY }}
                                    className="aspect-[4/5] w-full scale-[1.12] object-cover will-change-transform"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-900/55 via-transparent to-transparent" />
                                {/* one-time light sweep */}
                                {!reduce && (
                                    <motion.span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-violet-bright/35 to-transparent"
                                        initial={{ y: '-110%' }}
                                        whileInView={{ y: '420%' }}
                                        viewport={{ once: true, margin: '-10% 0px' }}
                                        transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.55 }}
                                    />
                                )}
                            </div>
                        </ImageReveal>

                        {/* Floating rating badge */}
                        <motion.div
                            initial={reduce ? false : { opacity: 0, y: 20, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: '-12% 0px' }}
                            transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
                            className="absolute -right-3 bottom-10 rounded-2xl bg-gradient-to-br from-violet-deep via-violet-900 to-ink p-5 text-paper shadow-lifted lg:-right-8"
                        >
                            <p className="display text-[clamp(1.8rem,4vw,2.6rem)] leading-none text-paper">
                                <Counter value="4.9" />
                                <span className="text-gradient-light">/5</span>
                            </p>
                            <p className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-wide text-paper/60">
                                Avg. client rating
                            </p>
                        </motion.div>
                    </div>

                    {/* Copy */}
                    <div>
                        <Reveal>
                            <div className="label label-line text-ink/60">About us</div>
                        </Reveal>

                        <h2 className="mt-6 display text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.06] text-ink">
                            {HEADING.map((l, i) => (
                                <span key={l} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                                    <motion.span
                                        custom={i}
                                        variants={maskLine}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true, margin: '-15% 0px' }}
                                        className={`block ${i === 2 ? 'italic text-gradient' : ''}`}
                                    >
                                        {l}
                                    </motion.span>
                                </span>
                            ))}
                        </h2>

                        <p
                            ref={copyRef}
                            className="mt-8 max-w-[36rem] display font-light text-[clamp(1.3rem,2.2vw,1.9rem)] leading-[1.45] tracking-[-0.01em]"
                        >
                            {WORDS.map((w, i) => (
                                <Word
                                    key={i}
                                    progress={copyProgress}
                                    index={i}
                                    total={WORDS.length}
                                    word={w}
                                    reduce={reduce}
                                />
                            ))}
                        </p>

                        <Stagger className="mt-10 flex flex-col gap-4">
                            {POINTS.map((p) => (
                                <StaggerItem key={p} className="flex items-start gap-3.5">
                                    <span className="mt-2 h-1.5 w-6 shrink-0 rounded-full bg-gradient-to-r from-violet to-violet-bright" />
                                    <span className="text-[1rem] leading-relaxed text-ink/70">{p}</span>
                                </StaggerItem>
                            ))}
                        </Stagger>

                        <Reveal delay={0.15}>
                            <a href={REGISTER_CLIENT_URL} className="btn btn-primary mt-10">
                                Work with us
                            </a>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
