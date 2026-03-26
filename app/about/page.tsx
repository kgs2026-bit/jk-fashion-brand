'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Button from '@/components/Button'
import { ArrowRight, Award, Users, Heart, Sparkles } from 'lucide-react'

export default function AboutPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  const values = [
    {
      icon: Award,
      title: 'Craftsmanship',
      description: 'Every piece is meticulously crafted with attention to detail. We partner with skilled artisans who share our passion for quality.',
    },
    {
      icon: Heart,
      title: 'Sustainability',
      description: 'Committed to reducing our environmental impact through eco-friendly materials, ethical manufacturing, and transparent practices.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in supporting the communities that support us. A portion of every purchase goes to local youth arts programs.',
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'Constantly pushing boundaries in design and fabric technology to bring you the future of streetwear today.',
    },
  ]

  const team = [
    {
      name: 'Marcus Aurelius',
      role: 'Founder & Creative Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    },
    {
      name: 'Elena Rossi',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    },
    {
      name: 'David Kim',
      role: 'Operations Lead',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80"
            alt="About JK FASHION BRAND"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="relative z-10 text-center text-white max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Crafting the Future of Streetwear
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Where minimalism meets urban culture
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Story */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  JK FASHION BRAND was born from a simple belief: that streetwear could
                  be both minimalist and luxurious, functional and beautiful. Founded in
                  2020, we set out to create a brand that defies the conventional wisdom
                  that urban fashion must sacrifice quality for accessibility.
                </p>
                <p>
                  Our journey began in a small studio apartment, sketching designs that
                  merged the clean lines of Scandinavian minimalism with the raw energy
                  of street culture. Today, we&apos;ve grown into a global brand, but
                  our core values remain unchanged.
                </p>
                <p>
                  Every piece we create is a testament to our commitment to craftsmanship,
                  sustainability, and community. We don&apos;t just make clothes—we craft
                  expressions of modern identity.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/shop">
                  <Button size="lg">
                    Explore Collection
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="relative h-[600px] rounded-lg overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                alt="Our studio"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="p-10 bg-white rounded-lg"
            >
              <h3 className="text-3xl font-display font-bold mb-6">Our Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To redefine streetwear through minimalist design, uncompromising quality,
                and sustainable practices. We strive to create timeless pieces that
                transcend trends while empowering individuals to express their authentic
                selves through fashion.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="p-10 bg-white rounded-lg"
            >
              <h3 className="text-3xl font-display font-bold mb-6">Our Vision</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become the global benchmark for premium streetwear, leading the industry
                in sustainability while inspiring a generation of conscious consumers who
                value both style and substance.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              What We Stand For
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-primary-gold/10 flex items-center justify-center">
                  <value.icon size={32} className="text-primary-gold" />
                </div>
                <h3 className="text-xl font-bold">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-20 bg-primary-black text-white">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Meet the Team
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The visionaries behind JK FASHION BRAND
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.2 }}
                className="text-center space-y-4"
              >
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-primary-gold">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-primary-gold">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-gold">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary-black mb-6">
              Ready to Join the Movement?
            </h2>
            <p className="text-lg text-primary-black/80 mb-8">
              Explore our latest collection and find your next signature piece.
            </p>
            <Link href="/shop">
              <Button size="lg" className="bg-primary-black text-white hover:bg-gray-900">
                Shop Now
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>
    </div>
  )
}
