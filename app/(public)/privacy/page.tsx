"use client"

import Link from "next/link"
import { PolicyBanner } from "@/components/policy-banner"
import { ChevronRight } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <PolicyBanner title="Privacy Policy" lightBanner="/images/white.png" darkBanner="/images/black.png" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="policy-breadcrumb-main hover:opacity-80 transition-opacity">
            Main
          </Link>
          <ChevronRight className="w-4 h-4 text-[#787877] dark:text-[#FFFFFF99]" />
          <span className="text-[#787877] dark:text-[#FFFFFF99]">Privacy Policy</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-20 force-white-dark">
        <div className="prose prose-lg max-w-none">
          <h2 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "24px" }}>
            Idea Team Dev
          </h2>
          <p className="policy-content-text mb-8" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
            This Privacy Policy applies to the parent organization Idea Team Dev (hereinafter referred to as "ITD",
            "we", "our", "us"), as well as its affiliated companies. In this Policy, the name "ITD" may imply ITD with
            other affiliated companies or each company individually, as the case may be.
          </p>
          <p className="policy-content-text mb-8" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
            This Privacy Policy is the full version applicable to our activities. It explains what information about
            users/customers we collect and how we use this information.
          </p>
          <p className="policy-content-text mb-8" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
            This Policy is drafted in accordance with the requirements of GDPR (Regulation (EU) 2016/679), which is
            binding for the implementation of the legislative act. Our website is managed in accordance with the General
            Data Protection Regulation (GDPR).
          </p>
          <p className="policy-content-text mb-8" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
            We consider data confidentiality an important business principle. Our policies and methods of data
            protection are focused on the processing, transfer, and storage of personal data in an appropriate and legal
            way, to ensure their confidentiality, integrity, and accessibility.
          </p>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              Principles
            </h3>
            <p
              className="policy-content-text mb-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              The ITD data protection policy is based on the following principles:
            </p>
            <ul
              className="list-disc pl-6 space-y-2 policy-content-text"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              <li>Personal data processing is carried out in a legal, conscientious, and transparent manner;</li>
              <li>Data is collected only for specified, unambiguous, and legitimate purposes;</li>
              <li>Personal data is accurate and updated if necessary;</li>
              <li>Inaccurate data will be promptly corrected or removed;</li>
              <li>Personal data is stored no longer than necessary;</li>
              <li>Data confidentiality and safety are ensured;</li>
              <li>Personal data is not transferred to third parties unless required to provide services or by law;</li>
              <li>
                Data subjects have the right to access, modify, delete, restrict processing, object to processing, and
                request data portability.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              Personal Data
            </h3>
            <p
              className="policy-content-text mb-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              Personal data means any information that can be attributed to an identified or identifiable individual
              ("data subject"), including name, date of birth, address, email, phone number, etc.
            </p>
            <h4
              className="policy-content-text mb-3 mt-6"
              style={{ fontFamily: "Onest", fontWeight: 600, fontSize: "18px" }}
            >
              Collection of Personal Data
            </h4>
            <ul
              className="list-disc pl-6 space-y-2 policy-content-text"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              <li>
                <strong>Data you provide:</strong> Name, email, phone, profile info, survey responses, messages, and
                other information you provide when using our website, applications, or services.
              </li>
              <li>
                <strong>Data on service usage:</strong> Device type, IP address, OS, accessed content, and other
                technical data to improve services.
              </li>
              <li>
                <strong>Data from third parties:</strong> Business partners, marketing agencies, or other sources. Used
                only as necessary for service provision, administration, analytics, and IT/security purposes.
              </li>
            </ul>
            <p
              className="policy-content-text mt-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              We collect only the information necessary to provide our services at the highest level.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              Processing and Use of Personal Data
            </h3>
            <p
              className="policy-content-text mb-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              We process personal data only to the extent necessary for defined, specific, and legitimate purposes, such
              as:
            </p>
            <ul
              className="list-disc pl-6 space-y-2 policy-content-text"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              <li>Providing, improving, and developing products and services;</li>
              <li>Security and verification of user actions;</li>
              <li>Communication with users/customers.</li>
            </ul>
            <p
              className="policy-content-text mt-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              Data is stored only as long as necessary to fulfill these purposes. Access is limited to employees with
              appropriate permission and operational need.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              Using Cookies
            </h3>
            <p
              className="policy-content-text mb-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              Idea Team Dev uses cookies to improve user experience and site administration. Cookies are small text
              files used to store identifiers and other information.
            </p>
            <p
              className="policy-content-text mb-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              We use cookies for:
            </p>
            <ul
              className="list-disc pl-6 space-y-2 policy-content-text"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              <li>Improving website functionality and navigation;</li>
              <li>Analyzing website usage through third-party analytics services, such as Google Analytics;</li>
              <li>Ensuring security and preventing fraudulent activity.</li>
            </ul>
            <p
              className="policy-content-text mt-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              You can control or disable cookies through your browser settings. Please note that some parts of the
              website may not function properly if cookies are disabled.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              Transfer of Personal Data
            </h3>
            <p
              className="policy-content-text mb-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              Personal data is not shared with third parties except with trusted partners when necessary to provide
              services. We do not disclose data for advertising purposes.
            </p>
            <p className="policy-content-text" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              ITD may disclose personal data if required by law, court order, or to protect our rights and the safety of
              clients.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              Security of Data Processing
            </h3>
            <p className="policy-content-text" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              We implement technical, physical, and administrative measures to protect personal data from loss,
              unauthorized access, disclosure, or modification. Users are responsible for keeping their passwords and
              login credentials secure.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              Access, Modification, and Deletion of Personal Data
            </h3>
            <p
              className="policy-content-text mb-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              Users have the right to access, correct, delete, restrict, or object to processing of their data. Requests
              will be processed within 30 calendar days. Verification of identity may be required.
            </p>
            <p className="policy-content-text" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              Requests should be sent to:{" "}
              <a href="mailto:sales@ideateam.dev" className="text-[#FF6200] hover:underline">
                sales@ideateam.dev
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              Advertising
            </h3>
            <p className="policy-content-text" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              With consent, ITD may send promotional emails. Users may opt-out at any time via the "Unsubscribe" link or
              by contacting sales@ideateam.dev
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              Responsibility
            </h3>
            <p className="policy-content-text" style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}>
              ITD monitors GDPR compliance and keeps records of data processing activities.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="policy-content-text mb-4" style={{ fontFamily: "Onest", fontWeight: 700, fontSize: "20px" }}>
              Contact Information
            </h3>
            <p
              className="policy-content-text mb-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              For questions regarding this Privacy Policy, contact:
            </p>
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
            <p
              className="policy-content-text mt-4"
              style={{ fontFamily: "Onest", fontSize: "16px", lineHeight: "160%" }}
            >
              10.10.2025
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
