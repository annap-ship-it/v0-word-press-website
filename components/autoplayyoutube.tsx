// components/autoplayyoutube.tsx

"use client"

import { useState, useEffect, useRef } from "react"   // ← добавлен useState и useRef

export default function AutoPlayYouTube() {
  const [isDark, setIsDark] = useState(false)

  // Определяем тёмный режим по классу на <html>
  useEffect(() => {
    const html = document.documentElement
    const checkDark = () => setIsDark(html.classList.contains("dark"))
    
    checkDark()
    
    const observer = new MutationObserver(checkDark)
    observer.observe(html, { attributes: true, attributeFilter: ["class"] })
    
    return () => observer.disconnect()
  }, [])

  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!iframeRef.current) return

        const action = entry.isIntersecting ? "playVideo" : "pauseVideo"

        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: action }),
          "*"
        )
      },
      { threshold: 0.6 }
    )

    const current = iframeRef.current
    if (current) observer.observe(current)

    return () => {
      if (current) observer.unobserve(current)
    }
  }, [])

  return (
    <section 
      className="px-4" 
      style={{ background: isDark ? "#000000" : "#FFFFFF" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="relative w-full aspect-video max-w-[975px] mx-auto rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            ref={iframeRef}
            src="https://www.youtube.com/embed/lfoiSdUgsX0?enablejsapi=1&autoplay=0&mute=1&loop=1&playlist=lfoiSdUgsX0&rel=0&modestbranding=1&controls=1&playsinline=1"
            title="Idea Team Intro"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  )
}
