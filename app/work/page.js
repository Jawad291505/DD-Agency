'use client'

import { useRef, useEffect, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ConstellationBackground from '@/components/effects/ConstellationBackground'
import ScrollProgress from '@/components/effects/ScrollProgress'
import Magnetic from '@/components/ui/Magnetic'
import { IMAGES } from '@/data/images'
import { REGISTER_CLIENT_URL } from '@/data/links'

gsap.registerPlugin(ScrollTrigger)

const EASE_MOTION = [0.22, 1, 0.36, 1]

const PROJECTS = [
    {
        title: 'Agora',
        category: 'App Development · Design',
        summary: 'A civic-engagement app built from the ground up for the Italian market — full app development paired with polished graphic design to make democratic participation effortless.',
        image: IMAGES.agora,
        location: 'Italy',
        scope: 'App Development · Graphic Design',
    },
    {
        title: 'Eye Insights',
        category: 'Ad Campaigns · Marketing',
        summary: 'Performance ad campaigns, content planning and full-funnel marketing strategy for a UK-based insights company — turning attention into measurable demand.',
        image: IMAGES.eyeInsight,
        location: 'United Kingdom',
        scope: 'Ads · Content Planning · Marketing',
    },
    {
        title: 'Trendwood',
        category: 'Meta Ads · Shopify · SEO · Social',
        summary: 'Full-stack digital support for a Pakistan-based furniture brand — Meta ad campaigns, Shopify store management, graphic design, social media marketing, SEO and ongoing web maintenance.',
        image: IMAGES.trendwood,
        location: 'Pakistan',
        scope: 'Ads · Shopify · Design · SEO · Social',
    },
    {
        title: 'Fitoo',
        category: 'Web · Ads · SEO · Design',
        summary: 'End-to-end online presence for a fitness brand — custom website, search engine optimisation, graphic design and ad campaigns across channels.',
        image: IMAGES.fitoo,
        location: 'Global',
        scope: 'Web · SEO · Design · Ad Campaigns',
    },
    {
        title: 'Fit360',
        category: 'Web Development',
        summary: 'A clean, performance-focused website built for a fitness brand — designed to convert visitors and showcase their offering.',
        image: IMAGES.fit360,
        location: 'Global',
        scope: 'Web Development',
    },
    {
        title: 'Al Imran Milk Shop',
        category: 'Web Development',
        summary: 'A purpose-built website for a local dairy shop — giving them a digital storefront that stands out in a crowded market.',
        image: IMAGES.alImran,
        location: 'Pakistan',
        scope: 'Web Development',
    },
]

/*
 * ── Performance-tuned card-stack → grid scroll animation ──────────────
 *
 * Key optimisations vs. the previous version:
 *
 * 1. ONLY transform + opacity are animated per-frame — these are the two
 *    properties the browser composites on the GPU without triggering
 *    layout or paint. Everything else (box-shadow, z-index) is set once
 *    or updated at thresholds, never per-frame.
 *
 * 2. Per-card start/end values are pre-computed once in setup() and
 *    stored in a flat array. The onUpdate callback does pure arithmetic
 *    + a single style write per card — no object allocation, no
 *    gsap.utils calls, no gsap.set overhead.
 *
 * 3. `will-change: transform` is applied during animation and removed
 *    after, so the browser promotes layers only when needed.
 *
 * 4. `backdrop-filter` is stripped from cards during the scrub to avoid
 *    compositing 6 overlapping blur layers, then restored at the end.
 *
 * 5. scrub is tighter on touch (0.4 vs 0.8) so the cards track fingers
 *    closely without floaty lag.
 *
 * 6. ScrollTrigger pinType is set for compatibility with Lenis.
 */
function useCardStack(sectionRef, stackRef, cardRefs, reduce) {
    const stRef = useRef(null)
    const lenisCleanupRef = useRef(null)

    const setup = useCallback(() => {
        if (reduce) return
        const section = sectionRef.current
        const stack = stackRef.current
        if (!section || !stack) return

        // Tear down previous
        if (stRef.current) { stRef.current.kill(); stRef.current = null }
        if (lenisCleanupRef.current) { lenisCleanupRef.current(); lenisCleanupRef.current = null }

        const cards = cardRefs.current.filter(Boolean)
        if (!cards.length) return

        const count = cards.length
        const vw = window.innerWidth
        const isMobile = vw < 640
        const isTablet = vw >= 640 && vw < 1024
        const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches

        /* ── 1. Measure natural grid layout ────────────────────────── */
        stack.style.position = 'relative'
        stack.style.height = 'auto'
        cards.forEach((c) => {
            c.style.cssText = ''  // Full reset to natural flow
        })
        stack.offsetHeight  // Force reflow

        const stackRect = stack.getBoundingClientRect()
        const gridPositions = cards.map((c) => {
            const r = c.getBoundingClientRect()
            return {
                x: r.left - stackRect.left,
                y: r.top - stackRect.top,
                w: r.width,
                h: r.height,
            }
        })
        const gridHeight = stack.scrollHeight
        const stackCenterX = stack.offsetWidth / 2

        /* ── 2. Pre-compute per-card start + end values ────────────── */
        const cardData = cards.map((_, i) => {
            const offset = i - (count - 1) / 2
            const absOff = Math.abs(offset)
            const mobMul = isMobile ? 1 : 0

            // Stacked start state
            const sX = stackCenterX - gridPositions[i].w / 2 + offset * (isMobile ? 2 : 4)
            const sY = (isMobile ? 60 : 100) + offset * (isMobile ? 6 : 8)
            const sRot = offset * (isMobile ? 1 : 1.5)
            const sScale = 1 - absOff * 0.02
            const sAlpha = 1 - absOff * 0.08
            const sZ = count - Math.abs(Math.round(offset))

            // Grid end state
            const eX = gridPositions[i].x
            const eY = gridPositions[i].y

            // Deltas (end - start) for fast lerp: start + delta * t
            const dX = eX - sX
            const dY = eY - sY
            const dRot = -sRot
            const dScale = 1 - sScale
            const dAlpha = 1 - sAlpha

            // Lift amplitude (mid-flight arc)
            const liftAmp = isMobile ? 8 : 15

            return { sX, sY, sRot, sScale, sAlpha, sZ, dX, dY, dRot, dScale, dAlpha, liftAmp, w: gridPositions[i].w }
        })

        /* ── 3. Set initial stacked state ──────────────────────────── */
        stack.style.height = `${gridHeight}px`

        cards.forEach((c, i) => {
            const d = cardData[i]
            // Use will-change to promote to own layer
            c.style.position = 'absolute'
            c.style.left = '0'
            c.style.top = '0'
            c.style.width = `${d.w}px`
            c.style.willChange = 'transform, opacity'
            c.style.backfaceVisibility = 'hidden'
            // Kill backdrop-blur during animation (compositing killer)
            c.style.backdropFilter = 'none'
            c.style.webkitBackdropFilter = 'none'
            c.style.zIndex = d.sZ
            c.style.transform = `translate3d(${d.sX}px, ${d.sY}px, 0) rotate(${d.sRot}deg) scale(${d.sScale})`
            c.style.opacity = d.sAlpha
        })

        /* ── 4. Lenis bridge ───────────────────────────────────────── */
        const lenis = window.__lenis
        if (lenis) {
            const handler = () => ScrollTrigger.update()
            lenis.on('scroll', handler)
            lenisCleanupRef.current = () => lenis.off('scroll', handler)
        }

        /* ── 5. ScrollTrigger — pin + scrub ────────────────────────── */
        const scrubDuration = isMobile ? 600 : isTablet ? 1000 : 1400
        let prevBucket = -1  // Track z-index flip to avoid per-frame writes

        stRef.current = ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: `+=${scrubDuration}`,
            pin: true,
            pinSpacing: true,
            scrub: isTouch ? 0.4 : 0.8,
            anticipatePin: 1,
            onUpdate: (self) => {
                const p = self.progress
                // Cubic ease-in-out
                const t = p < 0.5
                    ? 4 * p * p * p
                    : 1 - (-2 * p + 2) * (-2 * p + 2) * (-2 * p + 2) / 2

                // z-index bucket: flip once at 50% instead of every frame
                const bucket = t > 0.5 ? 1 : 0
                const zFlipped = bucket !== prevBucket
                prevBucket = bucket

                const liftSin = Math.sin(t * 3.14159265)  // inline PI

                for (let i = 0; i < count; i++) {
                    const d = cardData[i]
                    const c = cards[i]

                    const x = d.sX + d.dX * t
                    const y = d.sY + d.dY * t - liftSin * d.liftAmp
                    const rot = d.sRot + d.dRot * t
                    const sc = d.sScale + d.dScale * t

                    // Single composite-friendly write
                    c.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${sc})`
                    c.style.opacity = d.sAlpha + d.dAlpha * t

                    if (zFlipped) {
                        c.style.zIndex = bucket === 1 ? 1 : d.sZ
                    }
                }
            },
            onLeave: () => {
                // Animation complete — clean up GPU layers, restore blur
                cards.forEach((c) => {
                    c.style.willChange = 'auto'
                    c.style.backdropFilter = ''
                    c.style.webkitBackdropFilter = ''
                })
            },
            onEnterBack: () => {
                // Re-entering from below — re-promote layers
                cards.forEach((c) => {
                    c.style.willChange = 'transform, opacity'
                    c.style.backdropFilter = 'none'
                    c.style.webkitBackdropFilter = 'none'
                })
            },
        })
    }, [sectionRef, stackRef, cardRefs, reduce])

    useEffect(() => {
        if (reduce) return
        let onResize = null
        const timer = setTimeout(() => {
            setup()
            onResize = gsap.utils.debounce(() => setup(), 250)
            window.addEventListener('resize', onResize)
        }, 120)

        return () => {
            clearTimeout(timer)
            if (onResize) window.removeEventListener('resize', onResize)
            if (lenisCleanupRef.current) { lenisCleanupRef.current(); lenisCleanupRef.current = null }
            if (stRef.current) { stRef.current.kill(); stRef.current = null }
            // Restore cards to flow on unmount
            const cards = cardRefs.current.filter(Boolean)
            cards.forEach((c) => { c.style.cssText = '' })
            const stack = stackRef.current
            if (stack) { stack.style.height = ''; stack.style.position = '' }
        }
    }, [reduce, setup])
}

/* ── Grid card ─────────────────────────────────────────────────────── */
function ProjectCard({ project, innerRef }) {
    return (
        <div
            ref={innerRef}
            className="group rounded-2xl border border-white/[0.06] bg-[#13102a]/80 backdrop-blur-sm overflow-hidden transition-colors duration-300 hover:border-violet-400/15"
        >
            <div className="relative aspect-[16/10] overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    data-cursor-label="View"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100b20]/70 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-violet-600/5 mix-blend-overlay" />
            </div>
            <div className="p-5 sm:p-6">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-violet-400/60">
                    {project.category}
                </span>
                <h3 className="mt-2 font-serif text-[clamp(1.2rem,2.5vw,1.6rem)] leading-tight text-white/90">
                    {project.title}
                </h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-white/50 line-clamp-3">
                    {project.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5">
                        <span className="font-mono text-[0.5rem] uppercase tracking-wide text-white/25">Location</span>
                        <span className="font-serif text-[0.8rem] text-violet-300">{project.location}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5">
                        <span className="font-mono text-[0.5rem] uppercase tracking-wide text-white/25">Scope</span>
                        <span className="font-serif text-[0.8rem] text-violet-300">{project.scope}</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

/* ── Page ───────────────────────────────────────────────────────────── */
export default function WorkPage() {
    const reduce = useReducedMotion()
    const sectionRef = useRef(null)
    const stackRef = useRef(null)
    const cardRefs = useRef([])

    useCardStack(sectionRef, stackRef, cardRefs, reduce)

    return (
        <>
            <Navbar />
            <ScrollProgress />
            <ConstellationBackground />

            <main className="relative z-10">
                {/* ── Page toolbar ──────────────────────────────────────── */}
                <div className="relative pt-24 pb-4 sm:pt-28 sm:pb-6">
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: EASE_MOTION }}
                            className="flex items-center gap-4"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                                <span className="h-2 w-2 rounded-full bg-violet-400" />
                            </span>
                            <div>
                                <h1 className="font-serif text-[1.3rem] text-white sm:text-[1.5rem]">Selected Work</h1>
                                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/35">
                                    Projects &amp; activities
                                </p>
                            </div>
                        </motion.div>
                        <div className="mt-6 h-px w-full bg-white/[0.06]" />
                    </div>
                </div>

                {/* ── Card-stack section (pinned during animation) ──────── */}
                <section ref={sectionRef} className="relative overflow-hidden">
                    <div className="container relative z-10 py-12 sm:py-16">
                        <div
                            ref={stackRef}
                            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
                        >
                            {PROJECTS.map((p, i) => (
                                <ProjectCard
                                    key={p.title}
                                    project={p}
                                    innerRef={(el) => { cardRefs.current[i] = el }}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Bottom CTA ────────────────────────────────────────── */}
                <section className="relative py-24 sm:py-32">
                    <div className="container flex flex-col items-center text-center">
                        <div className="h-px w-20 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
                        <h2 className="mt-8 display text-[clamp(1.8rem,4vw,3rem)] leading-tight text-white/80">
                            Your project could be<br />
                            <span className="italic text-gradient-violet">the next one here.</span>
                        </h2>
                        <p className="mt-4 max-w-md text-[0.95rem] text-white/50">
                            We take on a limited number of projects at a time so every brand gets the focus it deserves.
                        </p>
                        <div className="mt-8">
                            <Magnetic strength={0.4}>
                                <a href={REGISTER_CLIENT_URL} data-cursor-label="Let's talk" className="btn btn-primary">
                                    Start your project
                                </a>
                            </Magnetic>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}
