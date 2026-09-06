'use client'

/**
 * Tiny "app is ready" signal. Fires once the Preloader has finished so that
 * on-screen animations (e.g. the hero Counters) don't run hidden behind the
 * loading panel. Falls back to window load + a timeout so it always resolves
 * even if the Preloader is removed.
 */
let ready = false
const subscribers = new Set()

export function isAppReady() {
    return ready
}

export function markAppReady() {
    if (ready) return
    ready = true
    subscribers.forEach((cb) => cb())
    subscribers.clear()
}

export function onAppReady(cb) {
    if (ready) {
        cb()
        return () => {}
    }
    subscribers.add(cb)
    return () => subscribers.delete(cb)
}

if (typeof window !== 'undefined') {
    const failsafe = () => window.setTimeout(markAppReady, 3000)
    if (document.readyState === 'complete') failsafe()
    else window.addEventListener('load', failsafe, { once: true })
}
