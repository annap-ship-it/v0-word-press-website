"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, MoveUp, MoveDown, Type, Heading2, List, ImageIcon } from "lucide-react"

interface Block {
  id: string
  type: "paragraph" | "heading" | "list" | "image"
  content: string
  level?: number
  listType?: "ul" | "ol"
  items?: string[]
}

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
  const [blocks, setBlocks] = useState<Block[]>(
    post?.content || [
      {
        id: crypto.randomUUID(),
        type: "paragraph",
        content: "",
      },
    ],
  )
  const [saving, setSaving] = useState(false)

  // Auto-generate slug from title
  useEffect(() => {
    if (!post && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
      setSlug(generatedSlug)
    }
  }, [title, post])

  const addBlock = (type: Block["type"]) => {
    const newBlock: Block = {
      id: crypto.randomUUID(),
      type,
      content: "",
    }

    if (type === "heading") {
      newBlock.level = 2
    } else if (type === "list") {
      newBlock.listType = "ul"
      newBlock.items = [""]
    }

    setBlocks([...blocks, newBlock])
  }

  const updateBlock = (id: string, updates: Partial<Block>) => {
    setBlocks(blocks.map((block) => (block.id === id ? { ...block, ...updates } : block)))
  }

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id))
  }

  const moveBlock = (id: string, direction: "up" | "down") => {
    const index = blocks.findIndex((block) => block.id === id)
    if (index === -1) return

    if (direction === "up" && index > 0) {
      const newBlocks = [...blocks]
      ;[newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]]
      setBlocks(newBlocks)
    } else if (direction === "down" && index < blocks.length - 1) {
      const newBlocks = [...blocks]
      ;[newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]]
      setBlocks(newBlocks)
    }
  }

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
      content: blocks,
      featured_image: featuredImage || null,
      category: category || null,
      status: publishStatus,
      is_featured: isFeatured,
      author_id: user.id,
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
      console.error("[v0] Error saving post:", error)
      alert("Failed to save post: " + error.message)
    } else {
      router.push("/admin/posts")
      router.refresh()
    }
  }

  const renderBlock = (block: Block, index: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <textarea
            value={block.content}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            placeholder="Start writing..."
            className="w-full min-h-[100px] px-4 py-3 border border-[#8c8f94] dark:border-[#3c434a] rounded bg-white dark:bg-[#1d2327] text-[#1d2327] dark:text-[#f0f0f1] resize-none focus:outline-none focus:ring-2 focus:ring-[#2271b1]"
          />
        )

      case "heading":
        return (
          <div>
            <select
              value={block.level}
              onChange={(e) => updateBlock(block.id, { level: Number(e.target.value) })}
              className="mb-2 px-3 py-1 border border-[#8c8f94] dark:border-[#3c434a] rounded bg-white dark:bg-[#1d2327] text-[#1d2327] dark:text-[#f0f0f1]"
            >
              <option value={2}>H2</option>
              <option value={3}>H3</option>
              <option value={4}>H4</option>
              <option value={5}>H5</option>
              <option value={6}>H6</option>
            </select>
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              placeholder="Heading text..."
              className="w-full px-4 py-3 border border-[#8c8f94] dark:border-[#3c434a] rounded bg-white dark:bg-[#1d2327] text-[#1d2327] dark:text-[#f0f0f1] text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-[#2271b1]"
            />
          </div>
        )

      case "list":
        return (
          <div>
            <select
              value={block.listType}
              onChange={(e) => updateBlock(block.id, { listType: e.target.value as "ul" | "ol" })}
              className="mb-2 px-3 py-1 border border-[#8c8f94] dark:border-[#3c434a] rounded bg-white dark:bg-[#1d2327] text-[#1d2327] dark:text-[#f0f0f1]"
            >
              <option value="ul">Unordered List</option>
              <option value="ol">Ordered List</option>
            </select>
            <div className="space-y-2">
              {(block.items || [""]).map((item, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-[#646970] dark:text-[#a7aaad] mt-3">
                    {block.listType === "ol" ? `${i + 1}.` : "•"}
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newItems = [...(block.items || [])]
                      newItems[i] = e.target.value
                      updateBlock(block.id, { items: newItems })
                    }}
                    placeholder="List item..."
                    className="flex-1 px-4 py-2 border border-[#8c8f94] dark:border-[#3c434a] rounded bg-white dark:bg-[#1d2327] text-[#1d2327] dark:text-[#f0f0f1] focus:outline-none focus:ring-2 focus:ring-[#2271b1]"
                  />
                  <button
                    onClick={() => {
                      const newItems = (block.items || []).filter((_, index) => index !== i)
                      updateBlock(block.id, { items: newItems.length ? newItems : [""] })
                    }}
                    className="px-3 py-2 text-[#a00] hover:text-[#dc3232]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newItems = [...(block.items || []), ""]
                  updateBlock(block.id, { items: newItems })
                }}
                className="text-sm text-[#2271b1] dark:text-[#72aee6] hover:underline"
              >
                + Add item
              </button>
            </div>
          </div>
        )

      case "image":
        return (
          <div>
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              placeholder="Image URL..."
              className="w-full px-4 py-3 border border-[#8c8f94] dark:border-[#3c434a] rounded bg-white dark:bg-[#1d2327] text-[#1d2327] dark:text-[#f0f0f1] focus:outline-none focus:ring-2 focus:ring-[#2271b1]"
            />
            {block.content && (
              <div className="mt-3">
                <img src={block.content || "/placeholder.svg"} alt="Preview" className="max-w-full h-auto rounded" />
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f0f1] dark:bg-[#1d2327] p-6">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-normal text-[#1d2327] dark:text-[#f0f0f1]">
            {post ? "Edit Post" : "Add New Post"}
          </h1>
          <div className="flex gap-2">
            <Button
              onClick={() => handleSave("draft")}
              disabled={saving}
              variant="outline"
              className="bg-white dark:bg-[#2c3338] border-[#8c8f94] dark:border-[#3c434a] text-[#2271b1] dark:text-[#72aee6]"
            >
              {saving ? "Saving..." : "Save Draft"}
            </Button>
            <Button
              onClick={() => handleSave("published")}
              disabled={saving}
              className="bg-[#2271b1] hover:bg-[#135e96] text-white"
            >
              {saving ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>

        {/* Main Editor */}
        <Card className="bg-white dark:bg-[#2c3338] border border-[#c3c4c7] dark:border-[#3c434a] p-6 mb-6">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add title"
            className="w-full text-4xl font-bold mb-4 px-0 py-2 border-none bg-transparent text-[#1d2327] dark:text-[#f0f0f1] focus:outline-none placeholder:text-[#646970] dark:placeholder:text-[#a7aaad]"
          />

          {/* Slug */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1d2327] dark:text-[#f0f0f1] mb-2">Slug (URL)</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="post-slug"
              className="w-full px-4 py-2 border border-[#8c8f94] dark:border-[#3c434a] rounded bg-white dark:bg-[#1d2327] text-[#1d2327] dark:text-[#f0f0f1] focus:outline-none focus:ring-2 focus:ring-[#2271b1]"
            />
          </div>

          {/* Content Blocks */}
          <div className="space-y-4 mb-6">
            {blocks.map((block, index) => (
              <div key={block.id} className="relative group">
                <div className="bg-[#f6f7f7] dark:bg-[#1d2327] border border-[#c3c4c7] dark:border-[#3c434a] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-[#646970] dark:text-[#a7aaad] uppercase">
                      {block.type === "paragraph" && "Paragraph"}
                      {block.type === "heading" && "Heading"}
                      {block.type === "list" && "List"}
                      {block.type === "image" && "Image"}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => moveBlock(block.id, "up")}
                        disabled={index === 0}
                        className="p-1 hover:bg-[#e0e0e0] dark:hover:bg-[#2c3338] rounded disabled:opacity-30"
                        title="Move up"
                      >
                        <MoveUp className="w-4 h-4 text-[#646970] dark:text-[#a7aaad]" />
                      </button>
                      <button
                        onClick={() => moveBlock(block.id, "down")}
                        disabled={index === blocks.length - 1}
                        className="p-1 hover:bg-[#e0e0e0] dark:hover:bg-[#2c3338] rounded disabled:opacity-30"
                        title="Move down"
                      >
                        <MoveDown className="w-4 h-4 text-[#646970] dark:text-[#a7aaad]" />
                      </button>
                      <button
                        onClick={() => deleteBlock(block.id)}
                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-[#a00]" />
                      </button>
                    </div>
                  </div>
                  {renderBlock(block, index)}
                </div>
              </div>
            ))}
          </div>

          {/* Add Block Buttons */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => addBlock("paragraph")}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1d2327] border border-[#8c8f94] dark:border-[#3c434a] rounded text-[#1d2327] dark:text-[#f0f0f1] hover:bg-[#f6f7f7] dark:hover:bg-[#2c3338] text-sm"
            >
              <Type className="w-4 h-4" />
              Paragraph
            </button>
            <button
              onClick={() => addBlock("heading")}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1d2327] border border-[#8c8f94] dark:border-[#3c434a] rounded text-[#1d2327] dark:text-[#f0f0f1] hover:bg-[#f6f7f7] dark:hover:bg-[#2c3338] text-sm"
            >
              <Heading2 className="w-4 h-4" />
              Heading
            </button>
            <button
              onClick={() => addBlock("list")}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1d2327] border border-[#8c8f94] dark:border-[#3c434a] rounded text-[#1d2327] dark:text-[#f0f0f1] hover:bg-[#f6f7f7] dark:hover:bg-[#2c3338] text-sm"
            >
              <List className="w-4 h-4" />
              List
            </button>
            <button
              onClick={() => addBlock("image")}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1d2327] border border-[#8c8f94] dark:border-[#3c434a] rounded text-[#1d2327] dark:text-[#f0f0f1] hover:bg-[#f6f7f7] dark:hover:bg-[#2c3338] text-sm"
            >
              <ImageIcon className="w-4 h-4" />
              Image
            </button>
          </div>
        </Card>

        {/* Sidebar Settings */}
        <Card className="bg-white dark:bg-[#2c3338] border border-[#c3c4c7] dark:border-[#3c434a] p-6">
          <h3 className="text-lg font-semibold text-[#1d2327] dark:text-[#f0f0f1] mb-4">Post Settings</h3>

          {/* Excerpt */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#1d2327] dark:text-[#f0f0f1] mb-2">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short description..."
              rows={3}
              className="w-full px-4 py-2 border border-[#8c8f94] dark:border-[#3c434a] rounded bg-white dark:bg-[#1d2327] text-[#1d2327] dark:text-[#f0f0f1] resize-none focus:outline-none focus:ring-2 focus:ring-[#2271b1]"
            />
          </div>

          {/* Featured Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#1d2327] dark:text-[#f0f0f1] mb-2">Featured Image</label>
            <input
              type="text"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="Image URL..."
              className="w-full px-4 py-2 border border-[#8c8f94] dark:border-[#3c434a] rounded bg-white dark:bg-[#1d2327] text-[#1d2327] dark:text-[#f0f0f1] focus:outline-none focus:ring-2 focus:ring-[#2271b1]"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#1d2327] dark:text-[#f0f0f1] mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-[#8c8f94] dark:border-[#3c434a] rounded bg-white dark:bg-[#1d2327] text-[#1d2327] dark:text-[#f0f0f1] focus:outline-none focus:ring-2 focus:ring-[#2271b1]"
            >
              <option value="">Select category</option>
              <option value="Automation">Automation</option>
              <option value="New">New</option>
              <option value="Most Readed">Most Readed</option>
            </select>
          </div>

          {/* Featured Post */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is-featured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="is-featured" className="text-sm text-[#1d2327] dark:text-[#f0f0f1]">
              Featured Post
            </label>
          </div>
        </Card>
      </div>
    </div>
  )
}
