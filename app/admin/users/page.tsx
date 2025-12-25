import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import UsersTable from "@/components/admin/users-table"

export default async function UsersPage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  // Fetch all users with their profiles
  const { data: profiles } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Users</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Manage user accounts and permissions</p>
        </div>
      </div>

      <UsersTable users={profiles || []} />
    </div>
  )
}
