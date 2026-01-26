import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ashutosh Rana - Core Blockchain Developer',
  description: 'Building ScrapyChain - Learning Rust and blockchain from first principles',
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
