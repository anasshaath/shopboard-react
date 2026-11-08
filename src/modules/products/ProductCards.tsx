import { Link } from 'react-router'
import type { Product } from './products.types.ts'
import { useCart } from '../cart/useCart.ts'
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
export function ProductCards({ products }: { products: Product[] }) {
  const { add } = useCart()
  return (
    <ul className="product-grid">
      {products.map((product) => (
        <li key={product.id} className="product-card">
          <p>{product.category}</p>
          <h2>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </h2>
          <p>{money.format(product.price)}</p>
          <p>{product.inStock ? 'In stock' : 'Out of stock'}</p>
          <button disabled={!product.inStock} onClick={() => add(product.id)}>
            {product.inStock ? 'Add to cart' : 'Out of stock'}
          </button>
        </li>
      ))}
    </ul>
  )
}
