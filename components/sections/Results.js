'use client'

import { useRef, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Counter from '@/components/ui/Counter'

/**
 * Results — the climax of the visual journey.
 * Oversized numbers, accelerating energy, data flowing through the screen.
 */

const STATS = [
    { value: '80+', label: 'Projects delivered', sub: 'Across web, brand and growth' },
    { value: '3.4×', label: 'Average traffic lift', sub: 'Within the first 6 months' },
    { value: '98%', label: 'Client retention', sub: 'Partners who stay and scale' },
    { value: '15+', label: 'Industries served', sub: 'From SaaS to local retail' },
]

const WORDS = [
    'More visibility.',
    'More traffic.',
    'More conversions.',
    'More growth.',
]

export default function Results() {
    const sectionRef = useRef(null)
    const [visible, setVisible] = useState(false)
    const reduce = useReducedMotion()

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true) },
            { threshold: 0.1 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[#100b20] py-[clamp(6rem,14vw,12rem)]"
        >
            {/* Seamless transition gradients */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#100b20] to-transparent z-[2]" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#100b20] to-transparent z-[2]" />
            {/* Intensified background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[900px] rounded-full bg-violet-600/40 blur-[200px]" />
                <div className="absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-violet-400/30 blur-[150px]" />
                <div className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-violet-500/30 blur-[150px]" />
                <div className="absolute inset-0 grain" />
            </div>

            <div className="container relative z-10">
                {/* Big words — scroll reveal */}
                <div className="mx-auto max-w-4xl text-center">
                    {WORDS.map((word, i) => (
                        <div
                            key={word}
                            className="overflow-hidden"
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'none' : 'translateY(30px)',
                                transition: `opacity 0.8s ${i * 0.15}s cubic-bezier(0.22,1,0.36,1), transform 0.8s ${i * 0.15}s cubic-bezier(0.22,1,0.36,1)`,
                            }}
                        >
                            <span className={`display block text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.15] ${i === WORDS.length - 1 ? 'italic text-gradient-violet' : 'text-white'
                                }`}>
                                {word}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Stats grid */}
                <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-20 sm:gap-6 lg:grid-cols-4">
                    {STATS.map((s, i) => (
                        <div
                            key={s.label}
                            className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 md:p-8"
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'none' : 'translateY(24px)',
                                transition: `opacity 0.8s ${0.4 + i * 0.1}s cubic-bezier(0.22,1,0.36,1), transform 0.8s ${0.4 + i * 0.1}s cubic-bezier(0.22,1,0.36,1)`,
                            }}
                        >
                            {/* Subtle glow dot */}
                            <div className="absolute top-4 right-4 h-1 w-1 rounded-full bg-violet-400 shadow-[0_0_6px_rgba(167,139,250,0.5)]" />

                            <span className="font-mono text-[0.6rem] uppercase tracking-wide text-white/20">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <p className="mt-4 display text-[clamp(2.2rem,5vw,3.5rem)] leading-none text-white/90">
                                {visible ? <Counter value={s.value} /> : '0'}
                            </p>
                            <p className="mt-3 font-sans text-sm font-medium text-white/70">{s.label}</p>
                            <p className="mt-1 text-[0.8rem] text-white/45">{s.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Our Digital Marketing Process */}
                <div className="mt-24 border-t border-white/[0.06] pt-16">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="label label-line mx-auto text-violet-300/80">How we work</span>
                        <h3 className="mt-6 display text-[clamp(1.8rem,4vw,3rem)] leading-[1.08] text-white">
                            Our Digital Marketing Process:{' '}
                            <span className="italic text-gradient-violet">How Results Are Built</span>
                        </h3>
                        <p className="mx-auto mt-4 max-w-lg text-[0.95rem] text-white/55">
                            Diversify Digital follows a clear, data-driven process to deliver steady growth, visibility, and measurable results.
                        </p>
                    </div>
                    <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
                        {[
                            { step: '01', title: 'Market & Search Intent Analysis', desc: 'Understand your market and buyers before touching your site.' },
                            { step: '02', title: 'Technical & Content Optimization', desc: 'Build the foundation search engines and users need.' },
                            { step: '03', title: 'Authority & Conversion Growth', desc: 'Turn visibility into real conversion.' },
                        ].map((item, i) => (
                            <div
                                key={item.step}
                                className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8"
                                style={{
                                    opacity: visible ? 1 : 0,
                                    transform: visible ? 'none' : 'translateY(24px)',
                                    transition: `opacity 0.8s ${0.8 + i * 0.15}s cubic-bezier(0.22,1,0.36,1), transform 0.8s ${0.8 + i * 0.15}s cubic-bezier(0.22,1,0.36,1)`,
                                }}
                            >
                                <span className="font-mono text-[clamp(2rem,4vw,3rem)] font-light leading-none text-gradient-violet">
                                    {item.step}
                                </span>
                                <h4 className="mt-4 font-serif text-[1.1rem] leading-snug text-white/85">{item.title}</h4>
                                <p className="mt-2 text-[0.85rem] leading-relaxed text-white/50">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
