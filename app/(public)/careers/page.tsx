"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Loader2 } from "lucide-react"

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    experience: "",
    message: "",
  })
  const [files, setFiles] = useState<File[]>([])
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Theme detection for styling
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkTheme(document.documentElement.classList.contains("dark"))
    }
    checkTheme()
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

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
      setError(`Maximum ${maxFiles} files allowed`)
      return
    }

    setFiles((prev) => [...prev, ...validFiles].slice(0, maxFiles))
    setError("")
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!termsAccepted) {
      setError("Please accept Terms and Conditions")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("role", formData.role)
      formDataToSend.append("experience", formData.experience)
      formDataToSend.append("message", formData.message)
      formDataToSend.append("type", "career")

      files.forEach((file) => {
        formDataToSend.append("files", file)
      })

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error("Failed to submit application")
      }

      setIsSubmitted(true)
    } catch (err) {
      setError("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-[1280px] mx-auto px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]">
            {/* Left Column - Thank You Message */}
            <div className="space-y-6 text-center lg:text-left">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold"
                style={{
                  backgroundImage: isDarkTheme
                    ? "linear-gradient(90.39deg, #FF6200 34.5%, #FFFFFF 66.76%)"
                    : "linear-gradient(90.39deg, #FF6200 34.5%, #000000 66.76%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Thank you for your application!
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
                We've received your information and will review it carefully. Our team will get back to you soon.
              </p>
              <div className="pt-4">
                <Link href="/">
                  <Button className="bg-[#FF6200] hover:bg-[#e55a00] text-white rounded-full px-8 h-12">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column - Illustration */}
            <div className="relative w-full max-w-[500px] aspect-square mx-auto">
              <Image
                src="/images/thank-you-illustration.svg"
                alt="Thank you illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-[1280px] mx-auto px-6 py-12 md:py-20">
        {/* Two column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <div className="space-y-6 text-lg text-foreground">
              <p className="mt-52">
                At Idea Team, we <span className="text-[#FF6200] font-medium">value people</span> above all. They are
                our core, our most important resource, one that cannot be overestimated.
              </p>
              <p>
                That's why we're always happy to hear from{" "}
                <span className="text-[#FF6200] font-medium underline">talented individuals</span>, even if there's no
                open position at the moment.
              </p>
              <p>
                Leave your contact details and a few words about yourself and{" "}
                <span className="text-[#FF6200] font-medium underline">your experience</span>, and we'll get in touch
                with you.
              </p>
            </div>

            {/* Puzzle Illustration */}
            <div className="relative w-full max-w-[400px] aspect-square mt-8">
              <Image
                src="/images/careers-puzzle.svg"
                alt="Team collaboration illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Column - Application Form */}
          <div
            className="p-8 md:p-10 mt-14"
            style={{
              backgroundColor: isDarkTheme ? "#1E1E1E" : "#FFFFFF",
              boxShadow: isDarkTheme ? "none" : "2px 2px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: "14px",
            }}
          >
            <h1
              className="text-2xl md:text-3xl font-bold mb-8 text-center"
              style={{
                backgroundImage: isDarkTheme
                  ? "linear-gradient(90.39deg, #FF6200 34.5%, #FFFFFF 66.76%)"
                  : "linear-gradient(90.39deg, #FF6200 34.5%, #000000 66.76%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Apply to Join our Team:
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className={`block text-sm mb-2 ${isDarkTheme ? "text-white" : "text-gray-700"}`}>Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Type your Name"
                  required
                  className={`rounded-[4px] h-11 ${
                    isDarkTheme
                      ? "bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500"
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className={`block text-sm mb-2 ${isDarkTheme ? "text-white" : "text-gray-700"}`}>Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Type your email"
                  required
                  className={`rounded-[4px] h-11 ${
                    isDarkTheme
                      ? "bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500"
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                  }`}
                />
              </div>

              {/* Role */}
              <div>
                <label className={`block text-sm mb-2 ${isDarkTheme ? "text-white" : "text-gray-700"}`}>Role</label>
                <Input
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Type your Role"
                  required
                  className={`rounded-[4px] h-11 ${
                    isDarkTheme
                      ? "bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500"
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                  }`}
                />
              </div>

              {/* Experience */}
              <div>
                <label className={`block text-sm mb-2 ${isDarkTheme ? "text-white" : "text-gray-700"}`}>
                  Experience
                </label>
                <Input
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Type your Experience"
                  required
                  className={`rounded-[4px] h-11 ${
                    isDarkTheme
                      ? "bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500"
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                  }`}
                />
              </div>

              {/* Message */}
              <div>
                <label className={`block text-sm mb-2 ${isDarkTheme ? "text-white" : "text-gray-700"}`}>Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us a bit about your background: how long you've been in the field, why you chose it, and what keeps you inspired. No need for formalities, we'd just love to get to know you."
                  rows={5}
                  className={`rounded-[4px] resize-none ${
                    isDarkTheme
                      ? "bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500"
                      : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                  }`}
                />
              </div>

              {/* File Upload */}
              <div className="flex flex-wrap items-center gap-4">
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
                  className={`flex items-center gap-2 hover:text-[#FF6200] transition-colors ${isDarkTheme ? "text-white" : "text-gray-700"}`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6200" strokeWidth="2">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                  <span className="underline">Attach file (CV)</span>
                </button>
                <span className={`text-sm ${isDarkTheme ? "text-gray-500" : "text-gray-500"}`}>
                  No more than 3 files may be attached up to 3MB each. Formats: doc, docx, pdf, ppt, pptx.
                </span>
              </div>

              {/* Attached Files */}
              {files.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-[4px] ${isDarkTheme ? "bg-[#2A2A2A]" : "bg-gray-100"}`}
                    >
                      <span
                        className={`text-sm truncate max-w-[150px] ${isDarkTheme ? "text-white" : "text-gray-700"}`}
                      >
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className={`${isDarkTheme ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Send Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FF6200] hover:bg-[#e55a00] text-white rounded-full h-12 text-base font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send"
                )}
              </Button>

              {/* Terms Checkbox */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                    className={`mt-1 data-[state=checked]:bg-[#FF6200] data-[state=checked]:border-[#FF6200] ${isDarkTheme ? "border-gray-500" : "border-gray-300"}`}
                  />
                  <label htmlFor="terms" className={`text-sm ${isDarkTheme ? "text-white" : "text-gray-700"}`}>
                    I Accept{" "}
                    <Link href="/terms" className="text-[#FF6200] underline">
                      Terms and Conditions
                    </Link>
                    .
                  </label>
                </div>
                <p className={`text-xs pl-6 ${isDarkTheme ? "text-gray-500" : "text-gray-500"}`}>
                  By submitting your email, you accept terms and conditions. We may send you occasionally marketing
                  emails.
                </p>
              </div>

              {/* reCAPTCHA placeholder - hidden until integrated */}
              {false && (
                <div className="bg-white rounded-[4px] p-3 flex items-center gap-3 w-fit">
                  <div className="w-6 h-6 border-2 border-gray-300 rounded"></div>
                  <span className="text-gray-700 text-sm">I'm not a robot</span>
                  <div className="ml-4">
                    <Image src="/recaptcha-logo.png" alt="reCAPTCHA" width={40} height={40} />
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
