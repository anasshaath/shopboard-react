import { lazy, Suspense } from 'react'
import type { ReactNode } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CartProvider } from './modules/cart/CartContext.tsx'
import Layout from './modules/layout/Layout.tsx'
import { QueryBoundary } from './shared/QueryBoundary.tsx'
const Home = lazy(() => import('./modules/home/HomePage.tsx'))
const Products = lazy(() => import('./modules/products/ProductsPage.tsx'))
const Product = lazy(() => import('./modules/products/ProductPage.tsx'))
const Cart = lazy(() => import('./modules/cart/CartPage.tsx'))
const Checkout = lazy(() => import('./modules/checkout/CheckoutPage.tsx'))
const NotFound = lazy(() => import('./modules/not-found/NotFoundPage.tsx'))
const queryClient = new QueryClient()
function Page({ children, resetKey }: { children: ReactNode; resetKey?: string }) {
  const { pathname } = useLocation()
  return (
    <QueryBoundary resetKey={resetKey ?? pathname}>
      <Suspense
        fallback={
          <p className="status" role="status">
            Loading page…
          </p>
        }
      >
        {children}
      </Suspense>
    </QueryBoundary>
  )
}
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route
                index
                element={
                  <Page>
                    <Home />
                  </Page>
                }
              />
              <Route
                path="products"
                element={
                  <Page>
                    <Products />
                  </Page>
                }
              />
              <Route
                path="products/:id"
                element={
                  <Page>
                    <Product />
                  </Page>
                }
              />
              <Route
                path="cart"
                element={
                  <Page>
                    <Cart />
                  </Page>
                }
              />
              <Route
                path="checkout"
                element={
                  <Page>
                    <Checkout />
                  </Page>
                }
              />
              <Route
                path="*"
                element={
                  <Page>
                    <NotFound />
                  </Page>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  )
}
