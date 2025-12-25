"use client"

import { useTheme } from "@/lib/theme-context"
import { useState, useEffect } from "react"
import Image from "next/image"
import CalculatorResults from "./calculator-results"

interface CalculatorModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CalculatorModal({ isOpen, onClose }: CalculatorModalProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [mounted, setMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const [selectedTech, setSelectedTech] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("")
  const [employmentType, setEmploymentType] = useState("")
  const [projectDuration, setProjectDuration] = useState("")

  const [errors, setErrors] = useState({
    tech: false,
    level: false,
    employment: false,
    duration: false,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setShowResults(false)
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen || !mounted) return null

  const handleCalculate = () => {
    const newErrors = {
      tech: !selectedTech,
      level: !selectedLevel,
      employment: !employmentType,
      duration: !projectDuration,
    }
    setErrors(newErrors)

    // If there are any errors, don't proceed
    if (Object.values(newErrors).some((error) => error)) {
      console.log("[v0] Validation failed:", newErrors)
      return
    }

    console.log("[v0] Calculator submitted:", { selectedTech, selectedLevel, employmentType, projectDuration })
    setShowResults(true)
  }

  const techOptions = ["JavaScript", "TypeScript", "HTML", "CSS", "React", "Node.js", "Python", "Java"]
  const filteredTechOptions = techOptions.filter((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))
  const levelOptions = ["Middle", "Middle+", "Senior", "Solution Architect", "Team Lead"]
  const durationOptions = ["Up to 2 months", "3 months to 6 months", "6 months to 1 year", "1 year"]

  if (showResults) {
    return <CalculatorResults onClose={onClose} />
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[640px] rounded-2xl p-10 shadow-lg"
        style={{
          backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center transition-opacity hover:opacity-70"
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="4" stroke={isDark ? "#FFFFFF" : "#000000"} strokeWidth="1.5" />
            <path
              d="M8 8L16 16M16 8L8 16"
              stroke={isDark ? "#FFFFFF" : "#000000"}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Title */}
        <h2
          className="mb-8 font-medium"
          style={{
            fontFamily: "Onest, sans-serif",
            fontSize: "clamp(28px, 5vw, 36px)",
            lineHeight: "90%",
            letterSpacing: "-0.03em",
            color: isDark ? "#FFFFFF" : "#000000",
          }}
        >
          Developer Rate Calculator
        </h2>

        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Left column - Form (60%) */}
          <div className="flex-1 md:w-[60%]">
            {/* 1. Technologie */}
            <div className="mb-6">
              <label
                className="block mb-3"
                style={{
                  fontFamily: "Onest, sans-serif",
                  fontSize: "20px",
                  lineHeight: "110%",
                  color: isDark ? "#FFFFFF" : "#000000",
                }}
              >
                1. Technologie:
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 border transition-colors rounded"
                  style={{
                    backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5",
                    borderColor: errors.tech ? "#EF4444" : isDark ? "#3A3A3A" : "#E0E0E0",
                    fontFamily: "Onest, sans-serif",
                    fontSize: "16px",
                    color: selectedTech ? (isDark ? "#FFFFFF" : "#000000") : isDark ? "#FFFFFF80" : "#00000080",
                  }}
                >
                  {selectedTech || "Select a Tech Stack"}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: isDropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke={isDark ? "#FFFFFF" : "#000000"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {errors.tech && (
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: "Onest, sans-serif",
                      fontSize: "14px",
                      color: "#EF4444",
                    }}
                  >
                    Select Item...
                  </p>
                )}

                {isDropdownOpen && (
                  <div
                    className="absolute top-full left-0 right-0 mt-2 border overflow-hidden z-10 rounded"
                    style={{
                      backgroundColor: isDark ? "#2A2A2A" : "#FFFFFF",
                      borderColor: isDark ? "#3A3A3A" : "#E0E0E0",
                    }}
                  >
                    {/* Search input */}
                    <div className="p-3 border-b" style={{ borderColor: isDark ? "#3A3A3A" : "#E0E0E0" }}>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Type a technology"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full px-4 py-2 pr-10 rounded border outline-none transition-all"
                          style={{
                            backgroundColor: isDark ? "#1E1E1E" : "#F5F5F5",
                            borderColor: isDark ? "#3A3A3A" : "#E0E0E0",
                            color: isDark ? "#FFFFFF" : "#000000",
                            fontFamily: "Onest, sans-serif",
                            fontSize: "16px",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#FF6200"
                            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255, 98, 0, 0.1)"
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = isDark ? "#3A3A3A" : "#E0E0E0"
                            e.currentTarget.style.boxShadow = "none"
                          }}
                        />
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          <circle cx="9" cy="9" r="6" stroke={isDark ? "#FFFFFF" : "#000000"} strokeWidth="1.5" />
                          <path
                            d="M13.5 13.5L17 17"
                            stroke={isDark ? "#FFFFFF" : "#000000"}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Tech options list */}
                    <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                      {filteredTechOptions.map((tech) => (
                        <button
                          key={tech}
                          onClick={() => {
                            setSelectedTech(tech)
                            setIsDropdownOpen(false)
                            setSearchQuery("")
                            setErrors((prev) => ({ ...prev, tech: false }))
                          }}
                          className="w-full text-left px-4 py-3 transition-all"
                          style={{
                            backgroundColor: selectedTech === tech ? (isDark ? "#3A3A3A" : "#F0F0F0") : "transparent",
                            fontFamily: "Onest, sans-serif",
                            fontSize: "16px",
                            color: isDark ? "#FFFFFF" : "#000000",
                          }}
                          onMouseEnter={(e) => {
                            if (selectedTech !== tech) {
                              e.currentTarget.style.backgroundColor = isDark ? "#2F2F2F" : "#F8F8F8"
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedTech !== tech) {
                              e.currentTarget.style.backgroundColor = "transparent"
                            }
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.backgroundColor = isDark ? "#404040" : "#E8E8E8"
                          }}
                          onMouseUp={(e) => {
                            if (selectedTech !== tech) {
                              e.currentTarget.style.backgroundColor = isDark ? "#2F2F2F" : "#F8F8F8"
                            }
                          }}
                        >
                          {tech}
                        </button>
                      ))}
                      {filteredTechOptions.length === 0 && (
                        <div
                          className="px-4 py-3 text-center"
                          style={{
                            fontFamily: "Onest, sans-serif",
                            fontSize: "16px",
                            color: isDark ? "#FFFFFF80" : "#00000080",
                          }}
                        >
                          No technologies found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Experience Level */}
            <div className="mb-6">
              <label
                className="block mb-3"
                style={{
                  fontFamily: "Onest, sans-serif",
                  fontSize: "20px",
                  lineHeight: "110%",
                  color: isDark ? "#FFFFFF" : "#000000",
                }}
              >
                2. Experience Level:
              </label>
              <div className="space-y-3">
                {levelOptions.map((level) => (
                  <label key={level} className="flex items-center cursor-pointer group">
                    <div className="relative w-[14px] h-[14px] mr-3">
                      {selectedLevel === level ? (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="7" cy="7" r="6.5" stroke="#FF6200" />
                          <circle cx="7" cy="7" r="4" fill="#FF6200" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="7" cy="7" r="6.5" stroke={errors.level ? "#EF4444" : "#999897"} />
                        </svg>
                      )}
                    </div>
                    <input
                      type="radio"
                      name="level"
                      value={level}
                      checked={selectedLevel === level}
                      onChange={(e) => {
                        setSelectedLevel(e.target.value)
                        setErrors((prev) => ({ ...prev, level: false }))
                      }}
                      className="sr-only"
                    />
                    <span
                      style={{
                        fontFamily: "Onest, sans-serif",
                        fontSize: "16px",
                        color: isDark ? "#FFFFFF" : "#000000",
                      }}
                    >
                      {level}
                    </span>
                  </label>
                ))}
              </div>
              {errors.level && (
                <p
                  className="mt-2"
                  style={{
                    fontFamily: "Onest, sans-serif",
                    fontSize: "14px",
                    color: "#EF4444",
                  }}
                >
                  Select Item...
                </p>
              )}
            </div>

            {/* 3. Employment Type */}
            <div className="mb-6">
              <label
                className="block mb-3"
                style={{
                  fontFamily: "Onest, sans-serif",
                  fontSize: "20px",
                  lineHeight: "110%",
                  color: isDark ? "#FFFFFF" : "#000000",
                }}
              >
                3. Employment Type:
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEmploymentType("Full-time")
                    setErrors((prev) => ({ ...prev, employment: false }))
                  }}
                  className="px-4 py-2 transition-all"
                  style={{
                    borderRadius: "4px",
                    backgroundColor: employmentType === "Full-time" ? "#FF6200" : isDark ? "#2A2A2A" : "#F5F5F5",
                    color: employmentType === "Full-time" ? "#FFFFFF" : isDark ? "#FFFFFF80" : "#00000080",
                    fontFamily: "Onest, sans-serif",
                    fontSize: "16px",
                    border: errors.employment ? "1px solid #EF4444" : "none",
                  }}
                >
                  Full-time
                </button>
                <button
                  onClick={() => {
                    setEmploymentType("Part-time")
                    setErrors((prev) => ({ ...prev, employment: false }))
                  }}
                  className="px-4 py-2 transition-all"
                  style={{
                    borderRadius: "4px",
                    backgroundColor: employmentType === "Part-time" ? "#FF6200" : isDark ? "#2A2A2A" : "#F5F5F5",
                    color: employmentType === "Part-time" ? "#FFFFFF" : isDark ? "#FFFFFF80" : "#00000080",
                    fontFamily: "Onest, sans-serif",
                    fontSize: "16px",
                    border: errors.employment ? "1px solid #EF4444" : "none",
                  }}
                >
                  Part-time
                </button>
              </div>
              {errors.employment && (
                <p
                  className="mt-2"
                  style={{
                    fontFamily: "Onest, sans-serif",
                    fontSize: "14px",
                    color: "#EF4444",
                  }}
                >
                  Select Item...
                </p>
              )}
            </div>

            {/* 4. Project Duration */}
            <div className="mb-8 md:mb-0">
              <label
                className="block mb-3"
                style={{
                  fontFamily: "Onest, sans-serif",
                  fontSize: "20px",
                  lineHeight: "110%",
                  color: isDark ? "#FFFFFF" : "#000000",
                }}
              >
                4. Project Duration:
              </label>
              <div className="space-y-3">
                {durationOptions.map((duration) => (
                  <label key={duration} className="flex items-center cursor-pointer group">
                    <div className="relative w-[14px] h-[14px] mr-3">
                      {projectDuration === duration ? (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="7" cy="7" r="6.5" stroke="#FF6200" />
                          <circle cx="7" cy="7" r="4" fill="#FF6200" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="7" cy="7" r="6.5" stroke={errors.duration ? "#EF4444" : "#999897"} />
                        </svg>
                      )}
                    </div>
                    <input
                      type="radio"
                      name="duration"
                      value={duration}
                      checked={projectDuration === duration}
                      onChange={(e) => {
                        setProjectDuration(e.target.value)
                        setErrors((prev) => ({ ...prev, duration: false }))
                      }}
                      className="sr-only"
                    />
                    <span
                      style={{
                        fontFamily: "Onest, sans-serif",
                        fontSize: "16px",
                        color: isDark ? "#FFFFFF" : "#000000",
                      }}
                    >
                      {duration}
                    </span>
                  </label>
                ))}
              </div>
              {errors.duration && (
                <p
                  className="mt-2"
                  style={{
                    fontFamily: "Onest, sans-serif",
                    fontSize: "14px",
                    color: "#EF4444",
                  }}
                >
                  Select Item...
                </p>
              )}
            </div>
          </div>

          {/* Right column - Core Team (40%) - visible on tablets, hidden on mobile */}
          <div className="hidden md:block md:w-[40%]">
            <h3
              className="mb-4"
              style={{
                fontFamily: "Onest, sans-serif",
                fontSize: "20px",
                lineHeight: "110%",
                color: isDark ? "#FFFFFF" : "#000000",
              }}
            >
              Core Team:
            </h3>
            <div className="flex flex-col">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-300">
                <Image
                  src="/male-developer-portrait.png"
                  alt="Team member"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-300 -mt-4">
                <Image
                  src="/female-developer-portrait.png"
                  alt="Team member"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-300 -mt-4">
                <Image
                  src="/female-developer-portrait-casual.jpg"
                  alt="Team member"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Calculate button */}
        <button
          className="w-full mt-8 py-3 rounded-full transition-all"
          style={{
            background: "linear-gradient(180deg, #FF6200 0%, #FF6200 100%)",
            color: "#FFFFFF",
            fontFamily: "Onest, sans-serif",
            fontSize: "16px",
            fontWeight: 500,
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
          onClick={handleCalculate}
        >
          Calculate
        </button>
      </div>
    </div>
  )
}

export default CalculatorModal
