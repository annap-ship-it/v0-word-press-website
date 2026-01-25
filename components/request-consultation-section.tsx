"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { X, Loader2, Paperclip } from "lucide-react"
import Link from "next/link"
import { useLocale } from "@/lib/locale-context"
import { getRecaptchaSiteKey } from "@/app/actions/recaptcha"

declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        execute: (siteKey: string, options: { action: string }) => Promise<string>
        ready: (callback: () => void) => void
      }
    }
  }
}

// Localization content for Ukrainian translations
const content = {
  en: {
    title: "Request Free Consultation",
    processTitle: "What's the process?",
    step1: "Our specialist will reach out after reviewing your message",
    step2: "If needed we'll sign an NDA to ensure trust, after what you provide us with the project details",
    step3: "You'll receive a detailed proposal including estimates, timelines, and expert profiles",
    namePlaceholder: "*Type your Name",
    emailPlaceholder: "*Type your Email",
    messagePlaceholder: "*Type your Message",
    attachFile: "Attach file (optional)",
    fileHelp: "No more than 3 files may be attached up to 3MB each. Formats: doc, docx, pdf, ppt, pptx.",
    send: "Send",
    sending: "Sending...",
    acceptTerms:
      "I Accept Terms and Conditions. By submitting your email, you accept terms and conditions. We may send you occasionally marketing emails.",
    termsLink: "Terms and Conditions",
  },
  uk: {
    title: "Запит на безкоштовну консультацію",
    processTitle: "Який подальший процес?",
    step1: "Наш спеціаліст зв'яжеться з вами після ознайомлення з вашим запитом.",
    step2: "За потреби ми підпишемо NDA для забезпечення конфіденційності після отримання деталей проєкту.",
    step3: "Ви отримаєте детальну комерційну пропозицію з оцінками, термінами та профілями експертів.",
    namePlaceholder: "*Введіть ваше ім'я",
    emailPlaceholder: "*Введіть вашу електронну пошту",
    messagePlaceholder: "*Введіть ваше повідомлення",
    attachFile: "Додати файл (необов'язково)",
    fileHelp: "Можна додати до 3 файлів розміром до 3 МБ кожен. Формати: doc, docx, pdf, ppt, pptx.",
    send: "Надіслати",
    sending: "Надсилання...",
    acceptTerms:
      "Я приймаю Умови та положення. Надсилаючи свій запит, ви погоджуєтеся з умовами та положеннями. Ми можемо періодично надсилати вам маркетингові листи.",
    termsLink: "Умови та положення",
  },
}

