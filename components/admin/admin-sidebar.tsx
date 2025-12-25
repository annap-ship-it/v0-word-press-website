"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileText, ImageIcon, Users, Palette, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  {
    icon: FileText,
    label: "Posts",
    href: "/admin/posts",
    submenu: [
      { label: "All Posts", href: "/admin/posts" },
      { label: "Add New", href: "/admin/posts/new" },
      { label: "Categories", href: "/admin/categories" },
    ],
  },
  {
    icon: ImageIcon,
    label: "Media",
    href: "/admin/media",
  },
  {
    icon: FileText,
    label: "Pages",
    href: "/admin/pages",
    submenu: [
      { label: "All Pages", href: "/admin/pages" },
      { label: "Add New", href: "/admin/pages/new" },
    ],
  },
  {
    icon: Palette,
    label: "Appearance",
    href: "/admin/appearance",
    submenu: [
      { label: "Theme Editor", href: "/admin/appearance" },
      { label: "Theme Files", href: "/admin/theme-files" },
    ],
  },
  { icon: Users, label: "Users", href: "/admin/users" },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]))
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-[160px] bg-[#1d2327] text-white z-50 hidden lg:block overflow-y-auto">
      {/* Logo Area */}
      <div className="h-8 flex items-center justify-center bg-[#23282d] border-b border-[#000]/20">
        <Link href="/admin" className="text-white text-sm font-semibold px-3">
          WordPress
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="py-0">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          const isExpanded = expandedMenus.includes(item.label)
          const hasSubmenu = item.submenu && item.submenu.length > 0

          return (
            <div key={item.label}>
              <div className={cn("relative group cursor-pointer", isActive && "bg-[#0073aa]")}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 text-[#f0f0f1] hover:bg-[#0073aa] transition-colors text-sm"
                  onClick={(e) => {
                    if (hasSubmenu) {
                      e.preventDefault()
                      toggleMenu(item.label)
                    }
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1">{item.label}</span>
                  {hasSubmenu && (
                    <ChevronDown className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180")} />
                  )}
                </Link>

                {/* Hover Flyout Menu */}
                {hasSubmenu && !isExpanded && (
                  <div className="absolute left-full top-0 ml-0 hidden group-hover:block bg-[#23282d] border border-[#32373c] shadow-lg min-w-[200px] z-50">
                    <div className="py-2">
                      <div className="px-3 py-1 text-xs text-[#72aee6] font-semibold">{item.label}</div>
                      {item.submenu?.map((subitem) => (
                        <Link
                          key={subitem.href}
                          href={subitem.href}
                          className="block px-3 py-2 text-[#f0f0f1] hover:bg-[#0073aa] text-sm"
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Expanded Submenu */}
              {hasSubmenu && isExpanded && (
                <div className="bg-[#0e1116]">
                  {item.submenu?.map((subitem) => (
                    <Link
                      key={subitem.href}
                      href={subitem.href}
                      className={cn(
                        "block pl-12 pr-3 py-2 text-[#f0f0f1] hover:bg-[#0073aa] text-sm",
                        pathname === subitem.href && "text-[#72aee6]",
                      )}
                    >
                      {subitem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
