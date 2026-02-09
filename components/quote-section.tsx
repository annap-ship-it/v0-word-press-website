"use client"

import Image from "next/image"
import Link from "next/link"
import { useLocale } from "@/lib/locale-context"

// --- Иконки с fill="currentColor" ---
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
    </svg>
  )
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.687c.546-.335 1.074-.16.65.21l-8.15 7.34.002.001-.315 4.71c.447 0 .645-.222.9-.491l2.162-2.04 4.552 3.36c.937.664 1.96.331 2.28-.721l3.715-17.297c.29-.95-.537-1.428-1.54-.932z" />
    </svg>
  )
}

// --- Соцсети блок ---
function SocialLinks() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8">
      <Link
        href="https://www.linkedin.com/company/idea-team-dev/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-5 py-3 rounded-full border border-foreground/20 dark:border-foreground/50 hover:border-foreground transition-colors"
        style={{ border: '1px solid #FFFFFF80' }}
      >
        <LinkedInIcon className="w-6 h-6 text-foreground" />
        <span className="text-foreground/70 hover:text-primary transition-colors">LinkedIn</span>
      </Link>

      <Link
        href="https://t.me/OleksandrRomanov777"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-5 py-3 rounded-full border border-foreground/20 dark:border-foreground/50 hover:border-foreground transition-colors"
        style={{ border: '1px solid #FFFFFF80' }}
      >
        <TelegramIcon className="w-6 h-6 text-foreground" />
        <span className="text-foreground/70 hover:text-primary transition-colors">Telegram</span>
      </Link>
    </div>
  )
}

// --- Основной компонент ---
export function QuoteSection() {
  const { locale } = useLocale()

  const content = {
    en: {
      quote:
        "When I started Idea Team, it was more than only about technology, it also was about giving ideas a chance to grow. And I began by giving my own idea that chance. I've seen how the right people, with expertise and persistence, can transform potential into impact. That's why I brought together specialists who don't just execute but challenge and propose, closing the loop by turning our main goal into our mission and positioning Idea Team exists to support ideas in their technical implementation.\n\nWe may not claim to be the key to success, but we strive to be the partner that helps unlock it",
      name: "Oleksandr Romanov",
      title1: "CEO at Idea Team",
      title2: "CEO & Founder, Devea Team",
      buttonText: "Schedule a Call",
    },
    uk: {
      quote:
        "Коли я починав Idea Team, це було більше ніж просто про технологію, це також було про надання ідеям шансу розвиватися. Я почав з того, що дав шанс своїй ідеї. Я бачив, як правильні люди, з експертизою та наполегливістю, можуть трансформувати потенціал в вплив. Саме тому я зібрав фахівців, які не просто виконують, а й кидають виклик та пропонують рішення, замикаючи цикл, перетворюючи нашу головну мету в нашу місію і позиціонуючи Idea Team як помічника в технічній реалізації ідей.\n\nМи не можемо претендувати на те, що ми ключ до успіху, але ми прагнемо бути партнером, який допомагає його розпочаткувати",
      name: "Олександр Романов",
      title1: "CEO компанії Idea Team",
      title2: "CEO та засновник Devea Team",
      buttonText: "Записатися на розмову",
    },
  }

  const t = content[locale as "en" | "uk"] || content.en

  return (
    <section className="py-16 px-4 md:py-24 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Фото */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-end">
            <div className="relative rounded-3xl overflow-hidden w-full max-w-md aspect-[3/4]">
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/40 via-transparent to-transparent z-0" />
              <Image src="/images/oleksandr-romanov.svg" alt={t.name} fill className="object-cover relative z-10" />
            </div>
          </div>

          {/* Цитата */}
          <div className="order-1 lg:order-2 space-y-8">
            <span className="text-6xl md:text-8xl font-bold text-orange-600 block leading-none">"</span>

            <blockquote className="text-lg md:text-xl lg:text-2xl leading-relaxed text-foreground whitespace-pre-line">
              {t.quote}
            </blockquote>

            {/* Подпись */}
            <div className="space-y-1">
              <p className="text-xl font-semibold text-foreground">{t.name}</p>
              <p className="text-foreground/60">{t.title1}</p>
              
            </div>

            {/* Соцсети */}
            <SocialLinks />

            {/* Кнопка */}
            <Link
              href="https://meetings-eu1.hubspot.com/meetings/oleksandr-romanov?uuid=4e29d5b9-1873-430d-ad6c-8779c8f06a0a"
              target="_blank"
              rel="noopener noreferrer"
            >
             <button
             type="button"
             className={`
      relative overflow-hidden
      flex items-center justify-center
      w-full sm:w-auto px-8 py-4
      rounded-full
      font-[Onest] font-normal text-base leading-[100%]
      text-white
      transition duration-300 ease-out
      bg-[#FF6200]
      cursor-pointer
    `}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "linear-gradient(92.84deg, #FF6200 29.79%, #000000 100.07%)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "#FF6200";
    }}
    onMouseDown={(e) => {
      e.currentTarget.style.background = "linear-gradient(93.96deg, #FF6200 -62.56%, #000000 61.87%)";
    }}
    onMouseUp={(e) => {
      e.currentTarget.style.background = "linear-gradient(92.84deg, #FF6200 29.79%, #000000 100.07%)";
    }}
  >
                {t.buttonText}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
