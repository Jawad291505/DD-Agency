'use client'

import { useEffect, useRef } from 'react'

/**
 * Journey progress — a thin violet bar at the top + a side dot indicator
 * showing where the user is in the experience.
 */
export default function ScrollProgress() {
    const barRef = useRef(null)

    useEffect(() => {
        let ticking = false
        const onScroll = () => {
            if (ticking) return
            ticking = true
            requestAnimationFrame(() => {
                const scrollTop = window.scrollY
                const docHeight = document.documentElement.scrollHeight - window.innerHeight
                const progress = docHeight > 0 ? scrollTop / docHeight : 0
                if (barRef.current) {
                    barRef.current.style.transform = `scaleX(${progress})`
                }
                ticking = false
            })
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <div
            ref={barRef}
            aria-hidden="true"
            className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-violet-400 via-violet-500 to-violet-300"
            style={{ transform: 'scaleX(0)' }}
        />
    )
}
