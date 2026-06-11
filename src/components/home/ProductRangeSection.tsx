'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    id: 'advanced',
    category: '01 — Advanced',
    name: 'Advanced Wiper Blades',
    tagline: 'Next-Level Performance',
    desc: 'Cutting-edge engineering with Teflon coating, aerodynamic spoiler, and multi-point pressure system. The flagship line.',
    features: ['Teflon Coating', 'Aerodynamic Spoiler', 'All-Weather', 'Silent Operation'],
    image: '/images/product-advanced.jpg',
    highlight: true,
  },
  {
    id: 'flat',
    category: '02 — Flat',
    name: 'Flat Wiper Blades',
    tagline: 'Modern Low-Profile Design',
    desc: 'Sleek frameless architecture for enhanced aesthetic and uniform pressure distribution. Enhanced visibility at all speeds.',
    features: ['Frameless Design', 'Uniform Pressure', 'Premium Look', 'Easy Install'],
    image: '/images/product-flat.jpg',
    highlight: false,
  },
  {
    id: 'hybrid',
    category: '03 — Hybrid',
    name: 'Hybrid Wiper Blades',
    tagline: 'Best of Both Worlds',
    desc: 'The precision of a conventional structure fused with flat blade technology. Superior durability and wiping efficiency.',
    features: ['Conventional Strength', 'Flat Performance', 'Weather Shield', 'Long Life'],
    image: '/images/product-hybrid.jpg',
    highlight: false,
  },
  {
    id: 'conventional',
    category: '04 — Conventional',
    name: 'Conventional Wipers',
    tagline: 'Reliable Classic Design',
    desc: 'Proven traditional architecture engineered to modern standards. Effective wiping performance across all vehicle categories.',
    features: ['Universal Fit', 'Proven Design', 'Cost Effective', 'Wide Range'],
    image: '/images/product-conventional.jpg',
    highlight: false,
  },
]

export function ProductRangeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.product-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
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
    <section ref={sectionRef} className="relative bg-dark-charcoal py-24 lg:py-36">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-dark-border to-transparent" />

      <div className="max-w-8xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-24">
          <div>
            <SectionLabel className="mb-6">Product Range</SectionLabel>
            <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-black uppercase text-white leading-none">
              Engineered for<br />
              <span className="text-orange">Every Road.</span>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-silver-dark text-sm leading-relaxed">
              Four specialized product lines covering every vehicle type, driving condition, and performance requirement.
            </p>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-dark-border">
          {products.map((product) => (
            <div
              key={product.id}
              className={`product-card relative group cursor-pointer overflow-hidden ${
                product.highlight ? 'bg-dark-graphite' : 'bg-dark-charcoal'
              } hover:bg-dark-graphite transition-all duration-500`}
            >
              {/* Visual area */}
              <div className="relative h-52 overflow-hidden bg-dark-deep">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-dark-deep/40 group-hover:bg-dark-deep/20 transition-all duration-500" />

                {/* Flagship badge */}
                {product.highlight && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="text-[9px] font-bold tracking-widest uppercase bg-orange text-dark-deep px-2 py-1">
                      Flagship
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <div className="text-label text-[9px] text-orange/70 tracking-widest mb-3">
                  {product.category}
                </div>
                <h3 className="font-display text-xl lg:text-2xl font-black uppercase text-white mb-2 group-hover:text-orange transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-silver-dark text-xs leading-relaxed mb-5">
                  {product.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {product.features.map((f) => (
                    <span key={f} className="text-[9px] font-medium tracking-wider uppercase px-2 py-1 border border-dark-muted text-silver-dark">
                      {f}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/products#${product.id}`}
                  className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-silver-dark group-hover:text-orange transition-colors duration-300"
                >
                  Learn More
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-orange/0 group-hover:bg-orange/40 transition-all duration-500" />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 border border-silver/20 text-silver text-xs font-bold tracking-widest uppercase px-8 py-4 hover:border-orange hover:text-orange transition-all duration-300"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
