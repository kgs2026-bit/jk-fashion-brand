'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Button from '@/components/Button'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart()

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="mb-8">
            <ShoppingBag size={80} className="text-gray-300 mx-auto" />
          </div>
          <h1 className="text-3xl font-display font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven&apos;t added anything to your cart yet.
            Start shopping and fill it up with some premium pieces!
          </p>
          <Link href="/shop">
            <Button size="lg">
              Start Shopping
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  const shipping = state.total > 100 ? 0 : 15
  const tax = state.total * 0.08
  const total = state.total + shipping + tax

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-primary-black text-white py-20">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-4">
              Your Cart
            </h1>
            <p className="text-xl text-gray-400">
              {state.itemCount} {state.itemCount === 1 ? 'item' : 'items'} in your bag
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Cart Content */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:col-span-2 space-y-4"
            >
              {state.items.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.size}`}
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-4 md:p-6 rounded-lg border border-gray-200"
                >
                  <div className="flex gap-4 md:gap-6">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link
                          href={`/product/${item.id}`}
                          className="text-lg font-bold text-primary-black hover:text-primary-gold transition-colors duration-300"
                        >
                          {item.title}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">
                          Size: {item.size}
                        </p>
                      </div>

                      <div className="flex items-end justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300">
                          <button
                            onClick={() =>
                              updateQuantity(`${item.id}-${item.size}`, item.quantity - 1)
                            }
                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-12 h-10 flex items-center justify-center font-medium border-x border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(`${item.id}-${item.size}`, item.quantity + 1)
                            }
                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors duration-300"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-bold">${item.price * item.quantity}</p>
                          <p className="text-sm text-gray-500">
                            ${item.price} each
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(`${item.id}-${item.size}`)}
                      className="text-gray-400 hover:text-red-600 transition-colors duration-300 self-start"
                      aria-label="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Clear Cart */}
              <div className="flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-500 hover:text-red-600 transition-colors duration-300"
                >
                  Clear Cart
                </button>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="bg-white p-6 md:p-8 rounded-lg border border-gray-200 sticky top-24">
                <h2 className="text-2xl font-display font-bold mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-medium">${state.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-sm text-green-600">
                      You qualify for free shipping!
                    </p>
                  )}
                  {shipping > 0 && (
                    <p className="text-sm text-gray-500">
                      Spend ${(100 - state.total).toFixed(2)} more for free shipping
                    </p>
                  )}
                  <div className="flex justify-between text-gray-700">
                    <span>Estimated Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button size="lg" fullWidth className="mb-4">
                  Proceed to Checkout
                </Button>

                <Link
                  href="/shop"
                  className="block text-center text-sm text-gray-600 hover:text-primary-gold transition-colors duration-300"
                >
                  Continue Shopping
                </Link>

                {/* Security Badge */}
                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                  <p className="text-xs text-gray-500 mb-2">
                    Secure Checkout Powered by
                  </p>
                  <div className="flex justify-center items-center space-x-2 text-sm text-gray-600">
                    <span>SSL</span>
                    <span>•</span>
                    <span>256-bit Encryption</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  )
}
