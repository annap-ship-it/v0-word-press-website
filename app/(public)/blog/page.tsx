import type { Metadata } from "next"
import BlogContent from "./blog-content"
import { translations } from "@/lib/i18n"

export const metadata: Metadata = {
  title: translations.en.blogMetaTitle,           // тепер ключ існує → не помилка
  description: translations.en.blogMetaDescription,
  openGraph: {
    title: translations.en.blogMetaTitle,
    description: translations.en.blogMetaDescription,
  },
}

export default function BlogPage() {
  return <BlogContent />
}
