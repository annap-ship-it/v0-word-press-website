import type { Metadata } from "next"
import BlogPageClient from "./page.client"

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image: string | null
  category_id: string | null // Allow category_id to be null
  categories: { name: string; slug: string }[] | null // Allow categories to be null
  created_at: string
  published_at: string | null
  author_id: string
  locale?: string
  author?: {
    display_name: string | null
    avatar_url: string | null
  } | null
}

export const metadata: Metadata = {
  title: "Blog | What's happening in web, mobile, and SaaS development",
  description:
    "Explore expert insights, trends, and best practices in web, mobile, and SaaS development. Stay updated on software engineering, product design, and team growth strategies.",
  openGraph: {
    title: "Blog | What's happening in web, mobile, and SaaS development",
    description: "Explore expert insights, trends, and best practices in web, mobile, and SaaS development.",
  },
}

export default function BlogPage() {
  return <BlogPageClient />
}
