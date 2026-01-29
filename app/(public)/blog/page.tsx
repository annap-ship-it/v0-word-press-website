import type { Metadata } from "next"
import BlogContent from "./blog-content"
import { translations } from "@/lib/i18n"

// Dynamic metadata based on current locale would be ideal, but Next.js Metadata API is static
// The content component handles locale switching dynamically
export const metadata: Metadata = {
  title: "Blog | Software Development Insights | IdeaTeam",
  description:
    "Explore expert insights, trends, and best practices in web, mobile, and SaaS development. Stay updated on software engineering, product design, and outsourcing strategies.",
  openGraph: {
    title: "Blog | Software Development Insights | IdeaTeam",
    description: "Explore expert insights, trends, and best practices in web, mobile, and SaaS development.",
    type: "website",
  },
  alternates: {
    languages: {
      en: "/blog",
      uk: "/blog", // Ukrainian content is served dynamically based on locale
    },
  },
}

export default function BlogPage() {
  return <BlogContent />
}
