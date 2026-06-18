import type { Project } from '@/data/projects'

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group flex min-w-0 flex-col gap-4 rounded-lg border border-emerald-500/25 bg-emerald-500/5 p-5 shadow-[0_0_35px_rgba(16,185,129,0.06)] transition hover:border-emerald-400/45 hover:shadow-[0_0_50px_rgba(16,185,129,0.12)]">
      {/* Index + status */}
      <header className="flex items-center justify-between gap-3">
        <span className="font-mono text-sm tracking-widest text-emerald-300/50">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="rounded border border-emerald-500/30 bg-black/40 px-2.5 py-1 text-[10px] tracking-widest text-emerald-200/80">
          {project.status}
        </span>
      </header>

      <div>
        <h3 className="font-mono text-xl tracking-wide text-emerald-100 transition group-hover:text-emerald-50">
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

      {/* Stack chips */}
      {project.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded bg-emerald-500/10 px-2 py-1 text-[11px] tracking-widest text-emerald-200/90"
            >
              {t}
            </li>
          ))}
        </ul>
      )}

      {/* Link */}
      <div className="mt-auto pt-1">
        {project.link.href ? (
          <a
            href={project.link.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs tracking-widest text-emerald-300 transition hover:text-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50"
          >
            VIEW PROJECT
            <span aria-hidden className="opacity-70">↗</span>
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 text-xs tracking-widest text-emerald-200/40">
            {project.link.label.toUpperCase()}
          </span>
        )}
      </div>
    </article>
  )
}
