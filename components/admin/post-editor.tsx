"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { GutenbergBlockEditor, type GutenbergBlock } from "./gutenberg-blocks"

interface PostEditorProps {
  post?: any
}

export function PostEditor({ post }: PostEditorProps) {
  const router = useRouter()
  const [title, setTitle] = useState(post?.title || "")
  const [slug, setSlug] = useState(post?.slug || "")
  const [excerpt, setExcerpt] = useState(post?.excerpt || "")
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image || "")
  const [category, setCategory] = useState(post?.category || "")
  const [status, setStatus] = useState(post?.status || "draft")
  const [isFeatured, setIsFeatured] = useState(post?.is_featured || false)
  const [metaTitle, setMetaTitle] = useState(post?.meta_title || "")
  const [metaDescription, setMetaDescription] = useState(post?.meta_description || "")
  const [gutenbergBlocks, setGutenbergBlocks] = useState<GutenbergBlock[]>(post?.content || [])
  const [saving, setSaving] = useState(false)

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

    setSaving(true)
    const supabase = createBrowserClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert("You must be logged in to save posts")
      setSaving(false)
      return
    }

    const postData = {
      title,
      slug,
      excerpt,
      content: gutenbergBlocks,
      featured_image: featuredImage || null,
      category: category || null,
      status: publishStatus,
      is_featured: isFeatured,
      author_id: user.id,
      meta_title: metaTitle || title,
      meta_description: metaDescription || excerpt,
    }

    let error

    if (post) {
      const result = await supabase.from("posts").update(postData).eq("id", post.id)
      error = result.error
    } else {
      const result = await supabase.from("posts").insert([postData])
      error = result.error
    }

    setSaving(false)

    if (error) {
      console.error("Error saving post:", error)
      alert("Failed to save post: " + error.message)
    } else {
      router.push("/admin/posts")
      router.refresh()
    }
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
              className="rounded bg-transparent"
            >
              Save Draft
            </Button>
            <Button
              onClick={() => handleSave("published")}
              disabled={saving}
              className="bg-[#2271b1] hover:bg-[#135e96] rounded"
            >
              {saving ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>

        <Card className="p-6 bg-white dark:bg-[#1d2327] border-[#c3c4c7] dark:border-[#3c434a] rounded mb-6">
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
                className="text-2xl font-semibold h-auto py-3 border-[#8c8f94] dark:border-[#3c434a] rounded"
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
                className="rounded"
              />
            </div>
          </div>

          <GutenbergBlockEditor blocks={gutenbergBlocks} onChange={setGutenbergBlocks} />
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-white dark:bg-[#1d2327] border-[#c3c4c7] dark:border-[#3c434a] rounded">
              <h3 className="text-lg font-semibold mb-4 text-[#1d2327] dark:text-[#f0f0f1]">Post Excerpt</h3>
              <Textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Write a short excerpt..."
                rows={4}
                className="rounded"
              />
            </Card>

            <Card className="p-6 bg-white dark:bg-[#1d2327] border-[#c3c4c7] dark:border-[#3c434a] rounded">
              <h3 className="text-lg font-semibold mb-4 text-[#1d2327] dark:text-[#f0f0f1]">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input
                    id="meta-title"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="SEO meta title"
                    className="rounded"
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
                    className="rounded"
                  />
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-white dark:bg-[#1d2327] border-[#c3c4c7] dark:border-[#3c434a] rounded">
              <h3 className="text-lg font-semibold mb-4 text-[#1d2327] dark:text-[#f0f0f1]">Featured Image</h3>
              <Input
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="Image URL"
                className="rounded mb-3"
              />
              {featuredImage && (
                <div className="mt-3 rounded overflow-hidden border border-gray-200">
                  <img src={featuredImage || "/placeholder.svg"} alt="Featured" className="w-full h-auto" />
                </div>
              )}
            </Card>

            <Card className="p-6 bg-white dark:bg-[#1d2327] border-[#c3c4c7] dark:border-[#3c434a] rounded">
              <h3 className="text-lg font-semibold mb-4 text-[#1d2327] dark:text-[#f0f0f1]">Category</h3>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category name"
                className="rounded"
              />
            </Card>

            <Card className="p-6 bg-white dark:bg-[#1d2327] border-[#c3c4c7] dark:border-[#3c434a] rounded">
              <div className="flex items-center space-x-2">
                <Checkbox id="featured" checked={isFeatured} onCheckedChange={(checked) => setIsFeatured(!!checked)} />
                <Label htmlFor="featured" className="text-sm font-normal cursor-pointer">
                  Mark as featured post
                </Label>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
