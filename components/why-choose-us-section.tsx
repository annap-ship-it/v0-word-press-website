"use client"

import Image from "next/image"
import { useLocale } from "@/lib/locale-context"

export function WhyUsSection() {
  const { locale } = useLocale()

  const content = {
    en: {
      section1: {
        title: "Your Idea",
        description:
          "We work with SaaS startups in the finance and healthcare niches. We also have extensive experience in e-commerce, with more than 10 completed projects. If you need to strengthen your technical team or build an MVP, we will do it with a structured approach by integrating our specialists, business analysts, PMs, and CTOs.",
      },
      section2: {
        title: "Our Team",
        description:
          "Our team includes more than thirty specialists at mid-level and above. We take on both end-to-end development and the integration of our developers into your established teams. Thanks to the support of PMs and well-organized processes, we implement solutions of any technical complexity within deadlines and take full responsibility for our work.",
      },
      section3: {
        title: "Your Success",
        description: "We help fast-moving SaaS startups deliver faster and overcome tech debt.",
        benefits: [
          "Cut delivery time by 17%",
          "Clean up legacy code, automate CI/CD, and boost release speed by 30%",
          "Build secure, API-first platforms with 99.9% uptime and 60% faster incident response",
          "Reduce churn by up to 14% with real-time analytics and flexible billing flows",
        ],
      },
    },
    uk: {
      section1: {
        title: "Ваша ідея",
        description:
          "Ми працюємо з SaaS стартапами у сфері фінансів та охорони здоров'я. Також маємо великий досвід у галузі електронної комерції з більш ніж 10 завершеними проектами. Якщо вам потрібно посилити вашу технічну команду або побудувати MVP, ми це зробимо структурованим підходом, інтегруючи наших спеціалістів, бізнес-аналітиків, PM-ів та CTO-ів.",
      },
      section2: {
        title: "Наша команда",
        description:
          "Наша команда складається з більш ніж тридцяти спеціалістів середнього та вищого рівнів. Ми беремося за комплексну розробку та інтеграцію наших розробників в ваші існуючі команди. Завдяки підтримці PM-ів та добре організованим процесам, ми впроваджуємо рішення будь-якої технічної складності в межах термінів і беремо повну відповідальність за нашу роботу.",
      },
      section3: {
        title: "Ваш успіх",
        description: "Ми допомагаємо динамічним SaaS стартапам доставляти швидше та подолати технічний борг.",
        benefits: [
          "Скоротити час доставки на 17%",
          "Очистити код спадщини, автоматизувати CI/CD та збільшити швидкість випуску на 30%",
          "Побудувати безпечні платформи на основі API з часом безперервної роботи 99,9% та на 60% швидшою реакцією на інциденти",
          "Зменшити відтік на 14% за допомогою аналітики в реальному часі та гнучких потоків виставлення рахунків",
        ],
      },
    },
  }

  const currentContent = content[locale as keyof typeof content] || content.en

  return (
    <section className="py-16 px-4 md:py-24 dark:bg-[oklch(0.32_0_0)]">
      <div className="max-w-7xl mx-auto">
        {/* Основные блоки с чередованием */}
        <div className="space-y-24 lg:space-y-32">
          {/* Блок 1: Your Idea — текст слева, изображение справа (прижато к правому краю) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground">{currentContent.section1.title}</h3>
              <p className="text-base md:text-lg leading-relaxed text-foreground/80">
                {currentContent.section1.description}
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <Image
                src="/images/icon1.svg"
                alt={currentContent.section1.title}
                width={380}
                height={390}
                className="w-full max-w-[326px] md:max-w-[380px] object-contain animate-float"
                priority
              />
            </div>
          </div>

          {/* Блок 2: Our Team — изображение слева, текст справа */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <Image
                src="/images/2.svg"
                alt={currentContent.section2.title}
                width={380}
                height={390}
                className="w-full max-w-[326px] md:max-w-[380px] object-contain animate-float"
              />
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground">{currentContent.section2.title}</h3>
              <p className="text-base md:text-lg leading-relaxed text-foreground/80">
                {currentContent.section2.description}
              </p>
            </div>
          </div>

          {/* Блок 3: Your Success — текст слева, изображение справа (прижато к правому краю) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground">{currentContent.section3.title}</h3>
              <p className="text-base md:text-lg leading-relaxed mb-6 text-foreground/80">
                {currentContent.section3.description}
              </p>
              <ul className="space-y-4 text-base md:text-lg text-foreground/80">
                {currentContent.section3.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-[11px]">
                    <span className="text-primary mt-1.5 flex-shrink-0">
                      <img
                        src="/icons/tech/bullet.svg"
                        alt=""
                        className="mt-[5px] w-2 h-2 flex-shrink-0"
                      />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center lg:justify-end">
              <Image
                src="/images/your-success.svg"
                alt={currentContent.section3.title}
                width={380}
                height={390}
                className="w-full max-w-[326px] md:max-w-[380px] object-contain animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
