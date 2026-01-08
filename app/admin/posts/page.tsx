import { PostsTable } from "@/components/admin/posts-table"
import { createAdminClient } from "@/lib/supabase/admin"
import Link from "next/link"

async function getPosts() {
  const supabase = createAdminClient()

  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, title, slug, status, category_id, author_id, created_at, updated_at")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching posts:", error.message)
    return []
  }

  return posts || []
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-normal text-[#1d2327] dark:text-[#f0f0f1]">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white rounded text-sm inline-block"
        >
          Add New
        </Link>
      </div>
      <PostsTable posts={posts} />
    </div>
  )
}
