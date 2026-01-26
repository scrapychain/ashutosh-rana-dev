export const START_DATE = '2026-01-25'

export const socials = {
  x: { 
    label: 'Follow on X', 
    handle: '@scrapychain', 
    sub: 'Daily updates, raw thoughts, zero fluff', 
    href: 'https://x.com/scrapychain' 
  },
  github: { 
    label: 'Follow on GitHub', 
    handle: '@scrapychain', 
    sub: 'Watch the code evolve, commit by commit', 
    href: 'https://github.com/scrapychain' 
  },
}

export const project = {
  name: 'ScrapyChain',
  tagline: 'Toy blockchain in Rust',
  badge: 'BUILDING NOW',
  description:
    'My learning vehicle for mastering Rust + blockchain tech. Building a functional toy blockchain from first principles to internalize: block structure, SHA-256 hashing, proof-of-work, transaction validation, and Merkle trees.',
  tags: ['#rust', '#blockchain-fundamentals', '#cryptography', '#learning-in-public'],
  ctas: [
    { label: 'View Source Code', href: 'https://github.com/scrapychain/ScrapyChain' },
    { label: 'Watch Commits', href: 'https://github.com/scrapychain/ScrapyChain/commits/main/' },
  ],
  features: [
    { label: 'Block Structure', status: 'doing' },
    { label: 'SHA-256 Hashing', status: 'todo' },
    { label: 'Proof of Work', status: 'todo' },
    { label: 'Transaction System', status: 'todo' },
    { label: 'Merkle Trees', status: 'todo' },
    { label: 'Chain Validation', status: 'todo' },
  ] as Array<{ label: string; status: 'done' | 'doing' | 'todo' }>,
}

export const roadmap = [
  {
    id: 'p1',
    title: 'Phase 1: Genesis Block',
    period: 'Months 0-6',
    status: 'active',
    tags: ['Rust Basics', 'Block Structure', 'SHA-256', 'PoW'],
    progress: 15,
    icon: '</>',
  },
  {
    id: 'p2',
    title: 'Phase 2: P2P Resistance',
    period: 'Months 7-12',
    status: 'upcoming',
    tags: ['libp2p', 'Gossip', 'BFT', 'Distributed Nets'],
    icon: '↔',
  },
  {
    id: 'p3',
    title: 'Phase 3: Code Insurgency',
    period: 'Months 13-18',
    status: 'upcoming',
    tags: ['Substrate', 'Solana', 'Open Source', 'Protocol Wars'],
    icon: '{}',
  },
  {
    id: 'p4',
    title: 'Phase 4: Protocol Architect',
    period: 'Years 2-3',
    status: 'upcoming',
    tags: ['Consensus Design', 'State Machines', 'ZKP'],
    icon: '⬡',
  },
] as Array<{
  id: string
  title: string
  period: string
  status: 'active' | 'upcoming'
  tags: string[]
  progress?: number
  icon: string
}>

export const skills = [
  { name: 'Rust Programming', value: 15 },
  { name: 'Blockchain Architecture', value: 5 },
  { name: 'Cryptographic Hashing', value: 0 },
  { name: 'Consensus Mechanisms', value: 0 },
  { name: 'Data Structures', value: 5 },
  { name: 'Systems Programming', value: 0 },
]

export const posts = [
  {
    slug: 'day-5-block-structure',
    title: 'Day 5: Implementing Block Structure in ScrapyChain',
    date: '2025-01-08',
    readTime: '4 min',
    category: 'rust',
    tags: ['rust', 'scrapychain', 'blockchain'],
    excerpt: 'The first real primitive: defining a Block struct, hashing strategy, and the rules I\'m enforcing early.',
    html: `
      <p><strong>Goal:</strong> define a minimal <em>Block</em> that's honest and composable.</p>
      <h2>What I shipped</h2>
      <ul>
        <li>Block header fields: index, timestamp, prevHash, nonce</li>
        <li>Deterministic serialization strategy</li>
        <li>Hashing policy (what must be included)</li>
      </ul>
      <blockquote>Every constraint now saves pain later.</blockquote>
      <h2>Next</h2>
      <p>PoW loop + difficulty target + validation rules.</p>
    `,
  },
  {
    slug: 'why-build-not-tutorials',
    title: 'Why I\'m Learning Rust Through Building, Not Tutorials',
    date: '2025-01-06',
    readTime: '6 min',
    category: 'personal',
    tags: ['personal', 'learning-strategy'],
    excerpt: 'The anti-gatekeeping approach: ship primitives, learn concepts in context, repeat.',
    html: `
      <p>I'm not collecting notes. I'm collecting <strong>capabilities</strong>.</p>
      <h2>My rule</h2>
      <p>If I can't implement a concept, I don't "know" it yet.</p>
      <h2>Why ScrapyChain</h2>
      <p>Because blockchains force you to touch: hashing, data structures, networking, consensus, and systems thinking.</p>
    `,
  },
  {
    slug: 'sha256-heart-of-blockchain',
    title: 'Understanding SHA-256: The Heart of Blockchain',
    date: '2025-01-05',
    readTime: '7 min',
    category: 'blockchain',
    tags: ['blockchain', 'cryptography', 'fundamentals'],
    excerpt: 'What SHA-256 gives you, what it doesn\'t, and how I\'m using it in ScrapyChain.',
    html: `
      <p>Hashing is the glue. It's not magic, it's a set of properties you can rely on.</p>
      <h2>Properties I care about</h2>
      <ul>
        <li>Determinism</li>
        <li>Preimage resistance</li>
        <li>Collision resistance (practical)</li>
        <li>Avalanche effect</li>
      </ul>
      <h2>In ScrapyChain</h2>
      <p>Every block commits to its parent via <code>prevHash</code>. That's the spine.</p>
    `,
  },
] as Array<{
  slug: string
  title: string
  date: string
  readTime: string
  category: 'rust' | 'blockchain' | 'personal'
  tags: string[]
  excerpt: string
  html: string
}>
