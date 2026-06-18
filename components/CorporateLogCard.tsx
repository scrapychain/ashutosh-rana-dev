'use client'

import { useState } from 'react'
import type { CorporateLog } from '@/data/logs'

const PREVIEW_STEPS = 4

export default function CorporateLogCard({ log }: { log: CorporateLog }) {
  const [open, setOpen] = useState(false)
  const steps = log.steps ?? []
  const hasSteps = steps.length > 0
  const collapsible = steps.length > PREVIEW_STEPS
  const visible = open || !collapsible ? steps : steps.slice(0, PREVIEW_STEPS)
  const remaining = steps.length - PREVIEW_STEPS
  const regionId = `log-steps-${log.id}`

  return (
    <article className="group flex min-w-0 flex-col gap-4 rounded-lg border border-emerald-500/25 bg-emerald-500/5 p-5 shadow-[0_0_35px_rgba(16,185,129,0.06)] transition hover:border-emerald-400/45 hover:shadow-[0_0_50px_rgba(16,185,129,0.12)]">
      {/* Entry header */}
      <header className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] tracking-widest text-emerald-300/70">
        <span>&gt; LOG_ENTRY</span>
        <span aria-hidden className="text-emerald-500/40">//</span>
        <time dateTime={log.date} className="text-emerald-200/70">
          {log.date}
        </time>
        {hasSteps && (
          <>
            <span aria-hidden className="text-emerald-500/40">//</span>
            <span className="text-emerald-200/70">{steps.length} STEPS</span>
          </>
        )}
      </header>

      <h3 className="text-lg leading-snug tracking-wide text-emerald-200 transition group-hover:text-emerald-100">
        {log.title}
      </h3>

      {/* Body */}
      <div className="space-y-3 text-sm leading-relaxed text-emerald-100/85">
        {log.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* Steps: first few always visible, the rest behind the toggle */}
      {hasSteps && (
        <div className="space-y-3">
          <ol
            id={regionId}
            className="list-none space-y-2 border-l border-emerald-500/15 pl-4 text-sm leading-relaxed text-emerald-100/85"
          >
            {visible.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden className="select-none font-mono text-emerald-300/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          {collapsible && (
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={regionId}
              className="self-start rounded-md border border-emerald-500/25 px-3 py-1.5 font-mono text-[11px] tracking-widest text-emerald-300/80 transition hover:border-emerald-300/50 hover:text-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/40"
            >
              {open ? '[ COLLAPSE ]' : `[ EXPAND ${remaining} MORE STEPS ]`}
            </button>
          )}
        </div>
      )}

      {/* Lesson callout */}
      <div className="mt-auto rounded-md border-l-2 border-emerald-400/50 bg-emerald-500/[0.06] px-4 py-3">
        <div className="mb-1 text-[10px] tracking-[0.25em] text-emerald-300/80">LESSON</div>
        <p className="text-sm leading-relaxed text-emerald-100">{log.lesson}</p>
      </div>

      {log.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {log.tags.map((t) => (
            <li
              key={t}
              className="rounded border border-emerald-500/25 bg-emerald-500/5 px-2 py-0.5 text-[11px] tracking-widest text-emerald-200/80"
            >
              #{t}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
