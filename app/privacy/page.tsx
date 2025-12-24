"use client"

export default function PrivacyPage() {
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
        Privacy Policy
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
            1. Information We Collect
          </h2>
          <p className="mb-4">
            We collect information that you provide directly to us, including your name, email address, phone number,
            and any other information you choose to provide when contacting us or using our services.
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
            2. How We Use Your Information
          </h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Send you technical notices and support messages</li>
            <li>Communicate with you about products, services, and events</li>
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
            3. Information Sharing
          </h2>
          <p className="mb-4">
            We do not share your personal information with third parties except as described in this Privacy Policy. We
            may share information with service providers who perform services on our behalf.
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
            4. Data Security
          </h2>
          <p className="mb-4">
            We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized
            access, disclosure, alteration, and destruction.
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
            5. Your Rights
          </h2>
          <p className="mb-4">
            You have the right to access, update, or delete your personal information. You may also have the right to
            object to or restrict certain processing of your information.
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
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:sales@ideateam.dev" className="text-[#FF6200] hover:underline">
              sales@ideateam.dev
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
