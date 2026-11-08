import { Link } from 'react-router'
export default function HomePage() {
  return (
    <section className="hero">
      <p className="eyebrow">THE SMALL THINGS, WELL CHOSEN</p>
      <h1>ShopBoard</h1>
      <p>Useful goods for a well-lived day.</p>
      <Link className="button-link" to="/products">
        Browse the collection
      </Link>
    </section>
  )
}
