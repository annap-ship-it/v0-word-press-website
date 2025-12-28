"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, Calendar, Share2, Facebook, Twitter, Linkedin, Copy } from "lucide-react"

interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image: string | null
  category: { name: string; slug: string } | null
  created_at: string
  author_id: string
  meta_title: string | null
  meta_description: string | null
}

interface RelatedPost {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image: string | null
  category: { name: string } | null
  created_at: string
}

// Default article content for IT Personnel Outsourcing
const defaultArticle = {
  id: "1",
  title: "The Ultimate Guide to IT Personnel Outsourcing in 2024",
  slug: "it-personnel-outsourcing-guide-2024",
  excerpt:
    "Learn how IT personnel outsourcing can transform your business operations, reduce costs, and give you access to global talent pools.",
  featured_image: "/it-team-working-remotely-modern-office.jpg",
  category: { name: "Automation", slug: "automation" },
  created_at: new Date().toISOString(),
  author_id: "1",
  meta_title: "IT Personnel Outsourcing Guide 2024",
  meta_description: "Complete guide to IT outsourcing",
  content: `
    <h2>What is IT Personnel Outsourcing?</h2>
    <p>IT personnel outsourcing is a strategic business practice where companies delegate their information technology functions, projects, or staffing needs to external service providers. This approach has become increasingly popular as organizations seek to optimize costs, access specialized skills, and focus on their core competencies.</p>
    
    <p>In today's rapidly evolving technological landscape, maintaining an in-house IT team with all the necessary skills can be challenging and expensive. IT outsourcing offers a flexible solution that allows businesses to scale their technical capabilities without the overhead of permanent hires.</p>

    <h2>Key Benefits of IT Outsourcing</h2>
    
    <h3>1. Cost Reduction</h3>
    <p>One of the primary drivers for IT outsourcing is cost savings. By partnering with outsourcing providers, companies can significantly reduce expenses related to:</p>
    <ul>
      <li>Salaries and benefits for full-time employees</li>
      <li>Office space and equipment</li>
      <li>Training and professional development</li>
      <li>Recruitment and HR management</li>
    </ul>

    <h3>2. Access to Global Talent</h3>
    <p>Outsourcing opens doors to a vast pool of skilled professionals worldwide. Whether you need experts in cloud computing, artificial intelligence, cybersecurity, or web development, outsourcing partners can connect you with the right talent regardless of geographical limitations.</p>

    <h3>3. Scalability and Flexibility</h3>
    <p>Business needs fluctuate, and IT outsourcing provides the flexibility to scale your team up or down based on project requirements. This elasticity is particularly valuable for:</p>
    <ul>
      <li>Seasonal businesses with varying workloads</li>
      <li>Startups experiencing rapid growth</li>
      <li>Companies launching new products or services</li>
      <li>Organizations undergoing digital transformation</li>
    </ul>

    <h3>4. Focus on Core Business</h3>
    <p>By delegating IT functions to specialized partners, your internal team can concentrate on strategic initiatives and core business activities that drive growth and competitive advantage.</p>

    <h2>Types of IT Outsourcing Models</h2>

    <h3>Staff Augmentation</h3>
    <p>Staff augmentation involves adding external IT professionals to your existing team. These resources work under your management and integrate with your internal processes. This model is ideal when you need to quickly fill skill gaps or increase capacity for specific projects.</p>

    <h3>Dedicated Team</h3>
    <p>A dedicated team model provides you with a complete, self-managed team that works exclusively on your projects. The outsourcing partner handles recruitment, HR, and administrative functions while you retain control over project direction and priorities.</p>

    <h3>Project-Based Outsourcing</h3>
    <p>In this model, you outsource an entire project to an external provider who takes full responsibility for delivery. This approach works best for well-defined projects with clear requirements and timelines.</p>

    <h2>How to Choose the Right Outsourcing Partner</h2>
    <p>Selecting the right IT outsourcing partner is crucial for success. Consider these factors when evaluating potential providers:</p>
    
    <ol>
      <li><strong>Technical Expertise:</strong> Verify that the provider has proven experience in the technologies and domains relevant to your needs.</li>
      <li><strong>Communication:</strong> Assess their communication practices, language proficiency, and time zone compatibility.</li>
      <li><strong>Security:</strong> Ensure they have robust data protection measures and comply with relevant regulations.</li>
      <li><strong>Track Record:</strong> Request case studies, client references, and portfolio samples.</li>
      <li><strong>Cultural Fit:</strong> Evaluate their work culture and values alignment with your organization.</li>
    </ol>

    <h2>Best Practices for Successful IT Outsourcing</h2>
    <p>To maximize the benefits of IT outsourcing, follow these best practices:</p>
    <ul>
      <li>Clearly define project scope, objectives, and success metrics</li>
      <li>Establish effective communication channels and regular check-ins</li>
      <li>Document processes, requirements, and expectations thoroughly</li>
      <li>Implement robust project management and tracking tools</li>
      <li>Build strong relationships with your outsourcing team</li>
      <li>Plan for knowledge transfer and documentation</li>
    </ul>

    <h2>Conclusion</h2>
    <p>IT personnel outsourcing has evolved from a cost-cutting measure to a strategic business enabler. When implemented thoughtfully, it can provide your organization with competitive advantages through access to top talent, increased agility, and optimized operations. The key to success lies in choosing the right partner, establishing clear expectations, and maintaining open communication throughout the engagement.</p>
    
    <p>Ready to explore IT outsourcing for your organization? Contact our team to discuss how we can help you build a high-performing distributed team tailored to your specific needs.</p>
  `,
}

