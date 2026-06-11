'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'

gsap.registerPlugin(ScrollTrigger)

const values = [
  { title: 'Precision', desc: 'Every blade is engineered to exacting tolerances for consistent, reliable performance.' },
  { title: 'Innovation', desc: 'Continuous R&D drives us to integrate the latest materials and engineering advances.' },
  { title: 'Reliability', desc: 'Built to perform in the harshest Indian roads and weather conditions.' },
  { title: 'Safety', desc: 'Clear visibility is a safety imperative. We treat every product as a life-critical component.' },
]

const milestones = [
  { year: 'Origin', event: 'Bricado founded with a vision to transform Indian automotive accessory standards' },
  { year: 'R&D', event: 'Teflon coating technology integrated into blade manufacturing process' },
  { year: 'Launch', event: 'First commercial product line released to Indian automotive market' },
  { year: 'Expansion', event: 'Distribution network extended to dealerships and fleet operators nationwide' },
  { year: 'Future', event: 'Global export readiness — premium products for international markets' },
]

export default function AboutPage() {
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
      <section className="relative min-h-screen flex items-end pb-20 lg:pb-32 pt-32 overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-radial from-orange/5 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-dark-deep to-transparent" />

        <div className="max-w-8xl mx-auto px-6 lg:px-10 relative z-10">
          <SectionLabel className="mb-8">Our Story</SectionLabel>
          <h1 className="font-display text-[clamp(3.5rem,10vw,11rem)] font-black uppercase leading-none text-white mb-8">
            Born to<br />
            <span className="text-orange">Engineer</span><br />
            Clarity.
          </h1>
          <p className="text-silver text-lg lg:text-xl max-w-xl leading-relaxed">
            Bricado was established with one conviction: every driver deserves premium-grade wiper performance,
            not just owners of premium vehicles.
          </p>
        </div>

        {/* Decorative logo mark */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block opacity-10">
          <Image src="/logo-icon.png" alt="" width={300} height={300} className="w-64 h-auto object-contain" aria-hidden="true" />
        </div>
      </section>

      {/* Intro split */}
      <section className="py-24 lg:py-36 border-t border-dark-border">
        <div className="max-w-8xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="reveal">
            <SectionLabel className="mb-6">Introduction</SectionLabel>
            <h2 className="font-display text-[clamp(2.5rem,4vw,4rem)] font-black uppercase text-white leading-none mb-8">
              India's Advanced<br />
              <span className="text-orange">Wiper Engineering</span>
            </h2>
            <div className="space-y-5 text-silver-dark leading-relaxed">
              <p>
                Bricado is an India-based automotive technology company specializing in the design and
                manufacture of advanced wiper blade systems. Our products are built to outperform market
                standards in durability, silence, and all-weather reliability.
              </p>
              <p>
                We produce a wide range of wiper blade categories — from flagship Advanced series to
                Flat, Hybrid, and Conventional lines — each designed with proprietary engineering solutions
                that elevate driving safety across every vehicle segment.
              </p>
              <p>
                With innovation and uncompromising quality as our operating principles, Bricado is building
                a reputation that extends beyond product lines into genuine automotive trust.
              </p>
            </div>
          </div>

          {/* Visual block — founder */}
          <div className="reveal relative">
            <div className="bg-dark-charcoal border border-dark-border overflow-hidden">
              {/* Founder photo */}
              <div className="relative h-72 lg:h-80 w-full">
                <Image
                  src="/images/founder.jpg"
                  alt="Muhammed Safvan AK — Founder & CEO, Bricado"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-charcoal via-transparent to-transparent" />
              </div>
              {/* Quote */}
              <div className="p-8 lg:p-10 -mt-2">
                <div className="font-display text-5xl font-black text-orange/20 leading-none mb-3">&#8220;</div>
                <blockquote className="font-display text-xl lg:text-2xl font-bold uppercase text-white leading-tight mb-6">
                  "Clear Vision is not a feature.<br />
                  <span className="text-orange">It is a safety standard."</span>
                </blockquote>
                <div className="flex items-center gap-3 pt-5 border-t border-dark-border">
                  <div>
                    <div className="text-white font-bold text-sm">Muhammed Safvan AK</div>
                    <div className="text-orange text-xs tracking-widest uppercase">Founder & CEO, Bricado</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 lg:py-36 bg-dark-charcoal border-t border-b border-dark-border">
        <div className="max-w-8xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-dark-border">
            <div className="reveal bg-dark-charcoal p-12 lg:p-16">
              <div className="text-label text-[10px] text-orange tracking-widest mb-6">Mission</div>
              <h3 className="font-display text-3xl lg:text-4xl font-black uppercase text-white mb-6 leading-none">
                To Elevate<br />
                Road Safety Through<br />
                <span className="text-orange">Engineering Excellence</span>
              </h3>
              <p className="text-silver-dark leading-relaxed">
                We exist to provide every driver — regardless of vehicle category — with access to
                automotive-grade wiper technology that delivers clear, safe vision in every condition.
              </p>
            </div>
            <div className="reveal bg-dark-graphite p-12 lg:p-16">
              <div className="text-label text-[10px] text-orange tracking-widest mb-6">Vision</div>
              <h3 className="font-display text-3xl lg:text-4xl font-black uppercase text-white mb-6 leading-none">
                To Become India's<br />
                Most Trusted<br />
                <span className="text-orange">Automotive Partner</span>
              </h3>
              <p className="text-silver-dark leading-relaxed">
                Our vision is to establish Bricado as the benchmark brand in automotive wiper systems —
                both across India and in international markets — recognized for precision, reliability,
                and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 lg:py-36">
        <div className="max-w-8xl mx-auto px-6 lg:px-10">
          <SectionLabel className="mb-6">Core Values</SectionLabel>
          <h2 className="reveal font-display text-[clamp(2.5rem,5vw,5rem)] font-black uppercase text-white leading-none mb-16">
            What Drives<br />
            <span className="text-orange">Our Engineering.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-dark-border">
            {values.map((v, i) => (
              <div key={v.title} className="reveal bg-dark-charcoal p-8 lg:p-10 group hover:bg-dark-graphite transition-colors duration-300">
                <div className="font-display text-5xl font-black text-dark-muted mb-6">
                  0{i + 1}
                </div>
                <h3 className="font-display text-2xl font-black uppercase text-white mb-4 group-hover:text-orange transition-colors duration-300">
                  {v.title}
                </h3>
                <p className="text-silver-dark text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing section */}
      <section className="relative h-[50vh] overflow-hidden border-t border-dark-border">
        <Image
          src="/images/manufacturing.jpg"
          alt="Bricado manufacturing facility — precision wiper blade production"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-dark-deep/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <SectionLabel className="mb-4 justify-center" color="silver">Manufacturing Excellence</SectionLabel>
          <h2 className="font-display text-[clamp(2rem,5vw,5rem)] font-black uppercase text-white leading-none">
            Engineered in <span className="text-orange">India.</span>
          </h2>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 lg:py-36 bg-dark-charcoal border-t border-dark-border">
        <div className="max-w-8xl mx-auto px-6 lg:px-10">
          <SectionLabel className="mb-6">Our Journey</SectionLabel>
          <h2 className="reveal font-display text-[clamp(2.5rem,5vw,5rem)] font-black uppercase text-white leading-none mb-16">
            The Bricado<br />
            <span className="text-orange">Story.</span>
          </h2>
          <div className="relative">
            <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-dark-border transform lg:-translate-x-1/2" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div key={m.year} className={`reveal flex flex-col lg:flex-row gap-8 ${i % 2 === 0 ? 'lg:pr-[50%]' : 'lg:pl-[50%] lg:flex-row-reverse'}`}>
                  <div className={`flex flex-col gap-2 ${i % 2 === 0 ? 'lg:items-end lg:text-right' : 'lg:items-start'}`}>
                    <div className="inline-flex items-center gap-3 bg-orange px-4 py-2">
                      <span className="font-display text-lg font-black uppercase text-dark-deep">{m.year}</span>
                    </div>
                    <p className="text-silver-dark text-sm leading-relaxed max-w-sm">{m.event}</p>
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
            Partner With<br />
            <span className="text-orange">Bricado.</span>
          </h2>
          <p className="text-silver-dark mb-10">
            Join our growing network of dealerships, service centers, and fleet operators.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/distribution" variant="primary" size="lg">Become a Partner</Button>
            <Button href="/contact" variant="secondary" size="lg">Get in Touch</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
