import { HeroBanner } from "@/components/hero-banner"
import { AwardsSection } from "@/components/awards"
import { WhyUsSection } from "@/components/why-choose-us-section"
import { AboutUsSection } from "@/components/about-us-section"
import { QuoteSection } from "@/components/quote-section"
import { ExpertiseSection } from "@/components/expertise"
import { OurServicesSection } from "@/components/our-services-section"
import { TechnologiesSection } from "@/components/technologies"
import { OurProjectsSection } from "@/components/our-projects-section"
import { WhyUsSection2 } from "@/components/why-us-section"
import { FeedbackSection } from "@/components/feedback-section"
import { RequestConsultationSection } from "@/components/request-consultation-section"
import { FAQSection } from "@/components/faq-section"

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
      <OurProjectsSection />
      <WhyUsSection2 />
      <FeedbackSection />
      <FAQSection />
      <RequestConsultationSection />
    </main>
  )
}
