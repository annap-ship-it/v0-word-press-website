"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Pencil, Trash2 } from "lucide-react"
import type { SupabaseClient } from "@supabase/supabase-js"

interface Category {
  id: string
  name: string
  slug: string
  color: string
  created_at: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: "", slug: "", color: "#FF6B35" })
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null)

  useEffect(() => {
    const client = createBrowserClient()
    setSupabase(client)
  }, [])

  useEffect(() => {
    if (supabase) {
      loadCategories()
    }
  }, [supabase])

  async function loadCategories() {
    if (!supabase) return
    const { data } = await supabase.from("categories").select("*").order("name")
    if (data) setCategories(data)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase) return

    if (isEditing) {
      await supabase.from("categories").update(formData).eq("id", isEditing)
    } else {
      await supabase.from("categories").insert([formData])
    }
    setFormData({ name: "", slug: "", color: "#FF6B35" })
    setIsEditing(null)
    loadCategories()
  }

  async function handleDelete(id: string) {
    if (!supabase) return
    if (confirm("Delete this category?")) {
      await supabase.from("categories").delete().eq("id", id)
      loadCategories()
    }
  }

  function handleEdit(category: Category) {
    setFormData({ name: category.name, slug: category.slug, color: category.color })
    setIsEditing(category.id)
  }

  if (!supabase) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded border p-6">
          <h2 className="mb-4 text-lg font-semibold">{isEditing ? "Edit Category" : "Add New Category"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => {
                  const name = e.target.value
                  const slug = name.toLowerCase().replace(/\s+/g, "-")
                  setFormData({ ...formData, name, slug })
                }}
                placeholder="Category name"
                required
                className="rounded"
              />
            </div>
            <div>
              <Label>Slug</Label>
              <Input
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="category-slug"
                required
                className="rounded"
              />
            </div>
            <div>
              <Label>Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="h-10 w-20 rounded"
                />
                <Input
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="#FF6B35"
                  className="rounded"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="rounded">
                {isEditing ? "Update" : "Add"} Category
              </Button>
              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(null)
                    setFormData({ name: "", slug: "", color: "#FF6B35" })
                  }}
                  className="rounded"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Card>

        <Card className="rounded border p-6 lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">All Categories</h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between rounded border p-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded" style={{ backgroundColor: category.color }} />
                  <div>
                    <div className="font-medium">{category.name}</div>
                    <div className="text-sm text-muted-foreground">{category.slug}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(category)} className="rounded">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(category.id)}
                    className="rounded text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
