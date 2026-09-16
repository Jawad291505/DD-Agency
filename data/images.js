// Curated imagery for a fully-remote digital studio.
// Deliberately abstract / craft / product-led — no office or team-space shots,
// so nothing reads as a physical Diversify Digital Global HQ.
// Unsplash source URLs with auto format (webp/avif) + sizing for performance.
const u = (id, w = 1200) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`

export const IMAGES = {
    // Hero — vivid abstract gradient, sets an expressive digital tone
    hero: u('1620641788421-7a1c342ea42e', 1600),

    // Process & CTA imagery — abstract light, data and dimensional renders
    experienceLarge: u('1487014679447-9f8336841d58', 1400),
    experienceTall: u('1639762681485-074b7f938ba0', 900),
    experienceSmall: u('1451187580459-43490279c0fa', 1200),

    // Project showcase — local optimised WebP assets
    trendwood: '/assets/trendwood.webp',
    agora: '/assets/agora.webp',
    fitoo: '/assets/fitoo.webp',
    eyeInsight: '/assets/eye-insight.webp',
    fit360: '/assets/fit360.webp',
    alImran: '/assets/al-imran.webp',

    // About / philosophy atmosphere — abstract dimensional render.
    // Local asset in /public so it never depends on an Unsplash hotlink at runtime.
    philosophy: '/about.jpg',

    // Testimonial portraits — real people (clients), not workspaces
    portrait: u('1494790108377-be9c29b29330', 600),
    portrait2: u('1507003211169-0a1dd7228f2d', 600),
    portrait3: u('1573497019940-1c28c88b4f3e', 600),

    ubaid: '/assets/owner/Ubaid.webp',
    jamal: '/assets/owner/jamal.webp',
    jawad: '/assets/owner/Jawad.webp',
    waleed: '/assets/owner/Waled.webp',
    irum: '/assets/owner/Irum.webp',
    kashan: '/assets/owner/Kashan.webp',
    muntaha: '/assets/owner/Muntaha.webp',
    usman: '/assets/owner/usman.webp',
    asif: '/assets/owner/Asif.webp',
    hamza: '/assets/owner/hamza.webp',

    // Founder portrait — local asset
    owner: '/assets/owner/waqar.webp',

    // Case study — client dashboard screenshots (results proof)
    caseStudy1: '/case-study/case-study-1.jpeg',
    caseStudy2: '/case-study/case-study-2.jpeg',
    caseStudy3: '/case-study/case-study-3.jpeg',
    caseStudy4: '/case-study/case-study-4.jpeg',
    caseStudy5: '/case-study/case-study-5.jpeg',
    caseStudy6: '/case-study/case-study-6.jpeg',
}
