"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Upload, Trash2, Search, ImageIcon, FileText, Film, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface MediaFile {
  id: string
  filename: string
  file_path: string
  url?: string
  size: number
  file_type: string
  mime_type?: string
  alt_text?: string
  created_at: string
}

export default function MediaLibrary() {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [editingAlt, setEditingAlt] = useState(false)
  const [altText, setAltText] = useState("")

  useEffect(() => {
    loadFiles()
  }, [])

  useEffect(() => {
    if (selectedFile) {
      setAltText(selectedFile.alt_text || "")
    }
  }, [selectedFile])

  const loadFiles = async () => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const response = await fetch("/api/media/list", {
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      const data = await response.json()
      setFiles(data.files || [])
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.error("Request timeout while loading files")
      } else {
        console.error("Failed to load files:", error)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000)

      const response = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      if (response.ok) {
        await loadFiles()
      } else {
        alert("Upload failed")
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.error("Upload timeout")
      } else {
        console.error("Upload error:", error)
      }
      alert("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const handleUpdateAlt = async () => {
    if (!selectedFile) return

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const response = await fetch("/api/media/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedFile.id, alt_text: altText }),
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      if (response.ok) {
        await loadFiles()
        setSelectedFile({ ...selectedFile, alt_text: altText })
        setEditingAlt(false)
        alert("ALT text updated successfully!")
      } else {
        alert("Update failed")
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.error("Update timeout")
      } else {
        console.error("Update error:", error)
      }
      alert("Update failed")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return

    try {
      const file = files.find((f) => f.id === id)
      if (!file) return

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const response = await fetch("/api/media/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: file.url || file.file_path }),
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      if (response.ok) {
        await loadFiles()
        if (selectedFile?.id === id) {
          setSelectedFile(null)
        }
      } else {
        alert("Delete failed")
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.error("Delete timeout")
      } else {
        console.error("Delete error:", error)
      }
      alert("Delete failed")
    }
  }

  const copyToClipboard = (path: string) => {
    navigator.clipboard.writeText(path)
    alert("URL copied to clipboard!")
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return <ImageIcon className="w-6 h-6" />
    if (mimeType.startsWith("video/")) return <Film className="w-6 h-6" />
    return <FileText className="w-6 h-6" />
  }

  const filteredFiles = files.filter((file) => file.filename.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* File List */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-[4px]"
            />
          </div>
          <Button asChild disabled={uploading} className="rounded-[4px]">
            <label className="cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? "Uploading..." : "Upload File"}
              <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading media...</div>
        ) : filteredFiles.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {searchQuery ? "No files match your search" : "No files uploaded yet"}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                onClick={() => setSelectedFile(file)}
                className={`relative group cursor-pointer border-2 rounded-[4px] overflow-hidden transition-all ${
                  selectedFile?.id === file.id
                    ? "border-orange-500 ring-2 ring-orange-200"
                    : "border-gray-200 dark:border-gray-700 hover:border-orange-300"
                }`}
              >
                {(file.file_type || file.mime_type || "").startsWith("image/") ? (
                  <img
                    src={file.url || file.file_path || "/placeholder.svg"}
                    alt={file.alt_text || file.filename}
                    className="w-full h-32 object-cover"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    {getFileIcon(file.file_type || file.mime_type || "")}
                  </div>
                )}
                <div className="p-2 bg-white dark:bg-gray-900">
                  <p className="text-sm font-medium truncate">{file.filename}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* File Details */}
      <div className="lg:col-span-1">
        {selectedFile ? (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-[4px] p-6 space-y-4 sticky top-4">
            <h3 className="font-semibold text-lg">File Details</h3>

            {(selectedFile.file_type || selectedFile.mime_type || "").startsWith("image/") && (
              <img
                src={selectedFile.url || selectedFile.file_path || "/placeholder.svg"}
                alt={selectedFile.alt_text || selectedFile.filename}
                className="w-full rounded-[4px] border border-gray-200 dark:border-gray-700"
              />
            )}

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Filename</p>
                <p className="font-medium break-all">{selectedFile.filename}</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-gray-500 dark:text-gray-400">ALT Text</Label>
                  {!editingAlt && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingAlt(true)}
                      className="h-auto py-1 px-2 text-xs rounded-[4px]"
                    >
                      Edit
                    </Button>
                  )}
                </div>
                {editingAlt ? (
                  <div className="space-y-2">
                    <Textarea
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                      placeholder="Describe this image for accessibility..."
                      rows={3}
                      className="text-sm rounded-[4px]"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleUpdateAlt} className="flex-1 rounded-[4px]">
                        <Save className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingAlt(false)
                          setAltText(selectedFile.alt_text || "")
                        }}
                        className="rounded-[4px]"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    {selectedFile.alt_text || <span className="text-gray-400 italic">No ALT text set</span>}
                  </p>
                )}
              </div>

              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Size</p>
                <p className="font-medium">{formatFileSize(selectedFile.size)}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Type</p>
                <p className="font-medium">{selectedFile.file_type || selectedFile.mime_type}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">Uploaded</p>
                <p className="font-medium">{new Date(selectedFile.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">URL</p>
                <div className="flex gap-2">
                  <Input
                    value={selectedFile.url || selectedFile.file_path}
                    readOnly
                    className="text-xs rounded-[4px]"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(selectedFile.url || selectedFile.file_path)}
                    className="rounded-[4px]"
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </div>

            <Button
              variant="destructive"
              className="w-full rounded-[4px]"
              onClick={() => handleDelete(selectedFile.id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete File
            </Button>
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[4px] p-6 text-center text-gray-500">
            Select a file to view details
          </div>
        )}
      </div>
    </div>
  )
}
