'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { markAppReady } from '@/lib/ready'

const EASE = [0.22, 1, 0.36, 1]
const DURATION = 1200
const LOGO_HOLD = 800

/**
 * Preloader sequence:
 * 1. Count 000 → 100 with a de-blurring focus pull
 * 2. At 100% the number drops away, logo pops in with a spring
 * 3. Logo holds for 800ms
 * 4. Panel fades out to reveal the site
 */
export default function Preloader() {
    const reduce = useReducedMotion()
    const [done, setDone] = useState(false)
    const [count, setCount] = useState(0)
    const [showLogo, setShowLogo] = useState(false)

    useEffect(() => {
        if (reduce) { setDone(true); markAppReady(); return }
        document.body.style.overflow = 'hidden'
        const start = performance.now()
        let raf
        let logoTimer
        let doneTimer

        const tick = (now) => {
            const t = Math.min(1, (now - start) / DURATION)
            const eased = 1 - Math.pow(1 - t, 3)
            setCount(Math.round(eased * 100))
            if (t < 1) {
                raf = requestAnimationFrame(tick)
            } else {
                setCount(100)
                // Brief pause then show logo
                logoTimer = setTimeout(() => setShowLogo(true), 150)
                // Logo holds for LOGO_HOLD ms, then reveal site
                doneTimer = setTimeout(() => setDone(true), 150 + LOGO_HOLD)
            }
        }
        raf = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(raf)
            clearTimeout(logoTimer)
            clearTimeout(doneTimer)
            document.body.style.overflow = ''
        }
    }, [reduce])

    useEffect(() => {
        if (done) {
            document.body.style.overflow = ''
            markAppReady()
        }
    }, [done])

    const p = count / 100
    const blur = (12 * (1 - p)).toFixed(1)

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#100b20]"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                >
                    {/* Subtle grid */}
                    <div className="absolute inset-0 bg-grid opacity-20" />

                    {/* Ambient glow */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[120px] transition-all duration-500"
                        style={{
                            width: showLogo ? '500px' : '350px',
                            height: showLogo ? '500px' : '350px',
                        }}
                    />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="relative flex h-[clamp(6rem,30vw,12rem)] items-center justify-center">
                            <AnimatePresence mode="wait">
                                {!showLogo ? (
                                    /* De-blurring counter */
                                    <motion.div
                                        key="count"
                                        className="flex items-baseline"
                                        exit={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }}
                                        transition={{ duration: 0.25, ease: EASE }}
                                    >
                                        <span
                                            className="block font-mono text-[clamp(4rem,20vw,10rem)] font-light leading-none tracking-tight text-gradient-violet"
                                            style={{
                                                filter: `blur(${blur}px)`,
                                                opacity: 0.35 + 0.65 * p,
                                                willChange: 'filter, opacity',
                                            }}
                                        >
                                            {String(count).padStart(3, '0')}
                                        </span>
                                    </motion.div>
                                ) : (
                                    /* Logo pop — holds for 800ms */
                                    <motion.img
                                        key="logo"
                                        src="/.well-known/appspecific/logo.png"
                                        alt="Diversify Digital"
                                        draggable={false}
                                        initial={{ opacity: 0, scale: 0.4, rotate: -6 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 400,
                                            damping: 22,
                                            mass: 0.6,
                                        }}
                                        className="h-[clamp(5rem,28vw,10rem)] w-auto rounded-[20px] shadow-[0_30px_70px_-28px_rgba(124,58,237,0.5)] ring-1 ring-white/10"
                                    />
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Brand wordmark */}
                        <div className="mt-6 flex items-center gap-4 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-white/30">
                            <span>Diversify</span>
                            <span
                                className="h-px w-12 bg-violet-500/50"
                                style={{
                                    transform: `scaleX(${showLogo ? 1 : p})`,
                                    transformOrigin: 'left',
                                    transition: 'transform 0.3s ease',
                                }}
                            />
                            <span>Digital</span>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-5 h-px w-48 bg-white/10 overflow-hidden rounded-full">
                            <div
                                className="h-full bg-gradient-to-r from-violet-400 to-violet-600 rounded-full transition-[width] duration-100 ease-linear"
                                style={{ width: `${count}%` }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
