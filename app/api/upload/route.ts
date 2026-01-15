import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 })
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ message: "File must be an image" }, { status: 400 })
    }

    const timestamp = Date.now()
    const filename = `blog-images/${timestamp}-${file.name}`

    const blob = await put(filename, file, {
      access: "public",
    })

    return NextResponse.json({ url: blob.url })
  } catch (error: any) {
    console.error("[v0] Upload error:", error)
    return NextResponse.json({ message: "Upload failed: " + error.message }, { status: 500 })
  }
}
