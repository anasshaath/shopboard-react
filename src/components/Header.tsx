interface HeaderProps {
  itemCount: number
  onOpenCart: () => void
}
export function Header({ itemCount, onOpenCart }: HeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href="#store-title">
        ShopBoard
      </a>
      <nav aria-label="Main navigation">
        <a href="#catalog-title">Collection</a>
        <a href="#signup">Join the board</a>
        <button type="button" onClick={onOpenCart}>
          Cart <span aria-live="polite">({itemCount})</span>
        </button>
      </nav>
    </header>
  )
}
