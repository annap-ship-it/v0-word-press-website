"use client"

import { useLocale } from "@/lib/locale-context"
import { useState, useEffect } from "react"

export function ConsultationBanner() {
  const localeCtx = useLocale() || { locale: "en" }
  const { locale } = localeCtx

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="w-full h-64 bg-[#0f0f0f]" />

  const isUk = locale === "uk"

  const text = isUk
    ? "Надішліть нам нотатку з вашою ідеєю, і ми зв’яжемося з вами, щоб надати рекомендації щодо реалізації"
    : "Send us a note with your idea, and we’ll get in touch to provide guidance on implementation"

  const buttonText = isUk ? "Отримати консультацію" : "Get Consultation"

  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-overlay", {
          detail: { id: "get_consultation_form_dark" },
        })
      )
    }
  }

  return (
    <div className="w-full py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div
        className="
          relative mx-auto rounded-3xl overflow-hidden
          bg-gradient-to-br from-[#0f0f0f] via-[#1e1205] to-[#2a1708]
          max-w-[95%] sm:max-w-[92%] md:max-w-6xl lg:max-w-7xl
          aspect-[5/2.5] xs:aspect-[5/2.2] sm:aspect-[5/1.9] md:aspect-[5/1.6] lg:aspect-[5/1.35]
        "
      >
        {/* Легкий оранжевий блік знизу */}
        <div
          className="
            absolute inset-0 pointer-events-none
            bg-[radial-gradient(ellipse_at_bottom,_#ff6200_8%,transparent_65%)]
            opacity-70 md:opacity-85 blur-xl md:blur-2xl lg:blur-3xl
          "
        />

        <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 md:px-12 lg:px-16 xl:px-24">
          {/* Текст — ліворуч на десктопі, центр на мобілці */}
          <p
            className="
              text-white font-medium
              text-xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[38px]
              leading-[1.18] tracking-[-0.02em]
              max-w-[90%] md:max-w-[55%] lg:max-w-[60%]
              text-center md:text-left
              drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]
            "
          >
            {text}
          </p>

          {/* Кнопка — праворуч на десктопі, центр на мобілці */}
          <button
            onClick={handleClick}
            className="
              mt-6 md:mt-0
              px-6 md:px-7 lg:px-8
              py-3 md:py-3.5
              min-w-[180px] md:min-w-[200px]
              h-10 md:h-11
              bg-[#FF6200] text-white font-medium
              text-base md:text-lg
              rounded-[50px]
              transition-all duration-300 ease-out
              shadow-[0_4px_20px_rgba(255,98,0,0.35)]
              hover:shadow-[0_8px_32px_rgba(255,98,0,0.55)]
              hover:scale-[1.02]
              active:scale-[0.98]
              animate-dissolve
              md:relative md:left-auto md:top-auto
            "
            style={{
              // Hover градієнт
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}