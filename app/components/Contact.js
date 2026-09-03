'use client'

import { useState } from 'react'
import { Reveal, Stagger, StaggerItem } from './motion'
import Magnetic from './Magnetic'

const SERVICE_OPTIONS = [
    'SEO',
    'Content Marketing',
    'Graphic Designing',
    'Social Media Marketing',
    'Brand Marketing',
    'Web / App Development',
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
        <section id="contact" className="section relative grain bg-primary-deep text-ivory">
            <div className="container relative z-10">
                <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
                    {/* Left — intro + details */}
                    <div className="lg:col-span-5">
                        <div className="label label-line text-sand">Contact us</div>
                        <Reveal
                            as="h2"
                            className="mt-6 display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] text-ivory"
                        >
                            Let&apos;s build
                            <br />
                            <span className="italic text-sand">something great.</span>
                        </Reveal>
                        <Reveal
                            as="p"
                            delay={0.1}
                            className="mt-8 max-w-[420px] text-[1.05rem] leading-relaxed text-ivory/70"
                        >
                            Tell us about your brand and where you want to take it. We will get back to
                            you within one business day.
                        </Reveal>

                        <Stagger className="mt-12 flex flex-col gap-6">
                            {DETAILS.map(([label, value, href]) => (
                                <StaggerItem
                                    key={label}
                                    className="border-t border-white/12 pt-5"
                                >
                                    <p className="font-sans text-[0.72rem] uppercase tracking-editorial text-sand/70">
                                        {label}
                                    </p>
                                    {href ? (
                                        <a
                                            href={href}
                                            className="mt-2 inline-block font-serif text-xl text-ivory transition-colors duration-300 hover:text-sand"
                                        >
                                            {value}
                                        </a>
                                    ) : (
                                        <p className="mt-2 font-serif text-xl text-ivory">{value}</p>
                                    )}
                                </StaggerItem>
                            ))}
                        </Stagger>
                    </div>

                    {/* Right — form */}
                    <div className="lg:col-span-6 lg:col-start-7">
                        <Reveal className="rounded-[24px] border border-white/12 bg-white/[0.03] p-8 md:p-10">
                            {sent ? (
                                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-sand text-sand">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                    </span>
                                    <h3 className="mt-6 display text-[clamp(1.6rem,3vw,2.2rem)] text-ivory">
                                        Thank you.
                                    </h3>
                                    <p className="mt-3 max-w-[360px] text-ivory/70">
                                        Your message is on its way. We will be in touch shortly.
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

                                    <Field label="Message" htmlFor="message">
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            required
                                            className="field-input resize-none"
                                            placeholder="Tell us about your project..."
                                        />
                                    </Field>

                                    <Magnetic strength={0.4} className="mt-2 self-start">
                                        <button type="submit" data-cursor-label="Send" className="btn btn-ivory">
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
            <span className="font-sans text-[0.72rem] uppercase tracking-editorial text-ivory/50">
                {label}
            </span>
            {children}
        </label>
    )
}
