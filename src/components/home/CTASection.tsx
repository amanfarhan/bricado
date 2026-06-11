'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = canvas.offsetHeight)

    interface Particle {
      x: number; y: number; vx: number; vy: number; size: number; opacity: number
    }
    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.4 + 0.05,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(247, 148, 29, ${p.opacity})`
        ctx.fill()
      })
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', onResize)

    const ctx2 = gsap.context(() => {
      gsap.fromTo('.cta-content > *',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )
    }, sectionRef)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      ctx2.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-dark-charcoal py-32 lg:py-48 overflow-hidden">
      {/* Canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Large background logo watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <Image
          src="/logo-white.png"
          alt=""
          width={1200}
          height={360}
          className="w-[80vw] max-w-5xl h-auto object-contain opacity-[0.04] select-none"
          aria-hidden="true"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-dark-charcoal to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-charcoal to-transparent" />

      {/* Orange center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center cta-content">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="block h-px w-12 bg-orange/60" />
          <span className="text-label text-[10px] text-orange/80 tracking-[0.3em]">Bricado® Wiper Systems</span>
          <span className="block h-px w-12 bg-orange/60" />
        </div>

        <h2 className="font-display text-[clamp(2.8rem,7vw,7rem)] font-black uppercase text-white leading-none mb-6">
          Engineered for<br />
          <span className="text-orange">Clear Vision.</span>
        </h2>

        <p className="text-silver-dark text-base lg:text-lg leading-relaxed max-w-xl mx-auto mb-12">
          Become a Bricado distribution partner and bring precision automotive engineering to your market.
          Join a growing network of dealerships and service centers across India.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/distribution"
            className="inline-flex items-center gap-3 bg-orange text-dark-deep text-xs font-black tracking-widest uppercase px-10 py-5 hover:bg-orange-light hover:shadow-2xl hover:shadow-orange/30 transition-all duration-300"
          >
            Dealership Inquiry
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 9H15M11 5L15 9L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 border border-silver/20 text-silver text-xs font-bold tracking-widest uppercase px-10 py-5 hover:border-orange hover:text-orange transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>

        {/* Contact quick info */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 border-t border-dark-border">
          <a href="tel:+917025575112" className="text-silver-dark text-sm hover:text-orange transition-colors duration-200">
            +91 7025 575 112
          </a>
          <span className="hidden sm:block w-px h-4 bg-dark-border" />
          <a href="mailto:info.bricado@gmail.com" className="text-silver-dark text-sm hover:text-orange transition-colors duration-200">
            info.bricado@gmail.com
          </a>
          <span className="hidden sm:block w-px h-4 bg-dark-border" />
          <span className="text-silver-dark text-sm">www.bricado.com</span>
        </div>
      </div>
    </section>
  )
}
