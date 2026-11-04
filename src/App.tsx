interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </article>
  );
}

const products: Product[] = [
  { id: 1, name: 'Leather Tote', price: 89 },
  { id: 2, name: 'Sneakers', price: 65 },
  { id: 3, name: 'Sunglasses', price: 25 },
];

export default function App() {
  return (
    <>
      <h1>ShopBoard</h1>

      <ul className="grid">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </>
  );
}