"use client"

import { useLocale } from "@/lib/locale-context"
import { Card } from "@/components/ui/card"
import { Code, Palette, Rocket, Shield } from "lucide-react"

export default function ServicesPage() {
  const { locale } = useLocale()

  const content = {
    en: {
      title: "Our Services",
      subtitle: "Comprehensive solutions for your business needs",
      services: [
        {
          icon: Code,
          title: "Web Development",
          description: "Custom web applications built with modern technologies and best practices.",
        },
        {
          icon: Palette,
          title: "Design Services",
          description: "Beautiful, user-friendly designs that engage and convert your audience.",
        },
        {
          icon: Rocket,
          title: "Digital Marketing",
          description: "Strategic marketing campaigns to grow your online presence and reach.",
        },
        {
          icon: Shield,
          title: "Cybersecurity",
          description: "Protect your business with comprehensive security solutions and monitoring.",
        },
      ],
    },
    uk: {
      title: "Наші Послуги",
      subtitle: "Комплексні рішення для потреб вашого бізнесу",
      services: [
        {
          icon: Code,
          title: "Веб Розробка",
          description: "Спеціальні веб-додатки, створені з використанням сучасних технологій та кращих практик.",
        },
        {
          icon: Palette,
          title: "Дизайн Послуги",
          description: "Красивий, зручний дизайн, який залучає та конвертує вашу аудиторію.",
        },
        {
          icon: Rocket,
          title: "Цифровий Маркетинг",
          description: "Стратегічні маркетингові кампанії для розвитку вашої онлайн присутності та охоплення.",
        },
        {
          icon: Shield,
          title: "Кібербезпека",
          description: "Захистіть свій бізнес за допомогою комплексних рішень безпеки та моніторингу.",
        },
      ],
    },
  }

  const t = content[locale]

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4 text-balance">{t.title}</h1>
          <p className="text-xl text-foreground/80 text-balance">{t.subtitle}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                      <p className="text-foreground/70 leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
