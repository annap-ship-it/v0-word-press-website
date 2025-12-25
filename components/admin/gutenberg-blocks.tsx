"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Trash2,
  MoveUp,
  MoveDown,
  Settings,
  Columns,
  Type,
  ImageIcon,
  LinkIcon,
  Mail,
  Map,
  Layout,
  Plus,
  Columns3,
  Grid2x2,
  Grid3x3,
} from "lucide-react"

export interface GutenbergBlock {
  id: string
  type:
    | "paragraph"
    | "heading"
    | "list"
    | "image"
    | "table"
    | "html"
    | "banner"
    | "button"
    | "link"
    | "form"
    | "map"
    | "columns"
  content: any
  level?: number
  listType?: "bullet" | "numbered"
  innerBlocks?: GutenbergBlock[]
  anchor?: string
  spacing?: {
    marginTop?: number
    marginBottom?: number
    paddingTop?: number
    paddingBottom?: number
  }
  imageSettings?: {
    alt?: string
    size?: "small" | "medium" | "large" | "full"
    alignment?: "left" | "center" | "right" | "wide" | "full"
    width?: number
    height?: number
  }
  buttonRadius?: number // For button border radius
  formShowRecaptcha?: boolean // For reCAPTCHA
  formShowTerms?: boolean // For Terms checkbox
  formTermsText?: string // Custom terms text
  formTermsLink?: string // Link to terms page
}

interface GutenbergBlockEditorProps {
  blocks: GutenbergBlock[]
  onChange: (blocks: GutenbergBlock[]) => void
}

