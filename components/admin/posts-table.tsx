"use client"

import { Card } from "@/components/ui/card"

const posts = [
  {
    id: 1,
    title: "Welcome to WordPress",
    author: "Admin",
    categories: "Uncategorized",
    tags: "welcome, intro",
    date: "2024-01-15",
    status: "Published",
  },
  {
    id: 2,
    title: "Getting Started Guide",
    author: "Admin",
    categories: "Tutorials",
    tags: "guide, tutorial",
    date: "2024-01-14",
    status: "Published",
  },
  {
    id: 3,
    title: "About Our Company",
    author: "Editor",
    categories: "About",
    tags: "company, about",
    date: "2024-01-13",
    status: "Draft",
  },
]

export function PostsTable() {
  return (
    <Card className="bg-white dark:bg-[#2c3338] border border-[#c3c4c7] dark:border-[#3c434a]">
      {/* Filters */}
      <div className="border-b border-[#c3c4c7] dark:border-[#3c434a] px-4 py-3">
        <div className="flex items-center gap-4 text-sm">
          <a href="#" className="text-[#2271b1] dark:text-[#72aee6] font-semibold">
            All (45)
          </a>
          <span className="text-[#646970] dark:text-[#a7aaad]">|</span>
          <a href="#" className="text-[#646970] dark:text-[#a7aaad] hover:text-[#2271b1] dark:hover:text-[#72aee6]">
            Published (40)
          </a>
          <span className="text-[#646970] dark:text-[#a7aaad]">|</span>
          <a href="#" className="text-[#646970] dark:text-[#a7aaad] hover:text-[#2271b1] dark:hover:text-[#72aee6]">
            Draft (5)
          </a>
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
              <th className="px-4 py-2 text-left text-xs font-semibold text-[#1d2327] dark:text-[#f0f0f1]">
                Categories
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-[#1d2327] dark:text-[#f0f0f1]">Tags</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-[#1d2327] dark:text-[#f0f0f1]">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c3c4c7] dark:divide-[#3c434a]">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-[#f6f7f7] dark:hover:bg-[#1d2327] group">
                <td className="px-4 py-3">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <a href="#" className="font-medium text-[#2271b1] dark:text-[#72aee6] hover:text-[#135e96]">
                      {post.title}
                    </a>
                    <div className="flex items-center gap-2 mt-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href="#" className="text-[#2271b1] dark:text-[#72aee6]">
                        Edit
                      </a>
                      <span className="text-[#646970] dark:text-[#a7aaad]">|</span>
                      <a href="#" className="text-[#a00]">
                        Trash
                      </a>
                      <span className="text-[#646970] dark:text-[#a7aaad]">|</span>
                      <a href="#" className="text-[#2271b1] dark:text-[#72aee6]">
                        View
                      </a>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-[#646970] dark:text-[#a7aaad]">{post.author}</td>
                <td className="px-4 py-3 text-sm text-[#646970] dark:text-[#a7aaad]">{post.categories}</td>
                <td className="px-4 py-3 text-sm text-[#646970] dark:text-[#a7aaad]">{post.tags}</td>
                <td className="px-4 py-3 text-sm text-[#646970] dark:text-[#a7aaad]">
                  <div className="flex flex-col">
                    <span
                      className={`text-xs px-2 py-0.5 rounded w-fit ${
                        post.status === "Published" ? "bg-[#00a32a] text-white" : "bg-[#dba617] text-white"
                      }`}
                    >
                      {post.status}
                    </span>
                    <span className="mt-1">{post.date}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
