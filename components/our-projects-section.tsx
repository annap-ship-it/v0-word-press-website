"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLocale } from "@/lib/locale-context"
import ScrollStack, { ScrollStackItem } from "./scroll-stack"
import "./our-projects-section.css"

interface Project {
  id: string
  title: { en: string; uk: string } | string
  slug: string
  image: string
  shortDescription: { en: string; uk: string } | string
  fullDescription?: { en: string; uk: string } | string
}

function ProjectCard({
  project,
  index,
  isMobile = false,
}: {
  project: Project
  index: number
  isMobile?: boolean
}) {
  const { locale } = useLocale()
  const isDarkTheme = typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark"

  const isOrange = index % 2 === 0
  const bgColor = isOrange ? "#FF6200" : "#000000"
  const textColor = "text-white"
  
  // Shadow only in dark theme for black cards
  const boxShadow = !isOrange && isDarkTheme ? "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" : "none"
  
  // Border color based on theme
  const borderColor = isDarkTheme ? "#FFFFFF" : "#212121"
  const borderStyle = `1px solid ${borderColor}`

  // Handle title as string or object
  let title: string
  if (typeof project.title === "string") {
    title = project.title
  } else {
    title = project.title[locale as "en" | "uk"] || project.title.en || ""
  }

  // Handle shortDescription as string or object
  let shortDesc: string
  if (typeof project.shortDescription === "string") {
    shortDesc = project.shortDescription
  } else {
    shortDesc = project.shortDescription[locale as "en" | "uk"] || project.shortDescription.en || ""
  }

  // Handle fullDescription as string or object (optional)
  let fullDesc: string | undefined
  if (typeof project.fullDescription === "string") {
    fullDesc = project.fullDescription
  } else if (project.fullDescription) {
    fullDesc = project.fullDescription[locale as "en" | "uk"] || project.fullDescription.en
  }

  const solution = fullDesc || shortDesc

  // Mobile card dimensions based on viewport
  const mobileCardClass = isMobile 
    ? "sm:max-w-[368px] md:max-w-[658px] lg:max-w-none min-h-[427px] sm:min-h-[427px] md:min-h-[250px]"
    : ""

  return (
    <Link href={`/projects/${project.slug}`} className="block w-full">
      <div
        className={`flex flex-col md:flex-row rounded-[14px] overflow-hidden transition-all duration-300 w-full md:aspect-[3.8/1] ${textColor} ${mobileCardClass}`}
        style={{
          backgroundColor: bgColor,
          boxShadow,
          border: borderStyle,
        }}
      >
        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between order-1 md:order-none">
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight">
              {title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base leading-relaxed opacity-90 line-clamp-3">
              {solution}
            </p>
          </div>
          <span className="text-xs sm:text-sm opacity-75 flex-shrink-0 mt-2">
            {locale === "uk" ? "Читати повний кейс →" : "Read the full case →"}
          </span>
        </div>

        <div className="w-full md:w-1/2 relative h-48 sm:h-64 md:h-auto order-2 md:order-none">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/10" />
        </div>
      </div>
    </Link>
  )
}

export function OurProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { locale } = useLocale()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects")
        if (response.ok) {
          const data = await response.json()
          setProjects(data)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch projects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % projects.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  const goToSlide = (index: number) => setCurrentIndex(index)

  if (isLoading || projects.length === 0) return null

  const t = {
    ourProjects: locale === "uk" ? "Наші проекти" : "Our Projects",
    description:
      locale === "uk"
        ? "Зростайте, масштабуйтесь та оптимізуйте.\nПознайомтесь з нашими недавніми роботами."
        : "Grow, scale up, and optimize.\nExplore our recent client work.",
  }

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{t.ourProjects}</h2>
          <p className="text-lg md:text-xl opacity-70 whitespace-pre-line">{t.description}</p>
        </div>

        {/* Desktop: чистый stack без зума */}
        <div className="hidden lg:block overflow-visible">
          <ScrollStack
            useWindowScroll={true}
            itemDistance={100} // расстояние по вертикали между триггерами
            itemScale={0} // ОТКЛЮЧАЕМ масштаб/зум полностью
            itemStackDistance={30} // горизонтальное смещение (как в референсе)
            stackPosition="40%" // где начинается stacking
            scaleEndPosition="0%" // не используется, т.к. scale=0
            baseScale={1} // фиксированный размер
            className="w-full"
          >
            {projects.map((project, index) => (
              <ScrollStackItem
                key={project.id}
                itemClassName="w-full max-w-[1100px] mx-auto px-0" // чуть шире для выхода за края
              >
                <ProjectCard project={project} index={index} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

        {/* Mobile/Tablet Carousel */}
        <div className="lg:hidden">
          <div className="relative w-full">
            {/* Container with proper padding to prevent cards from overlapping chevrons */}
            <div className="relative px-14 sm:px-16">
              {/* Carousel Container */}
              <div className="overflow-hidden rounded-[14px]">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {projects.map((project, index) => (
                    <div 
                      key={project.id} 
                      className="min-w-full flex-shrink-0 flex justify-center"
                    >
                      <div className="w-[277px] sm:w-[368px] md:w-[658px]">
                        <ProjectCard project={project} index={index} isMobile={true} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Chevrons - Outside carousel container */}
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-2 transition-all"
                aria-label="Previous"
              >
                <svg 
                  width="56" 
                  height="56" 
                  viewBox="0 0 56 56" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                >
                  <path 
                    d="M31 28L25 22L31 16" 
                    stroke={currentIndex === 0 ? "#E0E0E0" : "#FF6200"} 
                    strokeOpacity={currentIndex === 0 ? "0.5" : "1"}
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                disabled={currentIndex === projects.length - 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 transition-all"
                aria-label="Next"
              >
                <svg 
                  width="54" 
                  height="56" 
                  viewBox="0 0 54 56" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                >
                  <path 
                    d="M24 28L30 22L24 16" 
                    stroke={currentIndex === projects.length - 1 ? "#E0E0E0" : "#FF6200"} 
                    strokeOpacity={currentIndex === projects.length - 1 ? "0.5" : "1"}
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentIndex ? "bg-[#FF6200]" : "bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
