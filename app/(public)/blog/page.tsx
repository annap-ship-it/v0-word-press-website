"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { createBrowserClient } from "@/lib/supabase/client"

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image: string | null
  category: { name: string; slug: string } | null
  created_at: string
  published_at: string | null
  author_id: string
  author?: {
    display_name: string | null
    avatar_url: string | null
  } | null
}

function getAuthorInitials(name: string | null | undefined): string {
  if (!name) return "AU"
  const parts = name.trim().split(" ")
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

function getAuthorName(author: Post["author"]): string {
  return author?.display_name || "Author"
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  })
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Automation: "bg-[#FF6200]",
    New: "bg-[#FF6200]",
    "Most Readed": "bg-[#FF6200]",
    News: "bg-[#FF6200]",
  }
  return colors[category] || "bg-[#FF6200]"
}

function AnimatedCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
      }}
    >
      {children}
    </div>
  )
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      const supabase = createBrowserClient()

      const { data: postsData, error } = await supabase
        .from("posts")
        .select(
          "id, title, slug, excerpt, featured_image, category:categories(name, slug), created_at, published_at, author_id",
        )
        .eq("status", "published")
        .neq("category_id", "c812ffe4-c357-4ade-bd6a-6dab6d9b1d79")
        .order("published_at", { ascending: false, nullsFirst: false })

      if (!error && postsData && postsData.length > 0) {
        const authorIds = [...new Set(postsData.map((p) => p.author_id).filter(Boolean))]

        let authorsMap: Record<string, { display_name: string | null; avatar_url: string | null }> = {}

        if (authorIds.length > 0) {
          const { data: authorsData } = await supabase
            .from("profiles")
            .select("id, display_name, avatar_url")
            .in("id", authorIds)

          if (authorsData) {
            authorsMap = authorsData.reduce(
              (acc, author) => {
                acc[author.id] = { display_name: author.display_name, avatar_url: author.avatar_url }
                return acc
              },
              {} as Record<string, { display_name: string | null; avatar_url: string | null }>,
            )
          }
        }

        const postsWithAuthors = postsData.map((post) => ({
          ...post,
          author: authorsMap[post.author_id] || null,
        }))

        setPosts(postsWithAuthors)
      }
      setLoading(false)
    }
    fetchPosts()
  }, [])

  // Default posts for when database is empty
  const defaultPosts: Post[] = [
    {
      id: "1",
      title: "The Ultimate Guide to IT Personnel Outsourcing in 2024",
      slug: "it-personnel-outsourcing-guide-2024",
      excerpt:
        "Learn how IT personnel outsourcing can transform your business operations, reduce costs, and give you access to global talent pools.",
      featured_image: "/it-team-working-remotely-on-computers.jpg",
      category: { name: "Automation", slug: "automation" },
      created_at: new Date().toISOString(),
      published_at: new Date().toISOString(),
      author_id: "1",
      author: { display_name: "Author", avatar_url: null },
    },
    {
      id: "2",
      title: "5 Benefits of Outsourcing Your Development Team",
      slug: "benefits-outsourcing-development-team",
      excerpt:
        "Discover the key advantages of working with an outsourced development team and how it can accelerate your project delivery.",
      featured_image: "/developers-collaborating-on-project.jpg",
      category: { name: "New", slug: "new" },
      created_at: new Date().toISOString(),
      published_at: new Date().toISOString(),
      author_id: "1",
      author: { display_name: "Author", avatar_url: null },
    },
    {
      id: "3",
      title: "How to Choose the Right IT Outsourcing Partner",
      slug: "choose-right-it-outsourcing-partner",
      excerpt:
        "A comprehensive checklist for evaluating and selecting the perfect IT outsourcing partner for your business needs.",
      featured_image: "/business-meeting-handshake-partnership.jpg",
      category: { name: "Most Readed", slug: "most-readed" },
      created_at: new Date().toISOString(),
      published_at: new Date().toISOString(),
      author_id: "1",
      author: { display_name: "Author", avatar_url: null },
    },
    {
      id: "4",
      title: "Staff Augmentation vs. Project Outsourcing: What is Right for You?",
      slug: "staff-augmentation-vs-project-outsourcing",
      excerpt:
        "Compare staff augmentation and project outsourcing models to determine which approach best fits your organization goals.",
      featured_image: "/team-planning-strategy-whiteboard.jpg",
      category: { name: "Automation", slug: "automation" },
      created_at: new Date().toISOString(),
      published_at: new Date().toISOString(),
      author_id: "1",
      author: { display_name: "Author", avatar_url: null },
    },
    {
      id: "5",
      title: "Managing Remote Development Teams: Best Practices",
      slug: "managing-remote-development-teams",
      excerpt:
        "Essential tips and tools for effectively managing distributed development teams across different time zones.",
      featured_image: "/video-call-remote-team-meeting.jpg",
      category: { name: "New", slug: "new" },
      created_at: new Date().toISOString(),
      published_at: new Date().toISOString(),
      author_id: "1",
      author: { display_name: "Author", avatar_url: null },
    },
    {
      id: "6",
      title: "Cost Analysis: In-House vs Outsourced IT Teams",
      slug: "cost-analysis-in-house-vs-outsourced",
      excerpt:
        "A detailed breakdown of the true costs of maintaining in-house IT teams versus outsourcing to specialized partners.",
      featured_image: "/financial-charts-data-analysis.jpg",
      category: { name: "Most Readed", slug: "most-readed" },
      created_at: new Date().toISOString(),
      published_at: new Date().toISOString(),
      author_id: "1",
      author: { display_name: "Author", avatar_url: null },
    },
    {
      id: "7",
      title: "Building a Successful Offshore Development Center",
      slug: "building-offshore-development-center",
      excerpt:
        "Step-by-step guide to establishing and scaling your own offshore development center for long-term success.",
      featured_image: "/modern-office-space-developers.jpg",
      category: { name: "Automation", slug: "automation" },
      created_at: new Date().toISOString(),
      published_at: new Date().toISOString(),
      author_id: "1",
      author: { display_name: "Author", avatar_url: null },
    },
    {
      id: "8",
      title: "Top Technologies to Outsource in 2024",
      slug: "top-technologies-outsource-2024",
      excerpt: "Explore the most in-demand technologies and skills that companies are outsourcing this year.",
      featured_image: "/ai-machine-learning-technology.jpg",
      category: { name: "New", slug: "new" },
      created_at: new Date().toISOString(),
      published_at: new Date().toISOString(),
      author_id: "1",
      author: { display_name: "Author", avatar_url: null },
    },
  ]

  const displayPosts = posts.length > 0 ? posts : defaultPosts
  const displayFeatured = displayPosts[0]
  const displayLatestNews = displayPosts.slice(1, 3)
  const displayRegular = displayPosts.slice(3)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <div className="w-8 h-8 border-2 border-[#FF6200] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          {/* Title with gradient */}
          <AnimatedCard>
            <h1
              className="text-4xl md:text-6xl font-bold text-center mt-[47px] mb-11 leading-[5rem]"
              style={{
                backgroundImage: "linear-gradient(90.39deg, #FF6200 34.5%, var(--foreground) 66.76%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Blog
            </h1>
          </AnimatedCard>

          {/* Featured Post + Latest News - Desktop Layout */}
          {displayFeatured && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Featured Post */}
              <AnimatedCard delay={100}>
                <Link href={`/blog/${displayFeatured.slug}`} className="group block">
                  <div className="relative">
                    {/* Image - Added zoom effect on hover */}
                    <div className="relative h-[300px] md:h-[400px] rounded-[14px] overflow-hidden mb-6">
                      {displayFeatured.category?.name && (
                        <div className="absolute top-4 left-4 z-10">
                          <span
                            className={`px-4 py-2 rounded-[4px] text-sm font-medium text-white ${getCategoryColor(
                              displayFeatured.category.name,
                            )}`}
                          >
                            {displayFeatured.category.name}
                          </span>
                        </div>
                      )}
                      <Image
                        src={displayFeatured.featured_image || "/placeholder.svg?height=400&width=600"}
                        alt={displayFeatured.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    </div>

                    {/* Content */}
                    <h2
                      className="text-xl md:text-2xl font-bold mb-4 group-hover:text-[#FF6200] transition-colors"
                      style={{ color: "var(--foreground)" }}
                    >
                      {displayFeatured.title}
                    </h2>
                    <p className="text-[#787877] dark:text-[#CCCCCC] mb-6 line-clamp-3 text-sm md:text-base">
                      {displayFeatured.excerpt}
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FF6200] flex items-center justify-center text-white text-sm font-medium">
                        {getAuthorInitials(displayFeatured.author?.display_name)}
                      </div>
                      <span className="text-sm" style={{ color: "var(--foreground)" }}>
                        {getAuthorName(displayFeatured.author)}
                      </span>
                      <span className="text-sm text-[#787877] dark:text-[#CCCCCC]">•</span>
                      <span className="text-sm" style={{ color: "var(--foreground)" }}>
                        {formatDate(displayFeatured.published_at || displayFeatured.created_at)}
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedCard>

              {/* Latest News */}
              <AnimatedCard delay={200}>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "var(--foreground)" }}>
                    Last news
                  </h3>
                  <div className="space-y-6">
                    {displayLatestNews.map((post, index) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="block group border-b border-[#E5E5E5] dark:border-[#333] pb-6 last:border-0"
                      >
                        <h4
                          className="text-lg font-semibold mb-2 group-hover:text-[#FF6200] transition-colors"
                          style={{ color: "var(--foreground)" }}
                        >
                          {post.title}
                        </h4>
                        <p className="text-sm text-[#787877] dark:text-[#CCCCCC] mb-3 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#FF6200] flex items-center justify-center text-white text-xs font-medium">
                            {getAuthorInitials(post.author?.display_name)}
                          </div>
                          <span className="text-xs" style={{ color: "var(--foreground)" }}>
                            {getAuthorName(post.author)}
                          </span>
                          <span className="text-xs text-[#787877] dark:text-[#CCCCCC]">•</span>
                          <span className="text-xs" style={{ color: "var(--foreground)" }}>
                            {formatDate(post.published_at || post.created_at)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            </div>
          )}

          {/* Regular Posts Grid */}
          {displayRegular.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {displayRegular.map((post, index) => (
                <AnimatedCard key={post.id} delay={100 * (index + 1)}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="relative h-[200px] md:h-[250px] rounded-[14px] overflow-hidden mb-4">
                      {post.category?.name && (
                        <div className="absolute top-4 left-4 z-10">
                          <span
                            className={`px-3 py-1.5 rounded-[4px] text-xs font-medium text-white ${getCategoryColor(post.category.name)}`}
                          >
                            {post.category.name}
                          </span>
                        </div>
                      )}
                      <Image
                        src={post.featured_image || "/placeholder.svg?height=250&width=400"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    </div>

                    <p className="text-xs mb-2" style={{ color: "var(--foreground)" }}>
                      {formatDate(post.published_at || post.created_at)}
                    </p>

                    <h3
                      className="text-base md:text-lg font-semibold mb-3 group-hover:text-[#FF6200] transition-colors line-clamp-2"
                      style={{ color: "var(--foreground)" }}
                    >
                      {post.title}
                    </h3>

                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#FF6200] flex items-center justify-center text-white text-xs font-medium">
                        {getAuthorInitials(post.author?.display_name)}
                      </div>
                      <span className="text-xs" style={{ color: "var(--foreground)" }}>
                        {getAuthorName(post.author)}
                      </span>
                    </div>
                  </Link>
                </AnimatedCard>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
