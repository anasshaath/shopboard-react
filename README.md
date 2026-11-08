# ShopBoard React

Task 5 React storefront using TypeScript, Vite, React Router, TanStack Query, and a Context cart.

## Commands

`npm run dev`, `npm run format:check`, `npm run typecheck`, `npm run lint`, and `npm run build`. The pre-commit hook runs all four checks.

## Routes

| URL             | Page                         |
| --------------- | ---------------------------- |
| `/`             | Home storefront introduction |
| `/products`     | Filterable catalog           |
| `/products/:id` | API-backed product detail    |
| `/cart`         | Shared persistent cart       |
| `/checkout`     | Demo checkout                |
| `*`             | Separate 404 page            |

Every page is lazy-loaded. Layout remains mounted with navigation and the cart count while a page loads or its query fails.

## Data and state

`CartProvider` owns the small shared `{ id, qty }` cart and explicit add, remove, quantity-change, and clear actions. It initializes from and persists to `localStorage`; totals, counts, categories, and filtered products are calculated in render. Product list and detail requests use TanStack Query Suspense hooks and pass the query signal through the shared API client. This lets TanStack Query cancel a request when it chooses to cancel that query; it does not promise cancellation for every navigation. Focused query boundaries provide retry controls without replacing the layout.

Set `VITE_API_BASE_URL` before starting Vite. Leave it unset for normal API use. For scenario checks use `https://shopboard-api.vercel.app/delay/3000`, `https://shopboard-api.vercel.app/fail/500`, or `https://shopboard-api.vercel.app/empty`; the client appends `/api/products` after that prefix.

## Checkout

Checkout is a local demonstration: no payment is collected and no order is sent to a server. One Zod schema validates name, email, and address through react-hook-form Controller fields. The cart is cleared only after successful local submission. Empty, unresolved, or out-of-stock carts cannot check out.

## Component tree

```text
App → QueryClientProvider → CartProvider → BrowserRouter
└─ Layout (Header, Outlet)
   ├─ HomePage
   ├─ ProductsPage → ProductCards
   ├─ ProductPage
   ├─ CartPage
   ├─ CheckoutPage → Field / Input / Button
   └─ NotFoundPage
```
