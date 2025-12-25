"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Upload, Trash2, Search, ImageIcon, FileText, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MediaFile {
  id: string
  filename: string
  url: string
  size: number
  mime_type: string
  created_at: string
}

export default function MediaLibrary() {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)

  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    try {
      const response = await fetch("/api/media/list")
      const data = await response.json()
      setFiles(data.files || [])
    } catch (error) {
      console.error("Failed to load files:", error)
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

      const response = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        await loadFiles()
      } else {
        alert("Upload failed")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (url: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return

    try {
      const response = await fetch("/api/media/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (response.ok) {
        await loadFiles()
        if (selectedFile?.url === url) {
          setSelectedFile(null)
        }
      } else {
        alert("Delete failed")
      }
    } catch (error) {
      console.error("Delete error:", error)
      alert("Delete failed")
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
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
              className="pl-10"
            />
          </div>
          <Button asChild disabled={uploading}>
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
                className={`relative group cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
                  selectedFile?.id === file.id
                    ? "border-orange-500 ring-2 ring-orange-200"
                    : "border-gray-200 dark:border-gray-700 hover:border-orange-300"
                }`}
              >
                {file.mime_type.startsWith("image/") ? (
                  <img src={file.url || "/placeholder.svg"} alt={file.filename} className="w-full h-32 object-cover" />
                ) : (
                  <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    {getFileIcon(file.mime_type)}
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
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4 sticky top-4">
            <h3 className="font-semibold text-lg">File Details</h3>

            {selectedFile.mime_type.startsWith("image/") && (
              <img
                src={selectedFile.url || "/placeholder.svg"}
                alt={selectedFile.filename}
                className="w-full rounded border border-gray-200 dark:border-gray-700"
              />
            )}

            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Filename</p>
                <p className="font-medium break-all">{selectedFile.filename}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Size</p>
                <p className="font-medium">{formatFileSize(selectedFile.size)}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Type</p>
                <p className="font-medium">{selectedFile.mime_type}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Uploaded</p>
                <p className="font-medium">{new Date(selectedFile.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 mb-1">URL</p>
                <div className="flex gap-2">
                  <Input value={selectedFile.url} readOnly className="text-xs" />
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(selectedFile.url)}>
                    Copy
                  </Button>
                </div>
              </div>
            </div>

            <Button variant="destructive" className="w-full" onClick={() => handleDelete(selectedFile.url)}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete File
            </Button>
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center text-gray-500">
            Select a file to view details
          </div>
        )}
      </div>
    </div>
  )
}
