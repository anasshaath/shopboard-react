import { CartItem } from './CartItem.tsx'
import type { CartDetail, CartItem as SavedCartItem } from '../modules/cart/cart.types.ts'

interface CartPanelProps {
  cart: CartDetail[]
  catalogAvailable: boolean
  isOpen: boolean
  itemCount: number
  onCheckout: () => void
  onClear: () => void
  onClose: () => void
  onQuantityChange: (productId: number, adjustment: number) => void
  onRemove: (productId: number) => void
  total: number
  unavailableItems: SavedCartItem[]
}
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export function CartPanel({
  cart,
  catalogAvailable,
  isOpen,
  itemCount,
  onCheckout,
  onClear,
  onClose,
  onQuantityChange,
  onRemove,
  total,
  unavailableItems,
}: CartPanelProps) {
  if (!isOpen) return null
  const cannotCheckout = !catalogAvailable || unavailableItems.length > 0 || itemCount === 0
  return (
    <aside className="cart-panel" aria-label="Shopping cart">
      <div className="panel-heading">
        <h2>Your cart</h2>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
      <p role="status">
        {!catalogAvailable && itemCount > 0
          ? 'Your saved cart is safe. Products are currently unavailable.'
          : unavailableItems.length > 0
            ? 'Remove unavailable items before checkout.'
            : itemCount === 0
              ? 'Your cart is empty.'
              : `${itemCount} items in your cart.`}
      </p>
      <ul>
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
          />
        ))}
        {unavailableItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
          />
        ))}
      </ul>
      <p className="cart-total">
        Total <strong>{money.format(total)}</strong>
      </p>
      <div className="cart-actions">
        <button type="button" disabled={itemCount === 0} onClick={onClear}>
          Clear cart
        </button>
        <button type="button" disabled={cannotCheckout} onClick={onCheckout}>
          Checkout
        </button>
      </div>
    </aside>
  )
}
