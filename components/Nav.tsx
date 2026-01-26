import { cn } from '@/lib/utils'
import { Route } from '@/app/HomeClient'

export default function Nav({
  route,
  setRoute,
}: {
  route: Route
  setRoute: (r: Route) => void
}) {
  const active = (key: 'home' | 'roadmap' | 'log' | 'skills') =>
    typeof route === 'string' && route === key

  return (
    <div className="sticky top-0 z-20 border-b border-emerald-400/15 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3 text-emerald-200/80">
          <span className="text-emerald-200">&gt;</span>
          <span className="tracking-widest">ashutosh@dev:~$</span>
          <span className="ml-2 inline-block h-4 w-2 bg-emerald-300/80" />
        </div>

        <div className="flex items-center gap-3 text-sm tracking-widest">
          <NavLink label="BUILD" isActive={active('home')} onClick={() => setRoute('home')} />
          <NavLink label="ROADMAP" isActive={active('roadmap')} onClick={() => setRoute('roadmap')} />
          <NavLink label="LOG" isActive={active('log')} onClick={() => setRoute('log')} />
          <NavLink label="SKILLS" isActive={active('skills')} onClick={() => setRoute('skills')} />
        </div>
      </div>
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
