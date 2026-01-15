import type { Metadata } from "next"
import ContactPageClient from "./page.client"

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch | Software Development Company",
  description:
    "Contact our team at Idea Team. Reach out for software development consulting, custom web and mobile solutions, or partnership inquiries.",
  openGraph: {
    title: "Contact Us | Idea Team Dev",
    description: "Contact our team for software development and IT consulting services.",
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
