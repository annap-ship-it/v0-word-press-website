// app/blog/page.tsx
import type { Metadata } from "next"
import { headers } from "next/headers"
import BlogContent from "./blog-content"
import { translations } from "@/lib/i18n"

export async function generateMetadata(): Promise<Metadata> {
  const headerList = headers()
  
  // Получаем locale из заголовка, который ставит твой middleware
  // Попробуй эти варианты по порядку (часто встречаются именно такие имена):
  let locale =
    headerList.get("x-locale") ||
    headerList.get("x-dispatch-locale") ||
    headerList.get("next-locale") ||
    headerList.get("x-vercel-ip-locale") ||
    headerList.get("accept-language")?.split(",")[0].split("-")[0] ||
    "en"

  // Приводим к нужному формату (en / uk)
  locale = locale.toLowerCase().startsWith("uk") ? "uk" : "en"

  const t = translations[locale as "en" | "uk"] || translations.en

  // ← Здесь можно добавить логирование для дебага (в production закомментировать)
  // console.log("Locale from headers:", locale)

  return {
    title: t.blogMetaTitle || "Blog | What's happening in web, mobile, and SaaS development",
    description:
      t.blogMetaDescription ||
      "Explore expert insights, trends, and best practices in web, mobile, and SaaS development. Stay updated on software engineering, product design, and team growth strategies.",
    openGraph: {
      title: t.blogMetaTitle,
      description: t.blogMetaDescription,
      // locale: locale,                   // полезно для og
      // type: "website",
      // url: `/blog`,
      // images: "/og-blog.jpg",           // добавь, если есть
    },
  }
}

export default function BlogPage() {
  return <BlogContent />
}
