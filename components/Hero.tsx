import { Route } from '@/app/HomeClient'
import Pill from './Pill'
import Button from './Button'
import GlitchText from './GlitchText'
import { socials } from '@/data/siteData'

export default function Hero({ setRoute }: { setRoute: (r: Route) => void }) {
  return (
    <section className="py-12">
      <div className="mb-8 flex items-center justify-between">
        <Pill>
          <span aria-hidden>🦀</span>
          CORE BLOCKCHAIN DEVELOPER
        </Pill>
        <div className="text-xs tracking-widest text-emerald-200/60">&gt; INITIALIZING...</div>
      </div>

      <div className="space-y-6">
        <div className="text-5xl md:text-6xl tracking-[0.18em] text-emerald-200">
          [<GlitchText text="ASHUTOSH" />]
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm tracking-widest text-emerald-200/70">&gt; STATUS:</span>
          <Pill>BUILDING FROM ZERO</Pill>
        </div>

        <div className="max-w-3xl space-y-3 text-emerald-100/75 leading-relaxed">
          <p>&gt; Currently mastering Rust and blockchain by building <span className="text-emerald-200">ScrapyChain</span> ,  a toy blockchain from scratch.</p>
          <p>&gt; No tutorials. No hand-holding. Just Rust, cryptography, and breaking things until they work.</p>
          <p>&gt; Every feature I implement teaches both Rust internals and blockchain fundamentals simultaneously.</p>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button onClick={() => setRoute('log')}>Open Build Log</Button>
          <Button variant="outline" onClick={() => setRoute('manifesto')}>Read Manifesto</Button>
        </div>
      </div>
    </section>
  )
}
