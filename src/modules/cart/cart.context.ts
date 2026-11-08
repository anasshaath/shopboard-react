import { createContext } from 'react'
export interface CartItem {
  id: number
  qty: number
}
export interface CartValue {
  items: CartItem[]
  itemCount: number
  add: (id: number) => void
  changeQuantity: (id: number, amount: number) => void
  remove: (id: number) => void
  clear: () => void
}
export const CartContext = createContext<CartValue | null>(null)
