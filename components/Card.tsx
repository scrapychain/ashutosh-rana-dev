import React from 'react'
import { cn } from '@/lib/utils'

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative border border-emerald-400/25 bg-black/55 p-6 shadow-[0_0_35px_rgba(16,185,129,0.08)] transition hover:border-emerald-300/50 hover:shadow-[0_0_55px_rgba(16,185,129,0.12)]',
        className
      )}
    >
      {children}
    </div>
  )
}
