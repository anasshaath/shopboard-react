import type { CartDetail, CartItem as SavedCartItem } from '../modules/cart/cart.types.ts'

interface CartItemProps {
  item: CartDetail | SavedCartItem
  onQuantityChange: (productId: number, adjustment: number) => void
  onRemove: (productId: number) => void
}
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  const available = 'product' in item
  return (
    <li className="cart-item">
      <div>
        <h3>{available ? item.product.name : `Saved product #${item.id}`}</h3>
        <p>{available ? money.format(item.product.price) : 'Currently unavailable'}</p>
      </div>
      {available ? (
        <>
          <div className="quantity-controls">
            <button
              type="button"
              aria-label={`Decrease quantity of ${item.product.name}`}
              onClick={() => onQuantityChange(item.id, -1)}
            >
              −
            </button>
            <span>{item.quantity}</span>
            <button
              type="button"
              aria-label={`Increase quantity of ${item.product.name}`}
              onClick={() => onQuantityChange(item.id, 1)}
            >
              +
            </button>
          </div>
          <strong>{money.format(item.product.price * item.quantity)}</strong>
        </>
      ) : (
        <p>Quantity: {item.quantity}</p>
      )}
      <button type="button" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </li>
  )
}