export function GutenbergBlockEditor({ blocks, onChange }: GutenbergBlockEditorProps) {
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false)
  const [currentBlockId, setCurrentBlockId] = useState<string | null>(null)
  const [expandedSettings, setExpandedSettings] = useState<string | null>(null)

  const addBlock = (type: GutenbergBlock["type"], columnCount?: number) => {
    const newBlock: GutenbergBlock = {
      id: crypto.randomUUID(),
      type,
      spacing: { marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 },
    }

    if (type === "columns") {
      newBlock.columnCount = columnCount || 2
      newBlock.columns = Array(newBlock.columnCount)
        .fill(null)
        .map(() => [
          {
            id: crypto.randomUUID(),
            type: "paragraph",
            content: "",
          },
        ])
    } else if (type === "heading") {
      newBlock.level = 2
      newBlock.content = ""
    } else if (type === "paragraph") {
      newBlock.content = ""
    } else if (type === "button") {
      newBlock.buttonText = "Click here"
      newBlock.buttonUrl = "#"
      newBlock.buttonStyle = "primary"
      newBlock.buttonRadius = 4
    } else if (type === "form") {
      newBlock.formFields = [{ label: "Name", type: "text", required: true }]
      newBlock.formShowRecaptcha = false
      newBlock.formShowTerms = false
      newBlock.formTermsText = "I Accept Terms and Conditions"
      newBlock.formTermsLink = "/terms"
    }

    onChange([...blocks, newBlock])
  }

  const updateBlock = (id: string, updates: Partial<GutenbergBlock>) => {
    const updateBlockRecursive = (blockList: GutenbergBlock[]): GutenbergBlock[] => {
      return blockList.map((block) => {
        if (block.id === id) {
          return { ...block, ...updates }
        }
        if (block.type === "columns" && block.columns) {
          return {
            ...block,
            columns: block.columns.map((col) => updateBlockRecursive(col)),
          }
        }
        return block
      })
    }
    onChange(updateBlockRecursive(blocks))
  }

  const deleteBlock = (id: string) => {
    const deleteBlockRecursive = (blockList: GutenbergBlock[]): GutenbergBlock[] => {
      return blockList.filter((block) => {
        if (block.id === id) return false
        if (block.type === "columns" && block.columns) {
          block.columns = block.columns.map((col) => deleteBlockRecursive(col))
        }
        return true
      })
    }
    onChange(deleteBlockRecursive(blocks))
  }

  const moveBlock = (id: string, direction: "up" | "down") => {
    const index = blocks.findIndex((block) => block.id === id)
    if (index === -1) return

    if (direction === "up" && index > 0) {
      const newBlocks = [...blocks]
      ;[newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]]
      onChange(newBlocks)
    } else if (direction === "down" && index < blocks.length - 1) {
      const newBlocks = [...blocks]
      ;[newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]]
      onChange(newBlocks)
    }
  }

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

  const addColumnBlock = (columnIndex: number, blockId: string) => {
    const block = blocks.find((b) => b.id === blockId)
    if (!block || block.type !== "columns" || !block.columns) return

    const newInnerBlock: GutenbergBlock = {
      id: crypto.randomUUID(),
      type: "paragraph",
      content: "",
    }

    const newColumns = [...block.columns]
    newColumns[columnIndex] = [...newColumns[columnIndex], newInnerBlock]
    updateBlock(blockId, { columns: newColumns })
  }

  const renderSpacingControls = (block: GutenbergBlock) => {
    if (expandedSettings !== block.id) return null

    return (
      <Card className="p-4 mb-4 bg-gray-50 dark:bg-gray-800 rounded">
        <h4 className="text-sm font-semibold mb-3">Block Settings</h4>

        <div className="space-y-3">
          <div>
            <Label className="text-xs">Anchor ID</Label>
            <Input
              type="text"
              value={block.anchor || ""}
              onChange={(e) => updateBlock(block.id, { anchor: e.target.value })}
              placeholder="section-id"
              className="text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Margin Top (px)</Label>
              <Input
                type="number"
                value={block.spacing?.marginTop || 0}
                onChange={(e) =>
                  updateBlock(block.id, {
                    spacing: { ...block.spacing, marginTop: Number(e.target.value) },
                  })
                }
                className="text-sm"
              />
            </div>
            <div>
              <Label className="text-xs">Margin Bottom (px)</Label>
              <Input
                type="number"
                value={block.spacing?.marginBottom || 0}
                onChange={(e) =>
                  updateBlock(block.id, {
                    spacing: { ...block.spacing, marginBottom: Number(e.target.value) },
                  })
                }
                className="text-sm"
              />
            </div>
            <div>
              <Label className="text-xs">Padding Top (px)</Label>
              <Input
                type="number"
                value={block.spacing?.paddingTop || 0}
                onChange={(e) =>
                  updateBlock(block.id, {
                    spacing: { ...block.spacing, paddingTop: Number(e.target.value) },
                  })
                }
                className="text-sm"
              />
            </div>
            <div>
              <Label className="text-xs">Padding Bottom (px)</Label>
              <Input
                type="number"
                value={block.spacing?.paddingBottom || 0}
                onChange={(e) =>
                  updateBlock(block.id, {
                    spacing: { ...block.spacing, paddingBottom: Number(e.target.value) },
                  })
                }
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </Card>
    )
  }

  const renderInnerBlock = (block: GutenbergBlock, columnIndex?: number, parentId?: string) => {
    const blockStyle = {
      marginTop: `${block.spacing?.marginTop || 0}px`,
      marginBottom: `${block.spacing?.marginBottom || 0}px`,
      paddingTop: `${block.spacing?.paddingTop || 0}px`,
      paddingBottom: `${block.spacing?.paddingBottom || 0}px`,
    }

    switch (block.type) {
      case "heading":
        return (
          <div style={blockStyle} id={block.anchor}>
            <select
              value={block.level}
              onChange={(e) => updateBlock(block.id, { level: Number(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6 })}
              className="mb-2 px-3 py-1 border rounded bg-white dark:bg-gray-800 text-sm"
            >
              <option value={1}>H1</option>
              <option value={2}>H2</option>
              <option value={3}>H3</option>
              <option value={4}>H4</option>
              <option value={5}>H5</option>
              <option value={6}>H6</option>
            </select>
            <Input
              type="text"
              value={block.content || ""}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              placeholder="Heading text..."
              className="text-2xl font-bold"
            />
          </div>
        )

      case "paragraph":
        return (
          <div style={blockStyle} id={block.anchor}>
            <Textarea
              value={block.content || ""}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              placeholder="Start writing..."
              className="min-h-[100px]"
            />
          </div>
        )

      case "image":
        return (
          <div style={blockStyle} id={block.anchor}>
            <div className="flex gap-2 mb-2">
              <Input
                type="text"
                value={block.content || ""}
                onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                placeholder="Image URL..."
                className="flex-1"
              />
              <Button
                type="button"
                onClick={() => openMediaPicker(block.id)}
                variant="outline"
                size="sm"
                className="rounded"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Library
              </Button>
            </div>
            {block.content && (
              <img
                src={block.content || "/placeholder.svg"}
                alt={block.imageSettings?.alt || "Preview"}
                className={`max-w-full h-auto rounded ${
                  block.imageSettings?.alignment === "left"
                    ? "float-left"
                    : block.imageSettings?.alignment === "right"
                      ? "float-right"
                      : block.imageSettings?.alignment === "center"
                        ? "mx-auto"
                        : block.imageSettings?.alignment === "wide"
                          ? "w-full"
                          : block.imageSettings?.alignment === "full"
                            ? "w-full"
                            : ""
                }`}
                style={{
                  width: block.imageSettings?.width ? `${block.imageSettings.width}px` : "auto",
                  height: block.imageSettings?.height ? `${block.imageSettings.height}px` : "auto",
                }}
              />
            )}
          </div>
        )

      case "button":
        return (
          <div style={blockStyle} id={block.anchor}>
            <div className="space-y-2">
              <Input
                type="text"
                value={block.buttonText || ""}
                onChange={(e) => updateBlock(block.id, { buttonText: e.target.value })}
                placeholder="Button text..."
              />
              <Input
                type="text"
                value={block.buttonUrl || ""}
                onChange={(e) => updateBlock(block.id, { buttonUrl: e.target.value })}
                placeholder="Button URL..."
              />
              <select
                value={block.buttonStyle || "primary"}
                onChange={(e) =>
                  updateBlock(block.id, { buttonStyle: e.target.value as "primary" | "secondary" | "outline" })
                }
                className="w-full px-3 py-2 border rounded"
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="outline">Outline</option>
              </select>
              <div>
                <Label className="text-xs">Border Radius (px)</Label>
                <Input
                  type="number"
                  value={block.buttonRadius || 4}
                  onChange={(e) => updateBlock(block.id, { buttonRadius: Number.parseInt(e.target.value) || 4 })}
                  min="0"
                  max="50"
                  className="w-full"
                />
              </div>
              <Button
                style={{ borderRadius: `${block.buttonRadius || 4}px` }}
                className={
                  block.buttonStyle === "primary"
                    ? "bg-blue-600"
                    : block.buttonStyle === "secondary"
                      ? "bg-gray-600"
                      : "border-2"
                }
              >
                {block.buttonText || "Button"}
              </Button>
            </div>
          </div>
        )

      case "link":
        return (
          <div style={blockStyle} id={block.anchor}>
            <div className="space-y-2">
              <Input
                type="text"
                value={block.content || ""}
                onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                placeholder="Link text..."
              />
              <Input
                type="text"
                value={block.buttonUrl || ""}
                onChange={(e) => updateBlock(block.id, { buttonUrl: e.target.value })}
                placeholder="Link URL..."
              />
              <a href={block.buttonUrl || "#"} className="text-blue-600 underline">
                {block.content || "Link"}
              </a>
            </div>
          </div>
        )

      case "form":
        return (
          <div style={blockStyle} id={block.anchor}>
            <div className="space-y-3">
              {/* Form fields */}
              {block.formFields?.map((field, i) => (
                <div key={i} className="flex gap-2 items-end">
                  <div className="flex-1">
                    <Label className="text-xs">Field Label</Label>
                    <Input
                      type="text"
                      value={field.label}
                      onChange={(e) => {
                        const newFields = [...(block.formFields || [])]
                        newFields[i].label = e.target.value
                        updateBlock(block.id, { formFields: newFields })
                      }}
                      placeholder="Field label..."
                      className="text-sm"
                    />
                  </div>
                  <select
                    value={field.type}
                    onChange={(e) => {
                      const newFields = [...(block.formFields || [])]
                      newFields[i].type = e.target.value
                      updateBlock(block.id, { formFields: newFields })
                    }}
                    className="px-2 py-2 border rounded text-sm"
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="tel">Phone</option>
                    <option value="textarea">Textarea</option>
                  </select>
                  <Button
                    type="button"
                    onClick={() => {
                      const newFields = block.formFields?.filter((_, index) => index !== i)
                      updateBlock(block.id, { formFields: newFields })
                    }}
                    variant="destructive"
                    size="sm"
                    className="rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => {
                  const newFields = [...(block.formFields || []), { label: "New Field", type: "text", required: false }]
                  updateBlock(block.id, { formFields: newFields })
                }}
                variant="outline"
                size="sm"
                style={{ borderRadius: "4px" }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Field
              </Button>

              <div className="flex items-center gap-2 pt-2 border-t">
                <input
                  type="checkbox"
                  id={`recaptcha-${block.id}`}
                  checked={block.formShowRecaptcha || false}
                  onChange={(e) => updateBlock(block.id, { formShowRecaptcha: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor={`recaptcha-${block.id}`} className="text-sm cursor-pointer">
                  Show reCAPTCHA
                </Label>
              </div>

              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`terms-${block.id}`}
                    checked={block.formShowTerms || false}
                    onChange={(e) => updateBlock(block.id, { formShowTerms: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor={`terms-${block.id}`} className="text-sm cursor-pointer">
                    Show Terms Checkbox
                  </Label>
                </div>
                {block.formShowTerms && (
                  <>
                    <Input
                      type="text"
                      value={block.formTermsText || "I Accept Terms and Conditions"}
                      onChange={(e) => updateBlock(block.id, { formTermsText: e.target.value })}
                      placeholder="Terms checkbox text..."
                      className="text-sm"
                    />
                    <Input
                      type="text"
                      value={block.formTermsLink || "/terms"}
                      onChange={(e) => updateBlock(block.id, { formTermsLink: e.target.value })}
                      placeholder="Link to terms page..."
                      className="text-sm"
                    />
                  </>
                )}
              </div>
            </div>
            {/* Form Preview */}
            <div className="p-4 bg-background/50 rounded space-y-3 mt-4">
              <p className="text-xs font-medium text-muted-foreground">Preview:</p>
              {block.formFields?.map((field, i) => (
                <div key={i}>
                  <Label className="text-sm">{field.label}</Label>
                  {field.type === "textarea" ? (
                    <textarea
                      className="w-full px-3 py-2 border rounded"
                      rows={3}
                      placeholder={`Type your ${field.label.toLowerCase()}...`}
                      style={{ borderRadius: "4px" }}
                    />
                  ) : (
                    <Input
                      type={field.type}
                      placeholder={`Type your ${field.label.toLowerCase()}...`}
                      style={{ borderRadius: "4px" }}
                    />
                  )}
                </div>
              ))}
              {block.formShowRecaptcha && (
                <div className="border rounded p-2 bg-gray-100 dark:bg-gray-800 text-sm text-center">reCAPTCHA</div>
              )}
              {block.formShowTerms && (
                <div className="flex items-center gap-2">
                  <input type="checkbox" id={`preview-terms-${block.id}`} className="rounded" />
                  <Label htmlFor={`preview-terms-${block.id}`} className="text-sm">
                    {block.formTermsText || "I Accept Terms and Conditions"}
                  </Label>
                </div>
              )}
              <Button type="button" className="rounded">
                Submit
              </Button>
            </div>
          </div>
        )

      case "map":
        return (
          <div style={blockStyle} id={block.anchor}>
            <Input
              type="text"
              value={block.content || ""}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              placeholder="Google Maps embed URL..."
            />
            {block.content && (
              <div className="mt-2 border rounded overflow-hidden">
                <iframe
                  src={block.content}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        )

      case "columns":
        return (
          <Card className="p-4 mb-4 border-2 border-dashed rounded" style={blockStyle} id={block.anchor}>
            <div className="mb-3">
              <Label className="text-xs">Column Count</Label>
              <select
                value={block.columnCount}
                onChange={(e) => {
                  const count = Number(e.target.value) as 1 | 2 | 3 | 4 | 5
                  const newColumns = Array(count)
                    .fill(null)
                    .map((_, i) => block.columns?.[i] || [])
                  updateBlock(block.id, { columnCount: count, columns: newColumns })
                }}
                className="ml-2 px-3 py-1 border rounded"
              >
                <option value={1}>1 Column</option>
                <option value={2}>2 Columns</option>
                <option value={3}>3 Columns</option>
                <option value={4}>4 Columns</option>
                <option value={5}>5 Columns</option>
              </select>
            </div>

            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: `repeat(${block.columnCount}, 1fr)`,
              }}
            >
              {block.columns?.map((column, colIndex) => (
                <div key={colIndex} className="border-2 border-dashed border-gray-300 dark:border-gray-600 p-3 rounded">
                  <div className="text-xs font-semibold text-gray-500 mb-2">Column {colIndex + 1}</div>
                  {column.map((innerBlock) => (
                    <div key={innerBlock.id} className="mb-3 p-2 border rounded bg-gray-50 dark:bg-gray-800">
                      {renderInnerBlock(innerBlock, colIndex, block.id)}
                      <div className="flex justify-end gap-1 mt-2">
                        <Button
                          type="button"
                          onClick={() => deleteBlock(innerBlock.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 rounded"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Button
                      type="button"
                      onClick={() => addColumnBlock(colIndex, block.id)}
                      variant="outline"
                      size="sm"
                      className="text-xs rounded"
                    >
                      <Type className="w-3 h-3 mr-1" />
                      Text
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        const newInnerBlock: GutenbergBlock = {
                          id: crypto.randomUUID(),
                          type: "image",
                          content: "",
                        }
                        const newColumns = [...(block.columns || [])]
                        newColumns[colIndex] = [...newColumns[colIndex], newInnerBlock]
                        updateBlock(block.id, { columns: newColumns })
                      }}
                      variant="outline"
                      size="sm"
                      className="text-xs rounded"
                    >
                      <ImageIcon className="w-3 h-3 mr-1" />
                      Image
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        const newInnerBlock: GutenbergBlock = {
                          id: crypto.randomUUID(),
                          type: "button",
                          buttonText: "Click here",
                          buttonUrl: "#",
                          buttonStyle: "primary",
                          buttonRadius: 4,
                        }
                        const newColumns = [...(block.columns || [])]
                        newColumns[colIndex] = [...newColumns[colIndex], newInnerBlock]
                        updateBlock(block.id, { columns: newColumns })
                      }}
                      variant="outline"
                      size="sm"
                      className="text-xs rounded"
                    >
                      Button
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )

      default:
        return null
    }
  }

  const renderBlock = (block: GutenbergBlock, index: number) => {
    return (
      <Card key={block.id} className="p-4 mb-4 rounded">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
              {block.type === "columns" ? `${block.columnCount} Columns` : block.type}
            </span>
            {block.anchor && <span className="text-xs text-blue-600">#{block.anchor}</span>}
          </div>
          <div className="flex gap-1">
            <Button
              type="button"
              onClick={() => setExpandedSettings(expandedSettings === block.id ? null : block.id)}
              variant="ghost"
              size="sm"
              className="rounded"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              onClick={() => moveBlock(block.id, "up")}
              variant="ghost"
              size="sm"
              className="rounded"
              disabled={index === 0}
            >
              <MoveUp className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              onClick={() => moveBlock(block.id, "down")}
              variant="ghost"
              size="sm"
              className="rounded"
              disabled={index === blocks.length - 1}
            >
              <MoveDown className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              onClick={() => deleteBlock(block.id)}
              variant="ghost"
              size="sm"
              className="rounded text-red-600"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {renderSpacingControls(block)}
        {renderInnerBlock(block)}
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Block Toolbar */}
      <div className="sticky top-0 z-10 bg-background border-b pb-4 mb-4">
        <div className="flex flex-wrap gap-2">
          {/* Column Layout Buttons */}
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock("columns", 1)} className="rounded">
            <Layout className="w-4 h-4 mr-1" />1 Column
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock("columns", 2)} className="rounded">
            <Columns className="w-4 h-4 mr-1" />2 Columns
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock("columns", 3)} className="rounded">
            <Columns3 className="w-4 h-4 mr-1" />3 Columns
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock("columns", 4)} className="rounded">
            <Grid2x2 className="w-4 h-4 mr-1" />4 Columns
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock("columns", 5)} className="rounded">
            <Grid3x3 className="w-4 h-4 mr-1" />5 Columns
          </Button>

          {/* Other Block Types */}
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock("heading")} className="rounded">
            <Type className="w-4 h-4 mr-1" />
            Heading
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock("paragraph")} className="rounded">
            <Layout className="w-4 h-4 mr-1" />
            Paragraph
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock("image")} className="rounded">
            <ImageIcon className="w-4 h-4 mr-1" />
            Image
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock("button")} className="rounded">
            <Plus className="w-4 h-4 mr-1" />
            Button
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock("link")} className="rounded">
            <LinkIcon className="w-4 h-4 mr-1" />
            Link
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock("form")} className="rounded">
            <Mail className="w-4 h-4 mr-1" />
            Form
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => addBlock("map")} className="rounded">
            <Map className="w-4 h-4 mr-1" />
            Map
          </Button>
        </div>
      </div>

      {/* Blocks List */}
      {blocks.length === 0 ? (
        <Card className="p-8 text-center border-2 border-dashed rounded">
          <p className="text-muted-foreground mb-4">No blocks yet. Click the buttons above to add your first block.</p>
        </Card>
      ) : (
        blocks.map((block, index) => renderBlock(block, index))
      )}
    </div>
  )
}
