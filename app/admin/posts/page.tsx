import { PostsTable } from "@/components/admin/posts-table"

export default function PostsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-normal text-[#1d2327] dark:text-[#f0f0f1]">Posts</h1>
        <button className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white rounded text-sm">Add New</button>
      </div>
      <PostsTable />
    </div>
  )
}
