# ShopBoard React

## Stack and commands

This is a React 19, TypeScript, Vite, React Router, and TanStack Query storefront. Use `npm run dev` while developing. Before handing off a change, run `npm run format:check`, `npm run typecheck`, `npm run lint`, and `npm run build`.

Use `npm run format` to apply Prettier. Husky runs format checking, type checking, linting, and a production build before each commit.

## Structure

- `src/modules/` contains route features and feature-specific components. `src/shared/` contains reusable infrastructure and UI primitives.
- `src/modules/products/products.api.ts` is the product API entrypoint.
- `src/modules/cart/CartContext.tsx` is the single owner of shared cart state.
- `src/shared/api/client.ts` is the only file that calls `fetch`.
- `src/App.tsx` composes providers and lazy routes. Do not put DOM queries or manual event listeners in the app.

## Development rules

1. Keep untrusted API JSON as `unknown`; validate it before using it. Do not introduce `any`, type assertions, or non-null assertions.
2. Preserve saved cart IDs and quantities while the catalog loads, fails, or is empty. Do not permit checkout until every cart item resolves to an in-stock product.
3. Derive visible products, totals, and item counts during render. Do not duplicate them in React state or mutate product arrays.
4. Keep external synchronization effects cancellable; pass query cancellation signals to fetch. Do not use effects for calculated data or click-driven work.
5. Use React rendering and handlers. Each reusable component belongs in its own file with a typed Props interface.

## Rules derived from reviewed AI mistakes

These rules come from reviewed AI implementation mistakes in this project. They
are not presented as rules independently authored by the user.

1. Fix lint warnings without removing assignment requirements. The previous
   review found a Props interface removed during a lint fix.
2. Keep the README component tree synchronized with the implemented routes.
   A prior review found reusable UI declared inside another component.
