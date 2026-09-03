'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * Count-up number that animates once when scrolled into view.
 * Parses a value like "3.4x", "80+", "98%" into { prefix, number, suffix }
 * so the surrounding characters are preserved.
 */
export default function Counter({ value, className }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-15% 0px' })
    const [display, setDisplay] = useState(null)

    const match = String(value).match(/^([^\d]*)([\d.,]+)(.*)$/)
    const prefix = match ? match[1] : ''
    const target = match ? parseFloat(match[2].replace(/,/g, '')) : 0
    const suffix = match ? match[3] : ''
    const decimals = match && match[2].includes('.') ? match[2].split('.')[1].length : 0

    useEffect(() => {
        if (!inView || !match) return
        const start = performance.now()
        const duration = 1600
        let raf

        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - t, 3)
            const current = target * eased
            setDisplay(current.toFixed(decimals))
            if (t < 1) raf = requestAnimationFrame(tick)
            else setDisplay(target.toFixed(decimals))
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [inView, target, decimals, match])

    if (!match) {
        return <span ref={ref} className={className}>{value}</span>
    }

    return (
        <span ref={ref} className={className}>
            {prefix}
            {display === null ? (decimals ? (0).toFixed(decimals) : '0') : display}
            {suffix}
        </span>
    )
}
