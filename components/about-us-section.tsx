"use client"
import { useLocale } from "@/lib/locale-context"
import { WorldMapWithHover } from "./world-map-with-hover"

type Pin = {
  x: number
  y: number
}

const pins: Pin[] = [
  { x: 163, y: 194 }, // Western Canada
  { x: 370, y: 243 }, // United Kingdom
  { x: 359, y: 244 }, // Netherlands
  { x: 409, y: 239 }, // Belgium
  { x: 380, y: 223 }, // Germany
  { x: 397, y: 212 }, // Poland
  { x: 407, y: 212 }, // Ukraine
]

const content = {
  en: {
    title: "About Us",
    description1:
      "Born in 2023, a young IT studio that expands its operational reach with every project, uniting international talent around your idea.",
    description2:
      "Our team of middle+ engineers helps companies launch faster and scale with confidence. We've streamlined every step from request to delivery to cut delays, raise quality, and ensure full accountability.",
  },
  uk: {
    title: "Про нас",
    description1:
      "Заснована у 2023 році, <strong>Idea Team</strong> - молода IT-студія, яка з кожним проєктом розширює свої можливості, об’єднуючи міжнародні таланти навколо вашої ідеї.",
    description2:
      "Наша команда інженерів рівня middle+ та вище допомагає компаніям швидше запускати продукти та впевнено масштабуватися. Ми оптимізували кожен етап, від запиту до delivery, щоб прискорити запуск ваших продуктів, підвищити якість і забезпечити повну відповідальність за результат.",
  },
}

export function AboutUsSection() {
  const { locale } = useLocale()
  const currentLocale = (locale as keyof typeof content) || "en"
  const texts = content[currentLocale]

  return (
    <section id="about-us" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">{texts.title}</h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <p className="text-base md:text-lg leading-relaxed text-foreground/80">{texts.description1}</p>
            <p className="text-base md:text-lg leading-relaxed text-foreground/80">{texts.description2}</p>
          </div>

          {/* Right: Interactive Map */}
          <div className="relative">
            <div className="relative w-full" style={{ aspectRatio: "755/443" }}>
              <WorldMapWithHover />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
