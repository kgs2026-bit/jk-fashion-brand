'use client'

import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizes = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-14 w-auto',
  }

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  }

  return (
    <Link href="/" className={`flex items-center space-x-2 group ${className}`}>
      <div className={`relative ${sizes[size]}`}>
        <Image
          src="/logo.jpg"
          alt="JK Fashion Brand"
          width={100}
          height={100}
          className="object-contain transition-transform duration-500 group-hover:rotate-12"
          priority
        />
      </div>
      {showText && (
        <span
          className={`font-display font-bold tracking-wider ${textSizes[size]} text-primary-black group-hover:text-primary-gold transition-colors duration-300`}
        >
          JK FASHION
          <span className="text-primary-gold">.</span>
        </span>
      )}
    </Link>
  )
}
