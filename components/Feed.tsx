'use client'

import { cn } from '@/lib/utils'
import RustByteCard from './RustByteCard'
import CorporateLogCard from './CorporateLogCard'
import type { RustByte } from '@/data/bytes'
import type { CorporateLog } from '@/data/logs'

export type FeedFilter = 'all' | 'bytes' | 'log'

export default function Feed({
  filter,
  setFilter,
  bytes,
  logs,
}: {
  filter: FeedFilter
  setFilter: (f: FeedFilter) => void
  bytes: RustByte[]
  logs: CorporateLog[]
}) {
  const showBytes = filter === 'all' || filter === 'bytes'
  const showLogs = filter === 'all' || filter === 'log'

  return (
    <div className="space-y-8">
      {/* Filter toolbar */}
      <div role="group" aria-label="Filter the feed" className="flex flex-wrap gap-3">
        <Tab active={filter === 'all'} onClick={() => setFilter('all')}>
          [ALL]
        </Tab>
        <Tab active={filter === 'bytes'} onClick={() => setFilter('bytes')}>
          [RUST BYTES]
        </Tab>
        <Tab active={filter === 'log'} onClick={() => setFilter('log')}>
          [CORPORATE LOG]
        </Tab>
      </div>

      <div
        className={cn(
          'grid gap-6',
          filter === 'all' && 'lg:grid-cols-2 lg:gap-x-10',
          filter === 'bytes' && 'md:grid-cols-2',
          filter === 'log' && 'md:grid-cols-2'
        )}
      >
        {showBytes && (
          <section aria-label="Rust Bytes" className="min-w-0 space-y-5">
            {filter === 'all' && <ColumnHeader label="RUST_BYTES" count={bytes.length} />}
            <div className={cn('grid grid-cols-1 gap-5', filter === 'bytes' && 'md:grid-cols-2')}>
              {bytes.length > 0 ? (
                bytes.map((b) => <RustByteCard key={b.id} byte={b} />)
              ) : (
                <EmptyState
                  label="// no rust bytes yet"
                  hint="Add entries in data/bytes.ts"
                />
              )}
            </div>
          </section>
        )}

        {showLogs && (
          <section aria-label="Corporate Log" className="min-w-0 space-y-5">
            {filter === 'all' && <ColumnHeader label="CORPORATE_LOG" count={logs.length} />}
            <div className={cn('grid grid-cols-1 gap-5', filter === 'log' && 'md:grid-cols-2')}>
              {logs.length > 0 ? (
                logs.map((l) => <CorporateLogCard key={l.id} log={l} />)
              ) : (
                <EmptyState
                  label="> awaiting log entries"
                  hint="Add entries in data/logs.ts"
                />
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function ColumnHeader({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
      <h3 className="text-sm tracking-[0.25em] text-emerald-300">&gt; {label}</h3>
      <span className="font-mono text-xs tracking-widest text-emerald-200/50">
        {String(count).padStart(2, '0')}
      </span>
    </div>
  )
}

function EmptyState({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="flex flex-col items-start gap-2 border border-dashed border-emerald-500/25 bg-emerald-500/[0.03] px-5 py-10 text-emerald-200/60">
      <span className="font-mono text-sm tracking-wide text-emerald-300/70">{label}</span>
      <span className="font-mono text-xs tracking-wide text-emerald-200/40">{hint}</span>
    </div>
  )
}

function Tab({
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
      aria-pressed={active}
      className={cn(
        'px-4 py-2 text-sm tracking-widest transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50',
        active
          ? 'bg-emerald-400 text-black shadow-[0_0_22px_rgba(16,185,129,0.18)]'
          : 'border border-emerald-500/25 text-emerald-200/80 hover:border-emerald-300/50 hover:text-emerald-100'
      )}
    >
      {children}
    </button>
  )
}
