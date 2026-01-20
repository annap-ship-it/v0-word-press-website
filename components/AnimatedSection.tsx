"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

/**
 * ⚠️ IMPORTANT: This component implements scroll animations for text and content.
 * DO NOT REMOVE the animation functionality. These animations are critical for:
 * - Text fade-in effects as users scroll
 * - Smooth content reveals on scroll
 * - Enhanced visual experience following the design requirements
 * 
 * Animation behavior:
 * - Elements fade in and slide up when they enter the viewport
 * - Delay can be applied for staggered animations
 * - Threshold controls when animation triggers (default: 10% visible)
 */
interface AnimatedSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
  threshold?: number
}

export function AnimatedSection({
  children,
  delay = 0,
  className = "",
  threshold = 0.1,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Apply delay before triggering animation
          const timer = setTimeout(() => {
            setIsVisible(true)
          }, delay)
          observer.unobserve(entry.target)
          return () => clearTimeout(timer)
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px", // Trigger animation a bit before element is fully visible
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay, threshold])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      {children}
    </div>
  )
}

export default AnimatedSection
