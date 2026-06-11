'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

const segments = [
  {
    id: 'individual',
    number: '01',
    title: 'Individual Vehicle Owners',
    category: 'Retail',
    desc: 'Every car owner deserves premium wiper performance. Bricado products are available for individual purchase, offering the same automotive-grade quality found in premium vehicles to drivers of any vehicle segment — hatchbacks, sedans, SUVs, MUVs, and trucks.',
    points: [
      'Full range of blade sizes for all vehicle categories',
      'Easy online and offline availability',
      'Tool-free installation in under 60 seconds',
      'Direct replacement for all standard wiper arm types',
    ],
    stat: { value: 'All', label: 'Vehicle Segments' },
  },
  {
    id: 'dealerships',
    number: '02',
    title: 'Dealerships & Service Centers',
    category: 'B2B Supply',
    desc: 'Bricado partners with automotive dealerships and authorized service centers to supply consistent, high-quality wiper blades as part of routine service and replacement cycles. Competitive bulk pricing and reliable supply chain make Bricado the preferred OEM-quality alternative.',
    points: [
      'Bulk order programs with competitive wholesale pricing',
      'Consistent SKU availability across all popular sizes',
      'Point-of-sale display and merchandising support',
      'Dedicated account management for service center partners',
    ],
    stat: { value: 'Bulk', label: 'B2B Programs' },
  },
  {
    id: 'fleet',
    number: '03',
    title: 'Fleet Operators',
    category: 'Fleet Solutions',
    desc: 'Taxi aggregators, logistics companies, and corporate fleet managers rely on Bricado for dependable, cost-effective wiper replacement across their vehicle fleets. Our durability and competitive replacement cost reduce total fleet maintenance overhead.',
    points: [
      'Tailored supply contracts for fleet volumes',
      'Multi-vehicle compatibility reduces SKU management complexity',
      'Durability-engineered blades reduce replacement frequency',
      'Nationwide delivery network for distributed fleets',
    ],
    stat: { value: '∞', label: 'Fleet Scale' },
  },
  {
    id: 'ecommerce',
    number: '04',
    title: 'E-commerce Channels',
    category: 'Online Retail',
    desc: 'Bricado products are available through leading Indian e-commerce platforms, making premium wiper blades accessible to customers nationwide. Online availability ensures reach beyond physical distribution points to customers in tier-2 and tier-3 cities.',
    points: [
      'Listed on major Indian e-commerce platforms',
      'Pan-India delivery reach',
      'Detailed product pages with compatibility guides',
      'Customer reviews and rating visibility',
    ],
    stat: { value: 'Pan', label: 'India Coverage' },
  },
  {
    id: 'export',
    number: '05',
    title: 'Export & Global Markets',
    category: 'International',
    desc: 'Bricado products are engineered to international quality standards, with global market readiness built into our manufacturing philosophy. We are actively pursuing export partnerships for markets in Southeast Asia, the Middle East, and beyond.',
    points: [
      'ISO-compliant manufacturing standards',
      'Documentation ready for international export',
      'Custom branding and private-label options available',
      'Weather variants available for different climate profiles',
    ],
    stat: { value: 'Global', label: 'Export Ready' },
  },
  {
    id: 'local',
    number: '06',
    title: 'Local Outreach',
    category: 'Direct Channel',
    desc: 'High-traffic roadside locations, vehicle wash zones, and automotive hubs are key direct-sales channels for Bricado. These touchpoints allow direct customer interaction, immediate installation service, and rapid brand building in local automotive communities.',
    points: [
      'Roadside stall partnerships in high-traffic automotive areas',
      'Vehicle wash center placement programs',
      'On-site installation capability',
      'Direct customer education and demonstration',
    ],
    stat: { value: 'Local', label: 'Community Reach' },
  },
]

