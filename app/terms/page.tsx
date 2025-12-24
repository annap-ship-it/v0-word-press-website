"use client"

export default function TermsPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-20">
      <h1
        className="mb-8"
        style={{
          fontFamily: "Onest",
          fontWeight: 800,
          fontSize: "48px",
          lineHeight: "110%",
          letterSpacing: "-0.03em",
        }}
      >
        Terms of Use
      </h1>

      <div
        className="prose prose-lg max-w-none"
        style={{
          fontFamily: "Onest",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "160%",
        }}
      >
        <section className="mb-8">
          <h2
            className="mb-4"
            style={{
              fontFamily: "Onest",
              fontWeight: 700,
              fontSize: "24px",
              lineHeight: "110%",
            }}
          >
            1. Acceptance of Terms
          </h2>
          <p className="mb-4">
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this
            agreement.
          </p>
        </section>

        <section className="mb-8">
          <h2
            className="mb-4"
            style={{
              fontFamily: "Onest",
              fontWeight: 700,
              fontSize: "24px",
              lineHeight: "110%",
            }}
          >
            2. Use License
          </h2>
          <p className="mb-4">
            Permission is granted to temporarily download one copy of the materials (information or software) on Idea
            Team's website for personal, non-commercial transitory viewing only.
          </p>
        </section>

        <section className="mb-8">
          <h2
            className="mb-4"
            style={{
              fontFamily: "Onest",
              fontWeight: 700,
              fontSize: "24px",
              lineHeight: "110%",
            }}
          >
            3. Disclaimer
          </h2>
          <p className="mb-4">
            The materials on Idea Team's website are provided on an 'as is' basis. Idea Team makes no warranties,
            expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
            implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
            of intellectual property or other violation of rights.
          </p>
        </section>

        <section className="mb-8">
          <h2
            className="mb-4"
            style={{
              fontFamily: "Onest",
              fontWeight: 700,
              fontSize: "24px",
              lineHeight: "110%",
            }}
          >
            4. Limitations
          </h2>
          <p className="mb-4">
            In no event shall Idea Team or its suppliers be liable for any damages (including, without limitation,
            damages for loss of data or profit, or due to business interruption) arising out of the use or inability to
            use the materials on Idea Team's website.
          </p>
        </section>

        <section className="mb-8">
          <h2
            className="mb-4"
            style={{
              fontFamily: "Onest",
              fontWeight: 700,
              fontSize: "24px",
              lineHeight: "110%",
            }}
          >
            5. Contact Information
          </h2>
          <p className="mb-4">
            If you have any questions about these Terms of Use, please contact us at{" "}
            <a href="mailto:sales@ideateam.dev" className="text-[#FF6200] hover:underline">
              sales@ideateam.dev
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
