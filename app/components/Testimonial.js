'use client'

import { IMAGES } from './images'
import { Reveal, ImageReveal } from './motion'

export default function Testimonial() {
    return (
        <section className="section bg-ivory">
            <div className="container">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-4 lg:col-start-1">
                        <ImageReveal className="relative mx-auto aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-[24px]">
                            <img
                                src={IMAGES.portrait}
                                alt="Portrait of a Diversify Digital client"
                                loading="lazy"
                                className="h-full w-full object-cover"
                            />
                        </ImageReveal>
                    </div>

                    <div className="lg:col-span-8">
                        <Reveal className="label text-clay">Client perspective</Reveal>
                        <Reveal as="blockquote" delay={0.08}>
                            <p className="mt-6 display text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.2] text-primary">
                                Diversify helped us turn a complicated offer into a digital experience
                                that people understand, trust and act on. The growth has followed.
                            </p>
                        </Reveal>
                        <Reveal delay={0.16} className="mt-8 flex items-center gap-4">
                            <span className="h-px w-10 bg-clay" />
                            <div>
                                <p className="font-serif text-lg text-primary">Maya Chen</p>
                                <p className="font-sans text-[0.72rem] uppercase tracking-editorial text-ink/50">
                                    Founder, Northstar Studio
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
