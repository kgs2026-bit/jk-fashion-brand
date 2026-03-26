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

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  }

  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <div className="relative">
        <div className={`${iconSizes[size]} bg-gradient-to-br from-primary-black to-gray-800 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500 shadow-lg`}>
          <span className="text-primary-gold font-bold text-lg md:text-xl lg:text-2xl tracking-wider">JK</span>
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
