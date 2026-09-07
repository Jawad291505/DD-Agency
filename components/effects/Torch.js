'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Full-page violet torch — two layers:
 * 1. Cursor-following radial — desktop only (no pointer on touch)
 * 2. Ambient breathing glow — runs everywhere including mobile
 *
 * The ambient layer is a single CSS gradient update per frame — virtually free.
 */
export default function Torch() {
    const cursorRef = useRef(null)
    const ambientRef = useRef(null)
    const reduce = useReducedMotion()

    // Ambient breathing glow — runs on ALL devices
    useEffect(() => {
        if (reduce) return
        const el = ambientRef.current
        if (!el) return
        let raf
        let time = 0

        const loop = () => {
            time += 0.016
            const pulse = 0.6 + 0.4 * Math.sin(time * 0.8)
            const ao = (0.06 + 0.04 * pulse).toFixed(3)
            el.style.background = `radial-gradient(50% 50% at 50% 50%, rgba(124,58,237,${ao}), rgba(167,139,250,${(ao * 0.5).toFixed(3)}) 50%, transparent 80%)`
            raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(raf)
    }, [reduce])

    // Cursor-following torch — desktop with fine pointer only
    useEffect(() => {
        if (reduce) return
        if (typeof window === 'undefined') return
        if (!window.matchMedia('(pointer: fine)').matches) return

        const el = cursorRef.current
        if (!el) return
        el.style.display = 'block'

        let mouseX = window.innerWidth / 2
        let mouseY = window.innerHeight / 2
        let currentX = mouseX
        let currentY = mouseY
        let raf

        const onMove = (e) => { mouseX = e.clientX; mouseY = e.clientY }

        const loop = () => {
            currentX += (mouseX - currentX) * 0.07
            currentY += (mouseY - currentY) * 0.07
            el.style.background = `radial-gradient(700px circle at ${currentX}px ${currentY}px, rgba(124,58,237,0.15), rgba(167,139,250,0.07) 35%, rgba(139,92,246,0.03) 55%, transparent 70%)`
            raf = requestAnimationFrame(loop)
        }

        window.addEventListener('mousemove', onMove, { passive: true })
        raf = requestAnimationFrame(loop)

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('mousemove', onMove)
        }
    }, [reduce])

    if (reduce) return null

    return (
        <>
            {/* Cursor torch — hidden by default, shown via JS on desktop */}
            <div ref={cursorRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 hidden" />
            {/* Ambient breathing glow — always on */}
            <div ref={ambientRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[29]" />
        </>
    )
}
