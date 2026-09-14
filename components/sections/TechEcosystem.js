'use client'

import { useReducedMotion } from 'framer-motion'
import { Reveal } from '@/lib/motion'

/* ── Technology Data ── */
const CATEGORIES = {
    web: { label: 'Web Development', color: '#a78bfa' },
    mobile: { label: 'Mobile / Apps', color: '#8b5cf6' },
    backend: { label: 'Backend & APIs', color: '#7c3aed' },
    cloud: { label: 'Cloud & Infra', color: '#6d28d9' },
    databases: { label: 'Databases', color: '#c084fc' },
    ai: { label: 'AI / Modern Dev', color: '#a855f7' },
    marketing: { label: 'Digital Marketing', color: '#d8b4fe' },
    analytics: { label: 'Analytics & SEO', color: '#c4b5fd' },
}

/* Row 1 — moves left */
const ROW_1 = [
    { name: 'React', cat: 'web' },
    { name: 'Next.js', cat: 'web' },
    { name: 'Vue', cat: 'web' },
    { name: 'TypeScript', cat: 'web' },
    { name: 'Tailwind CSS', cat: 'web' },
    { name: 'WordPress', cat: 'web' },
    { name: 'React Native', cat: 'mobile' },
    { name: 'Flutter', cat: 'mobile' },
    { name: 'Swift', cat: 'mobile' },
    { name: 'Kotlin', cat: 'mobile' },
    { name: 'Node.js', cat: 'backend' },
    { name: 'Python', cat: 'backend' },
    { name: 'GraphQL', cat: 'backend' },
    { name: 'REST APIs', cat: 'backend' },
    { name: 'AWS', cat: 'cloud' },
    { name: 'Google Cloud', cat: 'cloud' },
    { name: 'Vercel', cat: 'cloud' },
]

/* Row 2 — moves right */
const ROW_2 = [
    { name: 'Docker', cat: 'cloud' },
    { name: 'PostgreSQL', cat: 'databases' },
    { name: 'MongoDB', cat: 'databases' },
    { name: 'Redis', cat: 'databases' },
    { name: 'Firebase', cat: 'databases' },
    { name: 'OpenAI', cat: 'ai' },
    { name: 'TensorFlow', cat: 'ai' },
    { name: 'LangChain', cat: 'ai' },
    { name: 'Meta Ads', cat: 'marketing' },
    { name: 'Google Ads', cat: 'marketing' },
    { name: 'Mailchimp', cat: 'marketing' },
    { name: 'HubSpot', cat: 'marketing' },
    { name: 'Google Analytics', cat: 'analytics' },
    { name: 'Semrush', cat: 'analytics' },
    { name: 'Ahrefs', cat: 'analytics' },
    { name: 'Hotjar', cat: 'analytics' },
]

