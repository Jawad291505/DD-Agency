'use client'

import { IMAGES } from '@/data/images'
import { REGISTER_CLIENT_URL } from '@/data/links'

const FACTS = [
    { label: 'Role', value: 'Founder & Owner' },
    { label: 'Based', value: 'Fully remote' },
    { label: 'Focus', value: 'Growth & Strategy' },
    { label: 'Experience', value: '9+ years' },
]

const PRINCIPLES = [
    {
        no: '01',
        title: 'Outcomes over vanity',
        desc: 'Every decision ties back to a real business result — revenue, retention, reach. Never a metric that only looks good in a deck.',
    },
    {
        no: '02',
        title: 'One team, one direction',
        desc: 'Strategy, creative and technology pulling together under one roof. No hand-offs, no finger-pointing, no stitched-together vendors.',
    },
    {
        no: '03',
        title: 'Craft you can feel',
        desc: 'The details matter. Fast, considered, beautiful work is the baseline — not an upsell.',
    },
]

export default function Owner() {
    return (
        <section id="owner" className="relative overflow-hidden bg-[#100b20] py-[clamp(5rem,10vw,9rem)]">
            {/* Seamless transition gradients */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#100b20] to-transparent z-[2]" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#100b20] to-transparent z-[2]" />

            {/* Ambient background */}
            <div className="absolute inset-0">
                <div className="absolute -right-32 top-0 h-[500px] w-[500px] rounded-full bg-violet-600/40 blur-[150px]" />
                <div className="absolute -left-32 bottom-0 h-[450px] w-[450px] rounded-full bg-violet-400/30 blur-[150px]" />
                <div className="absolute inset-0 grain" />
            </div>

            <div className="container relative z-10">
                <span className="label label-line text-violet-300/80">Meet our owner</span>

                {/* Intro — two-column grid */}
                <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Portrait */}
                    <div className="relative order-1 lg:order-none">
                        <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-3xl border border-white/[0.08]">
                            <img
                                src={IMAGES.owner}
                                alt="Waqar Butt — Founder & Owner of Diversify Digital"
                                loading="lazy"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#100b20]/70 via-transparent to-transparent" />
                            <div className="absolute inset-0 bg-violet-600/10 mix-blend-overlay" />
                        </div>
                        {/* Floating name tag */}
                        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-2xl border border-white/[0.08] bg-[#100b20]/80 px-6 py-3 backdrop-blur-md">
                            <p className="font-serif text-lg text-white">Waqar Butt</p>
                            <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-violet-300/70">
                                Founder &amp; Owner
                            </p>
                        </div>
                    </div>

                    {/* Intro copy */}
                    <div>
                        <h2 className="display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.02em] text-white">
                            The vision behind
                            <br />
                            <span className="italic text-gradient-violet">Diversify Digital.</span>
                        </h2>
                        <p className="mt-6 max-w-[520px] text-[1.02rem] leading-relaxed text-white/70">
                            Waqar Butt founded Diversify Digital on a simple belief — ambitious brands
                            deserve a partner who treats their growth like their own. Not a vendor, not
                            an order-taker, but a team invested in the outcome.
                        </p>
                        <p className="mt-4 max-w-[520px] text-[1.02rem] leading-relaxed text-white/70">
                            From the first strategy call to the numbers on the board, he keeps the whole
                            engine aligned — SEO, paid media, web, brand and creative all pulling in the
                            same direction.
                        </p>

                        {/* Quick facts */}
                        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {FACTS.map((f) => (
                                <div key={f.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                                    <span className="block font-mono text-[0.55rem] uppercase tracking-wide text-white/30">
                                        {f.label}
                                    </span>
                                    <span className="mt-1.5 block font-serif text-[0.95rem] text-violet-300">
                                        {f.value}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10">
                            <a href={REGISTER_CLIENT_URL} data-cursor-label="Let's talk" className="btn btn-primary">
                                Work with Waqar
                            </a>
                        </div>
                    </div>
                </div>

                {/* Principles — second two-column grid */}
                <div className="mt-24 grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                    {/* Left — heading */}
                    <div>
                        <span className="label label-line text-violet-300/80">What he stands for</span>
                        <h3 className="mt-6 display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] text-white">
                            Principles that
                            <br />
                            <span className="italic text-gradient-violet">shape the work.</span>
                        </h3>
                        <p className="mt-6 max-w-[380px] text-[0.98rem] leading-relaxed text-white/60">
                            These aren&apos;t slogans on a wall. They&apos;re the standards every project
                            is measured against.
                        </p>
                    </div>

                    {/* Right — principle list */}
                    <div className="flex flex-col border-t border-white/[0.08]">
                        {PRINCIPLES.map((p) => (
                            <div key={p.no} className="flex gap-6 border-b border-white/[0.08] py-8">
                                <span className="font-mono text-[0.8rem] text-violet-300/70">{p.no}</span>
                                <div>
                                    <h4 className="font-serif text-[clamp(1.2rem,2.4vw,1.7rem)] text-white">
                                        {p.title}
                                    </h4>
                                    <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-white/55">
                                        {p.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
