# 🛒 Add to Cart

A fully interactive, responsive **Shopping Cart UI** built with vanilla HTML, CSS, TailwindCSS v4, and JavaScript (ES Modules) — no frameworks, no bundler required. This project demonstrates a clean component-based architecture and a custom reactive state management system entirely in plain JavaScript.

---

## 📸 Preview

> A two-panel layout featuring a **Cart Panel** (product list) and an **Order Summary Panel** with live price calculations, shipping options, and a promo code input.

---

## ✨ Features

### 🛍️ Cart Management
- View all cart items with product image, title, category, brand, stock status, and star ratings
- **Select / Deselect** individual items or all items at once via a "Select All" checkbox
- Only selected items are counted in the order summary and checkout
- **Increase / Decrease quantity** per item, capped at stock limit and a max of 99
- **Remove items** from the cart individually
- **Clear all** items from the cart in one click
- **Empty cart** state with a friendly UI fallback

### ❤️ Wishlist
- Toggle any item to/from a wishlist
- Wishlist state is tracked globally and reflected on each product card
- Dedicated wishlist button in the cart header

### 💰 Pricing Engine (`src/pricing/pricing.js`)
| Calculation | Description |
|---|---|
| Discounted Price | Per-item price after applying its discount percentage |
| Line Total | Discounted price × quantity |
| Original Price | Sum of all selected items at full price |
| Subtotal | Sum of all selected items at discounted price |
| Total Savings | Difference between original price and subtotal |
| Shipping Amount | Based on selected shipping method |
| Tax | 8% flat tax rate |
| Grand Total | Subtotal + Shipping + Tax |

### 🚚 Shipping Methods
Three selectable shipping options with radio buttons:
| Method | Cost | Delivery |
|---|---|---|
| Standard | $5.00 | 3–5 business days |
| Free | $0.00 | 3–5 business days |
| Express | $15.00 | 3–5 business days |

### 🏷️ Promo Code
- UI input field for entering promo codes
- Pre-defined promotions in the data store:
  - `SAVE20` — 20% off orders over $500 (expires Dec 2026)
  - `FLAT100` — $100 off orders over $1000 (expires Jun 2026)
  - `EXPIRED50` — Inactive / expired code (for testing)

### 📱 Responsive Design
- Fully responsive layout using TailwindCSS utility classes
- Two-column panel layout on large screens (`min-width: 1124px`)
- Stacks vertically on mobile and tablet screens
- Product grid columns adapt from mobile (2-col) to desktop (6-col)

---

## 🗂️ Project Structure

```
add-to-cart/
├── index.html                        # Entry point — loads Tailwind CDN & main.js
├── package.json                      # Project metadata
├── tailwind.config.js                # Tailwind configuration (placeholder)
├── assets/
│   └── inspiration ui/
│       └── add to cart.png           # Design inspiration reference
└── src/
    ├── main.js                       # App entry — initializes state & event delegation
    ├── store/
    │   ├── data.js                   # Static product data, shipping rates & promo codes
    │   └── store.js                  # Custom reactive state manager (pub/sub pattern)
    ├── pricing/
    │   └── pricing.js                # Pure pricing utility functions
    └── Components/
        ├── Cart/
        │   ├── Cart.js               # Main cart panel component
        │   ├── ClearAllButton.js     # "Clear All" button
        │   ├── EmptyCart.js          # Empty cart fallback UI
        │   └── WishlistButton.js     # Wishlist header button
        ├── Product/
        │   ├── ProductItem.js        # Individual product row
        │   ├── Image.js              # Product image
        │   ├── Price.js              # Item price display with discount
        │   ├── Quantity.js           # Quantity stepper (+/-)
        │   ├── Ratings.js            # Star rating display
        │   ├── RemoveButton.js       # Remove item button
        │   └── WishButton.js        # Per-item wishlist toggle button
        └── OrderSummary/
            ├── OrderSummary.js       # Order summary panel
            ├── CheckoutButton.js     # Checkout CTA button
            ├── PromoCard.js          # Promo code input UI
            └── ShippingMethod.js     # Individual shipping radio option
```

---

## ⚙️ State Management

The project implements a **lightweight custom pub/sub store** (`src/store/store.js`) without any external libraries.

### How it works

