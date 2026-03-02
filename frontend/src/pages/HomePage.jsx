import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAppStore from '../store/useAppStore'
import Footer from '../components/Footer'

const EXAMPLE_SCORES = [
    { topic: 'Learn ML in 30 Days', score: 73, severity: 'high' },
    { topic: 'Master React Fast', score: 89, severity: 'high' },
    { topic: 'UI/UX Design Path', score: 34, severity: 'low' },
    { topic: 'Data Science 2025', score: 51, severity: 'medium' },
    { topic: 'Web Dev Bootcamp', score: 62, severity: 'high' },
    { topic: 'Python for Beginners', score: 28, severity: 'low' },
    { topic: 'DevOps in 2 Weeks', score: 91, severity: 'high' },
    { topic: 'Learn SQL Basics', score: 19, severity: 'low' },
]

function getScoreColor(severity) {
    if (severity === 'high') return 'var(--accent-red)'
    if (severity === 'medium') return 'var(--accent-yellow)'
    return '#00FF88'
}

const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.03, duration: 0.15, ease: [0.16, 1, 0.3, 1] },
    }),
}

function AnimatedText({ text, className, style }) {
    return (
        <div className={className} style={style}>
            {text.split('').map((char, i) => (
                <motion.span key={i} custom={i} variants={charVariants} initial="hidden" animate="visible" style={{ display: 'inline-block' }}>
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </div>
    )
}

export default function HomePage() {
    const navigate = useNavigate()
    const { reelUrl, setReelUrl, startProcessing } = useAppStore()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!reelUrl.trim()) return
        startProcessing()
        navigate('/processing')
    }

    return (
        <div className="pt-16">
            {/* ─── HERO ─── */}
            <section className="relative min-h-screen flex flex-col items-center justify-center container-edge noise-overlay">
                <div className="relative z-10 text-center max-w-5xl mx-auto">
                    {/* Massive stacked type */}
                    <div className="mb-10">
                        <AnimatedText text="TURN" className="t1-hero" style={{ color: 'var(--fg-primary)' }} />
                        <AnimatedText text="REELS" className="t1-hero" style={{ WebkitTextStroke: '2px var(--fg-primary)', color: 'transparent' }} />
                        <AnimatedText text="INTO" className="t1-hero" style={{ color: 'var(--fg-primary)' }} />
                        <AnimatedText text="ROADMAPS." className="t1-hero" style={{ color: 'var(--accent-yellow)' }} />
                    </div>

                    {/* Subtext */}
                    <p className="t5-body mx-auto mb-10" style={{ maxWidth: '480px', color: 'var(--fg-secondary)' }}>
                        Paste any Instagram Reel URL. We strip the hype, find the gaps, and build you a learning path you can actually follow.
                    </p>

                    {/* URL Input */}
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row mx-auto gap-0" style={{ maxWidth: '640px' }}>
                        <input
                            type="text"
                            value={reelUrl}
                            onChange={(e) => setReelUrl(e.target.value)}
                            placeholder="PASTE REEL URL HERE..."
                            className="input-primary flex-1"
                            id="reel-url-input"
                        />
                        <button type="submit" className="btn-primary whitespace-nowrap" id="analyze-btn">
                            ANALYZE REEL →
                        </button>
                    </form>

                    <p className="t6-mono-label mt-4" style={{ color: '#555555', fontSize: '12px' }}>
                        NO SIGNUP REQUIRED FOR YOUR FIRST ROADMAP
                    </p>
                </div>

                {/* Bottom-left label */}
                <div className="absolute bottom-8 left-8 hidden md:block" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                    <span className="t6-mono-label" style={{ color: 'var(--fg-tertiary)', fontSize: '11px' }}>
                        EST. 2025 / CREDIBILITY ENGINE v1.0
                    </span>
                </div>
            </section>

            {/* ─── HYPE SCORE MARQUEE ─── */}
            <section className="py-12" style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="container-edge mb-6">
                    <span className="section-label">RECENTLY ANALYZED</span>
                </div>
                <div className="overflow-hidden">
                    <motion.div
                        className="flex gap-4 px-4"
                        animate={{ x: [0, -1200] }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                        whileHover={{ animationPlayState: 'paused' }}
                    >
                        {[...EXAMPLE_SCORES, ...EXAMPLE_SCORES].map((item, i) => (
                            <div key={i} className="card flex-shrink-0" style={{ width: '200px', padding: '24px' }}>
                                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'var(--fg-primary)', marginBottom: '12px' }}>
                                    {item.topic}
                                </p>
                                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '48px', color: getScoreColor(item.severity), lineHeight: 1 }}>
                                    {item.score}
                                </p>
                                <p className="t6-mono-label mt-2" style={{ color: 'var(--fg-secondary)', fontSize: '11px' }}>HYPE SCORE</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── HOW IT WORKS ─── */}
            <section id="how-it-works" className="container-edge py-20">
                <span className="section-label">THE PIPELINE</span>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    {[
                        { num: '01', title: 'EXTRACT', desc: 'We pull transcript, on-screen text, caption, and metadata from the reel.' },
                        { num: '02', title: 'ANALYZE', desc: 'Gemini identifies hype, exaggerated claims, and what was skipped.' },
                        { num: '03', title: 'BUILD', desc: 'A structured, honest, resource-backed roadmap is generated.' },
                    ].map((step, i) => (
                        <div key={step.num} className="relative py-12 px-8"
                            style={{ borderLeft: i > 0 ? '1px solid var(--border-subtle)' : 'none' }}>
                            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '96px', color: 'var(--bg-tertiary)', position: 'absolute', top: '0', left: '8px', lineHeight: 1 }}>
                                {step.num}
                            </span>
                            <div className="relative z-10 pt-16">
                                <h3 className="t4-subheading mb-4" style={{ color: 'var(--fg-primary)' }}>{step.title}</h3>
                                <p className="t5-body" style={{ color: 'var(--fg-secondary)' }}>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── SAMPLE OUTPUT ─── */}
            <section className="container-edge py-20" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                <span className="section-label">WHAT YOU GET</span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Claim Autopsy Preview */}
                    <div>
                        <p className="t6-mono-label mb-4" style={{ color: 'var(--fg-secondary)', fontSize: '12px' }}>CLAIM AUTOPSY</p>
                        <div style={{ border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
                            <div className="grid grid-cols-3 gap-0" style={{ background: 'var(--bg-tertiary)', padding: '12px 20px', borderBottom: '1px solid var(--border-default)' }}>
                                <span className="t6-mono-label" style={{ color: 'var(--fg-secondary)', fontSize: '12px' }}>INFLUENCER SAID</span>
                                <span className="t6-mono-label" style={{ color: 'var(--fg-secondary)', fontSize: '12px' }}>REALITY</span>
                                <span className="t6-mono-label" style={{ color: 'var(--fg-secondary)', fontSize: '12px' }}>SEVERITY</span>
                            </div>
                            {[
                                { claim: '"Learn ML in 30 days"', reality: 'Typically requires 4-6 months', severity: 'HIGH' },
                                { claim: '"You don\'t need math"', reality: 'Linear algebra is foundational', severity: 'HIGH' },
                                { claim: '"This course is all you need"', reality: 'ML requires multi-domain knowledge', severity: 'MEDIUM' },
                            ].map((row, i) => (
                                <div key={i} className="grid grid-cols-3 gap-0 p-4" style={{ background: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)' }}>
                                    <span className="t7-mono-body" style={{ color: 'var(--fg-primary)', fontStyle: 'italic', fontSize: '13px' }}>{row.claim}</span>
                                    <span className="t5-body" style={{ color: 'var(--fg-secondary)', fontSize: '13px' }}>{row.reality}</span>
                                    <span className={`badge ${row.severity === 'HIGH' ? 'badge-high' : 'badge-medium'}`} style={{ alignSelf: 'start' }}>{row.severity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Roadmap Step Preview */}
                    <div>
                        <p className="t6-mono-label mb-4" style={{ color: 'var(--fg-secondary)', fontSize: '12px' }}>LEARNING ROADMAP</p>
                        <div className="card">
                            <div className="flex items-start gap-4">
                                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '48px', color: 'var(--bg-tertiary)', lineHeight: 1 }}>01</span>
                                <div>
                                    <h4 className="t4-subheading mb-2" style={{ color: 'var(--fg-primary)' }}>Python Foundations</h4>
                                    <p className="t5-body mb-3" style={{ color: 'var(--fg-secondary)', fontSize: '14px' }}>
                                        Core Python, data structures, OOP principles
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className="badge badge-outline">OFFICIAL DOCS</span>
                                        <span className="badge badge-outline">UNIVERSITY</span>
                                    </div>
                                    <p className="t6-mono-label" style={{ color: 'var(--accent-yellow)', fontSize: '13px' }}>EST. 3–4 WEEKS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
