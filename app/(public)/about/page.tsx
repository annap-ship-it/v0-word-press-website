import type { Metadata } from "next"
import AboutPageClient from "./page.client"

export const metadata: Metadata = {
  title: "About Us | Software Development Company | Team & Mission",
  description:
    "Learn about Idea Team Dev - a leading software development company focused on delivering innovative web, mobile, and SaaS solutions with expert developers.",
  openGraph: {
    title: "About Us | Idea Team Dev",
    description: "Learn about our company mission, values, and software development expertise.",
  },
}

export default function AboutPage() {
  return <AboutPageClient />
}
