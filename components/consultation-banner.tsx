"use client"

import { useLocale } from "@/lib/locale-context"
import { useState, useEffect } from "react"

export function ConsultationBanner() {
  const localeData = useLocale() || { locale: "en" } // захист від undefined на сервері
  const { locale } = localeData

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-full h-64 bg-gradient-to-br from-[#1a1a1a] to-[#3d1f0a]" /> // placeholder, щоб уникнути hydration mismatch
  }

  const isUk = locale === "uk"

  const text = isUk
    ? "Надішліть нам нотатку з вашою ідеєю, і ми зв’яжемося з вами, щоб надати рекомендації щодо реалізації"
    : "Send us a note with your idea, and we’ll get in touch to provide guidance on implementation"

  const buttonText = isUk ? "Отримати консультацію" : "Get Consultation"

  const handleClick = () => {
    // Безпечний виклик тільки на клієнті
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("open-overlay", {
          detail: { id: "get_consultation_form_Light" },
        })
      )
    }
  }

  return (
    <div className="w-full py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div
        className="
          relative mx-auto rounded-3xl overflow-hidden
          bg-gradient-to-br from-[#0f0f0f] via-[#2a1708] to-[#3d1f0a]
          max-w-[95%] sm:max-w-[90%] md:max-w-6xl
          aspect-[5/2.5] sm:aspect-[5/2] md:aspect-[5/1.6]
        "
      >
        <div
          className="
            absolute inset-0 pointer-events-none
            bg-[radial-gradient(ellipse_at_bottom_right,#ff6200_10%,transparent_70%)]
            opacity-70 blur-xl md:blur-2xl
          "
        />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 sm:px-12 md:px-16">
          <p className="text-white text-xl sm:text-2xl md:text-3xl font-medium leading-tight tracking-tight max-w-4xl mx-auto mb-8 drop-shadow-md">
            {text}
          </p>

          <button
            onClick={handleClick}
            className="
              px-10 py-4 bg-[#FF6200] text-white font-medium text-lg rounded-full
              hover:bg-[#ff751f] transition-all duration-200
              shadow-lg hover:shadow-xl
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