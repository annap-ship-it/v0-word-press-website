"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLocale } from "@/lib/locale-context"
import ScrollStack, { ScrollStackItem } from "./scroll-stack"

interface Project {
  id: string
  title: { en: string; uk: string }
  slug: string
  image: string
  shortDescription: { en: string; uk: string }
  fullDescription?: { en: string; uk: string }
}

function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const locale = useLocale()

  const isOrange = index % 2 === 0
  const bgColor = isOrange ? "#FF6200" : "#000000"

  const textColor = "text-white"

  const boxShadow = !isOrange ? "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" : "none"

  const title = project.title[locale as "en" | "uk"] || project.title.en
  const solution =
    project.fullDescription?.[locale as "en" | "uk"] ||
    project.fullDescription?.en ||
    project.shortDescription[locale as "en" | "uk"] ||
    project.shortDescription.en

  return (
    <Link href={`/projects/${project.slug}`} className="block w-full">
      <div
        className={`flex rounded-[14px] overflow-hidden transition-all duration-300 w-full aspect-[3.8/1] ${textColor}`}
        style={{
          backgroundColor: bgColor,
          boxShadow,
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="w-1/2 p-6 md:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 leading-tight">{title}</h3>
            <p className="text-xs md:text-sm lg:text-base leading-relaxed opacity-90 line-clamp-3">{solution}</p>
          </div>
          <span className="text-xs md:text-sm opacity-75 flex-shrink-0 mt-2">
            {locale === "uk" ? "Читати повний кейс →" : "Read the full case →"}
          </span>
        </div>

        <div className="w-1/2 relative">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 45vw"
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

  // dark mode детектор можно оставить или убрать — он больше не нужен для цвета текста

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
    <section className="py-16 md:py-24 relative overflow-hidden bg-var(--background)">
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

        {/* Mobile carousel остаётся без изменений */}
        <div className="lg:hidden">{/* ... твой существующий код карусели ... */}</div>
      </div>
    </section>
  )
}
