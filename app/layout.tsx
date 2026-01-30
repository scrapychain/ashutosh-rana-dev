import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ashutosh Rana - Core Blockchain Developer',
  description: 'Building ScrapyChain - Learning Rust and blockchain from first principles',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  openGraph: {
    title: 'Ashutosh Rana - Core Blockchain Developer',
    description: 'Building ScrapyChain - Learning Rust and blockchain from first principles',
    url: 'https://scrapychain.github.io/ashutosh-rana-dev',
    siteName: 'Ashutosh Rana - Personal Portfolio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashutosh Rana - Core Blockchain Developer',
    description: 'Building ScrapyChain - Learning Rust and blockchain from first principles',
    creator: '@scrapychain',
  },
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
