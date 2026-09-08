'use client'

/**
 * Tiny shared "is the user actively scrolling?" flag.
 *
 * Ambient canvas loops read this to skip a frame while a scroll (wheel or
 * touch drag) is in flight — freezing a slow star drift for ~120ms is
 * invisible, but handing that frame budget back to the compositor is the
 * difference between a smooth and a juddery scroll, especially on touch.
 */
let scrolling = false
let timer = null
let installed = false

function markScroll() {
    scrolling = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
        scrolling = false
        timer = null
    }, 120)
}

export function isScrolling() {
    if (!installed && typeof window !== 'undefined') {
        installed = true
        window.addEventListener('scroll', markScroll, { passive: true })
        window.addEventListener('touchmove', markScroll, { passive: true })
    }
    return scrolling
}
