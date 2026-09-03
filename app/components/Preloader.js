'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * First-load reveal. A counter races to 100 while the wordmark holds,
 * then the panel wipes upward to reveal the hero. Runs once per session
 * so repeat in-session navigation stays instant.
 */
export default function Preloader() {
    const reduce = useReducedMotion()
    const [done, setDone] = useState(false)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (reduce || (typeof window !== 'undefined' && sessionStorage.getItem('dd_loaded'))) {
            setDone(true)
            return
        }

        document.body.style.overflow = 'hidden'
        const start = performance.now()
        const duration = 1500
        let raf

        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - t, 3)
            setCount(Math.round(eased * 100))
            if (t < 1) raf = requestAnimationFrame(tick)
            else {
                sessionStorage.setItem('dd_loaded', '1')
                setTimeout(() => setDone(true), 250)
            }
        }
        raf = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(raf)
            document.body.style.overflow = ''
        }
    }, [reduce])

    useEffect(() => {
        if (done) document.body.style.overflow = ''
    }, [done])

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary-deep text-ivory"
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.9, ease: EASE }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="font-serif text-[clamp(2rem,7vw,4rem)] tracking-[-0.02em]"
                    >
                        Diversify<span className="italic text-clay">Digital</span>
                    </motion.div>

                    <div className="mt-8 h-px w-[min(60vw,320px)] overflow-hidden bg-white/15">
                        <motion.div
                            className="h-full bg-sand"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: count / 100 }}
                            style={{ transformOrigin: 'left' }}
                            transition={{ ease: 'linear', duration: 0.1 }}
                        />
                    </div>

                    <div className="mt-4 font-sans text-[0.72rem] uppercase tracking-editorial text-ivory/50">
                        {count}% — crafting your experience
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
