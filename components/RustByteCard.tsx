'use client'

import { useState } from 'react'
import RustCode from './RustCode'
import type { RustByte } from '@/data/bytes'

export default function RustByteCard({ byte }: { byte: RustByte }) {
  const [open, setOpen] = useState(false)
  const regionId = `byte-code-${byte.id}`

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-emerald-500/25 bg-emerald-500/[0.04] shadow-[0_0_35px_rgba(16,185,129,0.07)] transition hover:border-emerald-400/45 hover:shadow-[0_0_50px_rgba(16,185,129,0.12)]">
      {/* Terminal title bar — toggles the code */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={regionId}
        className="flex items-center gap-3 border-b border-emerald-500/20 bg-black/40 px-4 py-2.5 text-left transition hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-300/40"
      >
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </span>
        <span className="truncate font-mono text-xs tracking-wide text-emerald-200/70">
          {byte.file}
        </span>
        <span className="ml-auto flex shrink-0 items-center gap-1.5 font-mono text-[10px] tracking-widest text-emerald-300/70">
          <span aria-hidden>{open ? '▾' : '▸'}</span>
          {open ? 'HIDE CODE' : 'VIEW CODE'}
        </span>
      </button>

      {/* Always-visible summary */}
      <div className="flex flex-col gap-2 px-4 py-4">
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

      {/* Collapsible code */}
      {open && (
        <div id={regionId} className="border-t border-emerald-500/15 bg-black/70">
          <RustCode code={byte.code} />
        </div>
      )}
    </article>
  )
}
