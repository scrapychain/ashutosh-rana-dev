import Pill from './Pill'
import Button from './Button'
import GlitchText from './GlitchText'
import SocialCard from './SocialCard'
import { profile, socials } from '@/data/siteData'
import type { FeedFilter } from './Feed'

export default function Hero({
  onJump,
  onProjects,
}: {
  onJump: (f: FeedFilter) => void
  onProjects: () => void
}) {
  return (
    <section className="py-10 md:py-14">
      <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center md:mb-8">
        <Pill>
          <span aria-hidden>{'>'}</span>
          {profile.role.toUpperCase()} · {profile.yearsExperience}Y CORPORATE
        </Pill>
        <div className="text-xs tracking-widest text-emerald-200/60">&gt; INITIALIZING...</div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center lg:gap-14">
        <div className="space-y-6">
          <h1 className="break-words text-3xl tracking-[0.12em] text-emerald-200 sm:text-4xl sm:tracking-[0.15em] md:text-5xl md:tracking-[0.18em] lg:text-6xl">
            [<GlitchText text={profile.name} />]
          </h1>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-xs tracking-widest text-emerald-200/70 sm:text-sm">&gt; STATUS:</span>
            <Pill>{profile.status}</Pill>
          </div>

          <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-emerald-100/80 sm:text-base">
            {profile.intro.map((line, i) => (
              <p key={i}>
                <span className="select-none text-emerald-300/70">&gt; </span>
                {line}
              </p>
            ))}
          </div>

          {/* Two-stream readout */}
          <dl className="grid max-w-2xl gap-3 pt-1 sm:grid-cols-2">
            <div className="border border-emerald-500/25 bg-emerald-500/5 px-4 py-3">
              <dt className="text-[11px] tracking-[0.25em] text-emerald-300/80">RUST_BYTES</dt>
              <dd className="mt-1 text-sm text-emerald-100/75">
                Bite-sized snippets &amp; concepts from the Rust handbook.
              </dd>
            </div>
            <div className="border border-emerald-500/25 bg-emerald-500/5 px-4 py-3">
              <dt className="text-[11px] tracking-[0.25em] text-emerald-300/80">CORPORATE_LOG</dt>
              <dd className="mt-1 text-sm text-emerald-100/75">
                Pragmatic lessons from {profile.yearsExperience} years shipping in production.
              </dd>
            </div>
          </dl>

          <div className="flex flex-col flex-wrap gap-3 pt-2 sm:flex-row">
            <Button onClick={() => onJump('bytes')}>Read Rust Bytes</Button>
            <Button variant="outline" onClick={() => onJump('log')}>
              Open Corporate Log
            </Button>
            <Button variant="outline" onClick={onProjects}>
              View Projects
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <SocialCard kind="x" handle={socials.x.handle} sub={socials.x.sub} href={socials.x.href} />
          <SocialCard
            kind="github"
            handle={socials.github.handle}
            sub={socials.github.sub}
            href={socials.github.href}
          />
        </div>
      </div>
    </section>
  )
}
