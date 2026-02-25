"use client"

import { useTheme } from "@/lib/theme-context"
import Image from "next/image"
import { useLocale } from "@/lib/locale-context"
import { translations } from "@/lib/i18n"

interface CalculatorResultsProps {
  onClose: () => void
}

export default function CalculatorResults({ onClose }: CalculatorResultsProps) {
  const { theme } = useTheme()
  const { locale } = useLocale()
  const isDark = theme === "dark"

  const t = translations[locale as keyof typeof translations] || translations.en

  const results = [
    {
      icon: "/images/wallet-icon.svg",
      text: t.yourDeveloperRate,
    },
    {
      icon: "/images/team-icon.svg",
      text: t.matchingCandidates,
    },
    {
      icon: "/images/market-rate-icon.svg",
      text: t.averageMarketRate,
    },
  ]

  const candidates = [
    "/male-developer-portrait.png",
    "/female-developer-portrait.png",
    "/female-developer-portrait-casual.jpg",
    "/images/candidate-4.jpg",
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[680px] rounded-2xl p-6 md:p-10 shadow-lg"
        style={{
          backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center transition-opacity hover:opacity-70"
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="4" stroke={isDark ? "#FFFFFF" : "#000000"} strokeWidth="1.5" />
            <path
              d="M8 8L16 16M16 8L8 16"
              stroke={isDark ? "#FFFFFF" : "#000000"}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="flex flex-col gap-[14px] mb-8">
          {results.map((result, index) => (
            <div
              key={index}
              className="flex items-center gap-[14px] p-[14px] rounded-[14px]"
              style={{
                backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5",
              }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-[4px]"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#FF6200",
                }}
              >
                <Image src={result.icon || "/placeholder.svg"} alt="" width={50} height={50} />
              </div>
              <p
                style={{
                  fontFamily: "Onest, sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(16px, 4vw, 24px)",
                  lineHeight: "100%",
                  letterSpacing: "-0.03em",
                  color: "#FFFFFF",
                }}
              >
                {result.text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          {candidates.map((candidate, index) => (
            <div
              key={index}
              className="rounded-full overflow-hidden bg-gray-300"
              style={{
                width: "clamp(60px, 15vw, 90px)",
                height: "clamp(60px, 15vw, 90px)",
              }}
            >
              <Image
                src={candidate || "/placeholder.svg"}
                alt={`Candidate ${index + 1}`}
                width={90}
                height={90}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <button
          className="w-full py-4 rounded-[50px] font-medium transition-all"
          style={{
            backgroundColor: "#FF6200",
            color: "#FFFFFF",
            fontFamily: "Onest, sans-serif",
            fontSize: "clamp(14px, 3.5vw, 18px)",
          }}
          onClick={() => window.open("https://calendar.app.google/sySAYTvgF8Zi264U7", "_blank")}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#FF7A2E"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#FF6200"
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.backgroundColor = "#CC4E00"
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.backgroundColor = "#FF7A2E"
          }}
        >
          {t.bookInterview}
        </button>
      </div>
    </div>
  )
}
