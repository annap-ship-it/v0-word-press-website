"use client"

import type React from "react"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function ServicesPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    acceptTerms: false,
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDark, setIsDark] = useState(false)
  const recaptchaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains("dark")
      setIsDark(isDarkMode)
    }

    checkDarkMode()

    const observer = new MutationObserver(checkDarkMode)
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setSubmitStatus({ type: "error", message: "File size must be less than 10MB" })
        return
      }
      setSelectedFile(file)
      setSubmitStatus(null)
    }
  }

  const handleAttachClick = () => {
    fileInputRef.current?.click()
  }

  const removeFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.acceptTerms) {
      setSubmitStatus({ type: "error", message: "Please accept the Terms and Conditions" })
      return
    }

    const recaptchaResponse = (recaptchaRef.current?.querySelector("textarea") as HTMLTextAreaElement)?.value

    if (!recaptchaResponse) {
      setSubmitStatus({ type: "error", message: "Please complete the reCAPTCHA" })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const submitData = new FormData()
      submitData.append("name", formData.name)
      submitData.append("email", formData.email)
      submitData.append("message", formData.message)
      submitData.append("recaptchaToken", recaptchaResponse)
      if (selectedFile) {
        submitData.append("file", selectedFile)
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: submitData,
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({ type: "success", message: result.message || "Message sent successfully!" })
        setFormData({ name: "", email: "", message: "", acceptTerms: false })
        setSelectedFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      } else {
        setSubmitStatus({ type: "error", message: result.error || "Failed to send message" })
      }
    } catch {
      setSubmitStatus({ type: "error", message: "Network error. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const services = [
    {
      id: "custom-web-solutions",
      title: "Custom web solutions",
      description:
        "We specialize in crafting bespoke websites and web applications tailored to your unique requirements and objectives. Whether you need a corporate website, an eCommerce platform, or a custom web-based software solution, our team of experienced developers works closely with you to understand your goals and objectives, ensuring that our designs align perfectly with your brand identity and objectives.",
      image: "/images/3f00f5531b4c18a10739177bfb9caed239f86ebd.jpg",
      imageAlt: "Custom web solutions - laptop with code",
      reverse: false,
    },
    {
      id: "ux-ui-design",
      title: "UX/UI and Graphic Design",
      description:
        "We specialize in crafting intuitive user interfaces (UI) and engaging user experiences (UX) that captivate your audience and drive conversions. Our talented designers combine creativity with evolving best practices. Whether you need a website redesign, mobile app interface, or custom graphics, we work closely with you to understand your brand identity and objectives, ensuring that our designs align perfectly with your goals.",
      image: "/images/8d64c3f21c11f588925bab77e415bd557cad385b.jpg",
      imageAlt: "UX/UI and Graphic Design workspace",
      reverse: true,
    },
    {
      id: "qa",
      title: "Manual and Automation QA",
      titleHighlight: "Manual and",
      description:
        "Our skilled QA team conducts thorough manual testing to identify issues and ensure functionality, usability, and compatibility across various platforms and browsers. Additionally, we leverage automation testing tools and frameworks to streamline repetitive testing tasks, accelerate test cycles, and ensure faster time-to-market without compromising quality.",
      image: "/images/d99f7180c4bf0265069aa1c177dc0143e37e4d79.jpg",
      imageAlt: "Manual and Automation QA - testing screens",
      reverse: false,
    },
    {
      id: "devops",
      title: "DevOps",
      description:
        "We provide end-to-end DevOps solutions, including continuous integration, continuous delivery, infrastructure automation, and cloud deployment. With our DevOps services, you can accelerate time-to-market, improve product quality, and increase efficiency.",
      image: "/images/45fc920cb000857538e44a289f252b1506456ab8.jpg",
      imageAlt: "DevOps - keyboard and development",
      reverse: true,
    },
    {
      id: "data-analytics",
      title: "Data Analytics",
      description:
        "We leverage advanced analytics techniques and cutting-edge tools to uncover valuable patterns, trends, and correlations within your data. From business intelligence and predictive analytics to data visualization and reporting, our team helps you transform raw data into strategic assets and drive data-driven growth.",
      image: "/images/ee788060a2aeeb43a086780a10e052075317f0cd.jpg",
      imageAlt: "Data Analytics - graphs and charts",
      reverse: false,
    },
    {
      id: "mobile-applications",
      title: "Mobile Applications",
      description:
        "We leverage cutting-edge technologies and industry best practices to create intuitive, feature-rich mobile solutions tailored to your specific business needs. From concept and design to development and deployment, we ensure a seamless and efficient process, delivering mobile applications that meet your objectives and exceed your expectations.",
      image: "/images/d00b7db9fb79ecd79b7d95fa7eecf2e662529ebe.jpg",
      imageAlt: "Mobile Applications - app icons",
      reverse: true,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <h1
            className="font-bold mb-4"
            style={{
              fontFamily: "Onest",
              fontSize: "clamp(40px, 5vw, 72px)",
              lineHeight: "1.1",
              backgroundImage: isDark
                ? "linear-gradient(90.39deg, #FF6200 34.5%, #FFFFFF 66.76%)"
                : "linear-gradient(90.39deg, #FF6200 34.5%, #000000 66.76%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Services
          </h1>
        </div>
      </section>

      {/* Services Sections */}
      <section className="pb-16">
        <div className="max-w-[1280px] mx-auto px-6">
          {services.map((service, index) => (
            <div key={index}>
              {index > 0 && (
                <div
                  className="w-full mb-16"
                  style={{
                    height: "1px",
                    background: "var(--foreground)",
                    opacity: 0.1,
                  }}
                />
              )}

              <div
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-20 items-center scroll-mt-32 ${
                  service.reverse ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Text Content */}
                <div className={service.reverse ? "lg:col-start-2" : ""}>
                  <h2
                    className="font-semibold mb-6"
                    style={{
                      fontFamily: "Onest",
                      fontSize: "clamp(24px, 3vw, 40px)",
                      lineHeight: "1.2",
                      color: service.titleHighlight ? undefined : "inherit",
                    }}
                  >
                    {service.titleHighlight ? (
                      <>
                        <span style={{ color: "#FF6200" }}>{service.titleHighlight}</span>{" "}
                        {service.title.replace(service.titleHighlight, "").trim()}
                      </>
                    ) : (
                      service.title
                    )}
                  </h2>
                  <p
                    style={{
                      fontFamily: "Onest",
                      fontSize: "16px",
                      lineHeight: "1.6",
                      color: "var(--foreground)",
                      opacity: 0.8,
                    }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Image */}
                <div className={service.reverse ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          {/* Wrapper div with fixed dark background for the form card */}
          <div className="rounded-2xl p-8 md:p-12" style={{ background: "#1E1E1E" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Form */}
              <div>
                <h2
                  className="font-semibold mb-4 text-white"
                  style={{
                    fontFamily: "Onest",
                    fontSize: "clamp(24px, 3vw, 32px)",
                    lineHeight: "1.3",
                  }}
                >
                  Send us a note with your idea, and we'll get in touch to provide guidance on implementation
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-white"
                      style={{
                        fontFamily: "Onest",
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Type your Name"
                      required
                      className="w-full px-4 py-3 rounded-[4px] border border-[#3A3A3A] text-white placeholder:text-white/50"
                      style={{
                        fontFamily: "Onest",
                        fontSize: "16px",
                        background: "#2A2A2A",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-white"
                      style={{
                        fontFamily: "Onest",
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Type your email"
                      required
                      className="w-full px-4 py-3 rounded-[4px] border border-[#3A3A3A] text-white placeholder:text-white/50"
                      style={{
                        fontFamily: "Onest",
                        fontSize: "16px",
                        background: "#2A2A2A",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-2 text-white"
                      style={{
                        fontFamily: "Onest",
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Type your message"
                      required
                      className="w-full px-4 py-3 rounded-[4px] border border-[#3A3A3A] text-white placeholder:text-white/50 resize-none"
                      style={{
                        fontFamily: "Onest",
                        fontSize: "16px",
                        background: "#2A2A2A",
                      }}
                    />
                  </div>

                  <div
                    ref={recaptchaRef}
                    className="g-recaptcha"
                    data-sitekey="6LcKsjksAAAAAGoEUPaQnULL3xDPUW5c_bLP5EjT"
                  />

                  <div className="flex flex-wrap items-center gap-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-12 py-6 text-lg font-medium disabled:opacity-50"
                      style={{
                        fontFamily: "Onest",
                        background: "#FF6200",
                        borderRadius: "50px",
                      }}
                    >
                      {isSubmitting ? "Sending..." : "Send"}
                    </Button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf,.docx,.xlsx,.mp4"
                      onChange={handleFileSelect}
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={handleAttachClick}
                      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                      style={{
                        fontFamily: "Onest",
                        fontSize: "14px",
                        color: "#FF6200",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_1188_7152)">
                          <path
                            d="M12.507 6.44489L7.14617 11.8057C6.48942 12.4625 5.59869 12.8314 4.66992 12.8314C3.74114 12.8314 2.85041 12.4625 2.19367 11.8057C1.53692 11.149 1.16797 10.2582 1.16797 9.32947C1.16797 8.4007 1.53692 7.50997 2.19367 6.85322L7.5545 1.49239C7.99233 1.05456 8.58615 0.808594 9.20533 0.808594C9.82451 0.808594 10.4183 1.05456 10.8562 1.49239C11.294 1.93022 11.54 2.52404 11.54 3.14322C11.54 3.76241 11.294 4.35623 10.8562 4.79406L5.4895 10.1549C5.27058 10.3738 4.97367 10.4968 4.66408 10.4968C4.35449 10.4968 4.05758 10.3738 3.83867 10.1549C3.61975 9.93598 3.49677 9.63907 3.49677 9.32947C3.49677 9.01988 3.61975 8.72297 3.83867 8.50406L8.79116 3.55739"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1188_7152">
                            <rect width="14" height="14" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      Attach file (optional)
                    </button>
                  </div>

                  {selectedFile && (
                    <div
                      className="flex items-center gap-2 p-3 rounded-[4px]"
                      style={{ background: "rgba(255, 98, 0, 0.1)", border: "1px solid rgba(255, 98, 0, 0.3)" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6200" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <span className="text-white text-sm flex-1 truncate">{selectedFile.name}</span>
                      <button type="button" onClick={removeFile} className="text-white/60 hover:text-white">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.acceptTerms}
                      onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded border-[#3A3A3A] bg-[#2A2A2A]"
                    />
                    <label htmlFor="terms" className="text-sm text-white/80" style={{ fontFamily: "Onest" }}>
                      I Accept{" "}
                      <a href="/terms" className="underline text-white hover:text-[#FF6200]">
                        Terms and Conditions
                      </a>
                      .<br />
                      <span className="text-white/60">
                        By submitting your email, you accept terms and conditions. We may send you occasionally
                        marketing emails.
                      </span>
                    </label>
                  </div>

                  {submitStatus && (
                    <div
                      className={`p-4 rounded-[4px] ${
                        submitStatus.type === "success"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                      style={{ fontFamily: "Onest" }}
                    >
                      {submitStatus.message}
                    </div>
                  )}
                </form>
              </div>

              {/* Image */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/f236a65b9dcdd59fe25f5a9694d5243e04bca53a-20-281-29.jpg"
                  alt="Developer working at desk"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
