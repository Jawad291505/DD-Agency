// Curated editorial imagery for strategy, design and digital growth.
// Unsplash source URLs with auto format (webp/avif) + sizing for performance.
const u = (id, w = 1200) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`

export const IMAGES = {
    // Hero — a bright, tactile creative workspace
    hero: u('1558655146-d09347e92766', 1600),

    // Process and CTA imagery
    experienceLarge: u('1556761175-b413da4baf72', 1400),
    experienceTall: u('1553484771-047a44eee27b', 900),
    experienceSmall: u('1553877522-43269d4ea984', 1200),

    // Gallery — varied crops of modern digital work
    gallery1: u('1460925895917-afdab827c52f', 900),
    gallery2: u('1559028012-481c04fa702d', 800),
    gallery3: u('1558655146-9f40138edfeb', 900),
    gallery4: u('1551288049-bebda4e38f71', 800),

    // Philosophy / atmosphere
    philosophy: u('1497366754035-f200968a6e72', 1200),

    // Testimonial portrait
    portrait: u('1500648767791-00dcc994a43e', 600),
}
