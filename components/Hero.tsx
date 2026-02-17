import { Route } from '@/app/HomeClient'
import Pill from './Pill'
import Button from './Button'
import GlitchText from './GlitchText'
import { socials } from '@/data/siteData'

export default function Hero({ setRoute }: { setRoute: (r: Route) => void }) {
  return (
    <section className="py-8 md:py-12">
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <Pill>
          <span aria-hidden>🦀</span>
          CORE BLOCKCHAIN DEVELOPER
        </Pill>
        <div className="text-xs tracking-widest text-emerald-200/60">&gt; INITIALIZING...</div>
      </div>

      <div className="space-y-6">
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.12em] sm:tracking-[0.15em] md:tracking-[0.18em] text-emerald-200 break-words">
          [<GlitchText text="ASHUTOSH" />]
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-xs sm:text-sm tracking-widest text-emerald-200/70">&gt; STATUS:</span>
          <Pill>BUILDING FROM ZERO</Pill>
        </div>

        <div className="max-w-3xl space-y-3 text-sm sm:text-base text-emerald-100/75 leading-relaxed">
          <p>&gt; Currently mastering Rust and blockchain by building <span className="text-emerald-200">ScrapyChain</span> ,  a blockchain library from scratch.</p>
          <p>&gt; No tutorials. No hand-holding. Just Rust, cryptography, and breaking things until they work.</p>
          <p>&gt; Every feature I implement teaches both Rust internals and blockchain fundamentals simultaneously.</p>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
          <Button onClick={() => setRoute('log')}>Open Build Log</Button>
          <Button variant="outline" onClick={() => setRoute('manifesto')}>Read Manifesto</Button>
        </div>
      </div>
    </section>
  )
}
