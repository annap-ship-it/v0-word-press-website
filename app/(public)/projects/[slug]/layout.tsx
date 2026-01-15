import type React from "react"
import type { Metadata } from "next"
import { createServerClient } from "@/lib/supabase/server"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const supabase = await createServerClient()
    const { data: post } = await supabase
      .from("posts")
      .select("title, excerpt, featured_image, created_at")
      .eq("slug", params.slug)
      .eq("status", "published")
      .single()

    if (!post) {
      return {
        title: "Project | Portfolio | Idea Team Dev",
        description: "View our software development project portfolio and case studies.",
      }
    }

    return {
      title: `${post.title} | Project Portfolio | Idea Team Dev`,
      description: post.excerpt || "Discover how we built this innovative software solution.",
      openGraph: {
        title: post.title,
        description: post.excerpt || "View this project case study from our portfolio.",
        images: post.featured_image ? [{ url: post.featured_image }] : [],
        type: "article",
        publishedTime: post.created_at,
      },
    }
  } catch (error) {
    return {
      title: "Project | Portfolio | Idea Team Dev",
      description: "Explore our portfolio of successful software development projects.",
    }
  }
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return children
}
