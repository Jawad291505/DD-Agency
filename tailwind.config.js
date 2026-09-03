/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                // Rich violet anchor with a warm editorial canvas.
                primary: {
                    DEFAULT: '#4b236d',
                    dark: '#35184f',
                    deep: '#21102f',
                    light: '#704399',
                    soft: '#eee7f5',
                },
                // Warm, refined neutrals — the editorial canvas
                ivory: {
                    DEFAULT: '#f4f0e8',
                    warm: '#efe9dd',
                    deep: '#e7dfd0',
                },
                sand: '#e4b96b',
                clay: '#b06ad1',
                surface: {
                    DEFAULT: '#ffffff',
                    secondary: '#f8fafc',
                },
                ink: {
                    DEFAULT: '#10192b',
                    secondary: '#4a5568',
                    muted: '#8a94a6',
                },
                hairline: {
                    DEFAULT: '#eceef2',
                    strong: '#dbdfe6',
                },
                success: { DEFAULT: '#16a34a', soft: '#e7f6ec' },
                warning: '#d97706',
                info: '#2563eb',
                accent: '#f5c979',
                gold: '#d69a3a',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
                serif: ['var(--font-fraunces)', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
            },
            letterSpacing: {
                editorial: '0.24em',
            },
            borderRadius: {
                '2xl': '20px',
                '3xl': '28px',
            },
            maxWidth: {
                container: '1240px',
                prose: '680px',
            },
            boxShadow: {
                card: '0 1px 2px rgba(16, 24, 40, 0.04), 0 4px 14px -4px rgba(16, 24, 40, 0.10)',
                soft: '0 10px 30px -8px rgba(16, 24, 40, 0.12)',
                lifted: '0 24px 60px -20px rgba(16, 24, 40, 0.28)',
                editorial: '0 40px 90px -50px rgba(8, 27, 52, 0.55)',
                'btn-primary': '0 12px 26px -10px rgba(11, 37, 69, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.16)',
                'btn-primary-hover': '0 16px 32px -10px rgba(11, 37, 69, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            },
            backgroundImage: {
                'gradient-brand': 'linear-gradient(135deg, #704399, #35184f)',
                'gradient-brand-btn': 'linear-gradient(135deg, #704399, #4b236d 55%, #35184f)',
                'gradient-hero': 'linear-gradient(165deg, #704399 0%, #4b236d 34%, #35184f 78%, #21102f 100%)',
                'gradient-accent-text': 'linear-gradient(120deg, #f5c979, #f7e2ad)',
            },
            keyframes: {
                riseIn: {
                    from: { opacity: '0', transform: 'translateY(14px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                slowZoom: {
                    from: { transform: 'scale(1.08)' },
                    to: { transform: 'scale(1)' },
                },
                marquee: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-50%)' },
                },
            },
            animation: {
                rise: 'riseIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) both',
                'slow-zoom': 'slowZoom 8s cubic-bezier(0.22, 1, 0.36, 1) both',
                marquee: 'marquee 32s linear infinite',
            },
            transitionTimingFunction: {
                premium: 'cubic-bezier(0.4, 0, 0.2, 1)',
                editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
            },
        },
    },
    plugins: [],
}
