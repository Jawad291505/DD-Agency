'use client'

import { useRef, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const STAGES = [
    { no: '01', phase: 'Attention', headline: 'A signal goes out', desc: 'Your brand enters the digital landscape. First impressions form in milliseconds — we make sure yours lands.' },
    { no: '02', phase: 'Discovery', headline: 'Intent takes over', desc: 'A signal becomes a search. We make sure you\'re the answer they find first.' },
    { no: '03', phase: 'Experience', headline: 'They land. It has to hold.', desc: 'The site, the app, the page — this is where interest either converts or walks away.' },
    { no: '04', phase: 'Identity', headline: 'They start to remember you', desc: 'Consistent brand and creative turn a one-time visitor into someone who knows your name.' },
    { no: '05', phase: 'Engagement', headline: 'The relationship builds', desc: 'Social and content keep the conversation going long after the first click.' },
    { no: '06', phase: 'Growth', headline: 'It all compounds', desc: 'Every stage feeds the next. The engine keeps running — and the numbers keep climbing.' },
]

/**
 * Canvas reads progress from a ref (no re-renders, no effect churn).
 * One continuous rAF loop — zero teardown/setup on scroll.
 */
function JourneyCanvas({ progressRef, reduce }) {
    const canvasRef = useRef(null)
    const particlesRef = useRef([])
    const rafRef = useRef(null)
    const sizeRef = useRef({ w: 0, h: 0 })
    const visibleRef = useRef(false)

    useEffect(() => {
        if (reduce) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const resize = () => {
            const w = canvas.offsetWidth
            const h = canvas.offsetHeight
            const isMobile = w < 768
            const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio, 2)
            canvas.width = w * dpr
            canvas.height = h * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            sizeRef.current = { w, h }
            const count = isMobile ? 25 : 60
            particlesRef.current = Array.from({ length: count }, () => ({
                baseX: Math.random() * w, baseY: Math.random() * h,
                x: Math.random() * w, y: Math.random() * h,
                r: 1 + Math.random() * 2, phase: Math.random() * Math.PI * 2,
            }))
        }

        resize()
        window.addEventListener('resize', resize)

        const observer = new IntersectionObserver(
            ([entry]) => { visibleRef.current = entry.isIntersecting },
            { threshold: 0 }
        )
        observer.observe(canvas)

        // Single continuous rAF loop — reads progressRef.current each frame
        const draw = () => {
            if (!visibleRef.current) {
                rafRef.current = requestAnimationFrame(draw)
                return
            }
            const { w, h } = sizeRef.current
            if (!w || !h) { rafRef.current = requestAnimationFrame(draw); return }
            ctx.clearRect(0, 0, w, h)
            const particles = particlesRef.current
            const p = progressRef.current
            const time = performance.now() * 0.001
            const cx = w / 2
            const cy = h / 2

            particles.forEach((pt, i) => {
                let tx, ty
                const angle = (i / particles.length) * Math.PI * 2 + time * 0.3

                if (p < 0.17) {
                    tx = pt.baseX + Math.sin(time + pt.phase) * 20
                    ty = pt.baseY + Math.cos(time + pt.phase) * 20
                } else if (p < 0.33) {
                    const blend = (p - 0.17) / 0.16
                    tx = pt.baseX + (cx + Math.cos(angle * 3) * 100 - pt.baseX) * blend
                    ty = pt.baseY + (cy + Math.sin(angle * 2) * 80 - pt.baseY) * blend
                } else if (p < 0.5) {
                    tx = cx + Math.sin(angle + time) * (80 + i * 0.5)
                    ty = cy + (i / particles.length) * h * 0.5 - h * 0.25 + Math.sin(time * 2 + i) * 10
                } else if (p < 0.67) {
                    const ring = (i % 3) * 40 + 40
                    tx = cx + Math.cos(angle + time * 0.5) * ring
                    ty = cy + Math.sin(angle + time * 0.5) * ring * 0.6
                } else if (p < 0.83) {
                    const convergence = (p - 0.67) / 0.16
                    const ring = 120 * (1 - convergence * 0.8)
                    tx = cx + Math.cos(angle) * ring
                    ty = cy + Math.sin(angle) * ring * 0.5
                } else {
                    const explosion = (p - 0.83) / 0.17
                    const radius = 30 + explosion * 180
                    tx = cx + Math.cos(angle + explosion * 2) * radius
                    ty = cy + Math.sin(angle + explosion * 2) * radius * 0.6
                }

                pt.x += (tx - pt.x) * 0.08
                pt.y += (ty - pt.y) * 0.08

                // Connections (skip on small screens for perf)
                if (w >= 768) {
                    const maxDist = p > 0.5 ? 80 : 100
                    for (let j = i + 1; j < particles.length; j++) {
                        const pt2 = particles[j]
                        const dx = pt.x - pt2.x, dy = pt.y - pt2.y
                        const dist = Math.sqrt(dx * dx + dy * dy)
                        if (dist < maxDist) {
                            ctx.beginPath()
                            ctx.moveTo(pt.x, pt.y)
                            ctx.lineTo(pt2.x, pt2.y)
                            ctx.strokeStyle = `rgba(124,58,237,${(1 - dist / maxDist) * (0.06 + p * 0.08)})`
                            ctx.lineWidth = 0.5
                            ctx.stroke()
                        }
                    }
                }

                const glow = 0.15 + p * 0.2
                ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.r * 2.5, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(167,139,250,${glow})`; ctx.fill()
                ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(167,139,250,${0.3 + p * 0.5})`; ctx.fill()
            })

            rafRef.current = requestAnimationFrame(draw)
        }

        rafRef.current = requestAnimationFrame(draw)
        return () => {
            cancelAnimationFrame(rafRef.current)
            observer.disconnect()
            window.removeEventListener('resize', resize)
        }
    }, [reduce, progressRef])

    if (reduce) return null

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full pointer-events-none"
            aria-hidden="true"
        />
    )
}

