"use client"

import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface Post {
  id: string
  title: string
  slug: string
  status: string
  category: string | null
  created_at: string
}

interface PostsTableProps {
  posts: Post[]
}

export function PostsTable({ posts }: PostsTableProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all")

  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true
    if (filter === "published") return post.status === "published"
    if (filter === "draft") return post.status === "draft"
    return true
  })

  const publishedCount = posts.filter((p) => p.status === "published").length
  const draftCount = posts.filter((p) => p.status === "draft").length

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    setDeletingId(postId)
    const supabase = createBrowserClient()

    const { error } = await supabase.from("posts").delete().eq("id", postId)

    if (error) {
      console.error("[v0] Error deleting post:", error)
      alert("Failed to delete post")
    } else {
      router.refresh()
    }

    setDeletingId(null)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="bg-white dark:bg-[#2c3338] border border-[#c3c4c7] dark:border-[#3c434a]">
      {/* Filters */}
      <div className="border-b border-[#c3c4c7] dark:border-[#3c434a] px-4 py-3">
        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={() => setFilter("all")}
            className={
              filter === "all"
                ? "text-[#2271b1] dark:text-[#72aee6] font-semibold"
                : "text-[#646970] dark:text-[#a7aaad] hover:text-[#2271b1] dark:hover:text-[#72aee6]"
            }
          >
            All ({posts.length})
          </button>
          <span className="text-[#646970] dark:text-[#a7aaad]">|</span>
          <button
            onClick={() => setFilter("published")}
            className={
              filter === "published"
                ? "text-[#2271b1] dark:text-[#72aee6] font-semibold"
                : "text-[#646970] dark:text-[#a7aaad] hover:text-[#2271b1] dark:hover:text-[#72aee6]"
            }
          >
            Published ({publishedCount})
          </button>
          <span className="text-[#646970] dark:text-[#a7aaad]">|</span>
          <button
            onClick={() => setFilter("draft")}
            className={
              filter === "draft"
                ? "text-[#2271b1] dark:text-[#72aee6] font-semibold"
                : "text-[#646970] dark:text-[#a7aaad] hover:text-[#2271b1] dark:hover:text-[#72aee6]"
            }
          >
            Draft ({draftCount})
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#f6f7f7] dark:bg-[#1d2327]">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-[#1d2327] dark:text-[#f0f0f1]">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-[#1d2327] dark:text-[#f0f0f1]">Title</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-[#1d2327] dark:text-[#f0f0f1]">Author</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-[#1d2327] dark:text-[#f0f0f1]">Category</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-[#1d2327] dark:text-[#f0f0f1]">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c3c4c7] dark:divide-[#3c434a]">
            {filteredPosts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-[#646970] dark:text-[#a7aaad]">
                  No posts found
                </td>
              </tr>
            ) : (
              filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-[#f6f7f7] dark:hover:bg-[#1d2327] group">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="font-medium text-[#2271b1] dark:text-[#72aee6] hover:text-[#135e96]"
                      >
                        {post.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/posts/${post.id}/edit`} className="text-[#2271b1] dark:text-[#72aee6]">
                          Edit
                        </Link>
                        <span className="text-[#646970] dark:text-[#a7aaad]">|</span>
                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={deletingId === post.id}
                          className="text-[#a00] hover:text-[#dc3232] disabled:opacity-50"
                        >
                          {deletingId === post.id ? "Deleting..." : "Trash"}
                        </button>
                        <span className="text-[#646970] dark:text-[#a7aaad]">|</span>
                        <Link href={`/blog/${post.slug}`} className="text-[#2271b1] dark:text-[#72aee6]">
                          View
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#646970] dark:text-[#a7aaad]">Admin</td>
                  <td className="px-4 py-3 text-sm text-[#646970] dark:text-[#a7aaad]">{post.category || "—"}</td>
                  <td className="px-4 py-3 text-sm text-[#646970] dark:text-[#a7aaad]">
                    <div className="flex flex-col">
                      <span
                        className={`text-xs px-2 py-0.5 rounded w-fit mb-1 ${
                          post.status === "published" ? "bg-[#00a32a] text-white" : "bg-[#dba617] text-white"
                        }`}
                      >
                        {post.status === "published" ? "Published" : "Draft"}
                      </span>
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
