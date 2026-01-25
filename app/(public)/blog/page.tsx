import type { Metadata } from "next"
import BlogContent from "./blog-content"
import { translations } from "@/lib/i18n"

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
  return <BlogContent />
}
