import { useState } from 'react'
import type { InputHTMLAttributes } from 'react'
import { ProductCards } from './ProductCards.tsx'
import { useProducts } from './products.queries.ts'
export default function ProductsPage() {
  const { data } = useProducts()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const categories = [...new Set(data.map((p) => p.category))]
  const shown = data.filter(
    (p) =>
      (category === 'all' || p.category === category) &&
      p.name.toLowerCase().includes(query.toLowerCase()),
  )
  return (
    <section>
      <h1>The collection</h1>
      {data.length === 0 ? (
        <p className="status">No products are available right now.</p>
      ) : (
        <>
          <div className="catalog-controls">
            <label>
              Search
              <Input value={query} onChange={(e) => setQuery(e.target.value)} />
            </label>
            <label>
              Category
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="all">All categories</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>
          {shown.length === 0 ? (
            <p className="status">No products match these filters.</p>
          ) : (
            <ProductCards products={shown} />
          )}
        </>
      )}
    </section>
  )
}
function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input type="search" {...props} />
}
