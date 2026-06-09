import { MetadataRoute } from 'next'

// Deploy host (GitHub Pages). The site is now a single page with hash-routed
// sections, so the sitemap just points at the root.
const baseUrl = 'https://scrapychain.github.io/ashutosh-rana-dev'

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
