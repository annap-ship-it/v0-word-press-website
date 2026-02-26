"use client"

import { useLocale } from "@/lib/locale-context"

export function ConsultationBanner() {
  const { locale } = useLocale()

  const isUk = locale === "uk"

  const text = isUk
    ? "Надішліть нам нотатку з вашою ідеєю, і ми зв’яжемося з вами, щоб надати рекомендації щодо реалізації"
    : "Send us a note with your idea, and we’ll get in touch to provide guidance on implementation"

  const buttonText = isUk ? "Отримати консультацію" : "Get Consultation"

  const handleClick = () => {
    // Твій код відкриття форми
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
        {/* Легкий оранжевий блік */}
        <div
          className="
            absolute inset-0 pointer-events-none
            bg-[radial-gradient(ellipse_at_bottom_right,#ff6200_10%,transparent_70%)]
            opacity-70 blur-xl md:blur-2xl
          "
        />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 sm:px-12 md:px-16">
          <p
            className="
              font-medium text-white
              text-xl sm:text-2xl md:text-3xl
              leading-tight tracking-tight
              max-w-4xl mx-auto
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]
            "
          >
            {text}
          </p>

          <button
            onClick={handleClick}
            className="
              mt-6 sm:mt-8
              px-8 sm:px-12 md:px-16
              py-4 sm:py-5
              bg-[#FF6200] hover:bg-[#ff751f] active:bg-[#e55a00]
              text-white font-medium
              text-base sm:text-lg md:text-xl
              rounded-full
              shadow-[0_4px_20px_rgba(255,98,0,0.4)]
              hover:shadow-[0_8px_32px_rgba(255,98,0,0.6)]
              transition-all duration-200
              min-w-[220px] sm:min-w-[260px] md:min-w-[300px]
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