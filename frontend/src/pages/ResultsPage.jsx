import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'

// Mock result data for Phase 0
const MOCK_RESULT = {
    topic: 'How to Learn Machine Learning in 2025',
    creator: '@tech_influencer',
    duration: '47s',
    views: '1.2M',
    hypeScore: 73,
    claimsFlagged: 5,
    roadmapSteps: 8,
    intent: 'PROMOTIONAL',
    difficulty: 'INTERMEDIATE',
    realTime: '8–14 months',
    summary: 'This reel provides a surface-level overview of machine learning career paths, focusing primarily on tool recommendations. The creator compresses a multi-year learning journey into a 47-second format, skipping foundational mathematics, statistics prerequisites, and practical project experience.',
    claims: [
        { said: '"You can learn ML in just 30 days"', reality: 'Foundational ML understanding typically requires 4–6 months of consistent study.', severity: 'HIGH', label: 'EXAGGERATED' },
        { said: '"Just use ChatGPT to write all your code"', reality: 'Understanding underlying algorithms is essential for debugging and model selection.', severity: 'MEDIUM', label: 'MISLEADING' },
        { said: '"This one course is all you need"', reality: 'ML requires knowledge across linear algebra, statistics, programming, and domain expertise.', severity: 'HIGH', label: 'EXAGGERATED' },
        { said: '"Everyone is hiring ML engineers"', reality: 'ML roles are competitive and typically require demonstrable project experience.', severity: 'MEDIUM', label: 'UNVERIFIED' },
        { said: '"You don\'t need math for ML"', reality: 'Linear algebra, calculus, and statistics are foundational prerequisites.', severity: 'HIGH', label: 'OPINION AS FACT' },
    ],
    skipped: [
        { name: 'Linear Algebra', desc: 'Matrix operations, eigenvalues, and vector spaces' },
        { name: 'Statistics & Probability', desc: 'Distributions, hypothesis testing, Bayesian thinking' },
        { name: 'Python Fundamentals', desc: 'Core language, data structures, OOP' },
        { name: 'Data Preprocessing', desc: 'Cleaning, normalization, feature engineering' },
        { name: 'Version Control', desc: 'Git fundamentals for collaborative development' },
        { name: 'Scientific Computing', desc: 'NumPy, Pandas, and Matplotlib essentials' },
    ],
    roadmap: [
        { num: 1, title: 'Python Foundations', goal: 'Master core Python, data structures, and OOP principles.', resources: ['OFFICIAL DOCS', 'UNIVERSITY'], task: 'Build a CLI data analysis tool', time: '3–4 WEEKS' },
        { num: 2, title: 'Mathematics for ML', goal: 'Build intuition in linear algebra, calculus, and statistics.', resources: ['UNIVERSITY', 'TUTORIAL'], task: 'Solve 50 practice problems from 3Blue1Brown exercises', time: '4–6 WEEKS' },
        { num: 3, title: 'Core Machine Learning', goal: 'Understand supervised/unsupervised learning with scikit-learn.', resources: ['OFFICIAL DOCS', 'OPEN SOURCE'], task: 'Build 3 ML models on real datasets from Kaggle', time: '5–6 WEEKS' },
        { num: 4, title: 'Deep Learning Fundamentals', goal: 'Learn neural networks, backpropagation, CNNs, and RNNs.', resources: ['UNIVERSITY', 'TUTORIAL'], task: 'Implement a CNN image classifier from scratch', time: '6–8 WEEKS' },
    ],
    transparency: {
        inferred: ['Creator likely receives affiliate revenue from course recommendations', 'Timeline claim designed for engagement optimization', 'Target audience is career-switchers, not CS students'],
        explicit: ['Creator claims 1 month learning timeline', 'Recommends one specific online course', 'States math is unnecessary for ML', 'Claims high job availability'],
    },
}

function AnimatedScore({ target }) {
    const [value, setValue] = useState(0)
    useEffect(() => {
        let start = 0
        const duration = 1200
        const startTime = Date.now()
        const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            setValue(Math.round(progress * target))
            if (progress < 1) requestAnimationFrame(animate)
        }
        animate()
    }, [target])
    return value
}

