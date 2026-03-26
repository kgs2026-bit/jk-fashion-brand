'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, CreditCard, Lock, Check, ShoppingBag, Shield } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/Button'
import { useCart } from '@/lib/cart-context'
import { getProductById } from '@/lib/products'

interface CheckoutProduct {
  id: string
  title: string
  price: number
  size: string
  quantity: number
  image: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { state, clearCart, addItem } = useCart()
  const [step, setStep] = useState<'cart' | 'shipping' | 'payment' | 'success'>('cart')
  const [shippingInfo, setShippingInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phone: '',
  })
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [loadingProduct, setLoadingProduct] = useState(true)

  // Get product from URL query param if coming from Buy Now
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const productId = params.get('productId')
    const productTitle = params.get('productTitle')
    const productPrice = params.get('price')
    const productImage = params.get('image')
    const sizeFromUrl = params.get('size')

    if (productId && state.items.length === 0) {
      // If coming from Buy Now with product details in URL, add to cart automatically
      if (productTitle && productPrice && productImage) {
        let selectedSize = sizeFromUrl

        // If no size in URL, get product and use first available size
        if (!selectedSize) {
          const product = getProductById(productId)
          selectedSize = product?.sizes[0] || 'M'
        }

        addItem({
          id: productId,
          title: decodeURIComponent(productTitle),
          price: parseFloat(productPrice),
          size: selectedSize,
          quantity: 1,
          image: decodeURIComponent(productImage),
        })
      }
      setLoadingProduct(false)
      // If cart now has items, proceed to shipping
      if (state.items.length > 0) {
        setStep('shipping')
      }
    } else {
      setLoadingProduct(false)
    }
  }, [state.items.length, addItem])

  // Force re-render when cart updates
  useEffect(() => {
    if (step === 'cart' && state.items.length > 0) {
      setStep('shipping')
    }
  }, [step, state.items.length])

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 15
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setStep('success')
    clearCart()
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  if (state.items.length === 0 && step === 'cart') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center py-20"
          >
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-6" />
            <h1 className="text-3xl font-display font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link href="/shop">
              <Button size="lg" className="bg-primary-gold text-black hover:bg-primary-gold-dark">
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </Container>
      </div>
    )
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="py-20 max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Check size={48} className="text-green-600" />
            </div>
            <h1 className="text-4xl font-display font-bold mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
            <p className="text-gray-600 mb-8">
              Order #JK{Date.now().toString().slice(-8)} - We&apos;ll send you a confirmation email shortly.
            </p>
            <div className="bg-white rounded-lg p-6 shadow-sm mb-8 text-left">
              <h3 className="font-bold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg" className="bg-primary-black text-white hover:bg-gray-900">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline">
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        {/* Header */}
        <div className="py-6 border-b">
          <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-primary-gold transition-colors">
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="py-12">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-4">
              {['Cart', 'Shipping', 'Payment'].map((label, index) => {
                const steps = ['cart', 'shipping', 'payment']
                const currentIndex = steps.indexOf(step)
                const isCompleted = index < currentIndex
                const isCurrent = index === currentIndex

                return (
                  <div key={label} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      isCompleted ? 'bg-primary-gold text-black' : isCurrent ? 'bg-primary-black text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {isCompleted ? <Check size={20} /> : index + 1}
                    </div>
                    <span className={`ml-2 font-medium ${isCurrent ? 'text-primary-black' : 'text-gray-500'}`}>
                      {label}
                    </span>
                    {index < 2 && <div className="w-16 h-0.5 mx-4 bg-gray-200" />}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 'cart' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="bg-white rounded-lg p-6 shadow-sm"
                >
                  <h2 className="text-2xl font-bold mb-6">Review Your Items</h2>
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="flex gap-4 pb-4 border-b">
                        <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{item.title}</h3>
                          <p className="text-gray-500">Size: {item.size}</p>
                          <p className="text-gray-500">Qty: {item.quantity}</p>
                          <p className="font-bold mt-2">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => {}}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button
                      size="lg"
                      onClick={() => setStep('shipping')}
                      className="bg-primary-black text-white hover:bg-gray-900"
                    >
                      Continue to Shipping
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === 'shipping' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="bg-white rounded-lg p-6 shadow-sm"
                >
                  <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-gold"
                          value={shippingInfo.firstName}
                          onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-gold"
                          value={shippingInfo.lastName}
                          onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-gold"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-gold"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">City</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-gold"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Country</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-gold"
                          value={shippingInfo.country}
                          onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Postal Code</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-gold"
                          value={shippingInfo.postalCode}
                          onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep('cart')}
                      >
                        Back
                      </Button>
                      <Button type="submit" className="bg-primary-black text-white hover:bg-gray-900">
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="bg-white rounded-lg p-6 shadow-sm"
                >
                  <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

                  <div className="space-y-4 mb-8">
                    <div
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        paymentMethod === 'card' ? 'border-primary-gold bg-primary-gold/5' : 'border-gray-200'
                      }`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === 'card' ? 'border-primary-gold' : 'border-gray-300'
                          }`}>
                            {paymentMethod === 'card' && <div className="w-3 h-3 rounded-full bg-primary-gold" />}
                          </div>
                          <CreditCard size={24} />
                          <span className="font-medium">Credit Card</span>
                        </div>
                        <div className="flex space-x-2">
                          <span className="px-2 py-1 bg-gray-100 text-xs rounded">Visa</span>
                          <span className="px-2 py-1 bg-gray-100 text-xs rounded">Mastercard</span>
                        </div>
                      </div>

                      {paymentMethod === 'card' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 space-y-4"
                        >
                          <div>
                            <label className="block text-sm font-medium mb-2">Card Number</label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-gold"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Expiry</label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-gold"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">CVV</label>
                              <input
                                type="text"
                                placeholder="123"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-gold"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        paymentMethod === 'paypal' ? 'border-primary-gold bg-primary-gold/5' : 'border-gray-200'
                      }`}
                      onClick={() => setPaymentMethod('paypal')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            paymentMethod === 'paypal' ? 'border-primary-gold' : 'border-gray-300'
                          }`}>
                            {paymentMethod === 'paypal' && <div className="w-3 h-3 rounded-full bg-primary-gold" />}
                          </div>
                          <span className="font-medium">PayPal</span>
                        </div>
                        <span className="text-blue-600 font-bold">PayPal</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep('shipping')}
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="bg-primary-black text-white hover:bg-gray-900"
                    >
                      {isProcessing ? (
                        <>
                          <span className="animate-spin mr-2">⏳</span>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock size={16} className="mr-2" />
                          Pay ${total.toFixed(2)}
                        </>
                      )}
                    </Button>
                  </div>

                  <p className="text-center text-sm text-gray-500 mt-4">
                    <Lock size={14} className="inline mr-1" />
                    Your payment information is secure and encrypted
                  </p>
                </motion.div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
                <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({state.items.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600' : ''}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {subtotal < 100 && (
                    <p className="text-xs text-gray-500">
                      Add ${(100 - subtotal).toFixed(2)} more for FREE shipping!
                    </p>
                  )}
                  <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-3 mt-3">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    <Lock size={14} />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Shield size={14} />
                    <span>256-bit SSL Encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
