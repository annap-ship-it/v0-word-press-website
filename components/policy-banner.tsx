"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface PolicyBannerProps {
  title: string
  lightBanner: string
  darkBanner: string
}

export function PolicyBanner({ title, lightBanner, darkBanner }: PolicyBannerProps) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      const htmlElement = document.documentElement
      const hasDarkClass = htmlElement.classList.contains("dark")
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDark(hasDarkClass || (!htmlElement.classList.contains("light") && prefersDark))
    }

    checkTheme()

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => checkTheme()
    mediaQuery.addEventListener("change", handleChange)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return (
    <div className="relative w-full h-[393px] flex items-center justify-center overflow-hidden">
      <Image
        src={isDark ? darkBanner : lightBanner}
        alt={`${title} Banner`}
        fill
        className="object-cover"
        priority
        key={isDark ? "dark" : "light"}
      />
      <h1
        className="relative z-10 text-center px-4"
        style={{
          fontFamily: "Onest",
          fontWeight: 800,
          fontSize: "clamp(48px, 8vw, 64px)",
          lineHeight: "110%",
          letterSpacing: "-0.03em",
          color: isDark ? "#FFFFFF" : "#000000",
        }}
      >
        {title}
      </h1>
    </div>
  )
}
