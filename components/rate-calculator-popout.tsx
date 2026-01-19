"use client"

import Image from "next/image"
import { useTheme } from "@/lib/theme-context"
import { useLocale } from "@/lib/locale-context"
import { translations } from "@/lib/i18n"
import { useEffect, useState } from "react"

interface RateCalculatorPopoutProps {
  isOpen: boolean
  onClose: () => void
  onCalculateClick: () => void
}

export default function RateCalculatorPopout({ isOpen, onClose, onCalculateClick }: RateCalculatorPopoutProps) {
  const { theme } = useTheme()
  const { locale } = useLocale()
  const t = translations[locale as keyof typeof translations] || translations.en
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isLightMode = mounted && theme === "light"

  if (!isOpen) return null

  const handleCalculateClick = () => {
    onCalculateClick()
  }

  return (
    <div
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 pointer-events-none"
      style={{
        animation: "fadeIn 300ms ease-out",
      }}
    >
      <div
        className="relative pointer-events-auto w-full max-w-[360px]"
        style={{
          borderRadius: "14px",
          background: isLightMode
            ? "linear-gradient(131.04deg, #FF6200 -4.14%, #FFFFFF 82.16%)"
            : "linear-gradient(145.38deg, #FF6200 -45.15%, #161515 77.65%)",
          boxShadow: "0px 4px 9.2px 0px rgba(0, 0, 0, 0.25)",
          padding: "clamp(20px, 5vw, 30px)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-[10px] right-[10px] w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity"
          aria-label="Close"
          style={{
            filter: isLightMode ? "invert(1)" : "none",
          }}
        >
          <Image src="/images/x-square-20-281-29.svg" alt="Close" width={24} height={24} />
        </button>

        <h3
          className="text-xl sm:text-2xl font-bold mb-2"
          style={{
            color: isLightMode ? "#161515" : "#FFFFFF",
          }}
        >
          {t.calculatorTitle}
        </h3>

        <p
          className="mb-4"
          style={{
            fontSize: "clamp(16px, 4vw, 20px)",
            lineHeight: "110%",
            letterSpacing: "-0.03em",
            color: isLightMode ? "#000000" : "#FFFFFF",
          }}
        >
          {locale === "uk" ? (
            <>
              Виберіть <span style={{ color: "#FF6200" }}>спеціаліста</span>, отримайте{" "}
              <span style={{ color: "#FF6200" }}>ставку</span> миттєво
            </>
          ) : (
            <>
              Choose a <span style={{ color: "#FF6200" }}>specialist</span>, get the{" "}
              <span style={{ color: "#FF6200" }}>rate</span> on the spot
            </>
          )}
        </p>

        <button
          onClick={handleCalculateClick}
          className="w-full max-w-[300px] h-[30px] rounded-[50px] bg-[#FF6200] text-white font-medium hover:bg-[#E55800] transition-colors"
          style={{
            padding: "4px 14px",
            fontSize: "clamp(14px, 3.5vw, 16px)",
          }}
        >
          {t.calculate}
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
