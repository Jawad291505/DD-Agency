'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/**
 * Count-up number that animates exactly once when scrolled into view.
 *
 * Parses "3.4x", "80+", "98%", "1,200" into { prefix, target, suffix, decimals }
 * so surrounding characters are preserved.
 *
 * Reliability:
 *  - A `hasRun` ref guards the rAF loop so it can NEVER restart, even if the
 *    element re-enters the viewport or the component re-renders.
 *  - Deterministic initial render (formatted zero) on server + client → no
 *    hydration mismatch.
 *  - Reduced-motion users get the final value immediately.
 *  - Cleans up its rAF on unmount.
 */
export default function Counter({ value, duration = 1900, className }) {
    const ref = useRef(null)
    const hasRun = useRef(false)
    const rafRef = useRef(null)
    const reduce = useReducedMotion()
    const inView = useInView(ref, { once: true, amount: 0.4 })

    const parsed = useMemo(() => {
        const match = String(value).match(/^(\D*)([\d.,]+)(.*)$/s)
        if (!match) return null
        const numeric = match[2].replace(/,/g, '')
        return {
            prefix: match[1],
            target: parseFloat(numeric),
            suffix: match[3],
            decimals: numeric.includes('.') ? numeric.split('.')[1].length : 0,
            grouped: match[2].includes(','),
        }
    }, [value])

    const format = useMemo(() => {
        if (!parsed) return (n) => String(n)
        return (n) => {
            const fixed = n.toFixed(parsed.decimals)
            if (!parsed.grouped) return fixed
            const [intPart, decPart] = fixed.split('.')
            const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            return decPart ? `${withCommas}.${decPart}` : withCommas
        }
    }, [parsed])

    const [display, setDisplay] = useState(() => (parsed ? format(0) : String(value)))

    useEffect(() => {
        if (!parsed || hasRun.current) return

        if (reduce) {
            hasRun.current = true
            setDisplay(format(parsed.target))
            return
        }

        if (!inView) return
        hasRun.current = true

        const start = performance.now()
        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - t, 3)
            setDisplay(format(parsed.target * eased))
            if (t < 1) {
                rafRef.current = requestAnimationFrame(tick)
            } else {
                setDisplay(format(parsed.target))
            }
        }
        rafRef.current = requestAnimationFrame(tick)

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [inView, reduce, duration, parsed, format])

    if (!parsed) {
        return (
            <span ref={ref} className={className}>
                {value}
            </span>
        )
    }

    return (
        <span ref={ref} className={className}>
            {parsed.prefix}
            {display}
            {parsed.suffix}
        </span>
    )
}
