import type { LoadState } from '../modules/products/products.types.ts'
interface CatalogStateProps {
  loadState: LoadState
  onRetry: () => void
  visibleCount: number
}
export function CatalogState({ loadState, onRetry, visibleCount }: CatalogStateProps) {
  if (loadState.status === 'loading')
    return (
      <p className="status" role="status">
        Loading products…
      </p>
    )
  if (loadState.status === 'error')
    return (
      <div className="status error" role="alert">
        <p>{loadState.message}</p>
        <button type="button" onClick={onRetry}>
          Try again
        </button>
      </div>
    )
  if (loadState.products.length === 0)
    return <p className="status">No products are available right now.</p>
  if (visibleCount === 0) return <p className="status">No products match these filters.</p>
  return (
    <p className="summary" role="status">
      {visibleCount} products found
    </p>
  )
}
