import { useMemo } from 'react'
import type * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Label } from './label.tsx'
const fieldVariants = cva('group/field data-[invalid=true]:text-destructive flex w-full gap-3', {
  variants: {
    orientation: {
      vertical: ['flex-col [&>*]:w-full [&>.sr-only]:w-auto'],
      horizontal: ['flex-row items-center', '[&>[data-slot=field-label]]:flex-auto'],
    },
  },
  defaultVariants: { orientation: 'vertical' },
})
function Field({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}
function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn('group/field-label peer/field-label flex w-fit gap-2 leading-snug', className)}
      {...props}
    />
  )
}
function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<'div'> & { errors?: Array<{ message?: string } | undefined> }) {
  const content = useMemo(
    () =>
      children ??
      (errors?.length === 1
        ? errors[0]?.message
        : errors?.map(
            (error, index) => error?.message && <span key={index}>{error.message}</span>,
          )),
    [children, errors],
  )
  return content ? (
    <div
      role="alert"
      data-slot="field-error"
      className={cn('text-destructive text-sm font-normal', className)}
      {...props}
    >
      {content}
    </div>
  ) : null
}
export { Field, FieldError, FieldLabel }
