import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ThemeEditor } from "@/components/admin/theme-editor"

export default async function AppearancePage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return <ThemeEditor />
}
