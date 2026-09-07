'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import Magnetic from '@/components/ui/Magnetic'
import { REGISTER_CLIENT_URL } from '@/data/links'
import { onAppReady } from '@/lib/ready'

const EASE = [0.22, 1, 0.36, 1]
const ROTATING = ['get found.', 'get chosen.', 'get remembered.', 'grow faster.']

function ParticleCanvas() {
    const canvasRef = useRef(null)
    const mouseRef = useRef({ x: 0.5, y: 0.5 })
    const scrollRef = useRef(0)
    const particlesRef = useRef([])
    const brightRef = useRef([])
    const rafRef = useRef(null)
    const sizeRef = useRef({ w: 0, h: 0 })
    const visibleRef = useRef(true)

    useEffect(() => {
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
            // Many more stars for a dense night-sky feel
            const count = isMobile ? 70 : Math.min(Math.floor((w * h) / 2600), 320)
            particlesRef.current = Array.from({ length: count }, () => {
                // A few brighter "hero" stars amongst many faint ones
                const bright = Math.random() > 0.82
                return {
                    x: Math.random() * w, y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
                    r: bright ? Math.random() * 1.1 + 0.9 : Math.random() * 0.9 + 0.3,
                    alpha: bright ? Math.random() * 0.25 + 0.4 : Math.random() * 0.28 + 0.14,
                    pulse: Math.random() * Math.PI * 2,
                    twinkle: Math.random() * 0.8 + 0.5, // gentle twinkle speed
                    bright,
                    // Cool star tint — mostly white/lavender, a few violet
                    tint: Math.random() > 0.5 ? '255,255,255' : '210,196,255',
                }
            })
            brightRef.current = particlesRef.current.filter((p) => p.bright)
        }
        resize()
        const onResize = () => resize()
        window.addEventListener('resize', onResize)

        // Pause when scrolled out of view
        const observer = new IntersectionObserver(
            ([entry]) => { visibleRef.current = entry.isIntersecting },
            { threshold: 0 }
        )
        observer.observe(canvas)

        const onMove = (e) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height }
        }
        const onScroll = () => { scrollRef.current = window.scrollY / (window.innerHeight || 1) }
        window.addEventListener('mousemove', onMove, { passive: true })
        window.addEventListener('scroll', onScroll, { passive: true })

        const draw = () => {
            if (!visibleRef.current) {
                rafRef.current = requestAnimationFrame(draw)
                return
            }
            const { w, h } = sizeRef.current
            ctx.clearRect(0, 0, w, h)
            const mouse = mouseRef.current
            const scroll = scrollRef.current
            const time = performance.now() * 0.001
            const particles = particlesRef.current

            // Glowing stars use additive blending so overlaps get brighter
            ctx.globalCompositeOperation = 'lighter'

            // Constellation lines — only between the bright stars, so the
            // O(n²) pass stays cheap even with a dense field.
            if (w >= 768) {
                ctx.lineWidth = 0.6
                const bright = brightRef.current
                for (let i = 0; i < bright.length; i++) {
                    for (let j = i + 1; j < bright.length; j++) {
                        const a = bright[i], b = bright[j]
                        const dx = a.x - b.x
                        const dy = a.y - b.y
                        const dist = Math.sqrt(dx * dx + dy * dy)
                        if (dist < 150) {
                            ctx.strokeStyle = `rgba(167,139,250,${(1 - dist / 150) * 0.15})`
                            ctx.beginPath(); ctx.moveTo(a.x, a.y)
                            ctx.lineTo(b.x, b.y); ctx.stroke()
                        }
                    }
                }
            }

            particles.forEach((p) => {
                const mx = mouse.x * w, my = mouse.y * h
                const dmx = mx - p.x, dmy = my - p.y
                const md = Math.sqrt(dmx * dmx + dmy * dmy)
                if (md < 200) { const f = ((200 - md) / 200) * 0.008; p.vx += dmx * f; p.vy += dmy * f }
                p.vx += (Math.random() - 0.5) * scroll * 0.02; p.vy += scroll * 0.01
                p.vx *= 0.99; p.vy *= 0.99; p.x += p.vx; p.y += p.vy
                p.pulse += 0.02
                if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
                if (p.y < 0) p.y = h; if (p.y > h) p.y = 0

                // Twinkle — gentle, shallow shimmer (stays mostly steady)
                const tw = 0.7 + 0.3 * Math.sin(p.pulse * p.twinkle + time)
                const pa = Math.min(1, p.alpha * tw)

                // Soft outer glow halo
                const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * (p.bright ? 6 : 4))
                glow.addColorStop(0, `rgba(${p.tint},${pa * 0.32})`)
                glow.addColorStop(1, `rgba(${p.tint},0)`)
                ctx.fillStyle = glow
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (p.bright ? 6 : 4), 0, Math.PI * 2); ctx.fill()

                // Solid core
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${p.tint},${pa})`; ctx.fill()

                // Sparkle cross on the brightest stars when they peak
                if (p.bright && tw > 0.95) {
                    const len = p.r * 4 * (tw - 0.95) / 0.05
                    ctx.strokeStyle = `rgba(255,255,255,${(tw - 0.95) / 0.05 * 0.3})`
                    ctx.lineWidth = 0.7
                    ctx.beginPath()
                    ctx.moveTo(p.x - len, p.y); ctx.lineTo(p.x + len, p.y)
                    ctx.moveTo(p.x, p.y - len); ctx.lineTo(p.x, p.y + len)
                    ctx.stroke()
                }
            })

            ctx.globalCompositeOperation = 'source-over'
            rafRef.current = requestAnimationFrame(draw)
        }
        rafRef.current = requestAnimationFrame(draw)
        return () => {
            cancelAnimationFrame(rafRef.current)
            observer.disconnect()
            window.removeEventListener('resize', onResize)
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('scroll', onScroll)
        }
    }, [])

    return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}

export default function Hero() {
    const reduce = useReducedMotion()
    const [word, setWord] = useState(0)
    const [showParticles, setShowParticles] = useState(false)

    useEffect(() => {
        if (reduce) return
        const id = setInterval(() => setWord((w) => (w + 1) % ROTATING.length), 2800)
        return () => clearInterval(id)
    }, [reduce])

    // Defer the particle canvas until after first paint / app-ready + idle,
    // so it never competes with LCP on load (helps mobile Speed Index).
    useEffect(() => {
        if (reduce) return
        let idleId
        const unsub = onAppReady(() => {
            const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 200))
            idleId = schedule(() => setShowParticles(true))
        })
        return () => {
            unsub()
            if (idleId && window.cancelIdleCallback) window.cancelIdleCallback(idleId)
        }
    }, [reduce])

    const line = {
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: '110%' },
        show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.08 + i * 0.08 } }),
    }

    return (
        <section id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-[#100b20]">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-grid" style={{
                    maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent 80%)',
                }} />
                {!reduce && showParticles && <ParticleCanvas />}
                <div className="absolute -right-32 top-0 h-[600px] w-[600px] rounded-full bg-violet-600/45 blur-[150px]" />
                <div className="absolute -left-32 bottom-0 h-[500px] w-[500px] rounded-full bg-violet-400/35 blur-[150px]" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-violet-500/25 blur-[130px]" />
                <div className="absolute inset-0 noise" />
            </div>

            <div className="container relative z-10 flex min-h-[100svh] flex-col justify-center pb-16 sm:pb-20 pt-[clamp(6rem,14vh,10rem)]">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.15 }} className="flex flex-wrap items-center gap-3">
                    <span className="label label-line text-white/50">Digital Growth Engine</span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 font-mono text-[0.6rem] sm:text-[0.65rem] text-white/50 backdrop-blur-sm">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
                        </span>
                        Taking on new projects for 2026
                    </span>
                </motion.div>

                <h1 className="mt-6 sm:mt-8 display text-[clamp(2.4rem,7.5vw,7.5rem)] leading-[0.88] tracking-[-0.03em]">
                    <span className="block overflow-hidden pb-[0.15em] -mb-[0.15em]">
                        <motion.span custom={0} variants={line} initial="hidden" animate="show" className="block text-white text-glow-soft">Make your</motion.span>
                    </span>
                    <span className="block overflow-hidden pb-[0.15em] -mb-[0.15em]">
                        <motion.span custom={1} variants={line} initial="hidden" animate="show" className="block text-white text-glow-soft">digital presence</motion.span>
                    </span>
                    <span className="block overflow-hidden pb-[0.4em] -mb-[0.4em]">
                        <motion.span custom={2} variants={line} initial="hidden" animate="show" className="block">
                            <span className="italic text-gradient-violet text-glow-violet">impossible to ignore.</span>
                        </motion.span>
                    </span>
                </h1>

                <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}>
                        <p className="max-w-[520px] text-[0.95rem] sm:text-[1.08rem] leading-relaxed text-white/70">
                            Diversify Digital is a full-service growth partner — SEO, paid media, web &amp; app
                            development, branding and creative. We build brands that don&apos;t just show up — they
                        </p>
                        <div className="mt-2 h-[2rem] sm:h-[2.2rem] overflow-hidden">
                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.span key={word} initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-100%', opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}
                                    className="block font-serif text-[1.2rem] sm:text-[1.5rem] italic text-violet-300">
                                    {ROTATING[word]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: EASE, delay: 1 }} className="grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm md:flex md:divide-x-0 md:border-0 md:bg-transparent md:backdrop-blur-none md:gap-8 md:justify-end md:rounded-none">
                        {[{ v: '80+', l: 'Brands launched' }, { v: '3.4×', l: 'Avg. traffic lift' }, { v: '9yr', l: 'Building' }].map((s) => (
                            <div key={s.l} className="px-3 py-4 text-center md:p-0 md:text-left">
                                <span className="block font-serif text-[clamp(1.5rem,5vw,2.2rem)] leading-none text-white">{s.v}</span>
                                <span className="mt-1.5 block font-mono text-[0.5rem] sm:text-[0.6rem] uppercase tracking-wide text-white/50">{s.l}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
                    className="mt-10 sm:mt-12 flex flex-wrap items-center gap-3 sm:gap-4">
                    <Magnetic strength={0.4}>
                        <a href={REGISTER_CLIENT_URL} data-cursor-label="Let's talk" className="btn btn-primary">Start your project</a>
                    </Magnetic>
                    <Magnetic strength={0.3}>
                        <a href="#work" className="btn btn-outline">See our work</a>
                    </Magnetic>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-[#100b20] to-transparent z-10" />
        </section>
    )
}
