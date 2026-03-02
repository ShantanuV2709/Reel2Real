import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="container-edge py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            style={{ borderTop: '1px solid var(--border-subtle)' }}>

            <div>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: 'var(--fg-primary)' }}>
                    REEL2REAL
                </span>
                <p className="t6-mono-label mt-2" style={{ color: 'var(--fg-tertiary)' }}>
                    © 2025 All rights reserved
                </p>
            </div>

            <div className="flex gap-6">
                <Link to="/" className="t6-mono-label no-underline" style={{ color: 'var(--fg-secondary)' }}>HOME</Link>
                <Link to="/about" className="t6-mono-label no-underline" style={{ color: 'var(--fg-secondary)' }}>ABOUT</Link>
                <Link to="/saved" className="t6-mono-label no-underline" style={{ color: 'var(--fg-secondary)' }}>SAVED</Link>
            </div>

            <p className="t6-mono-label" style={{ color: 'var(--fg-tertiary)', fontSize: '12px' }}>
                Built with Gemini, FastAPI, React
            </p>
        </footer>
    )
}
