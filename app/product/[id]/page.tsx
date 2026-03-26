'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, Minus, Plus, Check } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/Button'
import ProductCard from '@/components/ProductCard'
import { getProductById, products } from '@/lib/products'
import { useCart } from '@/lib/cart-context'

export default function ProductPage() {
  const params = useParams()
  const product = getProductById(params.id as string)
  const { addItem } = useCart()

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    )
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      size: selectedSize,
      quantity,
      image: product.images[0],
    })

    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }

    window.location.href = `/checkout?productId=${product.id}&productTitle=${encodeURIComponent(product.title)}&price=${product.price}&image=${encodeURIComponent(product.images[0])}&size=${selectedSize}`
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <Container>
        <nav className="py-6">
          <Link
            href="/shop"
            className="inline-flex items-center text-sm text-gray-600 hover:text-primary-black transition-colors duration-300"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to Shop
          </Link>
        </nav>
      </Container>

      {/* Product Details */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image Gallery */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="space-y-4"
          >
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? 'border-primary-black'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} view ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="150px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="mb-6">
              <p className="text-sm uppercase tracking-widest text-primary-gold mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                {product.title}
              </h1>
              <p className="text-3xl font-bold">${product.price}</p>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3">
                Select Size
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 border-2 font-bold transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-primary-black bg-primary-black text-white'
                        : 'border-gray-300 hover:border-primary-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3">
                Quantity
              </h3>
              <div className="flex items-center border border-gray-300 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
                  disabled={quantity <= 1}
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 h-12 flex items-center justify-center font-bold border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <Button
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={addedToCart ? 'bg-green-600 hover:bg-green-600' : ''}
              >
                {addedToCart ? (
                  <>
                    <Check size={20} className="mr-2" />
                    Added to Cart
                  </>
                ) : (
                  'Add to Cart'
                )}
              </Button>
              <Button
                size="lg"
                fullWidth
                variant="primary"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
              {!product.inStock && (
                <p className="text-sm text-red-600 text-center">Out of stock</p>
              )}
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-8 space-y-4">
              <div className="flex items-start gap-3">
                <Check size={20} className="text-primary-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Premium Quality</p>
                  <p className="text-sm text-gray-600">Hand-selected materials, ethical manufacturing</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check size={20} className="text-primary-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-gray-600">Complimentary on all orders over $100</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check size={20} className="text-primary-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Easy Returns</p>
                  <p className="text-sm text-gray-600">30-day hassle-free returns</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <Container>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-2">
                You May Also Like
              </h2>
              <p className="text-gray-600">More from the {product.category} collection</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  )
}
