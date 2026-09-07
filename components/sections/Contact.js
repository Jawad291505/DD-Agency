'use client'

import { useState, useRef, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'
import Magnetic from '@/components/ui/Magnetic'

const SERVICE_OPTIONS = [
    'SEO', 'Google Ads', 'Meta Ads', 'Social Media Marketing',
    'Web Development', 'App Development', 'Branding', 'Graphic Design',
    'Content Creation', 'Not sure yet',
]

const DETAILS = [
    ['Email', 'hello@diversify.digital', 'mailto:hello@diversify.digital'],
    ['Phone', '+1 (555) 012-3480', 'tel:+15550123480'],
    ['Where we work', 'Fully remote — partnering with brands worldwide', null],
]

/**
 * Minimal particle field that echoes the hero but in a settled, organised state.
 * The growth engine has been built — the particles are now ordered.
 */
function ContactCanvas() {
    const canvasRef = useRef(null)
    const rafRef = useRef(null)
    const visibleRef = useRef(false)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let w = canvas.offsetWidth
        let h = canvas.offsetHeight
        const isMobile = w < 768
        const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio, 2)
        canvas.width = w * dpr
        canvas.height = h * dpr
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

        const cols = isMobile ? 6 : 12
        const rows = isMobile ? 4 : 8
        const particles = []
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                particles.push({
                    x: (i + 0.5) * (w / cols),
                    y: (j + 0.5) * (h / rows),
                    phase: Math.random() * Math.PI * 2,
                    r: 1 + Math.random(),
                })
            }
        }

        const observer = new IntersectionObserver(
            ([entry]) => { visibleRef.current = entry.isIntersecting },
            { threshold: 0 }
        )
        observer.observe(canvas)

        const draw = () => {
            if (!visibleRef.current) {
                rafRef.current = requestAnimationFrame(draw)
                return
            }
            ctx.clearRect(0, 0, w, h)
            const time = performance.now() * 0.001

            particles.forEach((p, i) => {
                const px = p.x + Math.sin(time * 0.5 + p.phase) * 3
                const py = p.y + Math.cos(time * 0.3 + p.phase) * 3
                const alpha = 0.18 + 0.10 * Math.sin(time + p.phase)

                ctx.beginPath()
                ctx.arc(px, py, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`
                ctx.fill()

                // Connect to nearby — desktop only (O(n²))
                if (!isMobile) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const p2 = particles[j]
                        const dx = px - (p2.x + Math.sin(time * 0.5 + p2.phase) * 3)
                        const dy = py - (p2.y + Math.cos(time * 0.3 + p2.phase) * 3)
                        const dist = Math.sqrt(dx * dx + dy * dy)
                        if (dist < w / cols * 1.5) {
                            ctx.beginPath()
                            ctx.moveTo(px, py)
                            ctx.lineTo(
                                p2.x + Math.sin(time * 0.5 + p2.phase) * 3,
                                p2.y + Math.cos(time * 0.3 + p2.phase) * 3
                            )
                            ctx.strokeStyle = `rgba(139, 92, 246, 0.06)`
                            ctx.lineWidth = 0.5
                            ctx.stroke()
                        }
                    }
                }
            })

            rafRef.current = requestAnimationFrame(draw)
        }
        rafRef.current = requestAnimationFrame(draw)
        return () => {
            cancelAnimationFrame(rafRef.current)
            observer.disconnect()
        }
    }, [])

    return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}

export default function Contact() {
    const [sent, setSent] = useState(false)
    const reduce = useReducedMotion()

    const onSubmit = (e) => {
        e.preventDefault()
        setSent(true)
    }

    return (
        <section id="contact" className="relative overflow-hidden bg-[#100b20] py-[clamp(6rem,12vw,10rem)]">
            {/* Seamless transition gradients */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#100b20] to-transparent z-[2]" />
            {/* Background */}
            <div className="absolute inset-0">
                {!reduce && <ContactCanvas />}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[550px] w-[700px] rounded-full bg-violet-600/30 blur-[180px]" />
                <div className="absolute inset-0 grain" />
            </div>

            <div className="container relative z-10">
                {/* Big headline — journey completion */}
                <div className="mx-auto max-w-3xl text-center">
                    <span className="label label-line mx-auto text-violet-400/60">Let&apos;s build it</span>
                    <h2 className="mt-8 display text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] text-white/90">
                        Ready to
                        <br />
                        <span className="italic text-gradient-violet">grow?</span>
                    </h2>
                    <p className="mx-auto mt-6 max-w-lg text-[1rem] leading-relaxed text-white/55">
                        Tell us about your brand and where you want to take it. We&apos;ll come back
                        within one business day with a clear next step.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
                    {/* Details */}
                    <div className="lg:col-span-5">
                        <div className="flex flex-col gap-6">
                            {DETAILS.map(([label, value, href]) => (
                                <div key={label} className="border-t border-white/[0.06] pt-5">
                                    <p className="font-mono text-[0.65rem] uppercase tracking-wide text-violet-400/50">
                                        {label}
                                    </p>
                                    {href ? (
                                        <a href={href} className="mt-2 block font-serif text-lg text-white/70 transition-colors hover:text-violet-300">
                                            {value}
                                        </a>
                                    ) : (
                                        <p className="mt-2 font-serif text-lg text-white/70">{value}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                            <p className="font-mono text-[0.65rem] uppercase tracking-wide text-violet-400/50">
                                What happens next
                            </p>
                            <ol className="mt-4 flex flex-col gap-3 text-[0.9rem] text-white/55">
                                {[
                                    'We read your message and review your brand.',
                                    'We reply within one business day.',
                                    'We book a short, no-obligation call.',
                                ].map((t, i) => (
                                    <li key={t} className="flex items-start gap-3">
                                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-[0.65rem] font-medium text-violet-300">
                                            {i + 1}
                                        </span>
                                        {t}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-7">
                        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10">
                            {sent ? (
                                <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-600/20 text-violet-300">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                    </span>
                                    <h3 className="mt-6 display text-[clamp(1.4rem,3vw,2rem)] text-white/90">Thank you.</h3>
                                    <p className="mt-3 max-w-xs text-white/40">We&apos;ll be in touch within one business day.</p>
                                </div>
                            ) : (
                                <form onSubmit={onSubmit} className="flex flex-col gap-5">
                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <Field label="Name" id="name">
                                            <input id="name" name="name" type="text" required autoComplete="name" className="field-input" placeholder="Your name" />
                                        </Field>
                                        <Field label="Email" id="email">
                                            <input id="email" name="email" type="email" required autoComplete="email" className="field-input" placeholder="you@company.com" />
                                        </Field>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <Field label="Company" id="company">
                                            <input id="company" name="company" type="text" autoComplete="organization" className="field-input" placeholder="Company name" />
                                        </Field>
                                        <Field label="Service" id="service">
                                            <select id="service" name="service" className="field-input" defaultValue="">
                                                <option value="" disabled>Select a service</option>
                                                {SERVICE_OPTIONS.map((s) => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </Field>
                                    </div>
                                    <Field label="Message" id="message">
                                        <textarea id="message" name="message" rows={4} required className="field-input resize-none" placeholder="Tell us about your project..." />
                                    </Field>
                                    <Magnetic strength={0.3} className="mt-2 self-start">
                                        <button type="submit" data-cursor-label="Send" className="btn btn-primary">
                                            Send message
                                        </button>
                                    </Magnetic>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Field({ label, id, children }) {
    return (
        <label htmlFor={id} className="flex flex-col gap-1.5">
            <span className="font-mono text-[0.65rem] uppercase tracking-wide text-white/40">{label}</span>
            {children}
        </label>
    )
}
