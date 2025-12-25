"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function SetupPage() {
  const [email, setEmail] = useState("admin@ideateam.dev")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("Administrator")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, displayName }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create admin user")
      }

      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-8 shadow-lg">
          <div className="flex flex-col items-center gap-4 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <h1 className="text-2xl font-bold">Setup Complete!</h1>
            <p className="text-muted-foreground">Your admin account has been created successfully.</p>
            <div className="w-full space-y-2 rounded-md bg-muted p-4 text-left text-sm">
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p className="text-xs text-muted-foreground">Use these credentials to log in to the admin panel.</p>
            </div>
            <Link href="/admin/login" className="w-full">
              <Button className="w-full" size="lg">
                Go to Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Initial Setup</h1>
          <p className="text-muted-foreground">Create your first admin account</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Admin Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Choose a strong password"
              minLength={8}
            />
            <p className="text-xs text-muted-foreground">Minimum 8 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              placeholder="Your name"
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Creating Account..." : "Create Admin Account"}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          This page will only work once. After creating the first admin, use the Users section in the admin panel to
          create additional accounts.
        </p>
      </div>
    </div>
  )
}
