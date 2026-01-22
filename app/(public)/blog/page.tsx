import type { Metadata } from "next"
import BlogContent from "./blog-content"
import { translations } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "What’s happening in the world of custom software development",
  description:
    "Explore expert insights, trends, and best practices in web, mobile, and SaaS development. Stay updated on software engineering, product design, and team growth strategies.",
  openGraph: {
    title: "Explore expert insights, trends, and best practices in web, mobile, and SaaS development. Stay updated on software engineering, product design, and team growth strategies.",
  },
}

export default function BlogPage() {
  return <BlogContent />
}
