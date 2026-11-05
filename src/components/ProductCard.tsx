import type { Product } from '../modules/products/products.types.ts'
interface ProductCardProps {
  onAddToCart: (product: Product) => void
  product: Product
}
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
export function ProductCard({ onAddToCart, product }: ProductCardProps) {
  return (
    <article className="product-card">
      <p className="eyebrow">{product.category}</p>
      <h3>{product.name}</h3>
      <p className="price">{money.format(product.price)}</p>
      <p>{product.inStock ? 'In stock' : 'Out of stock'}</p>
      <button type="button" disabled={!product.inStock} onClick={() => onAddToCart(product)}>
        {product.inStock ? 'Add to cart' : 'Out of stock'}
      </button>
    </article>
  )
}
