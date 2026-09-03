'use client'

import { IMAGES } from './images'
import { Reveal, Stagger, StaggerItem, ImageReveal } from './motion'

const PRINCIPLES = [
    {
        n: '01',
        title: 'Clarity before activity',
        desc: 'Every engagement starts with the real business problem, not a generic package of tactics.',
    },
    {
        n: '02',
        title: 'Useful over noisy',
        desc: 'Work that earns attention because it is relevant, considered and genuinely useful to people.',
    },
    {
        n: '03',
        title: 'Partners, not vendors',
        desc: 'Direct communication, honest feedback and a team that takes ownership of the outcome.',
    },
    {
        n: '04',
        title: 'Momentum you can measure',
        desc: 'Clear reporting and smart iteration keep the work connected to the growth you need.',
    },
]

export default function Philosophy() {
    return (
        <section id="values" className="section relative grain overflow-hidden bg-primary text-ivory">
            <div className="container relative z-10">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-5">
                        <div className="label label-line text-sand">How we work</div>
                        <Reveal as="h2" className="mt-6 display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] text-ivory">
                            Principles that shape
                            <br />
                            <span className="italic text-sand">every project.</span>
                        </Reveal>
                        <ImageReveal className="mt-10 hidden aspect-[5/4] overflow-hidden rounded-[24px] lg:block" delay={0.1}>
                            <img
                                src={IMAGES.philosophy}
                                alt="Abstract flowing form representing considered digital craft"
                                loading="lazy"
                                className="h-full w-full object-cover"
                            />
                        </ImageReveal>
                    </div>

                    <Stagger className="lg:col-span-6 lg:col-start-7">
                        {PRINCIPLES.map((p) => (
                            <StaggerItem
                                key={p.n}
                                className="grid grid-cols-[auto_1fr] gap-6 border-t border-white/12 py-8 first:border-t-0 first:pt-0"
                            >
                                <span className="font-sans text-xs tracking-editorial text-sand/70">{p.n}</span>
                                <div>
                                    <h3 className="display text-[clamp(1.4rem,3vw,2rem)] text-ivory">{p.title}</h3>
                                    <p className="mt-3 max-w-[420px] text-ivory/60">{p.desc}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </div>
        </section>
    )
}
