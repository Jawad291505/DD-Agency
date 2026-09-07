'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function Cursor() {
    const reduce = useReducedMotion()
    const dotRef = useRef(null)
    const ringRef = useRef(null)
    const [enabled, setEnabled] = useState(false)
    const [variant, setVariant] = useState('default')
    const [label, setLabel] = useState('')

    useEffect(() => {
        if (reduce) return
        if (!window.matchMedia('(pointer: fine)').matches) return
        setEnabled(true)
        document.documentElement.classList.add('has-custom-cursor')
        return () => document.documentElement.classList.remove('has-custom-cursor')
    }, [reduce])

    useEffect(() => {
        if (!enabled) return
        const dot = dotRef.current
        const ring = ringRef.current
        let mouseX = window.innerWidth / 2
        let mouseY = window.innerHeight / 2
        let ringX = mouseX
        let ringY = mouseY
        let raf

        const onMove = (e) => {
            mouseX = e.clientX
            mouseY = e.clientY
            if (dot) dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
        }

        const loop = () => {
            ringX += (mouseX - ringX) * 0.15
            ringY += (mouseY - ringY) * 0.15
            if (ring) ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
            raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)

        const onOver = (e) => {
            const el = e.target.closest('[data-cursor], a, button')
            if (!el) { setVariant('default'); setLabel(''); return }
            const l = el.getAttribute('data-cursor-label')
            setLabel(l || '')
            setVariant(l ? 'label' : 'link')
        }

        window.addEventListener('mousemove', onMove, { passive: true })
        document.addEventListener('mouseover', onOver, { passive: true })

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseover', onOver)
        }
    }, [enabled])

    if (!enabled) return null

    const isLabel = variant === 'label' && label
    const isLink = variant === 'link'

    return (
        <>
            <div
                ref={dotRef}
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
            />
            <div
                ref={ringRef}
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-300 ease-out"
                style={{
                    marginLeft: isLabel ? -40 : -16,
                    marginTop: isLabel ? -40 : -16,
                    width: isLabel ? 80 : 32,
                    height: isLabel ? 80 : 32,
                    border: isLabel ? 'none' : '1px solid rgba(124,58,237,0.4)',
                    background: isLabel ? 'rgba(124,58,237,0.9)' : isLink ? 'rgba(124,58,237,0.12)' : 'transparent',
                }}
            >
                {isLabel && (
                    <span className="font-mono text-[0.55rem] font-semibold uppercase tracking-wide text-white">
                        {label}
                    </span>
                )}
            </div>
        </>
    )
}
