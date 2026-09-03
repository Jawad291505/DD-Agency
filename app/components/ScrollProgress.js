'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Fixed top scroll-progress rail. Springs for a fluid, high-end feel.
 */
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <motion.div
            aria-hidden="true"
            style={{ scaleX }}
            className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-clay via-primary-light to-sand"
        />
    )
}
