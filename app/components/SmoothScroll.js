'use client'

import { useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'

/**
 * Buttery smooth-scroll wrapper (the awwwards standard).
 * Also wires anchor links through Lenis for silky in-page navigation
 * and exposes scroll progress on the document for the progress rail.
 * Fully disabled for reduced-motion users so native scroll is preserved.
 */
export default function SmoothScroll({ children }) {
    const reduce = useReducedMotion()

    useEffect(() => {
        if (reduce) return

        const lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 1.6,
        })

        // Expose globally so other components (nav, buttons) can drive it.
        window.__lenis = lenis

        const onScroll = ({ scroll, limit }) => {
            const p = limit > 0 ? scroll / limit : 0
            document.documentElement.style.setProperty('--scroll-progress', String(p))
        }
        lenis.on('scroll', onScroll)

        let raf
        const loop = (time) => {
            lenis.raf(time)
            raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)

        // Intercept in-page anchor clicks for smooth, offset-aware scrolling.
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
