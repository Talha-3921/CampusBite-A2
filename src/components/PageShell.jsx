import { Link } from 'react-router-dom'

export function PageShell({ title, children }) {
  return (
    <main className="page-shell">
      <Link className="back-link" to="/">
        Back to menu
      </Link>
      <h1>{title}</h1>
      {children}
    </main>
  )
}
