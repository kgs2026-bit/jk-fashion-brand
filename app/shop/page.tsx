'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, ChevronDown } from 'lucide-react'
import Container from '@/components/ui/Container'
import ProductCard from '@/components/ProductCard'
import Button from '@/components/Button'
import { products, getAllCategories } from '@/lib/products'

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [showFilters, setShowFilters] = useState(false)

  const categories = ['All', ...getAllCategories()]

  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Price filter
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        break
    }

    return filtered
  }, [selectedCategory, sortBy, priceRange])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-primary-black text-white py-20 md:py-28">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-4">Shop All</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore our complete collection of premium streetwear essentials
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Filters & Products */}
      <section className="py-12">
        <Container>
          {/* Filter Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full"
            >
              <SlidersHorizontal size={18} className="mr-2" />
              Filters
            </Button>

            <div className="hidden lg:flex items-center gap-8 flex-wrap">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-primary-black text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:border-primary-black'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Price Range */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Price:</span>
                <select
                  value={`${priceRange[0]}-${priceRange[1]}`}
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-').map(Number)
                    setPriceRange([min, max])
                  }}
                  className="px-3 py-2 border border-gray-300 bg-white text-sm focus:outline-none focus:border-primary-black"
                >
                  <option value="0-500">All Prices</option>
                  <option value="0-100">Under $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200-500">$200+</option>
                </select>
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none px-4 py-2 border border-gray-300 bg-white pr-10 text-sm focus:outline-none focus:border-primary-black cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mb-8 p-6 bg-white rounded-lg border border-gray-200 space-y-6"
            >
              <div>
                <h3 className="font-bold mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-primary-black text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-3">Price Range</h3>
                <select
                  value={`${priceRange[0]}-${priceRange[1]}`}
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-').map(Number)
                    setPriceRange([min, max])
                  }}
                  className="w-full px-4 py-2 border border-gray-300 bg-white text-sm focus:outline-none focus:border-primary-black"
                >
                  <option value="0-500">All Prices</option>
                  <option value="0-100">Under $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200-500">$200+</option>
                </select>
              </div>
            </motion.div>
          )}

          {/* Results Count */}
          <p className="text-sm text-gray-600 mb-8">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600 mb-4">No products found</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory('All')
                  setPriceRange([0, 500])
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </Container>
      </section>
    </div>
  )
}
