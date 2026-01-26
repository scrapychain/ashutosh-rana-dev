import Card from './Card'
import CategoryBadge from './CategoryBadge'
import { cn } from '@/lib/utils'
import { posts } from '@/data/siteData'

export default function LogList({
  category,
  setCategory,
  items,
  onOpen,
}: {
  category: 'all' | 'rust' | 'blockchain' | 'personal'
  setCategory: (c: 'all' | 'rust' | 'blockchain' | 'personal') => void
  items: typeof posts
  onOpen: (slug: string) => void
}) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <FilterButton active={category === 'all'} onClick={() => setCategory('all')}>[ALL POSTS]</FilterButton>
        <FilterButton active={category === 'rust'} onClick={() => setCategory('rust')}>[RUST]</FilterButton>
        <FilterButton active={category === 'blockchain'} onClick={() => setCategory('blockchain')}>[BLOCKCHAIN]</FilterButton>
        <FilterButton active={category === 'personal'} onClick={() => setCategory('personal')}>[PERSONAL]</FilterButton>
      </div>

      <div className="space-y-4">
        {items.map((p) => (
          <button key={p.slug} onClick={() => onOpen(p.slug)} className="w-full text-left">
            <Card className="group">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-emerald-200/70">
                    <span className="tracking-widest">{p.date}</span>
                    <span className="opacity-50">•</span>
                    <span className="tracking-widest">{p.readTime}</span>
                    <span className="opacity-50">•</span>
                    <CategoryBadge category={p.category} />
                  </div>
                  <div className="mt-4 text-2xl tracking-widest text-emerald-200 transition group-hover:text-emerald-100">
                    {p.title}
                  </div>
                  <div className="mt-2 max-w-4xl text-sm text-emerald-100/70">{p.excerpt}</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="border border-emerald-400/25 bg-emerald-400/5 px-2 py-1 text-xs tracking-widest text-emerald-200/80">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-emerald-200/50 transition group-hover:text-emerald-100 group-hover:translate-x-1">→</div>
              </div>
            </Card>
          </button>
        ))}
      </div>
    </div>
  )
}

function FilterButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active?: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 text-sm tracking-widest transition',
        active
          ? 'bg-emerald-400 text-black shadow-[0_0_22px_rgba(16,185,129,0.18)]'
          : 'border border-emerald-400/25 text-emerald-200/80 hover:border-emerald-300/50 hover:text-emerald-100'
      )}
    >
      {children}
    </button>
  )
}
