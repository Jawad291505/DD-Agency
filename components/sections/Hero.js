'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import Magnetic from '@/components/ui/Magnetic'
import { REGISTER_CLIENT_URL } from '@/data/links'

const EASE = [0.22, 1, 0.36, 1]
const ROTATING = ['get found.', 'get chosen.', 'get remembered.', 'grow faster.']

function ParticleCanvas() {
    const canvasRef = useRef(null)
    const mouseRef = useRef({ x: 0.5, y: 0.5 })
    const scrollRef = useRef(0)
    const particlesRef = useRef([])
    const rafRef = useRef(null)
    const sizeRef = useRef({ w: 0, h: 0 })

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
            const count = isMobile ? 25 : Math.min(Math.floor((w * h) / 8000), 100)
            particlesRef.current = Array.from({ length: count }, () => ({
                x: Math.random() * w, y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
                r: Math.random() * 1.5 + 0.5, alpha: Math.random() * 0.5 + 0.15,
                pulse: Math.random() * Math.PI * 2,
            }))
        }
        resize()
        const onResize = () => resize()
        window.addEventListener('resize', onResize)
        const onMove = (e) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height }
        }
        const onScroll = () => { scrollRef.current = window.scrollY / (window.innerHeight || 1) }
        window.addEventListener('mousemove', onMove, { passive: true })
        window.addEventListener('scroll', onScroll, { passive: true })

        const draw = () => {
            const { w, h } = sizeRef.current
            ctx.clearRect(0, 0, w, h)
            const mouse = mouseRef.current
            const scroll = scrollRef.current
            const time = performance.now() * 0.001
            const particles = particlesRef.current
            // Connection lines — skip on mobile (O(n²) is the perf killer)
            if (w >= 768) {
                ctx.lineWidth = 0.5
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x
                        const dy = particles[i].y - particles[j].y
                        const dist = Math.sqrt(dx * dx + dy * dy)
                        if (dist < 120) {
                            ctx.strokeStyle = `rgba(139,92,246,${(1 - dist / 120) * 0.15})`
                            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y)
                            ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke()
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
                p.vx *= 0.99; p.vy *= 0.99; p.x += p.vx; p.y += p.vy; p.pulse += 0.02
                if (p.x < 0) p.x = w; if (p.x > w) p.x = 0
                if (p.y < 0) p.y = h; if (p.y > h) p.y = 0
                const pa = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse + time))
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(139,92,246,${pa * 0.12})`; ctx.fill()
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(196,181,253,${pa})`; ctx.fill()
            })
            rafRef.current = requestAnimationFrame(draw)
        }
        rafRef.current = requestAnimationFrame(draw)
        return () => {
            cancelAnimationFrame(rafRef.current)
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

    useEffect(() => {
        if (reduce) return
        const id = setInterval(() => setWord((w) => (w + 1) % ROTATING.length), 2800)
        return () => clearInterval(id)
    }, [reduce])

    const line = {
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: '110%' },
        show: (i) => ({ opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE, delay: 0.3 + i * 0.12 } }),
    }

    return (
        <section id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-[#0a0a0f]">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-grid" style={{
                    maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent 80%)',
                }} />
                {!reduce && <ParticleCanvas />}
                <div className="absolute -right-32 top-0 h-[600px] w-[600px] rounded-full bg-violet-600/25 blur-[150px]" />
                <div className="absolute -left-32 bottom-0 h-[500px] w-[500px] rounded-full bg-violet-400/20 blur-[150px]" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-violet-500/[0.12] blur-[130px]" />
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
                        <motion.span custom={0} variants={line} initial="hidden" animate="show" className="block text-white">Make your</motion.span>
                    </span>
                    <span className="block overflow-hidden pb-[0.15em] -mb-[0.15em]">
                        <motion.span custom={1} variants={line} initial="hidden" animate="show" className="block text-white">digital presence</motion.span>
                    </span>
                    <span className="block overflow-hidden pb-[0.4em] -mb-[0.4em]">
                        <motion.span custom={2} variants={line} initial="hidden" animate="show" className="block">
                            <span className="italic text-gradient-violet">impossible to ignore.</span>
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

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, ease: EASE, delay: 1 }} className="flex gap-6 sm:gap-8 md:justify-end">
                        {[{ v: '80+', l: 'Brands launched' }, { v: '3.4×', l: 'Avg. traffic lift' }, { v: '9yr', l: 'Building' }].map((s) => (
                            <div key={s.l}>
                                <span className="block font-serif text-[clamp(1.4rem,3vw,2.2rem)] leading-none text-white">{s.v}</span>
                                <span className="mt-1 block font-mono text-[0.55rem] sm:text-[0.6rem] uppercase tracking-wide text-white/50">{s.l}</span>
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

            <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-[#0a0a0f] to-transparent z-10" />
        </section>
    )
}
