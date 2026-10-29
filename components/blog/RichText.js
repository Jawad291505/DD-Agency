// Renders inline `**bold**` and `[label](href)` markup used in data/blog.js.
function Inline({ text }) {
    const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean)
    return parts.map((part, i) => {
        if (part.startsWith('**')) return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (link) return <a key={i} href={link[2]} className="font-medium text-violet-300 underline decoration-violet-400/50 underline-offset-4 transition-colors hover:text-violet-200 hover:decoration-violet-200">{link[1]}</a>
        return part
    })
}

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const headingId = slugify

// Shared body copy sizing so paragraphs, list items and FAQ answers read the same.
const BODY = 'text-[1.0625rem] leading-[1.8] text-white/90 sm:text-[1.125rem]'

export default function RichText({ blocks }) {
    return blocks.map((b, i) => {
        if (b.type === 'h2') {
            return (
                <h2 key={i} id={slugify(b.text)} className="mt-14 scroll-mt-28 border-t border-white/[0.08] pt-10 font-serif text-[1.65rem] leading-[1.2] tracking-[-0.01em] text-white sm:text-[2rem]">
                    {b.text}
                </h2>
            )
        }
        if (b.type === 'img') {
            return (
                <figure key={i} className="my-10 overflow-hidden rounded-2xl border border-white/[0.08] shadow-xl shadow-black/30">
                    <img src={b.src} alt={b.alt} width={b.width} height={b.height} loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover" />
                </figure>
            )
        }
        if (b.type === 'faq') {
            return (
                <div key={i} className="mt-8 divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                    {b.items.map((item, j) => (
                        <div key={j} className="p-6 sm:p-7">
                            <h3 className="flex gap-3 font-sans text-[1.08rem] font-semibold leading-snug text-white sm:text-[1.15rem]">
                                <span aria-hidden="true" className="font-mono text-[0.9em] text-violet-300">Q.</span>
                                {item.q}
                            </h3>
                            <p className={`mt-3 sm:pl-8 ${BODY}`}>
                                <Inline text={item.a} />
                            </p>
                        </div>
                    ))}
                </div>
            )
        }
        if (b.type === 'ul') {
            return (
                <ul key={i} className="mt-6 space-y-4">
                    {b.items.map((item, j) => (
                        <li key={j} className={`relative pl-7 ${BODY}`}>
                            <span aria-hidden="true" className="absolute left-1 top-[0.72em] h-2 w-2 rounded-full bg-violet-400 ring-4 ring-violet-400/15" />
                            <Inline text={item} />
                        </li>
                    ))}
                </ul>
            )
        }
        // The opening paragraph is set as a larger lead-in.
        if (i === 0) {
            return (
                <p key={i} className="text-[1.2rem] leading-[1.7] text-white sm:text-[1.32rem]">
                    <Inline text={b.text} />
                </p>
            )
        }
        return (
            <p key={i} className={`mt-6 ${BODY}`}>
                <Inline text={b.text} />
            </p>
        )
    })
}
