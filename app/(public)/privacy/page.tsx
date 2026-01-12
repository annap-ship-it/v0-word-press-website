"use client"

import Link from "next/link"
import { PolicyBanner } from "@/components/policy-banner"
import { ChevronRight } from "lucide-react"
import { useLocale } from "@/lib/locale-context"

const content = {
  en: {
    bannerTitle: "Privacy Policy",
    breadcrumbHome: "Main",
    breadcrumbCurrent: "Privacy Policy",
    heading: "Idea Team Dev",
    intro1:
      'This Privacy Policy applies to the parent organization Idea Team Dev (hereinafter referred to as "ITD", "we", "our", "us"), as well as its affiliated companies. In this Policy, the name "ITD" may imply ITD with other affiliated companies or each company individually, as the case may be.',
    intro2:
      "This Privacy Policy is the full version applicable to our activities. It explains what information about users/customers we collect and how we use this information.",
    intro3:
      "This Policy is drafted in accordance with the requirements of GDPR (Regulation (EU) 2016/679), which is binding for the implementation of the legislative act. Our website is managed in accordance with the General Data Protection Regulation (GDPR).",
    intro4:
      "We consider data confidentiality an important business principle. Our policies and methods of data protection are focused on the processing, transfer, and storage of personal data in an appropriate and legal way, to ensure their confidentiality, integrity, and accessibility.",

    principlesTitle: "Principles",
    principlesIntro: "The ITD data protection policy is based on the following principles:",
    principles: [
      "Personal data processing is carried out in a legal, conscientious, and transparent manner;",
      "Data is collected only for specified, unambiguous, and legitimate purposes;",
      "Personal data is accurate and updated if necessary;",
      "Inaccurate data will be promptly corrected or removed;",
      "Personal data is stored no longer than necessary;",
      "Data confidentiality and safety are ensured;",
      "Personal data is not transferred to third parties unless required to provide services or by law;",
      "Data subjects have the right to access, modify, delete, restrict processing, object to processing, and request data portability.",
    ],

    personalDataTitle: "Personal Data",
    personalDataIntro:
      'Personal data means any information that can be attributed to an identified or identifiable individual ("data subject"), including name, date of birth, address, email, phone number, etc.',
    collectionTitle: "Collection of Personal Data",
    collection: [
      {
        label: "Data you provide:",
        value:
          "Name, email, phone, profile info, survey responses, messages, and other information you provide when using our website, applications, or services.",
      },
      {
        label: "Data on service usage:",
        value: "Device type, IP address, OS, accessed content, and other technical data to improve services.",
      },
      {
        label: "Data from third parties:",
        value:
          "Business partners, marketing agencies, or other sources. Used only as necessary for service provision, administration, analytics, and IT/security purposes.",
      },
    ],
    collectionNote: "We collect only the information necessary to provide our services at the highest level.",

    processingTitle: "Processing and Use of Personal Data",
    processingIntro:
      "We process personal data only to the extent necessary for defined, specific, and legitimate purposes, such as:",
    processing: [
      "Providing, improving, and developing products and services;",
      "Security and verification of user actions;",
      "Communication with users/customers.",
    ],
    processingNote:
      "Data is stored only as long as necessary to fulfill these purposes. Access is limited to employees with appropriate permission and operational need.",

    cookiesTitle: "Using Cookies",
    cookiesIntro:
      "Idea Team Dev uses cookies to improve user experience and site administration. Cookies are small text files used to store identifiers and other information.",
    cookiesUse: "We use cookies for:",
    cookies: [
      "Improving website functionality and navigation;",
      "Analyzing website usage through third-party analytics services, such as Google Analytics;",
      "Ensuring security and preventing fraudulent activity.",
    ],
    cookiesNote:
      "You can control or disable cookies through your browser settings. Please note that some parts of the website may not function properly if cookies are disabled.",

    transferTitle: "Transfer of Personal Data",
    transfer1:
      "Personal data is not shared with third parties except with trusted partners when necessary to provide services. We do not disclose data for advertising purposes.",
    transfer2:
      "ITD may disclose personal data if required by law, court order, or to protect our rights and the safety of clients.",

    securityTitle: "Security of Data Processing",
    security:
      "We implement technical, physical, and administrative measures to protect personal data from loss, unauthorized access, disclosure, or modification. Users are responsible for keeping their passwords and login credentials secure.",

    accessTitle: "Access, Modification, and Deletion of Personal Data",
    access1:
      "Users have the right to access, correct, delete, restrict, or object to processing of their data. Requests will be processed within 30 calendar days. Verification of identity may be required.",
    access2: "Requests should be sent to:",

    advertisingTitle: "Advertising",
    advertising:
      'With consent, ITD may send promotional emails. Users may opt-out at any time via the "Unsubscribe" link or by contacting sales@ideateam.dev',

    responsibilityTitle: "Responsibility",
    responsibility: "ITD monitors GDPR compliance and keeps records of data processing activities.",

    contactTitle: "Contact Information",
    contactIntro: "For questions regarding this Privacy Policy, contact:",
    contactEmail: "Email:",
    contactAddress: "Address:",
    contactAddressValue: "Ukraine, Chernihiv, Rokossovsky street 13, 14027",
    date: "10.10.2025",
  },
  uk: {
    bannerTitle: "Політика Конфіденційності",
    breadcrumbHome: "Головна",
    breadcrumbCurrent: "Політика Конфіденційності",
    heading: "Idea Team Dev",
    intro1:
      'Ця Політика Конфіденційності стосується материнської організації Idea Team Dev (далі "ITD", "ми", "наші", "нам"), а також її дочірніх компаній. У цій Політиці назва "ITD" може означати ITD разом з іншими дочірніми компаніями або кожну компанію окремо, як це буває.',
    intro2:
      "Ця Політика Конфіденційності є повною версією, застосовною до нашої діяльності. Вона пояснює, яку інформацію про користувачів/клієнтів ми збираємо і як ми використовуємо цю інформацію.",
    intro3:
      "Ця Політика розроблена відповідно до вимог GDPR (Регламент (ЄС) 2016/679), який є обов'язковим для імплементації нормативного акту. Наш вебсайт управляється відповідно до Загального Регламенту про Захист Даних (GDPR).",
    intro4:
      "Ми вважаємо конфіденційність даних важливим принципом бізнесу. Наші політики та методи захисту даних зосереджені на обробці, передачі та зберіганні персональних даних належним чином та законно, щоб забезпечити їх конфіденційність, цілісність та доступність.",

    principlesTitle: "Принципи",
    principlesIntro: "Політика захисту даних ITD базується на наступних принципах:",
    principles: [
      "Обробка персональних даних здійснюється законно, сумлінно та прозоро;",
      "Дані збираються лише для встановлених, чітких і законних цілей;",
      "Персональні дані є точними та актуальними, якщо це необхідно;",
      "Неточні дані будуть негайно виправлені або видалені;",
      "Персональні дані зберігаються не довше, ніж необхідно;",
      "Забезпечується конфіденційність та безпека даних;",
      "Персональні дані не передаються третім особам, якщо це не необхідно для надання послуг або за законом;",
      "Суб'єкти даних мають право на доступ, зміну, видалення, обмеження обробки, заперечення обробки та запит на портативність даних.",
    ],

    personalDataTitle: "Персональні Дані",
    personalDataIntro:
      "Персональні дані означають будь-яку інформацію, яка може бути віднесена до ідентифікованої або ідентифікованої фізичної особи (\"суб'єкта даних\"), включаючи ім'я, дату народження, адресу, електронну пошту, номер телефону тощо.",
    collectionTitle: "Збір Персональних Даних",
    collection: [
      {
        label: "Дані, які ви надаєте:",
        value:
          "Ім'я, електронна пошта, телефон, інформація профілю, відповіді на опитування, повідомлення та інша інформація, яку ви надаєте при використанні нашого вебсайту, додатків або послуг.",
      },
      {
        label: "Дані про використання послуг:",
        value: "Тип пристрою, IP-адреса, ОС, переглянутий контент та інші технічні дані для поліпшення послуг.",
      },
      {
        label: "Дані від третіх осіб:",
        value:
          "Ділові партнери, маркетингові агенції або інші джерела. Використовуються лише за необхідності для надання послуг, адміністрування, аналітики та ІТ/безпеки.",
      },
    ],
    collectionNote: "Ми збираємо лише інформацію, необхідну для надання наших послуг на найвищому рівні.",

    processingTitle: "Обробка та Використання Персональних Даних",
    processingIntro:
      "Ми обробляємо персональні дані лише в тій мірі, що необхідна для визначених, конкретних і законних цілей, таких як:",
    processing: [
      "Надання, поліпшення та розробка продуктів та послуг;",
      "Безпека та перевірка дій користувачів;",
      "Спілкування з користувачами/клієнтами.",
    ],
    processingNote:
      "Дані зберігаються лише так довго, як необхідно для виконання цих цілей. Доступ обмежений лише працівниками з відповідним дозволом та операційною необхідністю.",

    cookiesTitle: "Використання Файлів Cookie",
    cookiesIntro:
      "Idea Team Dev використовує файли cookie для поліпшення досвіду користувача та адміністрування сайту. Файли cookie - це невеликі текстові файли, які використовуються для зберігання ідентифікаторів та іншої інформації.",
    cookiesUse: "Ми використовуємо файли cookie для:",
    cookies: [
      "Поліпшення функціональності та навігації вебсайту;",
      "Аналізу використання вебсайту через сервіси аналітики третіх осіб, такі як Google Analytics;",
      "Забезпечення безпеки та запобігання шахрайській діяльності.",
    ],
    cookiesNote:
      "Ви можете керувати або вимкнути файли cookie через параметри вашого браузера. Зверніть увагу, що деякі частини вебсайту можуть працювати неправильно, якщо файли cookie вимкнені.",

    transferTitle: "Передача Персональних Даних",
    transfer1:
      "Персональні дані не передаються третім особам, крім довірених партнерів, якщо це необхідно для надання послуг. Ми не розповсюджуємо дані в рекламних цілях.",
    transfer2:
      "ITD може розповсюджувати персональні дані, якщо це вимагається законом, судовим наказом або для захисту наших прав та безпеки клієнтів.",

    securityTitle: "Безпека Обробки Даних",
    security:
      "Ми застосовуємо технічні, фізичні та адміністративні заходи для захисту персональних даних від втрати, несанкціонованого доступу, розповсюдження або модифікації. Користувачі несуть відповідальність за збереження конфіденційності своїх даних для входу та облікових даних.",

    accessTitle: "Доступ, Зміна та Видалення Персональних Даних",
    access1:
      "Користувачі мають право на доступ, виправлення, видалення, обмеження або заперечення обробки своїх даних. Запити будуть оброблені в течення 30 календарних днів. Може бути потрібна перевірка особистості.",
    access2: "Запити слід надсилати на адресу:",

    advertisingTitle: "Реклама",
    advertising:
      'За згодою ITD може надсилати промаційні листи. Користувачі можуть відмовитися будь-коли, використовуючи посилання "Відписатися" або зв\'язавшись з sales@ideateam.dev',

    responsibilityTitle: "Відповідальність",
    responsibility: "ITD контролює відповідність GDPR та ведеть записи про діяльність з обробки даних.",

    contactTitle: "Контактна Інформація",
    contactIntro: "З будь-якими питаннями щодо цієї Політики Конфіденційності, будь ласка, зв'яжіться з:",
    contactEmail: "Електронна пошта:",
    contactAddress: "Адреса:",
    contactAddressValue: "Україна, м. Чернігів, вул. Рокоссовського, 13, 14027",
    date: "10.10.2025",
  },
}

