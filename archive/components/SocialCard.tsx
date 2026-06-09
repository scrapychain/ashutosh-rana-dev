import React from 'react'
import Card from './Card'

export default function SocialCard({
  icon,
  title,
  handle,
  sub,
  href,
}: {
  icon: React.ReactNode
  title: string
  handle: string
  sub: string
  href: string
}) {
  return (
    <Card className="p-5">
      <a href={href} target="_blank" rel="noreferrer" className="group block">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {icon}
            <div>
              <div className="text-sm tracking-widest text-emerald-200">{title.toUpperCase()}</div>
              <div className="mt-1 text-emerald-100/80 tracking-widest">{handle}</div>
            </div>
          </div>
          <span className="text-emerald-200/60 transition group-hover:text-emerald-100">↗</span>
        </div>
        <div className="mt-3 text-sm text-emerald-100/70">{sub}</div>
      </a>
    </Card>
  )
}
