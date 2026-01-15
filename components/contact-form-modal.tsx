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
      className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
      style={{
        background: "rgba(0, 0, 0, 0.5)",
        paddingTop: "clamp(80px, 10vh, 120px)",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full rounded-[14px] shadow-lg"
        style={{
          maxWidth: "936px",
          backgroundColor: isDark ? "#212121" : "#FFFFFF",
          borderRadius: "14px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 hover:bg-opacity-80 transition z-10"
          style={{
            color: isDark ? "#FFFFFF" : "#212121",
          }}
        >
          <X size={24} />
        </button>

        {/* SECTION 1: Header (Title + Description) */}
        <div
          style={{
            padding: "clamp(24px, 4vw, 40px)",
            paddingBottom: "clamp(16px, 2vw, 24px)",
          }}
        >
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

          <p
            className="mb-0"
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
        </div>

        {/* SECTION 2: Form + Image (2 columns on desktop, 1 column on mobile) */}
        <style>{`
          .form-image-grid {
            display: grid;
            grid-template-columns: 350px 407px;
            gap: 32px;
            padding: clamp(24px, 4vw, 40px);
            padding-top: clamp(16px, 2vw, 24px);
            padding-bottom: clamp(16px, 2vw, 24px);
          }
          @media (max-width: 1023px) {
            .form-image-grid {
              grid-template-columns: 1fr;
              gap: 24px;
            }
          }
        `}</style>

        <div className="form-image-grid">
          {/* Left Column: Form Fields */}
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
                className="w-full px-4 rounded-lg border transition"
                style={{
                  backgroundColor: isDark ? "#373737" : "#FFFFFF",
                  borderColor: isDark ? "#626262" : "#A8A8A8",
                  color: isDark ? "#FFFFFF" : "#212121",
                  fontFamily: "Onest",
                  height: "40px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
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
                className="w-full px-4 rounded-lg border transition"
                style={{
                  backgroundColor: isDark ? "#373737" : "#FFFFFF",
                  borderColor: isDark ? "#626262" : "#A8A8A8",
                  color: isDark ? "#FFFFFF" : "#212121",
                  fontFamily: "Onest",
                  height: "40px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
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
                  height: "80px",
                }}
                required
              />
            </div>

            {/* Send button and File attachment */}
            <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
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
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.ptx"
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
          </form>

          {/* Right Column: Image (desktop only) */}
          <div
            className="hidden lg:flex"
            style={{
              backgroundColor: isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.05)",
              borderRadius: "6px",
              height: "278px",
              width: "100%",
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/images/f236a65b9dcdd59fe25f5a9694d5243e04bca53a-20-282-29.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
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
        </div>

        {/* SECTION 3: Acceptance Terms + reCAPTCHA (2 columns on desktop, 1 column on mobile) */}
        <style>{`
          .acceptance-recaptcha-grid {
            display: grid;
            grid-template-columns: 350px 407px;
            gap: 32px;
            align-items: start;
            padding: clamp(24px, 4vw, 40px);
            padding-top: clamp(16px, 2vw, 24px);
            border-top: 1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
          }
          @media (max-width: 1023px) {
            .acceptance-recaptcha-grid {
              grid-template-columns: 1fr;
              gap: 24px;
            }
          }
        `}</style>

        <div className="acceptance-recaptcha-grid">
          {/* Left Column: Checkbox + Terms Text */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                style={{
                  accentColor: "#FF6200",
                  marginTop: "4px",
                  flexShrink: 0,
                  width: "18px",
                  height: "18px",
                  cursor: "pointer",
                }}
                required
              />
              <label
                htmlFor="terms"
                style={{
                  color: isDark ? "#FFFFFF" : "#212121",
                  fontFamily: "Onest",
                  fontWeight: 400,
                  fontSize: "clamp(12px, 1vw, 14px)",
                  lineHeight: "1.3",
                  cursor: "pointer",
                }}
              >
                {t.iAccept} {t.termsAndConditions}
              </label>
            </div>

            {/* "By submitting..." text */}
            <p
              style={{
                color: isDark ? "#A8A8A8" : "#A8A8A8",
                fontFamily: "Onest",
                fontWeight: 400,
                fontSize: "clamp(11px, 0.9vw, 13px)",
                lineHeight: "1.3",
                marginLeft: "26px",
              }}
            >
              {t.bySubmitting} {t.mayEcho}
            </p>
          </div>

          {/* Right Column: reCAPTCHA */}
          <div
            ref={recaptchaRef}
            style={{
              transformOrigin: "top left",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
            className="w-full lg:w-auto"
          />
        </div>
      </div>
    </div>
  )
}
