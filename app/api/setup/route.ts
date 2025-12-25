import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password, displayName } = await request.json()

    // Validate input
    if (!email || !password || !displayName) {
      return NextResponse.json({ error: "Email, password, and display name are required" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    // Create admin client with service role key
    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Check if any users exist
    const { data: existingUsers, error: checkError } = await supabaseAdmin.auth.admin.listUsers()

    if (checkError) {
      console.error("[v0] Error checking existing users:", checkError)
      return NextResponse.json({ error: "Failed to check existing users" }, { status: 500 })
    }

    // Only allow setup if no users exist
    if (existingUsers && existingUsers.users.length > 0) {
      return NextResponse.json({ error: "Setup has already been completed. Admin users exist." }, { status: 403 })
    }

    // Create the admin user
    const { data: user, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        display_name: displayName,
      },
    })

    if (createError) {
      console.error("[v0] Error creating user:", createError)
      return NextResponse.json({ error: createError.message || "Failed to create admin user" }, { status: 500 })
    }

    if (!user.user) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    // Create profile for the user
    const { error: profileError } = await supabaseAdmin.from("profiles").insert({
      id: user.user.id,
      display_name: displayName,
      avatar_url: null,
      bio: null,
    })

    if (profileError) {
      console.error("[v0] Error creating profile:", profileError)
      // Don't fail completely if profile creation fails
    }

    console.log("[v0] Admin user created successfully:", user.user.email)

    return NextResponse.json({
      success: true,
      userId: user.user.id,
    })
  } catch (error: any) {
    console.error("[v0] Setup error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
