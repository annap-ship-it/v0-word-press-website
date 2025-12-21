"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { LocaleToggle } from "@/components/locale-toggle"
import { useLocale } from "@/lib/locale-context"
import { useTheme } from "@/lib/theme-context"
import { useState, useRef } from "react"
import { ChevronDown, ChevronUp, Building2, Award, Briefcase } from "lucide-react"

export function Navigation() {
  const { t } = useLocale()
  const { theme } = useTheme()
  const [companyOpen, setCompanyOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null)

  const isDark = theme === "dark"
  const navBg = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.15)"
  const navBorder = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.5)"
  const textColor = isDark ? "#FFFFFF" : "#000000"

  const handleMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setCompanyOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setCompanyOpen(false)
    }, 200) // 200ms delay before closing
  }

  return (
    <nav className="fixed top-10 left-1/2 -translate-x-1/2 z-50">
      <div
        className="flex items-center justify-between h-[52px] rounded-[50px] border"
        style={{
          maxWidth: "calc(100vw - 80px)",
          width: "max-content",
          paddingLeft: "14px",
          paddingRight: "6px",
          paddingTop: "6px",
          paddingBottom: "6px",
          gap: "40px",
          background: navBg,
          backdropFilter: "blur(40px)",
          border: `1px solid ${navBorder}`,
          boxShadow: "0px 4px 20px 0px rgba(88, 71, 61, 0.1)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          {isDark ? (
            <img src="/images/logo-dark.svg" alt="IdeaTeam" width="120" height="19" className="block" />
          ) : (
            <img src="/images/logo-light.svg" alt="IdeaTeam" width="120" height="19" className="block" />
          )}
        </Link>

        <div className="flex items-center flex-shrink min-w-0" style={{ gap: "40px" }}>
          {/* Company Dropdown */}
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button
              onClick={() => setCompanyOpen(!companyOpen)}
              className="flex items-center gap-1 transition-all ease-out h-10 px-4 rounded-[50px] whitespace-nowrap"
              style={{
                fontFamily: "Onest",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0.02em",
                color: textColor,
                background: companyOpen
                  ? isDark
                    ? "rgba(255, 255, 255, 0.15)"
                    : "rgba(255, 255, 255, 0.15)"
                  : "transparent",
                border: companyOpen
                  ? isDark
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.1)"
                  : "1px solid transparent",
                transitionDuration: "300ms",
              }}
            >
              Company
              {companyOpen ? (
                <ChevronUp className="h-4 w-4" style={{ color: textColor }} />
              ) : (
                <ChevronDown className="h-4 w-4" style={{ color: textColor }} />
              )}
            </button>

            {companyOpen && (
              <div
                className="absolute left-0 animate-in fade-in"
                style={{
                  top: "46px", // 52px (nav height) - 6px (button padding) = 46px to touch nav bar edge
                  animationTimingFunction: "ease-out",
                  animationDuration: "300ms",
                }}
              >
                {/* Polygon positioned to start exactly at the dropdown container edge */}
                <div
                  className="absolute"
                  style={{
                    top: "0px", // Start exactly at the dropdown container edge
                    left: "81px",
                    width: "24px",
                    height: "17px",
                    zIndex: 20,
                  }}
                >
                  <svg
                    width="24"
                    height="17"
                    viewBox="0 0 24 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      display: "block",
                    }}
                  >
                    <path
                      d="M10.7655 0.480262C11.2677 -0.160087 12.2323 -0.160087 12.7345 0.480262L23.2017 13.7472C23.8518 14.5831 23.3039 15.8696 22.2672 15.8696H1.23282C0.196124 15.8696 -0.351794 14.5831 0.29833 13.7472L10.7655 0.480262Z"
                      fill={isDark ? "#212121" : "#FFFFFF"}
                    />
                  </svg>
                </div>

                {/* Dropdown content */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    marginTop: "17px",
                    width: "552px",
                    height: "196px",
                    borderRadius: "14px",
                    background: isDark ? "#212121" : "#FFFFFF",
                  }}
                >
                  <div className="flex h-full">
                    {/* Left column - Menu items */}
                    <div className="flex-1 p-6 flex flex-col justify-center gap-4">
                      <Link
                        href="/about"
                        className="flex items-center gap-5 transition-all duration-300 ease-out group"
                        style={{
                          width: "186px",
                          height: "44px",
                          padding: "10px",
                          borderRadius: "8px",
                          background: isDark ? "#212121" : "#FFFFFF",
                          fontFamily: "Onest",
                          fontWeight: 500,
                          fontSize: "16px",
                          lineHeight: "110%",
                          letterSpacing: "-0.03em",
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          e.currentTarget.style.border = "1px solid #FF620033"
                        }}
                        onMouseUp={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          e.currentTarget.style.border = "none"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = isDark ? "#212121" : "#FFFFFF"
                          e.currentTarget.style.border = "none"
                        }}
                      >
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                          style={{ background: "#FF6200" }}
                        >
                          <Building2 className="h-4 w-4 text-white" />
                        </div>
                        <span style={{ color: isDark ? "#FFFFFF" : "#212121" }}>About us</span>
                      </Link>

                      <Link
                        href="/experience"
                        className="flex items-center gap-5 transition-all duration-300 ease-out group"
                        style={{
                          width: "186px",
                          height: "44px",
                          padding: "10px",
                          borderRadius: "8px",
                          background: isDark ? "#212121" : "#FFFFFF",
                          fontFamily: "Onest",
                          fontWeight: 500,
                          fontSize: "16px",
                          lineHeight: "110%",
                          letterSpacing: "-0.03em",
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          e.currentTarget.style.border = "1px solid #FF620033"
                        }}
                        onMouseUp={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          e.currentTarget.style.border = "none"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = isDark ? "#212121" : "#FFFFFF"
                          e.currentTarget.style.border = "none"
                        }}
                      >
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                          style={{ background: "#FF6200" }}
                        >
                          <Award className="h-4 w-4 text-white" />
                        </div>
                        <span style={{ color: isDark ? "#FFFFFF" : "#212121" }}>Our experience</span>
                      </Link>

                      <Link
                        href="/careers"
                        className="flex items-center gap-5 transition-all duration-300 ease-out group"
                        style={{
                          width: "186px",
                          height: "44px",
                          padding: "10px",
                          borderRadius: "8px",
                          background: isDark ? "#212121" : "#FFFFFF",
                          fontFamily: "Onest",
                          fontWeight: 500,
                          fontSize: "16px",
                          lineHeight: "110%",
                          letterSpacing: "-0.03em",
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          e.currentTarget.style.border = "1px solid #FF620033"
                        }}
                        onMouseUp={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                          e.currentTarget.style.border = "1px solid #FF620033"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = isDark ? "#303030" : "#F5F5F5"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = isDark ? "#212121" : "#FFFFFF"
                          e.currentTarget.style.border = "none"
                        }}
                      >
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                          style={{ background: "#FF6200" }}
                        >
                          <Briefcase className="h-4 w-4 text-white" />
                        </div>
                        <span style={{ color: isDark ? "#FFFFFF" : "#212121" }}>Careers</span>
                      </Link>
                    </div>

                    {/* Right column - World map and stats */}
                    <div
                      className="relative"
                      style={{
                        width: "258px",
                        height: "167px",
                        top: "14px",
                        left: "274px",
                        position: "absolute",
                      }}
                    >
                      {/* World map background */}
                      <div
                        className="absolute"
                        style={{
                          width: "257.82px",
                          height: "166.81px",
                          top: "0.09px",
                          left: "0.09px",
                        }}
                      >
                        <img
                          src={isDark ? "/images/world-20map.svg" : "/images/world-map-light.svg"}
                          alt="World map"
                          style={{
                            width: "100%",
                            height: "100%",
                            border: "0.5px solid rgba(255, 255, 255, 0.5)",
                            opacity: 1,
                          }}
                        />
                      </div>

                      {/* 20+ text */}
                      <div
                        className="absolute z-10"
                        style={{
                          top: "10px",
                          left: "13px",
                          width: "43px",
                          height: "26px",
                          fontFamily: "Onest",
                          fontWeight: 800,
                          fontSize: "24px",
                          lineHeight: "110%",
                          letterSpacing: "-0.03em",
                          color: isDark ? "#FFFFFF" : "#212121", // Updated text color
                          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                          textAlign: "left",
                        }}
                      >
                        20+
                      </div>

                      {/* Different Countries text */}
                      <div
                        className="absolute z-10"
                        style={{
                          top: "36px",
                          left: "13px",
                          width: "138px",
                          height: "18px",
                          fontFamily: "Onest",
                          fontWeight: 500,
                          fontSize: "16px",
                          lineHeight: "110%",
                          letterSpacing: "-0.03em",
                          color: isDark ? "#FFFFFF" : "#212121", // Updated text color
                          textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Different Countries
                      </div>

                      {/* Read All Reviews button */}
                      <button
                        className="absolute z-10 bg-[#FFFFFF4D] hover:bg-[#FF62001A] active:bg-[#FF620099] active:backdrop-blur transition-all ease-out duration-300"
                        style={{
                          width: "163px",
                          height: "30px",
                          top: "132px",
                          left: "13px",
                          borderRadius: "50px",
                          border: "1px solid #FF6200",
                          paddingTop: "4px",
                          paddingRight: "14px",
                          paddingBottom: "4px",
                          paddingLeft: "14px",
                          fontFamily: "Onest",
                          fontWeight: 500,
                          fontSize: "16px",
                          lineHeight: "100%",
                          letterSpacing: "0%",
                          color: isDark ? "#FFFFFF" : "#212121", // Updated text color
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        Read All Reviews
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Services Dropdown */}
          <button
            onClick={() => setServicesOpen(!servicesOpen)}
            className="flex items-center gap-1 transition-colors whitespace-nowrap"
            style={{
              fontFamily: "Onest",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0.02em",
              color: textColor,
            }}
          >
            Services
            {servicesOpen ? (
              <ChevronUp className="h-4 w-4" style={{ color: textColor }} />
            ) : (
              <ChevronDown className="h-4 w-4" style={{ color: textColor }} />
            )}
          </button>

          {/* Projects Dropdown */}
          <button
            onClick={() => setProjectsOpen(!projectsOpen)}
            className="flex items-center gap-1 transition-colors whitespace-nowrap"
            style={{
              fontFamily: "Onest",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0.02em",
              color: textColor,
            }}
          >
            Projects
            {projectsOpen ? (
              <ChevronUp className="h-4 w-4" style={{ color: textColor }} />
            ) : (
              <ChevronDown className="h-4 w-4" style={{ color: textColor }} />
            )}
          </button>

          <Link
            href="/blog"
            className="transition-colors whitespace-nowrap"
            style={{
              fontFamily: "Onest",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0.02em",
              color: textColor,
            }}
          >
            Blog
          </Link>

          <Link
            href="/careers"
            className="transition-colors whitespace-nowrap"
            style={{
              fontFamily: "Onest",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0.02em",
              color: textColor,
            }}
          >
            Careers
          </Link>
        </div>

        <div className="flex items-center shrink-0" style={{ gap: "12px" }}>
          <LocaleToggle />
          <ThemeToggle />
          <button
            className="transition-all ease-out whitespace-nowrap bg-transparent hover:bg-[#FF62001A] active:bg-[#FF62004D] disabled:bg-[#FF62004D] disabled:cursor-not-allowed"
            style={{
              width: "120px",
              height: "40px",
              borderRadius: "50px",
              border: "1px solid #FF6200",
              padding: "4px 14px",
              fontFamily: "Onest",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0.02em",
              textAlign: "center",
              transitionDuration: "300ms",
              color: textColor,
            }}
          >
            Contact us
          </button>
        </div>
      </div>
    </nav>
  )
}
