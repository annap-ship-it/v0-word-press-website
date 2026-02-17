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

interface ArticleFAQSectionProps {
  faqItems: FAQItem[]
  isDark?: boolean
}

export function ArticleFAQSection({ faqItems, isDark: initialIsDark }: ArticleFAQSectionProps) {
  const { locale } = useLocale()
  const [expandedId, setExpandedId] = useState<number | null>(1)
  const [isDark, setIsDark] = useState(initialIsDark ?? true)

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
