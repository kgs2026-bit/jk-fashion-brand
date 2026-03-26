'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import ProductCard from '@/components/ProductCard'
import Button from '@/components/Button'
import { products, getNewDrops, getBestSellers } from '@/lib/products'
import { ArrowRight, Truck, Shield, Leaf, Star, Mail } from 'lucide-react'
import CaseStudyCard from '@/components/CaseStudyCard'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const newDrops = getNewDrops()
  const bestSellers = getBestSellers()

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Newsletter signup:', email)
    setEmail('')
    alert('Thank you for subscribing!')
  }

  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Fashion Enthusiast',
      text: 'The quality is unmatched. Best streetwear I own hands down.',
      rating: 5,
    },
    {
      name: 'Sarah Miller',
      role: 'Style Blogger',
      text: 'Minimal luxury at its finest. Every piece is a statement.',
      rating: 5,
    },
    {
      name: 'Marcus Johnson',
      role: 'Creative Director',
      text: 'Finally found a brand that understands modern minimalism.',
      rating: 5,
    },
  ]

  const caseStudies = [
    {
      title: 'Complete Wardrobe Refresh',
      customer: 'Elena Rodriguez',
      role: 'Architect, NYC',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
      description: 'As an architect, Elena needed a wardrobe that reflected her professional yet urban lifestyle. She worked with our stylists to curate a complete collection of 12 pieces that could mix and match for both client meetings and weekend outings.',
      result: 'Elena now has a capsule wardrobe that saves her 2+ hours each morning while maintaining her sophisticated style. "The quality is incredible—everything fits perfectly and gets compliments everywhere I go."',
    },
    {
      title: 'Sustainable Fashion Journey',
      customer: 'James Mitchell',
      role: 'Environmental Consultant',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      description: 'James wanted to align his fashion choices with his environmental values. He switched entirely to our sustainable collection, choosing pieces made from organic cotton, recycled materials, and ethical production methods.',
      result: 'In 6 months, James replaced 80% of his fast fashion items with JK Fashion sustainable pieces. "I feel good about every purchase now. The materials are premium, and knowing the ethical standards behind each piece makes the investment worth it."',
    },
    {
      title: 'From Casual to CEO Ready',
      customer: 'David Park',
      role: 'Tech Startup Founder',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80',
      description: 'David needed to upgrade his casual streetwear aesthetic to something more boardroom-appropriate without losing his urban edge. Our team created a custom collection blending minimalist tailoring with streetwear influences.',
      result: 'David successfully transitioned from hoodies to heritage blazers while maintaining his authentic style. "JK Fashion understood exactly what I needed—pieces that work for investor meetings and still feel like me. My wardrobe finally reflects both sides of my life."',
    },
  ]

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=80"
            alt="Hero background"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>
        </div>

        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-3xl text-white"
          >
            <p className="text-sm md:text-base uppercase tracking-widest text-primary-gold mb-4">
              New Collection 2025
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight">
              Refined Streetwear for the
              <span className="block text-primary-gold">Modern Minimalist</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl">
              Elevating urban essentials through minimalist design, premium fabrics,
              and meticulous craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary-gold text-primary-black hover:bg-primary-gold-dark">
                Shop Collection
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                Explore Lookbook
              </Button>
            </div>
          </motion.div>
        </Container>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 bg-white rounded-full"
            ></motion.div>
          </div>
        </motion.div>
      </section>

      {/* Brand Values */}
      <section className="py-20 bg-primary-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Premium Quality', desc: 'Hand-selected fabrics, ethical manufacturing' },
              { icon: Leaf, title: 'Sustainable', desc: 'Eco-friendly materials and processes' },
              { icon: Truck, title: 'Free Shipping', desc: 'Complimentary shipping on all orders' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center text-center space-y-4 p-6"
              >
                <div className="w-16 h-16 rounded-full bg-primary-gold/10 flex items-center justify-center">
                  <item.icon size={28} className="text-primary-gold" />
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* New Drops */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-sm uppercase tracking-widest text-primary-gold mb-2">Just In</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold">New Drops</h2>
            </div>
            <Link
              href="/shop?filter=new"
              className="hidden md:flex items-center space-x-2 text-primary-black hover:text-primary-gold transition-colors duration-300 group"
            >
              <span className="font-medium">View All</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newDrops.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/shop?filter=new">
              <Button variant="outline">View All New Drops</Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Featured Collection Banner */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1550614000-4b9519e08d06?w=1920&q=80"
            alt="Essentials Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white space-y-6"
          >
            <p className="text-sm uppercase tracking-widest text-primary-gold">Must-Have Pieces</p>
            <h2 className="text-5xl md:text-7xl font-display font-bold">The Essentials</h2>
            <p className="text-xl text-gray-300 max-w-2xl">
              Timeless designs, premium materials. Our essential collection features
              the building blocks of a minimalist wardrobe.
            </p>
            <Link href="/shop?category=All">
              <Button size="lg" className="bg-white text-black hover:bg-primary-gold hover:text-black">
                Shop Essentials
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* Best Sellers */}
      <section className="py-20 bg-primary-white">
        <Container>
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-sm uppercase tracking-widest text-primary-gold mb-2">Fan Favorites</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold">Best Sellers</h2>
            </div>
            <Link
              href="/shop?filter=best"
              className="hidden md:flex items-center space-x-2 text-primary-black hover:text-primary-gold transition-colors duration-300 group"
            >
              <span className="font-medium">View All</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/shop?filter=best">
              <Button variant="outline">View All Best Sellers</Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-primary-black text-white">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">What People Say</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Trusted by thousands of fashion-forward individuals worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.2 }}
                className="p-8 bg-gray-900 rounded-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-primary-gold fill-primary-gold" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-gray-50">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-widest text-primary-gold mb-2">Real Stories</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold">Customer Case Studies</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Discover how our customers transformed their wardrobes and elevated their style with JK Fashion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={index} {...study} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-50">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-2xl mx-auto text-center space-y-8"
          >
            <div className="flex justify-center mb-4">
              <Mail size={48} className="text-primary-gold" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold">Stay in the Loop</h2>
            <p className="text-lg text-gray-600">
              Subscribe for exclusive drops, early access to new arrivals, and 10% off your first order.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 bg-white border border-gray-300 focus:outline-none focus:border-primary-gold transition-colors duration-300"
              />
              <Button type="submit" size="lg">
                Subscribe
              </Button>
            </form>
            <p className="text-sm text-gray-500">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </motion.div>
        </Container>
      </section>
    </div>
  )
}
