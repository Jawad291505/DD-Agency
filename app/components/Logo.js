'use client'

/**
 * Brand mark for Diversify Digital — the real logo image.
 * The logo is a bold, minimalist deep-violet (#481878) mark; it is the
 * visual anchor the whole palette is built around.
 *
 * Variants:
 *  - mark only (default): just the logo image, scales to its container.
 *  - wordmark: logo image + "DiversifyDigital" lockup, used in the navbar/footer.
 */

export const LOGO_SRC = '/.well-known/appspecific/logo.png'

export default function Logo({ className = '', imgClassName = '' }) {
    return (
        <span className={`inline-flex items-center ${className}`}>
            <img
                src={LOGO_SRC}
                alt="Diversify Digital"
                className={imgClassName || 'h-full w-auto'}
                draggable={false}
            />
        </span>
    )
}

/**
 * Horizontal lockup: mark + wordmark. Used in the navbar, footer and preloader
 * so the brand identity stays consistent everywhere.
 */
export function LogoLockup({ className = '', markSize = 'h-9 w-9', text = true, tone = 'ink' }) {
    const wordColor = tone === 'paper' ? 'text-paper' : 'text-ink'
    return (
        <span className={`inline-flex items-center gap-2.5 ${className}`}>
            <img
                src={LOGO_SRC}
                alt=""
                aria-hidden="true"
                className={`${markSize} shrink-0 object-contain`}
                draggable={false}
            />
            {text && (
                <span className={`font-serif text-[1.45rem] font-normal leading-none tracking-[-0.02em] ${wordColor}`}>
                    Diversify<span className="italic">Digital</span>
                </span>
            )}
        </span>
    )
}
