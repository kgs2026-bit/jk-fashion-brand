import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/lib/cart-context'

export const metadata: Metadata = {
  title: {
    default: 'JK Fashion Brand | Refined Streetwear for the Modern Minimalist',
    template: '%s | JK Fashion Brand',
  },
  description: 'Discover premium streetwear - oversized hoodies, t-shirts, cargos, jackets and sneakers. Minimal luxury meets urban style.',
  keywords: 'streetwear, luxury fashion, minimalist clothing, hoodies, t-shirts, premium apparel',
  openGraph: {
    title: 'JK Fashion Brand | Refined Streetwear',
    description: 'Premium streetwear for the modern minimalist. Shop our latest collections.',
    type: 'website',
    locale: 'en_US',
    siteName: 'JK Fashion Brand',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JK Fashion Brand - Premium Streetwear',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'JK Fashion Brand',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  metadataBase: new URL('https://jkfashionbrand.com'),
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A0A0A',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
