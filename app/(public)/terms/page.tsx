import type { Metadata } from "next"
import TermsPageClient from "./page.client"

export const metadata: Metadata = {
  title: "Terms of Use | Service Agreement | Idea Team Dev",
  description:
    "Read our Terms of Use. Legal terms and conditions for using Idea Team Dev services, software, and website.",
  openGraph: {
    title: "Terms of Use | Idea Team Dev",
    description: "Our Terms of Use and service agreement.",
  },
}

export default function TermsPage() {
  return <TermsPageClient />
}
