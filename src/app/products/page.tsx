'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    id: 'advanced',
    image: '/images/product-advanced.jpg',
    number: '01',
    name: 'Advanced Wiper Blades',
    tagline: 'The Flagship System',
    highlight: 'Cutting-Edge Performance',
    desc: 'The Advanced series represents the pinnacle of Bricado engineering. Combining Teflon coating, aerodynamic spoiler geometry, and multi-point pressure technology, these blades deliver exceptional clarity in all conditions.',
    specs: [
      { label: 'Coating', value: 'PTFE Teflon' },
      { label: 'Design', value: 'Aerodynamic Low-Profile' },
      { label: 'Mount', value: 'Universal Multi-Adapter' },
      { label: 'Weather', value: 'All-Season Rated' },
      { label: 'Sound', value: 'Near-Silent Operation' },
    ],
    features: ['Teflon Coating', 'Aerodynamic Spoiler', 'Silent Operation', 'All-Weather', 'Premium Materials', 'Long Life'],
  },
  {
    id: 'flat',
    image: '/images/product-flat.jpg',
    number: '02',
    name: 'Flat Wiper Blades',
    tagline: 'Modern Frameless Design',
    highlight: 'Contemporary Engineering',
    desc: 'Flat blades eliminate the traditional metal frame, distributing pressure evenly along the entire blade length. The result is a more uniform contact with the windshield, reduced drag, and a sleek visual profile.',
    specs: [
      { label: 'Architecture', value: 'Frameless Flat' },
      { label: 'Pressure', value: 'Uniform Distribution' },
      { label: 'Profile', value: 'Low-Drag Design' },
      { label: 'Install', value: 'Tool-Free Clip System' },
      { label: 'Style', value: 'Modern Aesthetic' },
    ],
    features: ['Frameless Design', 'Even Pressure', 'Low Profile', 'Premium Look', 'Easy Install', 'Quiet'],
  },
  {
    id: 'hybrid',
    image: '/images/product-hybrid.jpg',
    number: '03',
    name: 'Hybrid Wiper Blades',
    tagline: 'Fusion Engineering',
    highlight: 'Best of Both Worlds',
    desc: 'The Hybrid line merges the structural integrity of a conventional metal frame with the performance benefits of flat blade technology. An outer aerodynamic shell protects internal components from ice, dirt, and debris.',
    specs: [
      { label: 'Structure', value: 'Protected Metal Frame' },
      { label: 'Shell', value: 'Aerodynamic Cover' },
      { label: 'Durability', value: 'Enhanced Lifespan' },
      { label: 'Weather', value: 'Ice & Debris Resistant' },
      { label: 'Performance', value: 'Streak-Free' },
    ],
    features: ['Protected Frame', 'Aero Shell', 'Extended Life', 'Debris Resistant', 'Strong Pressure', 'Streak-Free'],
  },
  {
    id: 'conventional',
    image: '/images/product-conventional.jpg',
    number: '04',
    name: 'Conventional Wipers',
    tagline: 'Proven Classic Design',
    highlight: 'Time-Tested Reliability',
    desc: 'The Conventional line brings Bricado quality to the traditional metal-frame format. Engineered to modern standards with quality rubber compounds and precision pressure calibration for effective wiping across all vehicle types.',
    specs: [
      { label: 'Architecture', value: 'Classic Metal Frame' },
      { label: 'Compatibility', value: 'Universal Wide Range' },
      { label: 'Value', value: 'Cost-Effective' },
      { label: 'Performance', value: 'Reliable & Effective' },
      { label: 'Range', value: 'Full Size Coverage' },
    ],
    features: ['Universal Fit', 'Classic Design', 'Wide Range', 'Cost Effective', 'Reliable', 'Easy Replace'],
  },
]

const comparison = [
  { feature: 'Teflon Coating', advanced: true, flat: false, hybrid: false, conventional: false },
  { feature: 'Aerodynamic Design', advanced: true, flat: true, hybrid: true, conventional: false },
  { feature: 'Frameless Build', advanced: false, flat: true, hybrid: false, conventional: false },
  { feature: 'Protective Shell', advanced: false, flat: false, hybrid: true, conventional: false },
  { feature: 'Universal Mount', advanced: true, flat: true, hybrid: true, conventional: true },
  { feature: 'All-Weather', advanced: true, flat: true, hybrid: true, conventional: false },
  { feature: 'Silent Operation', advanced: true, flat: true, hybrid: false, conventional: false },
]

