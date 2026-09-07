/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './lib/**/*.{js,jsx}',
        './data/**/*.{js,jsx}',
    ],
    theme: {
        extend: {
            colors: {
                violet: {
                    DEFAULT: '#7C3AED',
                    50: '#f5f3ff',
                    100: '#ede9fe',
                    200: '#ddd6fe',
                    300: '#c4b5fd',
                    400: '#a78bfa',
                    500: '#8b5cf6',
                    600: '#7c3aed',
                    700: '#6d28d9',
                    800: '#5b21b6',
                    900: '#4c1d95',
                    950: '#2e1065',
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
                serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
                mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
            },
            keyframes: {
                marquee: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-50%)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                pulse_slow: {
                    '0%, 100%': { opacity: '0.4' },
                    '50%': { opacity: '1' },
                },
            },
            animation: {
                marquee: 'marquee 40s linear infinite',
                float: 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse_slow 3s ease-in-out infinite',
            },
        },
    },
    plugins: [],
}
