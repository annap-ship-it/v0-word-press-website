import type { Metadata } from "next"
import PrivacyPageClient from "./page.client"

export const metadata: Metadata = {
  title: "Privacy Policy | Data Protection | Idea Team Dev",
  description:
    "Read our Privacy Policy. Idea Team Dev is committed to protecting your personal data in accordance with GDPR and data protection regulations.",
  openGraph: {
    title: "Privacy Policy | Idea Team Dev",
    description: "Our Privacy Policy and data protection commitments.",
  },
}

export default function PrivacyPage() {
  return <PrivacyPageClient />
}
