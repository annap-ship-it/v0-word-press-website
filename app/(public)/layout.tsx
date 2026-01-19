import type React from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CookiesConsent } from "@/components/cookies-consent"
import { CalculatorPopupWrapper } from "@/components/calculator-popup-wrapper"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      {children}
      <Footer />
      <CookiesConsent />
      <CalculatorPopupWrapper />
    </div>
  )
}
