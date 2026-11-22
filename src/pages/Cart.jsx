import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { getBundleConflict } from '../utils/cartRules'
import { formatCurrency } from '../utils/formatCurrency'
import { PageShell } from '../components/PageShell'

export function Cart() {
  const { enrichedCart, subtotal, setQuantity, removeItem } = useCart()
  const bundleConflict = getBundleConflict(enrichedCart)

  if (enrichedCart.length === 0) {
    return (
      <PageShell title="Cart">
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link className="primary-action" to="/">
            Browse menu
          </Link>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell title="Cart">
      <div className="cart-layout">
        <section className="cart-items" aria-label="Cart items">
          {enrichedCart.map((entry) => (
            <article
              className="cart-item"
              key={`${entry.id}-${entry.bundleType || 'standard'}`}
            >
              <div className="cart-item__main">
                <h2>{entry.item.name}</h2>
                {entry.bundleType && (
                  <p className="bundle-label">
                    Bundle style: {entry.bundleType === 'veg' ? 'Vegetarian' : 'Non-vegetarian'}
                  </p>
                )}
                <strong>{formatCurrency(entry.item.price)}</strong>
              </div>
              <div className="quantity-controls" aria-label={`Quantity for ${entry.item.name}`}>
                <button
                  type="button"
                  onClick={() => setQuantity(entry.id, entry.quantity - 1, entry.bundleType)}
                  disabled={entry.quantity === 1}
                  aria-label={`Decrease ${entry.item.name} quantity`}
                >
                  -
                </button>
                <span aria-live="polite">{entry.quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(entry.id, entry.quantity + 1, entry.bundleType)}
                  disabled={entry.quantity === 8}
                  aria-label={`Increase ${entry.item.name} quantity`}
                >
                  +
                </button>
              </div>
              {entry.quantity === 8 && (
                <p className="limit-message">Maximum 8 of this item reached.</p>
              )}
              <button
                className="remove-button"
                type="button"
                onClick={() => removeItem(entry.id, entry.bundleType)}
              >
                Remove
              </button>
            </article>
          ))}
        </section>
        <aside className="cart-summary" aria-label="Cart summary">
          <h2>Order summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          {bundleConflict && (
            <p className="conflict-message" role="alert">
              {bundleConflict}
            </p>
          )}
          <Link
            className={bundleConflict ? 'primary-action primary-action--disabled' : 'primary-action'}
            to={bundleConflict ? '/cart' : '/checkout'}
            aria-disabled={Boolean(bundleConflict)}
          >
            Continue to checkout
          </Link>
        </aside>
      </div>
    </PageShell>
  )
}
