/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: "/ashutosh-rana-dev",
  assetPrefix: process.env.NODE_ENV === 'production' ? '/ashutosh-rana-dev/' : '',
}

module.exports = nextConfig
