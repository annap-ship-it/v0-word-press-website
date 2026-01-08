import { PostEditor } from "@/components/admin/post-editor"
import { createAdminClient } from "@/lib/supabase/admin"
import { notFound } from "next/navigation"

async function getPost(id: string) {
  const supabase = createAdminClient()

  const { data: post, error } = await supabase.from("posts").select("*").eq("id", id).single()

  if (error) {
    console.error("[v0] Error fetching post:", error)
    return null
  }

  return post
}

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPost(id)

  if (!post) {
    notFound()
  }

  return <PostEditor post={post} />
}
