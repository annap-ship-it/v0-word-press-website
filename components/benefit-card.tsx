"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import type { LucideIcon } from "lucide-react"

interface BenefitCardProps {
  benefit: { title: string; description: string }
  icon: LucideIcon
}

export function BenefitCard({ benefit, icon: IconComponent }: BenefitCardProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <div
      className="p-6 rounded-[14px] border hover:border-[#FF6200] transition-all duration-300 group"
      style={{
        backgroundColor: isDark ? "#1A1A1A" : "#FAFAFA",
        borderColor: isDark ? "#333" : "#E5E5E5",
      }}
    >
      <div
        className="w-12 h-12 rounded-[8px] flex items-center justify-center mb-4 group-hover:bg-[#FF6200] transition-colors"
        style={{
          backgroundColor: isDark ? "rgba(255, 98, 0, 0.2)" : "rgba(255, 98, 0, 0.1)",
        }}
      >
        <IconComponent className="w-6 h-6 text-[#FF6200] group-hover:text-white transition-colors" />
      </div>
      <h4 className="font-semibold text-lg mb-2" style={{ color: isDark ? "#FFFFFF" : "#1A1A1A" }}>
        {benefit.title}
      </h4>
      <p className="text-sm leading-relaxed" style={{ color: isDark ? "#9A9A9A" : "#666666" }}>
        {benefit.description}
      </p>
    </div>
  )
}
