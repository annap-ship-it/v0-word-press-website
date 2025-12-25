"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Folder, FileCode, ChevronRight, Download } from "lucide-react"

const fileTree = [
  {
    name: "app",
    type: "folder",
    children: [
      {
        name: "(public)",
        type: "folder",
        children: [
          { name: "page.tsx", type: "file", path: "app/(public)/page.tsx" },
          {
            name: "about",
            type: "folder",
            children: [{ name: "page.tsx", type: "file", path: "app/(public)/about/page.tsx" }],
          },
          {
            name: "blog",
            type: "folder",
            children: [{ name: "page.tsx", type: "file", path: "app/(public)/blog/page.tsx" }],
          },
        ],
      },
      { name: "layout.tsx", type: "file", path: "app/layout.tsx" },
      { name: "globals.css", type: "file", path: "app/globals.css" },
    ],
  },
  {
    name: "components",
    type: "folder",
    children: [
      { name: "navigation.tsx", type: "file", path: "components/navigation.tsx" },
      { name: "footer.tsx", type: "file", path: "components/footer.tsx" },
      { name: "hero.tsx", type: "file", path: "components/hero.tsx" },
    ],
  },
  {
    name: "lib",
    type: "folder",
    children: [
      {
        name: "supabase",
        type: "folder",
        children: [
          { name: "client.ts", type: "file", path: "lib/supabase/client.ts" },
          { name: "server.ts", type: "file", path: "lib/supabase/server.ts" },
        ],
      },
      { name: "utils.ts", type: "file", path: "lib/utils.ts" },
    ],
  },
]

export default function ThemeFilesPage() {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["app", "components"]))

  function toggleFolder(path: string) {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpandedFolders(newExpanded)
  }

  function renderTree(items: any[], parentPath = "") {
    return items.map((item) => {
      const fullPath = parentPath ? `${parentPath}/${item.name}` : item.name
      const isExpanded = expandedFolders.has(fullPath)

      if (item.type === "folder") {
        return (
          <div key={fullPath} className="ml-4">
            <button
              onClick={() => toggleFolder(fullPath)}
              className="flex w-full items-center gap-2 rounded px-2 py-1 text-left hover:bg-accent"
            >
              <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
              <Folder className="h-4 w-4 text-blue-500" />
              <span className="text-sm">{item.name}</span>
            </button>
            {isExpanded && item.children && <div className="ml-2">{renderTree(item.children, fullPath)}</div>}
          </div>
        )
      }

      return (
        <div key={fullPath} className="ml-4">
          <div className="flex items-center gap-2 rounded px-2 py-1 hover:bg-accent">
            <FileCode className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{item.name}</span>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Theme Files</h1>
        <Button className="rounded">
          <Download className="mr-2 h-4 w-4" />
          Download Theme
        </Button>
      </div>

      <Card className="rounded border p-6">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Browse your theme files and source code. To edit files, download the project and use your preferred code
            editor.
          </p>
        </div>
        <div className="rounded border bg-card p-4">
          <div className="font-mono text-sm">{renderTree(fileTree)}</div>
        </div>
        <div className="mt-4 rounded border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <strong>Note:</strong> For security reasons, direct file editing is not available in the browser. Download
            your theme to edit files locally using VS Code, WebStorm, or your preferred IDE.
          </p>
        </div>
      </Card>
    </div>
  )
}
