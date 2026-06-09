import { MetadataRoute } from 'next'

// Deploy host (Vercel). The site is a single page with hash-routed sections,
// so the sitemap just points at the root.
const baseUrl = 'https://ashutosh-rana-dev.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
