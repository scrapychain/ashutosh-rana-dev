import { cn } from '@/lib/utils'
import type { Project } from '@/data/projects'

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const live = !!project.link.href

  return (
    <article className="group flex flex-col gap-4 border border-emerald-500/25 bg-emerald-500/5 p-5 shadow-[0_0_35px_rgba(16,185,129,0.06)] transition hover:border-emerald-400/45 hover:shadow-[0_0_50px_rgba(16,185,129,0.12)]">
      <header className="flex items-center justify-between gap-3 text-[11px] tracking-widest text-emerald-300/70">
        <span>&gt; PROJECT_{String(index + 1).padStart(2, '0')}</span>
        <span className="inline-flex items-center gap-2 border border-emerald-500/30 bg-black/40 px-2 py-0.5 text-[10px] tracking-widest text-emerald-200/80">
          <span
            aria-hidden
            className={cn(
              'h-1.5 w-1.5 rounded-full',
              live ? 'bg-emerald-400' : 'animate-pulse bg-amber-300/80'
            )}
          />
          {project.status}
        </span>
      </header>

      <div>
        <h3 className="text-xl tracking-wide text-emerald-200 transition group-hover:text-emerald-100">
          {project.name}
          {project.abbr && (
            <span className="ml-2 text-sm tracking-widest text-emerald-300/60">({project.abbr})</span>
          )}
        </h3>
        <p className="mt-1 text-sm text-emerald-300/80">{project.tagline}</p>
      </div>

      <div className="space-y-2 text-sm leading-relaxed text-emerald-100/80">
        {project.description.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {project.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li
              key={t}
              className="border border-emerald-500/25 bg-emerald-500/5 px-2 py-0.5 text-[11px] tracking-widest text-emerald-200/80"
            >
              #{t}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-2">
        {project.link.href ? (
          <a
            href={project.link.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm tracking-wide text-emerald-300 transition hover:text-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50"
          >
            <span aria-hidden>→</span>
            {project.link.label}
            <span aria-hidden className="opacity-70">↗</span>
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 text-sm tracking-wide text-emerald-200/45">
            <span aria-hidden>→</span>
            {project.link.label}
          </span>
        )}
      </div>
    </article>
  )
}
