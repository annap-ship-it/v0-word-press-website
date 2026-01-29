import type React from "react"
import type { Metadata } from "next"
import { createServerClient } from "@/lib/supabase/server"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const supabase = await createServerClient()

    // Try multiple slug variations to find posts (with and without locale suffix)
    const slugVariations = [
      params.slug, // original slug
      `${params.slug}-uk`, // try Ukrainian variant
      params.slug.replace('-uk', ''), // remove -uk if present
    ]

    let post = null

    // Try to find the exact slug first
    for (const slug of slugVariations) {
      const { data: foundPost } = await supabase
        .from("posts")
        .select("title, excerpt, featured_image, created_at, locale, meta_title, meta_description, status")
        .eq("slug", slug)
        .eq("status", "published")
        .single()

      if (foundPost) {
        post = foundPost
        break
      }
    }

    if (!post) {
      return {
        title: "Blog | IdeaTeam",
        description: "Read our latest blog posts on software development, web, mobile, and SaaS.",
      }
    }

    // Determine the appropriate title and description
    const title = post.meta_title || `${post.title} | IdeaTeam Blog`
    const description = post.meta_description || post.excerpt || "Read this article on software development and technology insights."

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: post.featured_image ? [{ url: post.featured_image }] : [],
        type: "article",
        publishedTime: post.created_at,
      },
      alternates: {
        languages: {
          en: params.slug,
          uk: `${params.slug}-uk`,
        },
      },
    }
  } catch (error) {
    console.error("Metadata generation error:", error)
    return {
      title: "Blog | IdeaTeam",
      description: "Read our latest blog posts on software development.",
    }
  }
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return children
}
