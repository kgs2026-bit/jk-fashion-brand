'use client'

import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Quote, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Button from '@/components/Button'

const caseStudies = [
  {
    slug: 'wardrobe-refresh',
    title: 'Complete Wardrobe Refresh',
    customer: 'Elena Rodriguez',
    role: 'Architect, NYC',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80',
    challenge: 'As an architect with a demanding schedule, Elena needed a wardrobe that could transition seamlessly from client presentations to casual weekend outings. Her existing closet was filled with fast fashion pieces that didn\'t fit well or reflect her professional status.',
    solution: 'Our styling team conducted a personal consultation to understand Elena\'s lifestyle, body type, and aesthetic preferences. We curated a capsule collection of 12 versatile pieces focusing on neutral tones with premium fabrics. The collection emphasized mix-and-match potential to maximize outfit combinations.',
    results: [
      'Reduced morning decision time by 2+ hours',
      'Increased confidence in professional settings',
      'Received 15+ compliments in the first week',
      'Identified as 100% sustainable wardrobe within 6 months'
    ],
    testimonial: 'The quality is incredible—everything fits perfectly. I\'ve never felt so put together with so little effort. JK Fashion truly understands what it means to dress a modern professional.',
    metrics: {
      'Items Purchased': 12,
      'Time Saved': '2+ hours daily',
      Satisfaction: '100%',
      Investment: '$3,200'
    }
  },
  {
    slug: 'sustainable-journey',
    title: 'Sustainable Fashion Journey',
    customer: 'James Mitchell',
    role: 'Environmental Consultant',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
    challenge: 'As an environmental consultant, James felt hypocritical wearing fast fashion. He wanted to align his wardrobe with his values but struggled to find brands that were both sustainable and stylish. Many eco-friendly options looked too "earthy" or lacked modern aesthetics.',
    solution: 'We introduced James to our sustainable collection, highlighting pieces made from organic cotton, Tencel™, and recycled materials. Over 9 months, we gradually replaced his fast fashion items, prioritizing versatile, high-quality pieces with transparent supply chains.',
    results: [
      'Replaced 80% of fast fashion wardrobe',
      'Carbon footprint reduced by an estimated 2.3 tons CO2e',
      'Every purchase now aligns with ethical standards',
      'Inspired 12+ friends to switch to sustainable fashion'
    ],
    testimonial: 'I feel good about every purchase now. The materials are premium, and knowing the ethical standards behind each piece makes the investment worth it. It\'s fashion with a conscience.',
    metrics: {
      'Items Purchased': 18,
      'Fast Fashion Replaced': '80%',
      'CO₂ Reduction': '2.3 tons',
      Investment: '$4,500'
    }
  },
  {
    slug: 'casual-to-ceo',
    title: 'From Casual to CEO Ready',
    customer: 'David Park',
    role: 'Tech Startup Founder',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=80',
    challenge: 'David\'s tech startup had grown to the point where he needed to present a more professional image to investors and enterprise clients. However, he didn\'t want to abandon his streetwear roots entirely. He needed pieces that felt authentic while commandiing respect in boardrooms.',
    solution: 'Our team created a custom collection blending minimalist tailoring with streetwear influences. Key pieces included slim-fit chinos, premium knits, unstructured blazers, and minimalist leather accessories. We focused on subtle details like hidden closures and technical fabrics that bridged both worlds.',
    results: [
      'Successfully closed Series B funding round',
      'Professional image increased client acquisition by 40%',
      'Wardrobe now works for both office and social settings',
      'Maintained personal style while elevating professionalism'
    ],
    testimonial: 'JK Fashion understood exactly what I needed—pieces that work for investor meetings and still feel like me. My wardrobe finally reflects both sides of my life without compromise.',
    metrics: {
      'Items Purchased': 15,
      'Funding Raised': '$25M',
      'Client Growth': '+40%',
      Investment: '$5,800'
    }
  }
]

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const caseStudy = caseStudies.find((study) => study.slug === slug)

  if (!caseStudy) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-primary-white">
      {/* Hero */}
      <section className="relative py-32 bg-primary-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={caseStudy.image}
            alt={caseStudy.title}
            className="w-full h-full object-cover"
          />
        </div>
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="relative z-10 max-w-3xl"
          >
            <Link href="/case-studies" className="inline-flex items-center text-gray-400 hover:text-primary-gold transition-colors mb-6">
              <ArrowLeft size={20} className="mr-2" />
              All Case Studies
            </Link>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              {caseStudy.title}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-primary-gold/20 flex items-center justify-center">
                <span className="text-primary-gold font-bold text-2xl">{caseStudy.customer.charAt(0)}</span>
              </div>
              <div>
                <p className="font-bold text-xl">{caseStudy.customer}</p>
                <p className="text-gray-400">{caseStudy.role}</p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-20">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          >
            {/* Image */}
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={caseStudy.image}
                alt={caseStudy.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Content */}
            <div className="space-y-8">
              {/* Challenge */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-primary-black">The Challenge</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{caseStudy.challenge}</p>
              </div>

              {/* Solution */}
              <div>
                <h2 className="text-2xl font-bold mb-4 text-primary-black">Our Solution</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{caseStudy.solution}</p>
              </div>

              {/* Results */}
              <div className="bg-primary-gold/10 p-8 rounded-xl border-l-4 border-primary-gold">
                <h2 className="text-2xl font-bold mb-6 text-primary-black flex items-center">
                  <CheckCircle className="mr-3 text-primary-gold" size={28} />
                  The Results
                </h2>
                <ul className="space-y-4">
                  {caseStudy.results.map((result, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle size={20} className="text-primary-gold mr-4 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-lg">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testimonial */}
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                <Quote className="text-primary-gold mb-4" size={32} />
                <p className="text-gray-700 italic text-lg mb-4">"{caseStudy.testimonial}"</p>
                <p className="font-semibold text-primary-black text-lg">— {caseStudy.customer}</p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(caseStudy.metrics).map(([key, value]) => (
                  <div key={key} className="bg-white border border-gray-200 p-6 rounded-lg text-center shadow-sm">
                    <p className="text-3xl font-bold text-primary-gold mb-2">{value}</p>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">{key}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-black text-white">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Inspired by these stories? Let us help you create your own transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg" className="bg-primary-gold text-primary-black hover:bg-primary-gold-dark">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  )
}
