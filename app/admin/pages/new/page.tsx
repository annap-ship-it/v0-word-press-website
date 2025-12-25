import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { PageEditor } from "@/components/admin/page-editor"

export default async function NewPagePage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return <PageEditor />
}
