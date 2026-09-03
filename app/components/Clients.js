'use client'

import { Reveal, Stagger, StaggerItem } from './motion'
import Counter from './Counter'

const STATS = [
    { v: '120+', k: 'Happy clients' },
    { v: '98%', k: 'Retention rate' },
    { v: '3.4x', k: 'Avg. traffic lift' },
    { v: '15+', k: 'Industries served' },
]

const CLIENTS = [
    'Northstar', 'Lumen', 'Vertex', 'Coastline', 'Bloom & Co',
    'Halcyon', 'Meridian', 'Fieldwork', 'Atlas', 'Orbit',
]

export default function Clients() {
    // Duplicate the list so the marquee loops seamlessly.
    const marquee = [...CLIENTS, ...CLIENTS]

    return (
        <section id="clients" className="section bg-ivory-warm">
            <div className="container">
                <Reveal className="flex flex-col gap-6 text-center">
                    <div className="label label-line mx-auto text-clay">Satisfied clients</div>
                    <h2 className="display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] text-primary">
                        Trusted by brands that
                        <span className="italic text-clay"> keep coming back.</span>
                    </h2>
                </Reveal>

                {/* Stats row */}
                <Stagger className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-ink/10 md:grid-cols-4">
                    {STATS.map((s) => (
                        <StaggerItem key={s.k} className="group bg-ivory px-6 py-10 text-center transition-colors duration-500 ease-editorial hover:bg-primary-soft">
                            <p className="display text-[clamp(2.2rem,4vw,3.2rem)] text-primary">
                                <Counter value={s.v} />
                            </p>
                            <p className="mt-2 font-sans text-[0.72rem] uppercase tracking-editorial text-ink/50">
                                {s.k}
                            </p>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>

            {/* Full-bleed logo marquee — pauses on hover */}
            <div className="marquee-hover relative mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
                <div className="flex w-max animate-marquee gap-16 pr-16">
                    {marquee.map((name, i) => (
                        <span
                            key={`${name}-${i}`}
                            className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] italic text-primary/35 transition-colors duration-300 hover:text-primary"
                        >
                            {name}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}
