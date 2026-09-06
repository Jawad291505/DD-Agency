'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Magnetic from '@/components/ui/Magnetic'
import { LogoLockup } from '@/components/ui/Logo'
import { REGISTER_CLIENT_URL } from '@/data/links'

const LINKS = [
    { href: '#services', label: 'Services', index: '01' },
    { href: '#why', label: 'Why us', index: '02' },
    { href: '#process', label: 'Process', index: '03' },
    { href: '#work', label: 'Work', index: '04' },
    { href: '#testimonials', label: 'Clients', index: '05' },
    { href: '#about', label: 'About', index: '06' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState('')

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Scroll-spy — highlights the section currently in view.
    useEffect(() => {
        const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean)
        if (!sections.length) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(`#${entry.target.id}`)
                })
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
        )
        sections.forEach((s) => observer.observe(s))
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
        }
    }, [open])

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-editorial ${scrolled || open
                    ? 'border-b border-ink/10 bg-paper/95 md:bg-paper/85 md:backdrop-blur-xl'
                    : 'border-b border-transparent bg-transparent'
                    }`}
            >
                <div className="container flex h-[76px] items-center justify-between">
                    <a
                        href="#top"
                        className="group inline-flex items-center"
                        aria-label="Diversify Digital home"
                        onClick={() => setOpen(false)}
                    >
                        <LogoLockup markSize="h-10 w-10 rounded-xl shadow-sm ring-1 ring-ink/10 transition-transform duration-500 ease-editorial group-hover:scale-[1.04]" />
                    </a>

                    <nav className="hidden items-center gap-7 lg:flex xl:gap-9" aria-label="Primary">
                        {LINKS.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                aria-current={active === l.href ? 'true' : undefined}
                                className={`link-underline transition-colors duration-300 hover:text-ink ${active === l.href
                                    ? 'text-ink after:origin-left after:scale-x-100'
                                    : 'text-ink/60'
                                    }`}
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <div className="hidden lg:block">
                            <Magnetic strength={0.5}>
                                <a
                                    href={REGISTER_CLIENT_URL}
                                    data-cursor-label="Let's talk"
                                    className="btn btn-primary"
                                >
                                    Start a project
                                </a>
                            </Magnetic>
                        </div>
                        <button
                            type="button"
                            aria-label={open ? 'Close menu' : 'Open menu'}
                            aria-expanded={open}
                            onClick={() => setOpen((v) => !v)}
                            className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
                        >
                            <span
                                className={`h-px w-6 bg-ink transition-all duration-300 ease-editorial ${open ? 'translate-y-[3.5px] rotate-45' : ''
                                    }`}
                            />
                            <span
                                className={`h-px w-6 bg-ink transition-all duration-300 ease-editorial ${open ? '-translate-y-[3.5px] -rotate-45' : ''
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {open && [
                    /* Blurred scrim — the page shows through, softened. Tap to close. */
                    <motion.button
                        key="scrim"
                        type="button"
                        aria-label="Close menu"
                        tabIndex={-1}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 top-[76px] z-40 w-full cursor-default bg-ink/25 backdrop-blur-md lg:hidden"
                    />,
                    /* Curtain — drops from behind the header, roughly half-height. */
                    <motion.div
                        key="curtain"
                        initial={{ y: '-100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-x-0 top-0 z-40 max-h-[85vh] origin-top overflow-y-auto rounded-b-3xl border-b border-white/10 bg-gradient-to-b from-violet-900 to-ink text-paper shadow-editorial lg:hidden"
                    >
                        <div className="container flex flex-col px-6 pb-8 pt-24">
                            <nav className="flex flex-col" aria-label="Mobile">
                                {LINKS.map((l, i) => (
                                    <motion.a
                                        key={l.href}
                                        href={l.href}
                                        onClick={() => setOpen(false)}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: 0.14 + i * 0.05,
                                            duration: 0.4,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className="group flex items-baseline gap-3 border-b border-white/10 py-3.5"
                                    >
                                        <span className="font-mono text-[0.7rem] tracking-wide text-violet-light">
                                            {l.index}
                                        </span>
                                        <span className="display text-2xl text-paper">
                                            {l.label}
                                        </span>
                                    </motion.a>
                                ))}
                            </nav>
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.14 + LINKS.length * 0.05,
                                    duration: 0.4,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="mt-6 flex flex-col gap-3"
                            >
                                <a
                                    href={REGISTER_CLIENT_URL}
                                    onClick={() => setOpen(false)}
                                    className="btn btn-lime"
                                >
                                    Start a project
                                </a>
                                <a
                                    href="#work"
                                    onClick={() => setOpen(false)}
                                    className="btn btn-outline-paper"
                                >
                                    See our work
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>,
                ]}
            </AnimatePresence>
        </>
    )
}
