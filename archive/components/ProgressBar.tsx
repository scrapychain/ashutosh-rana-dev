import { clamp } from '@/lib/utils'

export default function ProgressBar({ value }: { value: number }) {
  const pct = clamp(value, 0, 100)
  return (
    <div className="h-3 w-full overflow-hidden border border-emerald-400/25 bg-black/60">
      <div
        className="h-full bg-gradient-to-r from-emerald-500/80 via-emerald-400 to-emerald-200 animate-pulse"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
