"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useTheme } from "@/lib/theme-context"
import { useLocale } from "@/lib/locale-context"
import { X } from "lucide-react"

interface ContactFormModalProps {
  isOpen: boolean
  onClose: () => void
}

declare global {
  interface Window {
    grecaptcha: {
      render: (element: HTMLElement, options: any) => number
      reset: (widgetId: number) => void
      getResponse: (widgetId: number) => string
    }
    onRecaptchaLoad?: () => void
  }
}

export function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const { theme } = useTheme()
  const { t } = useLocale()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [attachedFile, setAttachedFile] = useState<File | null>(null)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const recaptchaRef = useRef<HTMLDivElement>(null)
  const [recaptchaWidgetId, setRecaptchaWidgetId] = useState<number | null>(null)
  const recaptchaRendered = useRef(false)

  const isDark = theme === "dark"

  useEffect(() => {
    if (!isOpen || recaptchaRendered.current) return

    const script = document.querySelector('script[src*="recaptcha"]')
    if (!script) {
      const newScript = document.createElement("script")
      newScript.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit"
      newScript.async = true
      newScript.defer = true
      document.body.appendChild(newScript)

      // @ts-expect-error - Global callback for reCAPTCHA
      window.onRecaptchaLoad = () => {
        if (recaptchaRef.current && window.grecaptcha && !recaptchaRendered.current) {
          try {
            const widgetId = window.grecaptcha.render(recaptchaRef.current, {
              sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
              theme: isDark ? "dark" : "light",
            })
            setRecaptchaWidgetId(widgetId)
            recaptchaRendered.current = true
          } catch (error) {
            console.error("[v0] Failed to render reCAPTCHA:", error)
          }
        }
      }
    } else if (window.grecaptcha && !recaptchaRendered.current && recaptchaRef.current) {
      try {
        const widgetId = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          theme: isDark ? "dark" : "light",
        })
        setRecaptchaWidgetId(widgetId)
        recaptchaRendered.current = true
      } catch (error) {
        console.error("[v0] Failed to render reCAPTCHA:", error)
      }
    }
  }, [isOpen, isDark])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (recaptchaWidgetId === null || !window.grecaptcha) {
      setSubmitStatus("error")
      return
    }

    const recaptchaToken = window.grecaptcha.getResponse(recaptchaWidgetId)
    if (!recaptchaToken) {
      setSubmitStatus("error")
      return
    }

    if (!name || !email || !message || !acceptTerms) {
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("email", email)
      formData.append("message", message)
      formData.append("recaptchaToken", recaptchaToken)
      if (attachedFile) {
        formData.append("file", attachedFile)
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setSubmitStatus("success")
        setName("")
        setEmail("")
        setMessage("")
        setAttachedFile(null)
        setAcceptTerms(false)
        if (window.grecaptcha && recaptchaWidgetId !== null) {
          window.grecaptcha.reset(recaptchaWidgetId)
        }
        setTimeout(() => {
          onClose()
          setSubmitStatus(null)
        }, 2000)
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("[v0] Contact form error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{
        background: "rgba(0, 0, 0, 0.5)",
        paddingTop: "clamp(20px, 5vw, 100px)",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full mx-auto mb-8 rounded-[14px] p-6 sm:p-10 shadow-lg mt-20 sm:mt-24 lg:mt-28"
        style={{
          maxWidth: "936px",
          height: "auto",
          backgroundColor: isDark ? "#212121" : "#FFFFFF",
          borderRadius: "14px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 hover:bg-opacity-80 transition"
          style={{
            color: isDark ? "#FFFFFF" : "#212121",
          }}
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left column - Form */}
          <div style={{ maxWidth: "350px" }}>
            {/* constrain form column to match image width */}
            {/* Title */}
            <h1
              className="font-bold mb-3 sm:mb-4"
              style={{
                color: isDark ? "#FFFFFF" : "#212121",
                fontFamily: "Onest",
                fontWeight: 700,
                fontSize: "clamp(32px, 6vw, 48px)",
                lineHeight: "1",
                letterSpacing: "-0.04em",
              }}
            >
              {t.letsTalk}
            </h1>
            {/* Description */}
            <p
              className="mb-4 sm:mb-6"
              style={{
                color: isDark ? "#A8A8A8" : "#A8A8A8",
                fontFamily: "Onest",
                fontWeight: 400,
                fontSize: "clamp(13px, 1.1vw, 16px)",
                lineHeight: "1.1",
              }}
            >
              {t.contactFormDesc}
            </p>
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Name Input */}
              <div>
                <label
                  className="block mb-2"
                  style={{
                    color: isDark ? "#FFFFFF" : "#212121",
                    fontFamily: "Onest",
                    fontWeight: 400,
                    fontSize: "clamp(13px, 1vw, 16px)",
                  }}
                >
                  {t.name}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.enterYourName}
                  className="w-full px-4 py-3 rounded-lg border transition"
                  style={{
                    backgroundColor: isDark ? "#373737" : "#FFFFFF",
                    borderColor: isDark ? "#626262" : "#A8A8A8",
                    color: isDark ? "#FFFFFF" : "#212121",
                    fontFamily: "Onest",
                    height: "40px",
                  }}
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  className="block mb-2"
                  style={{
                    color: isDark ? "#FFFFFF" : "#212121",
                    fontFamily: "Onest",
                    fontWeight: 400,
                    fontSize: "clamp(13px, 1vw, 16px)",
                  }}
                >
                  {t.email}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.enterYourEmail}
                  className="w-full px-4 py-3 rounded-lg border transition"
                  style={{
                    backgroundColor: isDark ? "#373737" : "#FFFFFF",
                    borderColor: isDark ? "#626262" : "#A8A8A8",
                    color: isDark ? "#FFFFFF" : "#212121",
                    fontFamily: "Onest",
                    height: "40px",
                  }}
                  required
                />
              </div>

              {/* Message Input */}
              <div>
                <label
                  className="block mb-2"
                  style={{
                    color: isDark ? "#FFFFFF" : "#212121",
                    fontFamily: "Onest",
                    fontWeight: 400,
                    fontSize: "clamp(13px, 1vw, 16px)",
                  }}
                >
                  {t.message}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.enterYourMessage}
                  className="w-full px-4 py-3 rounded-lg border transition resize-none"
                  style={{
                    backgroundColor: isDark ? "#373737" : "#FFFFFF",
                    borderColor: isDark ? "#626262" : "#A8A8A8",
                    color: isDark ? "#FFFFFF" : "#212121",
                    fontFamily: "Onest",
                    height: "126px",
                  }}
                  required
                />
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 rounded-full font-semibold transition hover:opacity-90 disabled:opacity-50 whitespace-nowrap"
                  style={{
                    backgroundColor: "#FF6200",
                    color: "#FFFFFF",
                    fontFamily: "Onest",
                    fontWeight: 600,
                    fontSize: "clamp(14px, 1vw, 16px)",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    minWidth: "150px",
                  }}
                >
                  {isSubmitting ? t.loading : t.send}
                </button>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="file"
                    onChange={(e) => setAttachedFile(e.target.files?.[0] || null)}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />

                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: "clamp(12px, 1vw, 14px)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      color: isDark ? "#FFFFFF" : "#212121",
                      fontFamily: "Onest",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <path
                        d="M8 12.5L14.5 6C15.88 4.62 18.12 4.62 19.5 6C20.88 7.38 20.88 9.62 19.5 11L10 20.5C7.79 22.71 4.21 22.71 2 20.5C-0.21 18.29 -0.21 14.71 2 12.5L11 3.5"
                        stroke="#FF6200"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {t.attachFileOptional}
                  </span>
                </label>
              </div>

              {/* Status Messages */}
              {submitStatus === "success" && <p className="text-green-500 text-center">{t.successMessage}</p>}
              {submitStatus === "error" && <p className="text-red-500 text-center">{t.errorMessage}</p>}

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  style={{
                    accentColor: "#FF6200",
                    marginTop: 0,
                    flexShrink: 0,
                  }}
                  required
                />
                <label
                  htmlFor="terms"
                  className="text-sm whitespace-nowrap"
                  style={{
                    color: isDark ? "#FFFFFF" : "#212121",
                    fontFamily: "Onest",
                    fontWeight: 400,
                    fontSize: "clamp(12px, 1vw, 14px)",
                    lineHeight: "1.2",
                  }}
                >
                  {t.iAccept} {t.termsAndConditions}
                </label>
              </div>

              {/* "By submitting..." text stays below */}
              <p
                className="text-xs"
                style={{
                  color: isDark ? "#A8A8A8" : "#A8A8A8",
                  fontFamily: "Onest",
                  fontWeight: 400,
                  fontSize: "clamp(11px, 0.9vw, 13px)",
                  lineHeight: "1.3",
                }}
              >
                {t.bySubmitting} {t.mayEcho}
              </p>
            </form>
          </div>

          {/* Right column - Image + reCAPTCHA below image */}
          <div className="hidden lg:flex flex-col gap-0 mt-32">
            <div
              style={{
                backgroundColor: isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.05)",
                borderRadius: "6px",
                height: "278px",
                width: "407px",
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/images/f236a65b9dcdd59fe25f5a9694d5243e04bca53a-20-282-29.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "20px",
              }}
            >
              {/* Case Study Text */}
              <div
                style={{
                  color: "#FFFFFF",
                  textShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
                  paddingBottom: "20px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "Onest",
                    fontWeight: 500,
                    fontSize: "clamp(12px, 1vw, 14px)",
                    lineHeight: "1.3",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t.caseStudyText}
                </p>
              </div>
            </div>

            <div
              className="flex items-start justify-start pt-4"
              style={{
                marginTop: "16px",
              }}
            >
              <div
                ref={recaptchaRef}
                style={{
                  transform: "scale(0.77)",
                  transformOrigin: "top left",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
