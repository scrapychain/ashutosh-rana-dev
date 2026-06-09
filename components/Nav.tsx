'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { NavKey } from '@/app/HomeClient'

const LINKS: { key: NavKey; label: string }[] = [
  { key: 'bytes', label: 'RUST BYTES' },
  { key: 'log', label: 'CORP LOG' },
  { key: 'projects', label: 'PROJECTS' },
  { key: 'about', label: 'ABOUT' },
]

export default function Nav({
  active,
  onHome,
  onSelect,
}: {
  active: NavKey
  onHome: () => void
  onSelect: (k: NavKey) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handle = (k: NavKey) => {
    onSelect(k)
    setIsOpen(false)
  }

  return (
    <div className="sticky top-0 z-20 border-b border-emerald-400/15 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => {
            onHome()
            setIsOpen(false)
          }}
          className="flex items-center gap-3 text-emerald-200/80 transition hover:text-emerald-200"
        >
          <span className="text-emerald-200">&gt;</span>
          <span className="tracking-widest">ashutosh@dev:~$</span>
          <span aria-hidden className="ml-2 inline-block h-4 w-2 animate-pulse bg-emerald-300/80" />
        </button>

        {/* Desktop */}
        <div className="hidden items-center gap-3 text-sm tracking-widest md:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.key}
              label={l.label}
              isActive={active === l.key}
              onClick={() => handle(l.key)}
            />
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1 p-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className={cn('block h-0.5 w-6 bg-emerald-300 transition-transform', isOpen && 'translate-y-1.5 rotate-45')} />
          <span className={cn('block h-0.5 w-6 bg-emerald-300 transition-opacity', isOpen && 'opacity-0')} />
          <span className={cn('block h-0.5 w-6 bg-emerald-300 transition-transform', isOpen && '-translate-y-1.5 -rotate-45')} />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t border-emerald-400/15 bg-black/95 md:hidden">
          <div className="flex flex-col gap-3 px-6 py-4 text-sm tracking-widest">
            {LINKS.map((l) => (
              <NavLink
                key={l.key}
                label={l.label}
                isActive={active === l.key}
                onClick={() => handle(l.key)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function NavLink({
  label,
  isActive,
  onClick,
}: {
  label: string
  isActive?: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'px-2 py-1 text-left text-emerald-200/70 transition hover:text-emerald-100',
        isActive && 'text-emerald-100 underline underline-offset-8'
      )}
    >
      [{label}]
    </button>
  )
}
