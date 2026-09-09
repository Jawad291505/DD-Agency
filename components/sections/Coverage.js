'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Reveal, Stagger, StaggerItem } from '@/lib/motion'
import LAND_RINGS from '@/data/land'

/* ── Region data ── */
const REGIONS = [
    { name: 'North America', lat: 40, lng: -100, label: 'US & Canada' },
    { name: 'Europe', lat: 50, lng: 10, label: 'UK & EU' },
    { name: 'Middle East', lat: 25, lng: 45, label: 'UAE, Saudi & Beyond' },
    { name: 'South Asia', lat: 20, lng: 78, label: 'India & Subcontinent' },
    { name: 'Southeast Asia', lat: 5, lng: 105, label: 'Singapore & ASEAN' },
    { name: 'Australia', lat: -28, lng: 135, label: 'ANZ Region' },
]

const PARTNER_TYPES = [
    { icon: '◆', label: 'Multi-Niche Franchises' },
    { icon: '◆', label: 'Small & Medium Businesses' },
    { icon: '◆', label: 'Seed & Funded Startups' },
    { icon: '◆', label: 'E-commerce Brands' },
]

/* ── Helpers ── */
const toRad = (d) => (d * Math.PI) / 180
const TAU = Math.PI * 2

function latLngTo3D(lat, lng, radius) {
    const phi = toRad(90 - lat)
    const theta = toRad(lng + 180)
    return {
        x: -(radius * Math.sin(phi) * Math.cos(theta)),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta),
    }
}

function rotateY(point, angle) {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return { x: point.x * cos - point.z * sin, y: point.y, z: point.x * sin + point.z * cos }
}

function rotateX(point, angle) {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    return { x: point.x, y: point.y * cos - point.z * sin, z: point.y * sin + point.z * cos }
}

function generateWireframe(radius, latStep = 30, lngStep = 30) {
    const arcs = []
    for (let lat = -60; lat <= 60; lat += latStep) {
        const points = []
        for (let lng = 0; lng <= 360; lng += 4) points.push(latLngTo3D(lat, lng, radius))
        arcs.push(points)
    }
    for (let lng = 0; lng < 360; lng += lngStep) {
        const points = []
        for (let lat = -90; lat <= 90; lat += 4) points.push(latLngTo3D(lat, lng, radius))
        arcs.push(points)
    }
    return arcs
}

