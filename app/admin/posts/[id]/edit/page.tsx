import { PostEditor } from "@/components/admin/post-editor"
import { createServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

async function getPost(id: string) {
  const supabase = await createServerClient()

  const { data: post, error } = await supabase
    .from("posts")
    .select(
      `
      *,
      profiles:author_id (
        full_name
      )
    `,
    )
    .eq("id", id)
    .single()

  if (error) {
    console.error("[v0] Error fetching post:", error)
    return null
  }

  return post
}

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  return <PostEditor post={post} />
}
