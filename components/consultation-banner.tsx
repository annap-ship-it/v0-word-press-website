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
        <div className="relative z-10 h-full flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between px-6 sm:px-10 md:px-16 lg:px-24 gap-4 md:gap-0">
          {/* Текст */}
          <p
            className="
              text-white font-medium
              text-xl sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[40px]
              leading-[1.2] tracking-[-0.015em]
              max-w-[90%] sm:max-w-[80%] md:max-w-[55%] lg:max-w-[60%]
              text-center md:text-left
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]
            "
          >
            {text}
          </p>

          {/* Кнопка */}
          <a
            href="https://calendar.app.google/sySAYTvgF8Zi264U7"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center justify-center
              px-[14px] py-[4px]
              min-w-[200px]
              h-[40px]
              bg-[#FF6200]
              text-white font-['Onest'] font-semibold
              text-[16px]
              rounded-[50px]
              tracking-[0.02em]
              transition-all duration-300 ease-out
              animate-dissolve
              hover:bg-gradient-to-r hover:from-[#FF6200] hover:to-[#000000] hover:bg-[length:200%_200%] hover:bg-[92.84deg]
              active:bg-gradient-to-r active:from-[#FF6200] active:to-[#000000] active:bg-[length:200%_200%] active:bg-[93.96deg]
              mt-4 md:mt-0
            "
          >
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  )
}