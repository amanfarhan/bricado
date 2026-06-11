'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const techs = [
  {
    id: '01',
    title: 'Teflon Coating',
    subtitle: 'PTFE Surface Technology',
    desc: 'A premium PTFE (Polytetrafluoroethylene) coating applied to the wiper blade edge reduces friction dramatically, enabling whisper-quiet operation and extending blade lifespan by up to 40% compared to uncoated blades.',
    icon: '◈',
  },
  {
    id: '02',
    title: 'Aerodynamic Design',
    subtitle: 'Wind-Tunnel Engineering',
    desc: 'Every curve of the Bricado blade profile is shaped for minimum drag. The low-profile spoiler design generates downforce at highway speeds, ensuring constant glass contact and eliminating wind lift.',
    icon: '◇',
  },
  {
    id: '03',
    title: 'Silent Performance',
    subtitle: 'Noise Reduction System',
    desc: 'Precision rubber formulation combined with Teflon coating eliminates chatter and squeaking. The result is a near-silent sweep that maintains optical clarity without auditory distraction.',
    icon: '◉',
  },
  {
    id: '04',
    title: 'All-Weather Reliability',
    subtitle: 'Environmental Resistance',
    desc: 'Engineered to perform from monsoon rainfall to freezing conditions. UV-stabilized materials prevent cracking, while the rubber compound retains flexibility across a wide temperature range.',
    icon: '◎',
  },
  {
    id: '05',
    title: 'High-Speed Stability',
    subtitle: 'Dynamic Contact Pressure',
    desc: 'Multi-point spring pressure system distributes force evenly along the blade length, maintaining uniform glass contact even at 140+ km/h. No lifting, no streaking, no compromise.',
    icon: '◆',
  },
  {
    id: '06',
    title: 'Premium Durability',
    subtitle: 'Long-Life Materials',
    desc: 'Manufactured with automotive-grade materials that resist ozone degradation, road chemicals, and extreme UV exposure. Bricado blades outlast conventional alternatives by a measurable margin.',
    icon: '◐',
  },
]

export function TechnologySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.tech-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
        }
      )
      gsap.fromTo('.tech-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-dark-deep py-24 lg:py-36 overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute inset-0 grid-lines opacity-15" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-border to-transparent" />

      {/* Orange ambient */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-orange/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-8xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 lg:mb-24 max-w-3xl">
          <SectionLabel className="mb-6">Innovation Core</SectionLabel>
          <h2 className="tech-heading font-display text-[clamp(2.5rem,5vw,5rem)] font-black uppercase text-white leading-none mb-6">
            Six Technologies.<br />
            <span className="text-orange">One Blade.</span>
          </h2>
          <p className="text-silver-dark text-base leading-relaxed max-w-xl">
            Every Bricado wiper blade integrates multiple proprietary engineering systems that work in concert
            to deliver performance unmatched in its category.
          </p>
        </div>

        {/* Technology grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-dark-border">
          {techs.map((tech) => (
            <div
              key={tech.id}
              className="tech-card bg-dark-charcoal p-8 lg:p-10 group hover:bg-dark-graphite transition-colors duration-500 relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-orange/0 group-hover:bg-orange/3 transition-all duration-500" />

              {/* Number */}
              <div className="flex items-start justify-between mb-8">
                <span className="font-display text-5xl font-black text-dark-muted group-hover:text-dark-border transition-colors duration-300">
                  {tech.id}
                </span>
                <span className="text-2xl text-orange/60 group-hover:text-orange transition-colors duration-300">
                  {tech.icon}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="text-label text-[9px] text-orange/70 tracking-widest mb-2">
                  {tech.subtitle}
                </div>
                <h3 className="font-display text-2xl lg:text-3xl font-black uppercase text-white mb-4 group-hover:text-orange/90 transition-colors duration-300">
                  {tech.title}
                </h3>
                <p className="text-silver-dark text-sm leading-relaxed">
                  {tech.desc}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-orange/0 group-hover:bg-orange/30 transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* CTA to technology page */}
        <div className="mt-12 text-center">
          <a
            href="/technology"
            className="inline-flex items-center gap-3 text-orange text-xs font-bold tracking-widest uppercase hover:gap-5 transition-all duration-300"
          >
            Explore Full Technology
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M12 6L16 10L12 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
