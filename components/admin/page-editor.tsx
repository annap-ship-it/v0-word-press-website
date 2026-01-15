"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GutenbergBlockEditor, type GutenbergBlock } from "./gutenberg-blocks"

interface PageEditorProps {
  page?: any
}

export function PageEditor({ page }: PageEditorProps) {
  const router = useRouter()
  const [supabase, setSupabase] = useState<any>(null)
  const [title, setTitle] = useState(page?.title || "")
  const [slug, setSlug] = useState(page?.slug || "")
  const [status, setStatus] = useState(page?.status || "draft")
  const [metaTitle, setMetaTitle] = useState(page?.meta_title || "")
  const [metaDescription, setMetaDescription] = useState(page?.meta_description || "")
  const [redirectUrl, setRedirectUrl] = useState(page?.redirect_url || "")
  const [metafields, setMetafields] = useState<Record<string, string>>(page?.metafields || {})
  const [gutenbergBlocks, setGutenbergBlocks] = useState<GutenbergBlock[]>(() => {
    if (!page?.content) return []
    if (typeof page.content === "string") {
      try {
        return JSON.parse(page.content)
      } catch {
        return []
      }
    }
    return Array.isArray(page.content) ? page.content : []
  })
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    setSupabase(createBrowserClient())
  }, [])

  const handleSave = async () => {
    if (!title.trim()) {
      setErrorMessage("Please enter a page title")
      return
    }

    if (!slug.trim()) {
      setErrorMessage("Please enter a URL slug")
      return
    }

    if (!supabase) {
      setErrorMessage("System not ready. Please refresh the page.")
      return
    }

    setSaving(true)
    setErrorMessage("")
    setSuccessMessage("")

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setErrorMessage("You must be logged in to save pages")
        setSaving(false)
        return
      }

      const pageData = {
        title,
        slug,
        content: gutenbergBlocks,
        status,
        meta_title: metaTitle || title,
        meta_description: metaDescription || "",
        redirect_url: redirectUrl || null,
        metafields,
        updated_at: new Date().toISOString(),
      }

      if (page) {
        const { data, error } = await supabase.from("pages").update(pageData).eq("id", page.id).select()

        if (error) {
          throw error
        }

        setSuccessMessage("Page updated successfully!")
        console.log("[v0] Page updated:", data)
      } else {
        const { data, error } = await supabase
          .from("pages")
          .insert({ ...pageData, author_id: user.id, created_at: new Date().toISOString() })
          .select()

        if (error) {
          throw error
        }

        setSuccessMessage("Page created successfully!")
        console.log("[v0] Page created:", data)

        setTimeout(() => {
          router.refresh()
          router.push("/admin/pages")
        }, 1500)
      }
    } catch (error: any) {
      console.error("[v0] Error saving page:", error)
      setErrorMessage(`Failed to save page: ${error?.message || "Unknown error"}`)
    } finally {
      setSaving(false)
    }
  }

  const addMetafield = () => {
    const key = prompt("Enter metafield key:")
    if (key && !metafields[key]) {
      setMetafields({ ...metafields, [key]: "" })
    }
  }

  if (!supabase) {
    return (
      <div className="min-h-screen bg-[#f0f0f1] dark:bg-[#1d2327] p-6 flex items-center justify-center">
        <div className="text-[#1d2327] dark:text-[#f0f0f1]">Loading editor...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0f0f1] dark:bg-[#1d2327] p-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-normal text-[#1d2327] dark:text-[#f0f0f1]">
            {page ? "Edit Page" : "Add New Page"}
          </h1>
          <div className="flex gap-3 items-center">
            <Select value={status} onValueChange={(value: any) => setStatus(value)}>
              <SelectTrigger className="w-[160px] rounded-[4px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="rounded-[4px]">
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSave} disabled={saving} className="bg-[#2271b1] hover:bg-[#135e96] rounded-[4px]">
              {saving ? "Saving..." : page ? "Update" : "Publish"}
            </Button>
          </div>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-[4px]">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-800 rounded-[4px]">{errorMessage}</div>
        )}

        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="bg-white dark:bg-gray-800 rounded-[4px]">
            <TabsTrigger value="content" className="rounded-[4px]">
              Content
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-[4px]">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <Card className="p-6 bg-white dark:bg-[#1d2327] border-[#c3c4c7] dark:border-[#3c434a] rounded-[4px]">
              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="title" className="text-[#1d2327] dark:text-[#f0f0f1] mb-2 block">
                    Title
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter page title"
                    className="text-2xl font-semibold h-auto py-3 border-[#8c8f94] dark:border-[#3c434a] rounded-[4px]"
                  />
                </div>
              </div>

              <GutenbergBlockEditor blocks={gutenbergBlocks} onChange={setGutenbergBlocks} />
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6 bg-white dark:bg-[#1d2327] border-[#c3c4c7] dark:border-[#3c434a] rounded-[4px]">
              <h3 className="text-lg font-semibold mb-4">Page Settings</h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="page-url-slug"
                    className="rounded-[4px]"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Permalink: {typeof window !== "undefined" ? window.location.origin : ""}/{slug || "page-slug"}
                  </p>
                </div>

                <div>
                  <Label htmlFor="meta-title">Meta Title (SEO)</Label>
                  <Input
                    id="meta-title"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="SEO meta title"
                    className="rounded-[4px]"
                  />
                </div>

                <div>
                  <Label htmlFor="meta-desc">Meta Description (SEO)</Label>
                  <Textarea
                    id="meta-desc"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="SEO meta description"
                    rows={3}
                    className="rounded-[4px]"
                  />
                </div>

                <div>
                  <Label htmlFor="redirect">Redirect URL (Optional)</Label>
                  <Input
                    id="redirect"
                    value={redirectUrl}
                    onChange={(e) => setRedirectUrl(e.target.value)}
                    placeholder="https://example.com/redirect"
                    className="rounded-[4px]"
                  />
                  <p className="text-sm text-gray-500 mt-1">If set, this page will redirect to the specified URL</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white dark:bg-[#1d2327] border-[#c3c4c7] dark:border-[#3c434a] rounded-[4px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Custom Metafields</h3>
                <Button onClick={addMetafield} variant="outline" size="sm" className="rounded-[4px] bg-transparent">
                  Add Metafield
                </Button>
              </div>

              <div className="space-y-3">
                {Object.entries(metafields).map(([key, value]) => (
                  <div key={key} className="flex gap-2 items-start">
                    <div className="flex-1 space-y-1">
                      <Label className="text-sm text-gray-600">{key}</Label>
                      <Input
                        value={value}
                        onChange={(e) => setMetafields({ ...metafields, [key]: e.target.value })}
                        placeholder={`Value for ${key}`}
                        className="rounded-[4px]"
                      />
                    </div>
                    <Button
                      onClick={() => {
                        const newMetafields = { ...metafields }
                        delete newMetafields[key]
                        setMetafields(newMetafields)
                      }}
                      variant="ghost"
                      size="sm"
                      className="mt-6 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-[4px]"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                {Object.keys(metafields).length === 0 && (
                  <p className="text-sm text-gray-500">
                    No custom metafields yet. Click "Add Metafield" to create one.
                  </p>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
