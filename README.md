# Ashutosh Rana - Personal Site

A retro-CRT terminal personal site built with Next.js, TypeScript, and Tailwind CSS.
Two streams of signal, nothing else:

- **Rust Bytes**: bite-sized snippets and concepts from the Rust handbook.
- **Corporate Log**: pragmatic lessons from 4 years of corporate software engineering.

## Aesthetic

Pure-black background with an emerald-green phosphor hierarchy, three stacked CRT
overlays (radial blueprint grid, scanlines, fractal-noise grain), monospace type,
wide `tracking-widest` readouts, and a glitch effect on the brand name.

## Tech Stack

- **Framework:** Next.js 14 (static export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Renders HomeClient
│   ├── HomeClient.tsx      # Hash-routed SPA shell (hero + feed + about)
│   ├── not-found.tsx       # Terminal 404
│   └── globals.css         # Base styles + glitch keyframes
├── components/
│   ├── Hero.tsx            # Terminal welcome screen
│   ├── Feed.tsx            # Dual-feed layout + filter tabs + empty states
│   ├── RustByteCard.tsx    # Terminal-framed code-snippet card
│   ├── CorporateLogCard.tsx# Text log entry with "lesson" callout
│   ├── RustCode.tsx        # Dependency-free Rust syntax highlighter
│   └── ...                 # CRT overlays, Nav, Footer, primitives
├── data/
│   ├── siteData.ts         # Profile + socials
│   ├── bytes.ts            # Rust Bytes entries
│   └── logs.ts             # Corporate Log entries
└── archive/                # Previous "ScrapyChain" version (not imported)
```

## Adding Content

- **Rust Byte:** append a `RustByte` object to `bytes` in `data/bytes.ts`.
- **Corporate Log entry:** append a `CorporateLog` object to `logs` in `data/logs.ts`.
- **Blank slate:** empty either array, and the feed renders a graceful empty state.

## Build

```bash
npm run build   # static export to ./out
```

## License

MIT
