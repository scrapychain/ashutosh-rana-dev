/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: '/ashutosh-rana-dev',
  assetPrefix: '/ashutosh-rana-dev',
}

module.exports = nextConfig
