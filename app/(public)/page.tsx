import { HeroBanner } from "@/components/hero-banner"
import { AwardsSection } from "@/components/awards"
import { WhyUsSection } from "@/components/why-choose-us-section"
import { AboutUsSection } from "@/components/about-us-section"
import { QuoteSection } from "@/components/quote-section"
import { ExpertiseSection } from "@/components/expertise"
import { OurServicesSection } from "@/components/our-services-section"
import { TechnologiesSection } from "@/components/technologies"
import { RequestConsultationSection } from "@/components/request-consultation-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <AwardsSection />
      <WhyUsSection />
      <AboutUsSection />
      <QuoteSection />
      <ExpertiseSection />
      <OurServicesSection />
      <TechnologiesSection /> 
      <RequestConsultationSection />
    </main>
  )
}
