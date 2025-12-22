"use client"

import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/locale-context"
import { useTheme } from "@/lib/theme-context"

export function LocaleToggle() {
  const { locale, setLocale } = useLocale()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const textColor = isDark ? "#FFFFFF" : "#000000"

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLocale(locale === "en" ? "uk" : "en")}
      className="font-normal text-base hover:bg-transparent"
    >
      <span
        style={{
          color: textColor,
          fontWeight: "inherit",
          fontSize: "inherit",
          lineHeight: "inherit",
        }}
      >
        {locale === "en" ? "EN" : "UK"}
      </span>
    </Button>
  )
}
