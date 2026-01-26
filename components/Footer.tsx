export default function Footer({ blockHeight, total }: { blockHeight: number; total: number }) {
  return (
    <footer className="mt-12 border-t border-emerald-400/15 pt-8 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 text-emerald-200/60">
        <div className="tracking-widest">&gt; Building in public since Day 0</div>
        <div className="tracking-widest">BLOCK #{blockHeight} / {total}</div>
      </div>
      <div className="mt-4 text-center text-emerald-200/50 tracking-widest">
        © 2025 ASHUTOSH RANA · BLOCKCHAIN ENTHUSIAST · OPEN SOURCE EVERYTHING
      </div>
    </footer>
  )
}