/* ── Inline SVG logos ── */
const L = {
    'React': () => <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="3.2" fill="#61DAFB" /><ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" /><ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 16 16)" /><ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 16 16)" /></svg>,
    'Next.js': () => <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" fill="white" /><path d="M13 11v10l8.5-10H13z" fill="black" /><rect x="19" y="11" width="2" height="10" fill="black" /></svg>,
    'Vue': () => <svg viewBox="0 0 32 32" fill="none"><path d="M19.5 4H25L16 20 7 4h5.5L16 10l3.5-6z" fill="#42b883" /><path d="M7 4l9 16L25 4h-5.5L16 10 12.5 4H7z" fill="#42b883" /><path d="M12.5 4L16 10l3.5-6h-7z" fill="#35495e" /></svg>,
    'TypeScript': () => <svg viewBox="0 0 32 32" fill="none"><rect x="2" y="2" width="28" height="28" rx="3" fill="#3178C6" /><path d="M15 16.5H12v-2.5h8.5v2.5H18v9h-3v-9z" fill="white" /></svg>,
    'Tailwind CSS': () => <svg viewBox="0 0 32 32" fill="none"><path d="M16 8c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25 1.14.29 1.96 1.12 2.86 2.04C18.16 15.36 20 17.25 24 17.25c4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-1.14-.29-1.96-1.12-2.86-2.04C21.84 9.89 20 8 16 8zM8 17.25c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25 1.14.29 1.96 1.12 2.86 2.04C10.16 24.61 12 26.5 16 26.5c4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-1.14-.29-1.96-1.12-2.86-2.04C13.84 19.14 12 17.25 8 17.25z" fill="#38BDF8" /></svg>,
    'WordPress': () => <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="13" fill="#21759B" /><path d="M4.5 16c0 4.2 2.4 7.9 6 9.6L5.4 12.5A11.4 11.4 0 004.5 16z" fill="white" /></svg>,
    'React Native': () => <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="3.2" fill="#61DAFB" /><ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" /><ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 16 16)" /><ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 16 16)" /></svg>,
    'Flutter': () => <svg viewBox="0 0 32 32" fill="none"><path d="M18 4L6 16l3.7 3.7L26 4H18z" fill="#42A5F5" /><path d="M18 17.3l-4.6 4.6L18 26.5 26 18.5h-8z" fill="#42A5F5" /><path d="M13.4 21.9l3.7 3.7 4.6-4.6-3.7-3.7-4.6 4.6z" fill="#0D47A1" /></svg>,
    'Swift': () => <svg viewBox="0 0 32 32" fill="none"><rect x="3" y="3" width="26" height="26" rx="6" fill="#F05138" /><path d="M22.5 22c-.2.8-.8 1.6-1.8 2.2-2.4 1.4-5.8.6-8.2-1.2 0 0 3.2.6 6-1.4-2-1.6-3.6-3.6-4.6-5.8 1 .8 2.2 1.4 3.4 1.6-2.6-2.6-3.8-6.2-3.4-9.4 2 2.4 4.8 4.2 8 5" fill="white" /></svg>,
    'Kotlin': () => <svg viewBox="0 0 32 32" fill="none"><defs><linearGradient id="kt" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#E44857" /><stop offset="50%" stopColor="#C711E1" /><stop offset="100%" stopColor="#7F52FF" /></linearGradient></defs><path d="M4 28V4h24L16 16l12 12H4z" fill="url(#kt)" /></svg>,
    'Node.js': () => <svg viewBox="0 0 32 32" fill="none"><path d="M16 2.5l12 6.9v13.8l-12 6.9-12-6.9V9.4l12-6.9z" fill="#339933" /><text x="10" y="20" fontSize="9" fill="white" fontWeight="bold" fontFamily="sans-serif">N</text></svg>,
    'Python': () => <svg viewBox="0 0 32 32" fill="none"><path d="M15.9 3C9.5 3 10.1 5.8 10.1 5.8v3h6v1H7.5S3 9.2 3 15.8s3.9 6.4 3.9 6.4H9v-3.1s-.2-3.9 3.8-3.9h6.6s3.7.1 3.7-3.6V6.5S23.7 3 15.9 3zm-3.7 2a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" fill="#3776AB" /><path d="M16.1 29c6.4 0 5.8-2.8 5.8-2.8v-3h-6v-1h8.6S29 22.8 29 16.2s-3.9-6.4-3.9-6.4H23v3.1s.2 3.9-3.8 3.9h-6.6S8.9 16.7 8.9 20.4v5.1S8.3 29 16.1 29zm3.7-2a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4z" fill="#FFC331" /></svg>,
    'GraphQL': () => <svg viewBox="0 0 32 32" fill="none"><path d="M16 3l11 6.5v13L16 29 5 22.5v-13L16 3z" stroke="#E535AB" strokeWidth="1.5" fill="none" /><circle cx="16" cy="3" r="2" fill="#E535AB" /><circle cx="27" cy="9.5" r="2" fill="#E535AB" /><circle cx="27" cy="22.5" r="2" fill="#E535AB" /><circle cx="16" cy="29" r="2" fill="#E535AB" /><circle cx="5" cy="22.5" r="2" fill="#E535AB" /><circle cx="5" cy="9.5" r="2" fill="#E535AB" /></svg>,
    'REST APIs': () => <svg viewBox="0 0 32 32" fill="none"><rect x="3" y="7" width="26" height="18" rx="3" fill="#4CAF50" opacity=".9" /><path d="M8 14h4m-4 4h6m6-4h4m-6 4h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>,
    'AWS': () => <svg viewBox="0 0 32 32" fill="none"><path d="M6 22l4-1.5 4 1.5 4-1.5 4 1.5 4-1.5" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" /><path d="M6 25l4-1.5 4 1.5 4-1.5 4 1.5 4-1.5" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" opacity=".5" /><path d="M8 18c0-3.5 2.5-5.5 5-5.5 1.5 0 2.5.5 3.5 1.5.8-2 2.5-3.5 5-3.5 3.2 0 5.5 2.5 5.5 5.5 0 .8-.1 1.5-.3 2.2" stroke="#FF9900" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>,
    'Google Cloud': () => <svg viewBox="0 0 32 32" fill="none"><path d="M20.5 11l1.8-1.8.2-1.2c-1.8-1.7-4.2-2.7-6.8-2.7-5 0-9.2 3.6-10 8.4l1 .2 3.8-.6c0 0 .2-.3.3-.4 1.2-2.3 3.5-3.8 6.1-3.8 1.5 0 2.9.5 4 1.4" fill="#EA4335" /><path d="M27 14.3c-.5-2-1.6-3.7-3.1-5l-3.4 3.4c1 .8 1.7 2 1.9 3.3H24c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5h-5.5l-.5.5v3l.5.5H24c3.6 0 6.5-2.9 6.5-6.5 0-2.2-1.1-4.2-2.9-5.3" fill="#4285F4" /><path d="M8 25.5c1.6 2 4 3.2 6.7 3.2h.1c2 0 3.9-.7 5.5-1.9l-3.4-3.4c-.7.4-1.5.6-2.3.6-2.4 0-4.4-1.6-5.1-3.7l-3.6 2.8" fill="#34A853" /><path d="M5.2 17.6c-.3-.9-.5-1.9-.5-2.9 0-1 .2-2 .5-2.9l-3.8-3C.5 10.7 0 12.8 0 15s.5 4.3 1.4 6.2" fill="#FBBC05" /></svg>,
    'Vercel': () => <svg viewBox="0 0 32 32" fill="none"><path d="M16 5L28 27H4L16 5z" fill="white" /></svg>,
    'Docker': () => <svg viewBox="0 0 32 32" fill="none"><rect x="8" y="14" width="4" height="3.5" rx=".5" fill="#2496ED" /><rect x="13" y="14" width="4" height="3.5" rx=".5" fill="#2496ED" /><rect x="18" y="14" width="4" height="3.5" rx=".5" fill="#2496ED" /><rect x="13" y="10" width="4" height="3.5" rx=".5" fill="#2496ED" /><rect x="18" y="10" width="4" height="3.5" rx=".5" fill="#2496ED" /><rect x="18" y="6" width="4" height="3.5" rx=".5" fill="#2496ED" /><path d="M28 16c-1-1-2.5-1.2-3.8-1-.5-1.5-2-2.5-2-2.5s-1.5 1.5-1 3.5c-1.5-.2-3-.1-4.2.5H5c0 5 2.5 8.5 7 10 2 .7 4.5.8 7 0 3.5-1.2 6-4 7.5-7.5 1-.5 2-1.5 1.5-3z" fill="#2496ED" opacity=".3" /></svg>,
    'PostgreSQL': () => <svg viewBox="0 0 32 32" fill="none"><path d="M23 4c-2.5-.5-4.5 0-6 1-1.5-1-3.5-1.5-6-1-4 1-6.5 5-6.5 10s2.5 8 5 10c1 .8 2 1 3 .5.5 1 1.5 2.5 3 3.5 1.5-1 2.5-2.5 3-3.5 1 .5 2 .3 3-.5 2.5-2 5-5 5-10S27 5 23 4z" fill="#336791" /><circle cx="13" cy="12" r="1.5" fill="white" /><circle cx="19" cy="12" r="1.5" fill="white" /></svg>,
    'MongoDB': () => <svg viewBox="0 0 32 32" fill="none"><path d="M16 2c-1 4-3 7-5 10-2 3-2 6-1 9 .5 1.5 2 3 3.5 4v4.5h3V25c1.5-1 3-2.5 3.5-4 1-3 1-6-1-9C17 9 17 6 16 2z" fill="#00ED64" /><path d="M16 2c.5 4 1 7 3 10 2 3 2 6 1 9-.5 1.5-2 3-3.5 4v4.5h-1V25c0-3-.5-6 .5-9 .5-2.5.5-5 0-7.5-.3-2-.5-4 0-6.5z" fill="#004D2C" opacity=".4" /></svg>,
    'Redis': () => <svg viewBox="0 0 32 32" fill="none"><path d="M28 20c0 2-5.4 3.5-12 3.5S4 22 4 20V12c0-2 5.4-3.5 12-3.5S28 10 28 12v8z" fill="#DC382D" /><ellipse cx="16" cy="12" rx="12" ry="3.5" fill="#DC382D" /><ellipse cx="16" cy="12" rx="12" ry="3.5" fill="white" opacity=".2" /></svg>,
    'Firebase': () => <svg viewBox="0 0 32 32" fill="none"><path d="M7 25L11 5l4 8-8 12z" fill="#FFA000" /><path d="M16 28l11-7-4-16-3 6-4 6L5 28l11 0z" fill="#F57C00" /><path d="M5 28l2-3 9-12 4-6-3-6L11 5 7 25 5 28z" fill="#FFCA28" /></svg>,
    'OpenAI': () => <svg viewBox="0 0 32 32" fill="none"><path d="M27 14.5a6.5 6.5 0 00-4-8.5 6.5 6.5 0 00-9 2 6.5 6.5 0 00-9.5 4A6.5 6.5 0 005 17.5a6.5 6.5 0 004 8.5 6.5 6.5 0 009-2 6.5 6.5 0 009.5-4A6.5 6.5 0 0027 14.5z" fill="none" stroke="white" strokeWidth="1.5" /><path d="M16 10v12M11 13l10 6M21 13l-10 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>,
    'TensorFlow': () => <svg viewBox="0 0 32 32" fill="none"><path d="M16 2L4 10v12l6 3.5V14l6-3.5V28l6-3.5V10L16 2z" fill="#FF6F00" /><path d="M16 10.5V28l6-3.5V14l-6-3.5z" fill="#FF6F00" opacity=".7" /></svg>,
    'LangChain': () => <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="12" fill="none" stroke="#9CA3AF" strokeWidth="1.5" /><path d="M10 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#9CA3AF" strokeWidth="1.5" fill="none" /><circle cx="12" cy="13" r="2" fill="#9CA3AF" /><circle cx="20" cy="13" r="2" fill="#9CA3AF" /></svg>,
    'Meta Ads': () => <svg viewBox="0 0 32 32" fill="none"><path d="M4 16c0-3 1-5.5 2.5-7.5C8 6.5 10 5.5 12 5.5c2.5 0 3.5 1.5 5 4l-1 1.5c-1.5-2-2.5-3-4-3-1.5 0-3 1-4 2.5S6 14 6 16s.5 4 1.5 5.5 2.5 2.5 4 2.5c1.5 0 2.5-1 4-3l1 1.5c-1.5 2.5-2.5 4-5 4-2 0-4-1-5.5-3S4 19 4 16z" fill="#0081FB" /><path d="M20 5.5c-2.5 0-3.5 1.5-5 4l1 1.5c1.5-2 2.5-3 4-3 1.5 0 3 1 4 2.5S26 14 26 16s-.5 4-1.5 5.5-2.5 2.5-4 2.5c-1.5 0-2.5-1-4-3l-1 1.5c1.5 2.5 2.5 4 5 4 2 0 4-1 5.5-3S28 19 28 16s-1-5.5-2.5-7.5C24 6.5 22 5.5 20 5.5z" fill="#0081FB" /></svg>,
    'Google Ads': () => <svg viewBox="0 0 32 32" fill="none"><path d="M4 22l8-14 4 2.3-8 14L4 22z" fill="#FBBC04" /><path d="M20 10l8 14-4 2.3-8-14L20 10z" fill="#4285F4" /><circle cx="8" cy="24" r="4" fill="#34A853" /></svg>,
    'Mailchimp': () => <svg viewBox="0 0 32 32" fill="none"><path d="M22 8c-2-2-5-3-8-2-4 1.5-6 5-5.5 9 .5 3 2.5 6 6 7.5 3 1.3 6.5 1 9-1 2.5-2 3.5-5 3-8.5-.3-2-1.5-3.5-4.5-5z" fill="#FFE01B" /><circle cx="14" cy="14" r="1" fill="#241C15" /><circle cx="19" cy="13" r="1" fill="#241C15" /></svg>,
    'HubSpot': () => <svg viewBox="0 0 32 32" fill="none"><circle cx="20" cy="16" r="5" fill="none" stroke="#FF7A59" strokeWidth="2" /><circle cx="20" cy="16" r="1.5" fill="#FF7A59" /><circle cx="10" cy="10" r="2.5" fill="none" stroke="#FF7A59" strokeWidth="2" /><circle cx="10" cy="22" r="2.5" fill="none" stroke="#FF7A59" strokeWidth="2" /><path d="M12.3 11l5.2 3M12.3 21l5.2-3" stroke="#FF7A59" strokeWidth="1.5" /></svg>,
    'Google Analytics': () => <svg viewBox="0 0 32 32" fill="none"><rect x="6" y="18" width="5" height="10" rx="2" fill="#F9AB00" /><rect x="13.5" y="12" width="5" height="16" rx="2" fill="#E37400" /><rect x="21" y="4" width="5" height="24" rx="2" fill="#F9AB00" /></svg>,
    'Semrush': () => <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="13" fill="#FF622D" /><path d="M10 20l4-8 4 4 4-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    'Ahrefs': () => <svg viewBox="0 0 32 32" fill="none"><rect x="3" y="3" width="26" height="26" rx="6" fill="#1D4ED8" /><path d="M11 22V14l5 8 5-8v8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
    'Hotjar': () => <svg viewBox="0 0 32 32" fill="none"><path d="M18 4c0 4-4 6-4 10h4c0-4 4-6 4-10h-4z" fill="#FF3C00" /><path d="M14 18c0 4-4 6-4 10h4c0-4 4-6 4-10h-4z" fill="#FF3C00" opacity=".6" /></svg>,
}

