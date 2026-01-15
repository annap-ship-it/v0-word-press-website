"use client"

import { useEffect } from "react"

export function useScrollAnimateElements() {
  useEffect(() => {
    // Select all text elements: headings, paragraphs, list items, and spans
    const textElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, li, span")

    // Add scroll-animate class to all text elements
    textElements.forEach((el) => {
      if (!el.classList.contains("scroll-animate")) {
        el.classList.add("scroll-animate")
      }
    })

    // Create IntersectionObserver to add visible class when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            // Unobserve after animation to avoid re-triggering
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    // Observe all text elements
    textElements.forEach((el) => {
      observer.observe(el)
    })

    return () => {
      observer.disconnect()
    }
  }, [])
}
