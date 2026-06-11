'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/technology', label: 'Technology' },
  { href: '/industries', label: 'Industries' },
  { href: '/distribution', label: 'Distribution' },
  { href: '/contact', label: 'Contact' },
]

// Hero section is 450vh tall; navbar stays hidden until past it (450vh - 100vh = 350vh)
const HERO_SCROLL_END_VH = 3.5

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [inHero, setInHero] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // On homepage, hide navbar while inside the hero scroll section
    const isHome = pathname === '/'
    const check = () => {
      setScrolled(window.scrollY > 60)
      if (isHome) {
        setInHero(window.scrollY < window.innerHeight * HERO_SCROLL_END_VH)
      } else {
        setInHero(false)
      }
    }
    // Set correct initial state (especially on hard-refresh on homepage)
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check, { passive: true })
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [pathname])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-dark-deep/90 backdrop-blur-xl border-b border-dark-border'
            : 'bg-transparent'
        } ${
          inHero ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <nav className="max-w-8xl mx-auto px-6 lg:px-10 h-16 lg:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Bricado Home">
            <Image
              src="/logo-white.png"
              alt="Bricado"
              width={140}
              height={44}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-label text-xs transition-all duration-300 hover:text-orange relative group ${
                  pathname === link.href ? 'text-orange' : 'text-silver-dark'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-orange transition-all duration-300 ${
                    pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/distribution"
              className="hidden lg:inline-flex items-center gap-2 bg-orange text-dark-deep text-xs font-bold tracking-widest uppercase px-5 py-2.5 transition-all duration-300 hover:bg-orange-light hover:shadow-lg hover:shadow-orange/20"
            >
              Partner With Us
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-px bg-white w-full transition-all duration-300 origin-center ${
                  menuOpen ? 'rotate-45 translate-y-[5px]' : ''
                }`}
              />
              <span
                className={`block h-px bg-white w-full transition-all duration-300 ${
                  menuOpen ? 'opacity-0 scale-x-0' : ''
                }`}
              />
              <span
                className={`block h-px bg-white w-full transition-all duration-300 origin-center ${
                  menuOpen ? '-rotate-45 -translate-y-[5px]' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col overflow-hidden"
            style={{ background: '#07070a' }}
          >
            {/* ── Decorative layers ───────────────────────── */}
            {/* Grid */}
            <div className="absolute inset-0 grid-lines opacity-[0.06]" />
            {/* Orange glow — bottom right */}
            <div
              className="absolute bottom-0 right-0 w-[340px] h-[340px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(247,148,29,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }}
            />
            {/* Orange glow — top left */}
            <div
              className="absolute top-0 left-0 w-[220px] h-[220px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(247,148,29,0.07) 0%, transparent 70%)', filter: 'blur(50px)' }}
            />
            {/* Left orange accent strip */}
            <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-orange/50 to-transparent" />
            {/* Watermark logo */}
            <div className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden">
              <Image
                src="/logo-icon.png"
                alt=""
                width={320}
                height={320}
                className="w-52 h-auto object-contain opacity-[0.04]"
                aria-hidden="true"
              />
            </div>

            {/* ── Top bar: logo + close ────────────────────── */}
            <div className="flex items-center justify-between px-7 pt-6 pb-0 shrink-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                <Image src="/logo-white.png" alt="Bricado" width={130} height={40} className="h-8 w-auto" />
              </motion.div>
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                onClick={() => setMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/60 hover:border-orange/60 hover:text-orange transition-all duration-200"
                aria-label="Close menu"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </motion.button>
            </div>

            {/* ── Nav links ───────────────────────────────── */}
            <div className="flex-1 flex flex-col justify-center px-7 py-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.18 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    className={`group flex items-center justify-between py-4 border-b transition-colors duration-200 ${
                      pathname === link.href
                        ? 'border-orange/30'
                        : 'border-white/[0.06] hover:border-orange/20'
                    }`}
                  >
                    <div className="flex items-baseline gap-4">
                      {/* Number */}
                      <span className="font-mono text-[10px] text-orange/50 tracking-widest w-5 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {/* Label */}
                      <span
                        className={`font-display text-[2.2rem] font-black uppercase leading-none tracking-tight transition-colors duration-200 ${
                          pathname === link.href ? 'text-orange' : 'text-white group-hover:text-orange'
                        }`}
                      >
                        {link.label}
                      </span>
                    </div>
                    {/* Arrow */}
                    <motion.span
                      className={`text-lg transition-colors duration-200 ${
                        pathname === link.href ? 'text-orange' : 'text-white/20 group-hover:text-orange'
                      }`}
                      animate={{ x: pathname === link.href ? 4 : 0 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* ── Bottom section ──────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.45 }}
              className="px-7 pb-8 shrink-0 space-y-5"
            >
              {/* CTA button */}
              <Link
                href="/distribution"
                className="flex items-center justify-between w-full bg-orange text-dark-deep text-[11px] font-black tracking-widest uppercase px-6 py-4 hover:bg-orange-light transition-colors duration-200"
              >
                Partner With Us
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              {/* Contact strip */}
              <div className="flex flex-col gap-2 pt-1">
                <a href="tel:+917025575112" className="flex items-center gap-2.5 text-silver-dark text-xs hover:text-orange transition-colors duration-200">
                  <span className="w-4 h-4 flex items-center justify-center text-orange/60">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M10 7.5c0 .28-.06.55-.2.8a1.7 1.7 0 01-.53.63c-.32.22-.67.33-1.02.33C7.7 9.26 7.1 9 6.44 8.5a13.7 13.7 0 01-1.74-1.7A13.54 13.54 0 013 5.06C2.5 4.4 2.25 3.8 2.25 3.25c0-.34.1-.67.3-.98a1.7 1.7 0 011.38-.77c.19 0 .38.04.55.12.18.08.34.2.46.38l1.55 2.19c.12.17.21.33.27.48.07.14.1.28.1.4 0 .16-.04.31-.13.46a2.1 2.1 0 01-.35.45c-.1.1-.14.2-.14.3 0 .05.01.1.04.16l.06.15c.24.43.51.83.83 1.19a7 7 0 001.26.98c.05.03.1.05.16.06.06.01.11.01.16.01.11 0 .21-.05.31-.14.1-.1.2-.21.3-.33.13-.12.27-.21.42-.27.16-.06.3-.09.47-.09z" fill="currentColor"/>
                    </svg>
                  </span>
                  +91 7025 575 112
                </a>
                <a href="mailto:info.bricado@gmail.com" className="flex items-center gap-2.5 text-silver-dark text-xs hover:text-orange transition-colors duration-200">
                  <span className="w-4 h-4 flex items-center justify-center text-orange/60">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <rect x="1" y="2.5" width="9" height="6" rx="1" stroke="currentColor" strokeWidth="1"/>
                      <path d="M1 3.5l4.5 3 4.5-3" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  info.bricado@gmail.com
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
