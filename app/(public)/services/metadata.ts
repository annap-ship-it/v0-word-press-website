import type { Metadata } from "next"

export const generateServicesMetadata = (locale: string = "en"): Metadata => {
  const metadataConfig = {
    en: {
      title: "Professional Software Development Services | Idea Team Dev",
      description:
        "Explore our full range of software development services including web development, mobile apps, QA automation, DevOps, and data analytics. Get custom solutions tailored to your business needs.",
      keywords: "software development, web development, mobile apps, QA testing, DevOps, data analytics",
      openGraph: {
        title: "Professional Software Development Services | Idea Team Dev",
        description:
          "Custom software development services for web, mobile, QA automation, DevOps, and data analytics.",
        type: "website",
      },
    },
    uk: {
      title: "Професійні послуги розробки програмного забезпечення | Idea Team Dev",
      description:
        "Переглянете наш повний спектр послуг розробки, включаючи веб-розробку, мобільні додатки, автоматизоване тестування, DevOps та аналітику даних. Отримайте кастомні рішення, адаптовані до ваших потреб.",
      keywords: "розробка програмного забезпечення, веб-розробка, мобільні додатки, тестування, DevOps, аналітика даних",
      openGraph: {
        title: "Професійні послуги розробки програмного забезпечення | Idea Team Dev",
        description: "Кастомні рішення для веб, мобільних додатків, тестування, DevOps та аналітики.",
        type: "website",
      },
    },
  }

  return metadataConfig[locale as keyof typeof metadataConfig] || metadataConfig.en
}
