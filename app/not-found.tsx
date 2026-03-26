'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Button from '@/components/Button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center max-w-2xl mx-auto px-4 py-20"
        >
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-display font-bold text-gray-100 leading-none">
              404
            </h1>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-12 text-lg">
            The page you&apos;re looking for seems to have drifted into the void.
            Let&apos;s get you back to solid ground.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg">
                <Home className="mr-2" size={20} />
                Back to Home
              </Button>
            </Link>
            <Link href="/shop">
              <Button size="lg" variant="outline">
                <ArrowLeft className="mr-2" size={20} />
                Browse Shop
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
