// Renders inline `**bold**` and `[label](href)` markup used in data/blog.js.
function Inline({ text }) {
    const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean)
    return parts.map((part, i) => {
        if (part.startsWith('**')) return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (link) return <a key={i} href={link[2]} className="text-violet-300 underline decoration-violet-400/40 underline-offset-4 transition-colors hover:text-violet-200">{link[1]}</a>
        return part
    })
}

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const headingId = slugify

export default function RichText({ blocks }) {
    return blocks.map((b, i) => {
        if (b.type === 'h2') {
            return (
                <h2 key={i} id={slugify(b.text)} className="mt-14 scroll-mt-28 font-serif text-[1.6rem] leading-tight text-white sm:text-[2rem]">
                    {b.text}
                </h2>
            )
        }
        if (b.type === 'ul') {
            return (
                <ul key={i} className="mt-6 space-y-3 pl-1">
                    {b.items.map((item, j) => (
                        <li key={j} className="relative pl-6 text-[1.02rem] leading-[1.8] text-white/70 sm:text-[1.08rem]">
                            <span aria-hidden="true" className="absolute left-0 top-[0.8em] h-1.5 w-1.5 rounded-full bg-violet-400" />
                            <Inline text={item} />
                        </li>
                    ))}
                </ul>
            )
        }
        return (
            <p key={i} className="mt-6 text-[1.02rem] leading-[1.85] text-white/70 sm:text-[1.08rem]">
                <Inline text={b.text} />
            </p>
        )
    })
}
