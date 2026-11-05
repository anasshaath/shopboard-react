import type { Customer } from '../modules/products/products.logic.ts'

interface CheckoutFieldProps {
  error: string | undefined
  label: string
  name: keyof Customer
  onChange: (name: keyof Customer, value: string) => void
  type?: string
  value: string
}

export function CheckoutField({
  error,
  label,
  name,
  onChange,
  type = 'text',
  value,
}: CheckoutFieldProps) {
  const id = `checkout-${name}`
  return (
    <label htmlFor={id}>
      {label}
      <input
        aria-invalid={error ? true : undefined}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
      />
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  )
}
