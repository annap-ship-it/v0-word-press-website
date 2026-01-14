"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/lib/theme-context"
import { useLocale } from "@/lib/locale-context"

export function CookiesConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { isDark } = useTheme()
  const { locale } = useLocale()

  const content = {
    en: {
      title: "Cookie Settings",
      description: "We use cookies to improve your experience",
      necessary: "Necessary",
      analytics: "Analytics",
      marketing: "Marketing",
      accept: "Accept All",
      deny: "Deny",
    },
    uk: {
      title: "Параметри файлів cookie",
      description: "Ми використовуємо файли cookie для покращення вашого досвіду",
      necessary: "Необхідні",
      analytics: "Аналітика",
      marketing: "Маркетинг",
      accept: "Прийняти все",
      deny: "Відхилити",
    },
  }

  const t = content[locale as keyof typeof content] || content.en

  useEffect(() => {
    setIsMounted(true)
    const accepted = localStorage.getItem("cookies-accepted")
    if (!accepted) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookies-accepted", "true")
    window.dispatchEvent(new CustomEvent("cookies-handled"))
    setIsVisible(false)
  }

  const handleDeny = () => {
    localStorage.setItem("cookies-accepted", "false")
    window.dispatchEvent(new CustomEvent("cookies-handled"))
    setIsVisible(false)
  }

  if (!isMounted || !isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:right-auto md:left-8 md:bottom-8 z-50 pointer-events-auto">
      <div className="flex flex-col items-center md:items-start gap-4 max-w-sm mx-auto md:mx-0">
        {/* Cookie Icon */}
        <div className="relative self-start">
          <svg
            width="101"
            height="101"
            viewBox="0 0 101 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 md:w-24 md:h-24"
          >
            <g filter="url(#filter0_d_445_2424)">
              <path
                d="M10.1 46.1C10.1 24.0086 28.0086 6.09998 50.1 6.09998C72.1914 6.09998 90.1 24.0086 90.1 46.1C90.1 68.1914 72.1914 86.1 50.1 86.1C28.0086 86.1 10.1 68.1914 10.1 46.1Z"
                fill="url(#paint0_linear_445_2424)"
              />
              <path
                d="M67.1 45.2515V47.064C65.8676 66.0285 38.9604 69.2636 33.6922 50.8693C33.4902 50.1661 32.8294 47.8072 33.2226 47.319C34.3658 46.7999 35.6765 47.5085 37.0472 47.1605C39.512 46.5339 40.5715 43.4463 39.5539 41.1985C39.2681 40.5646 38.3379 39.7959 38.7584 39.0873C39.1061 38.5044 40.3094 39.1091 40.9101 39.08C43.9793 38.9306 46.0545 35.3931 44.4398 32.6844C43.9975 31.943 42.2481 31.0122 43.7954 30.1761C46.5606 28.6842 51.9726 28.9247 54.9252 29.8027C61.6607 31.8046 66.6704 38.2111 67.1 45.2533V45.2515ZM34.688 48.6961C36.3755 58.2194 45.8797 63.8444 55.1109 60.8862C60.7742 59.0719 65.1977 53.4669 65.651 47.5139C66.4993 36.344 56.0593 27.9884 45.3719 31.3018C48.0114 35.2273 45.7596 40.1766 41.0248 40.5427C42.9216 44.8836 39.3919 49.6506 34.688 48.6979V48.6961Z"
                fill="white"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_445_2424"
                x="-1.90735e-06"
                y="-2.47955e-05"
                width="100.2"
                height="100.2"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feMorphology radius="1" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_445_2424" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="4.55" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.281386 0 0 0 0 0.172063 0 0 0 0 0.103823 0 0 0 0.1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_445_2424" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_445_2424" result="shape" />
              </filter>
              <linearGradient
                id="paint0_linear_445_2424"
                x1="25.3"
                y1="6.09997"
                x2="109.102"
                y2="43.3453"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FF6200" />
                <stop offset="1" stopColor="#FFD100" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Settings Panel */}
        <div
          className="rounded-2xl p-4 md:p-6 space-y-4 w-full max-w-[320px] animate-fade-in"
          style={{
            backgroundColor: isDark ? "var(--black_bg, #161515)" : "#FFFFFF",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #E8E8E8",
          }}
        >
          <h3 className="text-base md:text-lg font-bold" style={{ color: isDark ? "#FFFFFF" : "#212121" }}>
            {t.title}
          </h3>
          <p className="text-xs md:text-sm" style={{ color: isDark ? "#999999" : "#666666" }}>
            {t.description}
          </p>

          {/* Toggle Options */}
          <div className="space-y-3">
            {[
              { label: t.necessary, enabled: true },
              { label: t.analytics, enabled: false },
              { label: t.marketing, enabled: false },
            ].map((option) => (
              <div key={option.label} className="flex items-center justify-between">
                <span className="text-xs md:text-sm" style={{ color: isDark ? "#CCCCCC" : "#333333" }}>
                  {option.label}
                </span>
                <div
                  className="w-10 h-6 rounded-full flex items-center px-1 transition-colors cursor-pointer flex-shrink-0"
                  style={{
                    backgroundColor: option.enabled ? "#FF6200" : "#E0E0E0",
                  }}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      option.enabled ? "translate-x-4" : ""
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleDeny}
              className="flex-1 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-colors"
              style={{
                backgroundColor: isDark ? "#333333" : "#F0F0F0",
                color: isDark ? "#FFFFFF" : "#212121",
              }}
            >
              {t.deny}
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors"
            >
              {t.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