export default function GrowthJourney() {
    const sectionRef = useRef(null)
    const progressRef = useRef(0)
    const [activeStage, setActiveStage] = useState(0)
    const reduce = useReducedMotion()
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(window.innerWidth < 768)
    }, [])

    useEffect(() => {
        let ticking = false
        let lastStage = -1
        const section = sectionRef.current
        // Query the progress bars/labels once — not on every scroll frame.
        const bars = section ? section.querySelectorAll('[data-progress-bar]') : []
        const labels = section ? section.querySelectorAll('[data-progress-label]') : []
        const onScroll = () => {
            if (ticking) return
            ticking = true
            requestAnimationFrame(() => {
                if (!section) { ticking = false; return }
                const rect = section.getBoundingClientRect()
                const vh = window.innerHeight
                const p = Math.max(0, Math.min(1, -rect.top / (rect.height - vh)))
                progressRef.current = p
                const stage = Math.min(STAGES.length - 1, Math.floor(p * STAGES.length))
                // Only re-render React when the stage actually changes
                if (stage !== lastStage) {
                    lastStage = stage
                    setActiveStage(stage)
                }
                // Update progress bars via DOM directly to avoid re-renders
                bars.forEach((bar, i) => {
                    bar.style.width = i < stage ? '100%' : i === stage ? `${(p * STAGES.length - stage) * 100}%` : '0%'
                })
                labels.forEach((label, i) => {
                    label.style.color = i <= stage ? 'rgba(167,139,250,0.6)' : 'rgba(255,255,255,0.15)'
                })
                ticking = false
            })
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const current = STAGES[activeStage]

    return (
        <section
            ref={sectionRef}
            id="journey"
            className="relative bg-[#100b20]"
            style={{ height: isMobile ? '250vh' : '400vh' }}
        >
            <div className="sticky top-0 h-screen overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-grid" style={{
                        opacity: 0.22,
                        maskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 70%)',
                        WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 70%)',
                    }} />
                    <JourneyCanvas progressRef={progressRef} reduce={reduce} />

                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/25 blur-[130px]"
                        style={{
                            width: '450px',
                            height: '450px',
                            opacity: 0.6,
                        }}
                    />
                </div>

                <div className="container relative z-10 flex h-full items-center">
                    <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
                        <div className="flex flex-col justify-center text-center lg:text-left">
                            <span className="label label-line mx-auto text-violet-400/60 lg:mx-0">The Growth Journey</span>

                            {/* Mobile concentric-ring visual with the stage number */}
                            <div className="relative mx-auto mt-8 flex h-[150px] w-[150px] items-center justify-center sm:h-[180px] sm:w-[180px] lg:hidden">
                                {[45, 70, 95].map((r) => (
                                    <div
                                        key={r}
                                        className="absolute rounded-full border border-violet-500/15"
                                        style={{ width: r * 2, height: r * 2 }}
                                    />
                                ))}
                                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-violet-600/10 blur-xl" />
                                <span className="relative font-mono text-[clamp(3rem,14vw,4.5rem)] font-light leading-none text-gradient-violet">
                                    {current.no}
                                </span>
                            </div>

                            <div className="mt-6 hidden items-baseline gap-4 sm:mt-8 lg:flex">
                                <span className="font-mono text-[clamp(3.5rem,10vw,8rem)] font-light leading-none text-gradient-violet">
                                    {current.no}
                                </span>
                                <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/25">/ 06</span>
                            </div>

                            <h3 className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-violet-400 sm:mt-4 sm:text-[0.75rem] lg:mt-4">
                                {current.phase}
                            </h3>
                            <h2 className="mt-2 sm:mt-3 display text-[clamp(1.9rem,6vw,3.2rem)] leading-tight text-white/90">
                                {current.headline}
                            </h2>
                            <p className="mx-auto mt-3 max-w-md text-[0.92rem] leading-relaxed text-white/55 sm:mt-4 sm:text-[0.95rem] lg:mx-0">
                                {current.desc}
                            </p>

                            <div className="mt-8 flex items-center gap-1.5 sm:mt-10 sm:gap-3">
                                {STAGES.map((_, i) => (
                                    <div key={i} className="flex-1">
                                        <div className="h-[2px] rounded-full bg-white/10 overflow-hidden">
                                            <div
                                                data-progress-bar
                                                className="h-full bg-violet-400"
                                                style={{
                                                    width: i < activeStage ? '100%' : '0%',
                                                    transition: 'width 0.15s linear',
                                                }}
                                            />
                                        </div>
                                        <span
                                            data-progress-label
                                            className="mt-1.5 sm:mt-2 hidden font-mono text-[0.45rem] uppercase tracking-wider sm:block sm:text-[0.55rem]"
                                            style={{ color: i <= activeStage ? 'rgba(167,139,250,0.6)' : 'rgba(255,255,255,0.15)' }}
                                        >
                                            {STAGES[i].phase}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="hidden lg:flex items-center justify-center">
                            <div className="relative h-[400px] w-[400px]">
                                {[80, 140, 200].map((r) => (
                                    <div
                                        key={r}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/10"
                                        style={{ width: r * 2, height: r * 2, opacity: 0.55 }}
                                    />
                                ))}
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-white/20">Stage</span>
                                    <span className="mt-1 display text-4xl text-gradient-violet">{current.no}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <span className="font-mono text-[0.5rem] sm:text-[0.55rem] uppercase tracking-[0.3em] text-white/20">
                        Scroll to drive growth
                    </span>
                    <div className="h-6 sm:h-8 w-px bg-gradient-to-b from-violet-400/40 to-transparent animate-pulse" />
                </div>
            </div>
        </section>
    )
}
