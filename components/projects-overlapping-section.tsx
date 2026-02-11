"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

interface Project {
  id: string
  title: string | { en: string; uk: string }
  slug: string
  featured_image: string
  challenge: string | { en: string; uk: string }
  solution: string | { en: string; uk: string }
  result: string | { en: string; uk: string }
  stack: string[]
}

interface ProjectsOverlappingSectionProps {
  projects: Project[]
  locale: string
  isDark: boolean
  translations: any
  techIcons: Record<string, string>
}

export function ProjectsOverlappingSection({
  projects,
  locale,
  isDark,
  translations,
  techIcons,
}: ProjectsOverlappingSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [cardOffsets, setCardOffsets] = useState<number[]>([])

  const t = translations[locale as keyof typeof translations]

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      // Calculate scroll progress for this section
      const sectionTop = rect.top
      const sectionHeight = rect.height
      const progress = Math.max(0, Math.min(1, (viewportHeight - sectionTop) / (viewportHeight + sectionHeight)))

      setScrollProgress(progress)

      // Calculate offsets for each card
      const newOffsets = projects.map((_, index) => {
        // Each card moves up as we scroll, creating overlap effect
        return Math.max(-80 * index, -80 * index * (1 + progress * 0.5))
      })
      setCardOffsets(newOffsets)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [projects])

  return (
    <div ref={containerRef} className="relative py-16 px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="space-y-0">
          {projects.map((project, index) => {
            const isReverse = index % 2 === 1
            const offset = cardOffsets[index] || -80 * index

            return (
              <Link key={project.id} href={`/projects/${project.slug}`} className="block group">
                <div
                  className="rounded-[14px] overflow-hidden transition-all duration-300 hover:shadow-lg relative"
                  style={{
                    background: isDark
                      ? isReverse
                        ? "linear-gradient(70.46deg, #212121 57.09%, #FF6200 125.28%)"
                        : "linear-gradient(292.61deg, #212121 56.12%, #FF6200 111.19%)"
                      : isReverse
                        ? "linear-gradient(73.52deg, #FAF9F8 33.1%, #FFFFFF 75.27%, #FF6200 120.85%)"
                        : "linear-gradient(283.85deg, #FAF9F8 45%, #FFFFFF 77.04%, #FF6200 110.33%)",
                    boxShadow: isDark ? "0 4px 20px rgba(0, 0, 0, 0.3)" : "2px 2px 20px rgba(0, 0, 0, 0.1)",
                    transform: `translateY(${offset}px)`,
                    marginBottom: offset < 0 ? `${Math.abs(offset)}px` : "16px",
                    zIndex: projects.length - index,
                  }}
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 ${isReverse ? "lg:flex-row-reverse" : ""}`}>
                    {/* Image */}
                    <div className={`${isReverse ? "lg:order-2" : "lg:order-1"}`}>
                      <div className="relative w-full aspect-[16/10] rounded-[14px] overflow-hidden">
                        <Image
                          src={project.featured_image || "/placeholder.svg"}
                          alt={typeof project.title === "string" ? project.title : project.title[locale]}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`${isReverse ? "lg:order-1" : "lg:order-2"} flex flex-col justify-center`}>
                      <h2
                        className="text-xl md:text-2xl font-bold mb-4"
                        style={{ color: isDark ? "#FFFFFF" : "#000000" }}
                      >
                        {typeof project.title === "string" ? project.title : project.title[locale]}
                      </h2>

                      <div className="space-y-3 text-sm">
                        {typeof project.challenge === "string" ? (
                          <div className="flex gap-3">
                            <span className="font-semibold text-[#FF6200] min-w-[80px]">
                              {t.challengeLabel || "Challenge:"}
                            </span>
                            <span style={{ color: isDark ? "#A0A0A0" : "#666666" }}>{project.challenge}</span>
                          </div>
                        ) : (
                          <div className="flex gap-3">
                            <span className="font-semibold text-[#FF6200] min-w-[80px]">
                              {t.challengeLabel || "Challenge:"}
                            </span>
                            <span style={{ color: isDark ? "#A0A0A0" : "#666666" }}>{project.challenge[locale]}</span>
                          </div>
                        )}
                        {typeof project.solution === "string" ? (
                          <div className="flex gap-3">
                            <span className="font-semibold text-[#FF6200] min-w-[80px]">
                              {t.solutionLabel || "Solution:"}
                            </span>
                            <span style={{ color: isDark ? "#A0A0A0" : "#666666" }}>{project.solution}</span>
                          </div>
                        ) : (
                          <div className="flex gap-3">
                            <span className="font-semibold text-[#FF6200] min-w-[80px]">
                              {t.solutionLabel || "Solution:"}
                            </span>
                            <span style={{ color: isDark ? "#A0A0A0" : "#666666" }}>{project.solution[locale]}</span>
                          </div>
                        )}
                        {typeof project.result === "string" ? (
                          <div className="flex gap-3">
                            <span className="font-semibold text-[#FF6200] min-w-[80px]">
                              {t.resultLabel || "Result:"}
                            </span>
                            <span style={{ color: isDark ? "#A0A0A0" : "#666666" }}>{project.result}</span>
                          </div>
                        ) : (
                          <div className="flex gap-3">
                            <span className="font-semibold text-[#FF6200] min-w-[80px]">
                              {t.resultLabel || "Result:"}
                            </span>
                            <span style={{ color: isDark ? "#A0A0A0" : "#666666" }}>{project.result[locale]}</span>
                          </div>
                        )}

                        {/* Stack */}
                        {project.stack && project.stack.length > 0 && (
                          <div className="flex gap-3 items-start pt-2">
                            <span className="font-semibold text-[#FF6200] min-w-[80px]">
                              {t.stackLabel || "Stack:"}
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {project.stack.map((tech: string, i: number) => {
                                const iconPath = techIcons[tech]
                                return (
                                  <span
                                    key={i}
                                    className="px-3 py-1.5 rounded-[4px] text-xs font-medium flex items-center gap-2 transition-transform duration-200 hover:scale-105"
                                    style={{
                                      backgroundColor: isDark ? "#323130" : "#FFFFFF",
                                      color: isDark ? "#FFFFFF" : "#000000",
                                      border: isDark ? "none" : "1px solid #E0E0E0",
                                    }}
                                  >
                                    {iconPath && (
                                      <span
                                        className="flex items-center justify-center rounded-[2px] flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                                        style={{
                                          backgroundColor: "#FFFFFF",
                                          padding: "2px",
                                          width: "20px",
                                          height: "20px",
                                        }}
                                      >
                                        <Image
                                          src={iconPath || "/placeholder.svg"}
                                          alt={tech}
                                          width={16}
                                          height={16}
                                        />
                                      </span>
                                    )}
                                    {tech}
                                  </span>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
