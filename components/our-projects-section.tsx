"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLocale } from "@/lib/locale-context"
import ScrollStack, { ScrollStackItem } from "./scroll-stack"

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
}: {
  project: Project
  index: number
}) {
  const { locale } = useLocale()
  const isOrange = index % 2 === 0
  const bgColor = isOrange ? "#FF6200" : "#000000"
  const textColor = "text-white"
  const boxShadow = !isOrange ? "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" : "none"

  let title: string
  if (typeof project.title === "string") {
    title = project.title
  } else {
    title = project.title[locale as "en" | "uk"] || project.title.en || ""
  }

  let shortDesc: string
  if (typeof project.shortDescription === "string") {
    shortDesc = project.shortDescription
  } else {
    shortDesc = project.shortDescription[locale as "en" | "uk"] || project.shortDescription.en || ""
  }

  let solution = shortDesc
  if (project.fullDescription) {
    solution =
      typeof project.fullDescription === "string"
        ? project.fullDescription
        : project.fullDescription[locale as "en" | "uk"] || project.fullDescription.en || shortDesc
  }

  return (
    <Link href={`/projects/${project.slug}`} className="block w-full">
      <div
        className={`flex flex-col md:flex-row rounded-[14px] overflow-hidden transition-all duration-300 w-full md:aspect-[3.8/1] ${textColor}`}
        style={{
          backgroundColor: bgColor,
          boxShadow,
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between order-1 md:order-none">
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight">
              {title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base leading-relaxed opacity-90 line-clamp-3 md:line-clamp-4">
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
        console.error("[OurProjects] Failed to fetch projects:", error)
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

        {/* Desktop: Stacking animation — только анимация, цвета/стили карточек не меняем */}
        <div className="hidden lg:block perspective-[1100px]">
          <ScrollStack
            useWindowScroll={true}
            itemDistance={160}           // расстояние между карточками до начала стека
            itemScale={0.04}             // небольшое уменьшение размера на каждый слой
            itemStackDistance={48}       // смещение вниз при наложении (заметный стек)
            stackPosition="32%"          // где начинается прилипание и stacking
            scaleEndPosition="8%"        // где масштаб достигает минимума
            baseScale={0.96}             // лёгкое уменьшение базового размера для глубины
            rotationAmount={2.4}         // небольшой наклон для 3D-ощущения
            blurAmount={0.8}             // размытие нижних карточек в стеке
            className="w-full min-h-[140vh] py-20" // пространство для комфортного скролла
          >
            {projects.map((project, index) => (
              <ScrollStackItem
                key={project.id}
                itemClassName="w-full max-w-[1100px] mx-auto px-0"
              >
                <ProjectCard project={project} index={index} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

        {/* Mobile/Tablet: Carousel — без изменений */}
        <div className="lg:hidden">
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {projects.map((project, index) => (
                  <div key={project.id} className="min-w-full flex-shrink-0 px-2">
                    <ProjectCard project={project} index={index} />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              aria-label="Previous"
            >
              &lt;
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              aria-label="Next"
            >
              &gt;
            </button>

            <div className="flex justify-center mt-4 space-x-2">
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
