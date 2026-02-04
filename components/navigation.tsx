"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { LocaleToggle } from "@/components/locale-toggle"
import { useLocale } from "@/lib/locale-context"
import { useTheme } from "@/lib/theme-context"
import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp, Building2, Award, Briefcase, Menu } from "lucide-react"
import { ContactFormModal } from "@/components/contact-form-modal"

export function Navigation() {
  const { locale, t } = useLocale()
  const { theme } = useTheme()

  const [companyOpen, setCompanyOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null)

  const isDark = theme === "dark"
  const navBg = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.15)"
  const navBorder = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.5)"
  const textColor = isDark ? "#FFFFFF" : "#000000"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const [isScrolled, setIsScrolled] = useState(false)

  const handleMouseEnter = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    setCompanyOpen(true)
  }

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => setCompanyOpen(false), 200)
  }

  return (
    <>
      <ContactFormModal isOpen={contactFormOpen} onClose={() => setContactFormOpen(false)} />

      {/* Desktop Navigation */}
      <nav className="fixed top-10 left-1/2 -translate-x-1/2 z-50 hidden xl:block">
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
            <img
              src={isDark ? "/images/logo-dark.svg" : "/images/logo-light.svg"}
              alt="IdeaTeam"
              width="120"
              height="19"
              className="block"
            />
          </Link>

          <div className="flex items-center flex-shrink min-w-0" style={{ gap: "40px" }}>
            {/* Company Dropdown */}
            <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <button
                onClick={() => setCompanyOpen(!companyOpen)}
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
                {t.company}
                {companyOpen ? (
                  <ChevronUp className="h-4 w-4" style={{ color: textColor }} />
                ) : (
                  <ChevronDown className="h-4 w-4" style={{ color: textColor }} />
                )}
              </button>

              {companyOpen && (
                <div
                  className="absolute z-50"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    top: "calc(100% + 8px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "auto",
                    minWidth: "552px",
                    maxWidth: "calc(100vw - 40px)",
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
                      borderBottom: `11px solid ${isDark ? "#212121" : "#FFFFFF"}`,
                    }}
                  />

                  {/* Dropdown content */}
                  <div
                    style={{
                      width: "100%",
                      minHeight: "300px",
                      borderRadius: "14px",
                      background: isDark ? "#212121" : "#FFFFFF",
                      padding: "20px",
                      display: "flex",
                      gap: "30px",
                      boxShadow: !isDark ? "0px 4px 4px 0px #00000040" : undefined,
                    }}
                  >
                    {/* Left column */}
                    <div className="flex-1 flex flex-col justify-center gap-4">
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
                      >
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                          style={{ background: "#FF6200" }}
                        >
                          <Building2 className="h-4 w-4 text-white" />
                        </div>
                        <span style={{ color: isDark ? "#FFFFFF" : "#212121" }}>{t.aboutUs}</span>
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
                      >
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                          style={{ background: "#FF6200" }}
                        >
                          <Award className="h-4 w-4 text-white" />
                        </div>
                        <span style={{ color: isDark ? "#FFFFFF" : "#212121" }}>{t.ourExperience}</span>
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
                      >
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                          style={{ background: "#FF6200" }}
                        >
                          <Briefcase className="h-4 w-4 text-white" />
                        </div>
                        <span style={{ color: isDark ? "#FFFFFF" : "#212121" }}>{t.careers}</span>
                      </Link>
                    </div>

                    {/* Right column with content and image */}
                    <div className="flex-1 flex flex-col justify-center items-center text-center gap-4">
                      <div
                        style={{
                          width: "200px",
                          height: "200px",
                          borderRadius: "12px",
                          background: "linear-gradient(135deg, #FF6200 0%, #FFB366 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 500 }}>20+ Countries</span>
                      </div>
                      <button
                        style={{
                          padding: "10px 24px",
                          borderRadius: "24px",
                          border: "2px solid #FF6200",
                          background: "transparent",
                          color: "#FF6200",
                          fontFamily: "Onest",
                          fontSize: "14px",
                          fontWeight: 500,
                          cursor: "pointer",
                        }}
                      >
                        Read All Reviews
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="relative" onMouseEnter={() => {
              if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
              setServicesOpen(true)
            }} onMouseLeave={() => {
              closeTimerRef.current = setTimeout(() => setServicesOpen(false), 200)
            }}>
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
                {t.services}
                {servicesOpen ? (
                  <ChevronUp className="h-4 w-4" style={{ color: textColor }} />
                ) : (
                  <ChevronDown className="h-4 w-4" style={{ color: textColor }} />
                )}
              </button>

              {servicesOpen && (
                <div
                  className="absolute z-50"
                  onMouseEnter={() => {
                    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
                    setServicesOpen(true)
                  }}
                  onMouseLeave={() => {
                    closeTimerRef.current = setTimeout(() => setServicesOpen(false), 200)
                  }}
                  style={{
                    top: "calc(100% + 8px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "auto",
                    minWidth: "552px",
                    maxWidth: "calc(100vw - 40px)",
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
                      borderBottom: `11px solid ${isDark ? "#212121" : "#FFFFFF"}`,
                    }}
                  />

                  {/* Dropdown content */}
                  <div
                    style={{
                      width: "100%",
                      minHeight: "300px",
                      borderRadius: "14px",
                      background: isDark ? "#212121" : "#FFFFFF",
                      padding: "20px",
                      display: "flex",
                      gap: "30px",
                      boxShadow: !isDark ? "0px 4px 4px 0px #00000040" : undefined,
                    }}
                  >
                    {/* Left and middle columns - 2 columns of services */}
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <Link
                        href="/services#custom-web"
                        className="flex items-center gap-3 transition-all duration-300 ease-out group"
                        style={{
                          height: "44px",
                          padding: "10px",
                          borderRadius: "8px",
                          background: isDark ? "#212121" : "#FFFFFF",
                          fontFamily: "Onest",
                          fontWeight: 500,
                          fontSize: "14px",
                          lineHeight: "110%",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        <div
                          className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                          style={{ background: "#FF6200" }}
                        >
                          <Building2 className="h-3 w-3 text-white" />
                        </div>
                        <span style={{ color: isDark ? "#FFFFFF" : "#212121" }}>Custom web solutions</span>
                      </Link>

                      <Link
                        href="/services#qa"
                        className="flex items-center gap-3 transition-all duration-300 ease-out group"
                        style={{
                          height: "44px",
                          padding: "10px",
                          borderRadius: "8px",
                          background: isDark ? "#212121" : "#FFFFFF",
                          fontFamily: "Onest",
                          fontWeight: 500,
                          fontSize: "14px",
                          lineHeight: "110%",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        <div
                          className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                          style={{ background: "#FF6200" }}
                        >
                          <Award className="h-3 w-3 text-white" />
                        </div>
                        <span style={{ color: isDark ? "#FFFFFF" : "#212121" }}>Manual and Automation QA</span>
                      </Link>

                      <Link
                        href="/services#mobile"
                        className="flex items-center gap-3 transition-all duration-300 ease-out group"
                        style={{
                          height: "44px",
                          padding: "10px",
                          borderRadius: "8px",
                          background: isDark ? "#212121" : "#FFFFFF",
                          fontFamily: "Onest",
                          fontWeight: 500,
                          fontSize: "14px",
                          lineHeight: "110%",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        <div
                          className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                          style={{ background: "#FF6200" }}
                        >
                          <Briefcase className="h-3 w-3 text-white" />
                        </div>
                        <span style={{ color: isDark ? "#FFFFFF" : "#212121" }}>Mobile applications</span>
                      </Link>

                      <Link
                        href="/services#devops"
                        className="flex items-center gap-3 transition-all duration-300 ease-out group"
                        style={{
                          height: "44px",
                          padding: "10px",
                          borderRadius: "8px",
                          background: isDark ? "#212121" : "#FFFFFF",
                          fontFamily: "Onest",
                          fontWeight: 500,
                          fontSize: "14px",
                          lineHeight: "110%",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        <div
                          className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                          style={{ background: "#FF6200" }}
                        >
                          <Building2 className="h-3 w-3 text-white" />
                        </div>
                        <span style={{ color: isDark ? "#FFFFFF" : "#212121" }}>DevOps</span>
                      </Link>

                      <Link
                        href="/services#analytics"
                        className="flex items-center gap-3 transition-all duration-300 ease-out group"
                        style={{
                          height: "44px",
                          padding: "10px",
                          borderRadius: "8px",
                          background: isDark ? "#212121" : "#FFFFFF",
                          fontFamily: "Onest",
                          fontWeight: 500,
                          fontSize: "14px",
                          lineHeight: "110%",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        <div
                          className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                          style={{ background: "#FF6200" }}
                        >
                          <Award className="h-3 w-3 text-white" />
                        </div>
                        <span style={{ color: isDark ? "#FFFFFF" : "#212121" }}>Data Analytics</span>
                      </Link>

                      <Link
                        href="/services#design"
                        className="flex items-center gap-3 transition-all duration-300 ease-out group"
                        style={{
                          height: "44px",
                          padding: "10px",
                          borderRadius: "8px",
                          background: isDark ? "#212121" : "#FFFFFF",
                          fontFamily: "Onest",
                          fontWeight: 500,
                          fontSize: "14px",
                          lineHeight: "110%",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        <div
                          className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                          style={{ background: "#FF6200" }}
                        >
                          <Briefcase className="h-3 w-3 text-white" />
                        </div>
                        <span style={{ color: isDark ? "#FFFFFF" : "#212121" }}>UI/UX and Graphic Design</span>
                      </Link>
                    </div>

                    {/* Right column with image and button */}
                    <div className="flex-1 flex flex-col justify-center items-center gap-4">
                      <div
                        style={{
                          width: "180px",
                          height: "200px",
                          borderRadius: "12px",
                          background: "linear-gradient(135deg, #FF6200 0%, #FFB366 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 500 }}>All Services</span>
                      </div>
                      <button
                        style={{
                          padding: "10px 24px",
                          borderRadius: "24px",
                          border: "2px solid #FF6200",
                          background: "transparent",
                          color: "#FF6200",
                          fontFamily: "Onest",
                          fontSize: "14px",
                          fontWeight: 500,
                          cursor: "pointer",
                        }}
                      >
                        View All
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Projects Dropdown */}
            <div className="relative" onMouseEnter={() => {
              if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
              setProjectsOpen(true)
            }} onMouseLeave={() => {
              closeTimerRef.current = setTimeout(() => setProjectsOpen(false), 200)
            }}>
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
                {t.projects}
                {projectsOpen ? (
                  <ChevronUp className="h-4 w-4" style={{ color: textColor }} />
                ) : (
                  <ChevronDown className="h-4 w-4" style={{ color: textColor }} />
                )}
              </button>

              {projectsOpen && (
                <div
                  className="absolute z-50"
                  onMouseEnter={() => {
                    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
                    setProjectsOpen(true)
                  }}
                  onMouseLeave={() => {
                    closeTimerRef.current = setTimeout(() => setProjectsOpen(false), 200)
                  }}
                  style={{
                    top: "calc(100% + 8px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "auto",
                    minWidth: "552px",
                    maxWidth: "calc(100vw - 40px)",
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
                      borderBottom: `11px solid ${isDark ? "#212121" : "#FFFFFF"}`,
                    }}
                  />

                  {/* Dropdown content */}
                  <div
                    style={{
                      width: "100%",
                      minHeight: "300px",
                      borderRadius: "14px",
                      background: isDark ? "#212121" : "#FFFFFF",
                      padding: "20px",
                      display: "flex",
                      gap: "30px",
                      boxShadow: !isDark ? "0px 4px 4px 0px #00000040" : undefined,
                    }}
                  >
                    {/* Left column with image */}
                    <div className="flex-1 flex items-center justify-center">
                      <div
                        style={{
                          width: "200px",
                          height: "240px",
                          borderRadius: "12px",
                          background: "linear-gradient(135deg, #FF6200 0%, #FFB366 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 500, textAlign: "center" }}>Multi-brand E-commerce Landing Pages</span>
                      </div>
                    </div>

                    {/* Right column with project list and button */}
                    <div className="flex-1 flex flex-col justify-center gap-3">
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <h3 style={{ fontFamily: "Onest", fontWeight: 600, fontSize: "16px", color: isDark ? "#FFFFFF" : "#212121", margin: 0 }}>
                          Multi-brand eCommerce Landing Pages
                        </h3>
                        <p style={{ fontFamily: "Onest", fontWeight: 400, fontSize: "14px", color: isDark ? "#CCCCCC" : "#666666", margin: 0 }}>
                          Statistics Platform
                        </p>
                        <p style={{ fontFamily: "Onest", fontWeight: 400, fontSize: "14px", color: isDark ? "#CCCCCC" : "#666666", margin: 0 }}>
                          Sensor Infobox
                        </p>
                        <p style={{ fontFamily: "Onest", fontWeight: 400, fontSize: "14px", color: isDark ? "#CCCCCC" : "#666666", margin: 0 }}>
                          High-performance eCommerce platform
                        </p>
                      </div>

                      <div style={{ marginTop: "12px" }}>
                        <h4 style={{ fontFamily: "Onest", fontWeight: 600, fontSize: "16px", color: isDark ? "#FFFFFF" : "#212121", margin: "0 0 12px 0" }}>
                          A Portfolio of Our Flagship Projects
                        </h4>
                        <button
                          style={{
                            padding: "10px 24px",
                            borderRadius: "24px",
                            border: "2px solid #FF6200",
                            background: "transparent",
                            color: "#FF6200",
                            fontFamily: "Onest",
                            fontSize: "14px",
                            fontWeight: 500,
                            cursor: "pointer",
                          }}
                        >
                          Explore All Portfolio
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation links */}
            <Link href="/blog" style={{ color: textColor, textDecoration: "none", fontSize: "16px" }}>
              {t.blog}
            </Link>
            <Link href="/careers" style={{ color: textColor, textDecoration: "none", fontSize: "16px" }}>
              {t.careers}
            </Link>
            <ThemeToggle />
            <LocaleToggle />
            <button
              onClick={() => setContactFormOpen(true)}
              className="px-6 py-2 rounded-full transition-colors"
              style={{
                background: "#FF6200",
                color: "#FFFFFF",
                fontFamily: "Onest",
                fontSize: "16px",
                border: "none",
                cursor: "pointer",
              }}
            >
              {t.contactUs}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 xl:hidden"
        style={{
          background: isScrolled ? "#FFFFFF26" : "transparent",
          border: isScrolled ? "1px solid #FFFFFF1A" : "none",
          backdropFilter: isScrolled ? "blur(40px)" : "none",
          paddingTop: "44px",
          paddingBottom: "44px",
          paddingLeft: "24px",
          paddingRight: "24px",
          transition: "all 300ms ease-out",
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src={isDark ? "/images/logo-dark.svg" : "/images/logo-light.svg"}
              alt="IdeaTeam"
              style={{
                width: "120px",
                height: "18.46px",
              }}
            />
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <LocaleToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
              style={{ background: "transparent", border: "none", cursor: "pointer" }}
            >
              <Menu className="h-6 w-6" style={{ color: textColor }} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <Link href="/about" style={{ color: textColor, textDecoration: "none" }}>
              {t.aboutUs}
            </Link>
            <Link href="/experience" style={{ color: textColor, textDecoration: "none" }}>
              {t.ourExperience}
            </Link>
            <Link href="/careers" style={{ color: textColor, textDecoration: "none" }}>
              {t.careers}
            </Link>
            <Link href="/blog" style={{ color: textColor, textDecoration: "none" }}>
              {t.blog}
            </Link>
            <button
              onClick={() => setContactFormOpen(true)}
              className="px-6 py-2 rounded-full transition-colors w-full"
              style={{
                background: "#FF6200",
                color: "#FFFFFF",
                fontFamily: "Onest",
                fontSize: "16px",
                border: "none",
                cursor: "pointer",
              }}
            >
              {t.contactUs}
            </button>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navigation