const relatedArticles: RelatedPost[] = [
  {
    id: "2",
    title: "5 Benefits of Outsourcing Your Development Team",
    slug: "benefits-outsourcing-development-team",
    excerpt: "Discover the key advantages of working with an outsourced development team.",
    featured_image: "/developers-collaborating.jpg",
    category: { name: "New" },
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "How to Choose the Right IT Outsourcing Partner",
    slug: "choose-right-it-outsourcing-partner",
    excerpt: "A comprehensive checklist for evaluating IT outsourcing partners.",
    featured_image: "/business-partnership-meeting.png",
    category: { name: "Most Readed" },
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Managing Remote Development Teams: Best Practices",
    slug: "managing-remote-development-teams",
    excerpt: "Essential tips for managing distributed development teams.",
    featured_image: "/remote-team-video-call.jpg",
    category: { name: "Automation" },
    created_at: new Date().toISOString(),
  },
]

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  })
}

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

function getCategoryColor(category: string): string {
  return "bg-[#FF6200]"
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [post, setPost] = useState<Post | null>(null)
  const [related, setRelated] = useState<RelatedPost[]>(relatedArticles)
  const [loading, setLoading] = useState(true)
  const [isDark, setIsDark] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return

      const supabase = createBrowserClient()
      const { data, error } = await supabase
        .from("posts")
        .select(
          "id, title, slug, content, excerpt, featured_image, category:categories(name, slug), created_at, author_id, meta_title, meta_description",
        )
        .eq("slug", slug)
        .single()

      if (error || !data) {
        // Use default article if not found
        setPost(defaultArticle)
      } else {
        setPost(data)
      }

      // Fetch related posts
      const { data: relatedData } = await supabase
        .from("posts")
        .select("id, title, slug, excerpt, featured_image, category:categories(name), created_at")
        .eq("status", "published")
        .neq("slug", slug)
        .neq("category_id", "c812ffe4-c357-4ade-bd6a-6dab6d9b1d79") // Exclude Projects
        .limit(3)

      if (relatedData && relatedData.length > 0) {
        setRelated(relatedData)
      }

      setLoading(false)
    }

    fetchPost()
  }, [slug])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(post?.title || "")

    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    }

    window.open(shareUrls[platform], "_blank", "width=600,height=400")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <div className="w-8 h-8 border-2 border-[#FF6200] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--foreground)" }}>
            Article not found
          </h1>
          <Link href="/blog" className="text-[#FF6200] hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const readTime = estimateReadTime(post.content || "")
  const titleGradient = isDark
    ? "linear-gradient(90.39deg, #FF6200 34.5%, #FFFFFF 66.76%)"
    : "linear-gradient(90.39deg, #FF6200 34.5%, #000000 66.76%)"

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Back Button */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#787877] hover:text-[#FF6200] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-[900px] mx-auto px-4 md:px-6">
          {/* Category */}
          {post.category?.name && (
            <div className="mb-4">
              <span
                className={`px-4 py-2 rounded-[4px] text-sm font-medium text-white ${getCategoryColor(post.category.name)}`}
              >
                {post.category.name}
              </span>
            </div>
          )}

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            style={{
              backgroundImage: titleGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 pb-8 border-b border-[#E5E5E5] dark:border-[#333]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FF6200] flex items-center justify-center text-white font-medium">
                JF
              </div>
              <div>
                <p className="font-medium" style={{ color: "var(--foreground)" }}>
                  Jason Francisco
                </p>
                <p className="text-sm text-[#787877]">Author</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#787877]">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{formatDate(post.created_at)}</span>
            </div>

            <div className="flex items-center gap-2 text-[#787877]">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{readTime} min read</span>
            </div>
          </div>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-[14px] overflow-hidden mb-10">
              <Image
                src={post.featured_image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <article
            className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-[#787877] dark:prose-p:text-[#CCCCCC] prose-p:leading-relaxed prose-li:text-[#787877] dark:prose-li:text-[#CCCCCC] prose-a:text-[#FF6200] prose-a:no-underline hover:prose-a:underline prose-strong:font-semibold"
            style={{ color: "var(--foreground)" }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-[#E5E5E5] dark:border-[#333]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-[#787877]" />
                <span className="font-medium" style={{ color: "var(--foreground)" }}>
                  Share this article
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleShare("facebook")}
                  className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="w-10 h-10 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="w-10 h-10 rounded-full bg-[#0A66C2] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </button>
                <button
                  onClick={handleCopyLink}
                  className="w-10 h-10 rounded-full bg-[#FF6200] flex items-center justify-center text-white hover:opacity-80 transition-opacity relative"
                  aria-label="Copy link"
                >
                  <Copy className="w-5 h-5" />
                  {copied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16" style={{ background: "var(--muted)" }}>
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-10" style={{ color: "var(--foreground)" }}>
            Related Articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {related.map((article) => (
              <Link key={article.id} href={`/blog/${article.slug}`} className="group">
                <div className="bg-white dark:bg-[#1E1E1E] rounded-[14px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-[200px]">
                    {article.category?.name && (
                      <div className="absolute top-4 left-4 z-10">
                        <span
                          className={`px-3 py-1.5 rounded-[4px] text-xs font-medium text-white ${getCategoryColor(article.category.name)}`}
                        >
                          {article.category.name}
                        </span>
                      </div>
                    )}
                    <Image
                      src={article.featured_image || "/placeholder.svg?height=200&width=400"}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-xs text-[#FF6200] mb-2">{formatDate(article.created_at)}</p>
                    <h3
                      className="font-semibold mb-2 group-hover:text-[#FF6200] transition-colors line-clamp-2"
                      style={{ color: "var(--foreground)" }}
                    >
                      {article.title}
                    </h3>
                    <p className="text-sm text-[#787877] line-clamp-2">{article.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
