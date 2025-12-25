import { createBrowserClient as createBrowserClientSSR } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

// Global singleton instance
let browserClientInstance: SupabaseClient | undefined

export function createBrowserClient() {
  // Check if running in browser
  if (typeof window === "undefined") {
    throw new Error("createBrowserClient can only be used in browser context")
  }

  // Return existing singleton instance
  if (browserClientInstance) {
    return browserClientInstance
  }

  // Create singleton on first call
  browserClientInstance = createBrowserClientSSR(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  return browserClientInstance
}

export const createClient = createBrowserClient
