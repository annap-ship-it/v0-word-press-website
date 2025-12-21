export type Locale = "en" | "uk"

export const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    services: "Services",
    portfolio: "Portfolio",
    blog: "Blog",
    contact: "Contact",
    // Hero
    heroTitle: "Welcome to Our Platform",
    heroSubtitle: "Innovative solutions for your business",
    heroButton: "Get Started",
    // Footer
    allRightsReserved: "All rights reserved",
  },
  uk: {
    // Navigation
    home: "Головна",
    about: "Про нас",
    services: "Послуги",
    portfolio: "Портфоліо",
    blog: "Блог",
    contact: "Контакти",
    // Hero
    heroTitle: "Ласкаво просимо на нашу платформу",
    heroSubtitle: "Інноваційні рішення для вашого бізнесу",
    heroButton: "Почати",
    // Footer
    allRightsReserved: "Всі права захищені",
  },
} as const

export function getTranslations(locale: Locale) {
  return translations[locale]
}
