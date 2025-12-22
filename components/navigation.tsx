"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { LocaleToggle } from "@/components/locale-toggle"
import { useLocale } from "@/lib/locale-context"
import { useTheme } from "@/lib/theme-context"
import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp, Building2, Award, Briefcase, Menu } from "lucide-react"

export function Navigation() {
  const { t } = useLocale()
  const { theme } = useTheme()
  const [companyOpen, setCompanyOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoverStates, setHoverStates] = useState<{ [key: number]: string }>({})
  const [isScrolled, setIsScrolled] = useState(false)
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null)
  const closeTimerRefServices = useRef<NodeJS.Timeout | null>(null)
  const closeTimerRefProjects = useRef<NodeJS.Timeout | null>(null)

  const isDark = theme === "dark"
  const navBg = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.15)"
  const navBorder = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.5)"
  const textColor = isDark ? "#FFFFFF" : "#000000"

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  const handleServicesMouseEnter = () => {
    if (closeTimerRefServices.current) {
      clearTimeout(closeTimerRefServices.current)
      closeTimerRefServices.current = null
    }
    setServicesOpen(true)
  }

  const handleServicesMouseLeave = () => {
    closeTimerRefServices.current = setTimeout(() => {
      setServicesOpen(false)
    }, 200)
  }

  const handleProjectsMouseEnter = () => {
    if (closeTimerRefProjects.current) {
      clearTimeout(closeTimerRefProjects.current)
      closeTimerRefProjects.current = null
    }
    setProjectsOpen(true)
  }

  const handleProjectsMouseLeave = () => {
    closeTimerRefProjects.current = setTimeout(() => {
      setProjectsOpen(false)
    }, 200) // Increased delay from 100ms to 200ms to match other dropdowns
  }

  const handleProjectHover = (index: number, state: string) => {
    setHoverStates((prevStates) => ({
      ...prevStates,
      [index]: state,
    }))
  }

  return (
    <>
      <nav className="fixed top-10 left-1/2 -translate-x-1/2 z-50 hidden lg:block">
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
                      boxShadow: !isDark ? "0px 4px 4px 0px #00000040" : undefined,
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
                          className="absolute bottom-3.5 left-3.5 transition-all duration-300 ease-out"
                          style={{
                            width: "168px",
                            height: "30px",
                            borderRadius: "50px",
                            border: "1px solid #FF6200",
                            paddingTop: "4px",
                            paddingRight: "14px",
                            paddingBottom: "4px",
                            paddingLeft: "14px",
                            backdropFilter: "blur(4px)",
                            fontFamily: "Onest",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            color: isDark ? "#FFFFFF" : "#212121",
                            background: "transparent",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#FF62001A"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent"
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.background = "#FF620099"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.background = "#FF62001A"
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
            <div className="relative" onMouseEnter={handleServicesMouseEnter} onMouseLeave={handleServicesMouseLeave}>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-1 transition-all ease-out h-10 px-4 rounded-[50px] whitespace-nowrap"
                style={{
                  fontFamily: "Onest",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "0.02em",
                  color: textColor,
                  background: servicesOpen
                    ? isDark
                      ? "rgba(255, 255, 255, 0.15)"
                      : "rgba(255, 255, 255, 0.15)"
                    : "transparent",
                  border: servicesOpen
                    ? isDark
                      ? "1px solid rgba(255, 255, 255, 0.1)"
                      : "1px solid rgba(0, 0, 0, 0.1)"
                    : "1px solid transparent",
                  transitionDuration: "300ms",
                }}
              >
                Services
                {servicesOpen ? (
                  <ChevronUp className="h-4 w-4" style={{ color: textColor }} />
                ) : (
                  <ChevronDown className="h-4 w-4" style={{ color: textColor }} />
                )}
              </button>

              {servicesOpen && (
                <div
                  className="absolute left-0 animate-in fade-in"
                  style={{
                    top: "46px",
                    animationTimingFunction: "ease-out",
                    animationDuration: "300ms",
                  }}
                >
                  {/* Polygon arrow */}
                  <div
                    className="absolute"
                    style={{
                      top: "0px",
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
                      height: "207px",
                      borderRadius: "14px",
                      background: isDark ? "#212121" : "#FFFFFF",
                      boxShadow: !isDark ? "0px 4px 4px 0px #00000040" : undefined,
                    }}
                  >
                    <div className="flex h-full p-5 gap-5">
                      {/* Column 1 - 30% width */}
                      <div className="flex flex-col gap-3" style={{ width: "30%" }}>
                        <Link
                          href="/services_dark"
                          className="transition-all duration-300 ease-out p-2"
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0.02em",
                            color: isDark ? "#FFFFFF99" : "#21212199",
                            borderRadius: "8px",
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
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          Custom web solutions
                        </Link>
                        <Link
                          href="/services_dark"
                          className="transition-all duration-300 ease-out p-2"
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0.02em",
                            color: isDark ? "#FFFFFF99" : "#21212199",
                            borderRadius: "8px",
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
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          Mobile aplications
                        </Link>
                        <Link
                          href="/services_dark"
                          className="transition-all duration-300 ease-out p-2"
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0.02em",
                            color: isDark ? "#FFFFFF99" : "#21212199",
                            borderRadius: "8px",
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
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          UI/UX and Graphic Design
                        </Link>
                      </div>

                      {/* Column 2 - 30% width */}
                      <div className="flex flex-col gap-3" style={{ width: "30%" }}>
                        <Link
                          href="/services_dark"
                          className="transition-all duration-300 ease-out p-2"
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0.02em",
                            color: isDark ? "#FFFFFF99" : "#21212199",
                            borderRadius: "8px",
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
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          Manual and Automation QA
                        </Link>
                        <Link
                          href="/services_dark"
                          className="transition-all duration-300 ease-out p-2"
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0.02em",
                            color: isDark ? "#FFFFFF99" : "#21212199",
                            borderRadius: "8px",
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
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          DevOps
                        </Link>
                        <Link
                          href="/services_dark"
                          className="transition-all duration-300 ease-out p-2"
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0.02em",
                            color: isDark ? "#FFFFFF99" : "#21212199",
                            borderRadius: "8px",
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
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          Data Analytics
                        </Link>
                      </div>

                      {/* Column 3 - Blog Article Card - 40% width */}
                      <div style={{ width: "40%", display: "flex", justifyContent: "center" }}>
                        <Link
                          href="/services_dark"
                          className="relative overflow-hidden transition-all duration-300 ease-out"
                          style={{
                            width: "196px",
                            height: "157px",
                            borderRadius: "6px",
                            boxShadow: "0px 4px 4px 0px #00000040",
                          }}
                        >
                          <img
                            src="/images/blog-article-laptop.jpg"
                            alt="Blog article"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-3 left-3.5 right-3.5">
                            <h3
                              style={{
                                fontFamily: "Onest",
                                fontWeight: 500,
                                fontSize: "16px",
                                lineHeight: "110%",
                                letterSpacing: "-0.03em",
                                color: "#FFFFFF",
                              }}
                            >
                              Article from blog
                            </h3>
                          </div>
                          <button
                            className="absolute bottom-3.5 left-3.5 transition-all duration-300 ease-out"
                            style={{
                              width: "168px",
                              height: "30px",
                              borderRadius: "50px",
                              border: "1px solid #FF6200",
                              paddingTop: "4px",
                              paddingRight: "14px",
                              paddingBottom: "4px",
                              paddingLeft: "14px",
                              backdropFilter: "blur(4px)",
                              fontFamily: "Onest",
                              fontWeight: 400,
                              fontSize: "16px",
                              lineHeight: "100%",
                              color: "#FFFFFF",
                              background: "transparent",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#FF62001A"
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent"
                            }}
                            onMouseDown={(e) => {
                              e.currentTarget.style.background = "#FF620099"
                            }}
                            onMouseUp={(e) => {
                              e.currentTarget.style.background = "#FF62001A"
                            }}
                          >
                            Read All
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Projects Dropdown */}
            <div className="relative" onMouseEnter={handleProjectsMouseEnter} onMouseLeave={handleProjectsMouseLeave}>
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

              {projectsOpen && (
                <div
                  className="absolute z-50"
                  onMouseEnter={handleProjectsMouseEnter}
                  onMouseLeave={handleProjectsMouseLeave}
                  style={{
                    top: "46px", // Changed top position to 46px margin from navigation top
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "552px",
                  }}
                >
                  {/* Triangle pointer */}
                  <div
                    className="absolute"
                    style={{
                      top: "-11px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 0,
                      height: 0,
                      borderLeft: "11px solid transparent",
                      borderRight: "11px solid transparent",
                      borderBottom: `11px solid ${isDark ? "#212121" : "#F5F5F5"}`,
                    }}
                  />

                  {/* Dropdown content */}
                  <div
                    style={{
                      width: "552px",
                      height: "315px",
                      borderRadius: "14px",
                      background: isDark ? "#212121" : "#F5F5F5",
                      padding: "20px",
                      display: "flex",
                      gap: "20px",
                      boxShadow: "0px 4px 4px 0px #00000040",
                    }}
                  >
                    {/* Left Column - Image */}
                    <div style={{ width: "50%" }}>
                      <Link
                        href="/projects"
                        onClick={() => setProjectsOpen(false)}
                        style={{
                          display: "block",
                          width: "235px",
                          height: "276px",
                          borderRadius: "6px",
                          background: "#000000",
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <img
                          src="/images/projects-laptop.png"
                          alt="Multi-brand eCommerce Landing Pages"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Link>
                    </div>

                    {/* Right Column - Project Links */}
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        <Link
                          href="/projects"
                          onClick={() => setProjectsOpen(false)}
                          className="transition-all duration-300 ease-out"
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0.02em",
                            color: isDark ? "#FFFFFF99" : "#21212199",
                            padding: "6px 8px",
                            borderRadius: "8px",
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                            e.currentTarget.style.border = "1px solid #FF620033"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                            e.currentTarget.style.border = "none"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          Multi-brand eCommerce Landing Pages
                        </Link>
                        <Link
                          href="/projects"
                          onClick={() => setProjectsOpen(false)}
                          className="transition-all duration-300 ease-out"
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0.02em",
                            color: isDark ? "#FFFFFF99" : "#21212199",
                            padding: "6px 8px",
                            borderRadius: "8px",
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                            e.currentTarget.style.border = "1px solid #FF620033"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                            e.currentTarget.style.border = "none"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          Statistics Platform
                        </Link>
                        <Link
                          href="/projects"
                          onClick={() => setProjectsOpen(false)}
                          className="transition-all duration-300 ease-out"
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0.02em",
                            color: isDark ? "#FFFFFF99" : "#21212199",
                            padding: "6px 8px",
                            borderRadius: "8px",
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                            e.currentTarget.style.border = "1px solid #FF620033"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                            e.currentTarget.style.border = "none"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          Sensor Infobox
                        </Link>
                        <Link
                          href="/projects"
                          onClick={() => setProjectsOpen(false)}
                          className="transition-all duration-300 ease-out"
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "100%",
                            letterSpacing: "0.02em",
                            color: isDark ? "#FFFFFF99" : "#21212199",
                            padding: "6px 8px",
                            borderRadius: "8px",
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                            e.currentTarget.style.border = "1px solid #FF620033"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                            e.currentTarget.style.border = "none"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = isDark ? "#303030" : "#E6E6E6"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.border = "none"
                          }}
                        >
                          High-performance eCommerce platform
                        </Link>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                          marginTop: "28px", // Updated from 14px to 28px for spacing between projects and heading
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 500,
                            fontSize: "24px",
                            lineHeight: "110%",
                            letterSpacing: "-0.03em",
                            color: isDark ? "#FFFFFF" : "#000000",
                            margin: 0,
                          }}
                        >
                          A Portfolio of Our Flagship Projects
                        </h3>
                        <Link
                          href="/projects"
                          onClick={() => setProjectsOpen(false)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#FF62001A"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent"
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.background = "#FF620099"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.background = "#FF62001A"
                          }}
                          style={{
                            fontFamily: "Onest",
                            fontWeight: 500,
                            fontSize: "16px",
                            color: isDark ? "#FFFFFF" : "#212121",
                            padding: "4px 14px",
                            borderRadius: "50px",
                            border: "1px solid #FF6200",
                            background: "transparent",
                            backdropFilter: "blur(4px)",
                            textAlign: "center",
                            transition: "all 300ms ease-out",
                            textDecoration: "none",
                            display: "inline-block",
                            width: "193px",
                            height: "30px",
                            lineHeight: "22px",
                          }}
                        >
                          Explore All Portfolio
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

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

      {/* Mobile Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 lg:hidden"
        style={{
          background: isScrolled ? "#FFFFFF26" : "transparent",
          border: isScrolled ? "1px solid #FFFFFF1A" : "none",
          backdropFilter: isScrolled ? "blur(40px)" : "none",
          boxShadow: isScrolled ? "0px 4px 20px 0px #58473D1A" : "none",
          borderRadius: isScrolled ? "50px" : "0px",
          height: isScrolled ? "52px" : "auto",
          paddingTop: isScrolled ? "6px" : "44px",
          paddingBottom: isScrolled ? "6px" : "44px",
          paddingLeft: "24px",
          paddingRight: "24px",
          transition: "all 300ms ease-out",
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {isDark ? (
              <img
                src="/images/logo-dark.svg"
                alt="IdeaTeam"
                style={{
                  width: "120px",
                  height: "18.46px",
                }}
              />
            ) : (
              <img
                src="/images/logo-light.svg"
                alt="IdeaTeam"
                style={{
                  width: "120px",
                  height: "18.46px",
                }}
              />
            )}
          </Link>

          <div className="flex items-center" style={{ gap: "0px" }}>
            {/* Language Switcher */}
            <div
              style={{
                width: "62px",
                height: "40px",
                borderRadius: "50px",
                gap: "6px",
                padding: "6px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Onest",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
                textAlign: "center",
              }}
            >
              <LocaleToggle />
            </div>

            {/* Dark/Light Mode Switcher */}
            <div
              style={{
                width: "64px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ThemeToggle />
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center"
              style={{
                width: "44px",
                height: "44px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              aria-label="Toggle menu"
            >
              <Menu
                style={{
                  width: "24px",
                  height: "24px",
                  color: textColor,
                }}
              />
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}
