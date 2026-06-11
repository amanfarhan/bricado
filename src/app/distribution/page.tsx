'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const partnerTypes = [
  {
    id: 'dealership',
    title: 'Automotive Dealership',
    desc: 'Authorized dealerships supplying wiper blades as part of routine service and customer sales.',
    includes: ['Branded product supply', 'Competitive wholesale pricing', 'Merchandising support', 'Sales training materials'],
  },
  {
    id: 'service',
    title: 'Service Center',
    desc: 'Authorized service centers integrating Bricado blades into standard maintenance and replacement cycles.',
    includes: ['Bulk order programs', 'SKU management support', 'Technical product guides', 'Reorder systems'],
  },
  {
    id: 'retailer',
    title: 'Auto Parts Retailer',
    desc: 'Auto parts shops and automotive accessory stores carrying Bricado products for walk-in customers.',
    includes: ['Display and POS materials', 'Retail pricing guidance', 'Product range selection', 'Regular replenishment'],
  },
  {
    id: 'wholesale',
    title: 'Wholesale Distributor',
    id_key: 'wholesale',
    desc: 'Regional wholesale distributors supplying Bricado products to a network of retail and service points.',
    includes: ['Exclusive regional agreements available', 'Volume-based pricing tiers', 'Full product catalog access', 'Logistics coordination'],
  },
  {
    id: 'fleet',
    title: 'Fleet Partnership',
    desc: 'Taxi companies, logistics operators, and corporate fleet managers requiring reliable bulk supply.',
    includes: ['Custom supply contracts', 'Multi-size fleet packs', 'Scheduled delivery programs', 'Fleet account management'],
  },
  {
    id: 'export',
    title: 'Export / International',
    desc: 'International distributors and importers bringing Bricado products to markets outside India.',
    includes: ['Export documentation support', 'Private-label options', 'Climate-variant products', 'International quality certifications'],
  },
]

const whyPartner = [
  { title: 'Premium Quality', desc: 'Products that enhance your brand reputation with customers.' },
  { title: 'Competitive Pricing', desc: 'Wholesale pricing structures that support healthy margins.' },
  { title: 'Reliable Supply', desc: 'Consistent inventory availability for your business needs.' },
  { title: 'Marketing Support', desc: 'Branding and sales materials to help you move product.' },
  { title: 'Technical Training', desc: 'Product knowledge resources for your team.' },
  { title: 'Dedicated Support', desc: 'A direct Bricado contact for your account.' },
]

