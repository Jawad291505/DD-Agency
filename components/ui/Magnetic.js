'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * Magnetic wrapper — the element leans toward the cursor while hovered,
 * then springs back on leave. A staple awwwards micro-interaction.
 * Renders a span by default so it can wrap links/buttons without breaking layout.
 */
export default function Magnetic({ children, strength = 0.4, className, as = 'span' }) {
    const reduce = useReducedMotion()
    const ref = useRef(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 })
    const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 })

    const MotionTag = motion[as] || motion.span

    const onMove = (e) => {
        if (reduce || !ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const relX = e.clientX - (rect.left + rect.width / 2)
        const relY = e.clientY - (rect.top + rect.height / 2)
        x.set(relX * strength)
        y.set(relY * strength)
    }

    const onLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <MotionTag
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ x: sx, y: sy, display: 'inline-flex' }}
            className={className}
        >
            {children}
        </MotionTag>
    )
}
