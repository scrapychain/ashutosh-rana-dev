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
  return (
    <div className="space-y-8">
      {/* Filter toolbar */}
      <div role="group" aria-label="Filter the feed" className="flex flex-wrap gap-3">
        <Tab active={filter === 'all'} onClick={() => setFilter('all')}>
          ALL [{bytes.length + logs.length}]
        </Tab>
        <Tab active={filter === 'bytes'} onClick={() => setFilter('bytes')}>
          RUST BYTES [{bytes.length}]
        </Tab>
        <Tab active={filter === 'log'} onClick={() => setFilter('log')}>
          CORPORATE LOG [{logs.length}]
        </Tab>
      </div>

      {filter === 'all' && (
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-10">
          <BytesSection bytes={bytes} wide={false} />
          <LogsSection logs={logs} wide={false} />
        </div>
      )}
      {filter === 'bytes' && <BytesSection bytes={bytes} wide />}
      {filter === 'log' && <LogsSection logs={logs} wide />}
    </div>
  )
}

function BytesSection({ bytes, wide }: { bytes: RustByte[]; wide: boolean }) {
  return (
    <section aria-label="Rust Bytes" className="min-w-0 space-y-5">
      <ColumnHeader label="RUST_BYTES" count={bytes.length} />
      {bytes.length > 0 ? (
        <div className={cn('grid grid-cols-1 gap-5', wide && 'sm:grid-cols-2 lg:grid-cols-3')}>
          {bytes.map((b) => (
            <RustByteCard key={b.id} byte={b} />
          ))}
        </div>
      ) : (
        <EmptyState label="// no rust bytes yet" hint="Add entries in data/bytes.ts" />
      )}
    </section>
  )
}

function LogsSection({ logs, wide }: { logs: CorporateLog[]; wide: boolean }) {
  return (
    <section aria-label="Corporate Log" className="min-w-0 space-y-5">
      <ColumnHeader label="CORPORATE_LOG" count={logs.length} />
      {logs.length > 0 ? (
        <div className={cn('grid grid-cols-1 gap-5', wide && 'lg:grid-cols-2')}>
          {logs.map((l) => (
            <CorporateLogCard key={l.id} log={l} />
          ))}
        </div>
      ) : (
        <EmptyState label="> awaiting log entries" hint="Add entries in data/logs.ts" />
      )}
    </section>
  )
}

function ColumnHeader({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
      <h3 className="text-base tracking-[0.22em] text-emerald-300">&gt; {label}</h3>
      <span className="font-mono text-xs tracking-widest text-emerald-200/50">
        {String(count).padStart(2, '0')}
      </span>
    </div>
  )
}

function EmptyState({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-lg border border-dashed border-emerald-500/25 bg-emerald-500/[0.03] px-5 py-10 text-emerald-200/60">
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
        'rounded-md border px-4 py-2 text-sm tracking-widest transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50',
        active
          ? 'border-emerald-400/70 bg-emerald-500/10 text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.12)]'
          : 'border-emerald-500/25 text-emerald-200/70 hover:border-emerald-300/50 hover:text-emerald-100'
      )}
    >
      {children}
    </button>
  )
}
