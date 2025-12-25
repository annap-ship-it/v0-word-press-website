import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const [postsResult, pagesResult, mediaResult, usersResult] = await Promise.all([
    supabase.from("posts").select("id, title, created_at, status", { count: "exact" }),
    supabase.from("pages").select("id, title", { count: "exact" }),
    supabase.from("media").select("id", { count: "exact" }),
    supabase.auth.admin.listUsers(),
  ])

  const stats = {
    totalPosts: postsResult.count || 0,
    publishedPosts: postsResult.data?.filter((p) => p.status === "published").length || 0,
    draftPosts: postsResult.data?.filter((p) => p.status === "draft").length || 0,
    totalPages: pagesResult.count || 0,
    totalMedia: mediaResult.count || 0,
    totalUsers: usersResult.data?.users.length || 0,
  }

  const recentPosts = postsResult.data?.slice(0, 5) || []

  return <AdminDashboard stats={stats} recentPosts={recentPosts} />
}
