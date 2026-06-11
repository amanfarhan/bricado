import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { WindshieldSection } from '@/components/home/WindshieldSection'
import { EngineeringSection } from '@/components/home/EngineeringSection'
import { TechnologySection } from '@/components/home/TechnologySection'
import { ProductRangeSection } from '@/components/home/ProductRangeSection'
import { TrustSection } from '@/components/home/TrustSection'
import { CTASection } from '@/components/home/CTASection'

export const metadata: Metadata = {
  title: 'BRICADO® — Advanced Wiper Blade Systems | Clear Vision. Safe Drive.',
  description:
    'BRICADO® is India\'s premier manufacturer of advanced wiper blade systems — Teflon-coated, aerodynamic, all-weather engineered for superior automotive performance.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WindshieldSection />
      <EngineeringSection />
      <TechnologySection />
      <ProductRangeSection />
      <TrustSection />
      <CTASection />
    </>
  )
}
