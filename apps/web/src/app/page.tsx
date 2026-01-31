import { CTASection } from '@/components/landing/cta'
import { FeaturesSection } from '@/components/landing/features'
import { Footer } from '@/components/landing/footer'
import { Header } from '@/components/landing/header'
import { HeroSection } from '@/components/landing/hero'
import { PricingSection } from '@/components/landing/pricing'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  )
}
