"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Lenis from "lenis"

// ScrollStackItem для десктопа
const ScrollStackItem = ({ children }: { children: React.ReactNode }) => (
  <div className="scroll-stack-card w-full max-w-5xl mx-auto rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
    {children}
  </div>
)

// Проекты с реальными ссылками (автосинхронизация — обновляй массив при добавлении новых проектов на сайте)
const projects = [
  {
    title: "Multi-brand E-commerce Landing Pages",
    description: "Implemented solution to enhance user engagement and increase visibility for marketing efforts.",
    image: "/images/projects/multi-brand-landing.png", // Замени на реальное изображение, если есть
    link: "/projects/multi-brand-ecommerce-landing-pages", // Пример slug — замени на реальный
    bgColor: "bg-orange-500",
  },
  {
    title: "Dustin.be – E-commerce Platform",
    description: "Implemented scalable, high-performance platform with improved developer experience.",
    image: "/images/projects/dustin-mockup.png",
    link: "/projects/dustin-ecommerce-platform",
    bgColor: "bg-orange-500",
  },
  {
    title: "Intertop Sensor Infobox",
    description: "Improved customer experience with accurate, up-to-date product information in-store.",
    image: "/images/projects/intertop-mockup.png",
    link: "/projects/intertop-sensor-infobox",
    bgColor: "bg-black",
  },
  {
    title: "Sports Statistics Platform",
    description: "Developed advanced automation, scalable architecture, thoughtful caching, and async handling.",
    image: "/images/projects/sports-stats.png",
    link: "/projects/sports-statistics-platform",
    bgColor: "bg-black",
  },
]

export function OurProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Lenis для плавного скролла на десктопе
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
      })

      const raf = (time: number) => {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      return () => lenis.destroy()
    }
  }, [])

  // Мобильная навигация
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">Our Projects</h2>
          <p className="text-lg md:text-xl text-foreground/80">
            Grow, scale up, and optimize.
            <br className="hidden md:block" />
            Explore our recent client work.
          </p>
        </div>

        {/* Десктоп — Scroll Stack анимация */}
        <div className="hidden lg:block relative">
          <div className="scroll-stack-scroller">
            <div className="scroll-stack-inner pt-[30vh] pb-[80vh]">
              {projects.map((project, index) => (
                <ScrollStackItem key={index}>
                  <Link href={project.link} className="block h-full">
                    <div className={`relative h-96 ${project.bgColor} rounded-2xl overflow-hidden`}>
                      <div className="absolute inset-0 flex">
                        {/* Текст слева */}
                        <div className="w-1/2 p-12 flex flex-col justify-center">
                          <h3 className="text-3xl font-medium text-white mb-4">{project.title}</h3>
                          <p className="text-base text-white/90 mb-8 max-w-md">{project.description}</p>
                          <span className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                            <span className="text-sm">Read the full case</span>
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>

                        {/* Изображение справа */}
                        <div className="w-1/2 relative">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollStackItem>
              ))}
              <div className="scroll-stack-end" />
            </div>
          </div>
        </div>

        {/* Мобильная — карусель */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Link href={project.link} className="block">
                    <div className={`relative h-96 ${project.bgColor} rounded-2xl overflow-hidden`}>
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-8 text-white">
                        <h3 className="text-2xl font-medium mb-3">{project.title}</h3>
                        <p className="text-sm opacity-90 mb-4">{project.description}</p>
                        <span className="text-sm opacity-70 hover:opacity-100 flex items-center gap-2">
                          Read the full case <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Стрелки */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          {/* Точки */}
          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
