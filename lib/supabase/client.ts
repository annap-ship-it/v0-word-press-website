import { createBrowserClient as createBrowserClientSSR } from "@supabase/ssr"

declare global {
  var __supabaseBrowserClient: ReturnType<typeof createBrowserClientSSR> | undefined
}

export function createClient() {
  if (typeof window === "undefined") {
    throw new Error("createClient can only be used in browser context")
  }

  if (!globalThis.__supabaseBrowserClient) {
    globalThis.__supabaseBrowserClient = createBrowserClientSSR(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }

  return globalThis.__supabaseBrowserClient
}

export function createBrowserClient() {
  return createClient()
}
