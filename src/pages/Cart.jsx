import { PageShell } from '../components/PageShell'
import { Link } from 'react-router-dom'

export function Cart() {
  return (
    <PageShell title="Cart">
      <p>The shared cart and quantity controls will be completed in Phase 3.</p>
      <Link className="primary-action" to="/checkout">
        Continue to checkout
      </Link>
    </PageShell>
  )
}
