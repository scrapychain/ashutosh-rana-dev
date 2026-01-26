# Ashutosh Rana - Personal Portfolio

A terminal/cypherpunk aesthetic personal website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🦀 Terminal-style design with glitch effects
- ⛓️ Project showcase for ScrapyChain blockchain
- 📊 Skills tracking and roadmap visualization
- 📝 Build log with markdown support
- 🎨 Dark theme with emerald/green terminal aesthetic
- 📱 Fully responsive design

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Content:** Markdown files with frontmatter

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page with routing
│   └── globals.css      # Global styles
├── components/          # Reusable UI components
├── content/
│   └── posts/          # Markdown blog posts
├── data/
│   └── siteData.ts     # Site content and configuration
└── lib/
    └── utils.ts        # Utility functions
```

## Customization

1. **Update personal info:** Edit `data/siteData.ts`
2. **Add blog posts:** Create `.md` files in `content/posts/`
3. **Modify colors:** Update Tailwind classes in components
4. **Change start date:** Update `START_DATE` in `data/siteData.ts`

## Build for Production

```bash
npm run build
npm start
```

## License

MIT
