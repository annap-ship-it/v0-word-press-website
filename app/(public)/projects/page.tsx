import type { Metadata } from "next"
import ProjectsPageClient from "./page.client"

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
  return <ProjectsPageClient />
}
