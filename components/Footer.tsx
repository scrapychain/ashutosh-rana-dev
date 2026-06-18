import { profile } from '@/data/siteData'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-12 border-t border-emerald-400/15 pt-8 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 tracking-widest text-emerald-200/60">
        <div className="text-emerald-300/80">&gt; small, honest signal</div>
        <div>© {year} {profile.fullName.toUpperCase()} · LEARNING IN PUBLIC</div>
      </div>
    </footer>
  )
}
