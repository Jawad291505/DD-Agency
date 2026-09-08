'use client'

import { useRef, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'

const LINE_1 = ['We', 'don\'t', 'chase', 'trends.']
const LINE_2 = ['We', 'build', 'digital', 'momentum.']
const ALL_WORDS = [...LINE_1, '|', ...LINE_2]

export default function BrandStory() {
    const sectionRef = useRef(null)
    const wordsRef = useRef([])
    const reduce = useReducedMotion()

    useEffect(() => {
        if (reduce) {
            wordsRef.current.forEach((el) => { if (el) el.style.opacity = '1' })
            return
        }

        let ticking = false
        const onScroll = () => {
            if (ticking) return
            ticking = true
            requestAnimationFrame(() => {
                const section = sectionRef.current
                if (!section) { ticking = false; return }
                const rect = section.getBoundingClientRect()
                const vh = window.innerHeight
                const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)))
                const words = wordsRef.current
                const total = words.filter(e => e && !e.dataset.break).length

                for (let i = 0; i < words.length; i++) {
                    const el = words[i]
                    if (!el || el.dataset.break) continue
                    const idx = parseInt(el.dataset.idx)
                    const wordProgress = (progress - idx / total * 0.5) / 0.5
                    const opacity = Math.max(0.12, Math.min(1, wordProgress))
                    el.style.opacity = String(opacity)
                    el.style.transform = `translateY(${(1 - Math.min(1, Math.max(0, wordProgress))) * 6}px)`
                }
                ticking = false
            })
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [reduce])

    let wordIdx = 0

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-[#100b20] py-[clamp(5rem,20vh,16rem)]">
            {/* Seamless transition gradients */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#100b20] to-transparent z-[2]" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#100b20] to-transparent z-[2]" />
            {/* Torch glow behind text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-violet-600/30 blur-[200px]" />
            <div className="absolute top-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-violet-400/25 blur-[140px]" />

            <div className="container relative z-10">
                <div className="mx-auto max-w-5xl">
                    <p className="display text-center text-[clamp(2.2rem,5.5vw,5rem)] leading-[1.1] tracking-[-0.02em]">
                        {ALL_WORDS.map((word, i) => {
                            if (word === '|') return <br key={`br-${i}`} className="hidden md:block" />
                            const currentIdx = wordIdx++
                            const isAccent = ['digital', 'momentum.'].includes(word)
                            return (
                                <span
                                    key={i}
                                    ref={(el) => { wordsRef.current[i] = el }}
                                    data-idx={currentIdx}
                                    className={`inline-block transition-transform duration-200 ${isAccent ? 'italic text-violet-300' : 'text-white'
                                        }`}
                                    style={{ opacity: reduce ? 1 : 0.12 }}
                                >
                                    {word}&nbsp;
                                </span>
                            )
                        })}
                    </p>
                </div>

                <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-8 text-center sm:mt-16">
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-violet-400/70 to-transparent" />
                    <p className="max-w-lg text-[1.05rem] leading-relaxed text-white/65">
                        Strategy, growth, technology, and creative — all under one roof, moving in the same direction.
                        No juggling vendors, no mixed signals. One team, measurable results.
                    </p>
                </div>
            </div>
        </section>
    )
}
