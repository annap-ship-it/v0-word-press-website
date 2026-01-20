import type React from "react"
import type { Metadata } from "next"
import { Onest } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/lib/theme-context"
import { LocaleProvider } from "@/lib/locale-context"
import { ScrollAnimationProvider } from "@/components/scroll-animation-provider"
import { CookiesConsent } from "@/components/cookies-consent"
import { CalculatorPopup } from "@/components/calculator-popup"
import { ScrollToTop } from "@/components/scroll-to-top"
import "./globals.css"

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "800"],
  variable: "--font-onest",
})

export const metadata: Metadata = {
  title: "Idea Team Dev | Expert Software Development Studio",
  description: "Custom software development solutions including web development, mobile apps, QA automation, DevOps, and data analytics. Expert team delivering high-quality projects.",
  generator: "v0.app",
  keywords: "software development, web development, mobile apps, outsourcing, DevOps, QA testing",
  authors: [{ name: "Idea Team Dev" }],
  openGraph: {
    title: "Idea Team Dev | Expert Software Development Studio",
    description: "Custom software development solutions and expert services for your business.",
    type: "website",
    url: "https://v0-ideateam.vercel.app",
    images: [
      {
        url: "https://v0-ideateam.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Idea Team Dev - Software Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Idea Team Dev | Expert Software Development Studio",
    description: "Custom software development solutions and expert services.",
    images: ["https://v0-ideateam.vercel.app/og-image.png"],
  },
  alternates: {
    canonical: "https://v0-ideateam.vercel.app",
    languages: {
      en: "https://v0-ideateam.vercel.app",
      uk: "https://v0-ideateam.vercel.app/uk",
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark" data-theme="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <link rel="alternate" hrefLang="en" href="https://v0-ideateam.vercel.app" />
        <link rel="alternate" hrefLang="uk" href="https://v0-ideateam.vercel.app/uk" />
        <link rel="alternate" hrefLang="x-default" href="https://v0-ideateam.vercel.app" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.classList.toggle('dark', theme === 'dark');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body className={`${onest.variable} font-sans antialiased`}>
        <ThemeProvider>
          <LocaleProvider>
            <ScrollAnimationProvider>{children}</ScrollAnimationProvider>
            <Analytics />
            <CookiesConsent />
            <CalculatorPopup />
            <ScrollToTop />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
