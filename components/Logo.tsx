'use client'

import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  }

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  }

  return (
    <Link href="/" className={`flex items-center space-x-2 group ${className}`}>
      <div className={`${iconSizes[size]} text-primary-gold group-hover:rotate-12 transition-transform duration-500`}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <g fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
            {/* J and K combined monogram */}
            <path d="M 30 20 L 30 78 Q 30 95 68 82" />
            <path d="M 30 50 L 72 25 M 30 50 L 72 80" />
          </g>
        </svg>
      </div>
      {showText && (
        <span
          className={`font-display font-bold tracking-wider ${sizes[size]} group-hover:text-primary-gold transition-colors duration-300`}
        >
          JK FASHION
          <span className="text-primary-gold">.</span>
        </span>
      )}
    </Link>
  )
}
