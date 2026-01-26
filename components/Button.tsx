import React from 'react'
import { cn } from '@/lib/utils'

export default function Button({
  children,
  variant = 'solid',
  href,
  onClick,
}: {
  children: React.ReactNode
  variant?: 'solid' | 'outline'
  href?: string
  onClick?: () => void
}) {
  const base =
    'inline-flex items-center justify-center gap-2 px-4 py-3 text-sm tracking-widest transition focus:outline-none focus:ring-2 focus:ring-emerald-300/40'
  const solid =
    'bg-emerald-400 text-black hover:bg-emerald-300 shadow-[0_0_22px_rgba(16,185,129,0.18)]'
  const outline =
    'border border-emerald-400/40 text-emerald-200 hover:border-emerald-300 hover:text-emerald-100'

  const cls = cn(base, variant === 'solid' ? solid : outline)

  if (href) {
    return (
      <a className={cls} href={href} target="_blank" rel="noreferrer">
        {children}
        <span aria-hidden className="opacity-70">
          ↗
        </span>
      </a>
    )
  }

  return (
    <button className={cls} onClick={onClick}>
      {children}
    </button>
  )
}
