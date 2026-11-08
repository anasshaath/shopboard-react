import { Link } from 'react-router'
export default function NotFoundPage() {
  return (
    <section>
      <h1>Page not found</h1>
      <p>That address is not part of ShopBoard.</p>
      <Link to="/">Go home</Link>
    </section>
  )
}
