'use client'

import { Reveal, Stagger, StaggerItem } from '@/lib/motion'
import Counter from '@/components/ui/Counter'

const STATS = [
    { v: '80+', k: 'Projects delivered', d: 'Across web, brand and growth' },
    { v: '3.4x', k: 'Average traffic lift', d: 'Within the first 6 months' },
    { v: '98%', k: 'Client retention', d: 'Partners who stay and scale' },
    { v: '15+', k: 'Industries served', d: 'From SaaS to local retail' },
]

const SERVICES = [
    'SEO',
    'Google Ads',
    'Meta Ads',
    'Social Media',
    'Web Design',
    'Web Development',
    'App Development',
    'E-commerce',
    'Branding',
    'Graphic Design',
    'Content Creation',
    'Digital Solutions',
]

export default function Trust() {
    const marquee = [...SERVICES, ...SERVICES]

    return (
        <section id="trust" className="section relative torch overflow-hidden bg-paper">
            <div className="container relative z-10">
                <Reveal className="grid grid-cols-1 items-end gap-8 md:grid-cols-[1fr_auto]">
                    <p className="max-w-[720px] display text-[clamp(1.6rem,3.6vw,2.6rem)] leading-[1.2] text-ink">
                        Ambitious brands partner with us because we treat their growth like our own —
                        <span className="text-ink/45"> and the numbers back it up.</span>
                    </p>
                    <div className="label label-line text-ink/60 md:pb-3">Trusted to deliver</div>
                </Reveal>

                <Stagger className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
                    {STATS.map((s, i) => (
                        <StaggerItem key={s.k} className="relative border-t-2 border-ink pt-6">
                            <span className="absolute right-0 top-4 font-mono text-[0.66rem] text-ink/35">
                                0{i + 1}
                            </span>
                            <p className="display text-[clamp(2.6rem,6vw,4rem)] leading-none text-ink">
                                <Counter value={s.v} />
                            </p>
                            <p className="mt-4 font-sans text-sm font-semibold text-ink">{s.k}</p>
                            <p className="mt-1 text-[0.85rem] leading-snug text-ink/55">{s.d}</p>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>

            {/* Full-bleed services marquee */}
            <div className="mt-20 bg-paper">
                <p className="container mb-8 font-mono text-[0.7rem] uppercase tracking-wide text-ink/40">
                    ↓ What we do
                </p>
                <div className="marquee-hover bg-paper relative overflow-hidden border-y border-ink/12 py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <div className="flex w-max animate-marquee gap-14 pr-14">
                        {marquee.map((name, i) => (
                            <span
                                key={`${name}-${i}`}
                                className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] italic text-ink/25 transition-colors duration-300 hover:text-ink"
                            >
                                {name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
