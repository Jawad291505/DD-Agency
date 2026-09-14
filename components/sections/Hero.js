'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import Magnetic from '@/components/ui/Magnetic'
import { REGISTER_CLIENT_URL } from '@/data/links'
import LAND_RINGS from '@/data/land'
import { onAppReady } from '@/lib/ready'
import { isScrolling } from '@/lib/scrolling'

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
            const count = isMobile ? 70 : Math.min(Math.floor((w * h) / 2600), 180)
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
            // Skip drawing while off-screen or while the user is actively
            // scrolling — a frozen star-field for ~120ms is invisible and
            // keeps touch scrolling smooth.
            if (!visibleRef.current || isScrolling()) {
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

function GlobeCanvas({ reduce }) {
    const canvasRef = useRef(null)
    const rafRef = useRef(null)
    const mouseRef = useRef({ x: 0, y: 0 })
    const tiltRef = useRef({ x: 0, y: 0 })
    const visibleRef = useRef(true)

    useEffect(() => {
        if (reduce) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const isMobile = window.innerWidth < 768
        const size = isMobile ? 260 : 340
        const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio, 2)
        canvas.width = size * dpr
        canvas.height = size * dpr
        canvas.style.width = size + 'px'
        canvas.style.height = size + 'px'
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

        const cx = size / 2
        const cy = size / 2
        const R = size * 0.36

        // Pause when off-screen to save battery / GPU
        const observer = new IntersectionObserver(
            ([entry]) => { visibleRef.current = entry.isIntersecting },
            { threshold: 0 }
        )
        observer.observe(canvas)

        const onMove = (e) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current = {
                x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
                y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
            }
        }
        const onLeave = () => { mouseRef.current = { x: 0, y: 0 } }
        canvas.addEventListener('mousemove', onMove, { passive: true })
        canvas.addEventListener('mouseleave', onLeave, { passive: true })

        // Convert land [lng,lat] degrees → radians once at init
        const landRads = LAND_RINGS.map((ring) =>
            ring.map(([lng, lat]) => [lat * Math.PI / 180, lng * Math.PI / 180])
        )

        // On mobile, reduce land detail — skip small rings
        const minRingSize = isMobile ? 8 : 0
        const filteredLand = minRingSize > 0
            ? landRads.filter((ring) => ring.length >= minRingSize)
            : landRads

        // Graticule lines — fewer on mobile
        const gratStep = isMobile ? 45 : 30
        const gratLats = []
        for (let d = -60; d <= 60; d += gratStep) gratLats.push(d * Math.PI / 180)
        const gratLons = []
        for (let d = -180; d < 180; d += gratStep) gratLons.push(d * Math.PI / 180)

        const project = (lat, lon, rotY, rotX) => {
            const cosLat = Math.cos(lat)
            const sinLat = Math.sin(lat)
            const x = cosLat * Math.sin(lon + rotY)
            const y = sinLat
            const z = cosLat * Math.cos(lon + rotY)
            const cosRX = Math.cos(rotX)
            const sinRX = Math.sin(rotX)
            return {
                x: cx + x * R,
                y: cy + (y * cosRX - z * sinRX) * R,
                z: y * sinRX + z * cosRX,
            }
        }

        const orbitText = 'DIVERSIFY DIGITAL GLOBAL  \u00B7  '
        const orbitTextFull = orbitText + orbitText

        // Fewer graticule steps on mobile
        const gratSteps = isMobile ? 48 : 72

        const draw = () => {
            // Skip when off-screen or while touch-scrolling
            if (!visibleRef.current || isScrolling()) {
                rafRef.current = requestAnimationFrame(draw)
                return
            }

            const time = performance.now() * 0.001
            tiltRef.current.x += (mouseRef.current.y * 0.25 - tiltRef.current.x) * 0.04
            tiltRef.current.y += (mouseRef.current.x * 0.4 - tiltRef.current.y) * 0.04

            const rotY = time * 0.2 + tiltRef.current.y
            const rotX = -0.3 + tiltRef.current.x

            ctx.clearRect(0, 0, size, size)

            // Outer atmospheric glow
            const glow = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.5)
            glow.addColorStop(0, 'rgba(124,58,237,0.07)')
            glow.addColorStop(0.7, 'rgba(124,58,237,0.03)')
            glow.addColorStop(1, 'rgba(124,58,237,0)')
            ctx.fillStyle = glow
            ctx.beginPath(); ctx.arc(cx, cy, R * 1.5, 0, Math.PI * 2); ctx.fill()

            // Graticule — latitude lines
            ctx.lineWidth = 0.4
            ctx.strokeStyle = 'rgba(167,139,250,0.08)'
            gratLats.forEach((lat) => {
                ctx.beginPath()
                let started = false
                for (let j = 0; j <= gratSteps; j++) {
                    const lon = (j / gratSteps) * Math.PI * 2 - Math.PI
                    const p = project(lat, lon, rotY, rotX)
                    if (p.z < -0.02) { started = false; continue }
                    if (!started) { ctx.moveTo(p.x, p.y); started = true }
                    else ctx.lineTo(p.x, p.y)
                }
                ctx.stroke()
            })

            // Graticule — longitude lines
            ctx.strokeStyle = 'rgba(167,139,250,0.06)'
            gratLons.forEach((lon) => {
                ctx.beginPath()
                let started = false
                for (let j = 0; j <= gratSteps; j++) {
                    const lat = -Math.PI / 2 + (j / gratSteps) * Math.PI
                    const p = project(lat, lon, rotY, rotX)
                    if (p.z < -0.02) { started = false; continue }
                    if (!started) { ctx.moveTo(p.x, p.y); started = true }
                    else ctx.lineTo(p.x, p.y)
                }
                ctx.stroke()
            })

            // Land masses — clip to globe then draw filled polygons
            ctx.save()
            ctx.beginPath()
            ctx.arc(cx, cy, R + 0.5, 0, Math.PI * 2)
            ctx.clip()

            filteredLand.forEach((ring) => {
                // Quick back-face cull: sample first point's z
                const sample = project(ring[0][0], ring[0][1], rotY, rotX)
                if (sample.z < -0.3) return // entire ring likely on back side

                ctx.beginPath()
                let anyVisible = false
                for (let i = 0; i < ring.length; i++) {
                    const p = project(ring[i][0], ring[i][1], rotY, rotX)
                    if (p.z > -0.1) anyVisible = true
                    if (i === 0) ctx.moveTo(p.x, p.y)
                    else ctx.lineTo(p.x, p.y)
                }
                if (!anyVisible) return
                ctx.closePath()
                ctx.fillStyle = 'rgba(167,139,250,0.18)'
                ctx.fill()
                ctx.strokeStyle = 'rgba(167,139,250,0.3)'
                ctx.lineWidth = 0.6
                ctx.stroke()
            })
            ctx.restore()

            // Outer ring (atmosphere edge)
            ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2)
            ctx.strokeStyle = 'rgba(167,139,250,0.15)'
            ctx.lineWidth = 1; ctx.stroke()

            // Orbiting text
            const orbitR = R + (isMobile ? 20 : 26)
            const textAngleOffset = time * 0.3
            ctx.save()
            ctx.font = `600 ${isMobile ? 9.5 : 11.5}px ui-monospace, SFMono-Regular, monospace`
            ctx.fillStyle = 'rgba(255,255,255,0.9)'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'

            const totalChars = orbitTextFull.length
            for (let i = 0; i < totalChars; i++) {
                const charAngle = textAngleOffset + (i / totalChars) * Math.PI * 2
                const tx = cx + Math.cos(charAngle) * orbitR
                const ty = cy + Math.sin(charAngle) * orbitR
                ctx.save()
                ctx.translate(tx, ty)
                ctx.rotate(charAngle + Math.PI / 2)
                ctx.fillText(orbitTextFull[i], 0, 0)
                ctx.restore()
            }
            ctx.restore()

            rafRef.current = requestAnimationFrame(draw)
        }

        rafRef.current = requestAnimationFrame(draw)
        return () => {
            cancelAnimationFrame(rafRef.current)
            observer.disconnect()
            canvas.removeEventListener('mousemove', onMove)
            canvas.removeEventListener('mouseleave', onLeave)
        }
    }, [reduce])

    if (reduce) return <div className="h-[220px] w-[220px]" />

    return (
        <canvas
            ref={canvasRef}
            className="cursor-grab active:cursor-grabbing"
            aria-hidden="true"
        />
    )
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

                {/* Slow orbit rings — decorative depth behind the headline */}
                {!reduce && (
                    <>
                        <div
                            aria-hidden="true"
                            className="absolute right-[-9rem] top-1/2 hidden -translate-y-1/2 rounded-full border border-dashed border-violet-300/10 lg:block"
                            style={{ width: 560, height: 560, willChange: 'transform', animation: 'hero-ring-spin 70s linear infinite' }}
                        />
                        <div
                            aria-hidden="true"
                            className="absolute right-[-4rem] top-1/2 hidden -translate-y-1/2 rounded-full border border-violet-300/[0.07] lg:block"
                            style={{ width: 360, height: 360, willChange: 'transform', animation: 'hero-ring-spin 45s linear infinite reverse' }}
                        />
                    </>
                )}
                <div className="absolute inset-0 noise" />
            </div>

            {/* Editorial framing — corner ticks + side rails. Purely decorative. */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] hidden sm:block">
                {/* Left node rail */}
                <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex xl:left-10">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400/50" />
                    <span className="h-24 w-px bg-gradient-to-b from-violet-400/40 to-transparent" />
                    <span className="h-1 w-1 rounded-full bg-violet-400/30" />
                </div>

                {/* Right vertical brand mark */}
                <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 items-center gap-3 lg:flex xl:right-10">
                    <span className="h-14 w-px bg-gradient-to-b from-transparent via-violet-400/30 to-transparent" />
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.32em] text-white/25 [writing-mode:vertical-rl]">
                        Diversify Digital Global
                    </span>
                </div>
            </div>

            <div className="container relative z-10 flex min-h-[100svh] flex-col justify-center pb-16 sm:pb-20 pt-[clamp(6rem,14vh,10rem)]">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.15 }} className="flex flex-wrap items-center gap-3">
                    <span className="label label-line text-white/50">AI-Driven Growth. Full-Service Digital Marketing &amp; IT.</span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 font-mono text-[0.6rem] sm:text-[0.65rem] text-white/50 backdrop-blur-sm">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
                        </span>
                        Taking on new projects for 2026
                    </span>
                </motion.div>

                <h1 className="mt-4 sm:mt-5 display text-[clamp(2.4rem,7.5vw,7.5rem)] leading-[0.88] tracking-[-0.03em]">
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

                <div className="mt-5 sm:mt-6 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}>
                        <p className="max-w-[520px] text-[0.95rem] sm:text-[1.08rem] leading-relaxed text-white/70">
                            We&apos;re a full-service digital marketing and IT partner — SEO, paid media, web &amp; app
                            development, branding and creative, powered by AI-driven insight. Brands we work with don&apos;t just show up. They
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

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: EASE, delay: 1 }}
                        className="flex items-center justify-center md:justify-end"
                    >
                        <GlobeCanvas reduce={reduce} />
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
                    className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                    <Magnetic strength={0.4}>
                        <a href={REGISTER_CLIENT_URL} data-cursor-label="Let's talk" className="btn btn-primary">Start your project</a>
                    </Magnetic>
                    <Magnetic strength={0.3}>
                        <a href="#work" className="btn btn-outline">See our work</a>
                    </Magnetic>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-[#100b20] to-transparent z-10" />

            {/* Scroll cue */}
            <motion.div
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: EASE, delay: 1.6 }}
                className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
            >
                <span className="font-mono text-[0.5rem] uppercase tracking-[0.3em] text-white/30">Scroll</span>
                <span className="relative h-10 w-px overflow-hidden bg-white/10">
                    <span
                        className="absolute left-0 top-0 h-3 w-px bg-violet-300"
                        style={reduce ? { top: '50%' } : { animation: 'hero-scroll-dot 1.9s ease-in-out infinite' }}
                    />
                </span>
            </motion.div>
        </section>
    )
}
