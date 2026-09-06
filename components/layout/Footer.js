import { REGISTER_CLIENT_URL } from '@/data/links'
import { LogoLockup } from '@/components/ui/Logo'

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
            { label: 'About', href: '#about' },
            { label: 'Why us', href: '#why' },
            { label: 'Process', href: '#process' },
            { label: 'Work', href: '#work' },
            { label: 'Contact', href: '#contact' },
        ],
    },
]

// Brand glyphs as inline SVG (no icon dependency). 24x24 viewBox.
const SOCIAL_ICONS = {
    linkedin: (
        <path
            fill="currentColor"
            d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z"
        />
    ),
    facebook: (
        <path
            fill="currentColor"
            d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z"
        />
    ),
    instagram: (
        <path
            fill="currentColor"
            d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32A6.16 6.16 0 0 0 12 5.84ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z"
        />
    ),
    email: (
        <path
            fill="currentColor"
            d="M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm.42 2.06 9.02 6.5a1 1 0 0 0 1.12 0l9.02-6.5V5.5H2.42v.56Zm18.16 2.4-7.4 5.33a3 3 0 0 1-3.36 0L2.42 8.46V18.5h18.16V8.46Z"
        />
    ),
}

// TODO: swap these for the real profile URLs.
const SOCIALS = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/diversify-digital', icon: 'linkedin', external: true },
    { label: 'Facebook', href: 'https://www.facebook.com/diversifydigital', icon: 'facebook', external: true },
    { label: 'Instagram', href: 'https://www.instagram.com/diversifydigital', icon: 'instagram', external: true },
    { label: 'Email', href: 'mailto:hello@diversify.digital', icon: 'email' },
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

                        <div>
                            <h4 className="font-mono text-[0.7rem] font-medium uppercase tracking-wide text-violet-light">
                                Connect
                            </h4>
                            <ul className="mt-5 flex flex-wrap gap-3">
                                {SOCIALS.map((s) => (
                                    <li key={s.label}>
                                        <a
                                            href={s.href}
                                            aria-label={s.label}
                                            title={s.label}
                                            {...(s.external
                                                ? { target: '_blank', rel: 'noopener noreferrer' }
                                                : {})}
                                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-paper/65 transition-colors duration-300 hover:border-white/40 hover:bg-white/5 hover:text-paper"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                                                {SOCIAL_ICONS[s.icon]}
                                            </svg>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Oversized wordmark */}
                <div aria-hidden="true" className="overflow-hidden border-t border-white/12 pt-10">
                    <p className="display select-none whitespace-nowrap text-center text-[clamp(1.8rem,10.5vw,9rem)] leading-none tracking-[-0.04em] text-white/[0.06]">
                        Diversify Digital
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
