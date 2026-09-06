'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from '@/lib/motion'

const EASE = [0.22, 1, 0.36, 1]

const STEPS = [
    {
        n: '01',
        title: 'Discover',
        short: 'Understand',
        desc: 'We get close to your business, market and audience — auditing what exists and pinpointing the real opportunity before recommending a single tactic.',
        deliverables: ['Discovery workshop', 'Audit & analysis', 'Opportunity map'],
    },
    {
        n: '02',
        title: 'Strategize',
        short: 'Plan',
        desc: 'We turn insight into a clear, prioritised roadmap — the channels, messages and experiences that will move your numbers, with success defined up front.',
        deliverables: ['Growth strategy', 'Channel plan', 'KPIs & targets'],
    },
    {
        n: '03',
        title: 'Build',
        short: 'Create',
        desc: 'Strategy becomes real work — websites, campaigns, brand and content — crafted by senior people and engineered to perform and scale.',
        deliverables: ['Design & build', 'Campaign setup', 'Content production'],
    },
    {
        n: '04',
        title: 'Launch',
        short: 'Ship',
        desc: 'We go live with rigour — QA, tracking and analytics wired in from day one so every result is measurable from the very first click.',
        deliverables: ['QA & testing', 'Analytics setup', 'Go-live'],
    },
    {
        n: '05',
        title: 'Grow',
        short: 'Scale',
        desc: 'We measure what matters, learn fast and keep improving the parts that move your business — compounding results month after month.',
        deliverables: ['Reporting', 'Optimisation', 'Ongoing strategy'],
    },
]

export default function Process() {
    const [active, setActive] = useState(0)
    const reduce = useReducedMotion()
    const step = STEPS[active]

    return (
        <section id="process" className="section relative  overflow-hidden bg-paper">
            <div className="container relative z-10">
                <Reveal className="grid grid-cols-1 items-end gap-8 md:grid-cols-2">
                    <div>
                        <div className="label label-line text-ink/60">How we work</div>
                        <h2 className="mt-6 display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] text-ink">
                            A process that
                            <br />
                            <span className="italic">removes the guesswork.</span>
                        </h2>
                    </div>
                    <p className="max-w-[400px] text-ink/60 md:justify-self-end md:text-right">
                        Five clear stages, so you always know where your project stands and what
                        happens next. No black boxes, no surprises.
                    </p>
                </Reveal>

                {/* Step rail */}
                <div className="mt-16">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                        {STEPS.map((s, i) => (
                            <button
                                key={s.n}
                                type="button"
                                onClick={() => setActive(i)}
                                aria-pressed={active === i}
                                className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500 ease-editorial ${active === i
                                    ? 'border-violet bg-gradient-to-br from-violet via-violet to-violet-deep text-paper shadow-glow'
                                    : 'border-ink/12 bg-surface-gradient text-ink hover:border-violet/40'
                                    }`}
                            >
                                <span
                                    className={`font-mono text-xs tracking-wide ${active === i ? 'text-violet-light' : 'text-ink/45'
                                        }`}
                                >
                                    {s.n}
                                </span>
                                <p className="mt-3 font-serif text-lg leading-tight">{s.title}</p>
                                <p
                                    className={`mt-0.5 font-mono text-[0.68rem] uppercase tracking-wide ${active === i ? 'text-paper/50' : 'text-ink/40'
                                        }`}
                                >
                                    {s.short}
                                </p>
                            </button>
                        ))}
                    </div>

                    {/* Progress bar */}
                    <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-ink/10">
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-violet-bright via-violet to-violet-deep"
                            initial={false}
                            animate={{ width: `${((active + 1) / STEPS.length) * 100}%` }}
                            transition={{ duration: 0.6, ease: EASE }}
                        />
                    </div>

                    {/* Active step detail */}
                    <motion.div
                        key={step.n}
                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="mt-10 grid grid-cols-1 gap-8 rounded-[28px] bg-surface-gradient p-8 shadow-card md:grid-cols-12 md:p-12"
                    >
                        <div className="md:col-span-2">
                            <span className="display text-[clamp(3rem,7vw,5rem)] leading-none text-line-strong">
                                {step.n}
                            </span>
                        </div>
                        <div className="md:col-span-6">
                            <h3 className="display text-[clamp(1.8rem,3.4vw,2.6rem)] text-ink">
                                {step.title}
                            </h3>
                            <p className="mt-4 max-w-[440px] text-[1.02rem] leading-relaxed text-ink/70">
                                {step.desc}
                            </p>
                        </div>
                        <div className="md:col-span-4">
                            <p className="font-mono text-[0.7rem] uppercase tracking-wide text-ink/45">
                                What you get
                            </p>
                            <ul className="mt-4 flex flex-col gap-3">
                                {step.deliverables.map((d) => (
                                    <li key={d} className="flex items-center gap-3 text-[0.95rem] text-ink/75">
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet text-paper">
                                            <svg
                                                width="11"
                                                height="11"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.4"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M20 6 9 17l-5-5" />
                                            </svg>
                                        </span>
                                        {d}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
