import { HeroBanner } from "@/components/hero-banner"
import { AboutUsSection } from "@/components/about-us-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <AboutUsSection />
    </main>
  )
}
