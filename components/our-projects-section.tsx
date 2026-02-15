"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLocale } from "@/lib/locale-context"
import Lenis from 'lenis'
import throttle from 'lodash.throttle'
import { useLayoutEffect, useRef, useCallback } from 'react'

// ────────────────────────────────────────────────
// ScrollStack + ScrollStackItem — без лишних отступов
// ────────────────────────────────────────────────

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full my-12 rounded-[14px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
    }}
  >
    {children}
  </div>
)

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 120,
  itemScale = 0.04,
  itemStackDistance = 40,
  stackPosition = '35%',
  scaleEndPosition = '10%',
  baseScale = 0.96,
  blurAmount = 0.6,
  useWindowScroll = true,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const cardsRef = useRef<HTMLElement[]>([])
  const lastTransformsRef = useRef(new Map<number, any>())
  const isUpdatingRef = useRef(false)

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0
    if (scrollTop > end) return 1
    return (scrollTop - start) / (end - start)
  }, [])

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight
    }
    return Number(value)
  }, [])

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
      }
    }
    const scroller = scrollerRef.current
    if (!scroller) return { scrollTop: 0, containerHeight: 0 }
    return {
      scrollTop: scroller.scrollTop,
      containerHeight: scroller.clientHeight,
    }
  }, [useWindowScroll])

  const getElementOffset = useCallback((element: HTMLElement) => {
    if (useWindowScroll) {
      const rect = element.getBoundingClientRect()
      return rect.top + window.scrollY
    }
    return element.offsetTop
  }, [useWindowScroll])

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return
    isUpdatingRef.current = true

    const { scrollTop, containerHeight } = getScrollData()
    const stackPositionPx = parsePercentage(stackPosition, containerHeight)
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight)

    const endElement = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end')
    const endElementTop = endElement ? getElementOffset(endElement as HTMLElement) : 0

    cardsRef.current.forEach((card, i) => {
      if (!card) return

      const cardTop = getElementOffset(card)
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i
      const triggerEnd = cardTop - scaleEndPositionPx
      const pinStart = triggerStart
      const pinEnd = endElementTop - containerHeight / 2

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd)
      const targetScale = baseScale + i * itemScale
      const scale = 1 - scaleProgress * (1 - targetScale)

      let blur = 0
      if (blurAmount) {
        let topCardIndex = 0
        cardsRef.current.forEach((c, j) => {
          if (!c) return
          const cTop = getElementOffset(c)
          if (scrollTop >= cTop - stackPositionPx - itemStackDistance * j) {
            topCardIndex = j
          }
        })
        if (i < topCardIndex) blur = (topCardIndex - i) * blurAmount
      }

      let translateY = 0
      if (scrollTop >= pinStart) {
        translateY = Math.min(
          scrollTop - cardTop + stackPositionPx + itemStackDistance * i,
          pinEnd - cardTop + stackPositionPx + itemStackDistance * i
        )
      }

      const newTransform = {
        translateY: Math.round(translateY * 10) / 10,
        scale: Math.round(scale * 100) / 100,
        blur: Math.round(blur * 10) / 10,
      }

      const last = lastTransformsRef.current.get(i)
      const changed =
        !last ||
        Math.abs(last.translateY - newTransform.translateY) > 0.4 ||
        Math.abs(last.scale - newTransform.scale) > 0.004 ||
        Math.abs(last.blur - newTransform.blur) > 0.4

      if (changed) {
        card.style.transform = `translateY(${newTransform.translateY}px) scale(${newTransform.scale})`
        card.style.filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : 'none'
        lastTransformsRef.current.set(i, newTransform)
      }
    })

    isUpdatingRef.current = false
  }, [
    baseScale,
    blurAmount,
    calculateProgress,
    getElementOffset,
    getScrollData,
    itemScale,
    itemStackDistance,
    parsePercentage,
    scaleEndPosition,
    stackPosition,
    useWindowScroll,
  ])

  const throttledUpdate = throttle(updateCardTransforms, 12)

  const handleScroll = useCallback(() => {
    throttledUpdate()
  }, [throttledUpdate])

  const setupLenis = useCallback(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      syncTouch: true,
      lerp: 0.09,
      wheelMultiplier: 1,
    })

    lenis.on('scroll', handleScroll)

    const raf = (time: number) => {
      lenis.raf(time)
      animationFrameRef.current = requestAnimationFrame(raf)
    }
    animationFrameRef.current = requestAnimationFrame(raf)

    lenisRef.current = lenis
  }, [handleScroll])

  useLayoutEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller && !useWindowScroll) return

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : (scroller?.querySelectorAll('.scroll-stack-card') ?? [])
    ) as HTMLElement[]
    cardsRef.current = cards

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`
      }
      card.style.willChange = 'transform, filter'
      card.style.transformOrigin = 'top center'
      card.style.transform = 'none'
    })

    setupLenis()
    updateCardTransforms()

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      lenisRef.current?.destroy()
      lastTransformsRef.current.clear()
    }
  }, [itemDistance, setupLenis, updateCardTransforms, useWindowScroll])

  return (
    <div
      className={`relative w-full ${className}`.trim()}
      ref={scrollerRef}
      style={{
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────
// ProjectCard и OurProjectsSection — ваш оригинальный контент
// ────────────────────────────────────────────────

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
        console.error("Failed to fetch projects:", error)
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
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{t.ourProjects}</h2>
          <p className="text-lg md:text-xl opacity-70 whitespace-pre-line">{t.description}</p>
        </div>

        {/* Desktop: Scroll Stack */}
        <div className="hidden lg:block">
          <ScrollStack
            useWindowScroll={true}
            itemDistance={120}          // расстояние между карточками до стека
            itemScale={0.04}
            itemStackDistance={40}      // смещение при наложении
            stackPosition="35%"
            scaleEndPosition="10%"
            baseScale={0.96}
            blurAmount={0.6}
            className="w-full"
          >
            {projects.map((project, index) => (
              <ScrollStackItem
                key={project.id}
                itemClassName="w-full max-w-[1100px] mx-auto"
              >
                <ProjectCard project={project} index={index} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

        {/* Mobile/Tablet: Carousel */}
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
