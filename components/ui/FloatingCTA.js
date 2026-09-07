'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Magnetic from '@/components/ui/Magnetic'
import { REGISTER_CLIENT_URL } from '@/data/links'

const EASE = [0.22, 1, 0.36, 1]

export default function FloatingCTA() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        let ticking = false
        const onScroll = () => {
            if (ticking) return
            ticking = true
            requestAnimationFrame(() => {
                const y = window.scrollY
                const contact = document.querySelector('#contact')
                const nearContact = contact
                    ? contact.getBoundingClientRect().top < window.innerHeight * 0.9
                    : false
                setShow(y > window.innerHeight * 0.8 && !nearContact)
                ticking = false
            })
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 24, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="fixed bottom-6 right-6 z-40 hidden md:block"
                >
                    <Magnetic strength={0.3}>
                        <a
                            href={REGISTER_CLIENT_URL}
                            data-cursor-label="Let's talk"
                            className="group flex items-center gap-3 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 py-3 pl-5 pr-3 text-white shadow-[0_8px_30px_-8px_rgba(124,58,237,0.5)] transition-all duration-300 hover:shadow-[0_12px_40px_-8px_rgba(124,58,237,0.6)]"
                        >
                            <span className="font-sans text-[0.75rem] font-semibold uppercase tracking-wide">
                                Start a project
                            </span>
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                                </svg>
                            </span>
                        </a>
                    </Magnetic>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
