import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
    const location = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)

    const navLinks = [
        { to: '/#how-it-works', label: 'HOW IT WORKS' },
        { to: '/about', label: 'ABOUT' },
        { to: '/saved', label: 'SAVED' },
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between container-edge"
            style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-subtle)' }}>

            {/* Wordmark */}
            <Link to="/" className="flex items-center gap-0 no-underline">
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'var(--fg-primary)' }}>
                    REEL2REAL
                </span>
                <span className="cursor-blink" style={{ color: 'var(--accent-yellow)', fontSize: '18px', fontWeight: 700 }}>▌</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
                {navLinks.map(link => (
                    <Link
                        key={link.label}
                        to={link.to}
                        className="t6-mono-label no-underline transition-colors"
                        style={{
                            color: location.pathname === link.to ? 'var(--accent-yellow)' : 'var(--fg-secondary)',
                        }}
                        onMouseEnter={e => e.target.style.color = 'var(--fg-primary)'}
                        onMouseLeave={e => e.target.style.color = location.pathname === link.to ? 'var(--accent-yellow)' : 'var(--fg-secondary)'}
                    >
                        {link.label}
                    </Link>
                ))}
                <Link to="/" className="btn-primary no-underline">TRY IT FREE</Link>
            </div>

            {/* Mobile Hamburger */}
            <button
                className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-2"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                <span className="block w-6 h-0.5" style={{
                    backgroundColor: 'var(--fg-primary)',
                    transform: menuOpen ? 'rotate(45deg) translateY(4px)' : 'none',
                    transition: 'transform 150ms'
                }} />
                <span className="block w-6 h-0.5" style={{
                    backgroundColor: 'var(--fg-primary)',
                    opacity: menuOpen ? 0 : 1,
                    transition: 'opacity 80ms'
                }} />
                <span className="block w-6 h-0.5" style={{
                    backgroundColor: 'var(--fg-primary)',
                    transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
                    transition: 'transform 150ms'
                }} />
            </button>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <div className="fixed inset-0 top-16 z-40 flex flex-col items-center justify-start pt-20 gap-8"
                    style={{ backgroundColor: 'var(--bg-primary)' }}>
                    {navLinks.map(link => (
                        <Link
                            key={link.label}
                            to={link.to}
                            className="t4-subheading no-underline"
                            style={{ color: 'var(--fg-primary)' }}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link to="/" className="btn-primary no-underline" onClick={() => setMenuOpen(false)}>
                        TRY IT FREE
                    </Link>
                </div>
            )}
        </nav>
    )
}