export function RequestConsultationSection() {
  const { locale } = useLocale()
  const currentLocale = (locale as keyof typeof content) || "en"
  const t = content[currentLocale]

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    acceptTerms: false,
  })
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [siteKey, setSiteKey] = useState<string>("")
  const scriptLoaded = useRef(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Fetch the reCAPTCHA site key from server action
    const fetchSiteKey = async () => {
      try {
        const key = await getRecaptchaSiteKey()
        setSiteKey(key)
      } catch (error) {
        console.error("[v0] Failed to fetch reCAPTCHA site key:", error)
      }
    }
    fetchSiteKey()
  }, [])

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
    if (scriptLoaded.current) return

    // Load reCAPTCHA Enterprise script
    const script = document.createElement("script")
    script.src = "https://www.google.com/recaptcha/enterprise.js"
    script.async = true
    script.defer = true

    document.head.appendChild(script)
    scriptLoaded.current = true

    return () => {
      // Script doesn't need cleanup
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const validExtensions = [".doc", ".docx", ".pdf", ".ppt", ".pptx"]
    const maxSize = 3 * 1024 * 1024 // 3MB
    const maxFiles = 3

    const validFiles = selectedFiles.filter((file) => {
      const ext = "." + file.name.split(".").pop()?.toLowerCase()
      return validExtensions.includes(ext) && file.size <= maxSize
    })

    if (files.length + validFiles.length > maxFiles) {
      setSubmitStatus({ type: "error", message: `Maximum ${maxFiles} files allowed` })
      return
    }

    setFiles((prev) => [...prev, ...validFiles].slice(0, maxFiles))
    setSubmitStatus(null)
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.acceptTerms) {
      setSubmitStatus({ type: "error", message: "Please accept the Terms and Conditions" })
      return
    }

    // Validate reCAPTCHA is ready
    if (!siteKey || !window.grecaptcha?.enterprise?.execute) {
      setSubmitStatus({ type: "error", message: "reCAPTCHA is not ready. Please refresh the page." })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Execute reCAPTCHA Enterprise to get token
      const recaptchaToken = await window.grecaptcha.enterprise.execute(
        siteKey,
        { action: "CONSULTATION_REQUEST" }
      )

      const submitData = new FormData()
      submitData.append("name", formData.name)
      submitData.append("email", formData.email)
      submitData.append("message", formData.message)
      submitData.append("recaptchaToken", recaptchaToken)
      submitData.append("type", "consultation")

      files.forEach((file) => {
        submitData.append("files", file)
      })

      const response = await fetch("/api/contact", {
        method: "POST",
        body: submitData,
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({ type: "success", message: result.message || "Message sent successfully!" })
        setFormData({ name: "", email: "", message: "", acceptTerms: false })
        setFiles([])
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      } else {
        setSubmitStatus({ type: "error", message: result.error || "Failed to send message" })
      }
    } catch (error) {
      setSubmitStatus({ type: "error", message: "Failed to send message. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 px-4" style={{ background: isDark ? "#161515" : "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          style={{
            fontFamily: "Onest",
            fontSize: "48px",
            lineHeight: "90%",
            letterSpacing: "-0.03em",
            color: isDark ? "#FFFFFF" : "#212121",
          }}
        >
          {t.title}
        </h2>

        <div
          className="p-6 md:p-10 rounded-[14px] mb-12"
          style={{
            background: "#212121",
          }}
        >
          <h3
            className="text-2xl font-medium mb-6"
            style={{
              fontFamily: "Onest",
              fontSize: "24px",
              lineHeight: "31px",
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
            }}
          >
            {t.processTitle}
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 9L13.5 12L18 9"
                    stroke="#FF6200"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M3 13.5H5" stroke="#FF6200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1 10.5H5" stroke="#FF6200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M5 7.5V7C5 5.89543 5.89543 5 7 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H7C5.89543 19 5 18.1046 5 17V16.5"
                    stroke="#FF6200"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p
                style={{
                  fontFamily: "Onest",
                  fontSize: "20px",
                  lineHeight: "26px",
                  letterSpacing: "-0.02em",
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                {t.step1}
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H11"
                    stroke="#FF6200"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 10H16M8 6H12M8 14H11"
                    stroke="#FF6200"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.3056 17.1133L17.2147 15.1856C17.3314 14.9381 17.6686 14.9381 17.7853 15.1856L18.6944 17.1133L20.7275 17.4243C20.9884 17.4642 21.0923 17.7998 20.9035 17.9923L19.4326 19.4917L19.7797 21.61C19.8243 21.882 19.5515 22.0895 19.3181 21.961L17.5 20.9603L15.6819 21.961C15.4485 22.0895 15.1757 21.882 15.2203 21.61L15.5674 19.4917L14.0965 17.9923C13.9077 17.7998 14.0116 17.4642 14.2725 17.4243L16.3056 17.1133Z"
                    stroke="#FF6200"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 2V5.4C16 5.73137 16.2686 6 16.6 6H20"
                    stroke="#FF6200"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p
                style={{
                  fontFamily: "Onest",
                  fontSize: "20px",
                  lineHeight: "26px",
                  letterSpacing: "-0.02em",
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                {t.step2}
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 12L11 15L16 10"
                    stroke="#FF6200"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z"
                    stroke="#FF6200"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p
                style={{
                  fontFamily: "Onest",
                  fontSize: "20px",
                  lineHeight: "26px",
                  letterSpacing: "-0.02em",
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                {t.step3}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.namePlaceholder}
                  required
                  style={{
                    width: "100%",
                    height: "40px",
                    background: isDark ? "#161515" : "transparent",
                    borderBottom: "1px solid #A8A8A8",
                    fontFamily: "Onest",
                    fontSize: "16px",
                    lineHeight: "20px",
                    letterSpacing: "0.02em",
                    color: isDark ? "#FFFFFF" : "#212121",
                    outline: "none",
                    paddingLeft: "0",
                  }}
                  className="placeholder:text-[#A8A8A8]"
                />
              </div>

              {/* Email Input */}
              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t.emailPlaceholder}
                  required
                  style={{
                    width: "100%",
                    height: "40px",
                    background: isDark ? "#161515" : "transparent",
                    borderBottom: "1px solid #A8A8A8",
                    fontFamily: "Onest",
                    fontSize: "16px",
                    lineHeight: "20px",
                    letterSpacing: "0.02em",
                    color: isDark ? "#FFFFFF" : "#212121",
                    outline: "none",
                    paddingLeft: "0",
                  }}
                  className="placeholder:text-[#A8A8A8]"
                />
              </div>

              {/* Message Input */}
              <div>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.messagePlaceholder}
                  required
                  rows={3}
                  style={{
                    width: "100%",
                    background: isDark ? "#161515" : "transparent",
                    borderBottom: "1px solid #A8A8A8",
                    fontFamily: "Onest",
                    fontSize: "16px",
                    lineHeight: "20px",
                    letterSpacing: "0.02em",
                    color: isDark ? "#FFFFFF" : "#212121",
                    outline: "none",
                    resize: "none",
                    paddingLeft: "0",
                  }}
                  className="placeholder:text-[#A8A8A8]"
                />
              </div>

              {/* File Upload */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".doc,.docx,.pdf,.ppt,.pptx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 20px",
                    background: isDark ? "#212121" : "transparent",
                    border: isDark ? "1px solid rgba(255, 255, 255, 0.5)" : "1px solid #A8A8A8",
                    borderRadius: "6px",
                    fontFamily: "Onest",
                    fontSize: "16px",
                    lineHeight: "20px",
                    letterSpacing: "0.02em",
                    color: isDark ? "#FFFFFF" : "#212121",
                    cursor: "pointer",
                  }}
                >
                  <Paperclip size={14} color="#FF6200" />
                  {t.attachFile}
                </button>
                <p
                  className="mt-2"
                  style={{
                    fontFamily: "Onest",
                    fontSize: "14px",
                    lineHeight: "110%",
                    color: "#A8A8A8",
                  }}
                >
                  {t.fileHelp}
                </p>

                {/* Attached Files */}
                {files.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#212121] border border-[#3A3A3A]"
                      >
                        <span className="text-sm text-white truncate max-w-[150px]">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
    relative overflow-hidden
    flex items-center justify-center gap-2.5
    w-[200px] h-10
    rounded-full
    font-[Onest] font-normal text-[16px] leading-[100%]
    text-white
    transition duration-300 ease-out
    disabled:cursor-not-allowed
    bg-[#FF6200]
    hover:bg-gradient-to-r hover:from-[#FF6200] hover:to-[#000000]
    active:bg-gradient-to-br active:from-[#FF6200] active:to-[#000000]
    active:scale-[0.98]
    disabled:bg-[#4A4A4A] disabled:text-[#AAAAAA] disabled:opacity-70
  `}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.background = "linear-gradient(92.84deg, #FF6200 29.79%, #000000 100.07%)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.background = "#FF6200";
                  }
                }}
                onMouseDown={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.background = "linear-gradient(93.96deg, #FF6200 -62.56%, #000000 61.87%)";
                  }
                }}
                onMouseUp={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.background = "linear-gradient(92.84deg, #FF6200 29.79%, #000000 100.07%)";
                  }
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t.sending}
                  </>
                ) : (
                  t.send
                )}
              </button>

              {/* Submit Status */}
              {submitStatus && (
                <div
                  className={`p-3 rounded ${
                    submitStatus.type === "success"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Terms Checkbox */}
                <div className="flex items-start gap-3 flex-1">
                  <input
                    type="checkbox"
                    id="consultation-terms"
                    checked={formData.acceptTerms}
                    onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                    style={{
                      width: "14px",
                      height: "14px",
                      background: isDark ? "#161515" : "transparent",
                      border: "1px solid #A8A8A8",
                      borderRadius: "2px",
                      marginTop: "2px",
                      flexShrink: 0,
                    }}
                  />
                  <label
                    htmlFor="consultation-terms"
                    style={{
                      fontFamily: "Onest",
                      fontSize: "14px",
                      lineHeight: "110%",
                      color: "#A8A8A8",
                    }}
                  >
                    {currentLocale === "uk" ? "Я приймаю" : "I Accept"}{" "}
                    <Link href="/terms" className="underline" style={{ color: "#FF6200" }}>
                      {t.termsLink}
                    </Link>
                    .{" "}
                    {currentLocale === "uk"
                      ? "Надсилаючи свій запит, ви погоджуєтеся з умовами та положеннями. Ми можемо періодично надсилати вам маркетингові листи."
                      : "By submitting your email, you accept terms and conditions. We may send you occasionally marketing emails."}
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* Right: Image */}
          <div className="relative w-full h-[400px] lg:h-[455px] rounded-[14px] overflow-hidden">
            <Image
              src="/images/903416dfea2ecdd32e83cc85f6e0cee9b2d4fb63-20-281-29.jpg"
              alt="Person working on laptop"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
