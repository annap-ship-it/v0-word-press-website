import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { PageEditor } from "@/components/admin/page-editor"

export default async function EditPagePage({ params }: { params: { id: string } }) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  const { data: page } = await supabase.from("pages").select("*").eq("id", params.id).single()

  if (!page) {
    redirect("/admin/pages")
  }

  return <PageEditor page={page} />
}