export default function IndustriesPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%' },
          }
        )
      })
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="bg-dark-deep">
      {/* Hero */}
      <section className="relative min-h-[75vh] flex items-end pb-20 pt-36 overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-orange/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-dark-deep to-transparent" />

        <div className="max-w-8xl mx-auto px-6 lg:px-10 relative z-10">
          <SectionLabel className="mb-8">Market Segments</SectionLabel>
          <h1 className="font-display text-[clamp(3rem,9vw,10rem)] font-black uppercase leading-none text-white mb-8">
            Serving Every<br />
            Road.<br />
            <span className="text-orange">Every Industry.</span>
          </h1>
          <p className="text-silver text-lg max-w-xl leading-relaxed">
            Bricado wiper systems reach across every segment of the automotive ecosystem —
            from individual drivers to fleet operators, from local markets to global export.
          </p>
        </div>
      </section>

      {/* Overview stats */}
      <section className="bg-dark-charcoal border-t border-b border-dark-border">
        <div className="max-w-8xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-dark-border">
            {[
              { value: '6', label: 'Market Segments' },
              { value: 'B2B', label: 'Partnership Programs' },
              { value: 'Online', label: 'E-commerce Ready' },
              { value: 'Export', label: 'Global Reach' },
            ].map((s) => (
              <div key={s.label} className="bg-dark-charcoal p-8 lg:p-12 text-center">
                <div className="font-display text-4xl lg:text-5xl font-black text-orange mb-2">{s.value}</div>
                <div className="text-label text-[9px] text-silver-dark tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Segments */}
      <section className="py-24 lg:py-36">
        <div className="max-w-8xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-dark-border">
            {segments.map((seg) => (
              <div key={seg.id} id={seg.id} className="reveal bg-dark-charcoal p-8 lg:p-10 group hover:bg-dark-graphite transition-colors duration-500 flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <span className="font-display text-5xl font-black text-dark-muted group-hover:text-dark-border transition-colors duration-300">
                    {seg.number}
                  </span>
                  <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-1 border border-dark-border text-silver-dark group-hover:border-orange/40 transition-colors duration-300">
                    {seg.category}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-black uppercase text-white mb-4 group-hover:text-orange transition-colors duration-300">
                  {seg.title}
                </h3>

                <p className="text-silver-dark text-sm leading-relaxed mb-6 flex-1">{seg.desc}</p>

                <ul className="space-y-2 mb-6">
                  {seg.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-xs text-silver-dark">
                      <span className="text-orange flex-shrink-0 mt-0.5">→</span>
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-dark-border flex items-center justify-between">
                  <div className="font-display text-xl font-black text-orange">{seg.stat.value}</div>
                  <div className="text-label text-[9px] text-silver-dark">{seg.stat.label}</div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-orange/0 group-hover:bg-orange/30 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Geographic focus */}
      <section className="py-24 lg:py-36 bg-dark-charcoal border-t border-dark-border">
        <div className="max-w-8xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <SectionLabel className="mb-6">Geographic Focus</SectionLabel>
              <h2 className="font-display text-[clamp(2rem,4vw,4rem)] font-black uppercase text-white leading-none mb-6">
                Urban to<br />
                <span className="text-orange">Global.</span>
              </h2>
              <p className="text-silver-dark leading-relaxed mb-8">
                Our distribution strategy prioritizes urban and semi-urban markets with high vehicle density
                and diverse weather conditions — the environments where wiper performance matters most.
                From these foundations, we are building toward international export capability.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Urban Markets', 'Semi-Urban Areas', 'Online Nationwide', 'Export Ready'].map((m) => (
                  <div key={m} className="flex items-center gap-2 text-sm text-silver-dark">
                    <span className="w-1.5 h-1.5 bg-orange rounded-full" />
                    {m}
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal grid grid-cols-2 gap-px bg-dark-border">
              {[
                { region: 'South India', status: 'Active' },
                { region: 'West India', status: 'Expanding' },
                { region: 'North India', status: 'Growing' },
                { region: 'East India', status: 'Developing' },
                { region: 'Online India', status: 'Active' },
                { region: 'Export', status: 'In Progress' },
              ].map((r) => (
                <div key={r.region} className="bg-dark-charcoal p-6 lg:p-8">
                  <div className="text-white font-bold text-sm mb-1">{r.region}</div>
                  <div className={`text-[10px] tracking-widest uppercase font-bold ${r.status === 'Active' ? 'text-orange' : 'text-silver-dark'}`}>
                    {r.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-dark-border text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-[clamp(2rem,4vw,4rem)] font-black uppercase text-white mb-6">
            Your Industry.<br />
            <span className="text-orange">Our Solution.</span>
          </h2>
          <p className="text-silver-dark mb-10">Reach out to discuss partnership and distribution opportunities.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/distribution" variant="primary" size="lg">Partner With Us</Button>
            <Button href="/contact" variant="secondary" size="lg">Get in Touch</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
