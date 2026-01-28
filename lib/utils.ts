export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function daysBetween(a: Date, b: Date) {
  const ms = 24 * 60 * 60 * 1000
  const ua = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const ub = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
  return Math.max(0, Math.floor((ub - ua) / ms)) + 1
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}
