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
        if (cursorEl) cursorEl.style.display = 'block'
        // Ambient breathing stays on the CSS `torch-ambient-pulse` animation
        // (compositor-driven, zero main-thread cost). We only drive the
        // cursor-following torch from JS here.

        let mouseX = window.innerWidth / 2
        let mouseY = window.innerHeight / 2
        let currentX = mouseX
        let currentY = mouseY
        let raf = null

        const paint = () => {
            if (cursorEl) {
                cursorEl.style.background = `radial-gradient(700px circle at ${currentX}px ${currentY}px, rgba(124,58,237,0.28), rgba(167,139,250,0.14) 35%, rgba(139,92,246,0.06) 55%, transparent 70%)`
            }
        }

        const loop = () => {
            currentX += (mouseX - currentX) * 0.07
            currentY += (mouseY - currentY) * 0.07
            paint()
            // Once the torch has caught up to the pointer, stop the loop —
            // no need to keep repainting a full-viewport gradient every frame
            // while the mouse is still. It restarts on the next mousemove.
            if (Math.abs(mouseX - currentX) < 0.5 && Math.abs(mouseY - currentY) < 0.5) {
                raf = null
                return
            }
            raf = requestAnimationFrame(loop)
        }

        const onMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
            if (raf == null && !document.hidden) raf = requestAnimationFrame(loop)
        }

        const onVisibility = () => {
            if (document.hidden && raf != null) {
                cancelAnimationFrame(raf)
                raf = null
            }
        }

        window.addEventListener('mousemove', onMove, { passive: true })
        document.addEventListener('visibilitychange', onVisibility)
        paint()

        return () => {
            if (raf != null) cancelAnimationFrame(raf)
            window.removeEventListener('mousemove', onMove)
            document.removeEventListener('visibilitychange', onVisibility)
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
