'use client'

export const LOGO_SRC = '/.well-known/appspecific/logo.png'

export default function Logo({ className = '', imgClassName = '' }) {
    return (
        <span className={`inline-flex items-center ${className}`}>
            <img src={LOGO_SRC} alt="Diversify Digital" className={imgClassName || 'h-full w-auto'} draggable={false} />
        </span>
    )
}

export function LogoLockup({ className = '', markSize = 'h-9 w-9', text = true, tone = 'paper' }) {
    const wordColor = tone === 'paper' ? 'text-white' : 'text-[#100b20]'
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
                <span className={`font-serif text-[1.35rem] font-normal leading-none tracking-[-0.02em] ${wordColor}`}>
                    Diversify<span className="italic">Digital</span>
                </span>
            )}
        </span>
    )
}
