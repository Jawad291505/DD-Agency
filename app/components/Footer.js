import { REGISTER_CLIENT_URL } from './links'
import { LogoLockup } from './Logo'

const COLUMNS = [
    {
        heading: 'Services',
        links: [
            { label: 'SEO', href: '#services' },
            { label: 'Google & Meta Ads', href: '#services' },
            { label: 'Web & App Development', href: '#services' },
            { label: 'Branding & Creative', href: '#services' },
        ],
    },
    {
        heading: 'Company',
        links: [
            { label: 'Why us', href: '#why' },
            { label: 'Process', href: '#process' },
            { label: 'Work', href: '#work' },
            { label: 'Contact', href: '#contact' },
        ],
    },
    {
        heading: 'Connect',
        links: [
            { label: 'LinkedIn', href: '#top' },
            { label: 'Instagram', href: '#top' },
            { label: 'X / Twitter', href: '#top' },
            { label: 'Dribbble', href: '#top' },
        ],
    },
]

export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className="bg-violet-900 text-paper">
            <div className="container">
                {/* Top CTA band */}
                <div className="flex flex-col items-start justify-between gap-8 border-b border-white/12 py-14 md:flex-row md:items-center">
                    <div>
                        <p className="font-mono text-[0.7rem] uppercase tracking-wide text-violet-light">
                            Ready when you are
                        </p>
                        <p className="mt-3 display text-[clamp(1.8rem,4vw,2.8rem)] leading-tight text-paper">
                            Let&apos;s build something worth talking about.
                        </p>
                    </div>
                    <a href={REGISTER_CLIENT_URL} data-cursor-label="Let's talk" className="btn btn-lime shrink-0">
                        Start your project
                    </a>
                </div>

                {/* Main footer grid */}
                <div className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-[1.4fr_2fr]">
                    <div>
                        <a href="#top" className="inline-flex items-center" aria-label="Diversify Digital home">
                            <LogoLockup
                                tone="paper"
                                markSize="h-11 w-11 rounded-xl shadow-sm ring-1 ring-white/15"
                            />
                        </a>
                        <p className="mt-6 max-w-[340px] text-[0.98rem] leading-relaxed text-paper/60">
                            A full-service digital marketing and solutions partner for brands ready to
                            be seen, understood and chosen.
                        </p>
                        <div className="mt-8 flex flex-col gap-2 text-[0.95rem]">
                            <a
                                href="mailto:hello@diversify.digital"
                                className="w-fit text-paper/70 transition-colors duration-300 hover:text-violet-light"
                            >
                                hello@diversify.digital
                            </a>
                            <a
                                href="tel:+15550123480"
                                className="w-fit text-paper/70 transition-colors duration-300 hover:text-violet-light"
                            >
                                +1 (555) 012-3480
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                        {COLUMNS.map((col) => (
                            <div key={col.heading}>
                                <h4 className="font-mono text-[0.7rem] font-medium uppercase tracking-wide text-violet-light">
                                    {col.heading}
                                </h4>
                                <ul className="mt-5 flex flex-col gap-3">
                                    {col.links.map((l) => (
                                        <li key={l.label}>
                                            <a
                                                href={l.href}
                                                className="text-[0.96rem] text-paper/65 transition-colors duration-300 hover:text-paper"
                                            >
                                                {l.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Oversized wordmark */}
                <div aria-hidden="true" className="overflow-hidden border-t border-white/12 pt-10">
                    <p className="display select-none text-center text-[clamp(3.5rem,18vw,15rem)] leading-none tracking-[-0.04em] text-white/[0.06]">
                        Diversify
                    </p>
                </div>

                <div className="flex flex-col items-center justify-between gap-3 border-t border-white/12 py-8 text-center font-mono text-[0.76rem] text-paper/45 sm:flex-row sm:text-left">
                    <span>© {year} Diversify Digital. All rights reserved.</span>
                    <span>Strategy · Growth · Technology · Creative</span>
                </div>
            </div>
        </footer>
    )
}
