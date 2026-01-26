'use client'

import { useMemo, useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import Card from '@/components/Card'
import Pill from '@/components/Pill'
import Button from '@/components/Button'
import ProgressBar from '@/components/ProgressBar'
import ProjectHighlight from '@/components/ProjectHighlight'
import SocialCard from '@/components/SocialCard'
import SkillsMatrix from '@/components/SkillsMatrix'
import LogList from '@/components/LogList'
import ManifestoCTA from '@/components/ManifestoCTA'
import Footer from '@/components/Footer'
import GridBackground from '@/components/GridBackground'
import Scanlines from '@/components/Scanlines'
import NoiseOverlay from '@/components/NoiseOverlay'
import Prose from '@/components/Prose'
import CategoryBadge from '@/components/CategoryBadge'
import { START_DATE, socials, project, roadmap, skills } from '@/data/siteData'
import { daysBetween } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { Post } from '@/lib/posts'

export type Route = 'home' | 'roadmap' | 'skills' | 'log' | { post: string } | 'manifesto'

interface HomeClientProps {
  posts: Post[]
}

export default function HomeClient({ posts }: HomeClientProps) {
  const [route, setRoute] = useState<Route>('home')
  const [category, setCategory] = useState<'all' | 'rust' | 'blockchain' | 'personal'>('all')
  const [activePhase, setActivePhase] = useState(roadmap[0].id)

  // Initialize route from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1) // Remove the #
    if (hash) {
      const parts = hash.split('/')
      if (parts[0] === 'log' && parts[1]) {
        setRoute({ post: parts[1] })
      } else if (['home', 'roadmap', 'skills', 'log', 'manifesto'].includes(parts[0])) {
        setRoute(parts[0] as Route)
      }
    }
  }, [])

  // Update URL hash when route changes
  useEffect(() => {
    if (typeof route === 'string') {
      window.history.pushState(null, '', `#${route}`)
    } else if (typeof route === 'object' && 'post' in route) {
      window.history.pushState(null, '', `#log/${route.post}`)
    }
  }, [route])

  // Handle browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (!hash) {
        setRoute('home')
        return
      }
      const parts = hash.split('/')
      if (parts[0] === 'log' && parts[1]) {
        setRoute({ post: parts[1] })
      } else if (['home', 'roadmap', 'skills', 'log', 'manifesto'].includes(parts[0])) {
        setRoute(parts[0] as Route)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const now = useMemo(() => new Date(), [])
  const start = useMemo(() => new Date(START_DATE + 'T00:00:00'), [])
  const day = useMemo(() => daysBetween(start, now), [start, now])
  const total = 1825 // 5 years
  const pct = useMemo(() => (day / total) * 100, [day])

  const filteredPosts = useMemo(() => {
    const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))
    if (category === 'all') return sorted
    return sorted.filter((p) => p.category === category)
  }, [posts, category])

  const currentPost = useMemo(() => {
    if (typeof route === 'object' && 'post' in route) {
      return posts.find((p) => p.slug === route.post) || null
    }
    return null
  }, [route, posts])

  return (
    <div className="min-h-screen bg-black text-emerald-100">
      <GridBackground />
      <Scanlines />
      <NoiseOverlay />

      <Nav route={route} setRoute={setRoute} />

      <main className="mx-auto max-w-6xl px-6 pb-24">
        {route === 'home' && (
          <>
            <Hero setRoute={setRoute} />

            <Section title="Mission Progress" subtitle="Telemetry for the long run - this is a multi-year build.">
              <Card>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span aria-hidden className="text-emerald-200/80">
                      🔒
                    </span>
                    <div className="text-sm tracking-widest text-emerald-200/80">MISSION PROGRESS</div>
                  </div>
                  <Pill>START: {START_DATE}</Pill>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3 text-sm text-emerald-100/80">
                    <div className="flex items-center justify-between">
                      <span className="tracking-widest text-emerald-200/70">BLOCK_HEIGHT:</span>
                      <span className="tracking-widest">{day} / {total}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="tracking-widest text-emerald-200/70">DAY:</span>
                      <span className="tracking-widest">{day} / {total}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="tracking-widest text-emerald-200/70">COMPLETION:</span>
                      <span className="tracking-widest">{pct.toFixed(2)}%</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <ProgressBar value={pct} />
                    <div className="text-sm text-emerald-100/80">
                      <span className="tracking-widest text-emerald-200/70">CURRENT_FOCUS:</span> Building ScrapyChain core - blocks, hashing, consensus
                    </div>
                  </div>
                </div>
              </Card>
            </Section>

            <Section title="Project" subtitle="ScrapyChain is the main experiment that forces Rust + blockchain mastery.">
              <ProjectHighlight />
            </Section>

            <Section title="Social" subtitle="If you want the raw feed, follow the journey.">
              <div className="grid gap-6 md:grid-cols-2">
                <SocialCard
                  icon={<span className="inline-flex h-10 w-10 items-center justify-center border border-emerald-400/25 bg-black/50 text-emerald-200">X</span>}
                  title={socials.x.label}
                  handle={socials.x.handle}
                  sub={socials.x.sub}
                  href={socials.x.href}
                />
                <SocialCard
                  icon={<span className="inline-flex h-10 w-10 items-center justify-center border border-emerald-400/25 bg-black/50 text-emerald-200">GH</span>}
                  title={socials.github.label}
                  handle={socials.github.handle}
                  sub={socials.github.sub}
                  href={socials.github.href}
                />
              </div>
            </Section>

            <Section title="Roadmap" subtitle="A long arc with visible phases. Click a phase to highlight it.">
              <div className="space-y-4">
                {roadmap.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePhase(p.id)}
                    className="w-full text-left transition"
                  >
                    <Card
                      className={cn(
                        activePhase === p.id && 'border-emerald-300/60 shadow-[0_0_60px_rgba(16,185,129,0.16)]'
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1 flex h-12 w-12 items-center justify-center border border-emerald-400/25 bg-black/50 text-emerald-200/90">
                          {p.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                              <div className="text-xl tracking-widest text-emerald-200">{p.title}</div>
                              <div className="mt-1 text-sm tracking-widest text-emerald-200/60">{p.period}</div>
                            </div>
                            <Pill>{p.status === 'active' ? 'ACTIVE' : 'UPCOMING'}</Pill>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {p.tags.map((t) => (
                              <span
                                key={t}
                                className="border border-emerald-400/25 bg-emerald-400/5 px-2 py-1 text-xs tracking-widest text-emerald-200/80"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          {p.status === 'active' && (
                            <div className="mt-4">
                              <div className="mb-2 text-xs tracking-widest text-emerald-200/60">PROGRESS</div>
                              <ProgressBar value={p.progress ?? 0} />
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <Button variant="outline" onClick={() => setRoute('roadmap')}>Open Roadmap Page</Button>
              </div>
            </Section>

            <Section title="Skill Matrix" subtitle="Tracking capability drift as ScrapyChain evolves.">
              <SkillsMatrix />
              <div className="mt-6 flex justify-end">
                <Button variant="outline" onClick={() => setRoute('skills')}>Open Skills Page</Button>
              </div>
            </Section>

            <Section title="Build Log" subtitle="Unfiltered updates. Filter by category.">
              <LogList
                category={category}
                setCategory={setCategory}
                items={filteredPosts.slice(0, 3)}
                onOpen={(slug) => setRoute({ post: slug })}
              />
              <div className="mt-6 flex justify-end">
                <Button variant="outline" onClick={() => setRoute('log')}>View All Logs</Button>
              </div>
            </Section>

            <ManifestoCTA onOpen={() => setRoute('manifesto')} />
          </>
        )}

        {route === 'roadmap' && (
          <Section title="The Roadmap" subtitle="Four phases. One mission. Build systems until they work.">
            <div className="space-y-4">
              {roadmap.map((p) => (
                <Card key={p.id}>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-12 w-12 items-center justify-center border border-emerald-400/25 bg-black/50 text-emerald-200/90">
                      {p.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="text-xl tracking-widest text-emerald-200">{p.title}</div>
                          <div className="mt-1 text-sm tracking-widest text-emerald-200/60">{p.period}</div>
                        </div>
                        <Pill>{p.status === 'active' ? 'ACTIVE' : 'UPCOMING'}</Pill>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span key={t} className="border border-emerald-400/25 bg-emerald-400/5 px-2 py-1 text-xs tracking-widest text-emerald-200/80">
                            {t}
                          </span>
                        ))}
                      </div>

                      {p.status === 'active' && (
                        <div className="mt-4">
                          <div className="mb-2 text-xs tracking-widest text-emerald-200/60">PROGRESS</div>
                          <ProgressBar value={p.progress ?? 0} />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Section>
        )}

        {route === 'skills' && (
          <Section title="Skill Matrix" subtitle="A simple progress view. No vanity. Just numbers.">
            <SkillsMatrix />
          </Section>
        )}

        {route === 'log' && (
          <Section title="Build Log" subtitle="Unfiltered updates - filter by category, open a post to read.">
            <LogList
              category={category}
              setCategory={setCategory}
              items={filteredPosts}
              onOpen={(slug) => setRoute({ post: slug })}
            />
          </Section>
        )}

        {route === 'manifesto' && (
          <Section title="Manifesto" subtitle="Master Rust. Build blockchain. Learn in public.">
            <Card>
              <div className="text-emerald-200/80 tracking-widest">&gt; WHY THIS PATH</div>
              <div className="mt-6 space-y-5 text-emerald-100/80 leading-relaxed">
                <p>
                  I&apos;m not learning Rust first and blockchain later. I&apos;m building both simultaneously.
                  ScrapyChain is the lab; every feature forces a Rust concept and a blockchain primitive to live together.
                </p>
                <p>
                  I&apos;m optimizing for <strong>capability</strong>, not certificates. If I can&apos;t implement it, I don&apos;t know it.
                  That&apos;s the rule.
                </p>
                <p>
                  This site is the public log: what shipped, what broke, what I learned, and what I&apos;m building next.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={socials.x.href}>Follow the Journey</Button>
                <Button variant="outline" onClick={() => setRoute('home')}>Back to Build</Button>
              </div>
            </Card>
          </Section>
        )}

        {currentPost && (
          <Section title="Post" subtitle="Reading a build log entry.">
            <Card>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-2xl tracking-widest text-emerald-200">{currentPost.title}</div>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-emerald-200/70">
                    <span className="tracking-widest">{currentPost.date}</span>
                    <span className="opacity-50">•</span>
                    <span className="tracking-widest">{currentPost.readTime}</span>
                    <span className="opacity-50">•</span>
                    <CategoryBadge category={currentPost.category} />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {currentPost.tags.map((t) => (
                      <span key={t} className="border border-emerald-400/25 bg-emerald-400/5 px-2 py-1 text-xs tracking-widest text-emerald-200/80">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setRoute('log')}>Back to Logs</Button>
                </div>
              </div>

              <div className="mt-8">
                <Prose html={currentPost.html} />
              </div>
            </Card>
          </Section>
        )}

        <Footer blockHeight={day} total={total} />
      </main>
    </div>
  )
}
