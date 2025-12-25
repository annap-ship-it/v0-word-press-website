import { createServerClient } from "@/lib/supabase/server"
import Link from "next/link"
import Image from "next/image"

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image: string | null
  category: string
  created_at: string
  author_id: string
  is_featured: boolean
}

async function getPosts(): Promise<Post[]> {
  const supabase = await createServerClient()

  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, featured_image, category, created_at, is_featured, author_id")
    .eq("status", "published")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching posts:", error)
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
    Automation: "bg-[#FF6200] text-white",
    New: "bg-[#FFA726] text-white",
    "Most Readed": "bg-[#FF5722] text-white",
  }
  return colors[category] || "bg-[#FF6200] text-white"
}

export default async function BlogPage() {
  const posts = await getPosts()
  const featuredPost = posts.find((post) => post.is_featured) || posts[0]
  const latestNews = posts.filter((post) => !post.is_featured).slice(0, 3)
  const regularPosts = posts.filter((post) => !post.is_featured).slice(3)

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-16 text-black dark:text-white">Blog</h1>

          {/* Featured Post + Latest News */}
          {featuredPost && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Featured Post */}
              <Link href={`/blog/${featuredPost.slug}`} className="group">
                <div className="relative">
                  {/* Image */}
                  <div className="relative h-[400px] rounded-lg overflow-hidden mb-6">
                    {featuredPost.category && (
                      <div className="absolute top-4 left-4 z-10">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(
                            featuredPost.category,
                          )}`}
                        >
                          {featuredPost.category}
                        </span>
                      </div>
                    )}
                    <Image
                      src={featuredPost.featured_image || "/placeholder.svg?height=400&width=600"}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <h2 className="text-2xl font-bold mb-4 text-black dark:text-white group-hover:text-[#FF6200] transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-[#787877] dark:text-[#CCCCCC] mb-6 line-clamp-3">{featuredPost.excerpt}</p>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#787877] dark:text-[#CCCCCC]">
                      {formatDate(featuredPost.created_at)}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Latest News */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-black dark:text-white">Last news</h3>
                <div className="space-y-6">
                  {latestNews.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                      <h4 className="text-lg font-semibold mb-2 text-black dark:text-white group-hover:text-[#FF6200] transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-sm text-[#787877] dark:text-[#CCCCCC] mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#787877] dark:text-[#CCCCCC]">
                          {formatDate(post.created_at)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Regular Posts Grid */}
          {regularPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <div className="relative h-[250px] rounded-lg overflow-hidden mb-4">
                    {post.category && (
                      <div className="absolute top-4 left-4 z-10">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}
                        >
                          {post.category}
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

                  <p className="text-xs text-[#787877] dark:text-[#CCCCCC] mb-2">{formatDate(post.created_at)}</p>

                  <h3 className="text-lg font-semibold mb-3 text-black dark:text-white group-hover:text-[#FF6200] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-[#787877] dark:text-[#CCCCCC]">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
