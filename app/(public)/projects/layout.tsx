import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Software Projects | Portfolio | Scalable Web & Mobile Solutions",
  description:
    "Explore our portfolio of successful software development projects. From e-commerce platforms to real-time monitoring systems built with Vue.js, Node.js, GraphQL, and AWS.",
  openGraph: {
    title: "Software Projects | Portfolio | Scalable Web & Mobile Solutions",
    description:
      "Explore our portfolio of successful software development projects. From e-commerce platforms to real-time monitoring systems built with Vue.js, Node.js, GraphQL, and AWS.",
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
