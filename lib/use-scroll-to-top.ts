"use client"

import { useEffect } from "react"

export function useScrollToTop() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use instant to avoid animation delays
    })

    // Also handle hash navigation
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])
}
