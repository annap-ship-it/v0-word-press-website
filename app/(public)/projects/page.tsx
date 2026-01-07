"use client"

import type React from "react"
import { useLocale } from "@/lib/locale-context"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { createBrowserClient } from "@/lib/supabase/client"

interface Project {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image: string
  content: any
  created_at: string
}

// Extract project data from content blocks
function extractProjectData(content: any) {
  const data = {
    challenge: "",
    solution: "",
    result: "",
    stack: [] as string[],
  }

  if (!content || !Array.isArray(content)) return data

  content.forEach((block: any) => {
    if (block.type === "paragraph" || block.type === "heading") {
      const text = block.content || ""
      if (text.toLowerCase().startsWith("challenge:")) {
        data.challenge = text.replace(/^challenge:\s*/i, "")
      } else if (text.toLowerCase().startsWith("solution:")) {
        data.solution = text.replace(/^solution:\s*/i, "")
      } else if (text.toLowerCase().startsWith("result:")) {
        data.result = text.replace(/^result:\s*/i, "")
      } else if (text.toLowerCase().startsWith("stack:")) {
        data.stack = text
          .replace(/^stack:\s*/i, "")
          .split(",")
          .map((s: string) => s.trim())
      }
    }
  })

  // Try to extract from metafields if available
  if (content.metafields) {
    if (content.metafields.challenge) data.challenge = content.metafields.challenge
    if (content.metafields.solution) data.solution = content.metafields.solution
    if (content.metafields.result) data.result = content.metafields.result
    if (content.metafields.stack) data.stack = content.metafields.stack.split(",").map((s: string) => s.trim())
  }

  return data
}

// Default projects for display when no posts exist
const defaultProjects = [
  {
    id: "1",
    title: "Internal Monitoring System for Symbotic",
    slug: "internal-monitoring-system-symbotic",
    featured_image: "/images/3a8ceacf9a599490d7b40d1ec06dca37f1ea0d31.jpg",
    challenge: "Develop a scalable internal monitoring tool with real-time data updates.",
    solution:
      "Designed full architecture, implemented GraphQL APIs, and built the admin frontend using Vue.js and Vuex. Integrated Web Push notifications and Apollo Client for real-time updates.",
    result: "Efficient, scalable monitoring system with live data delivery.",
    stack: ["Vue.js", "GraphQL", "MongoDB", "Node.js", "Apollo Client"],
  },
  {
    id: "2",
    title: "Intertop Sensor Infobox",
    slug: "intertop-sensor-infobox",
    featured_image: "/images/a4b670ec7fa05f0d5a4c674af059268a7f9bb862.jpg",
    challenge: "Provide real-time product availability across online and offline channels.",
    solution:
      "Developed an interactive in-store sensor infobox using Node.js, integrated with offline 1C and MSSQL databases to sync inventory data seamlessly.",
    result: "Improved customer experience with accurate, up-to-date product information in-store.",
    stack: ["PHP", "MySQL", "Node.js", "MSSQL", "jQuery", "Backbone"],
  },
  {
    id: "3",
    title: "Multi-brand E-commerce Landing Pages",
    slug: "multi-brand-ecommerce-landing-pages",
    featured_image: "/images/684e917a1465786de030e274e2232ff33cd056fe.png",
    challenge: "Create high-performance, SEO-friendly landing pages for major tech brands.",
    solution:
      "Developed multiple SPA landing pages (Lenovo, Samsung, Nokia, Panasonic) focusing on SEO, responsive design, and cross-browser compatibility. Optimized performance for high-traffic campaigns.",
    result: "Enhanced user engagement and increased visibility for marketing efforts.",
    stack: ["HTML", "CSS", "RequireJS", "Grunt", "jQuery", "Backbone"],
  },
  {
    id: "4",
    title: "Testing Expertise for a Sports Social Platform",
    slug: "testing-expertise-sports-social-platform",
    featured_image: "/images/56951b6f749b0c1c24e1b24aab787192b5cc65e2.jpg",
    challenge:
      "Ensure high product quality and stability during rapid development of an NBA-focused sports social platform.",
    solution:
      "Provided manual QA support covering 170+ tickets, tested new and existing features, identified critical bugs, collaborated with developers, and recommended Android devices.",
    result: "Improved release stability, higher product quality, and smoother QA processes.",
    stack: ["Manual Testing", "Team Collaboration Tools"],
  },
]

