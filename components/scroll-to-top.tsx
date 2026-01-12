"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/lib/theme-context"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const { isDark } = useTheme()

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:opacity-80 animate-fade-in"
          style={{
            backgroundColor: isDark ? "var(--black_bg, #161515)" : "#transparent",
            border: `0px solid ${isDark ? "rgba(255, 255, 255, 0.2)" : "#FF6200"}`,
          }}
          aria-label="Scroll to top"
        >
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="43" height="43" rx="21.5" stroke="#FF6200" />
            <path
              d="M21.3529 29.7648V14.2354M21.3529 14.2354L28.4706 21.6895M21.3529 14.2354L14.2353 21.6895"
              stroke="#FF6200"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </>
  )
}
