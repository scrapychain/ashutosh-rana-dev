import { getAllPosts } from '@/lib/posts'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: { slug: string }
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const posts = getAllPosts()
  const post = posts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const siteUrl = 'https://scrapychain.github.io/ashutosh-rana-dev'
  const postUrl = `${siteUrl}/log/${post.slug}`

  return {
    title: `${post.title} - Ashutosh Rana`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: 'Ashutosh Rana - Personal Portfolio',
      type: 'article',
      publishedTime: post.date,
      authors: ['Ashutosh Rana'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      creator: '@scrapychain',
    },
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: Props) {
  const posts = getAllPosts()
  const post = posts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Redirect to the main page with the hash
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content={`0; url=/#log/${params.slug}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.href = '/#log/${params.slug}';`,
          }}
        />
      </head>
      <body>
        <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <p>
            <a href={`/#log/${params.slug}`}>
              Click here if you are not redirected automatically.
            </a>
          </p>
        </div>
      </body>
    </html>
  )
}
