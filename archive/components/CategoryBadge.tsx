export default function CategoryBadge({ category }: { category: string }) {
  const text = category.toUpperCase()
  const icon = category === 'rust' ? '🦀' : category === 'blockchain' ? '⛓️' : '💭'
  return (
    <span className="inline-flex items-center gap-2 border border-emerald-400/25 bg-emerald-400/5 px-2 py-1 text-xs tracking-widest text-emerald-200/80">
      <span aria-hidden>{icon}</span>
      {text}
    </span>
  )
}
