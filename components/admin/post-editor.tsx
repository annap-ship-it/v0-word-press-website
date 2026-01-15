"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GutenbergBlockEditor, type GutenbergBlock } from "./gutenberg-blocks"
import { MediaPickerDialog } from "./media-picker-dialog"

interface PostEditorProps {
  post?: any
}

export function PostEditor({ post }: PostEditorProps) {
  const router = useRouter()
  const [supabase, setSupabase] = useState<any>(null)
  const [isClient, setIsClient] = useState(false) // track if component is mounted on client
  const [title, setTitle] = useState(post?.title || "")
  const [slug, setSlug] = useState(post?.slug || "")
  const [excerpt, setExcerpt] = useState(post?.excerpt || "")
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image || "")
  const [categoryId, setCategoryId] = useState(post?.category_id || "")
  const [status, setStatus] = useState(post?.status || "draft")
  const [metaTitle, setMetaTitle] = useState(post?.meta_title || "")
  const [metaDescription, setMetaDescription] = useState(post?.meta_description || "")
  const [gutenbergBlocks, setGutenbergBlocks] = useState<GutenbergBlock[]>(
    (post?.content && Array.isArray(post.content) ? post.content : []) || [],
  )
  const [saving, setSaving] = useState(false)
  const [locale, setLocale] = useState<"en" | "uk">((post?.locale as "en" | "uk") || "en")

  const [categories, setCategories] = useState<any[]>([])
  const [showMediaPicker, setShowMediaPicker] = useState(false)

  useEffect(() => {
    setIsClient(true) // mark component as client-side mounted
    setSupabase(createBrowserClient())
  }, [])

  useEffect(() => {
    if (supabase) {
      loadCategories()
    }
  }, [supabase])

  const loadCategories = async () => {
    if (!supabase) return
    const { data } = await supabase.from("categories").select("*").order("name")

    if (data) setCategories(data)
  }

  useEffect(() => {
    if (!post && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
      setSlug(generatedSlug)
    }
  }, [title, post])

  const handleSave = async (publishStatus: "draft" | "published") => {
    if (!title.trim()) {
      alert("Please enter a title")
      return
    }

    if (!supabase) {
      console.error("[v0] Supabase not initialized")
      alert("System not ready. Please refresh the page.")
      return
    }

    setSaving(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert("You must be logged in to save posts")
      setSaving(false)
      return
    }

    console.log("[v0] Saving post with category_id:", categoryId)

    const postData = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      excerpt: excerpt || "",
      content: gutenbergBlocks && gutenbergBlocks.length > 0 ? gutenbergBlocks : [],
      featured_image: featuredImage && featuredImage.trim() ? featuredImage : null,
      category_id: categoryId && categoryId.trim() ? categoryId : null,
      status: publishStatus,
      author_id: user.id,
      meta_title: metaTitle && metaTitle.trim() ? metaTitle : title,
      meta_description: metaDescription && metaDescription.trim() ? metaDescription : excerpt || "",
      locale, // Save the selected locale (en or uk)
    }

    console.log("[v0] Post data being saved:", postData)

    let error

    try {
      if (post) {
        const result = await supabase.from("posts").update(postData).eq("id", post.id)
        error = result.error
        console.log("[v0] Update result:", result)
      } else {
        const result = await supabase.from("posts").insert([postData])
        error = result.error
        console.log("[v0] Insert result:", result)
      }

      setSaving(false)

      if (error) {
        console.error("[v0] Error saving post:", error)
        alert("Failed to save post: " + error.message)
      } else {
        router.push("/admin/posts")
        router.refresh()
      }
    } catch (err: any) {
      console.error("[v0] Exception while saving:", err)
      setSaving(false)
      alert("Error saving post: " + (err?.message || "Unknown error"))
    }
  }

  if (!isClient || !supabase) {
    return (
      <div className="min-h-screen bg-[#f0f0f1] dark:bg-[#1d2327] p-6 flex items-center justify-center">
        <div className="text-[#1d2327] dark:text-[#f0f0f1]">Loading editor...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0f0f1] dark:bg-[#1d2327] p-6">
      <div className="max-w-[900px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-normal text-[#1d2327] dark:text-[#f0f0f1]">
            {post ? "Edit Post" : "Add New Post"}
          </h1>
          <div className="flex gap-3">
            <Button
              onClick={() => handleSave("draft")}
              disabled={saving}
              variant="outline"
              className="rounded-[4px] bg-transparent"
            >
              Save Draft
            </Button>
            <Button
              onClick={() => handleSave("published")}
              disabled={saving}
              className="bg-[#2271b1] hover:bg-[#135e96] rounded-[4px]"
            >
              {saving ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>

        <Card className="p-6 bg-white dark:bg-[#1d2327] border-[#c3c4c7] dark:border-[#3c434a] rounded-[4px] mb-6">
          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="title" className="text-[#1d2327] dark:text-[#f0f0f1] mb-2 block">
                Post Title
              </Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                className="text-2xl font-semibold h-auto py-3 border-[#8c8f94] dark:border-[#3c434a] rounded-[4px]"
              />
            </div>

            <div>
              <Label htmlFor="slug" className="text-sm text-gray-600 dark:text-gray-400">
                Permalink
              </Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="post-url-slug"
                className="rounded-[4px]"
              />
            </div>
          </div>

          <GutenbergBlockEditor blocks={gutenbergBlocks} onChange={setGutenbergBlocks} />
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-white dark:bg-[#1d2327] border-[#c3c4c7] dark:border-[#3c434a] rounded-[4px]">
              <h3 className="text-lg font-semibold mb-4 text-[#1d2327] dark:text-[#f0f0f1]">Post Excerpt</h3>
              <Textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Write a short excerpt..."
                rows={4}
                className="rounded-[4px]"
              />
            </Card>

            <Card className="p-6 bg-white dark:bg-[#1d2327] border-[#c3c4c7] dark:border-[#3c434a] rounded-[4px]">
              <h3 className="text-lg font-semibold mb-4 text-[#1d2327] dark:text-[#f0f0f1]">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input
                    id="meta-title"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="SEO meta title"
                    className="rounded-[4px]"
                  />
                </div>
                <div>
                  <Label htmlFor="meta-desc">Meta Description</Label>
                  <Textarea
                    id="meta-desc"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="SEO meta description"
                    rows={3}
                    className="rounded-[4px]"
                  />
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-white dark:bg-[#1d2327] border-[#c3c4c7] dark:border-[#3c434a] rounded-[4px]">
              <h3 className="text-lg font-semibold mb-4 text-[#1d2327] dark:text-[#f0f0f1]">Language</h3>
              <Select value={locale} onValueChange={(value) => setLocale(value as "en" | "uk")}>
                <SelectTrigger className="rounded-[4px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="uk">Українська</SelectItem>
                </SelectContent>
              </Select>
            </Card>

            <Card className="p-6 bg-white dark:bg-[#1d2327] border-[#c3c4c7] dark:border-[#3c434a] rounded-[4px]">
              <h3 className="text-lg font-semibold mb-4 text-[#1d2327] dark:text-[#f0f0f1]">Featured Image</h3>
              <div className="flex gap-2 mb-3">
                <Input
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="Image URL"
                  className="rounded-[4px] flex-1"
                />
                <Button
                  type="button"
                  onClick={() => setShowMediaPicker(true)}
                  variant="outline"
                  size="sm"
                  className="rounded-[4px]"
                >
                  Library
                </Button>
              </div>
              {featuredImage && (
                <div className="mt-3 rounded-[4px] overflow-hidden border border-gray-200">
                  <img src={featuredImage || "/placeholder.svg"} alt="Featured" className="w-full h-auto" />
                </div>
              )}
            </Card>

            <Card className="p-6 bg-white dark:bg-[#1d2327] border-[#c3c4c7] dark:border-[#3c434a] rounded-[4px]">
              <h3 className="text-lg font-semibold mb-4 text-[#1d2327] dark:text-[#f0f0f1]">Category</h3>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="rounded-[4px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Card>
          </div>
        </div>
      </div>

      <MediaPickerDialog
        open={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelect={(url) => {
          setFeaturedImage(url)
          setShowMediaPicker(false)
        }}
      />
    </div>
  )
}
