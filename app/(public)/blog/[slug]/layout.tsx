import type React from "react"
import type { Metadata } from "next"
import { createServerClient } from "@/lib/supabase/server"
import { headers } from "next/headers"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const headersList = await headers()
    const pathname = headersList.get("x-pathname") || ""
    const isUkrainian = pathname.includes("/uk")

    const supabase = await createServerClient()
    const locale = isUkrainian ? "uk" : "en"

    // Try to fetch post in the requested locale first
    let { data: post } = await supabase
      .from("posts")
      .select("title, excerpt, featured_image, created_at, locale, meta_title, meta_description")
      .eq("slug", params.slug)
      .eq("locale", locale)
      .eq("status", "published")
      .single()

    // If requested Ukrainian but not found, fall back to English
    if (!post && locale === "uk") {
      const { data: enPost } = await supabase
        .from("posts")
        .select("title, excerpt, featured_image, created_at, locale, meta_title, meta_description")
        .eq("slug", params.slug)
        .eq("locale", "en")
        .eq("status", "published")
        .single()
      post = enPost
    }

    if (!post) {
      return {
        title: isUkrainian 
          ? "Стаття | Блог IdeaTeam" 
          : "Blog | Idea Team Dev",
        description: isUkrainian
          ? "Читайте наші найновіші статті про розробку ПЗ, веб та мобільні додатки."
          : "Read our latest blog posts on software development, web, mobile, and SaaS.",
      }
    }

    const baseUrl = "https://v0-ideateam.vercel.app"
    const currentUrl = isUkrainian 
      ? `${baseUrl}/uk/blog/${params.slug}`
      : `${baseUrl}/blog/${params.slug}`

    return {
      title: post.meta_title || `${post.title} | ${isUkrainian ? "Блог IdeaTeam" : "Blog | Idea Team Dev"}`,
      description: post.meta_description || post.excerpt || (isUkrainian 
        ? "Прочитайте цю статтю на нашому блозі."
        : "Read this article on our blog."),
      alternates: {
        canonical: currentUrl,
        languages: {
          en: `${baseUrl}/blog/${params.slug}`,
          uk: `${baseUrl}/uk/blog/${params.slug}`,
          "x-default": `${baseUrl}/blog/${params.slug}`,
        },
      },
      openGraph: {
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt || (isUkrainian 
          ? "Прочитайте цю статтю на нашому блозі."
          : "Read this article on our blog."),
        images: post.featured_image ? [{ url: post.featured_image, width: 1200, height: 630 }] : [],
        type: "article",
        publishedTime: post.created_at,
        url: currentUrl,
      },
      twitter: {
        card: "summary_large_image",
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt,
        images: post.featured_image ? [post.featured_image] : [],
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
