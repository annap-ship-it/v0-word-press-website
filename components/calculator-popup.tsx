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
    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 3500)
      return () => clearTimeout(timer)
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
        className="relative z-50 pointer-events-auto rounded-2xl p-8 max-w-md mx-4 shadow-2xl animate-fade-in"
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

        <h2 className="text-2xl font-bold mb-3" style={{ color: isDark ? "#FFFFFF" : "#212121" }}>
          {t.title}
        </h2>
        <p className="mb-6" style={{ color: isDark ? "#CCCCCC" : "#666666" }}>
          {t.description}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleNavigate}
            className="w-full px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
          >
            {t.calculate}
          </button>
          <button
            onClick={handleClose}
            className="w-full px-6 py-3 rounded-lg font-medium transition-colors"
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
