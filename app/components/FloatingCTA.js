'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Magnetic from './Magnetic'
import { REGISTER_CLIENT_URL } from './links'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Persistent conversion pill. Appears once the hero scrolls out of view and
 * hides again near the contact/footer so it never fights the on-page form.
 * Keeps the primary action a single click away throughout the journey.
 */
export default function FloatingCTA() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY
            const contact = document.querySelector('#contact')
            const nearContact = contact
                ? contact.getBoundingClientRect().top < window.innerHeight * 0.9
                : false
            setShow(y > window.innerHeight * 0.8 && !nearContact)
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
                    <Magnetic strength={0.4}>
                        <a
                            href={REGISTER_CLIENT_URL}
                            data-cursor-label="Let's talk"
                            className="group flex items-center gap-3 rounded-full bg-violet py-3.5 pl-6 pr-3.5 text-paper shadow-lifted transition-colors duration-300 hover:bg-violet-deep"
                        >
                            <span className="font-sans text-[0.82rem] font-semibold uppercase tracking-wide">
                                Start a project
                            </span>
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper text-violet">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 ease-editorial group-hover:translate-x-0.5">
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </span>
                        </a>
                    </Magnetic>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
