"use client"

import { useLocale } from "@/lib/locale-context"
import Link from "next/link"

export function Footer() {
  const { t } = useLocale()

  return (
    <footer className="bg-muted/30 border-t border-border mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">LOGO</h3>
            <p className="text-sm text-foreground/70">
              Your trusted partner for innovative digital solutions and business growth.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-foreground/70 hover:text-foreground">
                  {t.about}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-foreground/70 hover:text-foreground">
                  {t.services}
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-foreground/70 hover:text-foreground">
                  {t.portfolio}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-foreground/70 hover:text-foreground">
                  {t.blog}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/70 hover:text-foreground">
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-foreground/70 hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-foreground/70 hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-foreground/70">
          © 2025 Your Company. {t.allRightsReserved}
        </div>
      </div>
    </footer>
  )
}
