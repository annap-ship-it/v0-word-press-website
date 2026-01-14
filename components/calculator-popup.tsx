"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "@/lib/theme-context"
import { useLocale } from "@/lib/locale-context"
import { X } from "lucide-react"

export function CalculatorPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const { isDark } = useTheme()
  const { locale } = useLocale()

  const content = {
    en: {
      title: "Developer Rate Calculator",
      description: "Calculate your ideal developer rates and get insights",
      calculate: "Go to Calculator",
      close: "Close",
    },
    uk: {
      title: "Калькулятор ставок розробників",
      description: "Розраховуйте ідеальні ставки розробників та отримуйте рекомендації",
      calculate: "Перейти до калькулятора",
      close: "Закрити",
    },
  }

  const t = content[locale as keyof typeof content] || content.en

  useEffect(() => {
    setIsMounted(true)
    const dismissed = localStorage.getItem("calculator-dismissed")
    if (dismissed) return

    const cookiesHandled = localStorage.getItem("cookies-accepted")

    const showCalculator = () => {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 3500)
      return timer
    }

    // If cookies already handled, show calculator after delay
    if (cookiesHandled !== null) {
      const timer = showCalculator()
      return () => clearTimeout(timer)
    }

    // Otherwise, wait for cookies to be handled
    const handleCookiesHandled = () => {
      const timer = showCalculator()
      // Store timer reference for cleanup
      const cleanup = () => clearTimeout(timer)
      window.addEventListener("beforeunload", cleanup)
    }

    window.addEventListener("cookies-handled", handleCookiesHandled)

    return () => {
      window.removeEventListener("cookies-handled", handleCookiesHandled)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("calculator-dismissed", "true")
  }

  const handleNavigate = () => {
    router.push("/calculator")
    handleClose()
  }

  if (!isMounted || !isVisible) return null

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
      <div className="fixed inset-0 bg-black/50 pointer-events-auto" onClick={handleClose} />
      <div
        className="relative z-50 pointer-events-auto rounded-2xl p-6 md:p-8 max-w-[calc(100vw-32px)] md:max-w-md mx-4 shadow-2xl animate-fade-in"
        style={{
          backgroundColor: isDark ? "var(--black_bg, #161515)" : "#FFFFFF",
          border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #E8E8E8",
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:opacity-70 transition-opacity"
          aria-label="Close"
        >
          <X size={20} color={isDark ? "#FFFFFF" : "#212121"} />
        </button>

        <h2 className="text-xl md:text-2xl font-bold mb-3 pr-8" style={{ color: isDark ? "#FFFFFF" : "#212121" }}>
          {t.title}
        </h2>
        <p className="mb-6 text-sm md:text-base" style={{ color: isDark ? "#CCCCCC" : "#666666" }}>
          {t.description}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleNavigate}
            className="w-full px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors text-sm md:text-base"
          >
            {t.calculate}
          </button>
          <button
            onClick={handleClose}
            className="w-full px-6 py-3 rounded-lg font-medium transition-colors text-sm md:text-base"
            style={{
              backgroundColor: isDark ? "#333333" : "#F0F0F0",
              color: isDark ? "#FFFFFF" : "#212121",
            }}
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  )
}
