"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Loader2, Paperclip, X } from "lucide-react"
import Link from "next/link"
import { useLocale } from "@/lib/locale-context"
import { getRecaptchaSiteKey } from "@/app/actions/recaptcha"

declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        execute: (siteKey: string, options: { action: string }) => Promise<string>
      }
    }
  }
}

export default function ServicesPage() {
  const { t } = useLocale()

  const [isDark, setIsDark] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    acceptTerms: false,
  })
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [siteKey, setSiteKey] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scriptLoaded = useRef(false)

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const fetchKey = async () => {
      try {
        const key = await getRecaptchaSiteKey()
        setSiteKey(key)
      } catch (err) {
        console.error("Failed to load reCAPTCHA key:", err)
      }
    }
    fetchKey()
  }, [])

  useEffect(() => {
    if (scriptLoaded.current) return

    const script = document.createElement("script")
    script.src = "https://www.google.com/recaptcha/enterprise.js?render=explicit"
    script.async = true
    script.defer = true
    document.head.appendChild(script)
    scriptLoaded.current = true

    const style = document.createElement("style")
    style.innerHTML = `.grecaptcha-badge { visibility: hidden !important; width: 0 !important; height: 0 !important; }`
    document.head.appendChild(style)
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
    const newFiles = Array.from(e.target.files)
    setFiles((prev) => [...prev, ...newFiles].slice(0, 3))
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.acceptTerms) {
      setSubmitStatus({ type: "error", message: t.pleaseAcceptTerms || "Please accept the Terms and Conditions" })
      return
    }

    if (!siteKey) {
      setSubmitStatus({ type: "error", message: t.recaptchaNotLoaded || "reCAPTCHA not loaded. Refresh page." })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const token = await window.grecaptcha.enterprise.execute(siteKey, { action: "contact_form" })

      const form = new FormData()
      form.append("name", formData.name)
      form.append("email", formData.email)
      form.append("message", formData.message)
      form.append("recaptchaToken", token)
      files.forEach((file) => form.append("files", file))

      const res = await fetch("/api/contact", { method: "POST", body: form })
      const data = await res.json()

      if (res.ok) {
        setSubmitStatus({ type: "success", message: t.messageSent || "Message sent successfully!" })
        setFormData({ name: "", email: "", message: "", acceptTerms: false })
        setFiles([])
        if (fileInputRef.current) fileInputRef.current.value = ""
      } else {
        setSubmitStatus({ type: "error", message: data.error || t.failedToSend || "Failed to send message" })
      }
    } catch (err) {
      console.error("Submit failed:", err)
      setSubmitStatus({ type: "error", message: t.failedToSend || "Failed to send message. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const services = [
    {
      id: "custom-web-solutions",
      title: t.customWebSolutions,
      description: t.customWebSolutionsDesc,
      image: "/images/3f00f5531b4c18a10739177bfb9caed239f86ebd.jpg",
      imageAlt: "Custom web solutions - laptop with code",
      reverse: false,
    },
    {
      id: "ux-ui-design",
      title: t.uiUxDesign,
      description: t.uiUxDesignDesc,
      image: "/images/8d64c3f21c11f588925bab77e415bd557cad385b.jpg",
      imageAlt: "UX/UI and Graphic Design workspace",
      reverse: true,
    },
    {
      id: "qa",
      title: t.qaAutomation,
      titleHighlight: t.locale === "uk" ? "Ручне та" : "Manual and",
      description: t.qaAutomationDesc,
      image: "/images/d99f7180c4bf0265069aa1c177dc0143e37e4d79.jpg",
      imageAlt: "Manual and Automation QA - testing screens",
      reverse: false,
    },
    {
      id: "devops",
      title: t.devops,
      description: t.devopsDesc,
      image: "/images/45fc920cb000857538e44a289f252b1506456ab8.jpg",
      imageAlt: "DevOps - keyboard and development",
      reverse: true,
    },
    {
      id: "data-analytics",
      title: t.dataAnalytics,
      description: t.dataAnalyticsDesc,
      image: "/images/ee788060a2aeeb43a086780a10e052075317f0cd.jpg",
      imageAlt: "Data Analytics - graphs and charts",
      reverse: false,
    },
    {
      id: "mobile-applications",
      title: t.mobileApplications,
      description: t.mobileApplicationsDesc,
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
            {t.servicesTitle}
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
      {/* Contact Form Section */}
<section className="py-16 px-6">
  <div className="max-w-[1280px] mx-auto">
    <div className="rounded-2xl p-6 md:p-10 lg:p-12" style={{ background: "#1E1E1E" }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Form */}
        <div>
          <h2
            className="font-bold mb-8 text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
            style={{
              fontFamily: "Onest",
              fontWeight: 700,
              fontStyle: "normal",
              fontSize: "clamp(28px, 3.8vw, 48px)",
              lineHeight: "100%",
              letterSpacing: "-0.04em",
            }}
          >
            {t.getConsultation || "Send us a note with your idea, and we’ll get in touch to provide guidance on implementation"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                {t.name || "Name"}
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t.typeYourName || "Type your Name"}
                required
                className="w-full px-4 py-3 rounded-[4px] border border-[#3A3A3A] text-white placeholder:text-white/50 bg-[#2A2A2A]"
                style={{ fontFamily: "Onest" }}
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
                {t.email || "Email"}
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={t.typeYourEmail || "Type your email"}
                required
                className="w-full px-4 py-3 rounded-[4px] border border-[#3A3A3A] text-white placeholder:text-white/50 bg-[#2A2A2A]"
                style={{ fontFamily: "Onest" }}
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
                {t.message || "Message"}
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t.typeYourMessage || "Type your message"}
                required
                className="w-full px-4 py-3 rounded-[4px] border border-[#3A3A3A] text-white placeholder:text-white/50 resize-none bg-[#2A2A2A]"
                style={{ fontFamily: "Onest" }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  relative overflow-hidden
                  flex items-center justify-center gap-[10px]
                  text-[16px] font-medium leading-[1]
                  text-white
                  transition duration-300 ease-out
                  disabled:cursor-not-allowed disabled:opacity-50
                  bg-[#FF6200] rounded-[50px]
                  hover:bg-gradient-to-r hover:from-[#FF6200] hover:to-[#000000]
                  active:bg-gradient-to-br active:from-[#FF6200] active:to-[#000000]
                  active:scale-[0.98]
                `}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.background = "linear-gradient(92.84deg, #FF6200 29.79%, #000000 100.07%)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.background = "#FF6200"
                  }
                }}
                onMouseDown={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.background = "linear-gradient(93.96deg, #FF6200 -62.56%, #000000 61.87%)"
                  }
                }}
                onMouseUp={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.background = "linear-gradient(92.84deg, #FF6200 29.79%, #000000 100.07%)"
                  }
                }}
                style={{
                  width: "264px",
                  height: "40px",
                  padding: "4px 14px",
                  fontFamily: "Onest",
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t.sending || "Sending..."}
                  </>
                ) : (
                  t.send || "Send"
                )}
              </button>

              <label
                htmlFor="attach-file"
                className="flex items-center gap-2 cursor-pointer text-white hover:opacity-80 transition"
                style={{ fontFamily: "Onest", fontSize: "16px" }}
              >
                <Paperclip size={18} color="#FF6200" />
                {t.attachFile || "Attach file (optional)"}
              </label>

              <input
                ref={fileInputRef}
                id="attach-file"
                type="file"
                multiple
                accept=".doc,.docx,.pdf,.ppt,.pptx"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {files.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-4 py-2 bg-[#2A2A2A] rounded-full text-white text-sm border border-[#3A3A3A]"
                  >
                    <span className="truncate max-w-[180px]">{file.name}</span>
                    <button type="button" onClick={() => removeFile(idx)}>
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-start gap-3 mt-5">
              <input
                type="checkbox"
                id="terms"
                checked={formData.acceptTerms}
                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                className="mt-1 w-4 h-4 rounded border-[#3A3A3A] bg-[#2A2A2A]"
              />
              <label className="text-sm text-white/80" style={{ fontFamily: "Onest" }}>
                {t.iAccept || "I Accept"}{" "}
                <Link href="/terms" className="underline text-white hover:text-[#FF6200]">
                  {t.termsAndConditions || "Terms and Conditions"}
                </Link>
                .<br />
                {t.bySubmittingEmail || "By submitting your email, you accept terms and conditions."}<br />
                {t.marketing || "We may send you occasionally marketing emails."}
              </label>
            </div>

            {submitStatus && (
              <div
                className={`p-4 rounded-[4px] mt-5 ${
                  submitStatus.type === "success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
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
