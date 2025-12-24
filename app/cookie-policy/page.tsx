"use client"

export default function CookiePolicyPage() {
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
        Cookie Policy
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
            1. What Are Cookies
          </h2>
          <p className="mb-4">
            Cookies are small text files that are placed on your computer or mobile device when you visit a website.
            They are widely used to make websites work more efficiently and provide information to the site owners.
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
            2. How We Use Cookies
          </h2>
          <p className="mb-4">We use cookies for the following purposes:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly
            </li>
            <li>
              <strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with our
              website
            </li>
            <li>
              <strong>Functionality Cookies:</strong> These cookies enable enhanced functionality and personalization
            </li>
            <li>
              <strong>Preference Cookies:</strong> These cookies remember your settings and preferences (like theme and
              language)
            </li>
          </ul>
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
            3. Types of Cookies We Use
          </h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser
            </li>
            <li>
              <strong>Persistent Cookies:</strong> Cookies that remain on your device until they expire or you delete
              them
            </li>
          </ul>
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
            4. Managing Cookies
          </h2>
          <p className="mb-4">
            Most web browsers allow you to control cookies through their settings. You can set your browser to refuse
            cookies or delete certain cookies. Please note that if you disable cookies, some features of our website may
            not function properly.
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
            5. Updates to This Policy
          </h2>
          <p className="mb-4">
            We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new
            Cookie Policy on this page.
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
            6. Contact Us
          </h2>
          <p className="mb-4">
            If you have any questions about our use of cookies, please contact us at{" "}
            <a href="mailto:sales@ideateam.dev" className="text-[#FF6200] hover:underline">
              sales@ideateam.dev
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
