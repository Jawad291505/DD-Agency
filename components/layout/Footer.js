import { LogoLockup } from '@/components/ui/Logo'
import { REGISTER_CLIENT_URL } from '@/data/links'

const COLUMNS = [
    {
        heading: 'Services',
        links: [
            { label: 'Web & App Development', href: '/#services' },
            { label: 'Cloud & DevOps', href: '/#services' },
            { label: 'AI & Automation', href: '/#services' },
            { label: 'SEO & Paid Ads', href: '/#services' },
        ],
    },
    {
        heading: 'Company',
        links: [
            { label: 'Team', href: '/team' },
            { label: 'Work', href: '/work' },
            { label: 'Journey', href: '/#journey' },
            { label: 'Clients', href: '/#testimonials' },
            { label: 'Contact', href: '/#contact' },
        ],
    },
]

const SOCIALS = [
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/company/diversifydigital/',
        external: true,
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/diversify.digital',
        external: true,
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
        ),
    },
    {
        label: 'Gmail',
        href: 'mailto:diversifydigitalglobal@gmail.com',
        external: false,
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
            </svg>
        ),
    },
]

export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className="relative bg-[#100b20] text-white">
            {/* Seamless transition from Contact */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#100b20] to-transparent z-[2]" />
            <div className="absolute inset-0 grain" />

            <div className="container relative z-10">
                {/* Top CTA */}
                <div className="flex flex-col items-start justify-between gap-8 border-b border-white/[0.06] py-14 md:flex-row md:items-center">
                    <div>
                        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-violet-400/50">
                            Ready when you are
                        </p>
                        <p className="mt-3 display text-[clamp(1.6rem,3.5vw,2.4rem)] leading-tight text-white/80">
                            Let&apos;s build something worth talking about.
                        </p>
                    </div>
                    <a href={REGISTER_CLIENT_URL} data-cursor-label="Let's talk" className="btn btn-primary shrink-0">
                        Start your project
                    </a>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-[1.4fr_2fr]">
                    <div>
                        <a href="/" className="inline-flex" aria-label="Home">
                            <LogoLockup tone="paper" markSize="h-10 w-10 rounded-lg ring-1 ring-white/10" />
                        </a>
                        <p className="mt-5 max-w-[320px] text-[0.9rem] leading-relaxed text-white/35">
                            A technology and digital growth partner for businesses ready to
                            build, ship and scale.
                        </p>
                        <div className="mt-6 flex flex-col gap-1.5 text-[0.9rem]">
                            <a href="mailto:diversifydigitalglobal@gmail.com" className="w-fit text-white/40 transition-colors hover:text-violet-300">
                                diversifydigitalglobal@gmail.com
                            </a>
                            <a href="https://wa.me/923204330801" target="_blank" rel="noopener noreferrer" className="w-fit text-white/40 transition-colors hover:text-violet-300">
                                +92 320 4330801
                            </a>
                            <a href="https://wa.me/923270738599" target="_blank" rel="noopener noreferrer" className="w-fit text-white/40 transition-colors hover:text-violet-300">
                                +92 327 0738599
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                        {COLUMNS.map((col) => (
                            <div key={col.heading}>
                                <h4 className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.15em] text-violet-400/50">
                                    {col.heading}
                                </h4>
                                <ul className="mt-4 flex flex-col gap-2.5">
                                    {col.links.map((l) => (
                                        <li key={l.label}>
                                            <a href={l.href} className="text-[0.88rem] text-white/35 transition-colors hover:text-white/60">
                                                {l.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        <div>
                            <h4 className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.15em] text-violet-400/50">
                                Connect
                            </h4>
                            <div className="mt-4 flex items-center gap-4">
                                {SOCIALS.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        aria-label={s.label}
                                        {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                        className="text-white/35 transition-colors duration-300 hover:text-violet-300"
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Oversized watermark */}
                <div aria-hidden="true" className="overflow-hidden border-t border-white/[0.04] pt-8">
                    <p className="display select-none whitespace-nowrap text-center text-[clamp(1.6rem,9vw,8rem)] leading-none tracking-[-0.04em] text-white/[0.03]">
                        Diversify Digital Global
                    </p>
                </div>

                <div className="flex flex-col items-center justify-between gap-3 border-t border-white/[0.04] py-6 text-center font-mono text-[0.7rem] text-white/20 sm:flex-row sm:text-left">
                    <span>&copy; {year} Diversify Digital Global</span>
                    <span>Engineering &middot; Cloud &middot; AI &middot; Growth</span>
                </div>
            </div>
        </footer>
    )
}
