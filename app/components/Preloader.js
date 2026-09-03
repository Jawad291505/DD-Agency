'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * First-load reveal. A counter races 0 → 100 while the wordmark holds,
 * then the panel wipes upward to reveal the hero.
 */
export default function Preloader() {
    const reduce = useReducedMotion()
    const [done, setDone] = useState(false)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (reduce) {
            setDone(true)
            return
        }

        document.body.style.overflow = 'hidden'
        const start = performance.now()
        const duration = 1800
        let raf

        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - t, 3)
            setCount(Math.round(eased * 100))
            if (t < 1) {
                raf = requestAnimationFrame(tick)
            } else {
                setCount(100)
                setTimeout(() => setDone(true), 350)
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
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-white via-white to-violet-soft text-ink"
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.9, ease: EASE }}
                >
                    <motion.img
                        src="/.well-known/appspecific/logo.png"
                        alt="Diversify Digital"
                        draggable={false}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="h-[clamp(4rem,14vw,6rem)] w-auto rounded-[20px] shadow-lifted ring-1 ring-violet/10"
                    />

                    <div className="mt-9 flex w-[min(64vw,340px)] items-center justify-between font-mono text-[0.7rem] uppercase tracking-wide text-ink/50">
                        <span>Diversify Digital</span>
                        <span className="tabular-nums text-violet">{count}%</span>
                    </div>
                    <div className="mt-3 h-1 w-[min(64vw,340px)] overflow-hidden rounded-full bg-violet/10">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-bright to-violet-deep transition-[width] duration-100 ease-linear"
                            style={{ width: `${count}%` }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