/* ── Auto-rotating Globe Canvas ── */
function GlobeCanvas() {
    const canvasRef = useRef(null)
    const rafRef = useRef(null)
    const visibleRef = useRef(false)
    const rotationRef = useRef(0)
    const mouseRef = useRef({ x: 0, active: false })
    const targetRotRef = useRef(0)
    const autoRotateRef = useRef(true)

    const handleMouseMove = useCallback((e) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const rect = canvas.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        mouseRef.current = { x, active: true }
        autoRotateRef.current = false
        targetRotRef.current = rotationRef.current + x * 0.05
    }, [])

    const handleMouseLeave = useCallback(() => {
        mouseRef.current.active = false
        autoRotateRef.current = true
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        const isMobile = canvas.offsetWidth < 400
        const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio, 2)
        const size = isMobile ? 320 : 500
        canvas.width = size * dpr
        canvas.height = size * dpr
        ctx.scale(dpr, dpr)

        const R = isMobile ? 110 : 160
        const tiltX = toRad(-15)
        const wireframe = isMobile ? [] : generateWireframe(R)
        const regionPoints = REGIONS.map((r) => latLngTo3D(r.lat, r.lng, R))
        const landRings = LAND_RINGS.map((ring) => ring.map(([lng, lat]) => latLngTo3D(lat, lng, R)))

        const light = { x: -0.6, y: 0.6, z: 0.55 }
        const lightLen = Math.hypot(light.x, light.y, light.z)
        light.x /= lightLen; light.y /= lightLen; light.z /= lightLen

        const stars = Array.from({ length: isMobile ? 40 : 80 }, () => ({
            x: Math.random() * size, y: Math.random() * size,
            s: 0.3 + Math.random() * 1.2, o: 0.15 + Math.random() * 0.35,
            speed: 0.002 + Math.random() * 0.005, phase: Math.random() * TAU,
        }))

        const observer = new IntersectionObserver(
            ([entry]) => { visibleRef.current = entry.isIntersecting },
            { threshold: 0 }
        )
        observer.observe(canvas)

        let time = 0

        const draw = () => {
            if (!visibleRef.current) {
                rafRef.current = requestAnimationFrame(draw)
                return
            }

            ctx.clearRect(0, 0, size, size)
            time += 0.016
            const cx = size / 2
            const cy = size / 2

            // Auto-rotate or follow mouse
            if (autoRotateRef.current) {
                rotationRef.current += 0.003
            } else {
                rotationRef.current += (targetRotRef.current - rotationRef.current) * 0.08
            }
            const rotY = rotationRef.current

            // Stars
            stars.forEach((s) => {
                const twinkle = 0.5 + 0.5 * Math.sin(time * s.speed * 60 + s.phase)
                ctx.beginPath()
                ctx.arc(s.x, s.y, s.s, 0, TAU)
                ctx.fillStyle = `rgba(196, 181, 253, ${s.o * twinkle})`
                ctx.fill()
            })

            // Globe outline + ocean
            ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU)
            ctx.strokeStyle = 'rgba(167, 139, 250, 0.12)'; ctx.lineWidth = 1; ctx.stroke()
            ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU)
            ctx.fillStyle = 'rgba(21, 15, 43, 0.96)'; ctx.fill()

            ctx.save()
            ctx.beginPath(); ctx.arc(cx, cy, R - 1, 0, TAU); ctx.clip()

            const lx = cx + light.x * R
            const ly = cy - light.y * R

            // Ocean shading
            const oceanGrad = ctx.createRadialGradient(lx, ly, R * 0.1, cx, cy, R * 1.9)
            oceanGrad.addColorStop(0, 'rgba(96, 63, 178, 0.45)')
            oceanGrad.addColorStop(0.45, 'rgba(48, 31, 92, 0.25)')
            oceanGrad.addColorStop(1, 'rgba(9, 6, 20, 0.5)')
            ctx.fillStyle = oceanGrad
            ctx.fillRect(cx - R, cy - R, R * 2, R * 2)

            // Graticule (desktop only)
            wireframe.forEach((arc) => {
                ctx.beginPath()
                let started = false
                arc.forEach((pt) => {
                    const r2 = rotateX(rotateY(pt, rotY), tiltX)
                    if (r2.z < 0) { started = false; return }
                    const sx = cx + r2.x, sy = cy - r2.y
                    if (!started) { ctx.moveTo(sx, sy); started = true } else ctx.lineTo(sx, sy)
                })
                ctx.strokeStyle = 'rgba(167, 139, 250, 0.08)'; ctx.lineWidth = 0.5; ctx.stroke()
            })

            // Continents
            const landGrad = ctx.createRadialGradient(lx, ly, R * 0.1, cx, cy, R * 2)
            landGrad.addColorStop(0, 'rgba(179, 150, 255, 0.95)')
            landGrad.addColorStop(0.5, 'rgba(129, 96, 214, 0.85)')
            landGrad.addColorStop(1, 'rgba(63, 44, 120, 0.8)')
            landRings.forEach((ring) => {
                let anyFront = false
                ctx.beginPath()
                ring.forEach((pt, idx) => {
                    const r2 = rotateX(rotateY(pt, rotY), tiltX)
                    let px = r2.x, py = r2.y
                    if (r2.z < 0) {
                        const m = Math.hypot(px, py) || 1
                        px = (px / m) * (R - 1); py = (py / m) * (R - 1)
                    } else anyFront = true
                    const sx = cx + px, sy = cy - py
                    if (idx === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy)
                })
                if (!anyFront) return
                ctx.closePath(); ctx.fillStyle = landGrad; ctx.fill()
                ctx.strokeStyle = 'rgba(214, 198, 255, 0.30)'; ctx.lineWidth = 0.5; ctx.stroke()
            })

            // Limb darkening
            const limbGrad = ctx.createRadialGradient(cx, cy, R * 0.55, cx, cy, R)
            limbGrad.addColorStop(0, 'transparent'); limbGrad.addColorStop(1, 'rgba(6, 4, 16, 0.55)')
            ctx.fillStyle = limbGrad; ctx.fillRect(cx - R, cy - R, R * 2, R * 2)

            ctx.restore()

            // Thin atmosphere rim
            const atmGrad = ctx.createRadialGradient(cx, cy, R * 0.94, cx, cy, R * 1.08)
            atmGrad.addColorStop(0, 'transparent')
            atmGrad.addColorStop(0.6, 'rgba(139, 92, 246, 0.12)')
            atmGrad.addColorStop(1, 'transparent')
            ctx.fillStyle = atmGrad
            ctx.fillRect(cx - R * 1.1, cy - R * 1.1, R * 2.2, R * 2.2)

            // Region dots
            regionPoints.forEach((pt, i) => {
                const r1 = rotateY(pt, rotY)
                const r2 = rotateX(r1, tiltX)
                if (r2.z < -10) return

                const sx = cx + r2.x, sy = cy - r2.y
                const depthFactor = (r2.z + R) / (2 * R)
                const alpha = 0.3 + depthFactor * 0.7
                const dotSize = 2.5 + depthFactor * 3.5

                // Pulse ring
                const pulse = 0.5 + 0.5 * Math.sin(time * 2 + i)
                ctx.beginPath()
                ctx.arc(sx, sy, dotSize + 4 + pulse * 4, 0, TAU)
                ctx.strokeStyle = `rgba(167, 139, 250, ${alpha * 0.2 * pulse})`
                ctx.lineWidth = 0.8; ctx.stroke()

                // Dot glow
                const dotGlow = ctx.createRadialGradient(sx, sy, 0, sx, sy, dotSize * 3)
                dotGlow.addColorStop(0, `rgba(167, 139, 250, ${alpha * 0.4})`)
                dotGlow.addColorStop(1, 'transparent')
                ctx.fillStyle = dotGlow
                ctx.beginPath(); ctx.arc(sx, sy, dotSize * 3, 0, TAU); ctx.fill()

                // Solid dot
                ctx.beginPath(); ctx.arc(sx, sy, dotSize, 0, TAU)
                ctx.fillStyle = `rgba(196, 181, 253, ${alpha})`; ctx.fill()

                // Label
                if (r2.z > 40 && depthFactor > 0.55 && !isMobile) {
                    ctx.font = '500 9px system-ui, sans-serif'
                    ctx.fillStyle = `rgba(196, 181, 253, ${alpha * 0.8})`
                    ctx.textAlign = 'left'
                    ctx.fillText(REGIONS[i].name, sx + dotSize + 6, sy + 3)
                }
            })

            // Connection arcs (desktop only)
            if (!isMobile) {
                const visiblePts = regionPoints
                    .map((pt, i) => {
                        const r1 = rotateY(pt, rotY)
                        const r2 = rotateX(r1, tiltX)
                        return { ...r2, sx: cx + r2.x, sy: cy - r2.y, i }
                    })
                    .filter((p) => p.z > 20)

                for (let a = 0; a < visiblePts.length; a++) {
                    for (let b = a + 1; b < visiblePts.length; b++) {
                        const p1 = visiblePts[a], p2 = visiblePts[b]
                        const midX = (p1.sx + p2.sx) / 2
                        const midY = (p1.sy + p2.sy) / 2 - 20
                        ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy)
                        ctx.quadraticCurveTo(midX, midY, p2.sx, p2.sy)
                        ctx.strokeStyle = 'rgba(124, 58, 237, 0.08)'; ctx.lineWidth = 0.5; ctx.stroke()
                    }
                }
            }

            rafRef.current = requestAnimationFrame(draw)
        }

        rafRef.current = requestAnimationFrame(draw)

        if (!isMobile) {
            canvas.addEventListener('mousemove', handleMouseMove)
            canvas.addEventListener('mouseleave', handleMouseLeave)
        }

        return () => {
            cancelAnimationFrame(rafRef.current)
            observer.disconnect()
            if (!isMobile) {
                canvas.removeEventListener('mousemove', handleMouseMove)
                canvas.removeEventListener('mouseleave', handleMouseLeave)
            }
        }
    }, [handleMouseMove, handleMouseLeave])

    return (
        <canvas
            ref={canvasRef}
            className="h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] lg:h-[500px] lg:w-[500px]"
            style={{ width: 500, height: 500 }}
            aria-label="Interactive globe showing Diversify Digital's global coverage areas"
            role="img"
        />
    )
}

