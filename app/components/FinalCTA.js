'use client'

import { IMAGES } from './images'
import { Reveal } from './motion'
import Magnetic from './Magnetic'
import { REGISTER_CLIENT_URL, REGISTER_TRAINER_URL } from './links'

export default function FinalCTA() {
    return (
        <section id="get-started" className="relative isolate overflow-hidden bg-primary-deep text-ivory">
            {/* Cinematic background image, dimmed for legibility */}
            <div className="absolute inset-0 -z-10">
                <img
                    src={IMAGES.experienceSmall}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-full w-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary-deep/80 via-primary/70 to-primary-deep/90" />
            </div>

            <div className="container flex flex-col items-center py-[clamp(6rem,14vw,12rem)] text-center">
                <Reveal className="label text-sand">Have a challenge?</Reveal>
                <Reveal as="h2" delay={0.06} className="mt-6 display text-[clamp(2.4rem,7vw,5.4rem)] leading-[0.98] text-ivory">
                    Ready to make your
                    <br />
                    <span className="italic text-sand">next move?</span>
                </Reveal>
                <Reveal as="p" delay={0.14} className="mt-8 max-w-[460px] text-ivory/70">
                    Tell us where you want to go. We will help you find the clearest, most effective
                    way to get there.
                </Reveal>
                <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <Magnetic strength={0.5}>
                        <a href={REGISTER_CLIENT_URL} data-cursor-label="Let's talk" className="btn btn-ivory">
                            Start a conversation
                        </a>
                    </Magnetic>
                    <Magnetic strength={0.4}>
                        <a href={REGISTER_TRAINER_URL} className="btn btn-outline-ivory">
                            See what we do
                        </a>
                    </Magnetic>
                </Reveal>
            </div>
        </section>
    )
}
