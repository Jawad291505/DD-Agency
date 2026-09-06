'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { markAppReady } from '@/lib/ready'

const EASE = [0.22, 1, 0.36, 1]

// Kept short on purpose — the count is a flourish, not a gate. Tuned so it
// still feels deliberate on a fast connection but never holds the page back.
const DURATION = 1100
const MAX_BLUR = 14 // px of blur on the numerals at 0%, easing to 0 at 100%
const LOGO_HOLD = 800 // ms the popped logo holds on screen before the panel slides

/**
 * First-load reveal, in three fast beats:
 *   1. a big numeral races 0 → 100, sharpening out of a blur (focus pull)
 *   2. at 100% the numeral drops out and the logo pops open with a spring
 *   3. the whole panel slides away downward to reveal the page
 *
 * Cheap on mobile: only transforms, opacity, and a blur on one small text
 * node — never a full-screen backdrop filter.
 */
export default function Preloader() {
    const reduce = useReducedMotion()
    const [done, setDone] = useState(false)
    const [count, setCount] = useState(0)
    const [popped, setPopped] = useState(false) // logo revealed

    useEffect(() => {
        if (reduce) {
            setDone(true)
            return
        }

        document.body.style.overflow = 'hidden'
        const start = performance.now()
        let raf
        let popTimer
        let doneTimer

        const tick = (now) => {
            const t = Math.min(1, (now - start) / DURATION)
            const eased = 1 - Math.pow(1 - t, 3)
            setCount(Math.round(eased * 100))
            if (t < 1) {
                raf = requestAnimationFrame(tick)
            } else {
                setCount(100)
                popTimer = setTimeout(() => setPopped(true), 120)
                doneTimer = setTimeout(() => setDone(true), 120 + LOGO_HOLD)
            }
        }
        raf = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(raf)
            clearTimeout(popTimer)
            clearTimeout(doneTimer)
            document.body.style.overflow = ''
        }
    }, [reduce])

    useEffect(() => {
        if (done) {
            document.body.style.overflow = ''
            // Release gated animations (hero counters, etc.) now that the
            // panel is sliding away.
            markAppReady()
        }
    }, [done])

    // 0 → 1 progress, used to drive blur + the numeral's settle.
    const p = count / 100
    const blur = (MAX_BLUR * (1 - p)).toFixed(2)

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-white via-white to-violet-soft text-ink"
                    initial={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.72, ease: EASE }}
                >
                    <div className="relative flex h-[clamp(6rem,32vw,13rem)] items-center justify-center">
                        <AnimatePresence mode="wait">
                            {!popped ? (
                                /* Giant de-blurring numeral — the focus pull */
                                <motion.div
                                    key="count"
                                    className="flex items-baseline font-sans font-semibold leading-none tracking-tight"
                                    exit={{ opacity: 0, scale: 0.82, filter: 'blur(10px)' }}
                                    transition={{ duration: 0.28, ease: EASE }}
                                >
                                    <span
                                        className="tabular-nums text-[clamp(5rem,26vw,13rem)] bg-gradient-to-br from-violet-bright via-violet to-violet-deep bg-clip-text text-transparent"
                                        style={{
                                            filter: `blur(${blur}px)`,
                                            opacity: 0.35 + 0.65 * p,
                                            willChange: 'filter',
                                        }}
                                    >
                                        {count}
                                    </span>
                                    <span
                                        className="ml-1 text-[clamp(1.5rem,6vw,3rem)] text-violet/60"
                                        style={{ filter: `blur(${(blur * 0.6).toFixed(2)}px)` }}
                                    >
                                        %
                                    </span>
                                </motion.div>
                            ) : (
                                /* Logo pops open with a spring */
                                <motion.img
                                    key="logo"
                                    src="/.well-known/appspecific/logo.png"
                                    alt="Diversify Digital"
                                    draggable={false}
                                    initial={{ opacity: 0, scale: 0.4, rotate: -8 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    transition={{ type: 'spring', stiffness: 480, damping: 20, mass: 0.7 }}
                                    className="h-[clamp(6rem,32vw,11rem)] w-auto rounded-[24px] shadow-lifted ring-1 ring-violet/10"
                                />
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Wordmark + hairline track */}
                    <div className="mt-6 flex w-[min(72vw,360px)] items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink/45">
                        <span>Diversify</span>
                        <span>Digital</span>
                    </div>
                    <div className="mt-3 h-px w-[min(72vw,360px)] bg-ink/10">
                        <div
                            className="h-full origin-left bg-gradient-to-r from-violet-bright to-violet-deep"
                            style={{ transform: `scaleX(${popped ? 1 : p})` }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
