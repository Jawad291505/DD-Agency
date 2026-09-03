/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                // ---------------------------------------------------------
                // Diversify Digital — a violet-led editorial system.
                // Violet is the brand and it leads everywhere, expressed as a
                // full range of shades (vivid → deep → near-black violet →
                // lavender tints). Black & white appear only minimally as a
                // near-black-violet ink and a lavender-white canvas.
                // ---------------------------------------------------------

                // Near-black violet — body text + deepest surfaces
                ink: {
                    DEFAULT: '#1A1033',
                    soft: '#281748',
                    muted: '#675B84',
                    faint: '#978BB2',
                    900: '#0F0822',
                },
                // Lavender-white — the light editorial canvas
                paper: {
                    DEFAULT: '#F5F2FB',
                    deep: '#ECE5F7',
                    dark: '#DDD2EF',
                },
                surface: {
                    DEFAULT: '#FFFFFF',
                    warm: '#FAF7FE',
                },
                // The star — a full violet scale so no single flat purple dominates
                violet: {
                    DEFAULT: '#7C3AED', // vivid royal — primary accent / CTA on light
                    bright: '#A78BFA',  // light violet — accents / fills on dark
                    light: '#C7B6FA',   // lighter — text accents / highlights on dark
                    deep: '#5B21B6',    // deep
                    mid: '#4C1D95',     // deeper
                    900: '#2A1263',     // rich deep violet — dark section canvas
                    soft: '#EDE6FB',    // lavender tint — light hover fills
                },
                line: {
                    DEFAULT: '#E4DBF3',
                    strong: '#D1C3EC',
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
                serif: ['var(--font-fraunces)', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
                mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
            },
            letterSpacing: {
                editorial: '0.22em',
                wide: '0.14em',
            },
            borderRadius: {
                '2xl': '20px',
                '3xl': '30px',
                '4xl': '40px',
            },
            maxWidth: {
                container: '1280px',
                prose: '680px',
            },
            boxShadow: {
                card: '0 1px 2px rgba(20, 19, 15, 0.04), 0 8px 24px -10px rgba(20, 19, 15, 0.14)',
                soft: '0 18px 44px -20px rgba(20, 19, 15, 0.22)',
                lifted: '0 30px 70px -28px rgba(20, 19, 15, 0.4)',
                editorial: '0 50px 100px -55px rgba(13, 12, 10, 0.6)',
            },
            backgroundImage: {
                'grid-ink': 'linear-gradient(rgba(22,21,18,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(22,21,18,0.05) 1px, transparent 1px)',
                'grid-light': 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            },
            keyframes: {
                riseIn: {
                    from: { opacity: '0', transform: 'translateY(14px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                marquee: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-50%)' },
                },
                spinSlow: {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' },
                },
            },
            animation: {
                rise: 'riseIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) both',
                marquee: 'marquee 34s linear infinite',
                'spin-slow': 'spinSlow 22s linear infinite',
            },
            transitionTimingFunction: {
                premium: 'cubic-bezier(0.4, 0, 0.2, 1)',
                editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
            },
        },
    },
    plugins: [],
}
