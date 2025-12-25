"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { PolicyBanner } from "@/components/policy-banner"

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <PolicyBanner title="Terms of Use" lightBanner="/images/white.png" darkBanner="/images/black.png" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="policy-breadcrumb-main hover:opacity-80 transition-opacity">
            Main
          </Link>
          <ChevronRight className="w-4 h-4 text-[#787877] dark:text-[#FFFFFF99]" />
          <span className="text-[#787877] dark:text-[#FFFFFF99]">Terms of Use</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-20 force-white-dark">
        <div className="max-w-none">
          <h2 className="py-[50x] pb-[0] pt-14" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "24px" }}>
            Idea Team Dev
          </h2>
          <p style={{ fontFamily: "Onest", fontWeight: 600 }}>Effective Date: 10.10.2025</p>
          <p style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
            Welcome to the Idea Team Dev website and services (hereinafter "ITD", "we", "our", "us"). By accessing or
            using our website, applications, or services, you agree to comply with these Terms of Use.
          </p>

          <section className="mb-8">
            <h3 className="mx-0 my-0 py-7 pb-0" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              1. Acceptance of Terms
            </h3>
            <p style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              By using ITD services, you accept these Terms of Use in full. If you do not agree, please do not use our
              services.
            </p>
          </section>

          <section className="mb-8">
            <h3 style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>2. Use of Services</h3>
            <ul
              className="list-disc pl-6 space-y-2"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              <li>ITD provides services related to software development, consulting, and IT solutions.</li>
              <li>You agree to use our services only for lawful purposes and in compliance with applicable laws.</li>
              <li>
                You may not use ITD services to infringe the rights of others, distribute malware, or engage in illegal
                activity.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>3. User Accounts and Security</h3>
            <ul
              className="list-disc pl-6 space-y-2"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              <li>If registration is required, you must provide accurate and complete information.</li>
              <li>
                You are responsible for maintaining the confidentiality of your login credentials and for all activity
                under your account.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your login credentials and for all activity
                under your account.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>4. Intellectual Property</h3>
            <ul
              className="list-disc pl-6 space-y-2"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              <li>
                All content, logos, designs, and materials on ITD platforms are the property of ITD or its affiliates.
              </li>
              <li>You may not copy, reproduce, or distribute any ITD content without prior written permission.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>5. Limitation of Liability</h3>
            <ul
              className="list-disc pl-6 space-y-2"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              <li>
                ITD is not liable for any direct or indirect damages resulting from the use of its services or website.
              </li>
              <li>Services are provided "as is" without warranties of any kind, unless explicitly stated.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>6. Data Protection</h3>
            <ul
              className="list-disc pl-6 space-y-2"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              <li>All personal data is processed in accordance with our Privacy Policy.</li>
              <li>
                Users have rights under GDPR to access, modify, delete, and restrict processing of their personal data.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>7. Termination</h3>
            <p style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              ITD may suspend or terminate access to services for violations of these Terms or applicable law.
            </p>
          </section>

          <section className="mb-8">
            <h3 style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>8. Governing Law</h3>
            <p style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              These Terms are governed by the laws applicable in Ukraine.
            </p>
          </section>

          <section className="mb-8">
            <h3 style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>9. Contact Information</h3>
            <ul
              className="list-disc pl-6 space-y-2"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              <li>
                Email:{" "}
                <a href="mailto:sales@ideateam.dev" className="text-[#FF6200] hover:underline">
                  sales@ideateam.dev
                </a>
              </li>
              <li>Address: Ukraine, Chernihiv, Rokossovsky street 13, 14027</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
