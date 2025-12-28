"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"
import { useParams } from "next/navigation"

interface ProjectData {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image: string
  content: any
  created_at: string
}

// Default project data for fallback
const defaultProjectsData: Record<string, any> = {
  "internal-monitoring-system-symbotic": {
    title: "Internal Monitoring System for Symbotic",
    featured_image: "/monitoring-dashboard-with-graphs-and-data-visualiz.jpg",
    client: "Symbotic",
    industry: "Robotics & Automation",
    duration: "6 months",
    team: "4 developers, 1 designer, 1 QA",
    overview:
      "Symbotic needed a scalable internal monitoring tool to track their robotic systems in real-time. The challenge was to create a system that could handle massive amounts of data while providing instant insights to operators.",
    challenge:
      "Develop a scalable internal monitoring tool with real-time data updates for tracking robotic warehouse systems. The system needed to handle thousands of data points per second while maintaining a responsive user interface.",
    solution:
      "We designed full architecture from scratch, implemented GraphQL APIs for efficient data fetching, and built the admin frontend using Vue.js and Vuex for state management. Integrated Web Push notifications for critical alerts and Apollo Client for real-time data subscriptions.",
    result:
      "Delivered an efficient, scalable monitoring system with live data delivery. The system now handles 10,000+ data points per second with sub-100ms latency. Operator response time to critical events improved by 60%.",
    stack: ["Vue.js", "GraphQL", "MongoDB", "Node.js", "Apollo Client", "Redis", "Docker"],
    features: [
      "Real-time dashboard with live data updates",
      "Custom alert system with Web Push notifications",
      "Historical data analysis and reporting",
      "Role-based access control",
      "Mobile-responsive design",
    ],
    gallery: ["/dashboard-overview-screen.jpg", "/analytics-charts-and-graphs.jpg", "/alert-management-interface.jpg"],
  },
  "intertop-sensor-infobox": {
    title: "Intertop Sensor Infobox",
    featured_image: "/retail-store-sensor-display-system.jpg",
    client: "Intertop",
    industry: "Retail",
    duration: "4 months",
    team: "3 developers, 1 QA",
    overview:
      "Intertop, a major retail chain, needed a solution to bridge online and offline inventory data, providing customers with real-time product availability information in-store.",
    challenge:
      "Provide real-time product availability across online and offline channels. The solution needed to integrate with legacy 1C and MSSQL databases while maintaining data consistency.",
    solution:
      "Developed an interactive in-store sensor infobox using Node.js that syncs inventory data from offline 1C and MSSQL databases in real-time. Created a user-friendly touch interface for customers.",
    result:
      "Improved customer experience with accurate, up-to-date product information in-store. Customer satisfaction scores increased by 35%, and store staff inquiries about stock reduced by 50%.",
    stack: ["PHP", "MySQL", "Node.js", "MSSQL", "jQuery", "Backbone", "1C Integration"],
    features: [
      "Touch-screen interface for customers",
      "Real-time inventory synchronization",
      "Integration with 1C ERP system",
      "Offline mode support",
      "Admin panel for content management",
    ],
    gallery: ["/retail-kiosk-interface.jpg", "/product-information-display.jpg", "/inventory-management-dashboard.png"],
  },
  "multi-brand-ecommerce-landing-pages": {
    title: "Multi-brand E-commerce Landing Pages",
    featured_image: "/ecommerce-landing-page-design-multiple-brands.jpg",
    client: "Multiple Tech Brands",
    industry: "E-commerce",
    duration: "8 months",
    team: "5 developers, 2 designers",
    overview:
      "Major tech brands including Lenovo, Samsung, Nokia, and Panasonic needed high-performance landing pages for their marketing campaigns.",
    challenge:
      "Create high-performance, SEO-friendly landing pages for major tech brands. Each brand required unique design while maintaining consistent performance standards.",
    solution:
      "Developed multiple SPA landing pages focusing on SEO, responsive design, and cross-browser compatibility. Optimized performance for high-traffic campaigns using code splitting and lazy loading.",
    result:
      "Enhanced user engagement and increased visibility for marketing efforts. Page load times reduced to under 2 seconds. Conversion rates improved by 25% across all brands.",
    stack: ["HTML5", "CSS3", "RequireJS", "Grunt", "jQuery", "Backbone", "SASS"],
    features: [
      "SEO-optimized page structure",
      "Responsive design for all devices",
      "Cross-browser compatibility",
      "A/B testing integration",
      "Analytics tracking",
    ],
    gallery: ["/lenovo-landing-page-design.jpg", "/samsung-product-showcase.jpg", "/mobile-responsive-design.png"],
  },
  "testing-expertise-sports-social-platform": {
    title: "Testing Expertise for a Sports Social Platform",
    featured_image: "/sports-social-media-platform-testing-qa.jpg",
    client: "Sports Social Platform",
    industry: "Social Media / Sports",
    duration: "5 months",
    team: "2 QA engineers",
    overview:
      "An NBA-focused sports social platform needed comprehensive QA support during rapid development to ensure stability and quality.",
    challenge:
      "Ensure high product quality and stability during rapid development of an NBA-focused sports social platform with frequent releases and new feature additions.",
    solution:
      "Provided manual QA support covering 170+ tickets, tested new and existing features, identified critical bugs, collaborated with developers, and recommended Android devices for testing.",
    result:
      "Improved release stability, higher product quality, and smoother QA processes. Bug escape rate reduced by 80%. Release cycle time decreased from 2 weeks to 1 week.",
    stack: ["Manual Testing", "Team Collaboration Tools", "JIRA", "TestRail", "Android Testing"],
    features: [
      "Comprehensive test case development",
      "Regression testing automation",
      "Cross-device compatibility testing",
      "Performance testing",
      "User acceptance testing",
    ],
    gallery: ["/qa-testing-dashboard.jpg", "/mobile-app-testing.png", "/bug-tracking-system.jpg"],
  },
}

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    checkTheme()

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    async function fetchProject() {
      try {
        const supabase = createBrowserClient()

        const { data: post } = await supabase.from("posts").select("*").eq("slug", slug).single()

        if (post) {
          // Parse content for project data
          setProject({
            ...post,
            ...extractProjectDataFromPost(post),
          })
        } else if (defaultProjectsData[slug]) {
          setProject(defaultProjectsData[slug])
        } else {
          // Redirect to projects page if not found
          window.location.href = "/projects"
        }
      } catch (error) {
        if (defaultProjectsData[slug]) {
          setProject(defaultProjectsData[slug])
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [slug])

  function extractProjectDataFromPost(post: any) {
    const data: any = {
      title: post.title,
      featured_image: post.featured_image || "/project-management-team.png",
      overview: post.excerpt || "",
      challenge: "",
      solution: "",
      result: "",
      stack: [],
      features: [],
      gallery: [],
    }

    if (post.content && Array.isArray(post.content)) {
      post.content.forEach((block: any) => {
        const text = block.content || ""
        if (text.toLowerCase().startsWith("challenge:")) {
          data.challenge = text.replace(/^challenge:\s*/i, "")
        } else if (text.toLowerCase().startsWith("solution:")) {
          data.solution = text.replace(/^solution:\s*/i, "")
        } else if (text.toLowerCase().startsWith("result:")) {
          data.result = text.replace(/^result:\s*/i, "")
        } else if (text.toLowerCase().startsWith("stack:")) {
          data.stack = text
            .replace(/^stack:\s*/i, "")
            .split(",")
            .map((s: string) => s.trim())
        }
      })
    }

    return data
  }

  const titleGradient = isDark
    ? "linear-gradient(90.39deg, #FF6200 34.5%, #FFFFFF 66.76%)"
    : "linear-gradient(90.39deg, #FF6200 34.5%, #000000 66.76%)"

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6200]"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Project not found</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      {/* Hero Section */}
      <section className="relative">
        <div className="relative w-full h-[400px] md:h-[500px]">
          <Image src={project.featured_image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-[1280px] mx-auto">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Projects
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{project.title}</h1>
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="py-12 px-6">
        <div className="max-w-[1280px] mx-auto">
          {/* Meta Info */}
          {(project.client || project.industry || project.duration || project.team) && (
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-[4px] mb-12"
              style={{ backgroundColor: isDark ? "#1E1E1E" : "#F5F5F5" }}
            >
              {project.client && (
                <div>
                  <p className="text-[#FF6200] font-semibold text-sm mb-1">Client</p>
                  <p style={{ color: isDark ? "#FFFFFF" : "#000000" }}>{project.client}</p>
                </div>
              )}
              {project.industry && (
                <div>
                  <p className="text-[#FF6200] font-semibold text-sm mb-1">Industry</p>
                  <p style={{ color: isDark ? "#FFFFFF" : "#000000" }}>{project.industry}</p>
                </div>
              )}
              {project.duration && (
                <div>
                  <p className="text-[#FF6200] font-semibold text-sm mb-1">Duration</p>
                  <p style={{ color: isDark ? "#FFFFFF" : "#000000" }}>{project.duration}</p>
                </div>
              )}
              {project.team && (
                <div>
                  <p className="text-[#FF6200] font-semibold text-sm mb-1">Team</p>
                  <p style={{ color: isDark ? "#FFFFFF" : "#000000" }}>{project.team}</p>
                </div>
              )}
            </div>
          )}

          {/* Overview */}
          {project.overview && (
            <div className="mb-12">
              <h2
                className="text-2xl font-bold mb-4"
                style={{
                  backgroundImage: titleGradient,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Overview
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: isDark ? "#A0A0A0" : "#666666" }}>
                {project.overview}
              </p>
            </div>
          )}

          {/* Challenge, Solution, Result */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {project.challenge && (
              <div
                className="p-6 rounded-[4px] border-t-4 border-[#FF6200]"
                style={{
                  backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
                  boxShadow: isDark ? "none" : "2px 2px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3 className="text-[#FF6200] font-bold text-lg mb-3">Challenge</h3>
                <p style={{ color: isDark ? "#A0A0A0" : "#666666" }}>{project.challenge}</p>
              </div>
            )}
            {project.solution && (
              <div
                className="p-6 rounded-[4px] border-t-4 border-[#FF6200]"
                style={{
                  backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
                  boxShadow: isDark ? "none" : "2px 2px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3 className="text-[#FF6200] font-bold text-lg mb-3">Solution</h3>
                <p style={{ color: isDark ? "#A0A0A0" : "#666666" }}>{project.solution}</p>
              </div>
            )}
            {project.result && (
              <div
                className="p-6 rounded-[4px] border-t-4 border-[#FF6200]"
                style={{
                  backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
                  boxShadow: isDark ? "none" : "2px 2px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3 className="text-[#FF6200] font-bold text-lg mb-3">Result</h3>
                <p style={{ color: isDark ? "#A0A0A0" : "#666666" }}>{project.result}</p>
              </div>
            )}
          </div>

          {/* Tech Stack */}
          {project.stack && project.stack.length > 0 && (
            <div className="mb-12">
              <h2
                className="text-2xl font-bold mb-6"
                style={{
                  backgroundImage: titleGradient,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Technology Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.stack.map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: isDark ? "#2A2A2A" : "#F5F5F5",
                      color: isDark ? "#FFFFFF" : "#000000",
                      border: `1px solid ${isDark ? "#3A3A3A" : "#E0E0E0"}`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div className="mb-12">
              <h2
                className="text-2xl font-bold mb-6"
                style={{
                  backgroundImage: titleGradient,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Key Features
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF6200] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span style={{ color: isDark ? "#A0A0A0" : "#666666" }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mb-12">
              <h2
                className="text-2xl font-bold mb-6"
                style={{
                  backgroundImage: titleGradient,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Project Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.gallery.map((image: string, i: number) => (
                  <div key={i} className="relative aspect-[3/2] rounded-[4px] overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${project.title} screenshot ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Testimonial */}
          {project.testimonial && (
            <div className="p-8 rounded-[4px] mb-12" style={{ backgroundColor: isDark ? "#1E1E1E" : "#F5F5F5" }}>
              <svg className="w-10 h-10 text-[#FF6200] mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-lg italic mb-4" style={{ color: isDark ? "#FFFFFF" : "#000000" }}>
                "{project.testimonial.quote}"
              </p>
              <p className="text-[#FF6200] font-semibold">{project.testimonial.author}</p>
              <p className="text-sm" style={{ color: isDark ? "#A0A0A0" : "#666666" }}>
                {project.testimonial.company}
              </p>
            </div>
          )}

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4" style={{ color: isDark ? "#FFFFFF" : "#000000" }}>
              Have a similar project in mind?
            </h3>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 rounded-full bg-[#FF6200] text-white font-semibold hover:bg-[#E55A00] transition-colors"
            >
              Let's Talk
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
