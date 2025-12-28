"use client"

import { useEffect, useRef } from "react"

export function WorldMapWithHover() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Fetch and inject the SVG
    fetch("/images/world-map-interactive.svg")
      .then((res) => res.text())
      .then((svgText) => {
        container.innerHTML = svgText
        const svg = container.querySelector("svg")
        if (!svg) return

        // Set viewBox and make it responsive
        svg.setAttribute("viewBox", "0 0 755 443")
        svg.style.width = "100%"
        svg.style.height = "100%"
        svg.style.opacity = "0.6"

        // Add hover styles to all country paths (paths with fill="#323130")
        const paths = svg.querySelectorAll('path[fill="#323130"]')
        paths.forEach((path) => {
          const element = path as SVGPathElement
          element.style.cursor = "pointer"
          element.style.transition = "all 0.3s ease"

          element.addEventListener("mouseenter", () => {
            element.style.fill = "#FF620066"
            element.style.stroke = "#FFFFFF80"
            element.style.strokeWidth = "0.5px"
          })

          element.addEventListener("mouseleave", () => {
            element.style.fill = "#323130"
            element.style.stroke = ""
            element.style.strokeWidth = ""
          })
        })
      })
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
