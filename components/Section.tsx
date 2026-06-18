import React from 'react'

export default function Section({
  title,
  subtitle,
  annotation,
  children,
  id,
}: {
  title: string
  subtitle?: string
  /** Optional dim readout shown on the right, e.g. "// the proof of work". */
  annotation?: string
  children: React.ReactNode
  id?: string
}) {
  const heading = title.toUpperCase().replace(/ /g, '_')
  return (
    <section id={id} className="py-10">
      <div className="mb-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="flex items-baseline gap-3 text-2xl tracking-[0.18em] text-emerald-100">
            <span className="text-emerald-400">&gt;</span>
            {heading}
          </h2>
          {annotation && (
            <span className="hidden shrink-0 text-sm tracking-widest text-emerald-300/45 sm:block">
              {annotation}
            </span>
          )}
        </div>
        {subtitle && <p className="mt-3 max-w-3xl text-sm text-emerald-200/70">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}
