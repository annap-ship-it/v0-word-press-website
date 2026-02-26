"use client"

import { useLocale } from "@/lib/locale-context"

export function ConsultationBanner() {
  const { locale } = useLocale()

  const isUk = locale === "uk"

  const t = {
    text: isUk
      ? "Надішліть нам нотатку з вашою ідеєю, і ми зв’яжемося з вами, щоб надати рекомендації щодо реалізації"
      : "Send us a note with your idea, and we’ll get in touch to provide guidance on implementation",
    button: isUk ? "Отримати консультацію" : "Get Consultation",
  }

  const openConsultation = () => {
    window.dispatchEvent(
      new CustomEvent("open-overlay", {
        detail: { id: "get_consultation_form_Light" },
      })
    )
  }

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div
        className={`
          relative mx-auto overflow-hidden rounded-3xl
          aspect-[5/2.2] xs:aspect-[5/2] sm:aspect-[5/1.8] md:aspect-[5/1.5] lg:aspect-[5/1.3]
          max-w-[95%] sm:max-w-[92%] md:max-w-6xl lg:max-w-7xl
          isolate
        `}
      >
        {/* Base gradient */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r from-[#0f0f0f] via-[#2a1708] to-[#3d1f0a]
          "
        />

        {/* Main orange glow */}
        <div
          className={`
            absolute inset-0 pointer-events-none
            bg-[radial-gradient(ellipse_at_bottom,_#ff6200_8%,_transparent_60%)]
            opacity-70 sm:opacity-80 md:opacity-90
            blur-lg sm:blur-xl md:blur-2xl lg:blur-3xl
          `}
        />

        {/* Subtle side glows */}
        <div
          className={`
            absolute inset-0 pointer-events-none opacity-40 md:opacity-50
            bg-gradient-to-r from-[#ff8a0033] via-transparent to-[#ff620033]
            blur-xl md:blur-2xl
          `}
        />

        {/* Content layer */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5 sm:px-10 md:px-14 lg:px-20">
          <p
            className={`
              font-['Onest'] font-medium
              text-xl xs:text-2xl sm:text-[28px] md:text-3xl lg:text-[34px] xl:text-[38px]
              leading-[1.18] sm:leading-[1.15] tracking-[-0.015em] sm:tracking-[-0.025em]
              text-white max-w-[86%] sm:max-w-3xl md:max-w-4xl
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] sm:drop-shadow-[0_3px_12px_rgba(0,0,0,0.65)]
            `}
          >
            {t.text}
          </p>

          <button
            onClick={openConsultation}
            className={`
              mt-6 sm:mt-7 md:mt-8 lg:mt-9
              px-8 sm:px-10 md:px-12 lg:px-14
              py-3.5 sm:py-4 md:py-4.5 lg:py-5
              bg-[#FF6200] hover:bg-[#ff751f] active:bg-[#e55a00]
              text-white font-['Onest'] font-medium
              text-base sm:text-[17px] md:text-lg lg:text-xl
              rounded-full
              transition-all duration-300 ease-out
              shadow-[0_6px_24px_rgba(255,98,0,0.45)] hover:shadow-[0_10px_36px_rgba(255,98,0,0.6)]
              focus:outline-none focus:ring-4 focus:ring-[#FF6200]/40
              min-w-[200px] sm:min-w-[220px] md:min-w-[260px] lg:min-w-[300px]
            `}
          >
            {t.button}
          </button>
        </div>
      </div>

      {/* Fade-in animation */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .relative.z-10 {
          animation: fadeIn 700ms ease-out forwards;
          animation-delay: 200ms;
        }
      `}</style>
    </section>
  )
}