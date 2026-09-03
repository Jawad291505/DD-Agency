'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Custom trailing cursor with a hover/label state.
 * - Dot follows the pointer 1:1.
 * - Ring lags behind with easing for the signature "editorial" feel.
 * - Grows + shows a label ("View", "Drag", etc.) over interactive targets
 *   that declare `data-cursor` / `data-cursor-label`.
 * Hidden on touch devices and for reduced-motion users.
 */
export default function Cursor() {
    const reduce = useReducedMotion()
    const dotRef = useRef(null)
    const ringRef = useRef(null)
    const [enabled, setEnabled] = useState(false)
    const [variant, setVariant] = useState('default')
    const [label, setLabel] = useState('')

    // 1. Decide whether the custom cursor should run at all.
    useEffect(() => {
        if (reduce) return
        if (!window.matchMedia('(pointer: fine)').matches) return
        setEnabled(true)
        document.documentElement.classList.add('has-custom-cursor')
        return () => document.documentElement.classList.remove('has-custom-cursor')
    }, [reduce])

    // 2. Wire up movement + hover detection — only after the nodes exist.
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
            if (!el) {
                setVariant('default')
                setLabel('')
                return
            }
            const c = el.getAttribute('data-cursor')
            const l = el.getAttribute('data-cursor-label')
            setLabel(l || '')
            setVariant(c || (l ? 'label' : 'link'))
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
    const isLink = variant === 'link' || variant === 'view'

    return (
        <>
            <div
                ref={dotRef}
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-ink mix-blend-difference"
            />
            <div
                ref={ringRef}
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-300 ease-out"
                style={{
                    marginLeft: isLabel ? -44 : -18,
                    marginTop: isLabel ? -44 : -18,
                    width: isLabel ? 88 : 36,
                    height: isLabel ? 88 : 36,
                    border: isLabel ? 'none' : '1px solid rgba(124,58,237,0.55)',
                    background: isLabel
                        ? '#7C3AED'
                        : isLink
                            ? 'rgba(124,58,237,0.18)'
                            : 'transparent',
                }}
            >
                {isLabel && (
                    <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-wide text-paper">
                        {label}
                    </span>
                )}
            </div>
        </>
    )
}
