"use client"

import { useState, useEffect } from "react"
import { useLocale } from "@/lib/locale-context"

interface FAQItem {
  id: number
  questionEn: string
  questionUk: string
  answerEn: string
  answerUk: string
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    questionEn: "What is out-staffing?",
    questionUk: "Що таке аутстаффінг?",
    answerEn:
      "Out-staffing is a model where developers work remotely as part of your team but remain employed by a software development studio. This allows businesses to scale teams quickly without hiring full-time in-house staff.",
    answerUk:
      "Аустаффінг — це модель, де розробники працюють дистанційно як частина вашої команди, але залишаються працівниками студії розробки програмного забезпечення. Це дозволяє бізнесу швидко масштабувати команди без найму постійного штату на місці.",
  },
  {
    id: 2,
    questionEn: "Why is it better to hire developers through a software development studio than in-house?",
    questionUk:
      "Чому краще найняти розробників через студію розробки програмного забезпечення, ніж у штат?",
    answerEn:
      "Working with a studio provides immediate access to experienced developers, reduces recruitment and HR overhead, offers flexible team scaling, and ensures a structured development process with proven expertise.",
    answerUk:
      "Робота зі студією забезпечує миттєвий доступ до досвідчених розробників, зменшує витрати на найм та HR, пропонує гнучке масштабування команди і забезпечує структурований процес розробки з перевіреною експертизою.",
  },
  {
    id: 3,
    questionEn: "What development methodologies do you use?",
    questionUk: "Які методологій розвитку ви використовуєте?",
    answerEn:
      "We primarily use Agile, Scrum, and Kanban to ensure iterative delivery, transparency, predictable timelines, and efficient project management.",
    answerUk:
      "Ми переважно використовуємо Agile, Scrum і Kanban, щоб забезпечити ітеративну доставку, прозорість, передбачувані строки та ефективне управління проектами.",
  },
  {
    id: 4,
    questionEn: "How does the onboarding process work?",
    questionUk: "Як працює процес адаптації?",
    answerEn:
      "Our onboarding includes detailed project briefings, access to tools and documentation, integration into your workflows, and alignment on communication and reporting standards. Developers are ready to start work quickly.",
    answerUk:
      "Наш процес адаптації включає детальні брифінги проекту, доступ до інструментів і документації, інтеграцію у ваші робочі процеси та узгодження стандартів комунікації та звітності. Розробники готові почати роботу швидко.",
  },
  {
    id: 5,
    questionEn: "Where are your developers located?",
    questionUk: "Де розташовані ваші розробники?",
    answerEn:
      "Our developers are distributed globally but operate in coordinated time zones. This ensures smooth collaboration while providing flexibility and access to top talent.",
    answerUk:
      "Наші розробники розподілені по всьому світу, але працюють у скоординованих часових поясах. Це забезпечує гладку співпрацю, сприяючи гнучкості та доступу до найкращих талантів.",
  },
  {
    id: 6,
    questionEn: "How quickly can you provide a developer?",
    questionUk: "Як швидко ви можете надати розробника?",
    answerEn:
      "Depending on the technology and project requirements, we can provide a qualified developer within 1–3 weeks.",
    answerUk:
      "Залежно від технологій та вимог проекту, ми можемо надати кваліфікованого розробника протягом 1-3 тижнів.",
  },
  {
    id: 7,
    questionEn: "How quickly do you start project implementation?",
    questionUk: "Як швидко ви починаєте реалізацію проекту?",
    answerEn:
      "After onboarding and requirement alignment, we can begin implementation immediately, ensuring minimal delays and fast project ramp-up.",
    answerUk:
      "Після адаптації та узгодження вимог ми можемо розпочати реалізацію негайно, забезпечуючи мінімальні затримки та швидкий запуск проекту.",
  },
  {
    id: 8,
    questionEn: "What if, after some time, the assigned specialist turns out not to be a good fit?",
    questionUk: "Що якщо, через деякий час, призначений фахівець виявиться невідповідною особою?",
    answerEn:
      "The assigned developer works 10 hours on a free dev test drive. If, during the project, the developer does not meet requirements or there are issues in their work, we find a replacement within three days and smoothly integrate the new candidate.",
    answerUk:
      "Призначений розробник працює 10 годин на безплатному тестуванні розробника. Якщо під час проекту розробник не відповідає вимогам або виникають проблеми з його роботою, ми знайдемо заміну протягом трьох днів і плавно інтегруємо нового кандидата.",
  },
]

export function FAQSection() {
  const { locale } = useLocale()
  const [expandedId, setExpandedId] = useState<number | null>(2) // Second item expanded by default
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const checkDarkMode = () => {
      const htmlElement = document.documentElement
      setIsDark(htmlElement.classList.contains("dark"))
    }

    checkDarkMode()

    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  }, [])

  const bgColor = isDark ? "var(--darkgrey1, #323130)" : "#FAF9F8"
  const cardBg = isDark ? "var(--black_bg, #161515)" : "#FFFFFF"
  const textColor = isDark ? "#FFFFFF" : "#212121"
  const mutedText = isDark ? "#EBEBEB" : "#666666"
  const borderColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)"

  const title = locale === "uk" ? "Часті Питання" : "Frequently Asked Questions"

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: bgColor }}>
      <div className="max-w-[1127px] mx-auto px-4">
        {/* Title */}
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-24"
          style={{ color: textColor }}
        >
          {title}
        </h2>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqItems.map((item) => {
            const isExpanded = expandedId === item.id
            const question = locale === "uk" ? item.questionUk : item.questionEn
            const answer = locale === "uk" ? item.answerUk : item.answerEn

            return (
              <div
                key={item.id}
                className="rounded-[14px] overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: isExpanded ? cardBg : "transparent",
                  border: `1px solid ${borderColor}`,
                  background: isExpanded
                    ? isDark
                      ? "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(171, 171, 171, 0.06) 100%), #323130"
                      : "linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(171, 171, 171, 0.1) 100%)"
                    : "transparent",
                }}
              >
                {/* Question Row */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full px-5 md:px-8 py-4 flex items-center justify-between gap-4 hover:opacity-80 transition-opacity"
                >
                  <h3 className="text-lg md:text-2xl font-medium text-left" style={{ color: mutedText }}>
                    {question}
                  </h3>
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-transform duration-300"
                      style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      <path
                        d="M1 5L7 11L13 5"
                        stroke="#FF6200"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                {/* Answer Row */}
                {isExpanded && (
                  <div className="px-5 md:px-8 pb-6 pt-0">
                    <p
                      className="text-base md:text-lg"
                      style={{ color: isDark ? "rgba(255, 255, 255, 0.5)" : "#666666" }}
                    >
                      {answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
