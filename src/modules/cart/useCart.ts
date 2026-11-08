import { use } from 'react'
import { CartContext } from './cart.context.ts'
export function useCart() {
  const value = use(CartContext)
  if (!value) throw new Error('CartProvider is missing.')
  return value
}
