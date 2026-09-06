'use client'

import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'

/**
 * Smooth-scroll wrapper — pointer / desktop only.
 *
 * On touch devices we deliberately keep native scrolling: momentum scroll is
 * already smooth there, and running Lenis (a constant rAF loop that hijacks
 * touch and forces extra layout/paint work per frame) is what made mobile
 * scrolling feel laggy. Also fully disabled for reduced-motion users.
 */
export default function SmoothScroll({ children }) {
    const reduce = useReducedMotion()

    useEffect(() => {
        if (reduce) return

        const coarsePointer = window.matchMedia(
            '(hover: none), (pointer: coarse)'
        ).matches
        if (coarsePointer) return

        const lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        })

        // Expose for potential external control (nav, buttons).
        window.__lenis = lenis

        let raf
        const loop = (time) => {
            lenis.raf(time)
            raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)

        // Intercept in-page anchor clicks for smooth, offset-aware scrolling.
        // (On touch, native `scroll-behavior` + `scroll-padding-top` handle this.)
        const onClick = (e) => {
            const a = e.target.closest('a[href^="#"]')
            if (!a) return
            const id = a.getAttribute('href')
            if (!id || id === '#') return
            const target = document.querySelector(id)
            if (!target) return
            e.preventDefault()
            lenis.scrollTo(target, { offset: -80, duration: 1.3 })
        }
        document.addEventListener('click', onClick)

        return () => {
            cancelAnimationFrame(raf)
            document.removeEventListener('click', onClick)
            lenis.destroy()
            delete window.__lenis
        }
    }, [reduce])

    return children
}
