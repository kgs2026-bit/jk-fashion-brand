'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { Product } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import Button from '@/components/Button'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showSizeModal, setShowSizeModal] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const { addItem } = useCart()

  const handleAddToCart = () => {
    if (selectedSize) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        size: selectedSize,
        quantity: 1,
        image: product.images[0],
      })
      setShowSizeModal(false)
      setSelectedSize('')
    }
  }

  const getBadgeText = () => {
    if (product.isLimited) return 'LIMITED'
    if (product.isNew) return 'NEW'
    return null
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/product/${product.id}`}>
          <div className="relative aspect-square overflow-hidden bg-gray-100 mb-4">
            <Image
              src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
              alt={product.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            {/* Badge */}
            {getBadgeText() && (
              <span
                className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                  product.isLimited
                    ? 'bg-primary-gold text-primary-black'
                    : 'bg-primary-black text-white'
                }`}
              >
                {getBadgeText()}
              </span>
            )}

            {/* Quick Action Buttons */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-sm">
              <Button
                variant="secondary"
                size="sm"
                fullWidth
                onClick={(e) => {
                  e.preventDefault()
                  setShowSizeModal(true)
                }}
                className="mb-2"
              >
                <ShoppingBag size={16} className="mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="secondary"
                size="sm"
                fullWidth
                onClick={(e) => {
                  e.preventDefault()
                  // Navigate directly to checkout with product info and default size
                  const defaultSize = product.sizes[0] || 'M'
                  window.location.href = `/checkout?productId=${product.id}&productTitle=${encodeURIComponent(product.title)}&price=${product.price}&image=${encodeURIComponent(product.images[0])}&size=${defaultSize}`
                }}
              >
                Buy Now
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-gray-500 uppercase tracking-wider">{product.category}</p>
            <h3 className="text-base font-medium text-primary-black group-hover:text-primary-gold transition-colors duration-300">
              {product.title}
            </h3>
            <p className="text-lg font-bold">${product.price}</p>
          </div>
        </Link>

        {/* Size Selection Modal */}
        <AnimatePresence>
          {showSizeModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
              onClick={() => setShowSizeModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-lg p-6 max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-bold mb-4">Select Size</h3>
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 border-2 transition-all duration-200 ${
                        selectedSize === size
                          ? 'border-primary-black bg-primary-black text-white'
                          : 'border-gray-300 hover:border-primary-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setShowSizeModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    disabled={!selectedSize}
                    onClick={handleAddToCart}
                    fullWidth
                  >
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
