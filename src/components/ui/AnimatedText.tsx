'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedTextProps {
  children: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  stagger?: number
  delay?: number
  once?: boolean
}

export function AnimatedText({
  children,
  className,
  as: Tag = 'h2',
  stagger = 0.04,
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const words = el.querySelectorAll('.word-wrap > span')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: once ? 'play none none none' : 'play none none reset',
      },
    })

    tl.fromTo(
      words,
      { y: '110%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 0.9,
        stagger,
        delay,
        ease: 'power4.out',
      }
    )

    return () => {
      tl.kill()
    }
  }, [children, stagger, delay, once])

  const wordList = children.split(' ')

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={containerRef} className={cn('flex flex-wrap gap-x-[0.3em] gap-y-0', className)}>
      {wordList.map((word, i) => (
        <span key={i} className="word-wrap overflow-hidden">
          <span className="inline-block">{word}</span>
        </span>
      ))}
    </Tag>
  )
}
