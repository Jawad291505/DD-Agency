import { REGISTER_CLIENT_URL, REGISTER_TRAINER_URL } from './links'

const COLUMNS = [
    {
            heading: 'Services',
        links: [
            { label: 'SEO services', href: '#register' },
            { label: 'Web development', href: '#register' },
            { label: 'Digital solutions', href: '#register' },
            { label: 'Meta ad solutions', href: '#register' },
        ],
    },
    {
        heading: 'Company',
        links: [
            { label: 'About Diversify', href: '#intro' },
            { label: 'Careers', href: '#top' },
            { label: 'Journal', href: '#top' },
            { label: 'Contact', href: '#top' },
        ],
    },
    {
        heading: 'Legal',
        links: [
            { label: 'Privacy Policy', href: '#top' },
            { label: 'Terms of Service', href: '#top' },
            { label: 'Cookie Policy', href: '#top' },
        ],
    },
]

export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className="bg-ivory-warm text-ink">
            <div className="container">
                <div className="grid grid-cols-1 gap-12 py-20 lg:grid-cols-[1.4fr_2fr]">
                    <div>
                        <a
                            href="#top"
                            className="font-serif text-[2rem] tracking-[-0.02em] text-primary"
                            aria-label="Diversify Digital home"
                        >
                            Diversify<span className="italic text-clay">Digital</span>
                        </a>
                        <p className="mt-6 max-w-[340px] text-[0.98rem] leading-relaxed text-ink/60">
                            A digital marketing partner for brands ready to be seen, understood and
                            chosen.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                        {COLUMNS.map((col) => (
                            <div key={col.heading}>
                                <h4 className="font-sans text-[0.72rem] font-semibold uppercase tracking-editorial text-clay">
                                    {col.heading}
                                </h4>
                                <ul className="mt-5 flex flex-col gap-3">
                                    {col.links.map((l) => (
                                        <li key={l.label}>
                                            <a
                                                href={l.href}
                                                className="text-[0.96rem] text-ink/70 transition-colors duration-300 hover:text-primary"
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

                {/* Oversized wordmark as a design element */}
                <div aria-hidden="true" className="overflow-hidden border-t border-ink/10 pt-10">
                    <p className="display select-none text-center text-[clamp(4rem,20vw,16rem)] leading-none tracking-[-0.04em] text-primary/10">
                        Diversify
                    </p>
                </div>

                <div className="flex flex-col items-center justify-between gap-3 border-t border-ink/10 py-8 text-center font-sans text-[0.8rem] text-ink/50 sm:flex-row sm:text-left">
                    <span>© {year} Diversify Digital. All rights reserved.</span>
                    <span>Built for what is next.</span>
                </div>
            </div>
        </footer>
    )
}
