"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { PolicyBanner } from "@/components/policy-banner"
import { useLocale } from "@/lib/locale-context"

export default function TermsPage() {
  const { locale } = useLocale()

  const content = {
    en: {
      title: "Terms of Use",
      breadcrumbMain: "Main",
      breadcrumbCurrent: "Terms of Use",
      companyName: "Idea Team Dev",
      effectiveDate: "Effective Date: 10.10.2025",
      intro:
        'Welcome to the Idea Team Dev website and services (hereinafter "ITD", "we", "our", "us"). By accessing or using our website, applications, or services, you agree to comply with these Terms of Use.',
      section1Title: "1. Acceptance of Terms",
      section1Content:
        "By using ITD services, you accept these Terms of Use in full. If you do not agree, please do not use our services.",
      section2Title: "2. Use of Services",
      section2Item1: "ITD provides services related to software development, consulting, and IT solutions.",
      section2Item2: "You agree to use our services only for lawful purposes and in compliance with applicable laws.",
      section2Item3:
        "You may not use ITD services to infringe the rights of others, distribute malware, or engage in illegal activity.",
      section3Title: "3. User Accounts and Security",
      section3Item1: "If registration is required, you must provide accurate and complete information.",
      section3Item2:
        "You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.",
      section3Item3:
        "You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.",
      section4Title: "4. Intellectual Property",
      section4Item1:
        "All content, logos, designs, and materials on ITD platforms are the property of ITD or its affiliates.",
      section4Item2: "You may not copy, reproduce, or distribute any ITD content without prior written permission.",
      section5Title: "5. Limitation of Liability",
      section5Item1:
        "ITD is not liable for any direct or indirect damages resulting from the use of its services or website.",
      section5Item2: 'Services are provided "as is" without warranties of any kind, unless explicitly stated.',
      section6Title: "6. Data Protection",
      section6Item1: "All personal data is processed in accordance with our Privacy Policy.",
      section6Item2:
        "Users have rights under GDPR to access, modify, delete, and restrict processing of their personal data.",
      section7Title: "7. Termination",
      section7Content:
        "ITD may suspend or terminate access to services for violations of these Terms or applicable law.",
      section8Title: "8. Governing Law",
      section8Content: "These Terms are governed by the laws applicable in Ukraine.",
      section9Title: "9. Contact Information",
      section9Email: "Email:",
      section9Address: "Address: Ukraine, Chernihiv, Rokossovsky street 13, 14027",
      emailLink: "sales@ideateam.dev",
    },
    uk: {
      title: "Умови використання",
      breadcrumbMain: "Головна",
      breadcrumbCurrent: "Умови використання",
      companyName: "Idea Team Dev",
      effectiveDate: "Дата вступу в силу: 10.10.2025",
      intro:
        'Ласкаво просимо на веб-сайт та послуги Idea Team Dev (далі "ITD", "ми", "наш", "нас"). Використовуючи наш веб-сайт, програми або послуги, ви погоджуєтесь додержуватися цих Умов використання.',
      section1Title: "1. Прийняття Умов",
      section1Content:
        "Використовуючи послуги ITD, ви повністю приймаєте ці Умови використання. Якщо ви з ними не згодні, будь ласка, не використовуйте наші послуги.",
      section2Title: "2. Використання Послуг",
      section2Item1:
        "ITD надає послуги, пов'язані з розробкою програмного забезпечення, консультуванням та ІТ-рішеннями.",
      section2Item2:
        "Ви погоджуєтесь використовувати наші послуги лише для законних цілей та у відповідності з чинним законодавством.",
      section2Item3:
        "Ви не можете використовувати послуги ITD для порушення прав інших осіб, розповсюдження шкідливого програмного забезпечення або занурення в незаконну діяльність.",
      section3Title: "3. Облікові записи користувачів та безпека",
      section3Item1: "Якщо потрібна реєстрація, ви повинні надати точну та повну інформацію.",
      section3Item2:
        "Ви несете відповідальність за збереження конфіденційності своїх облікових даних та за всі дії під вашим обліковим записом.",
      section3Item3:
        "Ви несете відповідальність за збереження конфіденційності своїх облікових даних та за всі дії під вашим обліковим записом.",
      section4Title: "4. Інтелектуальна власність",
      section4Item1:
        "Весь вміст, логотипи, дизайн та матеріали на платформах ITD є власністю ITD або її дочірніх компаній.",
      section4Item2:
        "Ви не можете копіювати, відтворювати або розповсюджувати будь-який вміст ITD без попередньої письмової дозволу.",
      section5Title: "5. Обмеження Відповідальності",
      section5Item1:
        "ITD не несе відповідальності за будь-які прямі або непрямі збитки, що випливають із використання її послуг або веб-сайту.",
      section5Item2: 'Послуги надаються "як є" без будь-яких гарантій, крім як явно зазначено.',
      section6Title: "6. Захист Даних",
      section6Item1: "Усі персональні дані обробляються відповідно до нашої Політики конфіденційності.",
      section6Item2:
        "Користувачі мають права відповідно до GDPR щодо доступу, зміни, видалення та обмеження обробки своїх персональних даних.",
      section7Title: "7. Припинення",
      section7Content:
        "ITD може зупинити або припинити доступ до послуг за порушення цих Умов або чинного законодавства.",
      section8Title: "8. Застосовуване Право",
      section8Content: "Ці Умови регулюються законами, що застосовуються в Україні.",
      section9Title: "9. Контактна Інформація",
      section9Email: "Електронна пошта:",
      section9Address: "Адреса: Україна, Чернігів, вул. Рокоссовського 13, 14027",
      emailLink: "sales@ideateam.dev",
    },
  }

  const t = content[locale]

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
        <div className="max-w-none">
          <h2
            className="policy-content-text py-[50x] pb-[0] pt-14"
            style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "24px" }}
          >
            {t.companyName}
          </h2>
          <p className="policy-content-text" style={{ fontFamily: "Onest", fontWeight: 600 }}>
            {t.effectiveDate}
          </p>
          <p className="policy-content-text" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
            {t.intro}
          </p>

          <section className="mb-8">
            <h3
              className="policy-content-text mx-0 my-0 py-7 pb-0"
              style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}
            >
              {t.section1Title}
            </h3>
            <p className="policy-content-text" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              {t.section1Content}
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.section2Title}
            </h3>
            <ul
              className="list-disc pl-6 space-y-2 policy-content-text"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              <li>{t.section2Item1}</li>
              <li>{t.section2Item2}</li>
              <li>{t.section2Item3}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
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
            <h3 className="policy-content-text" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.section4Title}
            </h3>
            <ul
              className="list-disc pl-6 space-y-2 policy-content-text"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              <li>{t.section4Item1}</li>
              <li>{t.section4Item2}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.section5Title}
            </h3>
            <ul
              className="list-disc pl-6 space-y-2 policy-content-text"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              <li>{t.section5Item1}</li>
              <li>{t.section5Item2}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.section6Title}
            </h3>
            <ul
              className="list-disc pl-6 space-y-2 policy-content-text"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              <li>{t.section6Item1}</li>
              <li>{t.section6Item2}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.section7Title}
            </h3>
            <p className="policy-content-text" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              {t.section7Content}
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.section8Title}
            </h3>
            <p className="policy-content-text" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              {t.section8Content}
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.section9Title}
            </h3>
            <ul
              className="list-disc pl-6 space-y-2 policy-content-text"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              <li>
                {t.section9Email}{" "}
                <a href="mailto:sales@ideateam.dev" className="text-[#FF6200] hover:underline">
                  {t.emailLink}
                </a>
              </li>
              <li>{t.section9Address}</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
