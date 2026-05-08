# Mauve-style Storefront Clone

A full storefront inspired by shopmauve.in: women's contemporary fashion site with category browsing, product detail pages, and a working cart (mock data, no real checkout). Same aesthetic — soft mauve/pink palette, clean editorial layout, circular category tiles, large lifestyle hero banners.

## Open question — brand name

I need a name for the new brand (since you chose "Same look, different name"). I'll proceed with the working name **"Lilac & Co."** unless you tell me otherwise — easy to swap later.

## Design direction

- **Palette** (oklch tokens in `src/styles.css`):
  - Background: warm off-white
  - Primary: dusty mauve/rose (matches the announcement bar pink)
  - Accent: deep plum for CTAs and hover
  - Muted: soft beige
- **Typography**: serif display font (Cormorant or Playfair) for headings + brand wordmark; clean sans (Inter alternative like DM Sans) for body
- **Layout cues**: thin top announcement bar, sticky header with center logo, circular category tiles row, full-bleed hero banner with overlaid title + "Shop Now" CTA, product grid cards with hover image swap, footer with link columns + social

## Pages / routes

```
src/routes/
  __root.tsx                    layout: AnnouncementBar + Header + Outlet + Footer
  index.tsx                     home: hero, category circles, "New In" grid, lifestyle banner, "As seen on"
  collections.index.tsx         all products
  collections.$slug.tsx         category page (tops, dresses, shirts, skirts, coord-sets, loungewear, gifting)
  products.$slug.tsx            product detail: gallery, size selector, qty, add-to-cart, description, care
  cart.tsx                      cart page: line items, totals, checkout button (mock)
  checkout.tsx                  mock checkout summary "Order placed" confirmation
  account.tsx                   placeholder account/wishlist screen
  search.tsx                    simple client-side filter over mock products
```

## Data & state

- `src/data/products.ts` — ~24 mock products across 7 categories (id, slug, name, price ₹, category, sizes, colors, images[], description)
- `src/data/categories.ts` — category metadata + tile image
- `src/store/cart.tsx` — Zustand store, persisted to localStorage (qty, add, remove, update, total)
- `src/store/wishlist.tsx` — same pattern for heart icon

## Components

- `AnnouncementBar`, `Header` (logo + nav + search/account/wishlist/cart icons with badge)
- `MobileMenu` (Sheet), `MegaMenu` for "Women" dropdown
- `CategoryCircles` (row of round tiles, scrollable on mobile)
- `HeroBanner` (full-bleed image + overlay text + CTA)
- `ProductCard` (image hover swap, name, price, color dots)
- `ProductGrid`
- `ProductGallery` (thumbnails + main image)
- `SizeSelector`, `QuantityStepper`
- `CartDrawer` (Sheet from header cart icon) + `CartLineItem`
- `Footer` (4 columns + newsletter input + social icons)

## Imagery

Generate ~30 AI images at `fast` quality into `src/assets/`:
- 7 category tiles (one per category, square crop, model wearing item)
- 2 hero banners (desktop wide editorial shots)
- ~24 product images (2 per product: front + lifestyle) — reuse some across products to save calls
- Plus a few "as seen on" magazine-style press logos placeholder

All consistent: warm natural light, neutral interior backgrounds, mauve/pink/cream wardrobe, similar model styling.

## Tech notes

- Tailwind v4 tokens defined in `src/styles.css` (oklch)
- All routes get proper `head()` meta (title, description, og:*) per the route-architecture rule
- Cart uses Zustand + localStorage; no backend
- shadcn components: Sheet (cart/menu), Dialog, Button, Input, Badge, Carousel (embla) for hero, Accordion (product details)
- Framer Motion for hero fade-in and category tile hover
- Responsive: mobile bottom-aware nav, swipeable category row, single-column product grid on mobile

## Out of scope

- Real auth, real payments, real inventory
- Multi-language (the original has an English switcher — I'll show the dropdown but no-op)
- Real reviews integration

Reply with a brand name (or "go with Lilac & Co.") and I'll build it.
