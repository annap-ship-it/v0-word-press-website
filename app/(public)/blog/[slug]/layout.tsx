import type React from "react"
import type { Metadata } from "next"
import { createServerClient } from "@/lib/supabase/server"
import { headers } from "next/headers"

export const dynamic = 'force-dynamic'  // ← Додаємо це, щоб мета не кешувалася

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const headersList = headers()
    const cookieHeader = headersList.get("cookie") || ""

    // Витягуємо мову з cookie (preferred_lang або lang — як ти назвеш)
    let locale = "en"
    const langMatch = cookieHeader.match(/preferred_lang=([^;]+)/) || cookieHeader.match(/lang=([^;]+)/)
    if (langMatch) {
      const langValue = langMatch[1].trim()
      locale = langValue === "uk" ? "uk" : "en"
    }

    const isUkrainian = locale === "uk"

    const supabase = await createServerClient()

    // Спочатку намагаємось знайти пост у потрібній мові
    let { data: post } = await supabase
      .from("posts")
      .select("title, excerpt, featured_image, created_at, locale, meta_title, meta_description")
      .eq("slug", params.slug)
      .eq("locale", locale)
      .eq("status", "published")
      .single()

    // Якщо українською не знайшли — fallback на англійську
    if (!post && isUkrainian) {
      const { data: enPost } = await supabase
        .from("posts")
        .select("title, excerpt, featured_image, created_at, locale, meta_title, meta_description")
        .eq("slug", params.slug)
        .eq("locale", "en")
        .eq("status", "published")
        .single()
      post = enPost
    }

    // Якщо посту взагалі немає
    if (!post) {
      return {
        title: isUkrainian 
          ? "Стаття не знайдена | Блог IdeaTeam" 
          : "Post Not Found | Idea Team Blog",
        description: isUkrainian
          ? "Стаття ще не перекладена або недоступна."
          : "The article is not available or has been removed.",
      }
    }

    const baseUrl = "https://v0-ideateam.vercel.app"
    const currentUrl = `${baseUrl}${isUkrainian ? '/uk' : ''}/blog/${params.slug}`

    return {
      title: post.meta_title || `${post.title} | ${isUkrainian ? "Блог IdeaTeam" : "Blog | Idea Team Dev"}`,
      description: post.meta_description || post.excerpt || (isUkrainian 
        ? "Детальна стаття про розробку ПЗ від команди IdeaTeam."
        : "In-depth article on software development from Idea Team."),
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
        description: post.meta_description || post.excerpt,
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
    console.error("Metadata error:", error)
    return {
      title: "Blog | Idea Team Dev",
      description: "Read our latest blog posts on software development.",
    }
  }
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return children
}
