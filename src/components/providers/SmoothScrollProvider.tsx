'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: import('lenis').default | null = null

    const initLenis = async () => {
      const LenisModule = await import('lenis')
      const Lenis = LenisModule.default

      lenis = new Lenis({
        duration: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.6,
        touchMultiplier: 1.0,
      })

      lenis.on('scroll', ScrollTrigger.update)

      gsap.ticker.add((time: number) => {
        lenis?.raf(time * 1000)
      })

      gsap.ticker.lagSmoothing(0)

      document.documentElement.classList.add('lenis', 'lenis-smooth')
    }

    initLenis()

    return () => {
      if (lenis) {
        lenis.destroy()
        document.documentElement.classList.remove('lenis', 'lenis-smooth')
      }
    }
  }, [])

  return <>{children}</>
}
