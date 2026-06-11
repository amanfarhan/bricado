'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 240
const SCROLL_MULTIPLIER = '800vh'

function frameSrc(n: number) {
  return `/hero-sequence/ezgif-frame-${String(n).padStart(3, '0')}.jpg`
}

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)
  const loadRingRef = useRef<SVGCircleElement>(null)
  const loadPctRef = useRef<HTMLSpanElement>(null)
  const framesRef = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null))
  const [isReady, setIsReady] = useState(false)

  // Text DOM refs — all manipulated directly, no re-renders
  const text1Ref = useRef<HTMLDivElement>(null)
  const text2BlurRef = useRef<HTMLDivElement>(null)
  const text2SharpRef = useRef<HTMLDivElement>(null)
  const text3Ref = useRef<HTMLDivElement>(null)
  const text4Ref = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  // Live state refs
  const currentFrameRef = useRef(0)
  const dimensionsRef = useRef({ W: 0, H: 0 })
  const progressRef = useRef(0)

  // ── PRELOAD ───────────────────────────────────────────────────────────────
  useEffect(() => {
    let loaded = 0

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image()
      img.src = frameSrc(i + 1)

      const CIRCUMFERENCE = 2 * Math.PI * 46 // r=46 → 289.03

      const done = () => {
        loaded++
        const pct = loaded / TOTAL_FRAMES
        // Update circular progress ring
        if (loadRingRef.current) {
          loadRingRef.current.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - pct))
        }
        // Update percentage counter
        if (loadPctRef.current) {
          loadPctRef.current.textContent = String(Math.round(pct * 100))
        }
        if (loaded === TOTAL_FRAMES) {
          setTimeout(() => {
            if (loadingRef.current) {
              loadingRef.current.style.opacity = '0'
              loadingRef.current.style.pointerEvents = 'none'
            }
            setTimeout(() => setIsReady(true), 800)
          }, 300)
        }
      }

      img.onload = done
      img.onerror = done
      framesRef.current[i] = img
    }
  }, [])

  // ── MAIN ANIMATION ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isReady) return

    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return

    // Use alpha:false for compositing speed
    const ctx = canvas.getContext('2d', { alpha: false })!

    const setSize = () => {
      const W = window.innerWidth
      // Measure the stable sticky container instead of window.innerHeight to prevent resizing
      const container = sectionRef.current?.querySelector('.sticky')
      const H = container ? container.clientHeight : window.innerHeight
      
      canvas.width = W
      canvas.height = H
      dimensionsRef.current = { W, H }
    }
    setSize()

    // Cover-fit draw helper
    const coverDraw = (img: HTMLImageElement, alpha: number) => {
      const { W, H } = dimensionsRef.current
      if (!img?.complete || !img.naturalWidth) return
      const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight)
      const dw = img.naturalWidth * scale
      const dh = img.naturalHeight * scale
      ctx.globalAlpha = alpha
      ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh)
    }

    // Smooth interpolated frame draw
    const drawInterpolated = (rawF: number) => {
      const idxA = Math.max(0, Math.min(Math.floor(rawF), TOTAL_FRAMES - 1))
      const idxB = Math.min(idxA + 1, TOTAL_FRAMES - 1)
      const blend = rawF - idxA

      const imgA = framesRef.current[idxA]
      const imgB = framesRef.current[idxB]

      if (!imgA) return
      coverDraw(imgA, 1.0)
      if (blend > 0.01 && imgB && idxA !== idxB) {
        coverDraw(imgB, blend)
      }
      ctx.globalAlpha = 1.0
    }

    // Wipe arc clip-path string (pixel coords, CSS path())
    // Pivot is centered at bottom-center so the sweep is symmetric across the screen
    const getWipeClipPath = (wipeP: number) => {
      if (wipeP <= 0) return 'path("M 0 0")'
      const { W, H } = dimensionsRef.current
      const pivX = W * 0.5          // center horizontally
      const pivY = H * 1.12         // just below viewport bottom
      const radius = H * 1.05       // long enough to cover full viewport width
      const startAngle = -Math.PI * 0.82   // upper-left
      const endAngle   = -Math.PI * 0.18   // upper-right (symmetric)
      const angle = startAngle + (endAngle - startAngle) * Math.min(wipeP, 1)

      const x1 = pivX + Math.cos(startAngle) * radius
      const y1 = pivY + Math.sin(startAngle) * radius
      const x2 = pivX + Math.cos(angle) * radius
      const y2 = pivY + Math.sin(angle) * radius
      const largeArc = angle - startAngle > Math.PI ? 1 : 0

      return `path("M ${pivX.toFixed(1)} ${pivY.toFixed(1)} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${radius.toFixed(1)} ${radius.toFixed(1)} 0 ${largeArc} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z")`
    }

    // Smooth easing helper
    const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

    // Update all text elements — called every scroll tick
    const updateText = (f: number) => {
      // f = 0..239

      // ── PHASE 1 — "WHEN VISIBILITY FADES"  f: 0–70
      if (text1Ref.current) {
        let op = 0
        let blur = 10
        if (f >= 0 && f <= 70) {
          const inP = easeInOut(Math.min(f / 18, 1))
          const outP = f > 52 ? 1 - easeInOut((f - 52) / 18) : 1
          op = inP * outP * 0.72
          blur = 10 - inP * 6
        }
        text1Ref.current.style.opacity = String(op)
        text1Ref.current.style.filter = `blur(${blur.toFixed(1)}px)`
      }

      // ── PHASE 2 blurred — "PRECISION TAKES OVER" behind glass, f: 60–135
      if (text2BlurRef.current) {
        let op = 0
        if (f >= 60 && f <= 135) {
          const inP = easeInOut(Math.min((f - 60) / 14, 1))
          const outP = f > 118 ? 1 - easeInOut((f - 118) / 17) : 1
          op = inP * outP * 0.25
        }
        text2BlurRef.current.style.opacity = String(op)
      }

      // ── PHASE 2 sharp — wipe-revealed, f: 68–135
      if (text2SharpRef.current) {
        let wipeP = 0
        let op = 0
        if (f >= 68 && f <= 135) {
          wipeP = easeInOut(Math.min((f - 68) / 52, 1))
          const outP = f > 118 ? 1 - easeInOut((f - 118) / 17) : 1
          op = Math.min(wipeP * 2.5, 1) * outP
        }
        text2SharpRef.current.style.opacity = String(op)
        text2SharpRef.current.style.clipPath = getWipeClipPath(wipeP)
      }

      // ── PHASE 3 — "ENGINEERED FOR EVERY STORM"  f: 122–178
      if (text3Ref.current) {
        let op = 0
        if (f >= 122 && f <= 178) {
          const inP = easeInOut(Math.min((f - 122) / 20, 1))
          const outP = f > 158 ? 1 - easeInOut((f - 158) / 20) : 1
          op = inP * outP
        }
        text3Ref.current.style.opacity = String(op)
      }

      // ── PHASE 4 — "SILENT. STABLE. PRECISE."  f: 163–218
      if (text4Ref.current) {
        let op = 0
        if (f >= 163 && f <= 218) {
          const inP = easeInOut(Math.min((f - 163) / 18, 1))
          const outP = f > 202 ? 1 - easeInOut((f - 202) / 16) : 1
          op = inP * outP
        }
        text4Ref.current.style.opacity = String(op)
      }

      // ── BRAND REVEAL  f: 208–239
      if (brandRef.current) {
        let op = 0
        if (f >= 208) {
          op = easeInOut(Math.min((f - 208) / 22, 1))
        }
        brandRef.current.style.opacity = String(op)
        // subtle scale: 0.96 → 1.00 as it fades in (coming into focus)
        brandRef.current.style.transform = `scale(${0.96 + op * 0.04})`
      }

      // ── CTA buttons  f: 226–239
      if (ctaRef.current) {
        let op = 0
        let ty = 24
        if (f >= 226) {
          op = easeInOut(Math.min((f - 226) / 13, 1))
          ty = 24 * (1 - op)
        }
        ctaRef.current.style.opacity = String(op)
        ctaRef.current.style.transform = `translateY(${ty.toFixed(1)}px)`
      }

      // ── Scroll indicator  f: 0–24
      if (scrollIndicatorRef.current) {
        const op = f <= 14 ? 1 : Math.max(0, 1 - (f - 14) / 10)
        scrollIndicatorRef.current.style.opacity = String(op)
      }
    }

    // ── SCROLLTRIGGER ──────────────────────────────────────────────────────
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5, // Increased from 1 for buttery smooth cinematic interpolation
      onUpdate: (self) => {
        progressRef.current = self.progress
        const rawF = self.progress * (TOTAL_FRAMES - 1)
        currentFrameRef.current = Math.round(rawF)
        drawInterpolated(rawF)
        updateText(rawF)
      },
    })

    // Initial render
    drawInterpolated(0)
    updateText(0)

    // Resize handler — recalculate dimensions and redraw
    let lastWidth = window.innerWidth
    const onResize = () => {
      // Ignore height-only resizes on mobile to prevent address bar jitter
      const isMobile = window.innerWidth <= 768
      if (isMobile && window.innerWidth === lastWidth) return
      lastWidth = window.innerWidth

      setSize()
      drawInterpolated(progressRef.current * (TOTAL_FRAMES - 1))
      updateText(progressRef.current * (TOTAL_FRAMES - 1))
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      st.kill()
      window.removeEventListener('resize', onResize)
    }
  }, [isReady])

  return (
    <>
      {/* ── LOADING SCREEN ──────────────────────────────────────────────── */}
      <div
        ref={loadingRef}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
        style={{ background: '#060606', transition: 'opacity 0.8s ease' }}
      >
        {/* Subtle grid */}
        <div className="absolute inset-0 grid-lines opacity-[0.04]" />

        {/* Orange ambient glow — pulses behind logo */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 'clamp(320px, 55vw, 700px)',
            height: 'clamp(160px, 28vw, 340px)',
            background: 'radial-gradient(ellipse, rgba(247,148,29,0.13) 0%, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'loadGlow 2.8s ease-in-out infinite',
          }}
        />

        {/* Corner brackets */}
        <div className="absolute top-8 left-8 w-14 h-14 border-l border-t border-orange/35" style={{ animation: 'bracketIn 0.9s ease both' }} />
        <div className="absolute top-8 right-8 w-14 h-14 border-r border-t border-orange/35" style={{ animation: 'bracketIn 0.9s 0.08s ease both' }} />
        <div className="absolute bottom-8 left-8 w-14 h-14 border-l border-b border-orange/35" style={{ animation: 'bracketIn 0.9s 0.16s ease both' }} />
        <div className="absolute bottom-8 right-8 w-14 h-14 border-r border-b border-orange/35" style={{ animation: 'bracketIn 0.9s 0.24s ease both' }} />

        {/* Horizontal scan line */}
        <div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(247,148,29,0.25), transparent)',
            animation: 'scanLine 3.5s ease-in-out infinite',
          }}
        />

        {/* Central content */}
        <div className="relative flex flex-col items-center gap-0" style={{ animation: 'loadFadeUp 1s ease both' }}>

          {/* BRICADO logo — large */}
          <div className="relative flex items-center justify-center mb-10">
            <Image
              src="/logo-white.png"
              alt="Bricado"
              width={420}
              height={132}
              className="relative w-[clamp(200px,32vw,420px)] h-auto object-contain"
              style={{ filter: 'drop-shadow(0 0 40px rgba(247,148,29,0.18)) drop-shadow(0 0 80px rgba(247,148,29,0.08))' }}
              priority
            />
          </div>

          {/* Thin separator */}
          <div className="flex items-center gap-3 w-[clamp(160px,24vw,320px)] mb-10">
            <div className="flex-1 h-px bg-white/10" />
            <div className="w-1 h-1 rounded-full bg-orange/60" />
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Circular SVG progress ring */}
          <div className="relative flex items-center justify-center mb-6">
            <svg width="110" height="110" viewBox="0 0 110 110" className="-rotate-90" aria-hidden="true">
              {/* Track */}
              <circle cx="55" cy="55" r="46" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              {/* Tick marks */}
              {Array.from({ length: 36 }).map((_, i) => {
                const angle = (i / 36) * Math.PI * 2 - Math.PI / 2
                const inner = 48
                const outer = 52
                return (
                  <line
                    key={i}
                    x1={55 + Math.cos(angle) * inner}
                    y1={55 + Math.sin(angle) * inner}
                    x2={55 + Math.cos(angle) * outer}
                    y2={55 + Math.sin(angle) * outer}
                    stroke="rgba(255,255,255,0.07)"
                    strokeWidth="0.5"
                  />
                )
              })}
              {/* Progress arc */}
              <circle
                ref={loadRingRef}
                cx="55" cy="55" r="46"
                fill="none"
                stroke="#F7941D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={String(2 * Math.PI * 46)}
                strokeDashoffset={String(2 * Math.PI * 46)}
                style={{ transition: 'stroke-dashoffset 0.12s linear' }}
              />
            </svg>
            {/* Percentage counter inside ring */}
            <div className="absolute flex flex-col items-center leading-none">
              <span ref={loadPctRef} className="text-white font-light" style={{ fontSize: '1.6rem', fontVariantNumeric: 'tabular-nums' }}>0</span>
              <span className="text-[8px] text-white/30 tracking-widest mt-0.5">%</span>
            </div>
          </div>

          {/* Label */}
          <p className="text-[8px] font-medium uppercase tracking-[0.45em] text-white/22">
            Loading Experience
          </p>
        </div>

        {/* Bottom brand line */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <span className="text-[7px] text-white/12 tracking-[0.4em] uppercase">Advanced Wiper Blade Systems</span>
        </div>
      </div>

      {/* ── HERO SECTION ────────────────────────────────────────────────── */}
      <section
        ref={sectionRef}
        className="relative"
        style={{ height: SCROLL_MULTIPLIER }}
        aria-label="Cinematic windshield wipe hero"
      >
        <div className="sticky top-0 h-[100vh] overflow-hidden bg-[#070707]">

          {/* Frame canvas — the windshield sequence */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full will-change-transform [transform:translateZ(0)]"
            aria-hidden="true"
          />

          {/* Subtle vignette — cinematic frame */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 130% 110% at 50% 50%, transparent 30%, rgba(0,0,0,0.52) 100%)',
            }}
            aria-hidden="true"
          />
          {/* Bottom gradient into next section */}
          <div
            className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #080808, transparent)' }}
            aria-hidden="true"
          />

          {/* ── TEXT LAYER 1 — "WHEN VISIBILITY FADES" ──────────────────── */}
          <div
            ref={text1Ref}
            className="absolute inset-0 flex items-end justify-center pb-[27%] pointer-events-none select-none"
            style={{ opacity: 0 }}
          >
            <p
              className="font-display text-[clamp(1.1rem,2.4vw,2.6rem)] font-medium uppercase text-white leading-none tracking-[0.22em] text-center"
              style={{ letterSpacing: '0.22em' }}
            >
              WHEN VISIBILITY FADES
            </p>
          </div>

          {/* ── TEXT LAYER 2a — "PRECISION TAKES OVER" blurred (behind glass) */}
          <div
            ref={text2BlurRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none will-change-[opacity,filter] [transform:translateZ(0)]"
            style={{ opacity: 0, filter: 'blur(9px)' }}
          >
            <p
              className="font-display text-[clamp(2.2rem,5.5vw,7.5rem)] font-bold uppercase text-white leading-[0.92] tracking-[0.1em] text-center"
            >
              PRECISION<br />TAKES OVER
            </p>
          </div>

          {/* ── TEXT LAYER 2b — "PRECISION TAKES OVER" wipe-revealed (sharp) */}
          <div
            ref={text2SharpRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none will-change-[opacity,clip-path] [transform:translateZ(0)]"
            style={{ opacity: 0, clipPath: 'path("M 0 0")' }}
          >
            <p
              className="font-display text-[clamp(2.2rem,5.5vw,7.5rem)] font-bold uppercase text-white leading-[0.92] tracking-[0.1em] text-center"
              style={{ textShadow: '0 0 60px rgba(255,255,255,0.18), 0 0 120px rgba(247,148,29,0.08)' }}
            >
              PRECISION<br />TAKES OVER
            </p>
          </div>

          {/* ── TEXT LAYER 3 — "ENGINEERED FOR EVERY STORM" ─────────────── */}
          <div
            ref={text3Ref}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            style={{ opacity: 0 }}
          >
            <p
              className="font-display text-[clamp(1rem,2.1vw,2.4rem)] font-semibold uppercase text-white leading-none tracking-[0.2em] text-center"
            >
              ENGINEERED FOR EVERY STORM
            </p>
          </div>

          {/* ── TEXT LAYER 4 — "SILENT. STABLE. PRECISE." ───────────────── */}
          <div
            ref={text4Ref}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            style={{ opacity: 0 }}
          >
            <div className="text-center">
              {['SILENT.', 'STABLE.', 'PRECISE.'].map((line, i) => (
                <p
                  key={line}
                  className="font-display font-light uppercase text-white leading-[1.2] tracking-[0.3em]"
                  style={{
                    fontSize: 'clamp(1.6rem,3.8vw,5rem)',
                    marginTop: i > 0 ? '0.08em' : 0,
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* ── BRAND REVEAL — logo image ────────────────────────────────── */}
          <div
            ref={brandRef}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
            style={{ opacity: 0, transform: 'scale(0.96)' }}
          >
            {/* Ambient orange glow behind logo */}
            <div
              className="absolute w-[600px] h-[220px] rounded-full"
              style={{
                background: 'radial-gradient(ellipse, rgba(247,148,29,0.12) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            {/* Logo image */}
            <Image
              src="/logo-white.png"
              alt="Bricado"
              width={520}
              height={160}
              className="relative w-[clamp(220px,38vw,520px)] h-auto object-contain"
              style={{ filter: 'drop-shadow(0 0 60px rgba(255,255,255,0.08))' }}
              priority
            />

            {/* Thin separator */}
            <div className="relative mt-8 mb-6 flex items-center gap-4 w-[clamp(180px,28vw,360px)]">
              <div className="flex-1 h-px bg-white/15" />
              <div className="w-1 h-1 bg-orange/60 rounded-full" />
              <div className="flex-1 h-px bg-white/15" />
            </div>

            {/* Tagline */}
            <p
              className="font-display font-medium uppercase text-center"
              style={{
                fontSize: 'clamp(0.55rem,0.95vw,0.85rem)',
                letterSpacing: '0.52em',
                color: '#F7941D',
              }}
            >
              CLEAR VISION.&nbsp;&nbsp;&nbsp;SAFE DRIVE.
            </p>
          </div>

          {/* ── CTA BUTTONS — appear just after logo reveal ──────────────── */}
          <div
            ref={ctaRef}
            className="absolute bottom-12 left-0 right-0 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            style={{ opacity: 0, transform: 'translateY(24px)' }}
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-orange text-dark-deep text-[10px] font-black tracking-widest uppercase px-8 py-4 hover:bg-orange-light transition-all duration-300 hover:shadow-2xl hover:shadow-orange/30"
            >
              Explore Products
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                <path d="M2.5 7.5H12.5M9 4L12.5 7.5L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/technology"
              className="inline-flex items-center gap-3 border border-white/20 text-white/80 text-[10px] font-bold tracking-widest uppercase px-8 py-4 hover:border-orange hover:text-orange transition-all duration-300"
            >
              Our Technology
            </Link>
          </div>

          {/* ── SCROLL INDICATOR ─────────────────────────────────────────── */}
          <div
            ref={scrollIndicatorRef}
            className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-[8px] text-white/35 tracking-[0.35em] font-medium">SCROLL</span>
            <div className="relative w-px h-12 overflow-hidden bg-white/15">
              <div
                className="absolute top-0 left-0 right-0 h-5 bg-orange/80"
                style={{ animation: 'scrollDrop 1.9s ease-in-out infinite' }}
              />
            </div>
          </div>

        </div>
      </section>

      <style jsx global>{`
        @keyframes scrollDrop {
          0%   { transform: translateY(-100%); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(480%); opacity: 0; }
        }
        @keyframes loadGlow {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.12); }
        }
        @keyframes bracketIn {
          from { opacity: 0; transform: scale(0.82); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes scanLine {
          0%   { top: -1px; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes loadFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
