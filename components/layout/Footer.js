import { LogoLockup } from '@/components/ui/Logo'
import { REGISTER_CLIENT_URL } from '@/data/links'

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
            { label: 'Owner', href: '#owner' },
            { label: 'Work', href: '#work' },
            { label: 'Journey', href: '#journey' },
            { label: 'Clients', href: '#testimonials' },
            { label: 'Contact', href: '#contact' },
        ],
    },
]

const SOCIALS = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/diversify-digital', external: true },
    { label: 'Facebook', href: 'https://www.facebook.com/diversifydigital', external: true },
    { label: 'Instagram', href: 'https://www.instagram.com/diversifydigital', external: true },
    { label: 'Email', href: 'mailto:hello@diversify.digital' },
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
                        <a href="#top" className="inline-flex" aria-label="Home">
                            <LogoLockup tone="paper" markSize="h-10 w-10 rounded-lg ring-1 ring-white/10" />
                        </a>
                        <p className="mt-5 max-w-[320px] text-[0.9rem] leading-relaxed text-white/35">
                            A full-service digital marketing and solutions partner for brands ready to
                            be seen, understood and chosen.
                        </p>
                        <div className="mt-6 flex flex-col gap-1.5 text-[0.9rem]">
                            <a href="mailto:hello@diversify.digital" className="w-fit text-white/40 transition-colors hover:text-violet-300">
                                hello@diversify.digital
                            </a>
                            <a href="tel:+15550123480" className="w-fit text-white/40 transition-colors hover:text-violet-300">
                                +1 (555) 012-3480
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
                            <ul className="mt-4 flex flex-col gap-2.5">
                                {SOCIALS.map((s) => (
                                    <li key={s.label}>
                                        <a
                                            href={s.href}
                                            {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                            className="text-[0.88rem] text-white/35 transition-colors hover:text-white/60"
                                        >
                                            {s.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Oversized watermark */}
                <div aria-hidden="true" className="overflow-hidden border-t border-white/[0.04] pt-8">
                    <p className="display select-none whitespace-nowrap text-center text-[clamp(1.6rem,9vw,8rem)] leading-none tracking-[-0.04em] text-white/[0.03]">
                        Diversify Digital
                    </p>
                </div>

                <div className="flex flex-col items-center justify-between gap-3 border-t border-white/[0.04] py-6 text-center font-mono text-[0.7rem] text-white/20 sm:flex-row sm:text-left">
                    <span>&copy; {year} Diversify Digital</span>
                    <span>Strategy &middot; Growth &middot; Technology &middot; Creative</span>
                </div>
            </div>
        </footer>
    )
}
