import React from 'react'

export default function Section({
  title,
  subtitle,
  children,
  id,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  id?: string
}) {
  return (
    <section id={id} className="py-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-200/80">▣</span>
            <h2 className="text-2xl tracking-[0.2em] text-emerald-200">
              [{title.toUpperCase()}]
            </h2>
          </div>
          {subtitle && (
            <p className="mt-2 max-w-3xl text-sm text-emerald-200/70">{subtitle}</p>
          )}
        </div>
      </div>
      {children}
    </section>
  )
}
