'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

interface RainDrop {
  x: number; y: number; speed: number; len: number; opacity: number; w: number
}

export function WindshieldSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const blurOverlayRef = useRef<HTMLDivElement>(null)
  const textRevealRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLDivElement>(null)
  const phase1Ref = useRef<HTMLDivElement>(null)
  const phase2Ref = useRef<HTMLDivElement>(null)
  const phase3Ref = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return

    const ctx = canvas.getContext('2d')!
    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    const createDrop = (): RainDrop => ({
      x: Math.random() * W,
      y: Math.random() * H - H,
      speed: Math.random() * 10 + 5,
      len: Math.random() * 22 + 10,
      opacity: Math.random() * 0.5 + 0.1,
      w: Math.random() * 1.2 + 0.3,
    })

    let drops: RainDrop[] = Array.from({ length: 250 }, createDrop)
    let wiperAngle = -Math.PI * 0.85
    let wiperProgress = 0

    const drawFrame = () => {
      const progress = progressRef.current
      ctx.clearRect(0, 0, W, H)

      // Background - dark glass texture
      ctx.fillStyle = '#0D0D0D'
      ctx.fillRect(0, 0, W, H)

      // Subtle glass reflection gradient
      const glassGrad = ctx.createLinearGradient(0, 0, W, H)
      glassGrad.addColorStop(0, 'rgba(255,255,255,0.01)')
      glassGrad.addColorStop(0.5, 'rgba(255,255,255,0.02)')
      glassGrad.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = glassGrad
      ctx.fillRect(0, 0, W, H)

      // Rain intensity: 0→1 over first 50%, stays 1 until 70%, then fades
      const rainIntensity =
        progress < 0.5 ? progress * 2 :
        progress < 0.7 ? 1 :
        progress < 0.9 ? 1 - (progress - 0.7) / 0.2 : 0

      // Animate rain drops
      drops.forEach((d, i) => {
        d.y += d.speed * rainIntensity * 0.5 + (rainIntensity > 0 ? 0.5 : 0)
        if (d.y > H + d.len) {
          drops[i] = createDrop()
          drops[i].y = -d.len
        }
        if (rainIntensity > 0.05) {
          ctx.beginPath()
          ctx.moveTo(d.x, d.y)
          ctx.lineTo(d.x - 0.8, d.y + d.len)
          ctx.strokeStyle = `rgba(150, 185, 220, ${d.opacity * rainIntensity})`
          ctx.lineWidth = d.w
          ctx.stroke()
        }
      })

      // Water accumulation on glass (bottom of screen)
      if (rainIntensity > 0.3) {
        const waterOpacity = (rainIntensity - 0.3) / 0.7
        const waterGrad = ctx.createLinearGradient(0, H * 0.85, 0, H)
        waterGrad.addColorStop(0, `rgba(100, 140, 180, 0)`)
        waterGrad.addColorStop(1, `rgba(80, 110, 150, ${waterOpacity * 0.4})`)
        ctx.fillStyle = waterGrad
        ctx.fillRect(0, H * 0.85, W, H * 0.15)
      }

      // Fog/water distortion overlay
      const fogIntensity =
        progress < 0.2 ? 0 :
        progress < 0.55 ? (progress - 0.2) / 0.35 :
        progress < 0.75 ? 1 :
        progress < 0.95 ? 1 - (progress - 0.75) / 0.2 : 0

      if (fogIntensity > 0) {
        const fogGrad = ctx.createRadialGradient(W * 0.5, H * 0.45, 0, W * 0.5, H * 0.45, Math.max(W, H) * 0.8)
        fogGrad.addColorStop(0, `rgba(120, 160, 200, ${fogIntensity * 0.18})`)
        fogGrad.addColorStop(0.6, `rgba(80, 110, 150, ${fogIntensity * 0.12})`)
        fogGrad.addColorStop(1, `rgba(50, 80, 120, ${fogIntensity * 0.08})`)
        ctx.fillStyle = fogGrad
        ctx.fillRect(0, 0, W, H)
      }

      // Wiper blade - enters at 65% scroll
      if (progress > 0.62) {
        wiperProgress = Math.min((progress - 0.62) / 0.28, 1)
        const pivotX = W * 0.5
        const pivotY = H * 1.05
        const wiperLen = H * 0.92

        const startAngle = -Math.PI * 0.82
        const endAngle = -Math.PI * 0.18
        const currentAngle = startAngle + (endAngle - startAngle) * wiperProgress

        // Clear arc (swept area) - simulate clearing water
        if (wiperProgress > 0) {
          ctx.save()
          ctx.beginPath()
          ctx.moveTo(pivotX, pivotY)
          ctx.arc(pivotX, pivotY, wiperLen * 1.02, startAngle, currentAngle)
          ctx.arc(pivotX, pivotY, wiperLen * 0.12, currentAngle, startAngle, true)
          ctx.closePath()
          ctx.fillStyle = `rgba(10, 10, 10, ${Math.min(wiperProgress * 1.5, 0.85)})`
          ctx.fill()
          ctx.restore()
        }

        // Wiper arm
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(pivotX, pivotY)
        ctx.lineTo(
          pivotX + Math.cos(currentAngle) * wiperLen * 0.15,
          pivotY + Math.sin(currentAngle) * wiperLen * 0.15
        )
        ctx.strokeStyle = '#555'
        ctx.lineWidth = 3
        ctx.stroke()

        // Wiper blade with orange glow
        const bladeLen = wiperLen * 0.85
        const bladeStart = {
          x: pivotX + Math.cos(currentAngle) * wiperLen * 0.12,
          y: pivotY + Math.sin(currentAngle) * wiperLen * 0.12,
        }
        const bladeEnd = {
          x: pivotX + Math.cos(currentAngle) * (wiperLen * 0.12 + bladeLen),
          y: pivotY + Math.sin(currentAngle) * (wiperLen * 0.12 + bladeLen),
        }

        // Glow effect
        ctx.shadowBlur = 15
        ctx.shadowColor = 'rgba(247, 148, 29, 0.8)'
        ctx.beginPath()
        ctx.moveTo(bladeStart.x, bladeStart.y)
        ctx.lineTo(bladeEnd.x, bladeEnd.y)
        ctx.strokeStyle = '#F7941D'
        ctx.lineWidth = 4
        ctx.lineCap = 'round'
        ctx.stroke()

        // Blade body
        ctx.shadowBlur = 0
        ctx.beginPath()
        ctx.moveTo(bladeStart.x, bladeStart.y)
        ctx.lineTo(bladeEnd.x, bladeEnd.y)
        ctx.strokeStyle = '#222'
        ctx.lineWidth = 8
        ctx.stroke()

        // Orange leading edge
        ctx.beginPath()
        ctx.moveTo(bladeStart.x, bladeStart.y)
        ctx.lineTo(bladeEnd.x, bladeEnd.y)
        ctx.strokeStyle = '#F7941D'
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(drawFrame)
    }

    drawFrame()

    // ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        progressRef.current = self.progress

        // Blur overlay
        if (blurOverlayRef.current) {
          const blurAmount =
            self.progress < 0.2 ? 0 :
            self.progress < 0.55 ? (self.progress - 0.2) / 0.35 * 18 :
            self.progress < 0.75 ? 18 :
            self.progress < 0.95 ? 18 * (1 - (self.progress - 0.75) / 0.2) : 0
          blurOverlayRef.current.style.backdropFilter = `blur(${blurAmount}px)`
          blurOverlayRef.current.style.opacity = blurAmount > 0 ? '1' : '0'
        }

        // Clear windshield reveal
        if (textRevealRef.current) {
          const clearOpacity = self.progress > 0.78
            ? Math.min((self.progress - 0.78) / 0.15, 1)
            : 0
          textRevealRef.current.style.opacity = String(clearOpacity)
        }

        // Phase labels
        if (phase1Ref.current) {
          phase1Ref.current.style.opacity = self.progress < 0.35 ? `${self.progress * 3}` : `${Math.max(0, 1 - (self.progress - 0.35) * 8)}`
        }
        if (phase2Ref.current) {
          phase2Ref.current.style.opacity = self.progress > 0.4 && self.progress < 0.65
            ? `${Math.min((self.progress - 0.4) * 4, 1) * Math.max(0, 1 - (self.progress - 0.55) * 8)}`
            : '0'
        }
        if (phase3Ref.current) {
          phase3Ref.current.style.opacity = self.progress > 0.8
            ? `${Math.min((self.progress - 0.8) * 5, 1)}`
            : '0'
        }
      },
    })

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      st.kill()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[400vh]" aria-label="Windshield visibility demonstration">
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        {/* Windshield rain background */}
        <Image
          src="/images/windshield-rain.jpg"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
          priority
        />
        {/* Clear windshield — revealed after wipe */}
        <div
          ref={textRevealRef}
          className="absolute inset-0 transition-none"
          style={{ opacity: 0 }}
        >
          <Image
            src="/images/windshield-clear.jpg"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
        </div>

        {/* Canvas layer (rain + wiper animation on top) */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Blur overlay for fog effect */}
        <div
          ref={blurOverlayRef}
          className="absolute inset-0 opacity-0 transition-none"
          style={{ backdropFilter: 'blur(0px)' }}
        />

        {/* Phase 1: Rain builds */}
        <div
          ref={phase1Ref}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-100"
          style={{ opacity: 0 }}
        >
          <span className="text-label text-[10px] text-silver/40 tracking-[0.3em] mb-4">The Problem</span>
          <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-black uppercase text-white/80 text-center leading-none">
            Rain.<br />
            <span className="text-silver/40">Poor Visibility.</span><br />
            Risk.
          </h2>
        </div>

        {/* Phase 2: Maximum blur */}
        <div
          ref={phase2Ref}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: 0 }}
        >
          <span className="text-label text-[10px] text-orange/80 tracking-[0.3em] mb-4">The Challenge</span>
          <p className="font-display text-[clamp(1.5rem,4vw,3.5rem)] font-bold uppercase text-white text-center leading-tight max-w-xl">
            When the road ahead<br />
            <span className="text-orange">disappears</span>
          </p>
        </div>

        {/* Phase 3: Clear view after wipe */}
        <div
          ref={phase3Ref}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: 0 }}
        >
          <span className="text-label text-[10px] text-orange tracking-[0.3em] mb-6">The Bricado Solution</span>
          <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-black uppercase text-white text-center leading-none mb-6">
            Crystal<br />
            <span className="text-orange">Clear.</span>
          </h2>
          <p className="text-sm text-silver/70 tracking-wider uppercase text-center">
            Teflon-coated · Aerodynamic · All-weather
          </p>
        </div>

        {/* Scroll progress indicator */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 items-center">
          <div className="w-px h-24 bg-dark-border relative overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 bg-orange transition-none"
              ref={(el) => {
                if (el) {
                  ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    onUpdate: (self) => {
                      el.style.height = `${self.progress * 100}%`
                    },
                  })
                }
              }}
            />
          </div>
          <span className="text-label text-[9px] text-silver/30 tracking-[0.2em] [writing-mode:vertical-rl]">
            SCROLL
          </span>
        </div>
      </div>
    </section>
  )
}
