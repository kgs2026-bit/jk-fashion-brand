'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Quote } from 'lucide-react'

interface CaseStudyCardProps {
  title: string
  customer: string
  role?: string
  image: string
  description: string
  result: string
  index: number
}

export default function CaseStudyCard({ title, customer, role, image, description, result, index }: CaseStudyCardProps) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={`Case study: ${title}`}
          fill
          className="object-cover hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <Quote className="text-primary-gold mb-3" size={28} />
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
          <div className="w-12 h-12 rounded-full bg-primary-gold/20 flex items-center justify-center">
            <span className="text-primary-gold font-bold text-lg">{customer.charAt(0)}</span>
          </div>
          <div>
            <p className="font-bold text-primary-black">{customer}</p>
            {role && <p className="text-sm text-gray-500">{role}</p>}
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed">{description}</p>

        <div className="bg-primary-gold/10 border-l-4 border-primary-gold p-4 rounded">
          <p className="text-sm font-semibold text-primary-black mb-1">The Result</p>
          <p className="text-primary-black">{result}</p>
        </div>

        <Link
          href="/case-studies"
          className="flex items-center text-primary-black hover:text-primary-gold font-medium transition-colors duration-300 group"
        >
          <span>Read Full Story</span>
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  )
}
