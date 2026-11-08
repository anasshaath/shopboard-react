import { Link } from 'react-router'
import { useCart } from './useCart.ts'
import { useProducts } from '../products/products.queries.ts'
export default function CartPage() {
  const { items, changeQuantity, remove } = useCart()
  const { data: products } = useProducts()
  const resolved = items.map((item) => ({ item, product: products.find((p) => p.id === item.id) }))
  const unavailable = resolved.filter((x) => !x.product)
  const total = resolved.reduce((sum, x) => sum + (x.product?.price ?? 0) * x.item.qty, 0)
  if (!items.length)
    return (
      <section>
        <h1>Your cart</h1>
        <p className="status">Your cart is empty.</p>
        <Link to="/products">Browse products</Link>
      </section>
    )
  return (
    <section>
      <h1>Your cart</h1>
      {unavailable.length > 0 && (
        <p className="status error">
          Some saved items are unavailable. Remove them before checkout.
        </p>
      )}
      <ul className="cart-list">
        {resolved.map(({ item, product }) => (
          <li key={item.id}>
            {product ? (
              <>
                <strong>{product.name}</strong> — ${product.price.toFixed(2)} × {item.qty}
                <button
                  onClick={() => changeQuantity(item.id, -1)}
                  aria-label={`Decrease ${product.name}`}
                >
                  −
                </button>
                <button
                  onClick={() => changeQuantity(item.id, 1)}
                  aria-label={`Increase ${product.name}`}
                >
                  +
                </button>
              </>
            ) : (
              <>
                Saved product #{item.id} × {item.qty}
              </>
            )}
            <button onClick={() => remove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>
        Total: <strong>${total.toFixed(2)}</strong>
      </p>
      <Link className="button-link" to="/checkout">
        Checkout
      </Link>
    </section>
  )
}
