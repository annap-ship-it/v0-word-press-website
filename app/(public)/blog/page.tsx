export const dynamic = 'force-dynamic'  // Makes the page dynamic/SSR—no build issues

import type { Metadata } from "next"
import { headers } from "next/headers"
import BlogContent from "./blog-content"
import { translations } from "@/lib/i18n"

export async function generateMetadata(): Promise<Metadata> {
  const acceptLang = headers().get("accept-language")?.toLowerCase() || "en"
  const locale = acceptLang.includes("uk") || acceptLang.includes("ua") ? "uk" : "en"
  
  const t = translations[locale] || translations.en

  return {
    title: t.blogMetaTitle ?? (locale === "uk" 
      ? "Блог | Що відбувається у веб-, мобільній та SaaS-розробці" 
      : "Blog | What's happening in web, mobile, and SaaS development"),
    description: t.blogMetaDescription ?? (locale === "uk" 
      ? "Експертні інсайти, тренди та найкращі практики у веб-, мобільній та SaaS-розробці. Будьте в курсі новин з інженерії ПЗ, дизайну продуктів та стратегій зростання команд." 
      : "Explore expert insights, trends, and best practices in web, mobile, and SaaS development. Stay updated on software engineering, product design, and team growth strategies."),
    openGraph: {
      title: t.blogMetaTitle,
      description: t.blogMetaDescription,
    },
  }
}

export default function BlogPage() {
  return <BlogContent />
}
