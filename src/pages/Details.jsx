import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { menuItems } from '../data/menu'
import { formatCurrency } from '../utils/formatCurrency'
import { PageShell } from '../components/PageShell'
import { useCart } from '../context/useCart'

const MAX_QUANTITY = 8

export function Details() {
  const { id } = useParams()
  const item = menuItems.find((menuItem) => menuItem.id === id)
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')
  const [bundleType, setBundleType] = useState('veg')
  const { addItem } = useCart()

  if (!item) {
    return (
      <PageShell title="Item not found">
        <p>This menu item does not exist.</p>
        <Link className="primary-action" to="/">
          Return to menu
        </Link>
      </PageShell>
    )
  }

  function addToCart() {
    addItem(item.id, quantity, item.id === 'weekly-student-bundle' ? bundleType : undefined)
    setMessage(`${quantity} x ${item.name} added to cart`)
  }

  return (
    <PageShell title={item.name}>
      <article className="details-layout">
        <div className="details-image" aria-hidden="true">
          <span>{item.category.slice(0, 1)}</span>
        </div>
        <div className="details-info">
          <div className="details-meta">
            <span className="category">{item.category}</span>
            <span className={item.isVeg ? 'diet diet--veg' : 'diet diet--nonveg'}>
              {item.isVeg ? 'Vegetarian' : 'Non-veg'}
            </span>
          </div>
          <p>{item.description}</p>
          <strong className="details-price">{formatCurrency(item.price)}</strong>
          <label htmlFor="item-quantity">Quantity</label>
          <select
            id="item-quantity"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
          >
            {Array.from({ length: MAX_QUANTITY }, (_, index) => index + 1).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <p className="limit-message">Maximum 8 of any single item per order.</p>
          {item.id === 'weekly-student-bundle' && (
            <>
              <label htmlFor="bundle-type">Bundle meal style</label>
              <select
                id="bundle-type"
                value={bundleType}
                onChange={(event) => setBundleType(event.target.value)}
              >
                <option value="veg">Vegetarian</option>
                <option value="nonveg">Non-vegetarian</option>
              </select>
              <p className="limit-message">
                Keep bundle meals and regular cart items in the same dietary style.
              </p>
            </>
          )}
          <button className="primary-action" type="button" onClick={addToCart}>
            Add to cart
          </button>
          {message && <p className="success-message" role="status">{message}</p>}
          <Link className="secondary-action" to="/cart">
            View cart
          </Link>
        </div>
      </article>
    </PageShell>
  )
}
