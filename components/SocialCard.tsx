type SocialKind = 'x' | 'github'

const META: Record<SocialKind, { header: string; cta: string; path: string }> = {
  x: {
    header: 'X',
    cta: 'FOLLOW ON X',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  github: {
    header: 'GITHUB',
    cta: 'VIEW ON GITHUB',
    path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  },
}

export default function SocialCard({
  kind,
  handle,
  sub,
  href,
}: {
  kind: SocialKind
  handle: string
  sub: string
  href: string
}) {
  const meta = META[kind]

  return (
    <aside className="w-full rounded-lg border border-emerald-500/25 bg-emerald-500/5 p-5 shadow-[0_0_35px_rgba(16,185,129,0.07)]">
      <div className="text-[11px] tracking-[0.25em] text-emerald-300/80">&gt; {meta.header}</div>

      <div className="mt-5 flex items-center gap-3">
        <span
          aria-hidden
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-emerald-400/30 bg-black/50 text-emerald-200"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d={meta.path} />
          </svg>
        </span>
        <div className="min-w-0">
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="block truncate text-base tracking-wide text-emerald-200 transition hover:text-emerald-100"
          >
            {handle}
          </a>
          <div className="text-xs text-emerald-200/60">{sub}</div>
        </div>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md border border-emerald-400/40 px-4 py-2.5 text-sm tracking-widest text-emerald-200 transition hover:border-emerald-300 hover:bg-emerald-500/10 hover:text-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50"
      >
        {meta.cta}
        <span aria-hidden className="opacity-70">↗</span>
      </a>
    </aside>
  )
}
