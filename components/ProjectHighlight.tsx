import Card from './Card'
import Button from './Button'
import { cn } from '@/lib/utils'
import { project } from '@/data/siteData'

export default function ProjectHighlight() {
  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-emerald-200/80 tracking-widest">↳ {project.name.toUpperCase()}</div>
          <div className="mt-2 text-xl tracking-widest text-emerald-200">{project.tagline}</div>
        </div>

        <div className="inline-flex items-center gap-2 border border-emerald-300/50 bg-emerald-400/10 px-3 py-2 text-xs tracking-widest text-emerald-200 shadow-[0_0_25px_rgba(16,185,129,0.18)]">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
          {project.badge}
        </div>
      </div>

      <p className="mt-5 max-w-4xl text-emerald-100/75 leading-relaxed">{project.description}</p>

      <div className="mt-6 border border-emerald-400/20 bg-black/40 p-5">
        <div className="mb-4 text-sm tracking-widest text-emerald-200/70">CORE FEATURES BEING BUILT:</div>
        <div className="grid gap-3 md:grid-cols-2">
          {project.features.map((f) => (
            <div key={f.label} className="flex items-center gap-3 text-emerald-100/80">
              <span aria-hidden className={cn(
                'inline-flex h-6 w-6 items-center justify-center border',
                f.status === 'done' && 'border-emerald-300/60 bg-emerald-400/10 text-emerald-200',
                f.status === 'doing' && 'border-emerald-300/50 bg-emerald-400/5 text-emerald-200/80',
                f.status === 'todo' && 'border-emerald-400/20 bg-black/30 text-emerald-200/50'
              )}>
                {f.status === 'done' ? '✓' : '○'}
              </span>
              <span className={cn(
                f.status === 'done' && 'text-emerald-100',
                f.status === 'doing' && 'text-emerald-100/85',
                f.status === 'todo' && 'text-emerald-100/60'
              )}>
                {f.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="border border-emerald-400/25 bg-emerald-400/5 px-2 py-1 text-xs tracking-widest text-emerald-200/80">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button href={project.ctas[0].href}>{project.ctas[0].label}</Button>
        <Button variant="outline" href={project.ctas[1].href}>{project.ctas[1].label}</Button>
      </div>
    </Card>
  )
}
