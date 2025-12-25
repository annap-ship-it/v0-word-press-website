"use client"

import { Bell, User, Plus, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LocaleToggle } from "@/components/locale-toggle"
import Link from "next/link"
import { createBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function AdminHeader() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-40 bg-[#23282d] dark:bg-[#23282d] text-white border-b border-[#32373c]">
      <div className="flex items-center justify-between h-8 px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-[#72aee6] hover:text-[#9ec2e6]">
            Visit Site
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" className="h-6 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs px-2">
            <Plus className="w-3 h-3 mr-1" />
            New
          </Button>
          <LocaleToggle />
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Bell className="w-4 h-4 text-[#f0f0f1]" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <User className="w-4 h-4 text-[#f0f0f1]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleLogout}
            disabled={isLoggingOut}
            title="Logout"
          >
            <LogOut className="w-4 h-4 text-[#f0f0f1]" />
          </Button>
        </div>
      </div>
    </header>
  )
}
