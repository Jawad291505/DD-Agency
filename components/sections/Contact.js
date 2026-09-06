'use client'

import { useState } from 'react'
import { Reveal, Stagger, StaggerItem } from '@/lib/motion'
import Magnetic from '@/components/ui/Magnetic'

const SERVICE_OPTIONS = [
    'SEO',
    'Google Ads',
    'Meta Ads',
    'Social Media Marketing',
    'Web Development',
    'App Development',
    'Branding',
    'Graphic Design',
    'Content Creation',
    'Not sure yet',
]

const DETAILS = [
    ['Email', 'hello@diversify.digital', 'mailto:hello@diversify.digital'],
    ['Phone', '+1 (555) 012-3480', 'tel:+15550123480'],
    ['Where we work', 'Fully remote — partnering with brands worldwide', null],
]

export default function Contact() {
    const [sent, setSent] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        // No backend wired up — acknowledge locally so the UX stays complete.
        setSent(true)
    }

    return (
        <section id="contact" className="relative isolate grain overflow-hidden bg-violet-900 text-paper">
            {/* Ambient accents */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
                <div className="absolute -left-32 top-0 h-[30rem] w-[30rem] rounded-full bg-violet-bright/20 blur-[130px]" />
                <div className="absolute -right-24 bottom-0 h-[26rem] w-[26rem] rounded-full bg-violet/20 blur-[130px]" />
            </div>

            <div className="container relative z-10 py-[clamp(5rem,10vw,9rem)]">
                {/* Big conversion headline */}
                <Reveal className="mx-auto max-w-4xl text-center">
                    <div className="label label-line mx-auto text-violet-light">Let&apos;s build it</div>
                    <h2 className="mt-6 display text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.98] text-paper">
                        Have a project in mind?
                        <br />
                        <span className="italic text-violet-light">Let&apos;s make it grow.</span>
                    </h2>
                    <p className="mx-auto mt-7 max-w-[520px] text-[1.05rem] leading-relaxed text-paper/70">
                        Tell us about your brand and where you want to take it. We&apos;ll come back
                        within one business day with a clear next step — no pressure, no jargon.
                    </p>
                </Reveal>

                <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
                    {/* Details */}
                    <div className="lg:col-span-5">
                        <Stagger className="flex flex-col gap-6">
                            {DETAILS.map(([label, value, href]) => (
                                <StaggerItem key={label} className="border-t border-white/12 pt-5">
                                    <p className="font-mono text-[0.7rem] uppercase tracking-wide text-violet-light">
                                        {label}
                                    </p>
                                    {href ? (
                                        <a
                                            href={href}
                                            className="mt-2 inline-block font-serif text-xl text-paper transition-colors duration-300 hover:text-violet-light"
                                        >
                                            {value}
                                        </a>
                                    ) : (
                                        <p className="mt-2 font-serif text-xl text-paper">{value}</p>
                                    )}
                                </StaggerItem>
                            ))}
                        </Stagger>

                        <Reveal delay={0.2} className="mt-10 rounded-3xl border border-white/12 bg-white/[0.03] p-8">
                            <p className="font-mono text-[0.7rem] uppercase tracking-wide text-violet-light">
                                What happens next
                            </p>
                            <ol className="mt-5 flex flex-col gap-4 text-[0.95rem] text-paper/70">
                                {[
                                    'We read your message and review your brand.',
                                    'We reply within one business day.',
                                    'We book a short, no-obligation call.',
                                ].map((t, i) => (
                                    <li key={t} className="flex items-start gap-3">
                                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet text-[0.72rem] font-semibold text-paper">
                                            {i + 1}
                                        </span>
                                        {t}
                                    </li>
                                ))}
                            </ol>
                        </Reveal>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-7">
                        <Reveal className="rounded-3xl border border-white/12 bg-white/[0.04] p-8 md:p-10">
                            {sent ? (
                                <div className="flex min-h-[440px] flex-col items-center justify-center text-center">
                                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-violet text-paper">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                    </span>
                                    <h3 className="mt-6 display text-[clamp(1.6rem,3vw,2.2rem)] text-paper">
                                        Thank you.
                                    </h3>
                                    <p className="mt-3 max-w-[360px] text-paper/70">
                                        Your message is on its way. We&apos;ll be in touch within one
                                        business day.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={onSubmit} className="flex flex-col gap-6">
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <Field label="Name" htmlFor="name">
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                autoComplete="name"
                                                className="field-input"
                                                placeholder="Your name"
                                            />
                                        </Field>
                                        <Field label="Email" htmlFor="email">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                autoComplete="email"
                                                className="field-input"
                                                placeholder="you@company.com"
                                            />
                                        </Field>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <Field label="Company" htmlFor="company">
                                            <input
                                                id="company"
                                                name="company"
                                                type="text"
                                                autoComplete="organization"
                                                className="field-input"
                                                placeholder="Company name"
                                            />
                                        </Field>
                                        <Field label="Service of interest" htmlFor="service">
                                            <select id="service" name="service" className="field-input" defaultValue="">
                                                <option value="" disabled>
                                                    Select a service
                                                </option>
                                                {SERVICE_OPTIONS.map((s) => (
                                                    <option key={s} value={s}>
                                                        {s}
                                                    </option>
                                                ))}
                                            </select>
                                        </Field>
                                    </div>

                                    <Field label="Message" htmlFor="message">
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            required
                                            className="field-input resize-none"
                                            placeholder="Tell us about your project and your goals..."
                                        />
                                    </Field>

                                    <Magnetic strength={0.4} className="mt-2 self-start">
                                        <button type="submit" data-cursor-label="Send" className="btn btn-lime">
                                            Send message
                                        </button>
                                    </Magnetic>
                                </form>
                            )}
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Field({ label, htmlFor, children }) {
    return (
        <label htmlFor={htmlFor} className="flex flex-col gap-2">
            <span className="font-mono text-[0.7rem] uppercase tracking-wide text-paper/50">
                {label}
            </span>
            {children}
        </label>
    )
}
