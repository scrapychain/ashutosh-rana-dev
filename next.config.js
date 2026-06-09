/** @type {import('next').NextConfig} */

// GitHub Pages serves this repo at scrapychain.github.io/ashutosh-rana-dev/,
// so production assets and links must be prefixed with the repo subpath.
// `next build` sets NODE_ENV=production; `next dev` stays at the root so local
// development still works at http://localhost:3000/.
const isProd = process.env.NODE_ENV === 'production'
const repoBasePath = '/ashutosh-rana-dev'

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  basePath: isProd ? repoBasePath : '',
  assetPrefix: isProd ? repoBasePath : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
