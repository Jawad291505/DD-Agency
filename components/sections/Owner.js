'use client'

import { IMAGES } from '@/data/images'
import { Reveal, ImageReveal } from '@/lib/motion'
import { REGISTER_CLIENT_URL } from '@/data/links'

/**
 * "From our founder" — a short personal note from the owner.
 * TODO: replace the name, title, photo and message below with the real ones.
 * For the photo: drop a file in /public and set IMAGES.owner to its path.
 */
const OWNER = {
    name: 'Waqar Butt',
    role: 'Founder & Managing Director',
    photo: IMAGES.owner,
    paragraphs: [
        'I started Diversify Digital with one belief: that brands grow fastest when strategy, technology and creative pull in the same direction — not when they are scattered across five vendors who never speak.',
        'Everything we do is built around that. Senior people on every project, decisions tied to real business outcomes, and a partnership that is honest even when the honest answer is hard to hear.',
        'If you are weighing up who to trust with your growth, I would love to hear where you want to take your brand — and tell you plainly how we can help.',
    ],
}

export default function Owner() {
    return (
        <section id="founder" className="section relative torch-br overflow-hidden bg-paper">
            <div className="container relative z-10">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                    {/* Portrait */}
                    <ImageReveal className="lg:col-span-5">
                        <figure className="relative">
                            <div
                                className="frame-gradient relative overflow-hidden rounded-[28px] shadow-glow"
                                style={{ '--frame-bg': '#FAF7FE' }}
                            >
                                <img
                                    src={OWNER.photo}
                                    alt={`${OWNER.name}, ${OWNER.role} of Diversify Digital`}
                                    loading="lazy"
                                    className="aspect-[4/5] h-full w-full object-cover"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-900/45 via-transparent to-transparent" />
                            </div>
                            <figcaption className="absolute bottom-5 left-5 right-5 flex items-center gap-3">
                                <span className="h-px w-8 bg-gradient-to-r from-violet-bright to-transparent" />
                                <span>
                                    <span className="block font-serif text-lg text-paper">{OWNER.name}</span>
                                    <span className="block font-mono text-[0.66rem] uppercase tracking-wide text-paper/70">
                                        {OWNER.role}
                                    </span>
                                </span>
                            </figcaption>
                        </figure>
                    </ImageReveal>

                    {/* Message */}
                    <div className="lg:col-span-7">
                        <Reveal>
                            <div className="label label-line text-ink/60">From our founder</div>
                            <h2 className="mt-6 display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.08] text-ink">
                                Why we built
                                <span className="italic text-gradient"> Diversify Digital.</span>
                            </h2>
                        </Reveal>

                        <Reveal delay={0.1} className="mt-8 flex flex-col gap-5">
                            {OWNER.paragraphs.map((p) => (
                                <p key={p} className="max-w-[560px] text-[1.05rem] leading-relaxed text-ink/70">
                                    {p}
                                </p>
                            ))}
                        </Reveal>

                        <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                            <span
                                className="font-serif text-[1.9rem] italic text-gradient"
                                aria-hidden="true"
                            >
                                {OWNER.name}
                            </span>
                            <a href={REGISTER_CLIENT_URL} className="link-underline text-violet">
                                Start a conversation
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </a>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
