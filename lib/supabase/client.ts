import { createBrowserClient as createBrowserClientSSR } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

// Declare global type for window
declare global {
  interface Window {
    supabaseClient?: SupabaseClient | null
    supabaseListenerInitialized?: boolean
    supabaseAuthUnsubscribe?: (() => void) | null
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

      // Capture the unsubscribe function from onAuthStateChange
      // This prevents AbortError during component unmounting
      window.supabaseAuthUnsubscribe = window.supabaseClient.auth.onAuthStateChange((event, session) => {
        // Auth state changed - listener is active
        if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "TOKEN_REFRESHED") {
          // Auth state changes are handled naturally by Supabase
        }
      })
    }
  } catch (error) {
    console.warn("[v0] Failed to initialize Supabase:", error instanceof Error ? error.message : "Unknown error")
    window.supabaseClient = null
  }

  return window.supabaseClient
}

// Cleanup function to properly unsubscribe auth listener
export function cleanupAuthListener() {
  if (typeof window !== "undefined" && window.supabaseAuthUnsubscribe) {
    window.supabaseAuthUnsubscribe()
    window.supabaseAuthUnsubscribe = null
  }
}

export const createClient = createBrowserClient
