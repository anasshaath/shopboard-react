import { Link, useParams } from 'react-router'
import { useProduct } from './products.queries.ts'
import { useCart } from '../cart/useCart.ts'
export default function ProductPage() {
  const { id } = useParams()
  const productId = Number(id)
  if (!Number.isInteger(productId) || productId <= 0)
    return (
      <section>
        <h1>Product not found</h1>
        <Link to="/products">Return to products</Link>
      </section>
    )
  return <ProductDetail id={productId} />
}
function ProductDetail({ id }: { id: number }) {
  const { data: product } = useProduct(id)
  const { add } = useCart()
  if (!product)
    return (
      <section>
        <h1>Product not found</h1>
        <Link to="/products">Return to products</Link>
      </section>
    )
  return (
    <article className="product-detail">
      <Link to="/products">← Products</Link>
      <p>{product.category}</p>
      <h1>{product.name}</h1>
      <p>${product.price.toFixed(2)}</p>
      <p>{product.inStock ? 'In stock' : 'Out of stock'}</p>
      <button disabled={!product.inStock} onClick={() => add(product.id)}>
        Add to cart
      </button>
    </article>
  )
}