/* ── Single tech chip — no per-chip state, hover via CSS only ── */
function TechChip({ tech }) {
    const cat = CATEGORIES[tech.cat]
    const Logo = L[tech.name]

    return (
        <div
            className="tech-chip group relative flex shrink-0 items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 select-none"
            style={{ '--cat-color': cat.color }}
        >
            <div className="h-7 w-7 shrink-0 sm:h-8 sm:w-8">
                {Logo && <Logo />}
            </div>
            <div className="flex flex-col">
                <span className="text-[0.82rem] font-medium leading-tight text-white/80 sm:text-[0.88rem]">
                    {tech.name}
                </span>
                <span className="tech-chip-label text-[0.58rem] font-mono uppercase tracking-wider leading-tight text-white/30">
                    {cat.label}
                </span>
            </div>
        </div>
    )
}

/* ── Marquee row — pure CSS animation, duplicated children for seamless loop ── */
function MarqueeRow({ items, direction = 'left', duration = 50 }) {
    const reduce = useReducedMotion()

    // Render items twice for seamless wrap
    const renderItems = () =>
        items.map((tech) => <TechChip key={tech.name} tech={tech} />)

    return (
        <div
            className="marquee-hover relative flex overflow-hidden"
            style={{
                maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            }}
        >
            <div
                className="flex shrink-0 gap-4"
                style={{
                    animation: reduce
                        ? 'none'
                        : `tech-scroll-${direction} ${duration}s linear infinite`,
                    willChange: 'transform',
                }}
            >
                {renderItems()}
                {/* Spacer between sets */}
                <div className="w-4 shrink-0" aria-hidden="true" />
                {renderItems()}
                <div className="w-4 shrink-0" aria-hidden="true" />
            </div>
        </div>
    )
}

