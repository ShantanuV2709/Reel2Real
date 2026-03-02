import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'

export default function AboutPage() {
    return (
        <div className="pt-16">
            {/* ─── HERO ─── */}
            <section className="container-edge pt-24 pb-16">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.05 }}>
                        <span style={{ color: 'var(--fg-primary)' }}>WE FIX</span><br />
                        <span style={{ color: 'var(--fg-primary)' }}>THE INTERNET'S</span><br />
                        <span style={{ color: 'var(--accent-yellow)' }}>WORST CLASSROOM.</span>
                    </h1>
                </motion.div>
            </section>

            {/* ─── MISSION ─── */}
            <section className="container-edge pb-20" style={{ maxWidth: '800px' }}>
                <div className="space-y-6" style={{ fontFamily: 'var(--font-body)', fontSize: '18px', color: 'var(--fg-primary)', lineHeight: 1.8 }}>
                    <p>
                        Short-form educational content on social media is broken. Influencers compress years of expertise into 60-second videos optimized for engagement, not learning. They make exaggerated claims, skip prerequisites, and push affiliate resources.
                    </p>
                    <p>
                        Reel2Real exists because learners deserve honesty. We built an AI-powered credibility engine that watches the same reels you do — but instead of being entertained, it extracts the real knowledge signal, strips the hype, identifies what was skipped, and builds you a learning path backed by authoritative resources.
                    </p>
                    <p>
                        No shortcuts. No compressed timelines. No affiliate links. Just an honest roadmap from where you are to where you want to be.
                    </p>
                </div>
            </section>

            {/* ─── THREE PILLARS ─── */}
            {[
                { num: '01', label: 'THE PROBLEM', title: 'Engagement Over Education', desc: 'Social media has become the default classroom for millions. But engagement metrics reward hype over accuracy. Claims go unverified. Prerequisites get skipped. Resources are chosen for commissions, not quality.' },
                { num: '02', label: 'THE SOLUTION', title: 'AI-Powered Credibility Engine', desc: 'Reel2Real uses Gemini AI to analyze every claim in a reel, cross-reference it against reality, identify what was left out, and generate a structured learning roadmap with vetted resources and realistic time estimates.' },
                { num: '03', label: 'THE TECH', title: 'Built for Honesty at Scale', desc: 'Built with FastAPI, React, Gemini AI, Sarvam AI transcription, PaddleOCR, and Tavily resource discovery. Every reel goes through a 7-step analysis pipeline that takes 30–60 seconds to produce a comprehensive, bias-free roadmap.' },
            ].map((pillar, i) => (
                <section key={i} className="container-edge py-16" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    <div className="relative">
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '96px', color: 'var(--bg-tertiary)', position: 'absolute', top: '-20px', left: 0, lineHeight: 1 }}>
                            {pillar.num}
                        </span>
                        <div className="relative z-10 pt-16" style={{ maxWidth: '600px' }}>
                            <span className="t6-mono-label mb-4 block" style={{ color: 'var(--accent-yellow)' }}>{pillar.label}</span>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '36px', color: 'var(--fg-primary)', marginBottom: '16px' }}>
                                {pillar.title}
                            </h2>
                            <p className="t5-body" style={{ color: 'var(--fg-secondary)' }}>{pillar.desc}</p>
                        </div>
                    </div>
                </section>
            ))}

            {/* ─── CTA ─── */}
            <section className="py-20 text-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(32px, 4vw, 48px)', color: 'var(--fg-primary)', marginBottom: '24px' }}>
                    READY TO TRY IT?
                </h2>
                <Link to="/" className="btn-primary no-underline inline-block" style={{ padding: '18px 48px', fontSize: '15px' }}>
                    ANALYZE YOUR FIRST REEL →
                </Link>
            </section>

            <Footer />
        </div>
    )
}
