"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useScrollProgress } from "@/hooks/use-scroll-progress"
import { useLocale } from "@/lib/locale-context"

interface Project {
  id: string
  title: { en: string; uk: string }
  slug: string
  image: string
  shortDescription: { en: string; uk: string }
}

interface ScrollStackProjectsProps {
  projects: Project[]
}

export function ScrollStackProjects({ projects }: ScrollStackProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)
  const { locale } = useLocale()

  const t = {
    readMore: locale === "uk" ? "Читати повний кейс →" : "Read the full case →",
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: `${projects.length * 120}vh` }}>
      <div className="sticky top-32 h-[340px] left-0 right-0">
        {projects.map((project, index) => {
          const offset = Math.max(0, progress * projects.length - index)
          const translateY = offset * 40
          const scale = Math.max(0.9, 1 - offset * 0.04)
          const isEvenIndex = index % 2 === 0
          const backgroundColor = isEvenIndex ? "#FF6200" : "#000000"

          return (
            <Link key={project.id} href={`/projects/${project.slug}`}>
              <div
                className="absolute left-1/2 -translate-x-1/2 w-[900px] h-[340px] rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  zIndex: projects.length - index,
                }}
              >
                <div className="flex h-full">
                  {/* Left side: Text content */}
                  <div className="w-1/2 p-8 flex flex-col justify-between text-white" style={{ backgroundColor }}>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">{project.title[locale as "en" | "uk"]}</h3>
                      <p className="text-sm opacity-90">{project.shortDescription[locale as "en" | "uk"]}</p>
                    </div>
                    <div className="text-sm font-medium opacity-75 hover:opacity-100 transition-opacity">
                      {t.readMore}
                    </div>
                  </div>

                  {/* Right side: Image */}
                  <div className="w-1/2 relative">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title[locale as "en" | "uk"]}
                      fill
                      className="object-cover"
                    />
                    {/* Black diagonal overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/20" />
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
