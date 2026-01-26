'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Route } from '@/app/HomeClient'

export default function Nav({
  route,
  setRoute,
}: {
  route: Route
  setRoute: (r: Route) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  
  const active = (key: 'home' | 'roadmap' | 'log' | 'skills') =>
    typeof route === 'string' && route === key

  const handleNavClick = (r: Route) => {
    setRoute(r)
    setIsOpen(false)
  }

  return (
    <div className="sticky top-0 z-20 border-b border-emerald-400/15 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button 
          onClick={() => setRoute('home')}
          className="flex items-center gap-3 text-emerald-200/80 hover:text-emerald-200 transition"
        >
          <span className="text-emerald-200">&gt;</span>
          <span className="tracking-widest">ashutosh@dev:~$</span>
          <span className="ml-2 inline-block h-4 w-2 bg-emerald-300/80" />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3 text-sm tracking-widest">
          <NavLink label="BUILD" isActive={active('home')} onClick={() => handleNavClick('home')} />
          <NavLink label="ROADMAP" isActive={active('roadmap')} onClick={() => handleNavClick('roadmap')} />
          <NavLink label="LOG" isActive={active('log')} onClick={() => handleNavClick('log')} />
          <NavLink label="SKILLS" isActive={active('skills')} onClick={() => handleNavClick('skills')} />
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1 p-2"
          aria-label="Toggle menu"
        >
          <span className={cn("block h-0.5 w-6 bg-emerald-300 transition-transform", isOpen && "rotate-45 translate-y-1.5")} />
          <span className={cn("block h-0.5 w-6 bg-emerald-300 transition-opacity", isOpen && "opacity-0")} />
          <span className={cn("block h-0.5 w-6 bg-emerald-300 transition-transform", isOpen && "-rotate-45 -translate-y-1.5")} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-emerald-400/15 bg-black/95">
          <div className="flex flex-col px-6 py-4 gap-3 text-sm tracking-widest">
            <NavLink label="BUILD" isActive={active('home')} onClick={() => handleNavClick('home')} />
            <NavLink label="ROADMAP" isActive={active('roadmap')} onClick={() => handleNavClick('roadmap')} />
            <NavLink label="LOG" isActive={active('log')} onClick={() => handleNavClick('log')} />
            <NavLink label="SKILLS" isActive={active('skills')} onClick={() => handleNavClick('skills')} />
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
      className={cn(
        'px-2 py-1 text-emerald-200/70 transition hover:text-emerald-100',
        isActive && 'text-emerald-100 underline underline-offset-8'
      )}
    >
      [{label}]
    </button>
  )
}