export default function DistributionPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: '', company: '', type: '', email: '', phone: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

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
        <div className="absolute top-0 left-0 w-[600px] h-[500px] bg-orange/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-dark-deep to-transparent" />

        <div className="max-w-8xl mx-auto px-6 lg:px-10 relative z-10">
          <SectionLabel className="mb-8">Partnership Program</SectionLabel>
          <h1 className="font-display text-[clamp(3rem,9vw,10rem)] font-black uppercase leading-none text-white mb-8">
            Become a<br />
            Bricado<br />
            <span className="text-orange">Partner.</span>
          </h1>
          <p className="text-silver text-lg max-w-xl leading-relaxed">
            Join a growing network of automotive businesses across India distributing premium
            Bricado wiper blade systems. Competitive programs for every partner type.
          </p>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-24 border-t border-dark-border bg-dark-charcoal">
        <div className="max-w-8xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-16">
            <div>
              <SectionLabel className="mb-6">Why Partner</SectionLabel>
              <h2 className="reveal font-display text-[clamp(2rem,4vw,4rem)] font-black uppercase text-white leading-none">
                Built for<br />
                <span className="text-orange">Business.</span>
              </h2>
            </div>
            <div className="reveal lg:col-span-2 grid grid-cols-2 gap-px bg-dark-border">
              {whyPartner.map((item) => (
                <div key={item.title} className="bg-dark-charcoal p-6 lg:p-8 group hover:bg-dark-graphite transition-colors duration-300">
                  <h4 className="font-display text-lg font-black uppercase text-white mb-2 group-hover:text-orange transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-silver-dark text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-24 border-t border-dark-border">
        <div className="max-w-8xl mx-auto px-6 lg:px-10">
          <SectionLabel className="mb-6">Partnership Tiers</SectionLabel>
          <h2 className="reveal font-display text-[clamp(2rem,4vw,4rem)] font-black uppercase text-white leading-none mb-16">
            Find Your<br />
            <span className="text-orange">Partnership Model.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-dark-border">
            {partnerTypes.map((pt) => (
              <div key={pt.id} className="reveal bg-dark-charcoal p-8 lg:p-10 group hover:bg-dark-graphite transition-colors duration-500">
                <h3 className="font-display text-2xl font-black uppercase text-white mb-4 group-hover:text-orange transition-colors duration-300">
                  {pt.title}
                </h3>
                <p className="text-silver-dark text-sm leading-relaxed mb-6">{pt.desc}</p>
                <ul className="space-y-2">
                  {pt.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-silver-dark">
                      <span className="text-orange flex-shrink-0 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry" className="py-24 bg-dark-charcoal border-t border-dark-border">
        <div className="max-w-8xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="reveal">
              <SectionLabel className="mb-6">Partner Inquiry</SectionLabel>
              <h2 className="font-display text-[clamp(2rem,4vw,4rem)] font-black uppercase text-white leading-none mb-6">
                Start the<br />
                <span className="text-orange">Conversation.</span>
              </h2>
              <p className="text-silver-dark leading-relaxed mb-8">
                Tell us about your business and we'll get back to you within 48 hours with
                a tailored partnership proposal.
              </p>
              <div className="space-y-4">
                <a href="tel:+917025575112" className="flex items-center gap-4 text-silver-dark hover:text-orange transition-colors duration-200">
                  <span className="text-label text-[9px] text-orange w-12">PHONE</span>
                  +91 7025 575 112
                </a>
                <a href="mailto:info.bricado@gmail.com" className="flex items-center gap-4 text-silver-dark hover:text-orange transition-colors duration-200">
                  <span className="text-label text-[9px] text-orange w-12">EMAIL</span>
                  info.bricado@gmail.com
                </a>
              </div>
            </div>

            <div className="reveal">
              {submitted ? (
                <div className="bg-dark-graphite border border-orange/30 p-12 text-center">
                  <div className="text-orange text-4xl mb-4">✓</div>
                  <h3 className="font-display text-2xl font-black uppercase text-white mb-3">Inquiry Received</h3>
                  <p className="text-silver-dark">Thank you for your interest. Our partnership team will contact you within 48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-label text-[9px] text-silver-dark tracking-widest block mb-2">Full Name *</label>
                      <input
                        type="text" name="name" required value={formData.name} onChange={handleChange}
                        className="w-full bg-dark-deep border border-dark-border text-white text-sm px-4 py-3 focus:border-orange focus:outline-none transition-colors duration-200"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="text-label text-[9px] text-silver-dark tracking-widest block mb-2">Company *</label>
                      <input
                        type="text" name="company" required value={formData.company} onChange={handleChange}
                        className="w-full bg-dark-deep border border-dark-border text-white text-sm px-4 py-3 focus:border-orange focus:outline-none transition-colors duration-200"
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-label text-[9px] text-silver-dark tracking-widest block mb-2">Partnership Type *</label>
                    <select
                      name="type" required value={formData.type} onChange={handleChange}
                      className="w-full bg-dark-deep border border-dark-border text-white text-sm px-4 py-3 focus:border-orange focus:outline-none transition-colors duration-200"
                    >
                      <option value="">Select type...</option>
                      <option value="dealership">Automotive Dealership</option>
                      <option value="service">Service Center</option>
                      <option value="retailer">Auto Parts Retailer</option>
                      <option value="wholesale">Wholesale Distributor</option>
                      <option value="fleet">Fleet Operator</option>
                      <option value="export">Export / International</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-label text-[9px] text-silver-dark tracking-widest block mb-2">Email *</label>
                      <input
                        type="email" name="email" required value={formData.email} onChange={handleChange}
                        className="w-full bg-dark-deep border border-dark-border text-white text-sm px-4 py-3 focus:border-orange focus:outline-none transition-colors duration-200"
                        placeholder="email@company.com"
                      />
                    </div>
                    <div>
                      <label className="text-label text-[9px] text-silver-dark tracking-widest block mb-2">Phone</label>
                      <input
                        type="tel" name="phone" value={formData.phone} onChange={handleChange}
                        className="w-full bg-dark-deep border border-dark-border text-white text-sm px-4 py-3 focus:border-orange focus:outline-none transition-colors duration-200"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-label text-[9px] text-silver-dark tracking-widest block mb-2">Message</label>
                    <textarea
                      name="message" value={formData.message} onChange={handleChange} rows={4}
                      className="w-full bg-dark-deep border border-dark-border text-white text-sm px-4 py-3 focus:border-orange focus:outline-none transition-colors duration-200 resize-none"
                      placeholder="Tell us about your business, volume requirements, and any questions..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange text-dark-deep text-xs font-black tracking-widest uppercase py-4 hover:bg-orange-light transition-all duration-300 hover:shadow-lg hover:shadow-orange/20"
                  >
                    Submit Partnership Inquiry
                  </button>

                  <p className="text-[10px] text-silver-dark text-center">
                    We respond within 48 business hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
