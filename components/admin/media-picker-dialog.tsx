"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ImageIcon, FileText, Film } from "lucide-react"

interface MediaFile {
  id: string
  filename: string
  url: string
  size: number
  mime_type: string
}

interface MediaPickerDialogProps {
  open: boolean
  onClose: () => void
  onSelect: (url: string) => void
}

export function MediaPickerDialog({ open, onClose, onSelect }: MediaPickerDialogProps) {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)

  useEffect(() => {
    if (open) {
      loadFiles()
    }
  }, [open])

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

  const filteredFiles = files.filter((file) => file.filename.toLowerCase().includes(searchQuery.toLowerCase()))

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return <ImageIcon className="w-6 h-6" />
    if (mimeType.startsWith("video/")) return <Film className="w-6 h-6" />
    return <FileText className="w-6 h-6" />
  }

  const handleSelect = () => {
    if (selectedFile) {
      onSelect(selectedFile.url)
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Media</DialogTitle>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading media...</div>
          ) : filteredFiles.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No files found</div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  onClick={() => setSelectedFile(file)}
                  className={`cursor-pointer border-2 rounded overflow-hidden transition-all ${
                    selectedFile?.id === file.id
                      ? "border-orange-500 ring-2 ring-orange-200"
                      : "border-gray-200 dark:border-gray-700 hover:border-orange-300"
                  }`}
                >
                  {file.mime_type.startsWith("image/") ? (
                    <img
                      src={file.url || "/placeholder.svg"}
                      alt={file.filename}
                      className="w-full h-32 object-cover"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      {getFileIcon(file.mime_type)}
                    </div>
                  )}
                  <div className="p-2 bg-white dark:bg-gray-900">
                    <p className="text-sm font-medium truncate">{file.filename}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="rounded bg-transparent">
            Cancel
          </Button>
          <Button onClick={handleSelect} disabled={!selectedFile} className="rounded">
            Select
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
