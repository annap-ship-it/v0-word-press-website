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

  // Normalize title
  const title =
    typeof project.title === "string"
      ? project.title
      : project.title[locale as "en" | "uk"] || project.title.en || ""

  // Normalize short description
  const shortDesc =
    typeof project.shortDescription === "string"
      ? project.shortDescription
      : project.shortDescription[locale as "en" | "uk"] ||
        project.shortDescription.en ||
        ""

  // Normalize full description (fallback to short)
  const solution =
    typeof project.fullDescription === "string"
      ? project.fullDescription
      : project.fullDescription
      ? project.fullDescription[locale as "en" | "uk"] ||
        project.fullDescription.en ||
        shortDesc
      : shortDesc

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
          <span className="text-xs sm:text-sm opacity-75 flex-shrink-0 mt-3 md:mt-4">
            {locale === "uk" ? "Читати повний кейс →" : "Read the full case →"}
          </span>
        </div>

        <div className="w-full md:w-1/2 relative h-48 sm:h-64 md:h-auto order-2 md:order-none">
          <Image
            src={project.image || "/placeholder.svg?height=400&width=600"}
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
        const res = await fetch("/api/projects")
        if (res.ok) {
          const data = await res.json()
          setProjects(data)
        }
      } catch (err) {
        console.error("Failed to load projects:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Mobile navigation
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % projects.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  const goToSlide = (idx: number) => setCurrentIndex(idx)

  if (isLoading || projects.length === 0) return null

  const t = {
    title: locale === "uk" ? "Наші проекти" : "Our Projects",
    subtitle:
      locale === "uk"
        ? "Зростайте, масштабуйтесь та оптимізуйте.\nПознайомтесь з нашими недавніми роботами."
        : "Grow, scale up, and optimize.\nExplore our recent client work.",
  }

  return (
    <section
      className="py-16 md:py-24 lg:py-32 relative overflow-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 lg:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tight">
            {t.title}
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl opacity-70 whitespace-pre-line leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* ─── Desktop: Scroll Stack ─── */}
        <div className="hidden lg:block">
          <ScrollStack
            useWindowScroll={true}
            itemDistance={140}           // vertical spacing between cards when not stacked
            itemScale={0}                // no additional scale per card
            itemStackDistance={40}       // how much cards are offset when stacked
            stackPosition="35%"          // when stacking should start (earlier = more dramatic)
            scaleEndPosition="0%"        // not used since itemScale = 0
            baseScale={1}                // cards stay full size
            rotationAmount={0}           // optional subtle tilt: try 1.5–3
            blurAmount={0}               // optional depth blur: try 0.6–1.2
            className="w-full"
          >
            {projects.map((project, idx) => (
              <ScrollStackItem
                key={project.id}
                itemClassName="w-full max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8"
              >
                <ProjectCard project={project} index={idx} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

        {/* ─── Mobile / Tablet: Carousel ─── */}
        <div className="lg:hidden">
          <div className="relative">
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {projects.map((project, idx) => (
                  <div key={project.id} className="min-w-full flex-shrink-0 px-2 sm:px-4">
                    <ProjectCard project={project} index={idx} />
                  </div>
                ))}
              </div>
            </div>

            {/* Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm text-white p-3 rounded-full shadow-lg z-10 hover:bg-black/80 transition-colors"
              aria-label="Previous project"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm text-white p-3 rounded-full shadow-lg z-10 hover:bg-black/80 transition-colors"
              aria-label="Next project"
            >
              →
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2.5 mt-6">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "bg-[#FF6200] scale-125"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to project ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
