# House of MDG — Shoppable Catalog Package

## What changed

### New files
- `products.js` — Catalog of 15 products (~3 per collection: Bridal, Couture, Sherwani, Evening, Resort) with id, slug, collection, name, price (INR), image, description, fabric, embroidery, delivery, customization.
- `shop.js` — Vanilla JS shop layer: product grids (`[data-collection]` / `#product-grid`), PDP from `?id=` / `?slug=`, cart in `localStorage` key `mdg_cart`, cart badge `.cart-count`, cart page qty/remove, checkout WhatsApp enquiry to `wa.me/919892027604`.
- `CHANGELOG.md` — This file.

### Updated pages
- `index.html` — Collection cards link to PLPs; CART + badge in header; couture card uses `cocktail.JPG`; shop scripts loaded.
- `collections.html` — All 5 collections linked; cart + consultation in nav.
- `bridal.html`, `couture.html`, `sherwani.html`, `evening.html`, `resort.html` — Cleaned duplicate/broken markup; luxury PLP headers; product grids rendered from `products.js`.
- `product.html` — Dynamic PDP; logo fixed to `logo.PNG`; size XS–XL + Custom; Add to Cart / Enquire.
- `cart.html` — Dynamic cart from localStorage; empty state; proceed to checkout; logo fixed.
- `checkout.html` — Name / phone / notes + order summary; Send enquiry on WhatsApp; optional cart clear.
- `style.css` — Appended shop styles (grids, cards, PDP, cart, badge, checkout) matching black `#050505` / gold `#d4af37`.
- `about.html`, `contact.html`, `services.html`, `gallery.html` — Cart link + badge for nav consistency; logo path fixes.

## How to verify the flow

1. Open `index.html` → click a collection card (e.g. Bridal) → lands on `bridal.html` with 3 product cards.
2. Click a product → `product.html?id=…` shows price, details, size, qty.
3. **Add to Cart** → header badge increments; open **CART**.
4. Adjust qty / remove; **Proceed to Checkout**.
5. Enter name + phone → **Send Enquiry on WhatsApp** opens `https://wa.me/919892027604` with encoded message of customer details + line items.
6. Confirm: no payment gateway; static HTML/CSS/JS only (GitHub Pages ready).
7. Confirm logos use `logo.PNG` (not `images/logo.png`).
8. Confirm Couture products use `cocktail.JPG` / `evening.jpg` (not only `Riyaz.jpg`).

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

Push contents of this folder to `madhu110626-ship-it/house-of-mdg-upgraded` (parent agent handles git/PR). Image assets (`bridal.jpg`, `Sherwani.jpg`, `evening.jpg`, `resort.JPG`, `cocktail.JPG`, `logo.PNG`, etc.) already live in the repo — do not need re-upload unless missing.
