// Curated imagery for a fully-remote digital studio.
// Deliberately abstract / craft / product-led — no office or team-space shots,
// so nothing reads as a physical Diversify Digital HQ.
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

    // Gallery — varied crops of digital craft: interfaces, code, motion, form
    gallery1: u('1551288049-bebda4e38f71', 900),
    gallery2: u('1618005182384-a83a8bd57fbe', 800),
    gallery3: u('1526374965328-7f61d4dc18c5', 900),
    gallery4: u('1633356122544-f134324a6cee', 800),
    gallery5: u('1523473827533-2a64d0d36748', 900),

    // About / philosophy atmosphere — abstract dimensional render.
    // Local asset in /public so it never depends on an Unsplash hotlink at runtime.
    philosophy: '/about.jpg',

    // Testimonial portraits — real people (clients), not workspaces
    portrait: u('1494790108377-be9c29b29330', 600),
    portrait2: u('1507003211169-0a1dd7228f2d', 600),
    portrait3: u('1573497019940-1c28c88b4f3e', 600),

    // Founder portrait — placeholder. Swap for a real photo of the owner:
    // drop the file in /public (e.g. /owner.jpg) and set owner: '/owner.jpg'.
    owner: u('1560250097-0b93528c311a', 900),
}
