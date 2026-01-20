import type { Metadata } from "next"

export const generateBlogMetadata = (locale: string = "en"): Metadata => {
  const metadataConfig = {
    en: {
      title: "Blog | Latest Articles on Software Development & IT Insights | Idea Team Dev",
      description:
        "Read our latest articles on software development, outsourcing, IT trends, and best practices. Expert insights from our team of experienced developers.",
      keywords: "software development, outsourcing, IT trends, web development, blog",
      openGraph: {
        title: "Blog | Latest Articles on Software Development | Idea Team Dev",
        description: "Expert insights and articles on software development, outsourcing, and IT trends.",
        type: "website",
      },
    },
    uk: {
      title: "Блог | Останні статті про розробку програмного забезпечення | Idea Team Dev",
      description:
        "Прочитайте наші останні статті про розробку програмного забезпечення, аутсорсинг, тренди IT та найкращі практики. Експертна думка нашої команди.",
      keywords: "розробка програмного забезпечення, аутсорсинг, IT тренди, веб-розробка, блог",
      openGraph: {
        title: "Блог | Останні статті про розробку | Idea Team Dev",
        description: "Експертні статті про розробку програмного забезпечення, аутсорсинг та IT тренди.",
        type: "website",
      },
    },
  }

  return metadataConfig[locale as keyof typeof metadataConfig] || metadataConfig.en
}
