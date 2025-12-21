"use client"

import { useLocale } from "@/lib/locale-context"
import { Card } from "@/components/ui/card"
import { Users, Target, Award } from "lucide-react"

export default function AboutPage() {
  const { locale } = useLocale()

  const content = {
    en: {
      title: "About Us",
      subtitle: "Learn more about our company and mission",
      mission: "Our Mission",
      missionText: "To deliver innovative solutions that transform businesses and empower people worldwide.",
      vision: "Our Vision",
      visionText: "To be the leading provider of cutting-edge technology solutions in the industry.",
      values: "Our Values",
      valuesText: "Integrity, Innovation, Excellence, and Customer Success",
    },
    uk: {
      title: "Про нас",
      subtitle: "Дізнайтеся більше про нашу компанію та місію",
      mission: "Наша Місія",
      missionText:
        "Надавати інноваційні рішення, які трансформують бізнес та надають можливості людям по всьому світу.",
      vision: "Наше Бачення",
      visionText: "Бути провідним постачальником передових технологічних рішень в індустрії.",
      values: "Наші Цінності",
      valuesText: "Чесність, Інновації, Досконалість та Успіх Клієнтів",
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

      {/* Content Sections */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.mission}</h3>
              <p className="text-foreground/70">{t.missionText}</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.vision}</h3>
              <p className="text-foreground/70">{t.visionText}</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.values}</h3>
              <p className="text-foreground/70">{t.valuesText}</p>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
