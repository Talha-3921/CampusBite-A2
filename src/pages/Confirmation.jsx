import { Link, useLocation } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { formatCurrency } from '../utils/formatCurrency'

export function Confirmation() {
  const location = useLocation()
  const order = location.state?.order

  return (
    <PageShell title="Order confirmed">
      {order ? (
        <section className="confirmation-card" aria-live="polite">
          <p className="confirmation-check">Confirmed</p>
          <h2>Thank you, {order.name}.</h2>
          <p>Your simulated order <strong>{order.id}</strong> has been placed.</p>
          <dl>
            <div>
              <dt>Fulfilment</dt>
              <dd>{order.fulfilment === 'delivery' ? 'Delivery' : 'Collection'}</dd>
            </div>
            {order.address && (
              <div>
                <dt>Address</dt>
                <dd>{order.address}</dd>
              </div>
            )}
            <div>
              <dt>Items</dt>
              <dd>{order.itemCount}</dd>
            </div>
            <div>
              <dt>Subtotal</dt>
              <dd>{formatCurrency(order.subtotal)}</dd>
            </div>
          </dl>
        </section>
      ) : (
        <p>No recent order details are available.</p>
      )}
      <Link className="primary-action" to="/">
        Back to menu
      </Link>
    </PageShell>
  )
}
