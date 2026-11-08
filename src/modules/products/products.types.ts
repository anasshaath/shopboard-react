export type Category = 'Bags' | 'Shoes' | 'Accessories'

export interface Product {
  id: number
  name: string
  price: number
  category: Category
  inStock: boolean
}
