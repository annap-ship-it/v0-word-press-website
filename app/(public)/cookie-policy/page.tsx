import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy | Website Cookies | Data Management | Idea Team Dev",
  description:
    "Read our Cookie Policy. Learn how Idea Team Dev uses cookies to enhance your experience, analyze performance, and ensure security on our website.",
  openGraph: {
    title: "Cookie Policy | Idea Team Dev",
    description: "Our Cookie Policy and data management practices.",
  },
}

export default function CookiePolicyPage() {
  return <div className="min-h-screen" style={{ background: "var(--background)" }} />
}
