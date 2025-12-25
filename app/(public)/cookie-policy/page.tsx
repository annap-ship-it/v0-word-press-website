"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { PolicyBanner } from "@/components/policy-banner"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen">
      <PolicyBanner title="Cookie Policy" lightBanner="/images/white.png" darkBanner="/images/black.png" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="policy-breadcrumb-main hover:opacity-80 transition-opacity">
            Main
          </Link>
          <ChevronRight className="w-4 h-4 text-[#787877] dark:text-[#FFFFFF99]" />
          <span className="text-[#787877] dark:text-[#FFFFFF99]">Cookie Policy</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-20 force-white-dark">
        <div className="prose prose-lg max-w-none">
          <h2 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "24px" }}>
            Idea Team Dev
          </h2>
          <p className="policy-content-text mb-2" style={{ fontFamily: "Onest", fontWeight: 600 }}>
            Effective Date: 10.10.2025
          </p>
          <p className="policy-content-text mb-8" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
            Idea Team Dev ("ITD", "we", "our") uses cookies to enhance user experience, improve website performance, and
            analyze traffic.
          </p>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              1. What Are Cookies
            </h3>
            <p className="policy-content-text" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              Cookies are small text files stored on your device that help identify your browser and preferences.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              2. Types of Cookies Used
            </h3>
            <ul
              className="list-disc pl-6 space-y-2 policy-content-text"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              <li>
                <strong>Essential Cookies:</strong> Required for site functionality and navigation.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Used to analyze website usage, e.g., Google Analytics.
              </li>
              <li>
                <strong>Security Cookies:</strong> Help prevent fraud and ensure safe login sessions.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              3. How We Use Cookies
            </h3>
            <ul
              className="list-disc pl-6 space-y-2 policy-content-text"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              <li>Improve website functionality and user experience.</li>
              <li>Analyze site performance and traffic patterns.</li>
              <li>Ensure security and prevent unauthorized activity.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              4. Controlling Cookies
            </h3>
            <p
              className="policy-content-text mb-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              Users can manage or disable cookies through their browser settings.
            </p>
            <p className="policy-content-text" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              Some features of the website may not function properly if cookies are disabled.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              5. Data Privacy
            </h3>
            <p
              className="policy-content-text mb-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              Cookies may collect information about your device, IP address, and browsing behavior.
            </p>
            <p className="policy-content-text" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              All data collected via cookies is processed in accordance with our Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              6. Third-Party Cookies
            </h3>
            <p
              className="policy-content-text mb-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              ITD may use third-party analytics or advertising services that deploy cookies on our site.
            </p>
            <p className="policy-content-text" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              We ensure that such third parties comply with data protection regulations.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              7. Contact Information
            </h3>
            <ul
              className="list-disc pl-6 space-y-2 policy-content-text"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:sales@ideateam.dev" className="text-[#FF6200] hover:underline">
                  sales@ideateam.dev
                </a>
              </li>
              <li>
                <strong>Address:</strong> Ukraine, Chernihiv, Rokossovsky street 13, 14027
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
