// Blog posts. Body text is kept word-for-word from the source documents.
// Inline `**text**` marks bold runs; block types: p, h2, ul.

export const POSTS = [
    {
        slug: 'why-your-website-needs-engineers-and-marketers-working-together',
        title: 'Why Your Website Needs Engineers and Marketers Working Together',
        description:
            "Great design and good SEO aren't enough if your site's foundation is weak. Learn why engineering and digital marketing need to work as one system to drive real growth.",
        date: '2026-10-14',
        author: 'Diversify Digital Global',
        category: 'Growth Strategy',
        keywords: [
            'engineering and marketing alignment',
            'website performance',
            'technical SEO',
            'Core Web Vitals',
            'digital marketing',
            'software engineering',
            'cloud infrastructure',
        ],
        image: {
            src: '/blog/engineers-and-marketers-working-together.jpg',
            alt: 'A team of engineers and marketers working together on laptops around a shared table',
            width: 1600,
            height: 900,
            credit: 'Unsplash',
        },
        content: [
            { type: 'p', text: 'Many businesses launch a beautiful website and then wait for results that never arrive. Traffic stays flat, leads trickle in, and the marketing team blames the site. The developers say the site is fine and the campaigns are the problem.' },
            { type: 'p', text: 'Both sides are often partly right, and the cause is usually structural. The people building the product and the people promoting it work in separate silos, with separate goals and separate vendors.' },

            { type: 'h2', text: 'The Hidden Cost of Disconnected Teams' },
            { type: 'p', text: "When your developers, SEO specialists, and ad managers don't talk to each other, problems pile up quietly." },
            {
                type: 'ul',
                items: [
                    '**Slow pages waste ad spend.** If you pay for clicks that land on a slow page, visitors leave before they see your offer.',
                    '**SEO fixes get stuck in the backlog.** A marketer finds a technical issue, such as poor site structure or missing metadata, but has no direct line to the person who can fix it.',
                    "**Tracking breaks.** Without analytics set up properly at build time, you can't tell which channel is bringing in revenue.",
                    '**Messaging and product drift apart.** The site says one thing, the ads say another, and the app does a third.',
                ],
            },
            { type: 'p', text: 'Each problem looks small alone. Together, they hold back growth.' },

            { type: 'h2', text: 'Engineering Is the Foundation of Marketing' },
            { type: 'p', text: 'Marketing works best on a solid technical base. Search engines and users reward sites that are fast, accessible, secure, and well structured.' },
            { type: 'p', text: '**Performance is a ranking and conversion factor.** Page speed and Core Web Vitals affect how people experience your site, and they influence how search engines see it. A site that loads quickly keeps visitors engaged. A slow one loses them.' },
            { type: 'p', text: '**Clean architecture makes SEO easier.** Logical URL structures, proper heading hierarchy, structured data, and mobile-friendly layouts are engineering decisions. Getting them right from the start is far cheaper than retrofitting them later.' },
            { type: 'p', text: "**Scalable infrastructure protects your campaigns.** If a successful campaign sends a surge of visitors and your servers buckle, you've paid to crash your own site. Cloud infrastructure that scales with demand keeps you online when it matters most." },

            { type: 'h2', text: 'Marketing Gives Engineering Its Direction' },
            { type: 'p', text: 'The relationship works both ways. Engineers build better products when they understand what users search for, where they drop off, and what makes them convert.' },
            { type: 'p', text: 'Marketing data shows which features people actually use, which pages attract the right audience, and where the user journey breaks down. When this feedback flows back to the build team, every release gets smarter. You stop guessing and start iterating on evidence.' },

            { type: 'h2', text: 'What an Integrated Approach Looks Like' },
            { type: 'p', text: 'A joined-up process usually follows three stages.' },
            { type: 'p', text: '**1. Research and architecture.** Before any code is written or any campaign is launched, you study the market, the users, and the technical landscape. The goals set here shape both the build and the marketing plan.' },
            { type: 'p', text: '**2. Build and optimize.** Developers engineer the product and infrastructure while SEO and content are planned in parallel. Search optimization happens inside the build, not after it.' },
            { type: 'p', text: '**3. Launch and scale.** You go live, drive acquisition, measure everything, and feed what you learn into the next iteration. Growth compounds because each cycle improves on the last.' },

            { type: 'h2', text: "Why Vanity Metrics Don't Cut It" },
            { type: 'p', text: "It's easy to celebrate impressions, followers, and page views. But none of those pay the bills. A better question is: what did this channel contribute to pipeline and revenue?" },
            { type: 'p', text: 'When engineering and marketing share the same measurement framework, you can answer that clearly. You can see which campaigns bring qualified leads, which pages convert, and where a technical improvement would unlock the most value. Reporting becomes transparent, and decisions become easier.' },

            { type: 'h2', text: 'AI Makes the Case Stronger' },
            { type: 'p', text: 'AI is now part of both sides of the equation. On the product side, it powers smarter search, personalization, chatbots, and workflow automation. On the marketing side, it speeds up analysis, content planning, and audience targeting.' },
            { type: 'p', text: 'Teams that treat AI as a shared capability, built into products and workflows rather than bolted on, will move faster than those that treat it as a separate experiment.' },

            { type: 'h2', text: 'A Quick Checklist for Your Own Business' },
            { type: 'p', text: 'Ask yourself these questions:' },
            {
                type: 'ul',
                items: [
                    'Do our developers and marketers share goals and regular communication?',
                    'Is our site fast on mobile, and have we measured it?',
                    'Is analytics tracking set up correctly across every key page and action?',
                    'Can we trace revenue back to specific channels?',
                    'Will our infrastructure handle a sudden spike in traffic?',
                    'Do we have ongoing maintenance, or does support end at launch?',
                ],
            },
            { type: 'p', text: 'If you answered "no" or "not sure" to several of these, an integrated approach could unlock growth you\'re currently leaving on the table.' },

            { type: 'h2', text: 'The Takeaway' },
            { type: 'p', text: "Websites and apps don't succeed because they look good or because someone ran ads. They succeed when strong engineering, smart marketing, and clear measurement move in the same direction." },
            { type: 'p', text: "At **Diversify Digital Global**, that's how we work: software engineering, cloud infrastructure, AI, and digital marketing under one roof, with one team accountable for results. If you're building something and want it to grow, we'd love to hear about it." },
            { type: 'p', text: "**Ready to talk?** Tell us what you're building at [diversifydigitalglobal.online](/#contact), and we'll reply within one business day." },
        ],
    },
]

export const getPost = (slug) => POSTS.find((p) => p.slug === slug)

// Newest first.
export const getAllPosts = () => [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1))

export const readingTime = (post) => {
    const words = post.content
        .flatMap((b) => (b.type === 'ul' ? b.items : [b.text]))
        .join(' ')
        .split(/\s+/).length
    return Math.max(1, Math.round(words / 220))
}

export const formatDate = (iso) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
