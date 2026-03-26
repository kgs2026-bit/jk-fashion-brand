# JK Fashion Brand - Deployment Guide

## Quick Start

1. **Clone and Setup**
```bash
npm install
```

2. **Development**
```bash
npm run dev
```
Open http://localhost:3000

3. **Build for Production**
```bash
npm run build
npm start
```

---

## Production Deployment

### Vercel (Recommended)

1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```

2. Import project in Vercel
   - Go to vercel.com
   - Import from GitHub
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`

3. Environment Variables (None Required)
   - This project uses localStorage for cart persistence
   - Add API keys if you add payment/stripe/email services

4. Deploy
   - Click Deploy
   - Automatic deployments on push to main

---

### Netlify

1. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18+

2. Environment:
   - Add `NEXT_PRIVATE_TARGET=serverless` if using functions

3. Deploy via drag-and-drop or Git integration

---

### Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.js ./
RUN npm ci --only=production

EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t jk-fashion-brand .
docker run -p 3000:3000 jk-fashion-brand
```

---

## Configuration

### Update Brand Details

1. **Site URL**: Update `metadataBase` in `app/layout.tsx`
2. **Brand Name**: Update in:
   - `app/layout.tsx` metadata
   - `components/Navbar.tsx`
   - `components/Footer.tsx`
   - `README.md`
3. **Colors**: Edit `tailwind.config.ts`
4. **Products**: Edit `lib/products.ts`

### Add Payment Integration

1. Install Stripe:
```bash
npm install stripe @stripe/stripe-js
```

2. Create `.env.local`:
```
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=...
```

3. Create API route: `app/api/checkout/route.ts`
4. Update cart page to call Stripe Checkout

### Add Email Service

1. Install Nodemailer or Resend:
```bash
npm install resend
```

2. Create API routes:
   - `app/api/newsletter/route.ts`
   - `app/api/contact/route.ts`

3. Add email API keys to `.env.local`

---

## Performance Optimization

### Image Optimization
- Using Unsplash CDN (already optimized)
- Add product images to `/public` for faster loading (optional)

### Lazy Loading
- Already implemented via Next.js Image
- Framer Motion uses `whileInView` for scroll animations

### Caching
- Static pages pre-rendered (see build output: ○ = Static)
- Dynamic `/product/[id]` uses server-side rendering

---

## SEO

Already implemented:
- ✅ Meta tags (title, description, keywords)
- Open Graph tags
- Twitter Card ready
- Sitemap (`/sitemap.xml`)
- Robots.txt
- Semantic HTML
- Structured data ready (add JSON-LD)

To add:
- Create `og-image.jpg` (1200x630) for social sharing
- Add Google Analytics
- Add Google Search Console verification

---

## Monitoring

### Vercel Analytics
```bash
npm i @vercel/analytics
```

Add to `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Error Tracking
- Use Sentry: `npm install @sentry/nextjs`
- Follow Sentry Next.js setup docs

---

## Environment Variables

Create `.env.local`:
```bash
# Payment
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=

# Email
RESEND_API_KEY=
CONTACT_EMAIL=

# Analytics
GOOGLE_ANALYTICS_ID=
NEXT_PUBLIC_GA_ID=

# CMS (if using)
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
```

---

## Custom Domain (Vercel)

1. Go to Project Settings > Domains
2. Add your domain (e.g., jkfashionbrand.com)
3. Update DNS:
   - A record → 76.76.21.21
   - Or use Vercel nameservers
4. Update `metadataBase` in `app/layout.tsx`

---

## E-commerce Features (Future)

### Stripe Checkout
- Create checkout session API
- Webhook for payment success
- Order confirmation emails

### Inventory Management
- Add database (PostgreSQL/PlanetScale)
- Stock tracking
- Low stock alerts

### User Accounts
- NextAuth.js integration
- Order history
- Wishlist
- Address book

### Admin Dashboard
- Protected routes
- Product management
- Order management
- Analytics

---

## Security Checklist

- ✅ HTTPS enforced on Vercel
- ✅ XSS protection (React escaping)
- ✅ CSRF protection (if adding APIs)
- ✅ Rate limiting (add API routes)
- ✅ Input validation (already on forms)
- ✅ .env.local in .gitignore
- ⚠️ Add CORS headers for API routes
- ⚠️ Implement reCAPTCHA on forms (spam prevention)

---

## Testing

```bash
# Lint
npm run lint

# Type check
npx tsc --noEmit

# Build
npm run build

# Start production
npm start
```

---

## Support

For issues:
1. Check Next.js docs: https://nextjs.org/docs
2. Check Tailwind docs: https://tailwindcss.com/docs
3. Verify all dependencies installed: `npm ls`
4. Clear cache: `rm -rf .next`

---

## Success Metrics

After deployment, monitor:
- Page load time (target: < 3s)
- Core Web Vitals (LCP, FID, CLS)
- Conversion rate
- Cart abandonment rate
- Bounce rate

Use Vercel Analytics or Google Analytics 4.

---

**Built with ❤️ for JK Fashion Brand**
