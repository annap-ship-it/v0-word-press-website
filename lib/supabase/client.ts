import { createBrowserClient as createBrowserClientSSR } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

// Declare global type for window
declare global {
  interface Window {
    supabaseClient?: SupabaseClient
  }
}

export function createBrowserClient() {
  // Check if running in browser
  if (typeof window === "undefined") {
    throw new Error("createBrowserClient can only be used in browser context")
  }

  // Return existing singleton instance from window
  if (window.supabaseClient) {
    return window.supabaseClient
  }

  // Create singleton on first call and store in window
  window.supabaseClient = createBrowserClientSSR(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  return window.supabaseClient
}

export const createClient = createBrowserClient
