# JK Fashion Brand

**Refined Streetwear for the Modern Minimalist**

A production-ready, premium fashion brand e-commerce website built with Next.js 14, Tailwind CSS, and Framer Motion.

---

## Features

- Modern minimal design inspired by Fear of God, Zara, and Nike
- Fully responsive mobile-first design
- Smooth animations with Framer Motion
- Complete shopping cart functionality with localStorage persistence
- Advanced filtering and sorting on shop page
- Product image gallery with hover effects
- Size selection modal
- Newsletter signup with form validation
- SEO optimized with proper meta tags
- Typography hierarchy using Inter & Playfair Display
- Custom color scheme (Black, Off-white, Gold)
- PWA-ready with manifest.json
- Sitemap.xml & robots.txt
- 404 error page
- Loading states
- Favicon support
- Social media links (Instagram, Twitter, Facebook, YouTube)
- Brand storytelling sections
- Customer testimonials
- Free shipping threshold
- Order summary with tax calculation

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 11
- **Icons**: Lucide React
- **Language**: TypeScript
- **Image Optimization**: Next.js Image component

---

## Project Structure

```
jk-fashion-brand/
├── app/
│   ├── globals.css          # Global styles & Tailwind imports
│   ├── layout.tsx           # Root layout + SEO metadata
│   ├── page.tsx             # Homepage (hero, collections, testimonials)
│   ├── loading.tsx          # Global loading state
│   ├── not-found.tsx        # 404 error page
│   ├── sitemap.xml          # SEO sitemap
│   ├── robots.txt           # Search engine directives
│   ├── shop/
│   │   └── page.tsx         # Shop page with filters
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx     # Product detail page
│   ├── about/
│   │   └── page.tsx         # About page
│   ├── contact/
│   │   └── page.tsx         # Contact page
│   └── cart/
│       └── page.tsx         # Shopping cart
├── components/
│   ├── Navbar.tsx           # Sticky nav + mobile menu
│   ├── Footer.tsx           # Premium footer + newsletter
│   ├── ProductCard.tsx      # Product cards + add-to-cart modal
│   ├── Button.tsx           # Reusable button (4 variants)
│   ├── Input.tsx            # Reusable form input
│   ├── Logo.tsx             # Brand logo component
│   ├── index.ts             # Barrel export for cleaner imports
│   └── ui/
│       └── Container.tsx    # Max-width container
├── lib/
│   ├── cart-context.tsx     # Cart state (Context API + localStorage)
│   └── products.ts          # 12 products + category helpers
├── public/
│   ├── manifest.json        # PWA manifest
│   └── favicon.svg          # Brand favicon
├── .env.local.example       # Environment variables template
├── .gitignore
├── DEPLOYMENT.md            # Complete deployment guide
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── postcss.config.js
```

---

## Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

---

## Pages

### Homepage (`/`)
- Full-width hero section with bold typography
- Featured brand values (Quality, Sustainability, Shipping)
- New Drops collection
- Featured Essentials banner
- Best Sellers section
- Customer testimonials
- Newsletter signup

### Shop (`/shop`)
- Full product grid
- Category filters
- Price range filter
- Sorting options (Newest, Price Low-High, Price High-Low, Popular)
- Responsive mobile filter drawer
- Hover effects with quick add to cart

### Product Detail (`/product/[id]`)
- Image gallery with thumbnails
- Size selector (S, M, L, XL - varies by product)
- Quantity selector
- Add to cart with instant feedback
- Related products section
- Product value highlights

### About (`/about`)
- Brand story with immersive imagery
- Mission & Vision statements
- Core values (Craftsmanship, Sustainability, Community, Innovation)
- Team section
- Call-to-action to shop

### Contact (`/contact`)
- Clean contact form with validation
- Contact information (Email, Phone, Address, Hours)
- Social media links
- Map placeholder

### Cart (`/cart`)
- Cart items with images
- Quantity update controls
- Remove item functionality
- Order summary with subtotal, shipping, tax, and total
- Free shipping threshold indicator ($100+)
- Checkout button (UI only)
- Continue shopping link
- Empty state design

---

## Components

### Button
Fully customizable button with variants:
- `primary` (default) - Black with white text
- `secondary` - Gold with black text
- `outline` - Border only
- `ghost` - Transparent background

Sizes: `sm`, `md`, `lg`

### Input
Accessible input with:
- Label support
- Error state styling
- Helper text
- Full customization

### ProductCard
Hover effects with:
- Secondary image on hover
- Quick add to cart button
- Size selection modal
- Badges (NEW, LIMITED)
- Add to cart functionality

### Navbar
- Sticky positioning
- Mobile responsive hamburger menu
- Cart count badge
- Smooth hover animations

### Footer
- Newsletter signup
- Multi-column link sections
- Social media icons
- Copyright and legal links

---

## Cart Functionality

The cart uses React Context API with:
- Adding items (auto-updates size combinations)
- Removing items
- Updating quantities
- Persistent storage (localStorage)
- Automatic total calculation
- Item count badge

Cart state persists across page refreshes.

---

## Styling

- **Primary Colors**:
  - Black: `#0A0A0A`
  - Off-white: `#F5F5F5`
  - Gold: `#C9A96E`

- **Fonts**:
  - Sans-serif: Inter (body text, UI elements)
  - Serif: Playfair Display (headings)

- **Design Principles**:
  - High-end spacing
  - Bold typography
  - Minimal aesthetics
  - Subtle animations
  - Premium micro-interactions

---

## Customization

### Update Brand Info
Edit the following in each page component:
- Brand name appears in `Navbar.tsx`, `Footer.tsx`, and metadata in `layout.tsx`
- Tagline in `app/page.tsx` hero section
- Colors in `tailwind.config.ts`

### Add More Products
Edit `lib/products.ts` and add new product objects to the `products` array.

Product structure:
```typescript
{
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
```

### Modify Color Scheme
Update the `tailwind.config.ts` `theme.extend.colors` section.

---

## Performance Optimizations

- Next.js Image component for optimized images
- Lazy loading for below-the-fold content
- Static generation where possible
- Efficient re-renders with React Context
- Optimized bundles

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Future Enhancements

Potential additions for production deployment:
- Stripe/PayPal integration for checkout
- User authentication & profiles
- Order history & tracking
- Product reviews & ratings
- Wishlist functionality
- Email confirmations with Nodemailer
- Admin dashboard for inventory management
- API routes with database backend
- Search functionality
- Size recommendation engine
- Instagram feed integration
- Advanced analytics

---

## Deployment

Ready for deployment on:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting

For Vercel:
```bash
vercel --prod
```

---

## License

Proprietary - All rights reserved by JK Fashion Brand

---

## Credits

Design & Development: JK Fashion Brand Team
Built with Next.js & Tailwind CSS
Icons: Lucide
Images: Unsplash contributors

---

## Support

For technical questions or issues, please refer to the Next.js documentation or Tailwind CSS docs.

---

**JK Fashion Brand** - Where Minimalism Meets Urban Luxury
