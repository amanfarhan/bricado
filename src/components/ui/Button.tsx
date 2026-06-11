'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps {
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  external?: boolean
}

export function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  children,
  className,
  external,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-3 font-sans font-bold tracking-widest uppercase transition-all duration-300 relative overflow-hidden group'

  const variants = {
    primary: 'bg-orange text-dark-deep hover:bg-orange-light hover:shadow-xl hover:shadow-orange/20',
    secondary:
      'border border-silver/30 text-silver hover:border-orange hover:text-orange bg-transparent',
    ghost: 'text-silver hover:text-orange bg-transparent',
  }

  const sizes = {
    sm: 'text-[10px] px-5 py-2.5',
    md: 'text-xs px-7 py-3.5',
    lg: 'text-sm px-10 py-4',
  }

  const cls = cn(base, variants[variant], sizes[size], className)

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-orange-dark transition-transform duration-500 ease-out" />
      )}
    </>
  )

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        {external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
            {inner}
          </a>
        ) : (
          <Link href={href} className={cls}>
            {inner}
          </Link>
        )}
      </motion.div>
    )
  }

  return (
    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onClick} className={cls}>
      {inner}
    </motion.button>
  )
}
