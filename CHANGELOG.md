# House of MDG — Shoppable Catalog Package

## What changed

### Sakshi Bindra e-commerce catalog (2026-09-06c)
- Rebuilt Sakshi Bindra showroom as a proper 35-piece catalog with unique product images under `products/sakshi/sb-01.jpg` … `sb-35.jpg` (Unsplash/Pexels fashion downloads; verified JPEG >10KB).
- Removed old Sakshi products that reused homepage assets (`bridal.jpg`, `cocktail.JPG`, `evening.jpg`, `resort.JPG`).
- Name-only designers except Sakshi Bindra (portrait `sakshi-bindra.jpg` for list + showroom hero only).
- Occasions: Wedding, Cocktail, Evening, Casual, Outdoor; prices ₹18,000–₹2,50,000.
- `designers.js` productIds updated to full 35-id list; syntax restored; only sakshi-bindra has `image`.
- Cache-bust `?v=20260906c` on `index.html`, `designers.html`, `designer.html`.
- Denser `.designer-product-grid` (4-col) for large catalogs.

### Sakshi Bindra discoverability (2026-09-06b)
- Hard-coded Sakshi Bindra spotlight on `index.html` (portrait + CTA; works even if JS cache is stale).
- Featured strip on `designers.html` now highlights **Sakshi Bindra** instead of Riyaz.
- Designer directory cards use circular portraits (`.designer-card-link`); cache-bust `?v=20260906b` on key asset links.

### Sakshi Bindra showroom (2026-09-06)
- Renamed designer **Sakshi → Sakshi Bindra** (`sakshi-bindra`); `MDG_getDesigner` still accepts legacy `sakshi`.
- Portrait hero (`designer-portrait`) + occasion-grouped product sections (Wedding → Casual → Outdoor → Cocktail → Evening) in `shop.js` / `style.css`.
- Elite multi-occasion lineup (~12 pieces) with `occasion` field; image `sakshi-bindra.jpg`.
- Designer list continues to show **Sakshi Bindra**.

### New files
- `products.js` — Catalog of products (~3 per collection: Bridal, Couture, Sherwani, Evening, Resort) with id, slug, collection, **designerId**, name, price (INR), image, description, fabric, embroidery, delivery, customization. Expanded so each of 10 designers has 3+ flagship pieces.
- `designers.js` — Flat `window.MDG_DESIGNERS` directory (no Wedding/Pret/Sale grouping) with id/slug, name, bio, optional image, productIds; helpers `MDG_getDesigner` / `MDG_getProductsByDesigner`.
- `designers.html` — Dedicated designers index (MDG black/gold); multi-column all-caps name list; optional featured strip for Riyaz Gangji Libas (`Riyaz.jpg`).
- `designer.html` — Dynamic showroom via `?id=` / `?slug=`; bio, product grid, WhatsApp enquire CTA.
- `shop.js` — Vanilla JS shop layer: product grids, PDP, cart (`mdg_cart`), checkout WhatsApp; plus designers list (`#designers-list` / `[data-designers-list]`) and showroom (`#designer-store`).
- `CHANGELOG.md` — This file.

### Updated pages
- `index.html` — Replaced Featured Designer + Coming Soon / Shop the Look dual cards with a clean **Designers** section (flat name list → showrooms); **DESIGNERS** nav link; loads `designers.js`.
- `collections.html`, `bridal.html`, `couture.html`, `sherwani.html`, `evening.html`, `resort.html` — DESIGNERS in nav; shop scripts include `designers.js`.
- `product.html`, `cart.html`, `checkout.html` — DESIGNERS in nav.
- `about.html`, `contact.html`, `services.html`, `gallery.html` — DESIGNERS nav consistency.
- `style.css` — Designers list (multi-column all-caps links) + showroom hero/grid styles matching black `#050505` / gold `#d4af37`.

## How to verify the flow

1. Open `index.html` → **Designers** section lists all 10 names → click a name → `designer.html?id=…` showroom with 3–5 products.
2. Or open `designers.html` → featured Riyaz strip + full A–Z-style list → enter a showroom.
3. Click a product → `product.html?id=…` → **Add to Cart** → badge increments → **CART** → checkout WhatsApp enquiry.
4. Confirm: no Wedding/Pret grouping; luxury black/gold look retained; static HTML/CSS/JS only.

## Designer slugs

| Name | Slug |
|---|---|
| Dolly J | `dolly-j` |
| Gopi Vaid | `gopi-vaid` |
| Kalista | `kalista` |
| Mukti and Kavith Casa | `mukti-and-kavith-casa` |
| Nitika Gujral | `nitika-gujral` |
| Punit Arora | `punit-arora` |
| Ridhi Mehra | `ridhi-mehra` |
| Riyaz Gangji Libas | `riyaz-gangji-libas` |
| Sakshi Bindra | `sakshi-bindra` (accepts legacy `sakshi`) |
| Seema Gujral | `seema-gujral` |

## Sample products

| Collection | Name | Price |
|---|---|---|
| Bridal | Royal Crimson Bridal Lehenga | ₹1,45,000 |
| Bridal | Ivory Pearl Bridal Lehenga | ₹1,28,000 |
| Couture | Midnight Cocktail Gown | ₹89,000 |
| Sherwani | Ivory Royal Sherwani | ₹85,000 |
| Evening | Velvet Noir Evening Gown | ₹72,000 |
| Resort | Ocean Breeze Kaftan | ₹42,000 |

## Deploy note

Push contents of this folder to `madhu110626-ship-it/house-of-mdg-upgraded` branch `feature/shoppable-catalog` (parent agent handles git/PR). Image assets (`bridal.jpg`, `Sherwani.jpg`, `evening.jpg`, `resort.JPG`, `cocktail.JPG`, `Riyaz.jpg`, `logo.PNG`, etc.) already live in the repo — do not need re-upload unless missing.