export default function ProductsPage() {
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
      <section className="relative min-h-[70vh] flex items-end pb-20 pt-36 overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-dark-deep to-transparent" />

        <div className="max-w-8xl mx-auto px-6 lg:px-10 relative z-10">
          <SectionLabel className="mb-8">Product Range</SectionLabel>
          <h1 className="font-display text-[clamp(3rem,9vw,10rem)] font-black uppercase leading-none text-white mb-8">
            Engineering<br />
            That <span className="text-orange">Clears</span><br />
            The Path.
          </h1>
          <p className="text-silver text-lg max-w-lg leading-relaxed">
            Four specialized blade systems. One engineering philosophy.
            Every Bricado product is built to deliver superior performance over conventional alternatives.
          </p>
        </div>
      </section>

      {/* Products */}
      {products.map((product, idx) => (
        <section
          key={product.id}
          id={product.id}
          className={`py-24 lg:py-36 border-t border-dark-border ${idx % 2 === 0 ? 'bg-dark-deep' : 'bg-dark-charcoal'}`}
        >
          <div className="max-w-8xl mx-auto px-6 lg:px-10">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
              {/* Content */}
              <div className={`reveal ${idx % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-display text-6xl font-black text-orange/20">{product.number}</span>
                  <div>
                    <div className="text-label text-[9px] text-orange tracking-widest">{product.highlight}</div>
                    <div className="text-silver-dark text-sm">{product.tagline}</div>
                  </div>
                </div>
                <h2 className="font-display text-[clamp(2rem,4vw,4rem)] font-black uppercase text-white leading-none mb-6">
                  {product.name}
                </h2>
                <p className="text-silver-dark leading-relaxed mb-8">{product.desc}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {product.features.map((f) => (
                    <span key={f} className="text-[9px] font-bold tracking-wider uppercase px-3 py-1.5 border border-dark-muted text-silver-dark hover:border-orange hover:text-orange transition-colors duration-200">
                      {f}
                    </span>
                  ))}
                </div>

                {/* Specs */}
                <div className="space-y-2">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between py-2 border-b border-dark-border">
                      <span className="text-silver-dark text-xs tracking-wide">{spec.label}</span>
                      <span className="text-white text-xs font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual */}
              <div className={`reveal ${idx % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-dark-deep">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Subtle dark vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/60 via-transparent to-transparent" />
                  {/* Product label overlay */}
                  <div className="absolute bottom-5 left-5">
                    <div className="text-label text-[9px] text-orange tracking-widest mb-1">{product.tagline}</div>
                    <div className="font-display text-xl font-black uppercase text-white">{product.name}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Comparison Table */}
      <section className="py-24 lg:py-36 bg-dark-charcoal border-t border-dark-border">
        <div className="max-w-8xl mx-auto px-6 lg:px-10">
          <SectionLabel className="mb-6">Performance Comparison</SectionLabel>
          <h2 className="reveal font-display text-[clamp(2rem,4vw,4rem)] font-black uppercase text-white leading-none mb-16">
            Choose Your<br />
            <span className="text-orange">Engineering Level.</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left py-4 pr-8 text-label text-[10px] text-silver-dark">Feature</th>
                  {['Advanced', 'Flat', 'Hybrid', 'Conventional'].map((p) => (
                    <th key={p} className="text-center py-4 px-4 font-display text-lg font-black uppercase text-white">
                      {p}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-dark-border ${i % 2 === 0 ? 'bg-dark-deep/30' : ''}`}>
                    <td className="py-4 pr-8 text-sm text-silver-dark">{row.feature}</td>
                    {(['advanced', 'flat', 'hybrid', 'conventional'] as const).map((key) => (
                      <td key={key} className="text-center py-4 px-4">
                        {row[key] ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-orange/20 text-orange text-xs">✓</span>
                        ) : (
                          <span className="inline-block w-4 h-px bg-dark-border" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-dark-border text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-[clamp(2rem,4vw,4rem)] font-black uppercase text-white mb-6">
            Ready to Partner<br />
            <span className="text-orange">With Bricado?</span>
          </h2>
          <p className="text-silver-dark mb-10">Distribution, dealership, and wholesale inquiries welcome.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/distribution" variant="primary" size="lg">Distribution Inquiry</Button>
            <Button href="/contact" variant="secondary" size="lg">Contact Us</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
