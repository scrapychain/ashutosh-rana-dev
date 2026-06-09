import { profile } from '@/data/siteData'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-12 border-t border-emerald-400/15 pt-8 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 text-emerald-200/60">
        <div className="tracking-widest">&gt; small, honest signal</div>
        <div className="tracking-widest">RUST_BYTES // CORPORATE_LOG // PROJECTS</div>
      </div>
      <div className="mt-4 text-center tracking-widest text-emerald-200/50">
        © {year} {profile.fullName.toUpperCase()} · {profile.role.toUpperCase()} · LEARNING IN PUBLIC
      </div>
    </footer>
  )
}
