import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Software Projects | Portfolio | Scalable Web & Mobile Solutions",
  description:
    "Explore our portfolio of successful software development projects. From e-commerce platforms to real-time monitoring systems built with Vue.js, Node.js, GraphQL, and AWS.",
  openGraph: {
    title: "Software Projects | Portfolio | Scalable Web & Mobile Solutions",
    description: "Explore our portfolio of successful software development projects.",
  },
}

export default function ProjectsPage() {
  return <div className="min-h-screen" style={{ background: "var(--background)" }} />
}
