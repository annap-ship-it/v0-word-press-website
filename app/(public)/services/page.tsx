import { headers } from "next/headers"
import type { Metadata } from "next"
import ServicesContent from "./services-content"

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const pathname = headersList.get("x-pathname") || ""
  const isUkrainian = pathname.includes("/uk")

  const baseUrl = "https://v0-ideateam.vercel.app"

  if (isUkrainian) {
    return {
      title: "Наші послуги | IdeaTeam — IT-студія України",
      description: "Повний спектр послуг: веб-розробка, мобільні додатки, QA автоматизація, DevOps, аналітика. Індивідуальні рішення для вашого бізнесу.",
      keywords: "веб-розробка, мобільні додатки, аутсорсинг, QA тестування, DevOps, аналітика",
      alternates: {
        canonical: `${baseUrl}/uk/services`,
        languages: {
          en: `${baseUrl}/services`,
          uk: `${baseUrl}/uk/services`,
          "x-default": `${baseUrl}/services`,
        },
      },
      openGraph: {
        title: "Наші послуги | IdeaTeam — IT-студія України",
        description: "Повний спектр послуг: веб-розробка, мобільні додатки, QA автоматизація, DevOps, аналітика. Індивідуальні рішення для вашого бізнесу.",
        type: "website",
        url: `${baseUrl}/uk/services`,
      },
      twitter: {
        card: "summary_large_image",
        title: "Наші послуги | IdeaTeam — IT-студія України",
        description: "Повний спектр послуг: веб-розробка, мобільні додатки, QA автоматизація, DevOps, аналітика.",
      },
    }
  }

  return {
    title: "Our Services | Expert Web Development, Mobile Apps & QA | Idea Team Dev",
    description: "Full-spectrum development services: web development, mobile apps, QA automation, DevOps, and data analytics. Custom solutions for your business needs.",
    keywords: "web development, mobile apps, outsourcing, QA testing, DevOps, data analytics",
    alternates: {
      canonical: `${baseUrl}/services`,
      languages: {
        en: `${baseUrl}/services`,
        uk: `${baseUrl}/uk/services`,
        "x-default": `${baseUrl}/services`,
      },
    },
    openGraph: {
      title: "Our Services | Expert Web Development, Mobile Apps & QA | Idea Team Dev",
      description: "Full-spectrum development services: web development, mobile apps, QA automation, DevOps, and data analytics.",
      type: "website",
      url: `${baseUrl}/services`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Our Services | Expert Web Development, Mobile Apps & QA | Idea Team Dev",
      description: "Full-spectrum development services: web development, mobile apps, QA automation, DevOps, and data analytics.",
    },
  }
}

export default function ServicesPage() {
  return <ServicesContent />
}