function getSeverityClass(severity) {
    if (severity === 'HIGH') return 'badge-high'
    if (severity === 'MEDIUM') return 'badge-medium'
    return 'badge-low'
}

function getScoreColor(score) {
    if (score >= 61) return 'var(--accent-red)'
    if (score >= 31) return 'var(--accent-yellow)'
    return '#00FF88'
}

export default function ResultsPage() {
    const navigate = useNavigate()
    const r = MOCK_RESULT
    const [showTransparency, setShowTransparency] = useState(false)

    return (
        <div className="pt-16">
            {/* ─── HEADER BANNER ─── */}
            <section className="container-edge py-10 flex flex-col md:flex-row md:items-start justify-between gap-6"
                style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="t6-mono-label" style={{ color: 'var(--accent-yellow)' }}>ANALYSIS COMPLETE</span>
                        <span className="cursor-blink" style={{ color: 'var(--accent-green)', fontSize: '8px' }}>●</span>
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--fg-primary)', marginBottom: '8px' }}>
                        {r.topic}
                    </h1>
                    <p className="t6-mono-label" style={{ color: 'var(--fg-secondary)', fontSize: '13px' }}>
                        by {r.creator} · {r.duration} reel · {r.views} views
                    </p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                    <button className="btn-secondary">EXPORT PDF</button>
                    <button className="btn-secondary">SHARE ROADMAP</button>
                    <button className="btn-primary">SAVE ROADMAP</button>
                </div>
            </section>

            {/* ─── STAT STRIP ─── */}
            <section className="grid grid-cols-1 md:grid-cols-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                {[
                    { value: r.hypeScore, label: 'HYPE SCORE / 100', color: getScoreColor(r.hypeScore) },
                    { value: r.claimsFlagged, label: 'CLAIMS FLAGGED', color: 'var(--fg-primary)' },
                    { value: r.roadmapSteps, label: 'STEPS IN YOUR ROADMAP', color: 'var(--fg-primary)' },
                ].map((stat, i) => (
                    <div key={i} className="py-10 px-10 text-center" style={{ borderRight: i < 2 ? '1px solid var(--border-subtle)' : 'none' }}>
                        <motion.p initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '96px', color: stat.color, lineHeight: 1 }}>
                            <AnimatedScore target={stat.value} />
                        </motion.p>
                        <p className="t6-mono-label mt-3" style={{ color: 'var(--fg-secondary)' }}>{stat.label}</p>
                    </div>
                ))}
            </section>

            {/* ─── SUMMARY ─── */}
            <section className="container-edge py-16" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <span className="section-label">WHAT THIS REEL IS ACTUALLY ABOUT</span>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
                    <div className="md:col-span-3">
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--fg-primary)', lineHeight: 1.8 }}>{r.summary}</p>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="t6-mono-label" style={{ color: 'var(--fg-secondary)', width: '80px' }}>INTENT</span>
                            <span className="badge" style={{ border: '1px solid var(--accent-red)', color: 'var(--accent-red)' }}>{r.intent}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="t6-mono-label" style={{ color: 'var(--fg-secondary)', width: '80px' }}>LEVEL</span>
                            <span className="badge badge-outline">{r.difficulty}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="t6-mono-label" style={{ color: 'var(--fg-secondary)', width: '80px' }}>CREATOR</span>
                            <span className="t7-mono-body" style={{ color: 'var(--fg-primary)' }}>{r.creator}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="t6-mono-label" style={{ color: 'var(--fg-secondary)', width: '80px' }}>REAL TIME</span>
                            <span className="t7-mono-body" style={{ color: 'var(--accent-yellow)' }}>{r.realTime}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CLAIM AUTOPSY ─── */}
            <section className="container-edge py-16" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <span className="section-label">CLAIM AUTOPSY</span>
                <div className="overflow-x-auto">
                    <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-default)' }}>
                                {['INFLUENCER SAID', 'REALITY', 'SEVERITY', 'LABEL'].map(h => (
                                    <th key={h} className="text-left p-4 t6-mono-label" style={{ color: 'var(--fg-secondary)', fontSize: '12px', fontWeight: 400 }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {r.claims.map((claim, i) => (
                                <motion.tr key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                                    style={{ background: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)' }}>
                                    <td className="p-4 t7-mono-body" style={{ fontStyle: 'italic', color: 'var(--fg-primary)', fontSize: '14px', minWidth: '200px' }}>{claim.said}</td>
                                    <td className="p-4" style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--fg-secondary)', minWidth: '250px' }}>{claim.reality}</td>
                                    <td className="p-4"><span className={`badge ${getSeverityClass(claim.severity)}`}>{claim.severity}</span></td>
                                    <td className="p-4"><span className="badge badge-outline">{claim.label}</span></td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ─── WHAT WAS SKIPPED ─── */}
            <section className="container-edge py-16" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <span className="section-label">WHAT THE REEL SKIPPED</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {r.skipped.map((item, i) => (
                        <motion.div key={i} className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }}>
                            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', color: 'var(--fg-primary)', marginBottom: '8px' }}>{item.name}</h4>
                            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--fg-secondary)', marginBottom: '16px' }}>{item.desc}</p>
                            <span className="t6-mono-label" style={{ color: 'var(--accent-yellow)', fontSize: '11px' }}>ADDED TO ROADMAP</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── LEARNING ROADMAP ─── */}
            <section className="container-edge py-16" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <span className="section-label">YOUR LEARNING ROADMAP</span>
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-6 md:left-10 top-0 bottom-0 hidden md:block" style={{ width: '1px', backgroundColor: 'var(--border-subtle)' }} />

                    <div className="space-y-12">
                        {r.roadmap.map((step, i) => (
                            <motion.div key={i} className="flex gap-6 md:gap-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.15 }}>
                                <div className="flex-shrink-0 relative z-10">
                                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '64px', color: 'var(--bg-tertiary)', lineHeight: 1 }}>
                                        {String(step.num).padStart(2, '0')}
                                    </span>
                                </div>
                                <div className="flex-1 pb-8" style={{ borderBottom: i < r.roadmap.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                                    <h3 className="t4-subheading mb-2" style={{ color: 'var(--fg-primary)' }}>{step.title}</h3>
                                    <p className="t5-body mb-4" style={{ color: 'var(--fg-secondary)', fontSize: '15px' }}>{step.goal}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {step.resources.map(r => (<span key={r} className="badge badge-outline">{r}</span>))}
                                    </div>
                                    <p className="t5-body mb-3" style={{ color: 'var(--fg-secondary)', fontSize: '14px' }}>
                                        <span style={{ color: 'var(--fg-tertiary)' }}>TASK:</span> {step.task}
                                    </p>
                                    <p className="t6-mono-label" style={{ color: 'var(--accent-yellow)', fontSize: '13px' }}>EST. {step.time}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── TRANSPARENCY LOG ─── */}
            <section className="container-edge py-16" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <button className="section-label cursor-pointer bg-transparent border-none" style={{ borderTop: '2px solid var(--accent-yellow)' }}
                    onClick={() => setShowTransparency(!showTransparency)}>
                    TRANSPARENCY LOG {showTransparency ? '▲' : '▼'}
                </button>

                {showTransparency && (
                    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                        <div>
                            <h4 className="t6-mono-label mb-4" style={{ color: 'var(--fg-secondary)' }}>INFERRED</h4>
                            <ul className="space-y-3">
                                {r.transparency.inferred.map((item, i) => (
                                    <li key={i} className="t7-mono-body" style={{ color: 'var(--fg-secondary)', fontSize: '14px' }}>· {item}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="t6-mono-label mb-4" style={{ color: 'var(--fg-secondary)' }}>EXPLICITLY STATED</h4>
                            <ul className="space-y-3">
                                {r.transparency.explicit.map((item, i) => (
                                    <li key={i} className="t7-mono-body" style={{ color: 'var(--fg-secondary)', fontSize: '14px' }}>· {item}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </section>

            <Footer />
        </div>
    )
}
