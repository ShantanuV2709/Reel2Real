import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const SAVED_ROADMAPS = [
    { id: 1, topic: 'How to Learn Machine Learning in 2025', creator: '@tech_influencer', hypeScore: 73, severity: 'high', steps: 8, date: 'FEB 28, 2025' },
    { id: 2, topic: 'Master React in 7 Days', creator: '@code_master', hypeScore: 89, severity: 'high', steps: 6, date: 'FEB 26, 2025' },
    { id: 3, topic: 'Become a UI/UX Designer', creator: '@design_guru', hypeScore: 34, severity: 'low', steps: 10, date: 'FEB 20, 2025' },
    { id: 4, topic: 'Data Science Career Roadmap', creator: '@data_wizard', hypeScore: 51, severity: 'medium', steps: 12, date: 'FEB 15, 2025' },
]

function getScoreColor(severity) {
    if (severity === 'high') return 'var(--accent-red)'
    if (severity === 'medium') return 'var(--accent-yellow)'
    return '#00FF88'
}

export default function SavedPage() {
    return (
        <div className="pt-16 min-h-screen flex flex-col">
            <section className="container-edge py-16 flex-1">
                <span className="section-label">YOUR ROADMAPS</span>
                <p className="t6-mono-label mb-8" style={{ color: 'var(--fg-secondary)', fontSize: '13px' }}>
                    {SAVED_ROADMAPS.length} ROADMAPS SAVED
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SAVED_ROADMAPS.map((roadmap) => (
                        <div key={roadmap.id} className="card">
                            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '24px', color: 'var(--fg-primary)', marginBottom: '8px' }}>
                                {roadmap.topic}
                            </h3>
                            <p className="t6-mono-label mb-4" style={{ color: 'var(--fg-secondary)', fontSize: '13px' }}>
                                {roadmap.creator}
                            </p>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '24px', color: getScoreColor(roadmap.severity) }}>
                                        {roadmap.hypeScore}
                                    </span>
                                    <span className="t6-mono-label" style={{ color: 'var(--fg-secondary)', fontSize: '11px' }}>HYPE</span>
                                </div>
                                <span className="t6-mono-label" style={{ color: 'var(--fg-secondary)', fontSize: '12px' }}>
                                    {roadmap.steps} STEPS
                                </span>
                            </div>
                            <p className="t6-mono-label mb-4" style={{ color: '#555555', fontSize: '11px' }}>
                                SAVED {roadmap.date}
                            </p>
                            <div className="flex justify-between items-center">
                                <Link to="/results" className="t6-mono-label no-underline" style={{ color: 'var(--accent-cyan)', fontSize: '13px' }}>
                                    VIEW ROADMAP →
                                </Link>
                                <button className="bg-transparent border-none cursor-pointer t6-mono-label" style={{ color: 'var(--accent-red)', fontSize: '13px' }}>
                                    DELETE
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    )
}
