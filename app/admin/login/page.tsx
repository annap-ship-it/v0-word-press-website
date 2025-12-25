"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@/lib/supabase/client"
import Link from "next/link"
import Image from "next/image"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createBrowserClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push("/admin")
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <Image
              src="/images/logo-dark.svg"
              alt="IdeaTeam"
              width={140}
              height={22}
              className="hidden dark:block mx-auto"
            />
            <Image
              src="/images/logo-light.svg"
              alt="IdeaTeam"
              width={140}
              height={22}
              className="dark:hidden mx-auto"
            />
          </Link>
          <h1 className="text-2xl font-bold text-black dark:text-white mb-2">Admin Login</h1>
          <p className="text-[#787877] dark:text-[#CCCCCC]">Sign in to manage your blog</p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-[#3a3a3a] p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black dark:text-white mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#2a2a2a] border border-gray-300 dark:border-[#3a3a3a] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF6200] focus:border-transparent transition-all"
                placeholder="admin@ideateam.dev"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black dark:text-white mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#2a2a2a] border border-gray-300 dark:border-[#3a3a3a] text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF6200] focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6200] hover:bg-[#cc4e00] active:bg-[#994000] disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white font-medium py-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 space-y-3">
            <div className="text-center">
              <span className="text-sm text-[#787877] dark:text-[#CCCCCC]">Don't have an account? </span>
              <Link href="/admin/signup" className="text-sm text-[#FF6200] hover:underline font-medium">
                Sign up
              </Link>
            </div>
            <div className="text-center">
              <Link
                href="/"
                className="text-sm text-[#787877] dark:text-[#CCCCCC] hover:text-[#FF6200] transition-colors"
              >
                ← Back to site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
