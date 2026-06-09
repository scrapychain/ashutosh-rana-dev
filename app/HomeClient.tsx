'use client'

import { useEffect, useRef, useState } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import Card from '@/components/Card'
import Button from '@/components/Button'
import Feed, { FeedFilter } from '@/components/Feed'
import ProjectCard from '@/components/ProjectCard'
import Footer from '@/components/Footer'
import GridBackground from '@/components/GridBackground'
import Scanlines from '@/components/Scanlines'
import NoiseOverlay from '@/components/NoiseOverlay'
import { profile, socials } from '@/data/siteData'
import { bytes } from '@/data/bytes'
import { logs } from '@/data/logs'
import { projects } from '@/data/projects'

export type Route = 'home' | 'about' | 'projects'
export type NavKey = 'all' | 'bytes' | 'log' | 'projects' | 'about'

export default function HomeClient() {
  const [route, setRoute] = useState<Route>('home')
  const [filter, setFilter] = useState<FeedFilter>('all')
  const feedRef = useRef<HTMLDivElement>(null)

  // Sync state <- URL hash (initial load + back/forward).
  useEffect(() => {
    const apply = () => {
      const hash = window.location.hash.slice(1)
      if (hash === 'about' || hash === 'projects') {
        setRoute(hash)
        return
      }
      setRoute('home')
      if (hash === 'bytes' || hash === 'log') setFilter(hash)
      else setFilter('all')
    }
    apply()
    window.addEventListener('hashchange', apply)
    return () => window.removeEventListener('hashchange', apply)
  }, [])

  const scrollToTop = () =>
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))

  const scrollToFeed = () =>
    requestAnimationFrame(() =>
      feedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    )

  const goHome = () => {
    setRoute('home')
    setFilter('all')
    window.history.pushState(null, '', '#home')
    scrollToTop()
  }

  const jumpToFeed = (f: FeedFilter) => {
    setRoute('home')
    setFilter(f)
    window.history.pushState(null, '', f === 'all' ? '#home' : `#${f}`)
    scrollToFeed()
  }

  const onNav = (k: NavKey) => {
    if (k === 'about' || k === 'projects') {
      setRoute(k)
      window.history.pushState(null, '', `#${k}`)
      scrollToTop()
    } else {
      jumpToFeed(k)
    }
  }

  const navActive: NavKey = route === 'home' ? filter : route

  return (
    <div className="min-h-screen bg-black text-emerald-100">
      <GridBackground />
      <Scanlines />
      <NoiseOverlay />

      <Nav active={navActive} onHome={goHome} onSelect={onNav} />

      <main className="mx-auto max-w-6xl px-6 pb-24">
        {route === 'home' && (
          <>
            <Hero onJump={jumpToFeed} onProjects={() => onNav('projects')} />

            <div ref={feedRef} className="scroll-mt-24">
              <Section
                title="The Logs"
                subtitle="Two streams: Rust I'm learning from the handbook, and engineering reality I've lived."
              >
                <Feed filter={filter} setFilter={setFilter} bytes={bytes} logs={logs} />
              </Section>
            </div>
          </>
        )}

        {route === 'projects' && (
          <Section title="Projects" subtitle="What I'm building right now.">
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          </Section>
        )}

        {route === 'about' && (
          <Section title="About" subtitle="Who's at the keyboard.">
            <Card>
              <div className="tracking-widest text-emerald-300/80">&gt; WHOAMI</div>
              <div className="mt-6 max-w-3xl space-y-5 leading-relaxed text-emerald-100/85">
                <p>
                  I&apos;m {profile.fullName}, a {profile.role} with {profile.yearsExperience} years
                  of corporate software engineering, the kind of work that doesn&apos;t make a
                  highlight reel: deadlines, legacy code, on-call, and the long game of keeping
                  systems alive.
                </p>
                <p>
                  This site is deliberately small: two feeds and the things I&apos;m building.{' '}
                  <span className="text-emerald-200">Rust Bytes</span> are the concepts I&apos;m
                  learning straight from the handbook, distilled to something you can read in a
                  minute. <span className="text-emerald-200">Corporate Log</span> is the pragmatic,
                  occasionally uncomfortable truth about shipping software for a living.
                </p>
                <p>
                  No countdowns, no mission dashboard, no growth hacks. Just signal I&apos;d have
                  wanted earlier in my career.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button onClick={() => onNav('bytes')}>Browse the Feed</Button>
                <Button variant="outline" href={socials.github.href}>
                  {socials.github.label}
                </Button>
              </div>
            </Card>
          </Section>
        )}

        <Footer />
      </main>
    </div>
  )
}
