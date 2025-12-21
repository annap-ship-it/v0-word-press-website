import type React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#f0f0f1] dark:bg-[#1d2327]">
      <AdminSidebar />
      <div className="ml-0 lg:ml-[160px]">
        <AdminHeader />
        <main className="p-0">{children}</main>
      </div>
    </div>
  )
}
