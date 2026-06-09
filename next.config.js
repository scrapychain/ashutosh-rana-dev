/** @type {import('next').NextConfig} */

// Deployed on Vercel (https://ashutosh-rana-dev.vercel.app), served from the
// domain root, so no basePath/assetPrefix is needed: assets resolve at /_next/*.
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
