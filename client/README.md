# supperFastShop Frontend (Client)

The frontend client for **supperFastShop**, a high-speed streetwear e-commerce platform built around "The Hang Tag" aesthetic.

## Architecture

- **React 19** + **Vite 6** + **Tailwind CSS v4**
- **State Management**: Zustand 5
  - `useUserStore`: Authentication status, login, signup, logout
  - `useCartStore`: Cart line items with size attribution, coupons, subtotal calculation
  - `useWishlistStore`: Browser-persisted saved items
  - `useThemeStore`: Palette selection (Signal, Acid, Drop Red, Cobalt, Cyber, Violet, etc.) and custom hex colors
  - `useProductStore`: Product listings, featured drops, admin CRUD actions
- **Routing**: React Router DOM v7 (`routesConfig.jsx`)
  - `/`: Storefront landing with hero tag, categories, and new drops
  - `/shop`: Faceted product catalog with live search, category/size/price filters
  - `/product/:id`: Single product tag detail, reviews, size run, and related items
  - `/cart`: Size-attributed cart items, coupon discounts, Stripe checkout trigger
  - `/orders`: Confirmed order receipts with scannable barcodes
  - `/wishlist`: Saved bookmark tags
  - `/settings`: Custom theme palettes, texture print grain, and motion toggles
  - `/admin-dashboard`: Admin product creation, table management, and Recharts analytics
  - `/purchase-success` & `/purchase-cancel`: Stripe checkout callback surfaces

## Directory Structure

```text
client/src/
├── assets/fonts/        # Custom typography (Big Shoulders Display, Archivo, Azeret Mono)
├── components/
│   ├── admin/          # ProductForm, ProductTable, AnalyticsTab
│   ├── auth/           # AuthShell
│   ├── cart/           # CartLine, CouponBox, OrderSummary, Recommendation
│   ├── home/           # Hero, CategoryTags, NewDrops, ThemeBand
│   ├── layout/         # Header, Footer, MobileDock
│   ├── product/        # BuyBox, ReviewForm, Reviews
│   ├── settings/       # PalettePicker, EffectsToggles, Section, Toggle
│   ├── shop/           # ProductTag, FilterPanel
│   └── ui/             # Barcode, Btn, CareIcons, EmptyTag, Rating, SizeRun, Spinner, Sticker, Tag, Tape, TextField, WovenLabel
├── hooks/              # useProduct, useProductSearch, useOrders, useReviews
├── lib/                # axios, format, theme engine
├── pages/              # Route entry pages
└── stores/             # Zustand state stores
```

## Available Scripts

```bash
# Run local Vite dev server
npm run dev

# Compile production bundle
npm run build

# Run linter
npm run lint

# Preview production build locally
npm run preview
```
