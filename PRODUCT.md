# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Young streetwear shoppers (roughly 18-30), mostly on phones, buying clothing and accessories fast. They scan, compare and check out in minutes. A second user is the store admin, who manages products, featured items and sees sales analytics.

## Product Purpose
supperFastShop is a streetwear and accessories store (jeans, t-shirts, shoes, glasses, jackets, suits, bags). Success is a shopper getting from landing to a paid order with as little friction as possible, and an admin keeping the catalogue fresh.

## Positioning
Speed is the product: instant search, instant filtering, a one-glance cart and a short checkout. The name promises it, so the interface has to feel fast.

## Operating Context
Stripe checkout, coupon codes (gift coupon after purchases), Redis-backed session/coupon data, Cloudinary product images, JWT cookie auth, admin dashboard with analytics (Recharts). React 19 + Vite + Tailwind v4 + Zustand client; Express + MongoDB server.

## Capabilities and Constraints
- Existing: auth, categories, featured products, cart, coupons, Stripe checkout, admin product CRUD, analytics.
- Added in the first pass: user-selectable accent and background in Settings, wishlist (browser-stored), category search and sort.
- Full-stack scope approved: server changes allowed (e.g. product detail, reviews, orders, search).
- Brand name and imagery are open to change; the user wants a new theme, modular code, and no photography scattered across every page.

## Brand Commitments
None binding. The user asked for a fully new look. Photos should be sparse and purposeful, not on every surface.

## Evidence on Hand
Seven category photos in client/public (placeholders). No testimonials, customer counts or press. Do not fabricate any.

## Product Principles
1. Speed you can see: fast-feeling interactions beat decoration.
2. Type and color carry the identity, photography is used sparingly.
3. Modular code: small components, hooks, and server modules.
4. Mobile first, thumb-reachable.
5. Personalisable: the shopper can change the theme.
