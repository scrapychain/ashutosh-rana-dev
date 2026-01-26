import React from 'react'

export default function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 border border-emerald-400/40 bg-emerald-400/5 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs tracking-wider sm:tracking-widest text-emerald-200 shadow-[0_0_18px_rgba(16,185,129,0.12)]">
      {children}
    </span>
  )
}
