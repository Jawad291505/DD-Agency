'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { REGISTER_CLIENT_URL, REGISTER_TRAINER_URL } from './links'
import Magnetic from './Magnetic'
import Logo from './Logo'
import Counter from './Counter'

const EASE = [0.22, 1, 0.36, 1]

const META = [
    { k: 'Brands launched', v: '80+' },
    { k: 'Avg. traffic lift', v: '3.4x' },
    { k: 'Years building', v: '9+' },
]

export default function Hero() {
    const reduce = useReducedMotion()
    const sectionRef = useRef(null)

    // Scroll-linked parallax — the image drifts and the type lifts as you scroll,
    // adding depth without stealing attention.
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    })
    const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12])
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-12%'])
    const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0])

    const word = {
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: '110%' },
        show: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: EASE, delay: 0.15 + i * 0.12 },
        }),
    }

    return (
        <section ref={sectionRef} id="top" className="relative overflow-hidden bg-ivory pt-[76px]">
            <div className="container relative grid grid-cols-1 items-center gap-y-10 pb-[clamp(4rem,8vw,7rem)] pt-[clamp(3rem,7vw,6rem)] lg:grid-cols-12 lg:gap-x-8">
                {/* Left — editorial type block */}
                <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 lg:col-span-7">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="label label-line text-clay"
                    >
                        Digital marketing studio
                    </motion.div>

                    <h1 className="mt-8 display text-primary text-[clamp(2.7rem,8vw,6.6rem)] leading-[0.94] tracking-[-0.03em]">
                        <span className="block overflow-hidden">
                            <motion.span custom={0} variants={word} initial="hidden" animate="show" className="block">
                                Your vision,
                            </motion.span>
                        </span>
                        <span className="block overflow-hidden">
                            <motion.span custom={1} variants={word} initial="hidden" animate="show" className="block">
                                made visible to the
                            </motion.span>
                        </span>
                        <span className="block overflow-hidden">
                            <motion.span custom={2} variants={word} initial="hidden" animate="show" className="block italic text-clay">
                                right audience.
                            </motion.span>
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
                        className="mt-8 max-w-[460px] text-[1.05rem] leading-relaxed text-ink/70"
                    >
                        Diversify Digital turns ambitious ideas into discoverable, high-performing
                        brands through sharp strategy, thoughtful design and technology that works.
                    </motion.p>

                    {/* The two required role links — the core action of the site */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.72 }}
                        className="mt-10 flex flex-wrap items-center gap-4"
                    >
                        <Magnetic strength={0.5}>
                            <a href={REGISTER_CLIENT_URL} data-cursor-label="Let's talk" className="btn btn-primary">
                                Start a conversation
                            </a>
                        </Magnetic>
                        <Magnetic strength={0.4}>
                            <a href={REGISTER_TRAINER_URL} className="btn btn-outline-ink">
                                Explore our services
                            </a>
                        </Magnetic>
                    </motion.div>

                    <motion.dl
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, ease: EASE, delay: 0.9 }}
                        className="mt-14 flex max-w-[460px] items-end gap-10 border-t border-ink/10 pt-6"
                    >
                        {META.map((m) => (
                            <div key={m.k}>
                                <dd className="display text-3xl text-primary">
                                    <Counter value={m.v} />
                                </dd>
                                <dt className="mt-1 font-sans text-[0.7rem] uppercase tracking-editorial text-ink/50">
                                    {m.k}
                                </dt>
                            </div>
                        ))}
                    </motion.dl>
                </motion.div>

                {/* Right — framed cinematic image with parallax + slow zoom */}
                <div className="relative lg:col-span-5">
                    <motion.div
                        initial={{ clipPath: reduce ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)' }}
                        animate={{ clipPath: 'inset(0 0 0% 0)' }}
                        transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
                        data-cursor-label="Diversify"
                        className="relative aspect-[3/4] overflow-hidden rounded-t-[180px] rounded-b-[24px] md:aspect-[4/5]"
                    >
                        <motion.div style={{ y: imageY, scale: imageScale }} className="h-[115%] w-full">
                            <Logo className="h-full w-full" />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/30 via-transparent to-transparent" />
                    </motion.div>

                    {/* Floating metadata card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: EASE, delay: 1 }}
                        className="absolute -left-4 bottom-10 hidden rounded-2xl border border-ink/10 bg-ivory/90 px-6 py-4 backdrop-blur-md md:block lg:-left-16"
                    >
                        <p className="font-sans text-[0.7rem] uppercase tracking-editorial text-clay">One clear direction</p>
                        <p className="mt-1 font-serif text-lg text-primary">Strategy &amp; execution, in sync</p>
                    </motion.div>
                </div>
            </div>

            {/* Bottom rule with supporting line */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: EASE, delay: 1.1 }}
                className="border-y border-ink/10"
            >
                <div className="container flex items-center justify-between py-4 font-sans text-[0.7rem] uppercase tracking-editorial text-ink/50">
                    <span>Strategy · Design · Growth</span>
                    <span className="hidden sm:inline">Scroll to explore</span>
                    <span>Est. 2017</span>
                </div>
            </motion.div>
        </section >
    )
}
