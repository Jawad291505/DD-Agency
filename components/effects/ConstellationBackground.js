'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { isScrolling } from '@/lib/scrolling'

/**
 * Full-page constellation / star-network canvas background.
 * Extracted from the Hero section's ParticleCanvas so it can be reused
 * on standalone pages (Work, Owner) without pulling in any Hero layout.
 */
export default function ConstellationBackground() {
    const canvasRef = useRef(null)
    const reduce = useReducedMotion()

    useEffect(() => {
        if (reduce) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        const mouseRef = { x: 0.5, y: 0.5 }
        const sizeRef = { w: 0, h: 0 }
        let particles = []
        let bright = []
        let raf = null

        const resize = () => {
            const w = canvas.offsetWidth
            const h = canvas.offsetHeight
            const isMobile = w < 768
            const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio, 2)
            canvas.width = w * dpr
            canvas.height = h * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            sizeRef.w = w
            sizeRef.h = h
            // Dense star count scaled to page area
            const count = isMobile
                ? Math.min(Math.floor((w * h) / 4000), 120)
                : Math.min(Math.floor((w * h) / 2400), 220)
            particles = Array.from({ length: count }, () => {
                const isBright = Math.random() > 0.82
                return {
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.18,
                    vy: (Math.random() - 0.5) * 0.18,
                    r: isBright ? Math.random() * 1.1 + 0.9 : Math.random() * 0.9 + 0.3,
                    alpha: isBright ? Math.random() * 0.25 + 0.4 : Math.random() * 0.28 + 0.14,
                    pulse: Math.random() * Math.PI * 2,
                    twinkle: Math.random() * 0.8 + 0.5,
                    bright: isBright,
                    tint: Math.random() > 0.5 ? '255,255,255' : '210,196,255',
                }
            })
            bright = particles.filter((p) => p.bright)
        }

        resize()
        window.addEventListener('resize', resize)

        const onMove = (e) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.x = (e.clientX - rect.left) / rect.width
            mouseRef.y = (e.clientY - rect.top) / rect.height
        }
        window.addEventListener('mousemove', onMove, { passive: true })

        const draw = () => {
            if (isScrolling()) { raf = requestAnimationFrame(draw); return }
            const { w, h } = sizeRef
            ctx.clearRect(0, 0, w, h)
            const time = performance.now() * 0.001
            const mx = mouseRef.x * w
            const my = mouseRef.y * h

            ctx.globalCompositeOperation = 'lighter'

            // Constellation lines between bright stars
            if (w >= 768) {
                ctx.lineWidth = 0.6
                for (let i = 0; i < bright.length; i++) {
                    for (let j = i + 1; j < bright.length; j++) {
                        const a = bright[i], b = bright[j]
                        const dx = a.x - b.x, dy = a.y - b.y
                        const dist = Math.sqrt(dx * dx + dy * dy)
                        if (dist < 150) {
                            ctx.strokeStyle = `rgba(167,139,250,${(1 - dist / 150) * 0.12})`
                            ctx.beginPath()
                            ctx.moveTo(a.x, a.y)
                            ctx.lineTo(b.x, b.y)
                            ctx.stroke()
                        }
                    }
                }
            }

            particles.forEach((p) => {
                const dmx = mx - p.x, dmy = my - p.y
                const md = Math.sqrt(dmx * dmx + dmy * dmy)
                if (md < 200) {
                    const f = ((200 - md) / 200) * 0.006
                    p.vx += dmx * f
                    p.vy += dmy * f
                }
                p.vx *= 0.99
                p.vy *= 0.99
                p.x += p.vx
                p.y += p.vy
                p.pulse += 0.02
                if (p.x < 0) p.x = w
                if (p.x > w) p.x = 0
                if (p.y < 0) p.y = h
                if (p.y > h) p.y = 0

                const tw = 0.7 + 0.3 * Math.sin(p.pulse * p.twinkle + time)
                const pa = Math.min(1, p.alpha * tw)

                // Soft glow
                const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * (p.bright ? 6 : 4))
                glow.addColorStop(0, `rgba(${p.tint},${pa * 0.32})`)
                glow.addColorStop(1, `rgba(${p.tint},0)`)
                ctx.fillStyle = glow
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r * (p.bright ? 6 : 4), 0, Math.PI * 2)
                ctx.fill()

                // Core
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${p.tint},${pa})`
                ctx.fill()

                // Sparkle cross on brightest
                if (p.bright && tw > 0.95) {
                    const len = p.r * 4 * (tw - 0.95) / 0.05
                    ctx.strokeStyle = `rgba(255,255,255,${(tw - 0.95) / 0.05 * 0.3})`
                    ctx.lineWidth = 0.7
                    ctx.beginPath()
                    ctx.moveTo(p.x - len, p.y)
                    ctx.lineTo(p.x + len, p.y)
                    ctx.moveTo(p.x, p.y - len)
                    ctx.lineTo(p.x, p.y + len)
                    ctx.stroke()
                }
            })

            ctx.globalCompositeOperation = 'source-over'
            raf = requestAnimationFrame(draw)
        }

        raf = requestAnimationFrame(draw)

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', onMove)
        }
    }, [reduce])

    if (reduce) return null

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 h-full w-full z-0"
            aria-hidden="true"
        />
    )
}
