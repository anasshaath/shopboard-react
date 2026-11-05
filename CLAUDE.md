# ShopBoard React

## Stack and commands

This is a React 19, TypeScript, and Vite storefront. Use `npm run dev` while developing. Before handing off a change, run `npm run format:check`, `npm run typecheck`, `npm run lint`, and `npm run build`.

Use `npm run format` to apply Prettier. Husky runs lint-staged for staged source, documentation, and configuration files.

## Structure

- `src/components/` contains one React component per file and its explicit Props interface.
- `src/modules/products/` holds the copied Day 3 API contracts and pure product/cart helpers. `products.api.ts` is the only feature API entrypoint.
- `src/modules/cart/` owns the copied persistent cart and catalog-view store.
- `src/shared/api/client.ts` is the only file that calls `fetch`.
- `src/App.tsx` owns React UI state and composes components. Do not put DOM queries or manual event listeners in the app.

## Development rules

1. Keep untrusted API JSON as `unknown`; validate it before using it. Do not introduce `any`, type assertions, or non-null assertions.
2. Preserve saved cart IDs and quantities while the catalog loads, fails, or is empty. Only let the customer remove unavailable saved items.
3. Derive visible products, totals, and item counts during render. Do not duplicate them in React state or mutate product arrays.
4. Keep async React effects cancellable at the state-update boundary and clean up subscriptions or listeners returned by effects.
5. Use React rendering and handlers. Each reusable component belongs in its own file with a typed Props interface.

## Rules derived from reviewed AI mistakes

These rules come from reviewed AI implementation mistakes in this project. They
are not presented as rules independently authored by the user.

1. Preserve copied Day 3 modules exactly, except for permitted `import type`
   changes. Exclude them from formatting and compare them with the originals
   after checks. Prettier previously reformatted protected copied files.
2. Fix lint warnings without removing assignment requirements. Every reusable
   component must keep a meaningful typed Props interface. `SignupForm`
   previously lost its interface during a lint fix.
3. Put every reusable component in its own file and keep the README component
   tree synchronized. `CheckoutField` was previously declared inside
   `Checkout.tsx` and had to be extracted.
