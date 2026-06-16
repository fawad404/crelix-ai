'use client'
import { useEffect } from 'react'
import Script from 'next/script'

export default function LucideInit() {
  return (
    <Script
      src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        if ((window as any).lucide) (window as any).lucide.createIcons()
      }}
    />
  )
}
