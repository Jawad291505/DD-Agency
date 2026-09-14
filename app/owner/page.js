'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ConstellationBackground from '@/components/effects/ConstellationBackground'
import ScrollProgress from '@/components/effects/ScrollProgress'
import Magnetic from '@/components/ui/Magnetic'
import { IMAGES } from '@/data/images'
import { REGISTER_CLIENT_URL } from '@/data/links'

const EASE = [0.22, 1, 0.36, 1]

const TEAM = [
    { name: 'Sarah Mitchell', role: 'Creative Director', image: IMAGES.portrait },
    { name: 'James Chen', role: 'Lead Developer', image: IMAGES.portrait2 },
    { name: 'Amara Osei', role: 'SEO Strategist', image: IMAGES.portrait3 },
    { name: 'Liam Farrell', role: 'Paid Media Manager', image: IMAGES.portrait },
    { name: 'Priya Sharma', role: 'Brand Designer', image: IMAGES.portrait2 },
    { name: 'Alex Novak', role: 'Content Strategist', image: IMAGES.portrait3 },
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

/* ── Page ───────────────────────────────────────────────────────────── */
export default function OwnerPage() {
    return (
        <>
            <Navbar />
            <ScrollProgress />
            <ConstellationBackground />

            <main className="relative z-10 min-h-screen">
                {/* ── Compact page identifier ──────────────────────────── */}
                <section className="relative pt-24 pb-4 sm:pt-28 sm:pb-6">
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: EASE }}
                            className="flex items-center gap-4"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                                <span className="h-2 w-2 rounded-full bg-violet-400" />
                            </span>
                            <div>
                                <h1 className="font-serif text-[1.3rem] text-white sm:text-[1.5rem]">Our People</h1>
                                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/35">
                                    Leadership &amp; team
                                </p>
                            </div>
                        </motion.div>
                        <div className="mt-6 h-px w-full bg-white/[0.06]" />
                    </div>
                </section>

                {/* ── Owner profile card ────────────────────────────────── */}
                <section className="relative py-8 sm:py-12">
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                            className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm sm:p-10"
                        >
                            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
                                <div className="relative mx-auto lg:mx-0">
                                    <div className="relative aspect-[4/5] w-48 overflow-hidden rounded-2xl border border-white/[0.08] sm:w-56 lg:w-full">
                                        <img
                                            src={IMAGES.owner}
                                            alt="Waqar Butt — Founder & Owner of Diversify Digital Global"
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#100b20]/50 via-transparent to-transparent" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                                        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-white">Waqar Butt</h2>
                                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-violet-300/60">Founder &amp; Owner</span>
                                    </div>
                                    <p className="mt-4 max-w-[540px] text-[0.98rem] leading-relaxed text-white/65">
                                        Waqar founded Diversify Digital Global on a simple belief — ambitious brands
                                        deserve a partner who treats their growth like their own. Not a vendor, not
                                        an order-taker, but a team invested in the outcome.
                                    </p>
                                    <p className="mt-3 max-w-[540px] text-[0.98rem] leading-relaxed text-white/65">
                                        From the first strategy call to the numbers on the board, he keeps the whole
                                        engine aligned — SEO, paid media, web, brand and creative all pulling in the
                                        same direction.
                                    </p>
                                    <div className="mt-6 flex flex-wrap gap-3">
                                        {[
                                            { label: 'Based', value: 'Fully remote' },
                                            { label: 'Focus', value: 'Growth & Strategy' },
                                            { label: 'Experience', value: '9+ years' },
                                        ].map((f) => (
                                            <span key={f.label} className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2">
                                                <span className="font-mono text-[0.55rem] uppercase tracking-wide text-white/30">{f.label}</span>
                                                <span className="font-serif text-[0.85rem] text-violet-300">{f.value}</span>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-8">
                                        <Magnetic strength={0.4}>
                                            <a href={REGISTER_CLIENT_URL} data-cursor-label="Let's talk" className="btn btn-primary">
                                                Work with Waqar
                                            </a>
                                        </Magnetic>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <OwnerMessage />
                <PrinciplesSection />
                <TeamSection />
            </main>

            <Footer />
        </>
    )
}

/* ── Owner message ─────────────────────────────────────────────────── */
function OwnerMessage() {
    return (
        <section className="relative py-12 sm:py-16">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="mx-auto max-w-3xl rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 sm:p-12 backdrop-blur-sm"
                >
                    <div className="flex items-center gap-3">
                        <span className="h-8 w-1 rounded-full bg-gradient-to-b from-violet-400 to-violet-600" />
                        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-violet-400/60">A message from the founder</span>
                    </div>
                    <blockquote className="mt-6">
                        <p className="font-serif text-[clamp(1.1rem,2.5vw,1.4rem)] italic leading-relaxed text-white/75">
                            &ldquo;I started Diversify Digital Global because I believed marketing could be more
                            honest, more integrated, and more human. Every brand we partner with gets
                            the same thing — a team that cares about the outcome as much as they do.
                            We don&apos;t just deliver work; we deliver growth you can see, track, and
                            build on. That&apos;s the only standard worth having.&rdquo;
                        </p>
                    </blockquote>
                    <div className="mt-6 flex items-center gap-4">
                        <img src={IMAGES.owner} alt="Waqar Butt" className="h-12 w-12 rounded-full border border-white/10 object-cover" />
                        <div>
                            <p className="font-serif text-sm text-white">Waqar Butt</p>
                            <p className="font-mono text-[0.6rem] uppercase tracking-wider text-white/40">Founder &amp; Owner</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

/* ── Principles ────────────────────────────────────────────────────── */
function PrinciplesSection() {
    return (
        <section className="relative py-12 sm:py-16">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
                >
                    <div>
                        <span className="label label-line text-violet-300/80">What he stands for</span>
                        <h2 className="mt-6 display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05] text-white">
                            Principles that<br />
                            <span className="italic text-gradient-violet">shape the work.</span>
                        </h2>
                        <p className="mt-6 max-w-[380px] text-[0.98rem] leading-relaxed text-white/60">
                            These aren&apos;t slogans on a wall. They&apos;re the standards every project
                            is measured against.
                        </p>
                    </div>
                    <div className="flex flex-col border-t border-white/[0.08]">
                        {PRINCIPLES.map((p) => (
                            <div key={p.no} className="flex gap-6 border-b border-white/[0.08] py-8">
                                <span className="font-mono text-[0.8rem] text-violet-300/70">{p.no}</span>
                                <div>
                                    <h4 className="font-serif text-[clamp(1.2rem,2.4vw,1.7rem)] text-white">{p.title}</h4>
                                    <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-white/55">{p.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

/* ── Team showcase — awwwards-grade transparent-figure layout ─────── */
function TeamSection() {
    const reduce = useReducedMotion()

    const stagger = {
        hidden: {},
        show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
    }
    const memberUp = {
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 50, scale: 0.97 },
        show: {
            opacity: 1, y: 0, scale: 1,
            transition: { duration: 0.9, ease: EASE },
        },
    }
    const leaderUp = {
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 },
        show: {
            opacity: 1, y: 0, scale: 1,
            transition: { duration: 1, ease: EASE },
        },
    }

    return (
        <section className="relative py-20 sm:py-32 overflow-hidden">
            {/* Section ambient glow */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-violet-600/15 blur-[200px]" />

            <div className="container relative">
                {/* Section header — centered */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="mb-20 sm:mb-28 text-center"
                >
                    <span className="label label-line text-violet-400/70">The team</span>
                    <h2 className="mt-6 display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] text-white/90">
                        The people behind<br />
                        <span className="italic text-gradient-violet text-glow-violet">the results.</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-lg text-[0.95rem] leading-relaxed text-white/50">
                        A tight-knit team of specialists — each one embedded across strategy,
                        creative and technology so nothing falls through the cracks.
                    </p>
                </motion.div>

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-5% 0px' }}
                >
                    {/* ── Owner — cinematic focal point ────────────────── */}
                    <motion.div variants={leaderUp} className="mb-20 sm:mb-28 flex justify-center">
                        <PersonFigure
                            name="Waqar Butt"
                            role="Founder & Owner"
                            image={IMAGES.owner}
                            isLead
                        />
                    </motion.div>

                    {/* ── Thin divider with label ──────────────────────── */}
                    <div className="mb-14 sm:mb-20 flex items-center gap-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-white/20">Team</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                    </div>

                    {/* ── Team members ─────────────────────────────────── */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-16 sm:grid-cols-3 sm:gap-x-10 sm:gap-y-20 lg:gap-x-14">
                        {TEAM.map((m, i) => (
                            <motion.div key={m.name} variants={memberUp} className="flex justify-center">
                                <PersonFigure
                                    name={m.name}
                                    role={m.role}
                                    image={m.image}
                                    index={i + 1}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

/* ── Person figure — transparent-bg, magnetic, multi-layer glow ────── */
function PersonFigure({ name, role, image, isLead, index }) {
    return (
        <Magnetic strength={isLead ? 0.15 : 0.25} as="div">
            <div className="group flex flex-col items-center text-center">
                {/* Figure container */}
                <div className={`relative ${isLead ? 'h-64 w-52 sm:h-[22rem] sm:w-72' : 'h-44 w-36 sm:h-56 sm:w-44'}`}>

                    {/* Multi-layer glow — warm inner core + cool outer aura */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4">
                        {/* Outer aura */}
                        <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[60%] rounded-full opacity-0 transition-opacity duration-1000 group-hover:opacity-100"
                            style={{
                                background: 'radial-gradient(ellipse at 50% 80%, rgba(91,33,182,0.15), transparent 70%)',
                                filter: 'blur(30px)',
                            }}
                        />
                        {/* Inner core glow */}
                        <div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full transition-opacity duration-700"
                            style={{
                                width: isLead ? '60%' : '50%',
                                height: '35%',
                                background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.3), transparent 70%)',
                                filter: 'blur(16px)',
                                opacity: 0.5,
                            }}
                        />
                    </div>

                    {/* Ground reflection — faint mirrored gradient */}
                    <div
                        className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 h-8 rounded-full opacity-30 transition-opacity duration-700 group-hover:opacity-50"
                        style={{
                            width: isLead ? '45%' : '40%',
                            background: 'radial-gradient(ellipse at center, rgba(167,139,250,0.2), transparent 70%)',
                            filter: 'blur(8px)',
                        }}
                    />

                    {/* Person image */}
                    <img
                        src={image}
                        alt={name}
                        className="relative z-10 h-full w-full object-contain object-bottom transition-all duration-700 ease-out group-hover:-translate-y-3 group-hover:scale-[1.04]"
                        style={{
                            filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4)) drop-shadow(0 2px 8px rgba(124,58,237,0.15))',
                        }}
                    />

                    {/* Index badge — editorial detail (team members only) */}
                    {index != null && (
                        <span className="absolute top-0 right-0 z-20 font-mono text-[0.55rem] text-white/15 transition-colors duration-500 group-hover:text-violet-400/40">
                            {String(index).padStart(2, '0')}
                        </span>
                    )}
                </div>

                {/* Name + role — slides up slightly on hover */}
                <div className="mt-5 transition-transform duration-600 ease-out group-hover:-translate-y-1.5">
                    <p className={`font-serif text-white transition-colors duration-500 group-hover:text-white ${isLead ? 'text-[1.4rem] sm:text-[1.8rem] text-glow-soft' : 'text-[1rem] sm:text-[1.1rem] text-white/90'
                        }`}>
                        {name}
                    </p>

                    {/* Role — with letter-spacing transition on hover */}
                    <p className={`mt-1.5 font-mono uppercase text-violet-300/50 transition-all duration-700 ease-out group-hover:tracking-[0.25em] group-hover:text-violet-300/70 ${isLead ? 'text-[0.65rem] tracking-[0.18em]' : 'text-[0.55rem] sm:text-[0.6rem] tracking-[0.15em]'
                        }`}>
                        {role}
                    </p>
                </div>

                {/* Animated underline accent */}
                <div className="mt-3 h-px w-10 origin-center scale-x-0 bg-gradient-to-r from-transparent via-violet-400/50 to-transparent transition-transform duration-600 ease-out group-hover:scale-x-100" />
            </div>
        </Magnetic>
    )
}
