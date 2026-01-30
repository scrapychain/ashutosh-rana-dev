import { getAllPosts } from '@/lib/posts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Build Log - Ashutosh Rana',
  description: 'Daily learning log documenting my journey building ScrapyChain and learning Rust',
  openGraph: {
    title: 'Build Log - Ashutosh Rana',
    description: 'Daily learning log documenting my journey building ScrapyChain and learning Rust',
    url: 'https://scrapychain.github.io/ashutosh-rana-dev/log',
    siteName: 'Ashutosh Rana - Personal Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build Log - Ashutosh Rana',
    description: 'Daily learning log documenting my journey building ScrapyChain and learning Rust',
    creator: '@scrapychain',
  },
}

export default function LogPage() {
  // Redirect to the main page with the hash
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="0; url=/#log" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.href = '/#log';`,
          }}
        />
      </head>
      <body>
        <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
          <h1>Build Log</h1>
          <p>
            <a href="/#log">Click here if you are not redirected automatically.</a>
          </p>
        </div>
      </body>
    </html>
  )
}
