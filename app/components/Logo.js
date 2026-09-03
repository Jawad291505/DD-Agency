'use client'

/**
 * Placeholder brand mark for Diversify Digital.
 * A "DD" monogram built from concentric arcs on the brand violet gradient,
 * with warm sand/clay accents. Pure SVG so it scales crisply at any size.
 * Swap this out for the real logo when it's ready.
 */
export default function Logo({ className = '', showWordmark = true }) {
    return (
        <svg
            viewBox="0 0 400 500"
            role="img"
            aria-label="Diversify Digital"
            className={className}
            preserveAspectRatio="xMidYMid slice"
        >
            <defs>
                <linearGradient id="dd-bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#704399" />
                    <stop offset="34%" stopColor="#4b236d" />
                    <stop offset="78%" stopColor="#35184f" />
                    <stop offset="100%" stopColor="#21102f" />
                </linearGradient>
                <linearGradient id="dd-accent" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f5c979" />
                    <stop offset="100%" stopColor="#e4b96b" />
                </linearGradient>
                <radialGradient id="dd-glow" cx="50%" cy="38%" r="60%">
                    <stop offset="0%" stopColor="#b06ad1" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#b06ad1" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Backdrop */}
            <rect width="400" height="500" fill="url(#dd-bg)" />
            <rect width="400" height="500" fill="url(#dd-glow)" />

            {/* Monogram — two interlocking "D" arcs */}
            <g fill="none" strokeLinecap="round">
                {/* Outer D — sand accent */}
                <path
                    d="M150 140 L150 360 L210 360 A110 110 0 0 0 210 140 Z"
                    stroke="url(#dd-accent)"
                    strokeWidth="16"
                />
                {/* Inner D — clay/light violet, offset for depth */}
                <path
                    d="M120 175 L120 325 L165 325 A75 75 0 0 0 165 175 Z"
                    stroke="#b06ad1"
                    strokeWidth="12"
                    opacity="0.9"
                />
                {/* Accent dot */}
                <circle cx="262" cy="250" r="9" fill="url(#dd-accent)" stroke="none" />
            </g>

            {showWordmark && (
                <g>
                    <text
                        x="200"
                        y="420"
                        textAnchor="middle"
                        fill="#f4f0e8"
                        fontFamily="Georgia, 'Times New Roman', serif"
                        fontSize="34"
                        letterSpacing="1"
                    >
                        Diversify
                    </text>
                    <text
                        x="200"
                        y="452"
                        textAnchor="middle"
                        fill="#e4b96b"
                        fontFamily="Georgia, 'Times New Roman', serif"
                        fontSize="34"
                        fontStyle="italic"
                        letterSpacing="1"
                    >
                        Digital
                    </text>
                </g>
            )}
        </svg>
    )
}
