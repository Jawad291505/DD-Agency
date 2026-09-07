'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Magnetic from '@/components/ui/Magnetic'
import { LogoLockup } from '@/components/ui/Logo'
import { REGISTER_CLIENT_URL } from '@/data/links'

const EASE = [0.22, 1, 0.36, 1]

const LINKS = [
    { href: '#services', label: 'Services', index: '01' },
    { href: '#journey', label: 'Journey', index: '02' },
    { href: '#work', label: 'Work', index: '03' },
    { href: '#testimonials', label: 'Clients', index: '04' },
    { href: '#owner', label: 'Owner', index: '05' },
    { href: '#contact', label: 'Contact', index: '06' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState('')

    useEffect(() => {
        let ticking = false
        const onScroll = () => {
            if (ticking) return
            ticking = true
            requestAnimationFrame(() => {
                setScrolled(window.scrollY > 50)
                ticking = false
            })
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

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
        return () => { document.body.style.overflow = '' }
    }, [open])

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${scrolled
                    ? 'border-b border-white/[0.06] bg-[#100b20]/80 backdrop-blur-xl'
                    : 'bg-transparent'
                    }`}
            >
                <div className="container flex h-[72px] items-center justify-between">
                    <a href="#top" className="group inline-flex items-center" aria-label="Diversify Digital home" onClick={() => setOpen(false)}>
                        <LogoLockup
                            tone="paper"
                            markSize="h-9 w-9 rounded-lg ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-105"
                        />
                    </a>

                    <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
                        {LINKS.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                className={`font-mono text-[0.72rem] uppercase tracking-[0.15em] transition-colors duration-300 hover:text-white ${active === l.href ? 'text-white' : 'text-white/40'
                                    }`}
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <div className="hidden lg:block">
                            <Magnetic strength={0.4}>
                                <a href={REGISTER_CLIENT_URL} data-cursor-label="Let's talk" className="btn btn-primary text-[0.75rem]">
                                    Start a project
                                </a>
                            </Magnetic>
                        </div>
                        <button
                            type="button"
                            aria-label={open ? 'Close menu' : 'Open menu'}
                            aria-expanded={open}
                            onClick={() => setOpen((v) => !v)}
                            className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
                        >
                            <span className={`h-px w-5 bg-white transition-all duration-300 ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
                            <span className={`h-px w-5 bg-white transition-all duration-300 ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile menu */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            key="scrim"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                        />
                        <motion.div
                            key="panel"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.5, ease: EASE }}
                            className="fixed right-0 top-0 bottom-0 z-40 w-full max-w-sm bg-[#100b20] border-l border-white/[0.06] px-8 pt-24 pb-10 lg:hidden"
                        >
                            <nav className="flex flex-col gap-1" aria-label="Mobile">
                                {LINKS.map((l, i) => (
                                    <motion.a
                                        key={l.href}
                                        href={l.href}
                                        onClick={() => setOpen(false)}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: EASE }}
                                        className="flex items-baseline gap-4 border-b border-white/[0.06] py-4"
                                    >
                                        <span className="font-mono text-[0.65rem] text-violet-400">{l.index}</span>
                                        <span className="font-serif text-2xl text-white">{l.label}</span>
                                    </motion.a>
                                ))}
                            </nav>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="mt-8"
                            >
                                <a href={REGISTER_CLIENT_URL} onClick={() => setOpen(false)} className="btn btn-primary w-full">
                                    Start a project
                                </a>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
