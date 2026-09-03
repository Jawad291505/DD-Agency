'use client'

import { IMAGES } from './images'
import { Reveal, Stagger, StaggerItem, ImageReveal } from './motion'

const VALUES = [
    ['Ambition', 'We aim past the obvious. Every brand we touch is pushed toward the boldest version of itself.'],
    ['Integrity', 'Honest advice, transparent reporting and work we are proud to put our name behind.'],
    ['Craft', 'Details compound. We sweat the small things so the big picture feels effortless.'],
    ['Partnership', 'We win when you win. Your goals become the scoreboard we play against.'],
]

export default function About() {
    return (
        <section id="about" className="section overflow-hidden bg-ivory">
            <div className="container">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
                    {/* Left — ambition statement */}
                    <div className="lg:col-span-6">
                        <div className="label label-line text-clay">About us</div>
                        <Reveal
                            as="h2"
                            className="mt-6 display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] text-primary"
                        >
                            Driven by ambition,
                            <br />
                            <span className="italic text-clay">grounded in values.</span>
                        </Reveal>
                        <Reveal
                            as="p"
                            delay={0.1}
                            className="mt-8 max-w-[480px] text-[1.05rem] leading-relaxed text-ink/70"
                        >
                            Diversify Digital exists to help ambitious brands become impossible to
                            ignore. Our ambition is simple and relentless — to build digital presence
                            that earns attention, trust and measurable growth.
                        </Reveal>
                        <Reveal
                            as="p"
                            delay={0.16}
                            className="mt-5 max-w-[480px] text-[1.05rem] leading-relaxed text-ink/70"
                        >
                            We combine strategy, design and technology under one roof, so every part of
                            your brand pulls in the same direction. No silos, no guesswork — just a
                            team that cares as much about your outcome as you do.
                        </Reveal>

                        <ImageReveal
                            className="mt-10 aspect-[16/10] overflow-hidden rounded-[24px]"
                            delay={0.2}
                        >
                            <img
                                src={IMAGES.philosophy}
                                alt="Abstract dimensional render representing ambition and craft"
                                loading="lazy"
                                className="h-full w-full object-cover"
                            />
                        </ImageReveal>
                    </div>

                    {/* Right — values grid */}
                    <div className="lg:col-span-5 lg:col-start-8">
                        <div className="label label-line text-clay">What we stand for</div>
                        <Stagger className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-[24px] border border-ink/10 sm:grid-cols-2">
                            {VALUES.map(([title, desc]) => (
                                <StaggerItem
                                    key={title}
                                    className="bg-ivory-warm p-8 transition-colors duration-500 ease-editorial hover:bg-primary-soft"
                                >
                                    <h3 className="display text-[1.5rem] text-primary">{title}</h3>
                                    <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/65">{desc}</p>
                                </StaggerItem>
                            ))}
                        </Stagger>

                        <Reveal delay={0.2} className="mt-8 rounded-[24px] bg-primary p-8 text-ivory">
                            <p className="font-sans text-[0.72rem] uppercase tracking-editorial text-sand">
                                Our ambition
                            </p>
                            <p className="mt-4 display text-[clamp(1.4rem,2.6vw,1.9rem)] leading-snug text-ivory">
                                To be the growth partner brands recommend to the people they respect
                                most.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
