"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { PolicyBanner } from "@/components/policy-banner"
import { useLocale } from "@/lib/locale-context"

export default function CookiePolicyPage() {
  const { locale } = useLocale()

  const content = {
    en: {
      title: "Cookie Policy",
      breadcrumbMain: "Main",
      breadcrumbCurrent: "Cookie Policy",
      companyName: "Idea Team Dev",
      effectiveDate: "Effective Date: 10.10.2025",
      intro:
        'Idea Team Dev ("ITD", "we", "our") uses cookies to enhance user experience, improve website performance, and analyze traffic.',
      section1Title: "1. What Are Cookies",
      section1Content:
        "Cookies are small text files stored on your device that help identify your browser and preferences.",
      section2Title: "2. Types of Cookies Used",
      section2Item1: "Essential Cookies: Required for site functionality and navigation.",
      section2Item2: "Analytics Cookies: Used to analyze website usage, e.g., Google Analytics.",
      section2Item3: "Security Cookies: Help prevent fraud and ensure safe login sessions.",
      section3Title: "3. How We Use Cookies",
      section3Item1: "Improve website functionality and user experience.",
      section3Item2: "Analyze site performance and traffic patterns.",
      section3Item3: "Ensure security and prevent unauthorized activity.",
      section4Title: "4. Controlling Cookies",
      section4Para1: "Users can manage or disable cookies through their browser settings.",
      section4Para2: "Some features of the website may not function properly if cookies are disabled.",
      section5Title: "5. Data Privacy",
      section5Para1: "Cookies may collect information about your device, IP address, and browsing behavior.",
      section5Para2: "All data collected via cookies is processed in accordance with our Privacy Policy.",
      section6Title: "6. Third-Party Cookies",
      section6Para1: "ITD may use third-party analytics or advertising services that deploy cookies on our site.",
      section6Para2: "We ensure that such third parties comply with data protection regulations.",
      section7Title: "7. Contact Information",
      section7Email: "Email:",
      section7Address: "Address: Ukraine, Chernihiv, Rokossovsky street 13, 14027",
      emailLink: "sales@ideateam.dev",
    },
    uk: {
      title: "Політика Використання Cookies",
      breadcrumbMain: "Головна",
      breadcrumbCurrent: "Політика Використання Cookies",
      companyName: "Idea Team Dev",
      effectiveDate: "Дата набуття чинності: 10.10.2025",
      intro:
        "Idea Team Dev («ITD», «ми», «наш») використовує cookies для покращення користувацького досвіду, підвищення продуктивності вебсайту та аналізу трафіку.",
      section1Title: "1. Що таке Cookies",
      section1Content:
        "Cookies – це невеликі текстові файли, що зберігаються на вашому пристрої та допомагають ідентифікувати ваш браузер і налаштування.",
      section2Title: "2. Типи Cookies",
      section2Item1: "Необхідні Cookies: потрібні для функціонування сайту та навігації.",
      section2Item2:
        "Аналітичні Cookies: використовуються для аналізу використання сайту, наприклад, Google Analytics.",
      section2Item3: "Cookies безпеки: допомагають запобігти шахрайству та забезпечують безпечні сеанси входу.",
      section3Title: "3. Як ми використовуємо Cookies",
      section3Item1: "Покращуємо функціональність сайту та користувацький досвід.",
      section3Item2: "Аналізуємо продуктивність сайту та структуру трафіку.",
      section3Item3: "Забезпечуємо безпеку та запобігаємо несанкціонованій діяльності.",
      section4Title: "4. Керування Cookies",
      section4Para1: "Користувачі можуть керувати або відключати cookies через налаштування свого браузера.",
      section4Para2: "Деякі функції сайту можуть працювати некоректно, якщо cookies вимкнені.",
      section5Title: "5. Конфіденційність Даних",
      section5Para1:
        "Cookies можуть збирати інформацію про ваш пристрій, IP-адресу та поведінку під час перегляду сайту.",
      section5Para2: "Всі дані, зібрані через cookies, обробляються відповідно до нашої Політики Конфіденційності.",
      section6Title: "6. Cookies третіх сторін",
      section6Para1:
        "ITD може використовувати аналітичні або рекламні сервіси третіх сторін, які розміщують cookies на нашому сайті.",
      section6Para2: "Ми гарантуємо, що такі треті сторони дотримуються вимог щодо захисту даних.",
      section7Title: "7. Контактна Інформація",
      section7Email: "Електронна пошта:",
      section7Address: "Адреса: Україна, м. Чернігів, вул. Рокоссовського, 13, 14027",
      emailLink: "sales@ideateam.dev",
    },
  }

  const currentLocale = (locale === "uk" ? "uk" : "en") as keyof typeof content
  const t = content[currentLocale]

  return (
    <div className="min-h-screen">
      <PolicyBanner title={t.title} lightBanner="/images/white.png" darkBanner="/images/black.png" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="policy-breadcrumb-main hover:opacity-80 transition-opacity">
            {t.breadcrumbMain}
          </Link>
          <ChevronRight className="w-4 h-4 text-[#787877] dark:text-[#FFFFFF99]" />
          <span className="text-[#787877] dark:text-[#FFFFFF99]">{t.breadcrumbCurrent}</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-20 force-white-dark">
        <div className="prose prose-lg max-w-none">
          <h2 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "24px" }}>
            {t.companyName}
          </h2>
          <p className="policy-content-text mb-2" style={{ fontFamily: "Onest", fontWeight: 600 }}>
            {t.effectiveDate}
          </p>
          <p className="policy-content-text mb-8" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
            {t.intro}
          </p>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.section1Title}
            </h3>
            <p className="policy-content-text" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              {t.section1Content}
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.section2Title}
            </h3>
            <ul
              className="list-disc pl-6 space-y-2 policy-content-text"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              <li>
                <strong>{locale === "uk" ? "Необхідні Cookies:" : "Essential Cookies:"}</strong> {t.section2Item1}
              </li>
              <li>
                <strong>{locale === "uk" ? "Аналітичні Cookies:" : "Analytics Cookies:"}</strong> {t.section2Item2}
              </li>
              <li>
                <strong>{locale === "uk" ? "Cookies безпеки:" : "Security Cookies:"}</strong> {t.section2Item3}
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.section3Title}
            </h3>
            <ul
              className="list-disc pl-6 space-y-2 policy-content-text"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              <li>{t.section3Item1}</li>
              <li>{t.section3Item2}</li>
              <li>{t.section3Item3}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.section4Title}
            </h3>
            <p
              className="policy-content-text mb-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              {t.section4Para1}
            </p>
            <p className="policy-content-text" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              {t.section4Para2}
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.section5Title}
            </h3>
            <p
              className="policy-content-text mb-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              {t.section5Para1}
            </p>
            <p className="policy-content-text" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              {t.section5Para2}
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.section6Title}
            </h3>
            <p
              className="policy-content-text mb-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              {t.section6Para1}
            </p>
            <p className="policy-content-text" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              {t.section6Para2}
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.section7Title}
            </h3>
            <ul
              className="list-disc pl-6 space-y-2 policy-content-text"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              <li>
                <strong>{t.section7Email}</strong>{" "}
                <a href="mailto:sales@ideateam.dev" className="text-[#FF6200] hover:underline">
                  {t.emailLink}
                </a>
              </li>
              <li>
                <strong>{locale === "uk" ? "Адреса:" : "Address:"}</strong> {t.section7Address}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