const techIcons: Record<string, string> = {
  HTML: "/icons/tech/html.svg",
  CSS: "/icons/tech/css.svg",
  RequireJS: "/icons/tech/requirejs.svg",
  Grunt: "/icons/tech/grunt.svg",
  jQuery: "/icons/tech/jquery.svg",
  Backbone: "/icons/tech/backbone.svg",
  "Vue.js": "/icons/tech/vuejs.svg",
  GraphQL: "/icons/tech/graphql.svg",
  MongoDB: "/icons/tech/mongodb.svg",
  "Node.js": "/icons/tech/nodejs.svg",
  "Apollo Client": "/icons/tech/apollo.svg",
  PHP: "/icons/tech/php.svg",
  MySQL: "/icons/tech/mysql.svg",
  MSSQL: "/icons/tech/mssql.svg",
  Vue: "/icons/tech/vuejs.svg",
  Node: "/icons/tech/nodejs.svg",
  NodeJS: "/icons/tech/nodejs.svg",
  Apollo: "/icons/tech/apollo.svg",
  Mongo: "/icons/tech/mongodb.svg",
}

function AnimatedCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
      }}
    >
      {children}
    </div>
  )
}

export default function ProjectsPage() {
  const { locale } = useLocale()

  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isDark, setIsDark] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [attachedFile, setAttachedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const recaptchaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    checkTheme()

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://www.google.com/recaptcha/api.js"
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  useEffect(() => {
    async function fetchProjects() {
      try {
        const supabase = createBrowserClient()

        // Get projects category ID
        const { data: category } = await supabase.from("categories").select("id").eq("slug", "projects").single()

        if (category) {
          const { data: posts } = await supabase
            .from("posts")
            .select("*")
            .eq("category_id", category.id)
            .eq("status", "published")
            .order("created_at", { ascending: false })

          if (posts && posts.length > 0) {
            const mappedProjects = posts.map((post) => {
              const projectData = extractProjectData(post.content)
              return {
                id: post.id,
                title: post.title,
                slug: post.slug,
                featured_image: post.featured_image || "/project-management-team.png",
                ...projectData,
              }
            })
            setProjects(mappedProjects)
          } else {
            setProjects(defaultProjects)
          }
        } else {
          setProjects(defaultProjects)
        }
      } catch (error) {
        console.error("Error fetching projects:", error)
        setProjects(defaultProjects)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleFileAttach = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".doc,.docx,.pdf,.ppt,.pptx,.jpg,.jpeg,.png"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file && file.size <= 3 * 1024 * 1024) {
        setAttachedFile(file)
      } else {
        alert("File must be less than 3MB")
      }
    }
    input.click()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!termsAccepted) {
      alert("Please accept Terms and Conditions")
      return
    }

    const recaptchaResponse = (recaptchaRef.current?.querySelector("textarea") as HTMLTextAreaElement)?.value

    if (!recaptchaResponse) {
      alert("Please complete the reCAPTCHA")
      return
    }

    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("message", formData.message)
      formDataToSend.append("subject", "Project Consultation Request")
      formDataToSend.append("recaptchaToken", recaptchaResponse)
      if (attachedFile) {
        formDataToSend.append("file", attachedFile)
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const translations = {
    en: {
      title: "Projects",
      subtitle: "Find out how we have turned our clients' inspiring ideas into high-end products",
      consultationTitle: "Request Free Consultation",
      processTitle: "What's the process?",
      processStep1: "Our specialist will reach out after reviewing your message",
      processStep2: "We'll create a roadmap to turn your vision into reality",
      nameLabel: "Your Name",
      emailLabel: "Your Email",
      messageLabel: "Your Message",
      attachLabel: "Attach File (optional)",
      termsLabel: "I agree to the Terms and Conditions",
      submitButton: "Send Request",
      successMessage: "Thank you! We'll be in touch soon.",
      errorMessage: "Error submitting form. Please try again.",
    },
    uk: {
      title: "Проекти",
      subtitle: "Дізнайтеся, як ми перетворили натхненні ідеї наших клієнтів на високоякісні продукти",
      consultationTitle: "Запитати безкоштовну консультацію",
      processTitle: "Як це працює?",
      processStep1: "Наш фахівець зв'яжеться з вами після розгляду вашого повідомлення",
      processStep2: "Ми створимо дорожну карту, щоб втілити вашу видіння в реальність",
      nameLabel: "Ваше ім'я",
      emailLabel: "Ваша електронна пошта",
      messageLabel: "Ваше повідомлення",
      attachLabel: "Додати файл (опціонально)",
      termsLabel: "Я згоден з Умовами та положеннями",
      submitButton: "Надіслати запит",
      successMessage: "Дякуємо! Ми скоро з вами зв'яжемося.",
      errorMessage: "Помилка при відправленні форми. Спробуйте ще раз.",
    },
  }

  const t = translations[locale as keyof typeof translations]

  const titleGradient = isDark
    ? "linear-gradient(90.39deg, #FF6200 34.5%, #FFFFFF 66.76%)"
    : "linear-gradient(90.39deg, #FF6200 34.5%, #000000 66.76%)"

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6200]"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      {/* Header Section */}
      <section className="pt-20 pb-10 px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <AnimatedCard>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 mt-24 pb-2"
              style={{
                backgroundImage: titleGradient,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: "1.2",
              }}
            >
              {t.title}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          </AnimatedCard>
        </div>
      </section>

      {/* Projects List */}
      <section className="py-10 px-6">
        <div className="max-w-[1280px] mx-auto space-y-8">
          {projects.map((project, index) => {
            const isReverse = index % 2 === 1

            return (
              <AnimatedCard key={project.id} delay={index * 100}>
                <Link href={`/projects/${project.slug}`} className="block group">
                  <div
                    className="rounded-[14px] overflow-hidden transition-all duration-300 hover:shadow-lg"
                    style={{
                      background: isDark
                        ? isReverse
                          ? "linear-gradient(70.46deg, #212121 57.09%, #FF6200 125.28%)"
                          : "linear-gradient(292.61deg, #212121 56.12%, #FF6200 111.19%)"
                        : isReverse
                          ? "linear-gradient(73.52deg, #FAF9F8 33.1%, #FFFFFF 75.27%, #FF6200 120.85%)"
                          : "linear-gradient(283.85deg, #FAF9F8 45%, #FFFFFF 77.04%, #FF6200 110.33%)",
                      boxShadow: isDark ? "none" : "2px 2px 20px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 ${isReverse ? "lg:flex-row-reverse" : ""}`}
                    >
                      {/* Image */}
                      <div className={`${isReverse ? "lg:order-2" : "lg:order-1"}`}>
                        <div className="relative w-full aspect-[16/10] rounded-[14px] overflow-hidden">
                          <Image
                            src={project.featured_image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`${isReverse ? "lg:order-1" : "lg:order-2"} flex flex-col justify-center`}>
                        <h2
                          className="text-xl md:text-2xl font-bold mb-4"
                          style={{ color: isDark ? "#FFFFFF" : "#000000" }}
                        >
                          {project.title}
                        </h2>

                        <div className="space-y-3 text-sm">
                          {project.challenge && (
                            <div className="flex gap-3">
                              <span className="font-semibold text-[#FF6200] min-w-[80px]">Challenge:</span>
                              <span style={{ color: isDark ? "#A0A0A0" : "#666666" }}>{project.challenge}</span>
                            </div>
                          )}
                          {project.solution && (
                            <div className="flex gap-3">
                              <span className="font-semibold text-[#FF6200] min-w-[80px]">Solution:</span>
                              <span style={{ color: isDark ? "#A0A0A0" : "#666666" }}>{project.solution}</span>
                            </div>
                          )}
                          {project.result && (
                            <div className="flex gap-3">
                              <span className="font-semibold text-[#FF6200] min-w-[80px]">Result:</span>
                              <span style={{ color: isDark ? "#A0A0A0" : "#666666" }}>{project.result}</span>
                            </div>
                          )}

                          {/* Stack */}
                          {project.stack && project.stack.length > 0 && (
                            <div className="flex gap-3 items-start pt-2">
                              <span className="font-semibold text-[#FF6200] min-w-[80px]">Stack:</span>
                              <div className="flex flex-wrap gap-2">
                                {project.stack.map((tech: string, i: number) => {
                                  const iconPath = techIcons[tech]
                                  return (
                                    <span
                                      key={i}
                                      className="px-3 py-1.5 rounded-[4px] text-xs font-medium flex items-center gap-2 transition-transform duration-200 hover:scale-105"
                                      style={{
                                        backgroundColor: isDark ? "#323130" : "#FFFFFF",
                                        color: isDark ? "#FFFFFF" : "#000000",
                                        border: isDark ? "none" : "1px solid #E0E0E0",
                                      }}
                                    >
                                      {iconPath && (
                                        <span
                                          className="flex items-center justify-center rounded-[2px] flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                                          style={{
                                            backgroundColor: "#FFFFFF",
                                            padding: "2px",
                                            width: "20px",
                                            height: "20px",
                                          }}
                                        >
                                          <Image
                                            src={iconPath || "/placeholder.svg"}
                                            alt={tech}
                                            width={16}
                                            height={16}
                                          />
                                        </span>
                                      )}
                                      {tech}
                                    </span>
                                  )
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedCard>
            )
          })}
        </div>
      </section>

      {/* Request Free Consultation Section */}
      <section className="py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <AnimatedCard>
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              style={{ color: isDark ? "#FFFFFF" : "#000000" }}
            >
              {t.consultationTitle}
            </h2>
          </AnimatedCard>

          {/* Process Steps */}
          <AnimatedCard delay={100}>
            <div className="rounded-[4px] p-6 mb-12" style={{ backgroundColor: isDark ? "#1E1E1E" : "#F5F5F5" }}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-[#FF6200] font-semibold text-lg mb-2">{t.processTitle}</h3>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-[#FF6200] flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-sm" style={{ color: isDark ? "#A0A0A0" : "#666666" }}>
                    {t.processStep1}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-[#FF6200] flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                  </div>
                  <p className="text-sm" style={{ color: isDark ? "#A0A0A0" : "#666666" }}>
                    {t.processStep2}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Contact Form */}
          <AnimatedCard delay={200}>
            {isSubmitted ? (
              <div
                className="rounded-[4px] p-12 text-center"
                style={{ backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF" }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500 flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: isDark ? "#FFFFFF" : "#000000" }}>
                  {t.successMessage}
                </h3>
                <p style={{ color: isDark ? "#A0A0A0" : "#666666" }}>
                  We've received your message and will get back to you soon.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder={t.nameLabel}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-[4px] border-b-2 border-transparent focus:border-[#FF6200] outline-none transition-colors"
                      style={{
                        backgroundColor: isDark ? "#1E1E1E" : "#F5F5F5",
                        color: isDark ? "#FFFFFF" : "#000000",
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder={t.emailLabel}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-[4px] border-b-2 border-transparent focus:border-[#FF6200] outline-none transition-colors"
                      style={{
                        backgroundColor: isDark ? "#1E1E1E" : "#F5F5F5",
                        color: isDark ? "#FFFFFF" : "#000000",
                      }}
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder={t.messageLabel}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-[4px] border-b-2 border-transparent focus:border-[#FF6200] outline-none transition-colors resize-none"
                      style={{
                        backgroundColor: isDark ? "#1E1E1E" : "#F5F5F5",
                        color: isDark ? "#FFFFFF" : "#000000",
                      }}
                    />
                  </div>

                  {/* Attach File */}
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={handleFileAttach}
                      className="flex items-center gap-2 px-4 py-2 rounded-[4px] border transition-colors hover:border-[#FF6200]"
                      style={{
                        borderColor: isDark ? "#3A3A3A" : "#E0E0E0",
                        color: isDark ? "#FFFFFF" : "#000000",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6200" strokeWidth="2">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                      </svg>
                      {t.attachLabel}
                    </button>
                    <span className="text-xs" style={{ color: isDark ? "#666666" : "#999999" }}>
                      No more than 3 files may be attached up to 3MB each. Formats: doc, docx, pdf, ppt, pptx.
                    </span>
                  </div>

                  {attachedFile && (
                    <div className="flex items-center gap-2 text-sm" style={{ color: isDark ? "#A0A0A0" : "#666666" }}>
                      <span>{attachedFile.name}</span>
                      <button
                        type="button"
                        onClick={() => setAttachedFile(null)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-full bg-[#FF6200] text-white font-semibold hover:bg-[#E55A00] transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : t.submitButton}
                  </button>

                  {/* Terms */}
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="terms-projects"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1"
                    />
                    <label
                      htmlFor="terms-projects"
                      className="text-sm"
                      style={{ color: isDark ? "#A0A0A0" : "#666666" }}
                    >
                      {t.termsLabel}{" "}
                      <Link href="/terms" className="text-[#FF6200] underline">
                        Terms and Conditions
                      </Link>
                      .
                      <br />
                      <span className="text-xs">
                        By submitting your email, you accept terms and conditions. We may send you occasionally
                        marketing emails.
                      </span>
                    </label>
                  </div>

                  {/* reCAPTCHA widget */}
                  <div
                    ref={recaptchaRef}
                    className="g-recaptcha"
                    data-sitekey="6LcKsjksAAAAAGoEUPaQnULL3xDPUW5c_bLP5EjT"
                  />
                </form>

                {/* Image */}
                <div className="relative w-full aspect-[4/3] rounded-[4px] overflow-hidden">
                  <Image
                    src="/images/903416dfea2ecdd32e83cc85f6e0cee9b2d4fb63.jpg"
                    alt="Our workspace"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </AnimatedCard>
        </div>
      </section>
    </main>
  )
}
