// components/WhyUsSection.tsx
"use client"

import Image from "next/image"

export function WhyUsSection() {
  return (
    <section className="py-16 px-4 md:py-24 dark:bg-[oklch(0.32_0_0)]">
      <div className="max-w-7xl mx-auto">
        {/* Основные блоки с чередованием */}
        <div className="space-y-24 lg:space-y-32">
          {/* Блок 1: Your Idea — текст слева, изображение справа (прижато к правому краю) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground">Your Idea</h3>
              <p className="text-base md:text-lg leading-relaxed text-foreground/80">
                We work with SaaS startups in the finance and healthcare niches. We also have extensive experience in
                e-commerce, with more than 10 completed projects. If you need to strengthen your technical team or build
                an MVP, we will do it with a structured approach by integrating our specialists, business analysts, PMs,
                and CTOs.
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <Image
                src="/images/icon1.svg"
                alt="Your Idea"
                width={380}
                height={390}
                className="w-full max-w-[326px] md:max-w-[380px] object-contain animate-float"
                priority
              />
            </div>
          </div>

          {/* Блок 2: Our Team — изображение слева, текст справа */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <Image
                src="/images/2.svg"
                alt="Our Team"
                width={380}
                height={390}
                className="w-full max-w-[326px] md:max-w-[380px] object-contain animate-float"
              />
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground">Our Team</h3>
              <p className="text-base md:text-lg leading-relaxed text-foreground/80">
                Our team includes more than thirty specialists at mid-level and above. We take on both end-to-end
                development and the integration of our developers into your established teams. Thanks to the support of
                PMs and well-organized processes, we implement solutions of any technical complexity within deadlines
                and take full responsibility for our work.
              </p>
            </div>
          </div>

          {/* Блок 3: Your Success — текст слева, изображение справа (прижато к правому краю) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground">Your Success</h3>
              <p className="text-base md:text-lg leading-relaxed mb-6 text-foreground/80">
                We help fast-moving SaaS startups deliver faster and overcome tech debt.
              </p>
              <ul className="space-y-4 text-base md:text-lg text-foreground/80">
                <li className="flex items-start gap-4">
                  <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                  <span>Cut delivery time by 17%</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                  <span>Clean up legacy code, automate CI/CD, and boost release speed by 30%</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                  <span>Build secure, API-first platforms with 99.9% uptime and 60% faster incident response</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                  <span>Reduce churn by up to 14% with real-time analytics and flexible billing flows</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center lg:justify-end">
              <Image
                src="/images/your-success.svg"
                alt="Your Success"
                width={380}
                height={390}
                className="w-full max-w-[326px] md:max-w-[380px] object-contain animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
