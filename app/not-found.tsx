"use client"

import Link from "next/link"
import { useTheme } from "@/lib/theme-context"

export default function NotFound() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        {/* Oops title with gradient */}
        <h1
          className="text-center mb-4"
          style={{
            fontFamily: "Onest",
            fontWeight: 800,
            fontSize: "clamp(48px, 10vw, 96px)",
            lineHeight: "110%",
            letterSpacing: "-0.03em",
            background: "linear-gradient(90deg, #FF6200 0%, #D4A892 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Oops!
        </h1>

        {/* Page not found text */}
        <p
          className="text-center mb-12"
          style={{
            fontFamily: "Onest",
            fontWeight: 500,
            fontSize: "clamp(18px, 4vw, 24px)",
            lineHeight: "110%",
            letterSpacing: "-0.03em",
            color: isDark ? "#FFFFFF" : "#212121",
          }}
        >
          Page not found
        </p>

        {/* 404 illustration */}
        <div className="mb-16 w-full max-w-[600px]">
          <img src="/images/objects.png" alt="404 - People carrying large 3D numbers" className="w-full h-auto" />
        </div>

        {/* Back to Homepage button */}
        <Link
          href="/"
          className="btn-primary px-8 py-4 transition-all duration-300 ease-out"
          style={{
            fontFamily: "Onest",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "100%",
            letterSpacing: "0.02em",
            borderRadius: "50px",
            background: "linear-gradient(180deg, #FF6200 0%, #FF6200 100%)",
            color: "#FFFFFF",
            border: "none",
            textDecoration: "none",
            display: "inline-block",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(180deg, #FF6200 0%, #CC4E00 100%)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(180deg, #FF6200 0%, #FF6200 100%)"
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.background = "linear-gradient(180deg, #CC4E00 0%, #994000 100%)"
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.background = "linear-gradient(180deg, #FF6200 0%, #CC4E00 100%)"
          }}
        >
          Back to Homepage
        </Link>
      </main>
    </div>
  )
}
