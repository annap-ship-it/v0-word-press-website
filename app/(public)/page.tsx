import { HeroBanner } from "@/components/hero-banner"
import { AwardsSection } from "@/components/awards"
import { WhyUsSection } from "@/components/why-choose-us-section"
import { AboutUsSection } from "@/components/about-us-section"
import { OurServicesSection } from "@/components/our-services-section"
import { RequestConsultationSection } from "@/components/request-consultation-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <AwardsSection />
      <WhyUsSection />
      <AboutUsSection />
      <OurServicesSection />
      <RequestConsultationSection />
    </main>
  )
}
