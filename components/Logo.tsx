'use client'

import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  }

  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <div className="relative">
        <div className="w-10 h-10 bg-primary-black flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-500">
          <span className="text-primary-gold font-bold text-xl">A</span>
        </div>
      </div>
      {showText && (
        <span
          className={`font-display font-bold tracking-wider ${sizes[size]} text-primary-black group-hover:text-primary-gold transition-colors duration-300`}
        >
          JK FASHION
          <span className="text-primary-gold">.</span>
        </span>
      )}
    </Link>
  )
}
