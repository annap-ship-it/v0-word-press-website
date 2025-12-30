"use client"

import Image from "next/image"
import Link from "next/link"

export function QuoteSection() {
  return (
    <section className="py-16 px-4 md:py-24 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Фото — сверху на мобильных, слева на десктопе */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-end">
            <div className="relative rounded-3xl overflow-hidden w-full max-w-md aspect-[3/4]">
              <Image
                src="/images/oleksandr-romanov.svg" // ← замени на реальный путь
                alt="Oleksandr Romanov"
                fill
                className="object-cover"
              />
              {/* Оранжевый градиент снизу */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Цитата — снизу на мобильных, справа на десктопе */}
          <div className="order-1 lg:order-2 space-y-8 lg:space-y-10">
            {/* Открывающая кавычка */}
            <span className="text-6xl md:text-8xl font-bold text-primary block">“</span>

            {/* Текст цитаты */}
            <blockquote className="text-m md:text-lg lg:text-xl leading-relaxed text-foreground">
              When I started Idea Team, it was more than only about technology, it also was about giving ideas a
              chance to grow. And I began by giving my own idea that chance. I’ve seen how the right people, with
              expertise and persistence, can transform potential into impact. That’s why I brought together
              specialists who don’t just execute but challenge and propose, closing the loop by turning our main
              goal into our mission and positioning Idea Team exists to support ideas in their technical
              implementation.
              <br />
              <br />
              We may not claim to be the key to success, but we strive to be the partner that helps unlock it
            </blockquote>

            {/* Подпись */}
            <div className="space-y-1">
              <p className="text-xl font-semibold text-foreground">Oleksandr Romanov</p>
              <p className="text-foreground/50">CEO at Idea Team</p>
              <p className="text-foreground/50">CEO & Founder, Devea Team</p>
            </div>

            {/* Соцсети и кнопка */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
              <div className="flex gap-6">
                <Link
                  href="https://www.linkedin.com/in/oleksandr-romanov-idea-team/" // ← реальная ссылка
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-primary transition-colors"
                >
                  LinkedIn
                </Link>
                <Link
                  href="https://t.me/oleksandr_romanov" // ← реальная ссылка
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-primary transition-colors"
                >
                  Telegram
                </Link>
              </div>

              <Link
                href="https://meetings-eu1.hubspot.com/meetings/oleksandr-romanov?uuid=4e29d5b9-1873-430d-ad6c-8779c8f06a0a"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
                  Schedule a Call
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
