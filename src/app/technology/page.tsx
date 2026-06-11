'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

const technologies = [
  {
    id: 'teflon',
    number: '01',
    name: 'Teflon Coating Technology',
    subtitle: 'PTFE Surface Engineering',
    desc: 'Polytetrafluoroethylene — the same compound used in aerospace and medical instruments — is applied to the Bricado blade edge using a proprietary bonding process. This ultra-low-friction surface dramatically reduces the squealing and chattering common in standard wiper blades.',
    benefits: [
      'Up to 40% reduced blade wear versus uncoated alternatives',
      'Near-silent sweep operation',
      'Hydrophobic surface repels water more efficiently',
      'Maintains effectiveness through entire product lifespan',
      'UV-stable formulation prevents coating degradation',
    ],
  },
  {
    id: 'aero',
    number: '02',
    name: 'Aerodynamic Frame Design',
    subtitle: 'Wind-Tunnel Optimized Architecture',
    desc: 'The Bricado blade profile is shaped using computational fluid dynamics principles. Every curve, every angle is intentional — designed to generate positive downforce that keeps the blade pressed against the glass at highway speeds, eliminating the "wind lift" that causes poor contact and streaking.',
    benefits: [
      'Positive downforce generation at speeds above 100 km/h',
      'Wind resistance coefficient reduced by engineered spoiler geometry',
      'Consistent glass contact pressure in high-wind conditions',
      'Reduced drag means lower motor load on wiper system',
      'Profile tested across a range of vehicle configurations',
    ],
  },
  {
    id: 'pressure',
    number: '03',
    name: 'Multi-Point Pressure System',
    subtitle: 'Distributed Contact Engineering',
    desc: 'Conventional blades concentrate pressure at a few points along the blade length, causing uneven contact and missed areas. Bricado\'s pressure distribution system — engineered through precise spring tension calibration — maintains uniform force across the full blade width.',
    benefits: [
      'Uniform pressure across 100% of blade contact surface',
      'Eliminates "skipping" and unwiped areas',
      'Consistent performance regardless of windshield curvature',
      'Calibrated for optimal rubber compound contact angle',
      'Maintains pressure calibration throughout product life',
    ],
  },
  {
    id: 'rubber',
    number: '04',
    name: 'Natural Rubber Compound',
    subtitle: 'Precision Material Formulation',
    desc: 'The wiper rubber compound is formulated for optimum flexibility, durability, and glass compatibility. The edge profile is precision-formed to maintain a consistent contact angle throughout the sweep arc, ensuring streak-free performance in rain, snow, and light debris.',
    benefits: [
      'Temperature-stable formulation: effective from −10°C to +70°C',
      'Ozone and UV degradation resistance',
      'Road chemical resistance prevents compound breakdown',
      'Precision-formed edge maintains optimal contact angle',
      'Available in Teflon-coated variant for enhanced performance',
    ],
  },
  {
    id: 'mount',
    number: '05',
    name: 'Universal Mount System',
    subtitle: 'Multi-Vehicle Compatibility',
    desc: 'Bricado blades ship with a comprehensive multi-adapter mount system compatible with the most common wiper arm connection types used across Indian and global vehicle markets. Installation is tool-free and takes under 60 seconds.',
    benefits: [
      'Compatible with hook, pinch-tab, bayonet, and pin-top arm types',
      'Fits 95%+ of passenger vehicles in Indian market',
      'Tool-free installation under 60 seconds',
      'Secure positive-click engagement mechanism',
      'Vibration-resistant mounting under high-speed operation',
    ],
  },
  {
    id: 'weather',
    number: '06',
    name: 'All-Weather Engineering',
    subtitle: 'Environmental Durability System',
    desc: 'Bricado blades are engineered to function reliably across the full range of Indian climatic conditions — from monsoon rainfall to dry summer heat. Material selection, coating chemistry, and structural design all contribute to performance stability across environments.',
    benefits: [
      'Heavy monsoon rainfall — no streaking, no lift',
      'High summer heat — no rubber deformation',
      'Extended UV exposure resistance',
      'Road debris deflection in dusty conditions',
      'Compatible with wash/wipe and intermittent wiper modes',
    ],
  },
]

