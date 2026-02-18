"use client"

import Link from "next/link"
import { useLocale } from "@/lib/locale-context"
import { useEffect, useState } from "react"

interface MeetingBannerProps {
  isDark?: boolean
}

export function MeetingBanner({ isDark = true }: MeetingBannerProps) {
  const { locale } = useLocale()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const title =
    locale === "uk"
      ? "Запросіть розробника сьогодні і розпочніть вже завтра"
      : "Request Your Developer Today and Strengthen Your Development Process with the Idea Team"

  const description =
    locale === "uk"
      ? "Готові масштабувати свою команду розробки? Запишіться на консультацію з нашою командою та знайдіть ідеального розробника для вашого проекту."
      : "Ready to scale your development team? Book a consultation with our team and find the perfect developer for your project."

  const buttonText = locale === "uk" ? "Записатися на зустріч" : "Schedule a Meeting"

  const bgColor = isDark ? "#1A1A1A" : "#FFFFFF"
  const textColor = isDark ? "#FFFFFF" : "#1A1A1A"
  const descColor = isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"

  return (
    <div
      className="rounded-[14px] p-8 md:p-12 lg:p-16 my-16 border border-[#FF6200] border-opacity-20"
      style={{
        backgroundColor: bgColor,
        backgroundImage: isDark
          ? "linear-gradient(135deg, rgba(255, 98, 0, 0.05) 0%, rgba(255, 98, 0, 0) 100%)"
          : "linear-gradient(135deg, rgba(255, 98, 0, 0.02) 0%, rgba(255, 98, 0, 0) 100%)",
      }}
    >
      <div className="max-w-3xl">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4" style={{ color: textColor }}>
          {title}
        </h3>

        <p className="text-base md:text-lg mb-8" style={{ color: descColor }}>
          {description}
        </p>

        <Link
          href="https://meetings-eu1.hubspot.com/meetings/oleksandr-romanov?uuid=4e29d5b9-1873-430d-ad6c-8779c8f06a0a"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-[#FF6200] text-white font-semibold rounded-full hover:bg-[#E55A00] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  )
}
