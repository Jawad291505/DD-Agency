'use client'

import { useRef, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Reveal } from './motion'
import { REGISTER_CLIENT_URL } from './links'

const SERVICES = [
    {
        n: '01',
        title: 'SEO',
        desc: 'Technical foundations and content that compound into qualified organic growth over time.',
        points: ['Technical audits', 'Keyword strategy', 'Rank tracking'],
    },
    {
        n: '02',
        title: 'Content Marketing',
        desc: 'Stories and assets that earn attention because they are genuinely useful to your audience.',
        points: ['Editorial strategy', 'Copywriting', 'Content systems'],
    },
    {
        n: '03',
        title: 'Graphic Designing',
        desc: 'Considered visual design that gives your brand a distinct, memorable and consistent presence.',
        points: ['Visual identity', 'Marketing collateral', 'Design systems'],
    },
    {
        n: '04',
        title: 'Social Media Marketing',
        desc: 'Platform-native campaigns that build community and turn followers into customers.',
        points: ['Channel strategy', 'Content calendars', 'Paid social'],
    },
    {
        n: '05',
        title: 'Brand Marketing',
        desc: 'Positioning and messaging that make your brand clear, credible and impossible to ignore.',
        points: ['Brand strategy', 'Messaging', 'Campaign concepts'],
    },
    {
        n: '06',
        title: 'Web / App Development',
        desc: 'Fast, scalable websites and apps engineered to convert and easy to grow with.',
        points: ['Web development', 'App development', 'Digital solutions'],
    },
]

