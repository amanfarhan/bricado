'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    id: 'aerodynamic',
    label: 'Aerodynamic Frame',
    desc: 'Low-profile design reduces wind lift at high speeds',
    x: '72%', y: '22%',
    lineX2: '60%', lineY2: '38%',
  },
  {
    id: 'teflon',
    label: 'Teflon Coating',
    desc: 'Premium PTFE coating for silent, smooth operation',
    x: '75%', y: '55%',
    lineX2: '60%', lineY2: '52%',
  },
  {
    id: 'rubber',
    label: 'Natural Rubber Compound',
    desc: 'Precision-formed edge delivers streak-free contact',
    x: '10%', y: '72%',
    lineX2: '30%', lineY2: '60%',
  },
  {
    id: 'mount',
    label: 'Universal Mount',
    desc: 'Multi-adapter system fits 95%+ of vehicle models',
    x: '8%', y: '30%',
    lineX2: '28%', lineY2: '40%',
  },
]

export function EngineeringSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.eng-label',
        { opacity: 0, x: (i) => (i % 2 === 0 ? 30 : -30) },
        {
          opacity: 1, x: 0, duration: 0.8, stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      )
      gsap.fromTo('.eng-line',
        { strokeDashoffset: 80 },
        {
          strokeDashoffset: 0, duration: 1, stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      )
      gsap.fromTo('.eng-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )
      gsap.fromTo('.blade-svg',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-dark-charcoal py-24 lg:py-36 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 grid-lines opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-border to-transparent" />

      <div className="max-w-8xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 lg:mb-24 max-w-2xl">
          <SectionLabel className="mb-6">Engineering Excellence</SectionLabel>
          <h2 className="eng-heading font-display text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase text-white leading-none">
            Precision<br />
            <span className="text-orange">Engineered.</span><br />
            Every Detail.
          </h2>
        </div>

        {/* Product visualization */}
        <div className="blade-svg relative w-full overflow-hidden" style={{ height: 'clamp(400px, 60vh, 600px)' }}>
          {/* Real blade hero image */}
          <Image
            src="/images/blade-hero.jpg"
            alt="Bricado Advanced Wiper Blade — precision engineering"
            fill
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
          {/* Subtle dark edge fade */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark-charcoal via-transparent to-dark-charcoal pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-charcoal to-transparent pointer-events-none" />

          {/* Feature labels */}
          <div className="eng-label absolute top-6 right-[4%] text-right max-w-[180px]">
            <div className="text-orange text-[10px] tracking-widest uppercase font-bold mb-1">Aerodynamic Frame</div>
            <div className="text-silver-dark text-xs leading-relaxed">Low-profile design minimizes wind resistance</div>
          </div>
          <div className="eng-label absolute bottom-8 right-[4%] text-right max-w-[180px]">
            <div className="text-orange text-[10px] tracking-widest uppercase font-bold mb-1">Teflon Coating</div>
            <div className="text-silver-dark text-xs leading-relaxed">PTFE surface for silent, smooth operation</div>
          </div>
          <div className="eng-label absolute bottom-8 left-[2%] text-left max-w-[180px]">
            <div className="text-orange text-[10px] tracking-widest uppercase font-bold mb-1">Natural Rubber</div>
            <div className="text-silver-dark text-xs leading-relaxed">Precision compound edge, streak-free contact</div>
          </div>
          <div className="eng-label absolute top-6 left-[2%] text-left max-w-[180px]">
            <div className="text-orange text-[10px] tracking-widest uppercase font-bold mb-1">Universal Mount</div>
            <div className="text-silver-dark text-xs leading-relaxed">Multi-adapter for 95%+ vehicle models</div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-px bg-dark-border">
          {[
            { value: '4+', label: 'Product Lines' },
            { value: '100+', label: 'Vehicle Models' },
            { value: '360°', label: 'All-Weather' },
            { value: '∞', label: 'Engineering Precision' },
          ].map((stat) => (
            <div key={stat.label} className="bg-dark-charcoal p-8 lg:p-10 text-center">
              <div className="font-display text-4xl lg:text-5xl font-black text-orange mb-2">{stat.value}</div>
              <div className="text-label text-[10px] text-silver-dark tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
