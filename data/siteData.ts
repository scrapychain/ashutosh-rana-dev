// ---------------------------------------------------------------------------
// Site profile & socials
// Single source of truth for identity/brand copy. No project-specific telemetry.
// ---------------------------------------------------------------------------

export const profile = {
  /** Glitched brand name shown in the hero. */
  name: 'ASHUTOSH',
  fullName: 'Ashutosh Rana',
  role: 'Software Engineer',
  yearsExperience: 4,
  /** One-line readout under the brand name. */
  status: 'SHIPPING RUST + REAL ENGINEERING',
  /** Hero body lines: terminal prompts, rendered one per line. */
  intro: [
    'Software Engineer. 4 years building, breaking, and maintaining production software at a corporate desk.',
    'These days I publish two things: raw Rust I am learning from the handbook, and the unglamorous realities of shipping software for a living.',
    'No hustle-bait. No 5-year countdowns. Just small, honest signal.',
  ],
} as const

export const socials = {
  x: {
    label: 'X / TWITTER',
    handle: '@ashutoshrana_20',
    sub: 'Short notes, in public',
    href: 'https://x.com/ashutoshrana_20',
  },
  github: {
    label: 'GITHUB',
    handle: '@scrapychain',
    sub: 'Code, commit by commit',
    href: 'https://github.com/scrapychain',
  },
} as const

export type FeedKind = 'bytes' | 'log'
