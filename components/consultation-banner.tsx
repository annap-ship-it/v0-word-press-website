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

  if (!mounted) {
    return <div className="w-full h-[200px] md:h-[300px] bg-[#0f0f0f]" />
  }

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
          bg-gradient-to-br from-[#0f0f0f] via-[#1a0f00] to-[#2a1708]
          max-w-[95%] sm:max-w-[92%] md:max-w-6xl lg:max-w-7xl
          aspect-[5/2.8] sm:aspect-[5/2.2] md:aspect-[5/1.8] lg:aspect-[5/1.4]
        "
      >
        {/* Основний оранжевий glow */}
        <div
          className="
            absolute inset-0 pointer-events-none
            bg-[radial-gradient(ellipse_at_bottom,_#ff6200_10%,transparent_68%)]
            opacity-75 md:opacity-90 blur-xl md:blur-3xl lg:blur-4xl
          "
        />

        {/* Контент: текст + кнопка */}
        <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 md:px-12 lg:px-16 xl:px-24 gap-6 md:gap-0">
          <p
            className="
              text-white font-medium
              text-xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[40px]
              leading-[1.15] tracking-[-0.02em]
              max-w-[90%] md:max-w-[60%] lg:max-w-[65%]
              text-center md:text-left
              drop-shadow-[0_3px_12px_rgba(0,0,0,0.7)]
            "
          >
            {text}
          </p>

          <button
            onClick={handleClick}
            className="
              px-6 md:px-7 lg:px-8
              py-3 md:py-3.5
              min-w-[180px] md:min-w-[200px]
              h-10 md:h-[40px]
              bg-[#FF6200] text-white font-['Onest'] font-semibold
              text-base md:text-[16px]
              rounded-[50px]
              tracking-[0.02em]
              transition-all duration-300 ease-out
              shadow-[0_4px_16px_rgba(255,98,0,0.4)]
              hover:shadow-[0_8px_32px_rgba(255,98,0,0.6)]
              hover:scale-[1.02]
              active:scale-[0.98]
              animate-dissolve
            "
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}