import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import MediaLibrary from "@/components/admin/media-library"

export default async function MediaPage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Media Library</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Upload and manage your media files</p>
      </div>

      <MediaLibrary />
    </div>
  )
}
