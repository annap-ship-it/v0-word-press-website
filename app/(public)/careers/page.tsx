"use client"

import Image from "next/image"
import { useLocale } from "@/lib/locale-context"
import { useTheme } from "@/lib/theme-context"
import { PolicyBanner } from "@/components/policy-banner"
import { RequestConsultationSection } from "@/components/request-consultation-section"
import { useState } from "react"
import { ContactFormModal } from "@/components/contact-form-modal"

const content = {
  en: {
    title: "Careers",
    heroTitle: "Join Our Team",
    heroSubtitle: "Build the future with us",
    description: "We're looking for talented developers, designers, and project managers who are passionate about creating exceptional digital products.",
    whyJoin: "Why Join IdeaTeam?",
    benefits: [
      {
        icon: "/images/wallet-icon.svg",
        title: "Competitive Salary",
        description: "We offer market-rate compensation based on your skills and experience"
      },
      {
        icon: "/images/team-icon.svg",
        title: "Remote Work",
        description: "Work from anywhere in the world with flexible hours"
      },
      {
        icon: "/images/trending-icon.svg",
        title: "Growth Opportunities",
        description: "Continuous learning and career advancement paths"
      },
      {
        icon: "/images/market-rate-icon.svg",
        title: "Exciting Projects",
        description: "Work on diverse projects for clients worldwide"
      }
    ],
    openPositions: "Open Positions",
    positions: [
      {
        title: "Senior Frontend Developer",
        type: "Full-time",
        location: "Remote",
        skills: ["React", "TypeScript", "Next.js"]
      },
      {
        title: "Backend Developer",
        type: "Full-time",
        location: "Remote",
        skills: ["Node.js", "PostgreSQL", "AWS"]
      },
      {
        title: "UI/UX Designer",
        type: "Full-time",
        location: "Remote",
        skills: ["Figma", "User Research", "Prototyping"]
      },
      {
        title: "QA Engineer",
        type: "Full-time",
        location: "Remote",
        skills: ["Manual Testing", "Automation", "Selenium"]
      }
    ],
    applyNow: "Apply Now",
    noOpenPositions: "No open positions at the moment",
    generalApplication: "Don't see a position that fits? Send us your resume anyway!",
    sendResume: "Send Resume"
  },
  uk: {
    title: "Кар'єра",
    heroTitle: "Приєднуйтесь до нашої команди",
    heroSubtitle: "Будуйте майбутнє разом з нами",
    description: "Ми шукаємо талановитих розробників, дизайнерів та проектних менеджерів, які захоплені створенням виняткових цифрових продуктів.",
    whyJoin: "Чому варто приєднатися до IdeaTeam?",
    benefits: [
      {
        icon: "/images/wallet-icon.svg",
        title: "Конкурентна зарплата",
        description: "Ми пропонуємо ринкову компенсацію на основі ваших навичок та досвіду"
      },
      {
        icon: "/images/team-icon.svg",
        title: "Віддалена робота",
        description: "Працюйте з будь-якої точки світу з гнучким графіком"
      },
      {
        icon: "/images/trending-icon.svg",
        title: "Можливості розвитку",
        description: "Безперервне навчання та шляхи кар'єрного росту"
      },
      {
        icon: "/images/market-rate-icon.svg",
        title: "Цікаві проєкти",
        description: "Працюйте над різноманітними проєктами для клієнтів з усього світу"
      }
    ],
    openPositions: "Відкриті вакансії",
    positions: [
      {
        title: "Senior Frontend Developer",
        type: "Повна зайнятість",
        location: "Віддалено",
        skills: ["React", "TypeScript", "Next.js"]
      },
      {
        title: "Backend Developer",
        type: "Повна зайнятість",
        location: "Віддалено",
        skills: ["Node.js", "PostgreSQL", "AWS"]
      },
      {
        title: "UI/UX Designer",
        type: "Повна зайнятість",
        location: "Віддалено",
        skills: ["Figma", "User Research", "Prototyping"]
      },
      {
        title: "QA Engineer",
        type: "Повна зайнятість",
        location: "Віддалено",
        skills: ["Manual Testing", "Automation", "Selenium"]
      }
    ],
    applyNow: "Подати заявку",
    noOpenPositions: "Наразі немає відкритих вакансій",
    generalApplication: "Не бачите підходящої позиції? Надішліть нам своє резюме!",
    sendResume: "Надіслати резюме"
  }
}