/* ── Main Section ── */
export default function TechEcosystem() {
    return (
        <section
            id="tech"
            className="relative overflow-hidden bg-[#100b20] py-[clamp(5rem,10vw,9rem)]"
        >
            {/* Seamless transition gradients */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#100b20] to-transparent z-[2]" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#100b20] to-transparent z-[2]" />

            {/* Ambient background */}
            <div className="absolute -right-40 top-20 h-[30rem] w-[30rem] rounded-full bg-violet-600/25 blur-[150px]" />
            <div className="absolute -left-40 bottom-10 h-[25rem] w-[25rem] rounded-full bg-violet-400/20 blur-[140px]" />
            <div className="absolute inset-0 grain" />

            <div className="container relative z-10">
                {/* Header */}
                <Reveal className="mx-auto max-w-3xl text-center">
                    <span className="label label-line mx-auto text-violet-300/80">Our toolkit</span>
                    <h2 className="mt-6 display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] text-white">
                        Technologies we{' '}
                        <span className="italic text-gradient-violet">work with.</span>
                    </h2>
                    <p className="mx-auto mt-6 max-w-lg text-[1rem] leading-relaxed text-white/60">
                        A modern, full-spectrum stack — from frontend frameworks to AI platforms,
                        cloud infrastructure to growth analytics.
                    </p>
                </Reveal>
            </div>

            {/* Marquee rows — full-bleed, outside container */}
            <div className="relative z-10 mt-14 flex flex-col gap-4">
                <MarqueeRow items={ROW_1} direction="left" duration={55} />
                <MarqueeRow items={ROW_2} direction="right" duration={60} />
            </div>

            <div className="container relative z-10">
                <Reveal delay={0.2} className="mt-12 text-center">
                    <p className="mx-auto max-w-md text-[0.88rem] text-white/40">
                        We match the right tools to the right problem — never the other way around.
                    </p>
                </Reveal>
            </div>

            {/* CSS keyframes + hover effects — all compositor-friendly */}
            <style jsx>{`
                @keyframes tech-scroll-left {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                @keyframes tech-scroll-right {
                    from { transform: translateX(-50%); }
                    to   { transform: translateX(0); }
                }
                /* Desktop hover — only on pointer:fine devices */
                @media (pointer: fine) {
                    .tech-chip {
                        transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                                    border-color 0.3s ease,
                                    background-color 0.3s ease,
                                    box-shadow 0.3s ease;
                    }
                    .tech-chip:hover {
                        transform: scale(1.05) translateY(-2px);
                        border-color: var(--cat-color, #7c3aed);
                        background-color: color-mix(in srgb, var(--cat-color, #7c3aed) 6%, transparent);
                        box-shadow: 0 8px 24px -8px color-mix(in srgb, var(--cat-color, #7c3aed) 15%, transparent);
                    }
                    .tech-chip:hover .tech-chip-label {
                        color: var(--cat-color, #a78bfa);
                    }
                    .tech-chip-label {
                        transition: color 0.3s ease;
                    }
                }
            `}</style>
        </section>
    )
}
