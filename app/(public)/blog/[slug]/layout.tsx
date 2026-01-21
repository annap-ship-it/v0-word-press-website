import type React from "react"
import type { Metadata } from "next"
import { createServerClient } from "@/lib/supabase/server"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const supabase = await createServerClient()

    // Try to fetch the post by slug in English first (default locale)
    let { data: post } = await supabase
      .from("posts")
      .select("title, excerpt, featured_image, created_at, locale, meta_title, meta_description")
      .eq("slug", params.slug)
      .eq("locale", "en")
      .eq("status", "published")
      .single()

    // If no English version, fetch any version
    if (!post) {
      const { data: anyPost } = await supabase
        .from("posts")
        .select("title, excerpt, featured_image, created_at, locale, meta_title, meta_description")
        .eq("slug", params.slug)
        .eq("status", "published")
        .single()
      post = anyPost
    }

    if (!post) {
      return {
        title: "Blog | Idea Team Dev",
        description: "Read our latest blog posts on software development, web, mobile, and SaaS.",
      }
    }

    return {
      title: post.meta_title || `${post.title} | Blog | Idea Team Dev`,
      description: post.meta_description || post.excerpt || "Read this article on software development and technology insights.",
      openGraph: {
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt || "Read this article on our blog.",
        images: post.featured_image ? [{ url: post.featured_image }] : [],
        type: "article",
        publishedTime: post.created_at,
      },
    }
  } catch (error) {
    return {
      title: "Blog | Idea Team Dev",
      description: "Read our latest blog posts on software development.",
    }
  }
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return children
}
