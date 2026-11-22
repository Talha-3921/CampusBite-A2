import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Browse } from './pages/Browse'
import { Details } from './pages/Details'
import { Cart } from './pages/Cart'
import { Checkout } from './pages/Checkout'
import { Confirmation } from './pages/Confirmation'
import { NotFound } from './pages/NotFound'
import { CartProvider } from './context/CartContext'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <header className="site-header">
          <Link className="brand" to="/">
            CampusBite
          </Link>
          <nav aria-label="Primary navigation">
            <Link to="/">Menu</Link>
            <Link to="/cart">Cart</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/item/:id" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
