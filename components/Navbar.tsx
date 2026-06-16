'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar({ active = '' }: { active?: string }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="container nav-inner">
        <Link href="/" className="logo" aria-label="Crelix AI home">
          <img src="/assets/crelix-logo.png" alt="Crelix" />
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <Link href="/#how" className={active === 'how' ? 'active' : ''}>How it works</Link>
          <Link href="/studio" className={active === 'studio' ? 'active' : ''}>Studio</Link>
          <Link href="/gallery" className={active === 'gallery' ? 'active' : ''}>Gallery</Link>
          <Link href="/showcase" className={active === 'showcase' ? 'active' : ''}>Showcase</Link>
          <Link href="/pricing" className={active === 'pricing' ? 'active' : ''}>Pricing</Link>
          <Link href="/about" className={active === 'about' ? 'active' : ''}>About</Link>
        </nav>
        <div className="nav-cta">
          <Link href="/login" className="btn btn-ghost btn-sm">Sign in</Link>
          <Link href="/studio" className="btn btn-primary btn-sm">
            Start free <i data-lucide="arrow-right"></i>
          </Link>
        </div>
      </div>
    </header>
  )
}
