import type React from "react"
import type { Metadata } from "next"
import { createServerClient } from "@/lib/supabase/server"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const supabase = await createServerClient()
    
    // Extract locale from slug suffix if present (e.g., "slug-uk" -> "uk")
    let baseSlug = params.slug
    let locale = "en"
    
    const localeMatch = params.slug.match(/-([a-z]{2})$/)
    if (localeMatch) {
      baseSlug = params.slug.replace(localeMatch[0], "")
      locale = localeMatch[1]
    }
    
    const { data: post } = await supabase
      .from("posts")
      .select("title, excerpt, featured_image, created_at")
      .eq("slug", baseSlug)
      .eq("locale", locale)
      .eq("status", "published")
      .single()

    if (!post) {
      return {
        title: "Blog Post | Idea Team Dev",
        description: "Read our blog post on software development, web, mobile, and SaaS solutions.",
      }
    }

    return {
      title: `${post.title} | Blog | Idea Team Dev`,
      description: post.excerpt || "Read this article on software development and technology insights.",
      openGraph: {
        title: post.title,
        description: post.excerpt || "Read this article on our blog.",
        images: post.featured_image ? [{ url: post.featured_image }] : [],
        type: "article",
        publishedTime: post.created_at,
      },
    }
  } catch (error) {
    return {
      title: "Blog | Idea Team",
      description: "Read our latest blog posts on software development.",
    }
  }
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return children
}