/* ── Main Section ── */
export default function Coverage() {
    const reduce = useReducedMotion()

    return (
        <section
            id="coverage"
            className="relative overflow-hidden bg-[#100b20] py-[clamp(5rem,10vw,9rem)]"
        >
            {/* Seamless transition gradients */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#100b20] to-transparent z-[2]" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#100b20] to-transparent z-[2]" />
            <div className="absolute inset-0 grain" />

            <div className="container relative z-10">
                {/* Header */}
                <Reveal className="mx-auto max-w-3xl text-center">
                    <span className="label label-line text-violet-300/80">Global Reach</span>
                    <h2 className="mt-6 display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] text-white">
                        Built for{' '}
                        <span className="italic text-gradient-violet">International</span>
                        <br />
                        Growth Partners
                    </h2>
                    <p className="mx-auto mt-6 max-w-lg text-[1rem] leading-relaxed text-white/60">
                        Diversify Digital works with brands ready to scale — wherever they&apos;re based.
                    </p>
                </Reveal>

                {/* Globe + regions grid */}
                <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
                    {/* Globe */}
                    <div className="relative flex items-center justify-center">
                        {!reduce && <GlobeCanvas />}
                        {reduce && (
                            <div className="flex h-[280px] w-[280px] items-center justify-center rounded-full border border-white/10 bg-white/[0.02]">
                                <span className="text-[4rem]">🌍</span>
                            </div>
                        )}
                    </div>

                    {/* Regions list + partner types */}
                    <div>
                        <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {REGIONS.map((region) => (
                                <StaggerItem
                                    key={region.name}
                                    className="group rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-violet-500/20 hover:bg-violet-500/[0.04]"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.6)] transition-shadow duration-300 group-hover:shadow-[0_0_14px_rgba(167,139,250,0.9)]" />
                                        <span className="font-sans text-[0.95rem] font-medium text-white/85">{region.name}</span>
                                    </div>
                                    <p className="mt-1.5 pl-5 text-[0.8rem] text-white/45">{region.label}</p>
                                </StaggerItem>
                            ))}
                        </Stagger>

                        {/* Partner types */}
                        <Reveal delay={0.3} className="mt-8">
                            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-violet-300/70">
                                    Who we work with
                                </span>
                                <div className="mt-4 grid grid-cols-2 gap-3">
                                    {PARTNER_TYPES.map((p) => (
                                        <div key={p.label} className="flex items-center gap-2.5">
                                            <span className="text-[0.5rem] text-violet-400">{p.icon}</span>
                                            <span className="text-[0.85rem] text-white/65">{p.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
