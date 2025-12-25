import { createBrowserClient as createBrowserClientSSR } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

// Global singleton instance
let browserClientInstance: SupabaseClient | undefined

// Check if running in browser
const isBrowser = typeof window !== "undefined"

// Create singleton immediately if in browser
if (isBrowser && !browserClientInstance) {
  browserClientInstance = createBrowserClientSSR(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

export function createClient() {
  if (!isBrowser) {
    throw new Error("createClient can only be used in browser context")
  }

  // Return existing singleton instance
  if (browserClientInstance) {
    return browserClientInstance
  }

  browserClientInstance = createBrowserClientSSR(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  return browserClientInstance
}

export function createBrowserClient() {
  return createClient()
}
