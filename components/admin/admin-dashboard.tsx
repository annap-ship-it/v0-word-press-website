"use client"

import { Card } from "@/components/ui/card"
import { FileText, ImageIcon, Users, Layout } from "lucide-react"
import Link from "next/link"

interface DashboardProps {
  stats: {
    totalPosts: number
    publishedPosts: number
    draftPosts: number
    totalPages: number
    totalMedia: number
    totalUsers: number
  }
  recentPosts: Array<{
    id: string
    title: string
    created_at: string
    status: string
  }>
}

export function AdminDashboard({ stats, recentPosts }: DashboardProps) {
  const statCards = [
    {
      icon: FileText,
      label: "Posts",
      value: stats.totalPosts.toString(),
      sublabel: `${stats.publishedPosts} published, ${stats.draftPosts} drafts`,
      color: "bg-[#2271b1]",
      link: "/admin/posts",
    },
    {
      icon: Layout,
      label: "Pages",
      value: stats.totalPages.toString(),
      sublabel: "Site pages",
      color: "bg-[#00a32a]",
      link: "/admin/pages",
    },
    {
      icon: ImageIcon,
      label: "Media",
      value: stats.totalMedia.toString(),
      sublabel: "Uploaded files",
      color: "bg-[#f0c33c]",
      link: "/admin/media",
    },
    {
      icon: Users,
      label: "Users",
      value: stats.totalUsers.toString(),
      sublabel: "Registered users",
      color: "bg-[#826eb4]",
      link: "/admin/users",
    },
  ]

  return (
    <div className="p-6 max-w-[1400px]">
      <div className="mb-6">
        <h1 className="text-2xl font-normal text-[#1d2327] dark:text-[#f0f0f1]">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.label} href={stat.link}>
              <Card className="bg-white dark:bg-[#2c3338] border border-[#c3c4c7] dark:border-[#3c434a] p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`${stat.color} p-3 rounded`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-[#1d2327] dark:text-[#f0f0f1]">{stat.value}</div>
                    <div className="text-sm text-[#646970] dark:text-[#a7aaad]">{stat.label}</div>
                    <div className="text-xs text-[#646970] dark:text-[#a7aaad] mt-1">{stat.sublabel}</div>
                  </div>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-[#2c3338] border border-[#c3c4c7] dark:border-[#3c434a]">
          <div className="border-b border-[#c3c4c7] dark:border-[#3c434a] px-4 py-3">
            <h2 className="text-sm font-semibold text-[#1d2327] dark:text-[#f0f0f1]">Recent Posts</h2>
          </div>
          <div className="divide-y divide-[#c3c4c7] dark:divide-[#3c434a]">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <Link key={post.id} href={`/admin/posts/${post.id}/edit`}>
                  <div className="px-4 py-3 hover:bg-[#f6f7f7] dark:hover:bg-[#1d2327] cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-[#2271b1] dark:text-[#72aee6]">{post.title}</div>
                        <div className="text-xs text-[#646970] dark:text-[#a7aaad] mt-1">
                          {new Date(post.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          post.status === "published" ? "bg-[#00a32a] text-white" : "bg-[#dba617] text-white"
                        }`}
                      >
                        {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-[#646970] dark:text-[#a7aaad]">
                No posts yet.{" "}
                <Link href="/admin/posts/new" className="text-[#2271b1] dark:text-[#72aee6] hover:underline">
                  Create your first post
                </Link>
              </div>
            )}
          </div>
        </Card>

        {/* Quick Links */}
        <Card className="bg-white dark:bg-[#2c3338] border border-[#c3c4c7] dark:border-[#3c434a]">
          <div className="border-b border-[#c3c4c7] dark:border-[#3c434a] px-4 py-3">
            <h2 className="text-sm font-semibold text-[#1d2327] dark:text-[#f0f0f1]">Quick Actions</h2>
          </div>
          <div className="p-4 space-y-3">
            <Link
              href="/admin/posts/new"
              className="block px-4 py-3 bg-[#2271b1] hover:bg-[#135e96] text-white rounded text-center font-medium"
            >
              Create New Post
            </Link>
            <Link
              href="/admin/pages/new"
              className="block px-4 py-3 bg-[#00a32a] hover:bg-[#008a20] text-white rounded text-center font-medium"
            >
              Create New Page
            </Link>
            <Link
              href="/admin/media"
              className="block px-4 py-3 bg-[#f0c33c] hover:bg-[#dba617] text-white rounded text-center font-medium"
            >
              Upload Media
            </Link>
            <Link
              href="/admin/users"
              className="block px-4 py-3 bg-[#826eb4] hover:bg-[#6c5ca0] text-white rounded text-center font-medium"
            >
              Manage Users
            </Link>
          </div>
        </Card>
      </div>

      <Card className="bg-white dark:bg-[#2c3338] border border-[#c3c4c7] dark:border-[#3c434a] mt-6">
        <div className="border-b border-[#c3c4c7] dark:border-[#3c434a] px-4 py-3">
          <h2 className="text-sm font-semibold text-[#1d2327] dark:text-[#f0f0f1]">At a Glance</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-[#646970] dark:text-[#a7aaad]">
              <span className="font-semibold text-[#2271b1] dark:text-[#72aee6]">{stats.totalPosts}</span> Posts
            </div>
            <div className="text-[#646970] dark:text-[#a7aaad]">
              <span className="font-semibold text-[#2271b1] dark:text-[#72aee6]">{stats.totalPages}</span> Pages
            </div>
            <div className="text-[#646970] dark:text-[#a7aaad]">
              <span className="font-semibold text-[#2271b1] dark:text-[#72aee6]">{stats.totalMedia}</span> Media Files
            </div>
            <div className="text-[#646970] dark:text-[#a7aaad]">
              <span className="font-semibold text-[#2271b1] dark:text-[#72aee6]">{stats.totalUsers}</span> Users
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[#c3c4c7] dark:border-[#3c434a] text-sm text-[#646970] dark:text-[#a7aaad]">
            <span className="font-semibold text-[#00a32a]">{stats.publishedPosts}</span> Published Posts,{" "}
            <span className="font-semibold text-[#dba617]">{stats.draftPosts}</span> Drafts
          </div>
        </div>
      </Card>
    </div>
  )
}
