'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const carBrands = [
  'Maruti Suzuki', 'Hyundai', 'Tata Motors', 'Mahindra', 'Toyota',
  'Honda', 'Kia', 'MG Motor', 'Skoda', 'Volkswagen',
  'Ford', 'Renault', 'Nissan', 'Jeep', 'Volvo',
]

const industries = [
  {
    title: 'Individual Owners',
    desc: 'Premium wipers for cars, SUVs, and trucks',
    icon: '⊙',
  },
  {
    title: 'Dealerships & Service Centers',
    desc: 'Bulk supply for consistent customer demand',
    icon: '⊕',
  },
  {
    title: 'Fleet Operators',
    desc: 'Reliable solutions for taxis, logistics, and corporate fleets',
    icon: '⊗',
  },
  {
    title: 'Export Markets',
    desc: 'International quality for global distribution',
    icon: '⊘',
  },
]

export function TrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.trust-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )
      gsap.fromTo('.brand-item',
        { opacity: 0 },
        {
          opacity: 1, duration: 0.5, stagger: 0.04,
          scrollTrigger: {
            trigger: '.brands-grid',
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-dark-deep py-24 lg:py-36 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-border to-transparent" />
      <div className="absolute inset-0 grid-lines opacity-10" />

      <div className="max-w-8xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <SectionLabel className="mb-6 justify-center">Industry Trust</SectionLabel>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-black uppercase text-white leading-none mb-4">
            Compatible With<br />
            <span className="text-orange">Every Drive.</span>
          </h2>
          <p className="text-silver-dark text-sm max-w-md mx-auto">
            Bricado wiper systems are engineered to fit the full spectrum of vehicles in the Indian automotive market.
          </p>
        </div>

        {/* Car brands */}
        <div className="brands-grid flex flex-wrap justify-center gap-3 mb-20">
          {carBrands.map((brand) => (
            <div
              key={brand}
              className="brand-item px-4 py-2.5 border border-dark-border text-silver-dark text-xs font-medium tracking-wider hover:border-orange/40 hover:text-silver transition-all duration-300"
            >
              {brand}
            </div>
          ))}
          <div className="brand-item px-4 py-2.5 border border-orange/30 text-orange text-xs font-medium tracking-wider">
            + More
          </div>
        </div>

        {/* Industry segments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-dark-border">
          {industries.map((ind) => (
            <div key={ind.title} className="trust-item bg-dark-charcoal p-8 group hover:bg-dark-graphite transition-colors duration-300">
              <div className="text-3xl text-orange/40 mb-6 group-hover:text-orange/70 transition-colors duration-300">
                {ind.icon}
              </div>
              <h3 className="font-display text-xl font-black uppercase text-white mb-3">
                {ind.title}
              </h3>
              <p className="text-silver-dark text-sm leading-relaxed">{ind.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8">
          {[
            { label: 'Manufacturing', value: 'India-Based' },
            { label: 'Quality Standard', value: 'Automotive Grade' },
            { label: 'Warranty', value: 'Performance Backed' },
            { label: 'Support', value: 'Nationwide' },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-3">
              <div className="w-1 h-8 bg-orange" />
              <div>
                <div className="text-label text-[9px] text-silver-dark tracking-widest">{badge.label}</div>
                <div className="text-sm font-bold text-white">{badge.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
