import { NavLink, Outlet } from 'react-router'
import { useCart } from '../cart/useCart.ts'
export default function Layout() {
  const { itemCount } = useCart()
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/">
          ShopBoard
        </NavLink>
        <nav aria-label="Main navigation">
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">Cart ({itemCount})</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
