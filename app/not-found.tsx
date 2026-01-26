'use client'

import Link from 'next/link'
import GridBackground from '@/components/GridBackground'
import NoiseOverlay from '@/components/NoiseOverlay'
import Scanlines from '@/components/Scanlines'

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-emerald-200">
      <GridBackground />
      <NoiseOverlay />
      <Scanlines />
      
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl">
          {/* Main Container with glowing border */}
          <div className="relative border-2 border-emerald-500/40 bg-black/60 p-8 md:p-12 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-emerald-400/80 -translate-x-[2px] -translate-y-[2px]"></div>
            <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-emerald-400/80 translate-x-[2px] -translate-y-[2px]"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-emerald-400/80 -translate-x-[2px] translate-y-[2px]"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-emerald-400/80 translate-x-[2px] translate-y-[2px]"></div>

            <div className="space-y-8">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-emerald-500/30 pb-4 font-mono">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse"></span>
                <span className="text-sm tracking-wider text-emerald-300/90">
                  404 / BLOCK_NOT_FOUND
                </span>
              </div>

              {/* Main Title */}
              <div className="text-center">
                <h1 className="text-5xl md:text-7xl font-bold tracking-[0.3em] text-emerald-300 font-mono">
                  [ CHAIN FORKED ]
                </h1>
              </div>

              {/* Description */}
              <div className="text-center space-y-2 font-mono text-emerald-200/80">
                <p>The block you&apos;re looking for doesn&apos;t exist in this chain.</p>
                <p>It may have been orphaned, never mined, or just typed incorrectly.</p>
              </div>

              {/* Main Content Grid */}
              <div className="grid md:grid-cols-[1fr_300px] gap-8 pt-4">
                {/* Left: Chain Trace */}
                <div className="space-y-4">
                  <div className="font-mono">
                    <div className="text-emerald-400 mb-4 text-sm tracking-wider">
                      &gt; CHAIN_TRACE
                    </div>
                    
                    {/* Chain visualization */}
                    <div className="mb-6 flex items-center gap-2 text-emerald-300/90 overflow-x-auto pb-2">
                      <span className="text-xs font-bold">GENESIS</span>
                      <span>--</span>
                      <span className="border border-emerald-400 px-1.5 py-0.5 text-xs">□</span>
                      <span>--</span>
                      <span className="border border-emerald-400 px-1.5 py-0.5 text-xs">□</span>
                      <span>--</span>
                      <span className="border border-emerald-400 px-1.5 py-0.5 text-xs">□</span>
                      <span>---</span>
                      <span className="text-red-400 font-bold">X</span>
                    </div>

                    {/* Arrow pointing up */}
                    <div className="ml-[280px] mb-2 text-emerald-400/70 text-xs hidden md:block">
                      ↑ requested block here
                    </div>

                    {/* Reasons */}
                    <ul className="space-y-2 text-sm text-emerald-200/80 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>Block height out of range</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>Slug / URL typo</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>Post was refactored into another log entry</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right: Rust Mascot */}
                <div className="border border-emerald-500/30 p-6 bg-black/40 flex flex-col items-center justify-center space-y-4">
                  {/* Rust Logo Text */}
                  <div className="text-emerald-400 font-mono text-6xl font-bold tracking-wider">
                    🦀
                  </div>
                  
                  <div className="font-mono text-xs text-emerald-200/70 text-center leading-relaxed">
                    <p className="font-bold text-emerald-300 mb-1">Rust runtime note:</p>
                    <p>handle errors,</p>
                    <p>don&apos;t ignore them.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-4 pt-4 font-mono">
                <Link 
                  href="/"
                  className="border border-emerald-500/50 bg-emerald-950/30 px-6 py-2.5 text-sm tracking-wider text-emerald-300 hover:bg-emerald-900/30 hover:border-emerald-400 transition-colors"
                >
                  &gt; RETURN TO GENESIS BLOCK
                </Link>
                <Link 
                  href="/#log"
                  className="border border-emerald-500/50 bg-emerald-950/30 px-6 py-2.5 text-sm tracking-wider text-emerald-300 hover:bg-emerald-900/30 hover:border-emerald-400 transition-colors"
                >
                  &gt; OPEN BUILD LOG
                </Link>
              </div>

              {/* Footer Tip */}
              <div className="pt-4 border-t border-emerald-500/20 text-center font-mono text-xs text-emerald-500/60 italic">
                TIP: every detour is still data for the learning curve.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
