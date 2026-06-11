'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const inquiryTypes = [
  'Product Information',
  'Dealership / Distribution',
  'Wholesale Inquiry',
  'Fleet Solutions',
  'Export / International',
  'Media / Press',
  'General Inquiry',
]

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', type: '', subject: '', message: '',
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
      <section className="relative min-h-[60vh] flex items-end pb-20 pt-36 overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-orange/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-dark-deep to-transparent" />

        <div className="max-w-8xl mx-auto px-6 lg:px-10 relative z-10">
          <SectionLabel className="mb-8">Get in Touch</SectionLabel>
          <h1 className="font-display text-[clamp(3rem,8vw,9rem)] font-black uppercase leading-none text-white mb-8">
            Let's<br />
            <span className="text-orange">Connect.</span>
          </h1>
          <p className="text-silver text-lg max-w-md leading-relaxed">
            Whether you're inquiring about products, partnerships, or distribution,
            our team is ready to assist.
          </p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="py-24 border-t border-dark-border">
        <div className="max-w-8xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12">
            {/* Contact info */}
            <div className="reveal space-y-8">
              <div>
                <h2 className="font-display text-3xl font-black uppercase text-white mb-6">
                  Contact<br />
                  <span className="text-orange">Information</span>
                </h2>
              </div>

              {/* Info cards */}
              <div className="space-y-4">
                <div className="border border-dark-border p-6 group hover:border-orange/40 transition-colors duration-300">
                  <div className="text-label text-[9px] text-orange tracking-widest mb-3">PHONE</div>
                  <a href="tel:+917025575112" className="text-white font-bold hover:text-orange transition-colors duration-200 text-lg">
                    +91 7025 575 112
                  </a>
                  <p className="text-silver-dark text-xs mt-1">Available Mon–Sat, 9am–6pm IST</p>
                </div>

                <div className="border border-dark-border p-6 group hover:border-orange/40 transition-colors duration-300">
                  <div className="text-label text-[9px] text-orange tracking-widest mb-3">EMAIL</div>
                  <a href="mailto:info.bricado@gmail.com" className="text-white font-bold hover:text-orange transition-colors duration-200">
                    info.bricado@gmail.com
                  </a>
                  <p className="text-silver-dark text-xs mt-1">We respond within 48 business hours</p>
                </div>

                <div className="border border-dark-border p-6">
                  <div className="text-label text-[9px] text-orange tracking-widest mb-3">WEBSITE</div>
                  <p className="text-white font-bold">www.bricado.com</p>
                </div>

                <div className="border border-dark-border p-6">
                  <div className="text-label text-[9px] text-orange tracking-widest mb-3">HEADQUARTERS</div>
                  <p className="text-white font-bold">India</p>
                  <p className="text-silver-dark text-xs mt-1">Manufacturing & Distribution</p>
                </div>
              </div>

              {/* Quick links */}
              <div className="pt-4">
                <div className="text-label text-[9px] text-silver-dark tracking-widest mb-4">QUICK LINKS</div>
                <div className="space-y-2">
                  {[
                    { label: 'Distribution Inquiry', href: '/distribution' },
                    { label: 'Product Catalog', href: '/products' },
                    { label: 'Technology Overview', href: '/technology' },
                    { label: 'About Bricado', href: '/about' },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-silver-dark hover:text-orange transition-colors duration-200"
                    >
                      <span className="text-orange text-xs">→</span>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="reveal lg:col-span-2">
              {submitted ? (
                <div className="bg-dark-charcoal border border-orange/30 p-16 text-center min-h-[500px] flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-orange/20 rounded-full flex items-center justify-center mb-6">
                    <span className="text-orange text-2xl">✓</span>
                  </div>
                  <h3 className="font-display text-3xl font-black uppercase text-white mb-4">Message Sent</h3>
                  <p className="text-silver-dark max-w-sm text-center">
                    Thank you for reaching out to Bricado. We'll respond to your inquiry within 48 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-xs font-bold tracking-widest uppercase text-orange hover:text-orange-light transition-colors duration-200"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-label text-[9px] text-silver-dark tracking-widest block mb-2">Full Name *</label>
                      <input
                        type="text" name="name" required value={formData.name} onChange={handleChange}
                        className="w-full bg-dark-charcoal border border-dark-border text-white text-sm px-4 py-3.5 focus:border-orange focus:outline-none transition-colors duration-200 placeholder:text-dark-muted"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="text-label text-[9px] text-silver-dark tracking-widest block mb-2">Email Address *</label>
                      <input
                        type="email" name="email" required value={formData.email} onChange={handleChange}
                        className="w-full bg-dark-charcoal border border-dark-border text-white text-sm px-4 py-3.5 focus:border-orange focus:outline-none transition-colors duration-200 placeholder:text-dark-muted"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-label text-[9px] text-silver-dark tracking-widest block mb-2">Phone Number</label>
                      <input
                        type="tel" name="phone" value={formData.phone} onChange={handleChange}
                        className="w-full bg-dark-charcoal border border-dark-border text-white text-sm px-4 py-3.5 focus:border-orange focus:outline-none transition-colors duration-200 placeholder:text-dark-muted"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <label className="text-label text-[9px] text-silver-dark tracking-widest block mb-2">Inquiry Type</label>
                      <select
                        name="type" value={formData.type} onChange={handleChange}
                        className="w-full bg-dark-charcoal border border-dark-border text-white text-sm px-4 py-3.5 focus:border-orange focus:outline-none transition-colors duration-200"
                      >
                        <option value="">Select type...</option>
                        {inquiryTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-label text-[9px] text-silver-dark tracking-widest block mb-2">Subject *</label>
                    <input
                      type="text" name="subject" required value={formData.subject} onChange={handleChange}
                      className="w-full bg-dark-charcoal border border-dark-border text-white text-sm px-4 py-3.5 focus:border-orange focus:outline-none transition-colors duration-200 placeholder:text-dark-muted"
                      placeholder="Brief subject of your inquiry"
                    />
                  </div>

                  <div>
                    <label className="text-label text-[9px] text-silver-dark tracking-widest block mb-2">Message *</label>
                    <textarea
                      name="message" required value={formData.message} onChange={handleChange} rows={6}
                      className="w-full bg-dark-charcoal border border-dark-border text-white text-sm px-4 py-3.5 focus:border-orange focus:outline-none transition-colors duration-200 resize-none placeholder:text-dark-muted"
                      placeholder="Describe your inquiry in detail — product requirements, business type, volumes, or any questions you have..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <button
                      type="submit"
                      className="bg-orange text-dark-deep text-xs font-black tracking-widest uppercase px-10 py-4 hover:bg-orange-light transition-all duration-300 hover:shadow-xl hover:shadow-orange/20"
                    >
                      Send Message
                    </button>
                    <p className="text-[10px] text-silver-dark self-center">
                      We respond within 48 business hours.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="py-24 bg-dark-charcoal border-t border-dark-border">
        <div className="max-w-8xl mx-auto px-6 lg:px-10">
          <div className="bg-dark-deep border border-dark-border h-64 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 grid-lines opacity-30" />
            <div className="relative text-center">
              <div className="text-orange text-3xl mb-3">◎</div>
              <div className="font-display text-xl font-black uppercase text-white">India</div>
              <div className="text-silver-dark text-sm mt-1">Manufacturing & Distribution Headquarters</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
