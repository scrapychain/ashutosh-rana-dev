import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

// Configure marked options
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // Convert line breaks to <br>
})

export interface Post {
  slug: string
  title: string
  date: string
  readTime: string
  category: 'rust' | 'blockchain' | 'personal'
  tags: string[]
  excerpt: string
  content: string
  html: string
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getAllPosts(): Post[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const posts = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        // Convert markdown to HTML
        const html = marked(content) as string

        return {
          slug: data.slug || fileName.replace(/\.md$/, ''),
          title: data.title || '',
          date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : (data.date || ''),
          readTime: data.readTime || '5 min',
          category: (data.category || 'personal') as 'rust' | 'blockchain' | 'personal',
          tags: data.tags || [],
          excerpt: data.excerpt || '',
          content: content,
          html: html,
        } as Post
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1))

    return posts
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const posts = getAllPosts()
    return posts.find((post) => post.slug === slug) || null
  } catch (error) {
    console.error('Error getting post:', error)
    return null
  }
}
