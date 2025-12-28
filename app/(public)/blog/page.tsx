import { createServerClient } from "@/lib/supabase/server"
import Link from "next/link"
import Image from "next/image"

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image: string | null
  category: { name: string; slug: string } | null
  created_at: string
  author_id: string
}

async function getPosts(): Promise<Post[]> {
  const supabase = await createServerClient()

  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, featured_image, category:categories(name, slug), created_at, author_id")
    .eq("status", "published")
    .neq("category_id", "c812ffe4-c357-4ade-bd6a-6dab6d9b1d79") // Exclude Projects category
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching posts:", error)
    return []
  }

  return posts || []
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

export default async function BlogPage() {
  const posts = await getPosts()
  const featuredPost = posts[0]
  const latestNews = posts.slice(1, 3)
  const regularPosts = posts.slice(3)

  // Default posts for when database is empty
  const defaultPosts = [
    {
      id: "1",
      title: "The Ultimate Guide to IT Personnel Outsourcing in 2024",
      slug: "it-personnel-outsourcing-guide-2024",
      excerpt:
        "Learn how IT personnel outsourcing can transform your business operations, reduce costs, and give you access to global talent pools.",
      featured_image: "/it-team-working-remotely-on-computers.jpg",
      category: { name: "Automation", slug: "automation" },
      created_at: new Date().toISOString(),
      author_id: "1",
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
      author_id: "1",
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
      author_id: "1",
    },
    {
      id: "4",
      title: "Staff Augmentation vs. Project Outsourcing: What's Right for You?",
      slug: "staff-augmentation-vs-project-outsourcing",
      excerpt:
        "Compare staff augmentation and project outsourcing models to determine which approach best fits your organization's goals.",
      featured_image: "/team-planning-strategy-whiteboard.jpg",
      category: { name: "Automation", slug: "automation" },
      created_at: new Date().toISOString(),
      author_id: "1",
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
      author_id: "1",
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
      author_id: "1",
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
      author_id: "1",
    },
    {
      id: "8",
      title: "Top Technologies to Outsource in 2024",
      slug: "top-technologies-outsource-2024",
      excerpt: "Explore the most in-demand technologies and skills that companies are outsourcing this year.",
      featured_image: "/ai-machine-learning-technology.jpg",
      category: { name: "New", slug: "new" },
      created_at: new Date().toISOString(),
      author_id: "1",
    },
  ]

  const displayPosts = posts.length > 0 ? posts : defaultPosts
  const displayFeatured = displayPosts[0]
  const displayLatestNews = displayPosts.slice(1, 3)
  const displayRegular = displayPosts.slice(3)

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          {/* Title with gradient */}
          <h1
            className="text-4xl md:text-6xl font-bold text-center mb-16"
            style={{
              backgroundImage: "linear-gradient(90.39deg, #FF6200 34.5%, var(--foreground) 66.76%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Blog
          </h1>

          {/* Featured Post + Latest News - Desktop Layout */}
          {displayFeatured && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Featured Post */}
              <Link href={`/blog/${displayFeatured.slug}`} className="group">
                <div className="relative">
                  {/* Image */}
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
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                      JF
                    </div>
                    <span className="text-sm" style={{ color: "var(--foreground)" }}>
                      Jason Francisco
                    </span>
                    <span className="text-sm text-[#787877] dark:text-[#CCCCCC]">•</span>
                    <span className="text-sm text-[#FF6200]">{formatDate(displayFeatured.created_at)}</span>
                  </div>
                </div>
              </Link>

              {/* Latest News */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "var(--foreground)" }}>
                  Last news
                </h3>
                <div className="space-y-6">
                  {displayLatestNews.map((post) => (
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
                          JF
                        </div>
                        <span className="text-xs" style={{ color: "var(--foreground)" }}>
                          Jason Francisco
                        </span>
                        <span className="text-xs text-[#787877] dark:text-[#CCCCCC]">•</span>
                        <span className="text-xs text-[#FF6200]">{formatDate(post.created_at)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Regular Posts Grid */}
          {displayRegular.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {displayRegular.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
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
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <p className="text-xs text-[#FF6200] mb-2">{formatDate(post.created_at)}</p>

                  <h3
                    className="text-base md:text-lg font-semibold mb-3 group-hover:text-[#FF6200] transition-colors line-clamp-2"
                    style={{ color: "var(--foreground)" }}
                  >
                    {post.title}
                  </h3>

                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#FF6200] flex items-center justify-center text-white text-xs font-medium">
                      JF
                    </div>
                    <span className="text-xs" style={{ color: "var(--foreground)" }}>
                      Jason Francisco
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
