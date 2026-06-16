import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo" aria-label="Crelix AI home">
              <img src="/assets/crelix-logo.png" alt="Crelix" />
            </Link>
            <p>One-click ad creatives for performance teams. Built for marketers who don&apos;t have time to chase a designer.</p>
          </div>
          <div className="footer-col">
            <h5>Product</h5>
            <ul>
              <li><Link href="/studio">Studio</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/showcase">Showcase</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/#how">How it works</Link></li>
              <li><Link href="#">Changelog</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Resources</h5>
            <ul>
              <li><Link href="#">Ad size guide</Link></li>
              <li><Link href="#">Brand kit guide</Link></li>
              <li><Link href="#">API docs</Link></li>
              <li><Link href="#">Help center</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="#">Careers</Link></li>
              <li><Link href="#">Contact</Link></li>
              <li><Link href="#">Press kit</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Legal</h5>
            <ul>
              <li><Link href="#">Terms</Link></li>
              <li><Link href="#">Privacy</Link></li>
              <li><Link href="#">Cookies</Link></li>
              <li><Link href="#">DPA</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Crelix AI · crelix.ai · All rights reserved.</span>
          <div className="socials">
            <a href="#" aria-label="X / Twitter"><i data-lucide="twitter"></i></a>
            <a href="#" aria-label="LinkedIn"><i data-lucide="linkedin"></i></a>
            <a href="#" aria-label="Instagram"><i data-lucide="instagram"></i></a>
            <a href="#" aria-label="YouTube"><i data-lucide="youtube"></i></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
