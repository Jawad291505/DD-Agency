'use client'

import { Reveal, Stagger, StaggerItem } from '@/lib/motion'
import Counter from '@/components/ui/Counter'

const REASONS = [
    {
        title: 'Results, not vanity metrics',
        desc: 'We optimise for revenue, pipeline and retention — the numbers that actually move your business, reported transparently every month.',
    },
    {
        title: 'Strategy before tactics',
        desc: 'Every engagement starts with your real business problem, not a generic package. The plan comes first; the execution follows it.',
    },
    {
        title: 'One team, no silos',
        desc: 'Growth, technology and creative sit together, so your brand pulls in one direction instead of five vendors pulling apart.',
    },
    {
        title: 'Senior people on your work',
        desc: 'You get the people who do the work, not a rotating cast of juniors. Direct access, honest feedback, real ownership.',
    },
    {
        title: 'Built to scale with you',
        desc: 'Everything we ship — sites, systems, campaigns — is engineered to grow, so today\u2019s launch never becomes tomorrow\u2019s ceiling.',
    },
    {
        title: 'A partnership that lasts',
        desc: 'Most of our clients stay for years. We play the long game because compounding growth is where the real value lives.',
    },
]

export default function WhyUs() {
    return (
        <section id="why" className="section relative torch overflow-hidden bg-paper">
            <div className="container relative z-10">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
                    {/* Sticky statement rail */}
                    <div className="lg:col-span-4">
                        <div className="lg:sticky lg:top-28">
                            <div className="label label-line text-ink/60">Why Diversify</div>
                            <h2 className="mt-6 display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.04] text-ink">
                                The difference is
                                <span className="italic"> how we work.</span>
                            </h2>
                            <p className="mt-6 max-w-[360px] text-ink/65">
                                Anyone can promise growth. We build the strategy, the systems and the
                                relationship that actually deliver it.
                            </p>

                            <div className="mt-10 rounded-3xl bg-gradient-to-br from-violet-deep via-violet-900 to-ink p-8 text-paper shadow-glow">
                                <p className="display text-[clamp(2.4rem,5vw,3.4rem)] leading-none text-paper">
                                    <Counter value="4.9" />
                                    <span className="text-gradient-light">/5</span>
                                </p>
                                <p className="mt-3 text-sm text-paper/70">
                                    Average client satisfaction across every project we&apos;ve closed
                                    out.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Reasons grid */}
                    <Stagger className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:col-span-8">
                        {REASONS.map((r, i) => (
                            <StaggerItem
                                key={r.title}
                                className="group relative bg-surface bg-gradient-to-br from-white to-violet-soft/60 p-8 transition-all duration-500 ease-editorial hover:from-violet-soft hover:to-surface md:p-9"
                            >
                                <span className="font-mono text-xs tracking-wide text-violet">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 className="mt-5 font-serif text-[1.4rem] leading-tight text-ink">
                                    {r.title}
                                </h3>
                                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/65 transition-colors duration-500 group-hover:text-ink/80">
                                    {r.desc}
                                </p>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </div>
        </section>
    )
}
