"use client"

import Image from "next/image"
import Link from "next/link"
import { useLocale } from "@/lib/locale-context"

// --- Иконки с fill="currentColor" ---
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.78v2.16h.07c.66-1.25 2.28-2.56 4.7-2.56 5.03 0 5.95 3.3 5.95 7.59V24h-5v-7.75c0-1.85-.03-4.23-2.57-4.23-2.57 0-2.96 2-2.96 4.09V24h-5V8z" />
    </svg>
  )
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 7L4 12.5L9.526 13.233L12.091 14.864V17.267L19 7Z" />
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
      >
        <LinkedInIcon className="w-6 h-6 text-foreground" />
        <span className="text-foreground/70 hover:text-primary transition-colors">LinkedIn</span>
      </Link>

      <Link
        href="https://t.me/OleksandrRomanov777"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-5 py-3 rounded-full border border-foreground/20 dark:border-foreground/50 hover:border-foreground transition-colors"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
              <p className="text-foreground/60">{t.title2}</p>
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