export default function Services() {
    const trackRef = useRef(null)
    const reduce = useReducedMotion()
    // Paused while hovering, dragging, or when the section is off-screen.
    const pausedRef = useRef(false)
    const draggingRef = useRef(false)

    // Duplicate the list so the track can loop seamlessly.
    const loop = [...SERVICES, ...SERVICES]

    const nudge = (dir) => {
        const el = trackRef.current
        if (!el) return
        const card = el.querySelector('[data-card]')
        const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8
        el.scrollBy({ left: dir * amount, behavior: 'smooth' })
    }

    // Continuous auto-scroll — advances every frame, pauses on hover/drag,
    // and wraps seamlessly at the halfway point (where the duplicate begins).
    useEffect(() => {
        const el = trackRef.current
        if (!el || reduce) return

        const SPEED = 0.5 // px per frame (~30px/s at 60fps)
        let raf

        const step = () => {
            if (!pausedRef.current && !draggingRef.current) {
                const half = el.scrollWidth / 2
                let next = el.scrollLeft + SPEED
                if (next >= half) next -= half
                el.scrollLeft = next
            }
            raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)

        // Pause when the carousel is scrolled out of view (saves work).
        const io = new IntersectionObserver(
            ([entry]) => { pausedRef.current = !entry.isIntersecting },
            { threshold: 0 }
        )
        io.observe(el)

        return () => {
            cancelAnimationFrame(raf)
            io.disconnect()
        }
    }, [reduce])

    // Pause on hover; also pause on touch so mobile users can read.
    useEffect(() => {
        const el = trackRef.current
        if (!el) return
        const pause = () => { pausedRef.current = true }
        const resume = () => { if (!draggingRef.current) pausedRef.current = false }

        el.addEventListener('mouseenter', pause)
        el.addEventListener('mouseleave', resume)
        el.addEventListener('touchstart', pause, { passive: true })
        el.addEventListener('touchend', resume)
        return () => {
            el.removeEventListener('mouseenter', pause)
            el.removeEventListener('mouseleave', resume)
            el.removeEventListener('touchstart', pause)
            el.removeEventListener('touchend', resume)
        }
    }, [])

    // Pointer drag-to-scroll — click and pull the track like a physical shelf.
    useEffect(() => {
        const el = trackRef.current
        if (!el) return
        let down = false
        let startX = 0
        let startScroll = 0
        let moved = false

        const onDown = (e) => {
            down = true
            moved = false
            draggingRef.current = true
            startX = e.pageX
            startScroll = el.scrollLeft
            el.classList.add('cursor-grabbing')
        }
        const onMove = (e) => {
            if (!down) return
            const dx = e.pageX - startX
            if (Math.abs(dx) > 4) moved = true
            el.scrollLeft = startScroll - dx
        }
        const onUp = () => {
            down = false
            draggingRef.current = false
            el.classList.remove('cursor-grabbing')
        }
        // Block accidental navigation when a drag ends on a link.
        const onClick = (e) => {
            if (moved) {
                e.preventDefault()
                e.stopPropagation()
            }
        }

        el.addEventListener('pointerdown', onDown)
        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup', onUp)
        el.addEventListener('click', onClick, true)
        return () => {
            el.removeEventListener('pointerdown', onDown)
            window.removeEventListener('pointermove', onMove)
            window.removeEventListener('pointerup', onUp)
            el.removeEventListener('click', onClick, true)
        }
    }, [])

    return (
        <section id="services" className="section relative grain overflow-hidden bg-primary text-ivory">
            <div className="container relative z-10">
                <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="label label-line text-sand">Services we offer</div>
                        <h2 className="mt-6 display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] text-ivory">
                            Everything your brand
                            <br />
                            <span className="italic text-sand">needs to grow.</span>
                        </h2>
                    </div>

                    {/* Carousel controls */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => nudge(-1)}
                            aria-label="Previous services"
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-ivory transition-all duration-300 ease-editorial hover:bg-ivory hover:text-primary"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5" />
                                <path d="m12 19-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => nudge(1)}
                            aria-label="Next services"
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-ivory transition-all duration-300 ease-editorial hover:bg-ivory hover:text-primary"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </Reveal>
            </div>

            {/* Continuous auto-scrolling carousel — pauses on hover */}
            <div
                ref={trackRef}
                className="no-scrollbar relative z-10 mt-14 flex cursor-grab gap-6 overflow-x-auto px-6 pb-4 select-none md:px-10"
            >
                {loop.map((s, i) => (
                    <article
                        key={`${s.n}-${i}`}
                        data-card
                        aria-hidden={i >= SERVICES.length ? 'true' : undefined}
                        data-cursor-label="Drag"
                        className="group flex w-[80vw] shrink-0 flex-col rounded-[24px] border border-white/12 bg-white/[0.03] p-8 transition-all duration-500 ease-editorial hover:-translate-y-1 hover:bg-ivory hover:text-primary sm:w-[46vw] lg:w-[30rem]"
                    >
                        <div className="flex items-center justify-between">
                            <span className="display text-[2.4rem] leading-none text-sand transition-colors duration-500 group-hover:text-clay">
                                {s.n}
                            </span>
                            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-current opacity-40 transition-opacity duration-500 group-hover:opacity-100">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 ease-editorial group-hover:translate-x-0.5">
                                    <path d="M7 17 17 7" />
                                    <path d="M7 7h10v10" />
                                </svg>
                            </span>
                        </div>

                        <h3 className="mt-10 display text-[clamp(1.6rem,2.4vw,2.1rem)] leading-tight">
                            {s.title}
                        </h3>
                        <p className="mt-4 text-[0.98rem] leading-relaxed text-ivory/60 transition-colors duration-500 group-hover:text-ink/65">
                            {s.desc}
                        </p>

                        <ul className="mt-8 flex flex-wrap gap-2">
                            {s.points.map((pt) => (
                                <li
                                    key={pt}
                                    className="rounded-full border border-current px-4 py-1.5 text-[0.78rem] uppercase tracking-[0.1em] opacity-60"
                                >
                                    {pt}
                                </li>
                            ))}
                        </ul>

                        <a
                            href={REGISTER_CLIENT_URL}
                            className="mt-auto flex items-center gap-3 pt-10 link-underline"
                        >
                            Learn more
                        </a>
                    </article>
                ))}
            </div>
        </section>
    )
}
