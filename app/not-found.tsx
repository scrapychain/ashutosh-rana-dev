import Link from 'next/link'
import GridBackground from '@/components/GridBackground'
import NoiseOverlay from '@/components/NoiseOverlay'
import Scanlines from '@/components/Scanlines'

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-black text-emerald-100">
      <GridBackground />
      <NoiseOverlay />
      <Scanlines />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl border border-emerald-500/30 bg-black/60 p-8 shadow-[0_0_30px_rgba(16,185,129,0.12)] md:p-12">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-emerald-500/25 pb-4 font-mono">
            <span aria-hidden className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-sm tracking-widest text-emerald-300/90">404 / NOT_FOUND</span>
          </div>

          <h1 className="mt-8 text-center font-mono text-4xl font-bold tracking-[0.25em] text-emerald-300 md:text-6xl">
            [ NO SIGNAL ]
          </h1>

          <div className="mt-6 space-y-2 text-center font-mono text-emerald-200/75">
            <p>&gt; The page you requested isn&apos;t on this terminal.</p>
            <p>&gt; It may have been moved, archived, or mistyped.</p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4 font-mono">
            <Link
              href="/#home"
              className="border border-emerald-500/50 bg-emerald-950/30 px-6 py-2.5 text-sm tracking-widest text-emerald-300 transition-colors hover:border-emerald-400 hover:bg-emerald-900/30"
            >
              &gt; RETURN HOME
            </Link>
            <Link
              href="/#bytes"
              className="border border-emerald-500/50 bg-emerald-950/30 px-6 py-2.5 text-sm tracking-widest text-emerald-300 transition-colors hover:border-emerald-400 hover:bg-emerald-900/30"
            >
              &gt; OPEN THE FEED
            </Link>
          </div>

          <div className="mt-10 border-t border-emerald-500/20 pt-4 text-center font-mono text-xs italic tracking-wide text-emerald-500/60">
            TIP: handle errors, don&apos;t ignore them.
          </div>
        </div>
      </div>
    </div>
  )
}
