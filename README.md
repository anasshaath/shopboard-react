# ShopBoard React

ShopBoard is a TypeScript React demo storefront. It loads a validated catalog from the ShopBoard API, lets customers filter it, and keeps a demo cart and orders in browser storage.

## Setup and commands

```bash
npm install
npm run dev
```

| Command                | Purpose                                       |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Start Vite locally.                           |
| `npm run format`       | Format project files with Prettier.           |
| `npm run format:check` | Check formatting without editing files.       |
| `npm run typecheck`    | Type-check the application.                   |
| `npm run lint`         | Run Oxlint with warnings treated as failures. |
| `npm run build`        | Type-check and build the production app.      |
| `npm run preview`      | Preview the production build.                 |

Husky runs lint-staged before commits. No remote or commit is created by this project setup.

## Functionality

- Typed API decoding and mapping for the product catalog.
- Search, category selection, Under $30 filter, price sorting, and reset.
- Loading, retryable failure, empty-catalog, and no-match states.
- Persistent cart quantities, removal, clear, totals, and unavailable-item protection during loading, empty, and error catalog states.
- Demo sign-up confirmation and demo checkout validation/order confirmation.

## Component tree and props

```text
App
├─ Header { itemCount, onOpenCart }
├─ CatalogControls { categories, onViewChange, view }
├─ CatalogState { loadState, onRetry, visibleCount }
├─ ProductGrid { products, onAddToCart }
│  └─ ProductCard { product, onAddToCart }
├─ SignupForm { message, onSuccess }
├─ CartPanel { cart, catalogAvailable, isOpen, itemCount, onCheckout,
│             onClear, onClose, onQuantityChange, onRemove, total,
│             unavailableItems }
│  └─ CartItem { item, onQuantityChange, onRemove }
└─ Checkout { cart, confirmation, errors, message, onBack, onPlaceOrder }
   └─ CheckoutField { error, label, name, onChange, type, value }
```

Each reusable component has its own file and an explicit Props interface. `App` owns React-only UI state: catalog load state, the current filter view, cart refresh signal, cart/checkout visibility, checkout errors/message, order confirmation, and sign-up confirmation. `Checkout` owns its customer form fields until it passes them to `App` when the demo order is submitted. The copied `cart.state.ts` owns the persisted cart and view storage; its values are read by `App`, then passed to child components as props. `CatalogState`, the product grid, cart total/count, and checkout total are derived during render rather than stored separately.

## Project structure

```text
src/
  components/             # Presentational and form components
  modules/cart/           # Copied persistent cart contracts/state
  modules/products/       # Copied types, API validation, and pure logic
  shared/api/client.ts    # Shared fetch wrapper
  App.tsx                 # React composition and UI state
```

The copied Day 3 modules retain their original contents. Only the React layer is new. The five-bug browser debug lab and personal-observation rules remain intentionally pending.
