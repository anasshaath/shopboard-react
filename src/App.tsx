import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { CartPanel } from './components/CartPanel.tsx'
import { CatalogControls } from './components/CatalogControls.tsx'
import { CatalogState } from './components/CatalogState.tsx'
import { Checkout } from './components/Checkout.tsx'
import { Header } from './components/Header.tsx'
import { ProductGrid } from './components/ProductGrid.tsx'
import { SignupForm } from './components/SignupForm.tsx'
import {
  changeCart,
  clearCart,
  getCart,
  getUnavailableCartItems,
  removeFromCart,
  saveOrder,
  setView,
} from './modules/cart/cart.state.ts'
import type { CartDetail, CartItem } from './modules/cart/cart.types.ts'
import { getProducts } from './modules/products/products.api.ts'
import {
  createOrderId,
  getCartDetails,
  getTotal,
  getVisibleProducts,
  validateCustomer,
} from './modules/products/products.logic.ts'
import type { Customer, CustomerErrors } from './modules/products/products.logic.ts'
import type { LoadState, Product, ProductView } from './modules/products/products.types.ts'

const initialView: ProductView = {
  search: '',
  category: 'all',
  under30: false,
  sortDirection: null,
}

export default function App() {
  const [loadState, setLoadState] = useState<LoadState>({ status: 'loading' })
  const [view, setCurrentView] = useState<ProductView>(initialView)
  const [, refreshCart] = useReducer((value: number) => value + 1, 0)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [checkoutErrors, setCheckoutErrors] = useState<CustomerErrors>({})
  const [checkoutMessage, setCheckoutMessage] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [signupMessage, setSignupMessage] = useState('')
  const requestVersion = useRef(0)

  const requestProducts = useCallback(() => {
    const version = requestVersion.current + 1
    requestVersion.current = version
    return getProducts()
      .then((products) => {
        if (requestVersion.current === version) setLoadState({ status: 'success', products })
      })
      .catch(() => {
        if (requestVersion.current === version)
          setLoadState({
            status: 'error',
            message: 'We could not load the collection. Please try again.',
          })
      })
  }, [])

  useEffect(() => {
    void requestProducts()
    return () => {
      requestVersion.current += 1
    }
  }, [requestProducts])

  const retryProducts = useCallback(() => {
    setLoadState({ status: 'loading' })
    void requestProducts()
  }, [requestProducts])

  const catalog: Product[] = loadState.status === 'success' ? loadState.products : []
  const catalogAvailable = loadState.status === 'success' && catalog.length > 0
  const savedCart = getCart()
  const cart: CartDetail[] = catalogAvailable ? getCartDetails(savedCart, catalog) : []
  const unavailableCartItems: CartItem[] = catalogAvailable
    ? getUnavailableCartItems(catalog)
    : savedCart
  const visibleProducts = loadState.status === 'success' ? getVisibleProducts(catalog, view) : []
  const total = getTotal(cart)
  const itemCount = [...cart, ...unavailableCartItems].reduce(
    (count, item) => count + item.quantity,
    0,
  )

  const updateView = useCallback((change: Partial<ProductView>) => {
    setView(change)
    setCurrentView((current) => ({ ...current, ...change }))
  }, [])
  const addToCart = useCallback((product: Product) => {
    if (product.inStock && changeCart(product.id, 1)) {
      refreshCart()
      setIsCartOpen(true)
    }
  }, [])
  const updateCart = useCallback((productId: number, adjustment: number) => {
    if (changeCart(productId, adjustment)) refreshCart()
  }, [])
  const removeCartItem = useCallback((productId: number) => {
    if (removeFromCart(productId)) refreshCart()
  }, [])
  const startCheckout = useCallback(() => {
    if (!catalogAvailable) {
      setCheckoutMessage(
        'Products are currently unavailable. Your saved cart is safe; try again when the catalog returns.',
      )
      return
    }
    if (unavailableCartItems.length > 0) {
      setCheckoutMessage('Some saved items are no longer available. Remove them before checkout.')
      return
    }
    if (cart.length === 0) return
    setCheckoutErrors({})
    setCheckoutMessage('')
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }, [cart.length, catalogAvailable, unavailableCartItems.length])
  function placeOrder(customer: Customer): void {
    const errors = validateCustomer(customer)
    if (Object.keys(errors).length > 0) {
      setCheckoutErrors(errors)
      setCheckoutMessage('Please correct the highlighted fields before placing your demo order.')
      return
    }
    if (!catalogAvailable || unavailableCartItems.length > 0 || cart.length === 0) {
      setCheckoutMessage('Your cart changed. Return to the collection and try again.')
      return
    }
    const order = {
      id: createOrderId(),
      createdAt: new Date().toISOString(),
      customer,
      items: cart.map(({ product, quantity }) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
      })),
      total,
    }
    if (!saveOrder(order)) {
      setCheckoutMessage('We could not save this demo order locally. Your cart has not changed.')
      return
    }
    const cartCleared = clearCart()
    refreshCart()
    setConfirmation(
      cartCleared
        ? `Demo order ${order.id} was saved in this browser. No payment was taken.`
        : `Demo order ${order.id} was saved, but your cart could not be cleared.`,
    )
  }

  if (isCheckoutOpen)
    return (
      <Checkout
        cart={cart}
        confirmation={confirmation}
        errors={checkoutErrors}
        message={checkoutMessage}
        onBack={() => setIsCheckoutOpen(false)}
        onPlaceOrder={placeOrder}
      />
    )
  return (
    <div className="app-shell">
      <Header itemCount={itemCount} onOpenCart={() => setIsCartOpen(true)} />
      <main>
        <section className="hero" aria-labelledby="store-title">
          <p className="eyebrow">THE SMALL THINGS, WELL CHOSEN</p>
          <h1 id="store-title">ShopBoard</h1>
          <p>Useful goods for a well-lived day.</p>
        </section>
        <section className="catalog" aria-labelledby="catalog-title">
          <h2 id="catalog-title">The collection</h2>
          <CatalogControls
            categories={catalog.map((product) => product.category)}
            onViewChange={updateView}
            view={view}
          />
          <CatalogState
            loadState={loadState}
            onRetry={retryProducts}
            visibleCount={visibleProducts.length}
          />
          {loadState.status === 'success' && visibleProducts.length > 0 ? (
            <ProductGrid products={visibleProducts} onAddToCart={addToCart} />
          ) : null}
        </section>
        <SignupForm
          message={signupMessage}
          onSuccess={() =>
            setSignupMessage(
              'Your form passed validation. This demo does not create an account or save your information.',
            )
          }
        />
      </main>
      <CartPanel
        cart={cart}
        catalogAvailable={catalogAvailable}
        isOpen={isCartOpen}
        itemCount={itemCount}
        onCheckout={startCheckout}
        onClear={() => {
          if (clearCart()) refreshCart()
        }}
        onClose={() => setIsCartOpen(false)}
        onQuantityChange={updateCart}
        onRemove={removeCartItem}
        total={total}
        unavailableItems={unavailableCartItems}
      />
    </div>
  )
}
