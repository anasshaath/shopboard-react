import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { CartContext, type CartItem, type CartValue } from './cart.context.ts'
const key = 'shopboard-cart'
function load(): CartItem[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) ?? '[]')
    return Array.isArray(value)
      ? value.filter(
          (x): x is CartItem =>
            typeof x === 'object' &&
            x !== null &&
            'id' in x &&
            'qty' in x &&
            typeof x.id === 'number' &&
            Number.isInteger(x.id) &&
            typeof x.qty === 'number' &&
            Number.isInteger(x.qty) &&
            x.qty > 0,
        )
      : []
  } catch {
    return []
  }
}
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(load)
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(items))
    } catch {}
  }, [items])
  const value: CartValue = {
    items,
    itemCount: items.reduce((n, x) => n + x.qty, 0),
    add: (id) =>
      setItems((xs) =>
        xs.some((x) => x.id === id)
          ? xs.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x))
          : [...xs, { id, qty: 1 }],
      ),
    changeQuantity: (id, amount) =>
      setItems((xs) =>
        xs.map((x) => (x.id === id ? { ...x, qty: x.qty + amount } : x)).filter((x) => x.qty > 0),
      ),
    remove: (id) => setItems((xs) => xs.filter((x) => x.id !== id)),
    clear: () => setItems([]),
  }
  return <CartContext value={value}>{children}</CartContext>
}
