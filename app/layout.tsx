import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Crelix AI — One-click ad creatives for any brand',
  description: 'Paste a URL. Pick a platform. Get scroll-stopping ad creatives in seconds.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
