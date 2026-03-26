'use client'

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
      itemsPurchased: 12,
      timeSaved: '2+ hours daily',
      satisfaction: '100%',
      investment: '$3,200'
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
      itemsPurchased: 18,
      fastFashionReplaced: '80%',
      co2Reduction: '2.3 tons',
      investment: '$4,500'
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
      itemsPurchased: 15,
      fundingRaised: '$25M',
      clientGrowth: '+40%',
      investment: '$5,800'
    }
  }
]

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-primary-white">
      {/* Hero */}
      <section className="relative py-32 bg-primary-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1550614000-4b9519e08d06?w=1920&q=80"
            alt="Case Studies Hero"
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
            <Link href="/" className="inline-flex items-center text-gray-400 hover:text-primary-gold transition-colors mb-6">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Customer <span className="text-primary-gold">Stories</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Real transformations, real results. Discover how JK Fashion has helped
              customers elevate their style and transform their wardrobes.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <Container>
          <div className="space-y-24">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image */}
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-primary-gold text-sm uppercase tracking-widest mb-2">Case Study</p>
                    <h2 className="text-3xl font-bold text-white">{study.title}</h2>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  {/* Customer Info */}
                  <div className="flex items-center space-x-4 pb-4 border-b border-gray-200">
                    <div className="w-16 h-16 rounded-full bg-primary-gold/20 flex items-center justify-center">
                      <span className="text-primary-gold font-bold text-2xl">{study.customer.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-bold text-xl text-primary-black">{study.customer}</p>
                      <p className="text-gray-500">{study.role}</p>
                    </div>
                  </div>

                  {/* Challenge */}
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-primary-black">The Challenge</h3>
                    <p className="text-gray-600 leading-relaxed">{study.challenge}</p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-primary-black">Our Solution</h3>
                    <p className="text-gray-600 leading-relaxed">{study.solution}</p>
                  </div>

                  {/* Results */}
                  <div className="bg-primary-gold/10 p-6 rounded-xl border-l-4 border-primary-gold">
                    <h3 className="text-lg font-bold mb-4 text-primary-black flex items-center">
                      <CheckCircle className="mr-2 text-primary-gold" size={20} />
                      The Results
                    </h3>
                    <ul className="space-y-3">
                      {study.results.map((result, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle size={16} className="text-primary-gold mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <Quote className="text-primary-gold mb-3" size={24} />
                    <p className="text-gray-700 italic mb-4">"{study.testimonial}"</p>
                    <p className="font-semibold text-primary-black">— {study.customer}</p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(study.metrics).map(([key, value]) => (
                      <div key={key} className="bg-white border border-gray-200 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary-gold">{value}</p>
                        <p className="text-sm text-gray-500 uppercase tracking-wide mt-1">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
              Ready to Transform Your Wardrobe?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join hundreds of satisfied customers who have elevated their style with JK Fashion.
              Let us help you discover your perfect look.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg" className="bg-primary-gold text-primary-black hover:bg-primary-gold-dark">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  Book a Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  )
}
