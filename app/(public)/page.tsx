import { HeroBanner } from "@/components/hero-banner"
import { AboutUsSection } from "@/components/about-us-section"
import { OurServicesSection } from "@/components/our-services-section"
import { RequestConsultationSection } from "@/components/request-consultation-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <AboutUsSection />
      <OurServicesSection />
      <RequestConsultationSection />
    </main>
  )
}
