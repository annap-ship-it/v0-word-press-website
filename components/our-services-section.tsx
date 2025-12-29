"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"

interface Service {
  id: string
  title: string
  icon: React.ReactNode
  image: string
  link: string
  imagePosition: { row: number; col: number; span: number }
}

const services: Service[] = [
  {
    id: "custom-web",
    title: "Custom web solutions",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 7L15 17M15 7L9 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    image: "/images/our-services-uiux-20-282-29.png",
    link: "/services/custom-web",
    imagePosition: { row: 1, col: 3, span: 1 },
  },
  {
    id: "ux-ui-design",
    title: "UX/UI and Graphic Design",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" stroke="currentColor" strokeWidth="1.5" rx="1" />
        <rect x="8" y="8" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="0.5" />
      </svg>
    ),
    image: "/images/our-services-uiux.png",
    link: "/services/ux-ui-design",
    imagePosition: { row: 1, col: 3, span: 2 },
  },
  {
    id: "mobile-apps",
    title: "Mobile Applications",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="7" y="4" width="10" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
    image: "/images/our-services-mobile.png",
    link: "/services/mobile-apps",
    imagePosition: { row: 1, col: 4, span: 1 },
  },
  {
    id: "qa-automation",
    title: "Manual and Automation QA",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M8 10L11 13L16 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    image: "/images/our-services-manual.png",
    link: "/services/qa-automation",
    imagePosition: { row: 2, col: 1, span: 1 },
  },
  {
    id: "devops",
    title: "DevOps",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M12 3V5M12 19V21M21 12H19M5 12H3M18.36 5.64L16.95 7.05M7.05 16.95L5.64 18.36M18.36 18.36L16.95 16.95M7.05 7.05L5.64 5.64"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    image: "/images/our-services-devops.png",
    link: "/services/devops",
    imagePosition: { row: 2, col: 3, span: 1 },
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="13" width="4" height="7" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="9" width="4" height="11" stroke="currentColor" strokeWidth="1.5" />
        <rect x="17" y="4" width="4" height="16" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    image: "/images/our-services-uiux-20-281-29.png",
    link: "/services/data-analytics",
    imagePosition: { row: 2, col: 4, span: 1 },
  },
]

export function OurServicesSection() {
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">Our Services</h2>
        <p className="text-base md:text-lg text-center text-foreground/80 max-w-4xl mx-auto mb-16 leading-relaxed">
          Our team provides end-to-end expertise to help you design, build, and optimize digital products that drive
          real impact. Learn more about what we can do for your business and how we work
        </p>

        {/* Mobile Layout (< lg) - Simple grid without hover images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:hidden">
          {services.map((service) => (
            <a
              key={service.id}
              href={service.link}
              className="group h-[180px] md:h-[200px] rounded-2xl p-6 flex flex-col justify-between bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="text-primary w-8 h-8">{service.icon}</div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground leading-tight">{service.title}</h3>
                <div className="flex items-center gap-1.5 text-sm text-foreground/60">
                  <span>Read more</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Desktop Layout (lg+) - 4-column grid with hover image previews */}
        <div className="hidden lg:block relative">
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "repeat(2, 200px)",
            }}
          >
            {/* Row 1, Col 1: Custom web solutions */}
            <a
              href={services[0].link}
              className="group rounded-2xl p-6 flex flex-col justify-between bg-card border border-border hover:border-primary/60 transition-all"
              style={{ gridColumn: "1", gridRow: "1" }}
              onMouseEnter={() => setHoveredService(services[0].id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="text-primary w-8 h-8">{services[0].icon}</div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground leading-tight">{services[0].title}</h3>
                <div className="flex items-center gap-1.5 text-sm text-foreground/60">
                  <span>Read more</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </a>

            {/* Row 1, Col 2: UX/UI and Graphic Design */}
            <a
              href={services[1].link}
              className="group rounded-2xl p-6 flex flex-col justify-between bg-card border border-border hover:border-primary/60 transition-all"
              style={{ gridColumn: "2", gridRow: "1" }}
              onMouseEnter={() => setHoveredService(services[1].id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="text-primary w-8 h-8">{services[1].icon}</div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground leading-tight">{services[1].title}</h3>
                <div className="flex items-center gap-1.5 text-sm text-foreground/60">
                  <span>Read more</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </a>

            {/* Row 1, Col 4: Mobile Applications */}
            <a
              href={services[2].link}
              className="group rounded-2xl p-6 flex flex-col justify-between bg-card border border-border hover:border-primary/60 transition-all"
              style={{ gridColumn: "4", gridRow: "1" }}
              onMouseEnter={() => setHoveredService(services[2].id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="text-primary w-8 h-8">{services[2].icon}</div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground leading-tight">{services[2].title}</h3>
                <div className="flex items-center gap-1.5 text-sm text-foreground/60">
                  <span>Read more</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </a>

            {/* Row 2, Col 2: Manual and Automation QA */}
            <a
              href={services[3].link}
              className="group rounded-2xl p-6 flex flex-col justify-between bg-card border border-border hover:border-primary/60 transition-all"
              style={{ gridColumn: "2", gridRow: "2" }}
              onMouseEnter={() => setHoveredService(services[3].id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="text-primary w-8 h-8">{services[3].icon}</div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground leading-tight">{services[3].title}</h3>
                <div className="flex items-center gap-1.5 text-sm text-foreground/60">
                  <span>Read more</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </a>

            {/* Row 2, Col 3: DevOps */}
            <a
              href={services[4].link}
              className="group rounded-2xl p-6 flex flex-col justify-between bg-card border border-border hover:border-primary/60 transition-all"
              style={{ gridColumn: "3", gridRow: "2" }}
              onMouseEnter={() => setHoveredService(services[4].id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="text-primary w-8 h-8">{services[4].icon}</div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground leading-tight">{services[4].title}</h3>
                <div className="flex items-center gap-1.5 text-sm text-foreground/60">
                  <span>Read more</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </a>

            {/* Row 2, Col 4: Data Analytics */}
            <a
              href={services[5].link}
              className="group rounded-2xl p-6 flex flex-col justify-between bg-card border border-border hover:border-primary/60 transition-all"
              style={{ gridColumn: "4", gridRow: "2" }}
              onMouseEnter={() => setHoveredService(services[5].id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="text-primary w-8 h-8">{services[5].icon}</div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground leading-tight">{services[5].title}</h3>
                <div className="flex items-center gap-1.5 text-sm text-foreground/60">
                  <span>Read more</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </a>

            {hoveredService &&
              (() => {
                const service = services.find((s) => s.id === hoveredService)
                if (!service) return null

                return (
                  <div
                    className="absolute pointer-events-none rounded-2xl overflow-hidden shadow-2xl"
                    style={{
                      gridColumn: service.imagePosition.col,
                      gridRow: service.imagePosition.row,
                      ...(service.imagePosition.span === 2 && { gridRowEnd: "span 2" }),
                      opacity: 1,
                      transform: "scale(1)",
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="400px"
                      />
                    </div>
                  </div>
                )
              })()}
          </div>
        </div>
      </div>
    </section>
  )
}
