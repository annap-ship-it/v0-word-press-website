"use client"

import Image from "next/image"

export function AwardsSection() {
  const awards = [
    {
      light: "/images/clutch-champion-fall-2023-light.svg",
      dark: "/images/clutch-champion-fall-2023-dark.svg",
      alt: "Clutch Champion Fall 2023",
    },
    {
      light: "/images/designrush-best-web-development-light.svg",
      dark: "/images/designrush-best-web-development-dark.svg",
      alt: "DesignRush Best Web Development Agencies",
    },
    {
      light: "/images/itrate-top-custom-software-dark.svg",
      dark: "/images/itrate-top-custom-software-dark.svg",
      alt: "iTRate.co Top Custom Software Development Companies",
    },
    {
      light: "/images/goodfirms-top-web-development-dark.svg",
      dark: "/images/goodfirms-top-web-development-dark.svg",
      alt: "GoodFirms Top Web Development Company",
    },
  ]

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-20">
          {awards.map((award, index) => (
            <div
              key={index}
              className="transition-transform duration-300 hover:scale-110"
            >
              {/* Тёмная версия */}
              <Image
                src={award.dark}
                alt={award.alt}
                width={168}
                height={180}
                className="hidden dark:block object-contain"
                style={{
                  width: "clamp(60px, 9vw, 168px)",
                  height: "clamp(64px, 9.6vw, 180px)",
                }}
              />
              {/* Светлая версия */}
              <Image
                src={award.light}
                alt={award.alt}
                width={168}
                height={180}
                className="block dark:hidden object-contain"
                style={{
                  width: "clamp(60px, 9vw, 168px)",
                  height: "clamp(64px, 9.6vw, 180px)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
