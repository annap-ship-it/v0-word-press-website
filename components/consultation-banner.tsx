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
    return <div className="w-full h-[220px] md:h-[300px] bg-[#0f0f0f]" />
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
    <div className="w-full py-10 sm:py-12 md:py-16 lg:py-20 px-5 sm:px-8 md:px-10 lg:px-12">
      <div
        className="
          relative mx-auto rounded-3xl overflow-hidden
          bg-gradient-to-br from-[#0f0f0f] via-[#1a0f00] to-[#2a1708]
          max-w-[96%] sm:max-w-[92%] md:max-w-6xl lg:max-w-7xl
          aspect-[5/3] sm:aspect-[5/2.6] md:aspect-[5/1.9] lg:aspect-[5/1.45]
        "
      >
        {/* Оранжевий glow */}
        <div
          className="
            absolute inset-0 pointer-events-none
            bg-[radial-gradient(ellipse_at_bottom,_#ff6200_12%,transparent_70%)]
            opacity-70 md:opacity-90 blur-xl md:blur-3xl
          "
        />

        {/* Контент */}
        <div className="relative z-10 h-full flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between px-6 sm:px-10 md:px-12 lg:px-16 xl:px-24 gap-5 md:gap-0">
          {/* Текст */}
          <p
            className="
              text-white font-medium
              text-xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[40px]
              leading-[1.2] tracking-[-0.015em]
              max-w-[90%] sm:max-w-[80%] md:max-w-[55%] lg:max-w-[60%]
              text-center md:text-left
              drop-shadow-[0_3px_12px_rgba(0,0,0,0.7)]
            "
          >
            {text}
          </p>

          {/* Кнопка */}
          <button
            onClick={handleClick}
            className="
              px-[14px] py-[4px]
              min-w-[200px]
              h-[40px]
              bg-[#FF6200] text-white font-['Onest'] font-semibold
              text-[16px]
              rounded-[50px]
              tracking-[0.02em]
              transition-all duration-300 ease-out
              shadow-[0_4px_16px_rgba(255,98,0,0.4)]
              hover:shadow-[0_8px_32px_rgba(255,98,0,0.6)]
              hover:scale-[1.02]
              active:scale-[0.98]
              animate-dissolve
              mt-5 md:mt-0
            "
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  )
}