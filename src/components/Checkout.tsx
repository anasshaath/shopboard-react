import { useState } from 'react'
import type { FormEvent } from 'react'
import type { CartDetail } from '../modules/cart/cart.types.ts'
import type { Customer, CustomerErrors } from '../modules/products/products.logic.ts'
import { CheckoutField } from './CheckoutField.tsx'

interface CheckoutProps {
  cart: CartDetail[]
  confirmation: string
  errors: CustomerErrors
  message: string
  onBack: () => void
  onPlaceOrder: (customer: Customer) => void
}
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const emptyCustomer: Customer = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
}

export function Checkout({
  cart,
  confirmation,
  errors,
  message,
  onBack,
  onPlaceOrder,
}: CheckoutProps) {
  const [customer, setCustomer] = useState<Customer>(emptyCustomer)
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const update = (name: keyof Customer, value: string): void =>
    setCustomer((current) => ({ ...current, [name]: value }))
  function submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    onPlaceOrder(customer)
  }
  if (confirmation)
    return (
      <main className="checkout">
        <h1>Thank you</h1>
        <p role="status">{confirmation}</p>
        <button type="button" onClick={onBack}>
          Continue browsing
        </button>
      </main>
    )
  return (
    <main className="checkout">
      <button type="button" onClick={onBack}>
        ← Return to cart
      </button>
      <h1>Complete your demo order</h1>
      <p>Demo only — no payment is collected and nothing is sent to a server.</p>
      <div className="checkout-layout">
        <form noValidate onSubmit={submit}>
          <h2>Delivery details</h2>
          <CheckoutField
            error={errors.fullName}
            label="Full name"
            name="fullName"
            value={customer.fullName}
            onChange={update}
          />
          <CheckoutField
            error={errors.email}
            label="Email address"
            name="email"
            type="email"
            value={customer.email}
            onChange={update}
          />
          <CheckoutField
            error={errors.phone}
            label="Phone number"
            name="phone"
            type="tel"
            value={customer.phone}
            onChange={update}
          />
          <CheckoutField
            error={errors.address}
            label="Shipping address"
            name="address"
            value={customer.address}
            onChange={update}
          />
          <CheckoutField
            error={errors.city}
            label="City"
            name="city"
            value={customer.city}
            onChange={update}
          />
          <CheckoutField
            error={errors.postalCode}
            label="Postal code (optional)"
            name="postalCode"
            value={customer.postalCode}
            onChange={update}
          />
          <p role="alert">{message}</p>
          <button type="submit">Place demo order</button>
        </form>
        <aside>
          <h2>Order summary</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.product.name} × {item.quantity} —{' '}
                {money.format(item.product.price * item.quantity)}
              </li>
            ))}
          </ul>
          <p>
            Total <strong>{money.format(total)}</strong>
          </p>
        </aside>
      </div>
    </main>
  )
}
