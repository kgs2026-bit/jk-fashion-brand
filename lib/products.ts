export interface Product {
  id: string
  title: string
  price: number
  description: string
  category: string
  images: string[]
  sizes: string[]
  inStock: boolean
  isNew?: boolean
  isBestSeller?: boolean
  isLimited?: boolean
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Oversized Noir Hoodie',
    price: 128,
    description: 'Premium heavyweight cotton hoodie with relaxed fit. Features brushed interior for ultimate comfort and a dropped shoulder construction for that perfect oversized silhouette. Made from 100% organic cotton.',
    category: 'Hoodies',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: true,
    isBestSeller: true,
  },
  {
    id: '2',
    title: 'Essentials Tee - White',
    price: 48,
    description: 'Ultra-soft premium cotton t-shirt with a relaxed fit. Heavyweight 220gsm fabric that holds its shape while providing exceptional comfort. Perfect for layering or standalone wear.',
    category: 'T-Shirts',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: '3',
    title: 'Tech Cargo Pant - Black',
    price: 168,
    description: 'Functional streetwear cargo pants with multiple pockets. Water-repellent technical fabric with a tapered leg. Features adjustable cuff and reinforced knee panels.',
    category: 'Pants',
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80',
      'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: false,
    isBestSeller: false,
  },
  {
    id: '4',
    title: 'Minimalist Bomber Jacket',
    price: 298,
    description: 'Sleek bomber jacket with hidden zip pockets. Waterproof outer shell with satin lining. Features ribbed collar and cuffs for a clean silhouette.',
    category: 'Jackets',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: true,
    isLimited: true,
  },
  {
    id: '5',
    title: 'Limited Drop Box Logo Hoodie',
    price: 168,
    description: 'Exclusive limited edition hoodie featuring embroidered box logo. Made from premium 400gsm fleece. Each piece numbered and individually packaged.',
    category: 'Hoodies',
    images: [
      'https://images.unsplash.com/photo-1578681994506-b8f463449011?w=800&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isLimited: true,
    isBestSeller: true,
  },
  {
    id: '6',
    title: 'Classic Low Top - White',
    price: 198,
    description: 'Minimalist leather sneaker with clean lines. Features cushioned insole and durable rubber outsole. Handcrafted using premium full-grain leather.',
    category: 'Sneakers',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80',
    ],
    sizes: ['7', '8', '9', '10', '11', '12'],
    inStock: true,
    isNew: true,
    isBestSeller: false,
  },
  {
    id: '7',
    title: 'Signature Crewneck - Charcoal',
    price: 88,
    description: 'Premium crewneck sweatshirt with relaxed fit. Made from 280gsm French terry cotton. Features ribbed collar and clean finish.',
    category: 'T-Shirts',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: '8',
    title: 'Essential Track Jacket',
    price: 178,
    description: 'Classic track jacket with contrasting stripes. Lightweight nylon shell with polyester lining. Features front zipper and zippered side pockets.',
    category: 'Jackets',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: false,
    isBestSeller: false,
  },
  {
    id: '9',
    title: 'Urban Cargo Jogger',
    price: 148,
    description: 'Modern jogger pants with tapered fit. Features multiple cargo pockets and elastic cuffs. Made from heavyweight cotton twill with stretch.',
    category: 'Pants',
    images: [
      'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&q=80',
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: false,
    isBestSeller: true,
  },
  {
    id: '10',
    title: 'Premium Zip-Up Hoodie',
    price: 158,
    description: 'Full-zip heavyweight hoodie with premium hardware. Features hand-warmer pockets and adjustable drawstring hood. Made from 350gsm organic cotton fleece.',
    category: 'Hoodies',
    images: [
      'https://images.unsplash.com/photo-1578681994506-b8f463449011?w=800&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isNew: false,
    isBestSeller: false,
  },
  {
    id: '11',
    title: 'Limited Edition High Top',
    price: 238,
    description: 'Exclusive high-top sneaker with premium leather upper. Features custom tread pattern and gold-accented hardware. Limited to 500 pairs worldwide.',
    category: 'Sneakers',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    ],
    sizes: ['7', '8', '9', '10', '11'],
    inStock: true,
    isLimited: true,
    isBestSeller: false,
  },
  {
    id: '12',
    title: 'Graphic Tee - Limited Collab',
    price: 68,
    description: 'Exclusive collaborative graphic t-shirt. Made from 100% organic cotton. Limited run with unique artwork.',
    category: 'T-Shirts',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isLimited: true,
    isNew: true,
  },
]

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id)
}

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category)
}

export const getNewDrops = (): Product[] => {
  return products.filter((product) => product.isNew)
}

export const getBestSellers = (): Product[] => {
  return products.filter((product) => product.isBestSeller)
}

export const getLimitedEdition = (): Product[] => {
  return products.filter((product) => product.isLimited)
}

export const getAllCategories = (): string[] => {
  const categories: string[] = []
  products.forEach((product) => {
    if (!categories.includes(product.category)) {
      categories.push(product.category)
    }
  })
  return categories
}
