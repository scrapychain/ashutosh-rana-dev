import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ashutosh Rana - Software Engineer',
  description:
    'Rust Bytes and a Corporate Log: bite-sized Rust from the handbook, plus pragmatic lessons from 4 years of corporate software engineering.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
