'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { IMAGES } from '@/data/images'
import { REGISTER_CLIENT_URL } from '@/data/links'

const EASE = [0.22, 1, 0.36, 1]

const PROJECTS = [
    {
        title: 'Trendwood',
        category: 'Web · Social · SEO',
        summary: 'A large furniture retailer given full-stack digital support — brand graphics, ongoing website maintenance, social media management and technical SEO.',
        image: IMAGES.gallery1,
        metrics: [
            { label: 'Focus', value: 'Full-stack presence' },
            { label: 'Scope', value: 'Graphics · Web · Social · SEO' },
        ],
    },
    {
        title: 'Agora',
        category: 'App · Web Development',
        summary: 'An app that makes democratic participation effortless, keeping an open line between politicians and the public.',
        image: IMAGES.gallery3,
        metrics: [
            { label: 'Focus', value: 'Civic engagement' },
            { label: 'Scope', value: 'App → Web' },
        ],
    },
    {
        title: 'Fitoo',
        category: 'Web · Ads · SEO',
        summary: 'A fitness service provider taken online end to end — website, ad campaigns, SEO, graphic design and consistent presence across every channel.',
        image: IMAGES.gallery2,
        metrics: [
            { label: 'Focus', value: 'Online presence' },
            { label: 'Scope', value: 'Web · Ads · SEO · Design' },
        ],
    },
    {
        title: 'Eyesight Ltd.',
        category: 'Ad Campaigns · Video',
        summary: 'Performance ad campaigns paired with in-house videography, built to turn attention into measurable demand.',
        image: IMAGES.gallery4,
        metrics: [
            { label: 'Focus', value: 'Demand generation' },
            { label: 'Scope', value: 'Campaigns → Video' },
        ],
    },
    {
        title: 'Al Imran Milk Shop',
        category: 'Branding · Web · Social',
        summary: 'A local milk and dairy shop transformed into a recognized brand — complete identity, web presence, social media strategy and graphic design that set them apart in a crowded market.',
        image: IMAGES.gallery5,
        metrics: [
            { label: 'Focus', value: 'Brand building' },
            { label: 'Scope', value: 'Branding · Web · Social · Design' },
        ],
    },
]

function ProjectCard({ project, index }) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)
    const reduce = useReducedMotion()

    useEffect(() => {
        if (reduce) { setVisible(true); return }
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true) },
            { threshold: 0.15 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [reduce])

    const isEven = index % 2 === 0

    return (
        <div
            ref={ref}
            className={`grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 ${!isEven ? 'lg:[direction:rtl]' : ''
                }`}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : `translateY(40px)`,
                transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
            }}
        >
            {/* Image */}
            <div className={`relative overflow-hidden rounded-2xl ${!isEven ? 'lg:[direction:ltr]' : ''}`}>
                <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl">
                    <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        data-cursor-label="View"
                        className="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#100b20]/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-violet-600/5 mix-blend-overlay" />
                </div>
            </div>

            {/* Content */}
            <div className={`flex flex-col justify-center ${!isEven ? 'lg:[direction:ltr]' : ''}`}>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-violet-400/60">
                    {project.category}
                </span>
                <h3 className="mt-3 display text-[clamp(2rem,4vw,3.2rem)] leading-tight text-white/90">
                    {project.title}
                </h3>
                <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-white/55">
                    {project.summary}
                </p>

                {/* Metrics */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                    {project.metrics.map((m) => (
                        <div key={m.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                            <span className="font-mono text-[0.6rem] uppercase tracking-wide text-white/25">
                                {m.label}
                            </span>
                            <span className="mt-1 block font-serif text-[1rem] text-violet-300">
                                {m.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function Work() {
    return (
        <section id="work" className="relative overflow-hidden bg-[#100b20] py-[clamp(5rem,10vw,9rem)]">
            {/* Seamless transition gradients */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#100b20] to-transparent z-[2]" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#100b20] to-transparent z-[2]" />

            <div className="absolute inset-0 grain" />
            {/* Section torch */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-violet-600/25 blur-[180px]" />

            <div className="container relative z-10">
                {/* Header */}
                <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2">
                    <div>
                        <span className="label label-line text-violet-400/70">Selected work</span>
                        <h2 className="mt-6 display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] text-white/90">
                            Work built to
                            <br />
                            <span className="italic text-gradient-violet">move the numbers.</span>
                        </h2>
                    </div>
                    <p className="max-w-[400px] text-white/55 md:text-right">
                        A look at the kind of challenges we take on. Full case studies with verified
                        results are shared on request.
                    </p>
                </div>

                {/* Projects — editorial layout */}
                <div className="mt-14 flex flex-col gap-16 sm:mt-20 sm:gap-24">
                    {PROJECTS.map((p, i) => (
                        <ProjectCard key={p.title} project={p} index={i} />
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-24 flex flex-col items-center gap-6 text-center">
                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
                    <p className="display text-[clamp(1.4rem,3vw,2rem)] text-white/60">
                        Your project could be the next one here.
                    </p>
                    <a href={REGISTER_CLIENT_URL} data-cursor-label="Let's talk" className="btn btn-primary">
                        Start your project
                    </a>
                </div>
            </div>
        </section>
    )
}
