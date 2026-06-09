import Button from './Button'
import { socials } from '@/data/siteData'

export default function ManifestoCTA({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="py-10">
      <div className="relative overflow-hidden border border-emerald-400/25 bg-black/55 p-10 shadow-[0_0_55px_rgba(16,185,129,0.12)]">
        <div
          aria-hidden
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, rgba(16,185,129,0.15) 0px, rgba(16,185,129,0.15) 2px, rgba(0,0,0,0) 10px, rgba(0,0,0,0) 18px)',
          }}
        />
        <div className="relative">
          <div className="text-4xl md:text-5xl tracking-[0.22em] text-emerald-200">
            MASTER RUST. BUILD BLOCKCHAIN.
          </div>
          <p className="mt-4 max-w-3xl text-emerald-100/75">
            I&apos;m learning both simultaneously by building ScrapyChain, a production-ready blockchain library from scratch.
            Every Rust concept finds a home. Every blockchain feature teaches systems programming.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={socials.x.href}>Follow the Journey</Button>
            <Button variant="outline" onClick={onOpen}>Read Manifesto</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
