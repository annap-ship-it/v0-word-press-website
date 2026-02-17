"use client"

import { useLocale } from "@/lib/locale-context"
import Link from "next/link"
import { useEffect, useState } from "react"

interface ArticleCTABannerProps {
  meetingUrl: string
  isDark?: boolean
}

export function ArticleCTABanner({ meetingUrl, isDark: initialIsDark }: ArticleCTABannerProps) {
  const { locale } = useLocale()
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

  const content = {
    en: {
      title: "Request Your Developer Today and Strengthen Your Development Process with the Idea Team",
      button: "Schedule a Meeting",
    },
    uk: {
      title: "Запросіть розробника сьогодні та посиліть процес розробки з Idea Team",
      button: "Заплануйте зустріч",
    },
  }

  const currentContent = content[locale as "en" | "uk"] || content.en

  return (
    <section
      className="py-12 md:py-16 my-8 md:my-12 rounded-[14px] overflow-hidden"
      style={{
        backgroundColor: isDark ? "#323130" : "#FAF9F8",
        border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
      }}
    >
      <div className="max-w-[1127px] mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <h3
            className="text-2xl md:text-3xl lg:text-4xl font-bold"
            style={{ color: isDark ? "#FFFFFF" : "#1A1A1A" }}
          >
            {currentContent.title}
          </h3>
          <Link
            href={meetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 md:px-10 md:py-4 bg-[#FF6200] text-white font-semibold rounded-lg hover:bg-[#E55A00] transition-colors"
          >
            {currentContent.button}
          </Link>
        </div>
      </div>
    </section>
  )
}
