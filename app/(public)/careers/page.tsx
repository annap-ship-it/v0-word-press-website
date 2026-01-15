import type { Metadata } from "next"
import CareersPageClient from "./page.client"

export const metadata: Metadata = {
  title: "Join Our Team | Software Development Careers | Hire Developers",
  description:
    "Join Idea Team as a developer. Work from home on innovative web, mobile, and SaaS projects. We value talented individuals and offer flexible remote positions.",
  openGraph: {
    title: "Join Our Team | Software Development Careers",
    description: "Join Idea Team as a developer. Work from home on innovative projects.",
  },
}

export default function CareersPage() {
  return <CareersPageClient />
}
