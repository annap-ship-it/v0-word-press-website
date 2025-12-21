"use client"

import { Card } from "@/components/ui/card"
import { FileText, MessageSquare, Users } from "lucide-react"

const stats = [
  { icon: FileText, label: "Posts", value: "42", color: "bg-[#2271b1]" },
  { icon: FileText, label: "Pages", value: "12", color: "bg-[#00a32a]" },
  { icon: MessageSquare, label: "Comments", value: "156", color: "bg-[#f0c33c]" },
  { icon: Users, label: "Users", value: "8", color: "bg-[#826eb4]" },
]

const recentPosts = [
  { title: "Welcome to WordPress", date: "2024-01-15", status: "Published" },
  { title: "Getting Started Guide", date: "2024-01-14", status: "Published" },
  { title: "About Our Company", date: "2024-01-13", status: "Draft" },
]

export function AdminDashboard() {
  return (
    <div className="p-6 max-w-[1400px]">
      {/* Dashboard Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-normal text-[#1d2327] dark:text-[#f0f0f1]">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.label}
              className="bg-white dark:bg-[#2c3338] border border-[#c3c4c7] dark:border-[#3c434a] p-4"
            >
              <div className="flex items-center gap-3">
                <div className={`${stat.color} p-3 rounded`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-semibold text-[#1d2327] dark:text-[#f0f0f1]">{stat.value}</div>
                  <div className="text-sm text-[#646970] dark:text-[#a7aaad]">{stat.label}</div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <Card className="bg-white dark:bg-[#2c3338] border border-[#c3c4c7] dark:border-[#3c434a]">
          <div className="border-b border-[#c3c4c7] dark:border-[#3c434a] px-4 py-3">
            <h2 className="text-sm font-semibold text-[#1d2327] dark:text-[#f0f0f1]">Recent Posts</h2>
          </div>
          <div className="divide-y divide-[#c3c4c7] dark:divide-[#3c434a]">
            {recentPosts.map((post) => (
              <div key={post.title} className="px-4 py-3 hover:bg-[#f6f7f7] dark:hover:bg-[#1d2327] cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#2271b1] dark:text-[#72aee6]">{post.title}</div>
                    <div className="text-xs text-[#646970] dark:text-[#a7aaad] mt-1">{post.date}</div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      post.status === "Published" ? "bg-[#00a32a] text-white" : "bg-[#dba617] text-white"
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Draft */}
        <Card className="bg-white dark:bg-[#2c3338] border border-[#c3c4c7] dark:border-[#3c434a]">
          <div className="border-b border-[#c3c4c7] dark:border-[#3c434a] px-4 py-3">
            <h2 className="text-sm font-semibold text-[#1d2327] dark:text-[#f0f0f1]">Quick Draft</h2>
          </div>
          <div className="p-4">
            <input
              type="text"
              placeholder="Title"
              className="w-full px-3 py-2 border border-[#8c8f94] dark:border-[#3c434a] rounded mb-3 bg-white dark:bg-[#1d2327] text-[#1d2327] dark:text-[#f0f0f1]"
            />
            <textarea
              placeholder="What's on your mind?"
              rows={5}
              className="w-full px-3 py-2 border border-[#8c8f94] dark:border-[#3c434a] rounded mb-3 bg-white dark:bg-[#1d2327] text-[#1d2327] dark:text-[#f0f0f1] resize-none"
            />
            <button className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white rounded text-sm">Save Draft</button>
          </div>
        </Card>
      </div>

      {/* At a Glance */}
      <Card className="bg-white dark:bg-[#2c3338] border border-[#c3c4c7] dark:border-[#3c434a] mt-6">
        <div className="border-b border-[#c3c4c7] dark:border-[#3c434a] px-4 py-3">
          <h2 className="text-sm font-semibold text-[#1d2327] dark:text-[#f0f0f1]">At a Glance</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-[#646970] dark:text-[#a7aaad]">
              <span className="font-semibold text-[#2271b1] dark:text-[#72aee6]">42</span> Posts
            </div>
            <div className="text-[#646970] dark:text-[#a7aaad]">
              <span className="font-semibold text-[#2271b1] dark:text-[#72aee6]">12</span> Pages
            </div>
            <div className="text-[#646970] dark:text-[#a7aaad]">
              <span className="font-semibold text-[#2271b1] dark:text-[#72aee6]">156</span> Comments
            </div>
            <div className="text-[#646970] dark:text-[#a7aaad]">
              <span className="font-semibold text-[#2271b1] dark:text-[#72aee6]">8</span> Users
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
