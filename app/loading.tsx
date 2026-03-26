'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'

export default function Loading() {
  const skeletonClass = "animate-pulse bg-gray-200 rounded"

  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <section className="h-screen bg-gray-100">
        <Container className="h-full flex items-center">
          <div className="max-w-3xl space-y-4">
            <div className={skeletonClass + " h-4 w-32"}/>
            <div className={skeletonClass + " h-16 md:h-24 w-full max-w-lg"}/>
            <div className={skeletonClass + " h-16 md:h-24 w-3/4"}/>
            <div className="space-y-2 pt-4">
              <div className={skeletonClass + " h-6 w-full max-w-md"}/>
              <div className={skeletonClass + " h-6 w-3/4 max-w-sm"}/>
            </div>
            <div className="flex gap-4 pt-6">
              <div className={skeletonClass + " h-12 w-48"}/>
              <div className={skeletonClass + " h-12 w-48"}/>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
