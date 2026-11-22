import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/useCart'
import {
  DELIVERY_MINIMUM,
  getBundleConflict,
  getDeliveryRemaining,
} from '../utils/cartRules'
import { formatCurrency } from '../utils/formatCurrency'
import { PageShell } from '../components/PageShell'

export function Checkout() {
  const navigate = useNavigate()
  const { enrichedCart, subtotal, clearCart } = useCart()
  const [form, setForm] = useState({
    name: '',
    phone: '',
    fulfilment: 'collection',
    address: '',
  })
  const [errors, setErrors] = useState({})
  const bundleConflict = getBundleConflict(enrichedCart)
  const remaining = getDeliveryRemaining(subtotal)

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  function validate() {
    const nextErrors = {}

    if (form.name.trim().length < 2) {
      nextErrors.name = 'Enter your name (at least 2 characters).'
    }
    const phoneDigits = form.phone.replace(/\D/g, '')
    if (
      !/^[0-9+][0-9+ -]*[0-9]$/.test(form.phone.trim()) ||
      phoneDigits.length < 10 ||
      phoneDigits.length > 15
    ) {
      nextErrors.phone = 'Enter a valid phone number with 10 to 15 digits.'
    }
    if (!['delivery', 'collection'].includes(form.fulfilment)) {
      nextErrors.fulfilment = 'Select delivery or collection.'
    }
    if (form.fulfilment === 'delivery' && form.address.trim().length < 8) {
      nextErrors.address = 'Enter a complete delivery address of at least 8 characters.'
    }
    if (form.fulfilment === 'delivery' && subtotal < DELIVERY_MINIMUM) {
      nextErrors.fulfilment = `Delivery requires a minimum of ${formatCurrency(DELIVERY_MINIMUM)}. Add ${formatCurrency(remaining)} more or choose collection.`
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function submitOrder(event) {
    event.preventDefault()
    if (bundleConflict) return
    if (!validate()) return

    const order = {
      id: `CB-${Date.now().toString().slice(-6)}`,
      name: form.name.trim(),
      phone: form.phone.trim(),
      fulfilment: form.fulfilment,
      address: form.fulfilment === 'delivery' ? form.address.trim() : '',
      subtotal,
      itemCount: enrichedCart.reduce((total, entry) => total + entry.quantity, 0),
    }

    clearCart()
    navigate('/confirmation', { state: { order } })
  }

  if (enrichedCart.length === 0) {
    return (
      <PageShell title="Checkout">
        <div className="checkout-empty">
          <p>Your cart is empty. Add a meal before checkout.</p>
          <Link className="primary-action" to="/">
            Browse menu
          </Link>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell title="Checkout">
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={submitOrder} noValidate>
          <h2>Customer details</h2>
          <div className="form-field">
            <label htmlFor="checkout-name">Name</label>
            <input
              id="checkout-name"
              name="name"
              value={form.name}
              onChange={updateField}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && <p id="name-error" className="field-error">{errors.name}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="checkout-phone">Phone</label>
            <input
              id="checkout-phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={updateField}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              placeholder="03XX XXX XXXX"
            />
            {errors.phone && <p id="phone-error" className="field-error">{errors.phone}</p>}
          </div>

          <fieldset className="fulfilment-field">
            <legend>Fulfilment method</legend>
            <label>
              <input
                type="radio"
                name="fulfilment"
                value="collection"
                checked={form.fulfilment === 'collection'}
                onChange={updateField}
              />
              Collection
            </label>
            <label>
              <input
                type="radio"
                name="fulfilment"
                value="delivery"
                checked={form.fulfilment === 'delivery'}
                onChange={updateField}
              />
              Delivery
            </label>
            {errors.fulfilment && (
              <p className="field-error" role="alert">{errors.fulfilment}</p>
            )}
          </fieldset>

          {form.fulfilment === 'delivery' && (
            <div className="form-field">
              <label htmlFor="checkout-address">Delivery address</label>
              <textarea
                id="checkout-address"
                name="address"
                value={form.address}
                onChange={updateField}
                aria-invalid={Boolean(errors.address)}
                aria-describedby={errors.address ? 'address-error' : undefined}
                placeholder="House, street, sector or area"
                rows="4"
              />
              {errors.address && (
                <p id="address-error" className="field-error">{errors.address}</p>
              )}
              <p className="delivery-note">
                Delivery is available in G-10, F-10, H-8, I-8, and Wah Cantt main areas.
              </p>
            </div>
          )}

          {bundleConflict && (
            <p className="conflict-message" role="alert">{bundleConflict}</p>
          )}

          <button className="primary-action" type="submit" disabled={Boolean(bundleConflict)}>
            Place simulated order
          </button>
        </form>

        <aside className="checkout-summary" aria-label="Checkout summary">
          <h2>Order summary</h2>
          <div className="summary-row">
            <span>Items</span>
            <strong>{enrichedCart.reduce((total, entry) => total + entry.quantity, 0)}</strong>
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          {form.fulfilment === 'delivery' && (
            remaining > 0 ? (
              <p className="minimum-warning" role="status">
                Add {formatCurrency(remaining)} more for delivery.
              </p>
            ) : (
              <p className="minimum-met" role="status">
                Delivery minimum reached.
              </p>
            )
          )}
          {form.fulfilment === 'collection' && (
            <p className="minimum-met">Collection has no minimum.</p>
          )}
        </aside>
      </div>
    </PageShell>
  )
}
