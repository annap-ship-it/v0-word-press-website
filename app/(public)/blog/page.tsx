import type { Metadata } from "next"
import BlogContent from "./blog-content"
import { headers } from "next/headers"

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const pathname = headersList.get("x-pathname") || ""
  const isUkrainian = pathname.includes("/uk")

  const baseUrl = "https://v0-ideateam.vercel.app"

  if (isUkrainian) {
    return {
      title: "Блог IdeaTeam — Статті про аутсорсинг, веб та мобільну розробку",
      description: "Актуальні кейси, поради з IT-аутсорсингу, розробки SaaS, веб та мобільних додатків. Дізнайтеся як це працює.",
      alternates: {
        canonical: `${baseUrl}/uk/blog`,
        languages: {
          en: `${baseUrl}/blog`,
          uk: `${baseUrl}/uk/blog`,
          "x-default": `${baseUrl}/blog`,
        },
      },
      openGraph: {
        title: "Блог IdeaTeam — Статті про аутсорсинг, веб та мобільну розробку",
        description: "Актуальні кейси, поради з IT-аутсорсингу, розробки SaaS, веб та мобільних додатків.",
        type: "website",
        url: `${baseUrl}/uk/blog`,
      },
      twitter: {
        card: "summary_large_image",
        title: "Блог IdeaTeam — Статті про аутсорсинг, веб та мобільну розробку",
        description: "Актуальні кейси, поради з IT-аутсорсингу, розробки SaaS, веб та мобільних додатків.",
      },
    }
  }

  return {
    title: "Blog | What's happening in web, mobile, and SaaS development",
    description:
      "Explore expert insights, trends, and best practices in web, mobile, and SaaS development. Stay updated on software engineering, product design, and team growth strategies.",
    alternates: {
      canonical: `${baseUrl}/blog`,
      languages: {
        en: `${baseUrl}/blog`,
        uk: `${baseUrl}/uk/blog`,
        "x-default": `${baseUrl}/blog`,
      },
    },
    openGraph: {
      title: "Blog | What's happening in web, mobile, and SaaS development",
      description: "Explore expert insights, trends, and best practices in web, mobile, and SaaS development.",
      type: "website",
      url: `${baseUrl}/blog`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog | What's happening in web, mobile, and SaaS development",
      description: "Explore expert insights, trends, and best practices in web, mobile, and SaaS development.",
    },
  }
}

export default function BlogPage() {
  return <BlogContent />
}
