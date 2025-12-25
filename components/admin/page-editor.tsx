"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Trash2,
  MoveUp,
  MoveDown,
  Type,
  Heading2,
  List,
  ImageIcon,
  Table,
  Code,
  Link,
  Bold,
  Italic,
  Layout,
} from "lucide-react"
import { MediaPickerDialog } from "./media-picker-dialog"

interface Block {
  id: string
  type: "paragraph" | "heading" | "list" | "image" | "table" | "html" | "banner"
  content: string
  level?: number
  listType?: "ul" | "ol"
  items?: string[]
  formatting?: {
    bold?: boolean
    italic?: boolean
    fontSize?: string
    link?: string
  }
  tableData?: {
    headers: string[]
    rows: string[][]
  }
}

interface PageEditorProps {
  page?: any
}

export function PageEditor({ page }: PageEditorProps) {
  const router = useRouter()
  const [title, setTitle] = useState(page?.title || "")
  const [slug, setSlug] = useState(page?.slug || "")
  const [metaTitle, setMetaTitle] = useState(page?.meta_title || "")
  const [metaDescription, setMetaDescription] = useState(page?.meta_description || "")
  const [isPublished, setIsPublished] = useState(page?.is_published ?? true)
  const [blocks, setBlocks] = useState<Block[]>(
    page?.content || [
      {
        id: crypto.randomUUID(),
        type: "paragraph",
        content: "",
      },
    ],
  )
  const [saving, setSaving] = useState(false)
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false)
  const [currentBlockId, setCurrentBlockId] = useState<string | null>(null)

  useEffect(() => {
    if (!page && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
      setSlug(generatedSlug)
    }
  }, [title, page])

  const openMediaPicker = (blockId: string) => {
    setCurrentBlockId(blockId)
    setMediaPickerOpen(true)
  }

  const handleMediaSelect = (url: string) => {
    if (currentBlockId) {
      updateBlock(currentBlockId, { content: url })
    }
    setMediaPickerOpen(false)
    setCurrentBlockId(null)
  }

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
    } else if (type === "table") {
      newBlock.tableData = {
        headers: ["Column 1", "Column 2"],
        rows: [["", ""]],
      }
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

  const handleSave = async () => {
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
      alert("You must be logged in to save pages")
      setSaving(false)
      return
    }

    const pageData = {
      title,
      slug,
      content: blocks,
      meta_title: metaTitle || title,
      meta_description: metaDescription,
      is_published: isPublished,
      updated_by: user.id,
    }

    let error

    if (page) {
      const result = await supabase.from("pages").update(pageData).eq("id", page.id)
      error = result.error
    } else {
      const result = await supabase.from("pages").insert([pageData])
      error = result.error
    }

    setSaving(false)

    if (error) {
      console.error("[v0] Error saving page:", error)
      alert("Failed to save page: " + error.message)
    } else {
      router.push("/admin/pages")
      router.refresh()
    }
  }

  const renderBlock = (block: Block, index: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <div>
            <div className="flex gap-2 mb-2">
              <button
                onClick={() =>
                  updateBlock(block.id, {
                    formatting: { ...block.formatting, bold: !block.formatting?.bold },
                  })
                }
                className={`p-2 rounded ${block.formatting?.bold ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
                title="Bold"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  updateBlock(block.id, {
                    formatting: { ...block.formatting, italic: !block.formatting?.italic },
                  })
                }
                className={`p-2 rounded ${block.formatting?.italic ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
                title="Italic"
              >
                <Italic className="w-4 h-4" />
              </button>
              <select
                value={block.formatting?.fontSize || "16"}
                onChange={(e) =>
                  updateBlock(block.id, {
                    formatting: { ...block.formatting, fontSize: e.target.value },
                  })
                }
                className="px-2 py-1 border rounded text-sm"
              >
                <option value="12">12px</option>
                <option value="14">14px</option>
                <option value="16">16px</option>
                <option value="18">18px</option>
                <option value="20">20px</option>
                <option value="24">24px</option>
              </select>
              <button
                onClick={() => {
                  const url = prompt("Enter link URL:")
                  if (url) {
                    updateBlock(block.id, { formatting: { ...block.formatting, link: url } })
                  }
                }}
                className="p-2 rounded hover:bg-gray-100"
                title="Add link"
              >
                <Link className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              placeholder="Start writing..."
              style={{
                fontWeight: block.formatting?.bold ? "bold" : "normal",
                fontStyle: block.formatting?.italic ? "italic" : "normal",
                fontSize: block.formatting?.fontSize ? `${block.formatting.fontSize}px` : "16px",
              }}
              className="w-full min-h-[100px] px-4 py-3 border border-[#8c8f94] dark:border-[#3c434a] rounded bg-white dark:bg-[#1d2327] text-[#1d2327] dark:text-[#f0f0f1] resize-none focus:outline-none focus:ring-2 focus:ring-[#2271b1]"
            />
            {block.formatting?.link && (
              <div className="mt-2 text-sm text-blue-600">
                Link: {block.formatting.link}
                <button
                  onClick={() =>
                    updateBlock(block.id, {
                      formatting: { ...block.formatting, link: undefined },
                    })
                  }
                  className="ml-2 text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        )

      case "heading":
        return (
          <div>
            <select
              value={block.level}
              onChange={(e) => updateBlock(block.id, { level: Number(e.target.value) })}
              className="mb-2 px-3 py-1 border border-[#8c8f94] dark:border-[#3c434a] rounded bg-white dark:bg-[#1d2327] text-[#1d2327] dark:text-[#f0f0f1]"
            >
              <option value={1}>H1</option>
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
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={block.content}
                onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                placeholder="Image URL..."
                className="flex-1 px-4 py-3 border border-[#8c8f94] dark:border-[#3c434a] rounded bg-white dark:bg-[#1d2327] text-[#1d2327] dark:text-[#f0f0f1] focus:outline-none focus:ring-2 focus:ring-[#2271b1]"
              />
              <Button type="button" onClick={() => openMediaPicker(block.id)} variant="outline" className="shrink-0">
                <ImageIcon className="w-4 h-4 mr-2" />
                Choose from Library
              </Button>
            </div>
            {block.content && (
              <div className="mt-3">
                <img src={block.content || "/placeholder.svg"} alt="Preview" className="max-w-full h-auto rounded" />
              </div>
            )}
          </div>
        )

      case "table":
        return (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  {block.tableData?.headers.map((header, i) => (
                    <th key={i} className="border border-gray-300 p-2 bg-gray-50">
                      <input
                        type="text"
                        value={header}
                        onChange={(e) => {
                          const newHeaders = [...(block.tableData?.headers || [])]
                          newHeaders[i] = e.target.value
                          updateBlock(block.id, {
                            tableData: { ...block.tableData!, headers: newHeaders },
                          })
                        }}
                        className="w-full px-2 py-1 border-0 bg-transparent focus:outline-none"
                      />
                    </th>
                  ))}
                  <th className="border border-gray-300 p-2 w-20">
                    <button
                      onClick={() => {
                        const newHeaders = [
                          ...(block.tableData?.headers || []),
                          `Column ${(block.tableData?.headers.length || 0) + 1}`,
                        ]
                        const newRows = (block.tableData?.rows || []).map((row) => [...row, ""])
                        updateBlock(block.id, {
                          tableData: { headers: newHeaders, rows: newRows },
                        })
                      }}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      +Col
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {block.tableData?.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-gray-300 p-2">
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => {
                            const newRows = [...(block.tableData?.rows || [])]
                            newRows[rowIndex][cellIndex] = e.target.value
                            updateBlock(block.id, {
                              tableData: { ...block.tableData!, rows: newRows },
                            })
                          }}
                          className="w-full px-2 py-1 border-0 bg-transparent focus:outline-none"
                        />
                      </td>
                    ))}
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => {
                          const newRows = (block.tableData?.rows || []).filter((_, i) => i !== rowIndex)
                          updateBlock(block.id, {
                            tableData: { ...block.tableData!, rows: newRows },
                          })
                        }}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Del
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={(block.tableData?.headers.length || 0) + 1} className="border border-gray-300 p-2">
                    <button
                      onClick={() => {
                        const newRow = Array(block.tableData?.headers.length || 2).fill("")
                        const newRows = [...(block.tableData?.rows || []), newRow]
                        updateBlock(block.id, {
                          tableData: { ...block.tableData!, rows: newRows },
                        })
                      }}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      + Add Row
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )

      case "html":
        return (
          <div>
            <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Custom HTML Block</div>
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              placeholder="Enter HTML code..."
              className="w-full min-h-[150px] px-4 py-3 border border-[#8c8f94] dark:border-[#3c434a] rounded bg-white dark:bg-[#1d2327] text-[#1d2327] dark:text-[#f0f0f1] font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#2271b1]"
            />
            {block.content && (
              <div className="mt-3 p-4 border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                <div className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">Preview:</div>
                <div dangerouslySetInnerHTML={{ __html: block.content }} />
              </div>
            )}
          </div>
        )

      case "banner":
        return (
          <div>
            <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Banner Image</div>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={block.content}
                onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                placeholder="Banner image URL..."
                className="flex-1 px-4 py-3 border border-[#8c8f94] dark:border-[#3c434a] rounded bg-white dark:bg-[#1d2327] text-[#1d2327] dark:text-[#f0f0f1] focus:outline-none focus:ring-2 focus:ring-[#2271b1]"
              />
              <Button type="button" onClick={() => openMediaPicker(block.id)} variant="outline" className="shrink-0">
                <Layout className="w-4 h-4 mr-2" />
                Choose from Library
              </Button>
            </div>
            {block.content && (
              <div className="mt-3 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                <img src={block.content || "/placeholder.svg"} alt="Banner Preview" className="w-full h-auto" />
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <>
      <div className="min-h-screen bg-[#f0f0f1] dark:bg-[#1d2327] p-6">
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-normal text-[#1d2327] dark:text-[#f0f0f1]">
              {page ? "Edit Page" : "Add New Page"}
            </h1>
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-2 text-sm text-[#1d2327] dark:text-[#f0f0f1]">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="rounded"
                />
                Published
              </label>
              <Button onClick={handleSave} disabled={saving} className="bg-[#2271b1] hover:bg-[#135e96] text-white">
                {saving ? "Saving..." : "Save Page"}
              </Button>
            </div>
          </div>

          <Card className="bg-white dark:bg-[#2c3338] border border-[#c3c4c7] dark:border-[#3c434a] p-6 mb-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Page title"
              className="w-full text-4xl font-bold mb-4 px-0 py-2 border-none bg-transparent text-[#1d2327] dark:text-[#f0f0f1] focus:outline-none placeholder:text-[#646970] dark:placeholder:text-[#a7aaad]"
            />

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1d2327] dark:text-[#f0f0f1] mb-2">Slug (URL)</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="page-slug"
                className="w-full px-4 py-2 border border-[#8c8f94] dark:border-[#3c434a] rounded bg-white dark:bg-[#1d2327] text-[#1d2327] dark:text-[#f0f0f1] focus:outline-none focus:ring-2 focus:ring-[#2271b1]"
              />
            </div>

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
                        {block.type === "table" && "Table"}
                        {block.type === "html" && "HTML"}
                        {block.type === "banner" && "Banner"}
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
              <button
                onClick={() => addBlock("table")}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1d2327] border border-[#8c8f94] dark:border-[#3c434a] rounded text-[#1d2327] dark:text-[#f0f0f1] hover:bg-[#f6f7f7] dark:hover:bg-[#2c3338] text-sm"
              >
                <Table className="w-4 h-4" />
                Table
              </button>
              <button
                onClick={() => addBlock("html")}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1d2327] border border-[#8c8f94] dark:border-[#3c434a] rounded text-[#1d2327] dark:text-[#f0f0f1] hover:bg-[#f6f7f7] dark:hover:bg-[#2c3338] text-sm"
              >
                <Code className="w-4 h-4" />
                HTML
              </button>
              <button
                onClick={() => addBlock("banner")}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1d2327] border border-[#8c8f94] dark:border-[#3c434a] rounded text-[#1d2327] dark:text-[#f0f0f1] hover:bg-[#f6f7f7] dark:hover:bg-[#2c3338] text-sm"
              >
                <Layout className="w-4 h-4" />
                Banner
              </button>
            </div>
          </Card>

          <Card className="bg-white dark:bg-[#2c3338] border border-[#c3c4c7] dark:border-[#3c434a] p-6">
            <h3 className="text-lg font-semibold text-[#1d2327] dark:text-[#f0f0f1] mb-4">SEO Settings</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[#1d2327] dark:text-[#f0f0f1] mb-2">Meta Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="SEO title (defaults to page title)"
                className="w-full px-4 py-2 border border-[#8c8f94] dark:border-[#3c434a] rounded bg-white dark:bg-[#1d2327] text-[#1d2327] dark:text-[#f0f0f1] focus:outline-none focus:ring-2 focus:ring-[#2271b1]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1d2327] dark:text-[#f0f0f1] mb-2">
                Meta Description
              </label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="SEO description"
                rows={3}
                className="w-full px-4 py-2 border border-[#8c8f94] dark:border-[#3c434a] rounded bg-white dark:bg-[#1d2327] text-[#1d2327] dark:text-[#f0f0f1] resize-none focus:outline-none focus:ring-2 focus:ring-[#2271b1]"
              />
            </div>
          </Card>
        </div>
      </div>

      <MediaPickerDialog
        open={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={handleMediaSelect}
      />
    </>
  )
}
