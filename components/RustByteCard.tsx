import RustCode from './RustCode'
import type { RustByte } from '@/data/bytes'

export default function RustByteCard({ byte }: { byte: RustByte }) {
  return (
    <article className="group flex min-w-0 flex-col border border-emerald-500/25 bg-emerald-500/[0.04] shadow-[0_0_35px_rgba(16,185,129,0.07)] transition hover:border-emerald-400/45 hover:shadow-[0_0_50px_rgba(16,185,129,0.12)]">
      {/* Terminal title bar */}
      <div className="flex items-center gap-3 border-b border-emerald-500/20 bg-black/40 px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </span>
        <span className="truncate font-mono text-xs tracking-wide text-emerald-200/70">
          {byte.file}
        </span>
        <span className="ml-auto select-none font-mono text-[10px] tracking-widest text-emerald-300/70">
          RUST
        </span>
      </div>

      {/* Code block */}
      <div className="bg-black/70">
        <RustCode code={byte.code} />
      </div>

      {/* Meta + takeaway */}
      <div className="flex flex-1 flex-col gap-3 border-t border-emerald-500/15 px-4 py-4">
        <div className="text-[11px] tracking-widest text-emerald-300/70">
          &gt; {byte.concept.toUpperCase()}
        </div>
        <h3 className="text-lg leading-snug tracking-wide text-emerald-200 transition group-hover:text-emerald-100">
          {byte.title}
        </h3>
        <p className="text-sm leading-relaxed text-emerald-100/80">
          <span className="text-emerald-300/80">// </span>
          {byte.takeaway}
        </p>
        {byte.tags.length > 0 && (
          <ul className="mt-1 flex flex-wrap gap-2">
            {byte.tags.map((t) => (
              <li
                key={t}
                className="border border-emerald-500/25 bg-emerald-500/5 px-2 py-0.5 text-[11px] tracking-widest text-emerald-200/80"
              >
                #{t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