export default function CareersPage() {
  const { locale } = useLocale()
  const { isDark } = useTheme()
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const t = content[locale as keyof typeof content] || content.en

  return (
    <main className="min-h-screen" style={{ background: "var(--background)" }}>
      <PolicyBanner
        title={t.title}
        lightBanner="/images/banner-light.png"
        darkBanner="/images/banner-dark.png"
      />

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            {t.heroTitle}
          </h2>
          <p 
            className="text-xl mb-6"
            style={{ color: "#FF6200" }}
          >
            {t.heroSubtitle}
          </p>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--muted-foreground)" }}
          >
            {t.description}
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-3xl font-bold text-center mb-12"
            style={{ color: "var(--foreground)" }}
          >
            {t.whyJoin}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.benefits.map((benefit, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl text-center"
                style={{ 
                  background: isDark ? "rgba(255,255,255,0.05)" : "#FFFFFF",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #E8E8E8"
                }}
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Image 
                    src={benefit.icon || "/placeholder.svg"} 
                    alt={benefit.title}
                    width={48}
                    height={48}
                  />
                </div>
                <h3 
                  className="text-lg font-semibold mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  {benefit.title}
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 
            className="text-3xl font-bold text-center mb-12"
            style={{ color: "var(--foreground)" }}
          >
            {t.openPositions}
          </h2>
          
          <div className="space-y-4">
            {t.positions.map((position, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                style={{ 
                  background: isDark ? "rgba(255,255,255,0.05)" : "#FFFFFF",
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #E8E8E8"
                }}
              >
                <div className="flex-1">
                  <h3 
                    className="text-xl font-semibold mb-2"
                    style={{ color: "var(--foreground)" }}
                  >
                    {position.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span 
                      className="px-3 py-1 rounded-full text-xs"
                      style={{ 
                        background: isDark ? "rgba(255,98,0,0.2)" : "rgba(255,98,0,0.1)",
                        color: "#FF6200"
                      }}
                    >
                      {position.type}
                    </span>
                    <span 
                      className="px-3 py-1 rounded-full text-xs"
                      style={{ 
                        background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                        color: "var(--muted-foreground)"
                      }}
                    >
                      {position.location}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {position.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-2 py-1 rounded text-xs"
                        style={{ 
                          background: isDark ? "rgba(255,255,255,0.05)" : "#F5F5F5",
                          color: "var(--muted-foreground)"
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="px-6 py-3 rounded-full font-medium text-white bg-[#FF6200] hover:bg-[#E55800] transition-colors whitespace-nowrap"
                >
                  {t.applyNow}
                </button>
              </div>
            ))}
          </div>

          {/* General Application */}
          <div 
            className="mt-12 p-8 rounded-2xl text-center"
            style={{ 
              background: isDark ? "rgba(255,98,0,0.1)" : "rgba(255,98,0,0.05)",
              border: "1px solid rgba(255,98,0,0.2)"
            }}
          >
            <p 
              className="text-lg mb-4"
              style={{ color: "var(--foreground)" }}
            >
              {t.generalApplication}
            </p>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="px-8 py-3 rounded-full font-medium text-white bg-[#FF6200] hover:bg-[#E55800] transition-colors"
            >
              {t.sendResume}
            </button>
          </div>
        </div>
      </section>

      <RequestConsultationSection />
      
      <ContactFormModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </main>
  )
}
