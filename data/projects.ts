// ---------------------------------------------------------------------------
// PROJECTS
// What I'm actively building. Add/edit entries here.
// ---------------------------------------------------------------------------

export interface Project {
  id: string
  name: string
  /** Optional short code, e.g. "TEE". */
  abbr?: string
  /** One bright line under the name. */
  tagline: string
  /** Body paragraphs. */
  description: string[]
  tags: string[]
  /** Short status readout, e.g. "LIVE" or "BUILDING". */
  status: string
  /** Link row. Omit `href` for private/unreleased work. */
  link: { label: string; href?: string }
}

export const projects: Project[] = [
  {
    id: 'scrapybytes',
    name: 'ScrapyBytes',
    tagline: 'A visual CS education platform.',
    description: [
      'Breaks down complex topics (NLP, RAG, hashing, distributed systems) into digestible explainers for developers who skipped the fundamentals.',
    ],
    tags: ['education', 'cs-fundamentals', 'web'],
    status: 'LIVE',
    link: { label: 'scrapybytes.vercel.app', href: 'https://scrapybytes.vercel.app' },
  },
  {
    id: 'tee',
    name: 'Term Extraction Engine',
    abbr: 'TEE',
    tagline: 'A Rust-native document intelligence tool.',
    description: [
      'Upload your documents, extract key terms, build a custom knowledge graph. No third-party APIs, no data leakage.',
      'Built for Web3 security auditors and protocol teams.',
    ],
    tags: ['rust', 'nlp', 'web3', 'knowledge-graph'],
    status: 'BUILDING',
    link: { label: 'private / building' },
  },
]