export default function TechnologyPage() {
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
      <section className="relative min-h-[80vh] flex items-end pb-20 pt-36 overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-orange/4 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-dark-deep to-transparent" />

        <div className="max-w-8xl mx-auto px-6 lg:px-10 relative z-10">
          <SectionLabel className="mb-8">Engineering Science</SectionLabel>
          <h1 className="font-display text-[clamp(3rem,9vw,10rem)] font-black uppercase leading-none text-white mb-8">
            The Science<br />
            Behind<br />
            <span className="text-orange">Every Wipe.</span>
          </h1>
          <p className="text-silver text-lg max-w-xl leading-relaxed">
            Six integrated engineering systems, each developed to address a specific performance challenge.
            Together, they deliver a wiper blade that outperforms in every measurable dimension.
          </p>
        </div>
      </section>

      {/* Engineering Philosophy */}
      <section className="py-24 border-t border-dark-border bg-dark-charcoal">
        <div className="max-w-8xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="reveal">
            <SectionLabel className="mb-6">Our Approach</SectionLabel>
            <h2 className="font-display text-3xl lg:text-4xl font-black uppercase text-white leading-none">
              Engineering<br />
              <span className="text-orange">Philosophy</span>
            </h2>
          </div>
          <div className="reveal lg:col-span-2 space-y-5 text-silver-dark leading-relaxed">
            <p>
              At Bricado, we approach wiper blade design from first principles. Rather than iterating on existing designs,
              our engineering philosophy asks: what performance outcomes does a driver actually need, and what
              engineering systems best deliver them?
            </p>
            <p>
              The answer defines everything — material selection, coating chemistry, pressure calibration, aerodynamic
              geometry, mount design. Every technical decision traces back to a driver performance outcome:
              clear visibility, silent operation, reliable performance, and long service life.
            </p>
            <p>
              This engineering-first approach is what separates Bricado from conventional automotive accessory manufacturers.
            </p>
          </div>
        </div>
      </section>

      {/* Technologies */}
      {technologies.map((tech, idx) => (
        <section
          key={tech.id}
          id={tech.id}
          className={`py-24 lg:py-36 border-t border-dark-border ${idx % 2 === 0 ? 'bg-dark-deep' : 'bg-dark-charcoal'}`}
        >
          <div className="max-w-8xl mx-auto px-6 lg:px-10">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
              <div className={`reveal ${idx % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-display text-7xl font-black text-orange/15">{tech.number}</span>
                </div>
                <div className="text-label text-[9px] text-orange tracking-widest mb-3">{tech.subtitle}</div>
                <h2 className="font-display text-[clamp(2rem,3.5vw,3.5rem)] font-black uppercase text-white leading-none mb-6">
                  {tech.name}
                </h2>
                <p className="text-silver-dark leading-relaxed mb-8">{tech.desc}</p>

                <ul className="space-y-3">
                  {tech.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-sm text-silver-dark">
                      <span className="text-orange mt-0.5 flex-shrink-0">→</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual panel */}
              <div className={`reveal ${idx % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="relative h-full min-h-[340px] overflow-hidden bg-dark-charcoal border border-dark-border">
                  {/* Use real images for teflon and aero, blade-hero for others */}
                  <Image
                    src={
                      tech.id === 'teflon' ? '/images/tech-teflon.jpg'
                      : tech.id === 'aero' || tech.id === 'pressure' ? '/images/blade-hero.jpg'
                      : tech.id === 'weather' ? '/images/windshield-rain.jpg'
                      : tech.id === 'rubber' ? '/images/product-advanced.jpg'
                      : '/images/manufacturing.jpg'
                    }
                    alt={tech.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-dark-deep/50" />
                  {/* Number overlay */}
                  <div className="absolute bottom-6 left-6">
                    <div className="font-display text-7xl font-black text-white/10 leading-none">{tech.number}</div>
                  </div>
                  <div className="absolute top-6 right-6">
                    <span className="text-[9px] font-bold tracking-widest uppercase bg-orange/90 text-dark-deep px-3 py-1.5">
                      {tech.subtitle}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-24 border-t border-dark-border text-center bg-dark-charcoal">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-[clamp(2rem,4vw,4rem)] font-black uppercase text-white mb-6">
            Technology<br />
            <span className="text-orange">In Every Blade.</span>
          </h2>
          <p className="text-silver-dark mb-10">
            Experience the engineering difference. Explore our product range.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/products" variant="primary" size="lg">View Products</Button>
            <Button href="/distribution" variant="secondary" size="lg">Become a Partner</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
