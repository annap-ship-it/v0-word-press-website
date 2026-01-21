import type { Metadata } from "next"
import BlogContent from "./blog-content"
import { translations } from "@/lib/i18n"

export const metadata: Metadata = {
  title: translations.uk.blogMetaTitle ?? "Блог | Що відбувається у веб-, мобільній та SaaS-розробці",
  description:
    translations.uk.blogMetaDescription ??
    "Експертні інсайти, тренди та найкращі практики у веб-, мобільній та SaaS-розробці. Будьте в курсі новин з інженерії ПЗ, дизайну продуктів та стратегій зростання команд.",
  openGraph: {
    title: translations.uk.blogMetaTitle ?? "Блог | Що відбувається у веб-, мобільній та SaaS-розробці",
    description:
      translations.uk.blogMetaDescription ??
      "Експертні інсайти, тренди та найкращі практики у веб-, мобільній та SaaS-розробці.",
  },
}

export default function BlogPage() {
  return <BlogContent />
}
