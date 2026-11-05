import type { Category, ProductView } from '../modules/products/products.types.ts'
interface CatalogControlsProps {
  categories: Category[]
  onViewChange: (change: Partial<ProductView>) => void
  view: ProductView
}
function categoryValue(value: string): Category | 'all' {
  if (value === 'Bags' || value === 'Shoes' || value === 'Accessories' || value === 'all')
    return value
  return 'all'
}
export function CatalogControls({ categories, onViewChange, view }: CatalogControlsProps) {
  const uniqueCategories = [...new Set(categories)]
  return (
    <div className="catalog-controls">
      <label>
        Search
        <input
          type="search"
          value={view.search}
          onChange={(event) => onViewChange({ search: event.target.value })}
        />
      </label>
      <label>
        Category
        <select
          value={view.category}
          onChange={(event) => onViewChange({ category: categoryValue(event.target.value) })}
        >
          <option value="all">All categories</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={view.under30}
          onChange={(event) => onViewChange({ under30: event.target.checked })}
        />
        Under $30
      </label>
      <label>
        Sort
        <select
          value={view.sortDirection ?? ''}
          onChange={(event) =>
            onViewChange({
              sortDirection:
                event.target.value === 'asc'
                  ? 'asc'
                  : event.target.value === 'desc'
                    ? 'desc'
                    : null,
            })
          }
        >
          <option value="">Default</option>
          <option value="asc">Price: low to high</option>
          <option value="desc">Price: high to low</option>
        </select>
      </label>
      <button
        type="button"
        onClick={() =>
          onViewChange({ search: '', category: 'all', under30: false, sortDirection: null })
        }
      >
        Reset filters
      </button>
    </div>
  )
}
