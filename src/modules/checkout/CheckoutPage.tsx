import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router'
import { useCart } from '../cart/useCart.ts'
import { useProducts } from '../products/products.queries.ts'
import { Button } from '../../components/ui/button.tsx'
import { Field, FieldError, FieldLabel } from '../../components/ui/field.tsx'
import { Input } from '../../components/ui/input.tsx'
const schema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Enter a valid email address'),
  address: z.string().min(5, 'Enter your address'),
})
type CheckoutValues = z.infer<typeof schema>
export default function CheckoutPage() {
  const { items, clear } = useCart()
  const { data: products } = useProducts()
  const unavailable = items.some((item) => {
    const product = products.find((p) => p.id === item.id)
    return !product || !product.inStock
  })
  const form = useForm<CheckoutValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', address: '' },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
  })
  const [complete, setComplete] = useState(false)
  async function submit() {
    await Promise.resolve()
    clear()
    setComplete(true)
  }
  if (complete)
    return (
      <section>
        <h1>Thank you</h1>
        <p role="status">
          Your demo order was accepted locally. No payment was taken and no order was sent to a
          server.
        </p>
        <Link to="/products">Continue shopping</Link>
      </section>
    )
  if (!items.length || unavailable)
    return (
      <section>
        <h1>Checkout</h1>
        <p className="status error">
          {unavailable ? 'Remove unavailable items before checkout.' : 'Your cart is empty.'}
        </p>
        <Link to="/cart">Return to cart</Link>
      </section>
    )
  return (
    <section className="checkout">
      <h1>Checkout</h1>
      <p>Demo only — no payment or order is sent to a server.</p>
      <form onSubmit={form.handleSubmit(submit)} noValidate>
        {(['name', 'email', 'address'] as const).map((name) => (
          <Controller
            key={name}
            name={name}
            control={form.control}
            render={({ field, fieldState }) => {
              const errorId = `${name}-error`
              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={name}>{name[0].toUpperCase() + name.slice(1)}</FieldLabel>
                  <Input
                    {...field}
                    id={name}
                    type={name === 'email' ? 'email' : 'text'}
                    aria-invalid={fieldState.invalid}
                    aria-describedby={fieldState.error ? errorId : undefined}
                  />
                  <FieldError id={errorId} errors={[fieldState.error]} />
                </Field>
              )
            }}
          />
        ))}
        <Button disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Placing demo order…' : 'Place demo order'}
        </Button>
      </form>
    </section>
  )
}
