import { useSuspenseQuery } from '@tanstack/react-query'
import { getProduct, getProducts } from './products.api.ts'
export const productKeys = {
  all: ['products'] as const,
  detail: (id: number) => ['products', id] as const,
}
export const useProducts = () =>
  useSuspenseQuery({
    queryKey: productKeys.all,
    queryFn: ({ signal }) => getProducts(signal),
    retry: false,
  })
export const useProduct = (id: number) =>
  useSuspenseQuery({
    queryKey: productKeys.detail(id),
    queryFn: ({ signal }) => getProduct(id, signal),
    retry: false,
  })