export default function PrivacyPage() {
  const { locale } = useLocale()
  const currentLocale = locale === "uk" ? "uk" : "en"
  const t = content[currentLocale as keyof typeof content]

  return (
    <div className="min-h-screen">
      <PolicyBanner title={t.bannerTitle} lightBanner="/images/white.png" darkBanner="/images/black.png" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="policy-breadcrumb-main hover:opacity-80 transition-opacity">
            {t.breadcrumbHome}
          </Link>
          <ChevronRight className="w-4 h-4 text-[#787877] dark:text-[#FFFFFF99]" />
          <span className="text-[#787877] dark:text-[#FFFFFF99]">{t.breadcrumbCurrent}</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-20 force-white-dark">
        <div className="prose prose-lg max-w-none">
          <h2 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "24px" }}>
            {t.heading}
          </h2>
          <p className="policy-content-text mb-8" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
            {t.intro1}
          </p>
          <p className="policy-content-text mb-8" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
            {t.intro2}
          </p>
          <p className="policy-content-text mb-8" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
            {t.intro3}
          </p>
          <p className="policy-content-text mb-8" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
            {t.intro4}
          </p>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.principlesTitle}
            </h3>
            <p
              className="policy-content-text mb-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              {t.principlesIntro}
            </p>
            <ul
              className="list-disc pl-6 space-y-2 policy-content-text"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              {t.principles.map((principle, idx) => (
                <li key={idx}>{principle}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.personalDataTitle}
            </h3>
            <p
              className="policy-content-text mb-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              {t.personalDataIntro}
            </p>
            <h4
              className="policy-content-text mb-3 mt-6"
              style={{ fontFamily: "Onest", fontWeight: 600, fontSize: "18px" }}
            >
              {t.collectionTitle}
            </h4>
            <ul
              className="list-disc pl-6 space-y-2 policy-content-text"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              {t.collection.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.label}</strong> {item.value}
                </li>
              ))}
            </ul>
            <p
              className="policy-content-text mt-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              {t.collectionNote}
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.processingTitle}
            </h3>
            <p
              className="policy-content-text mb-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              {t.processingIntro}
            </p>
            <ul
              className="list-disc pl-6 space-y-2 policy-content-text"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              {t.processing.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p
              className="policy-content-text mt-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              {t.processingNote}
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.cookiesTitle}
            </h3>
            <p
              className="policy-content-text mb-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              {t.cookiesIntro}
            </p>
            <p
              className="policy-content-text mb-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              {t.cookiesUse}
            </p>
            <ul
              className="list-disc pl-6 space-y-2 policy-content-text"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              {t.cookies.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <p
              className="policy-content-text mt-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              {t.cookiesNote}
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.transferTitle}
            </h3>
            <p
              className="policy-content-text mb-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              {t.transfer1}
            </p>
            <p className="policy-content-text" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              {t.transfer2}
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.securityTitle}
            </h3>
            <p className="policy-content-text" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              {t.security}
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.accessTitle}
            </h3>
            <p
              className="policy-content-text mb-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              {t.access1}
            </p>
            <p className="policy-content-text" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              {t.access2}{" "}
              <a href="mailto:sales@ideateam.dev" className="text-[#FF6200] hover:underline">
                sales@ideateam.dev
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.advertisingTitle}
            </h3>
            <p className="policy-content-text" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              {t.advertising}
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.responsibilityTitle}
            </h3>
            <p className="policy-content-text" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              {t.responsibility}
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              {t.contactTitle}
            </h3>
            <p
              className="policy-content-text mb-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              {t.contactIntro}
            </p>
            <ul
              className="list-disc pl-6 space-y-2 policy-content-text"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              <li>
                <strong>{t.contactEmail}</strong>{" "}
                <a href="mailto:sales@ideateam.dev" className="text-[#FF6200] hover:underline">
                  sales@ideateam.dev
                </a>
              </li>
              <li>
                <strong>{t.contactAddress}</strong> {t.contactAddressValue}
              </li>
            </ul>
            <p
              className="policy-content-text mt-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              {t.date}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
