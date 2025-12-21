"use client"

import { Button } from "@/components/ui/button"
import { useLocale } from "@/lib/locale-context"

export function LocaleToggle() {
  const { locale, setLocale } = useLocale()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLocale(locale === "en" ? "uk" : "en")}
      className="font-normal text-base"
    >
      {locale === "en" ? "EN" : "UK"}
    </Button>
  )
}
