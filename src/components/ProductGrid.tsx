import { ProductCard } from './ProductCard.tsx'
import type { Product } from '../modules/products/products.types.ts'
interface ProductGridProps {
  onAddToCart: (product: Product) => void
  products: Product[]
}
export function ProductGrid({ onAddToCart, products }: ProductGridProps) {
  return (
    <ul className="product-grid">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </li>
      ))}
    </ul>
  )
}
