'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Full-page violet torch — two layers:
 * 1. Cursor-following radial — desktop only (no pointer on touch)
 * 2. Ambient breathing glow — CSS animation on mobile, rAF on desktop
 *
 * Mobile: uses a pure CSS animation for the ambient pulse — zero JS per frame.
 * Desktop: cursor torch runs a single rAF loop (combined with ambient).
 */
export default function Torch() {
    const cursorRef = useRef(null)
    const ambientRef = useRef(null)
    const reduce = useReducedMotion()

    // Desktop only: combined cursor torch + ambient in ONE rAF loop
    useEffect(() => {
        if (reduce) return
        if (typeof window === 'undefined') return

        const isFinePointer = window.matchMedia('(pointer: fine)').matches
        // On touch/mobile — ambient is handled by CSS animation, no JS loop needed
        if (!isFinePointer) return

        const cursorEl = cursorRef.current
        const ambientEl = ambientRef.current
        if (cursorEl) cursorEl.style.display = 'block'
        // Remove the CSS animation class on desktop since we drive it from JS
        if (ambientEl) ambientEl.classList.remove('torch-ambient-pulse')

        let mouseX = window.innerWidth / 2
        let mouseY = window.innerHeight / 2
        let currentX = mouseX
        let currentY = mouseY
        let time = 0
        let raf

        const onMove = (e) => { mouseX = e.clientX; mouseY = e.clientY }

        const loop = () => {
            // Cursor torch
            currentX += (mouseX - currentX) * 0.07
            currentY += (mouseY - currentY) * 0.07
            if (cursorEl) {
                cursorEl.style.background = `radial-gradient(700px circle at ${currentX}px ${currentY}px, rgba(124,58,237,0.28), rgba(167,139,250,0.14) 35%, rgba(139,92,246,0.06) 55%, transparent 70%)`
            }

            // Ambient breathing (desktop)
            time += 0.016
            const pulse = 0.6 + 0.4 * Math.sin(time * 0.8)
            const ao = (0.11 + 0.07 * pulse).toFixed(3)
            if (ambientEl) {
                ambientEl.style.background = `radial-gradient(50% 50% at 50% 50%, rgba(124,58,237,${ao}), rgba(167,139,250,${(ao * 0.5).toFixed(3)}) 50%, transparent 80%)`
            }

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
            {/* Ambient breathing glow — CSS animation on mobile, JS-driven on desktop */}
            <div ref={ambientRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[29] torch-ambient-pulse" />
        </>
    )
}