```js
// Subscribe to state changes
subscribe(renderFunction);

// Read current state (returns a frozen copy)
const state = getState();

// Update state and notify all subscribers
setState((currentState) => ({ ...partialUpdate }));
```

### State Shape

```js
{
  cart: [],            // All cart items (full product objects)
  selectedItems: [],   // Items with isSelected: true (used in order summary)
  wishlist: [],        // Items added to wishlist
  isAllSelected: true, // Whether all items are checked
  shipMethod: "standard", // Active shipping method key
  promotion: {
    code: null,        // Applied promo code
    error: null        // Promo validation error message
  }
}
```

### Available Actions

| Action | Description |
|---|---|
| `setState(updater)` | Generic state updater, notifies all subscribers |
| `clearCart()` | Empties the cart and selected items |
| `increaseQuantity(id)` | Increments item quantity (max: stock or 99) |
| `decreaseQuantity(id)` | Decrements item quantity (min: 1) |
| `toggleSelect(id)` | Toggles selection of a single item |
| `toggleSelectAll(checked)` | Selects or deselects all items |
| `removeItem(id)` | Removes an item from cart and selectedItems |
| `toggleWishlist(id)` | Adds or removes an item from the wishlist |
| `toggleMethod(method)` | Changes the active shipping method |

---

## 🧩 Component Architecture

All components are **pure functions** that accept state props and return **HTML strings**. The app re-renders the entire `#cart-container` on every state change using `innerHTML`.

Event handling is done through a single **event delegation** listener on `#cart-container`, which reads `data-id` attributes and matches targets using `.closest()`.

```js
document.getElementById("cart-container").addEventListener("click", (e) => {
  if (e.target.closest("#clear-all")) clearCart();
  // ...etc
});
```

This pattern avoids memory leaks from re-attaching listeners on every render.

---

## 🛍️ Sample Products

Five sample products are included in `src/store/data.js`:

| Product | Brand | Category | Price | Discount | Stock |
|---|---|---|---|---|---|
| Sony WH-1000XM5 Wireless Headphones | Sony | Electronics | $399.99 | 10% | 65 |
| Apple Watch Series 9 | Apple | Wearables | $429.99 | 7% | 40 |
| Nike Air Max Sneakers | Nike | Fashion | $150.00 | 15% | 110 |
| Dell XPS 13 Laptop | Dell | Computers | $1199.99 | 12% | 20 (Limited) |
| Samsung 4K Smart TV | Samsung | Home Entertainment | $699.99 | 18% | 12 (Limited) |

---

## 🚀 Getting Started

This project requires **no build step** and **no package installation**. All dependencies are loaded via CDN.

### 1. Clone the repository

```bash
git clone https://github.com/sayedrkhalid-dev/add-to-cart.git
cd add-to-cart
```

### 2. Serve locally

Because the project uses **ES Modules** (`type="module"`), it must be served over HTTP (not opened as a `file://` URL directly). Use any local dev server:

**Using VS Code Live Server:**
Right-click `index.html` → _Open with Live Server_

**Using Node.js `http-server`:**
```bash
npx http-server .
```

**Using Python:**
```bash
python -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 🔧 Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic markup and app shell |
| CSS3 + Tailwind v4 (CDN) | Styling and responsive layout |
| JavaScript (ES Modules) | App logic, components, and state |
| Font Awesome 7 (CDN) | Icons throughout the UI |
| Google Fonts — Instrument Sans | Typography |

> ⚠️ **No bundler** (Vite, Webpack, etc.) is configured. The `package.json` only holds project metadata. Tailwind is loaded via the browser CDN (`@tailwindcss/browser@4`).

---

## 🔮 Possible Improvements

- [ ] Wire up the promo code input to the `PROMOTIONS` data and apply discount to grand total
- [ ] Add persistent cart state using `localStorage`
- [ ] Add product search / filtering
- [ ] Implement a checkout flow / order confirmation screen
- [ ] Add animations for cart item removal and quantity changes
- [ ] Migrate to a bundler (Vite) to enable proper Tailwind CSS purging and tree-shaking
- [ ] Write unit tests for the pricing utility functions

---

## 👤 Author

**Sayed R. Khalid**  
GitHub: [@sayedrkhalid-dev](https://github.com/sayedrkhalid-dev)

---

## 📄 License

This project is open source and available for personal and educational use.
