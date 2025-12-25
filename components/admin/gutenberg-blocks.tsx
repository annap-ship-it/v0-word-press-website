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
} from "lucide-react"
import { MediaPickerDialog } from "./media-picker-dialog"

export interface GutenbergBlock {
  id: string
  type: "columns" | "heading" | "paragraph" | "image" | "button" | "link" | "form" | "map"
  anchor?: string
  spacing?: {
    marginTop?: number
    marginBottom?: number
    paddingTop?: number
    paddingBottom?: number
  }
  // Columns specific
  columnCount?: 1 | 2 | 3 | 4 | 5
  columns?: GutenbergBlock[][]
  // Content specific
  content?: string
  level?: 1 | 2 | 3 | 4 | 5 | 6
  buttonText?: string
  buttonUrl?: string
  buttonStyle?: "primary" | "secondary" | "outline"
  formFields?: { label: string; type: string; required: boolean }[]
  mapUrl?: string
}

interface GutenbergBlockEditorProps {
  blocks: GutenbergBlock[]
  onChange: (blocks: GutenbergBlock[]) => void
}

export function GutenbergBlockEditor({ blocks, onChange }: GutenbergBlockEditorProps) {
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false)
  const [currentBlockId, setCurrentBlockId] = useState<string | null>(null)
  const [expandedSettings, setExpandedSettings] = useState<string | null>(null)

  const addBlock = (type: GutenbergBlock["type"]) => {
    const newBlock: GutenbergBlock = {
      id: crypto.randomUUID(),
      type,
      spacing: { marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 },
    }

    if (type === "columns") {
      newBlock.columnCount = 2
      newBlock.columns = [
        [
          {
            id: crypto.randomUUID(),
            type: "paragraph",
            content: "",
          },
        ],
        [
          {
            id: crypto.randomUUID(),
            type: "paragraph",
            content: "",
          },
        ],
      ]
    } else if (type === "heading") {
      newBlock.level = 2
      newBlock.content = ""
    } else if (type === "paragraph") {
      newBlock.content = ""
    } else if (type === "button") {
      newBlock.buttonText = "Click here"
      newBlock.buttonUrl = "#"
      newBlock.buttonStyle = "primary"
    } else if (type === "form") {
      newBlock.formFields = [{ label: "Name", type: "text", required: true }]
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
      <Card className="p-4 mb-4 bg-gray-50 dark:bg-gray-800">
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
              <Button type="button" onClick={() => openMediaPicker(block.id)} variant="outline" size="sm">
                <ImageIcon className="w-4 h-4 mr-2" />
                Library
              </Button>
            </div>
            {block.content && (
              <img src={block.content || "/placeholder.svg"} alt="Preview" className="max-w-full h-auto rounded" />
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
              <Button
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
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Field
              </Button>
            </div>
          </div>
        )

      case "map":
        return (
          <div style={blockStyle} id={block.anchor}>
            <Input
              type="text"
              value={block.mapUrl || ""}
              onChange={(e) => updateBlock(block.id, { mapUrl: e.target.value })}
              placeholder="Google Maps embed URL..."
              className="mb-2"
            />
            {block.mapUrl && (
              <div className="aspect-video border rounded">
                <iframe src={block.mapUrl} width="100%" height="100%" frameBorder="0" allowFullScreen />
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  const renderBlock = (block: GutenbergBlock, index: number) => {
    const blockStyle = {
      marginTop: `${block.spacing?.marginTop || 0}px`,
      marginBottom: `${block.spacing?.marginBottom || 0}px`,
      paddingTop: `${block.spacing?.paddingTop || 0}px`,
      paddingBottom: `${block.spacing?.paddingBottom || 0}px`,
    }

    return (
      <Card key={block.id} className="p-4 mb-4 bg-white dark:bg-gray-900 border-2 hover:border-blue-400">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
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
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button type="button" onClick={() => moveBlock(block.id, "up")} variant="ghost" size="sm">
              <MoveUp className="w-4 h-4" />
            </Button>
            <Button type="button" onClick={() => moveBlock(block.id, "down")} variant="ghost" size="sm">
              <MoveDown className="w-4 h-4" />
            </Button>
            <Button type="button" onClick={() => deleteBlock(block.id)} variant="ghost" size="sm">
              <Trash2 className="w-4 h-4 text-red-600" />
            </Button>
          </div>
        </div>

        {renderSpacingControls(block)}

        {block.type === "columns" ? (
          <div style={blockStyle} id={block.anchor}>
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
                          className="text-red-600"
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
                      className="text-xs"
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
                      className="text-xs"
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
                        }
                        const newColumns = [...(block.columns || [])]
                        newColumns[colIndex] = [...newColumns[colIndex], newInnerBlock]
                        updateBlock(block.id, { columns: newColumns })
                      }}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      Button
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          renderInnerBlock(block)
        )}
      </Card>
    )
  }

  return (
    <div>
      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded">
        <h3 className="text-sm font-semibold mb-3">Add Block</h3>
        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={() => addBlock("columns")} variant="outline" size="sm">
            <Columns className="w-4 h-4 mr-2" />
            Columns
          </Button>
          <Button type="button" onClick={() => addBlock("heading")} variant="outline" size="sm">
            <Type className="w-4 h-4 mr-2" />
            Heading
          </Button>
          <Button type="button" onClick={() => addBlock("paragraph")} variant="outline" size="sm">
            <Layout className="w-4 h-4 mr-2" />
            Paragraph
          </Button>
          <Button type="button" onClick={() => addBlock("image")} variant="outline" size="sm">
            <ImageIcon className="w-4 h-4 mr-2" />
            Image
          </Button>
          <Button type="button" onClick={() => addBlock("button")} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Button
          </Button>
          <Button type="button" onClick={() => addBlock("link")} variant="outline" size="sm">
            <LinkIcon className="w-4 h-4 mr-2" />
            Link
          </Button>
          <Button type="button" onClick={() => addBlock("form")} variant="outline" size="sm">
            <Mail className="w-4 h-4 mr-2" />
            Form
          </Button>
          <Button type="button" onClick={() => addBlock("map")} variant="outline" size="sm">
            <Map className="w-4 h-4 mr-2" />
            Map
          </Button>
        </div>
      </div>

      <div>{blocks.map((block, index) => renderBlock(block, index))}</div>

      <MediaPickerDialog
        open={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={handleMediaSelect}
      />
    </div>
  )
}
