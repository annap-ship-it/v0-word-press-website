import { createBrowserClient as createBrowserClientSSR } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

// Declare global type for window
declare global {
  interface Window {
    supabaseClient?: SupabaseClient | null
    supabaseListenerInitialized?: boolean
  }
}

export function createBrowserClient() {
  // Check if running in browser
  if (typeof window === "undefined") {
    throw new Error("createBrowserClient can only be used in browser context")
  }

  if (window.supabaseClient !== undefined) {
    return window.supabaseClient
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("[v0] Supabase environment variables not configured - database features will not work")
    window.supabaseClient = null
    return null
  }

  // Create singleton on first call and store in window
  try {
    window.supabaseClient = createBrowserClientSSR(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: false,
        },
      },
    )

    if (!window.supabaseListenerInitialized) {
      window.supabaseListenerInitialized = true

      // Set up single auth state change listener with error handling
      window.supabaseClient.auth.onAuthStateChange((event, session) => {
        // Suppress AbortError logs - these are expected during cleanup
        if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "TOKEN_REFRESHED") {
          // Auth state changed successfully
        }
      })
    }
  } catch (error) {
    console.warn("[v0] Failed to initialize Supabase:", error instanceof Error ? error.message : "Unknown error")
    window.supabaseClient = null
  }

  return window.supabaseClient
}

export const createClient = createBrowserClient
