import { useEffect, useMemo, useState } from 'react'
import { menuItems } from '../data/menu'
import { MAX_QUANTITY } from '../utils/cartRules'
import { CartContext } from './CartContextValue'

const CART_KEY = 'campusbite-cart'

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || '[]')
    if (!Array.isArray(saved)) return []

    return saved
      .filter((entry) => menuItems.some((item) => item.id === entry.id))
      .map((entry) => ({
        id: entry.id,
        quantity: Math.max(1, Math.min(MAX_QUANTITY, Number(entry.quantity) || 1)),
        bundleType: entry.bundleType || undefined,
      }))
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart)

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  const enrichedCart = useMemo(
    () =>
      cart.map((entry) => ({
        ...entry,
        item: menuItems.find((item) => item.id === entry.id),
      })),
    [cart],
  )

  const subtotal = useMemo(
    () =>
      enrichedCart.reduce(
        (total, entry) => total + entry.item.price * entry.quantity,
        0,
      ),
    [enrichedCart],
  )

  function addItem(id, quantity = 1, bundleType) {
    setCart((current) => {
      const existing = current.find(
        (entry) => entry.id === id && entry.bundleType === bundleType,
      )

      if (existing) {
        return current.map((entry) =>
          entry === existing
            ? {
                ...entry,
                quantity: Math.min(MAX_QUANTITY, entry.quantity + quantity),
              }
            : entry,
        )
      }

      return [
        ...current,
        {
          id,
          quantity: Math.max(1, Math.min(MAX_QUANTITY, quantity)),
          bundleType,
        },
      ]
    })
  }

  function setQuantity(id, quantity, bundleType) {
    setCart((current) =>
      current.map((entry) =>
        entry.id === id && entry.bundleType === bundleType
          ? {
              ...entry,
              quantity: Math.max(1, Math.min(MAX_QUANTITY, quantity)),
            }
          : entry,
      ),
    )
  }

  function removeItem(id, bundleType) {
    setCart((current) =>
      current.filter(
        (entry) => !(entry.id === id && entry.bundleType === bundleType),
      ),
    )
  }

  function clearCart() {
    setCart([])
  }

  const value = {
    cart,
    enrichedCart,
    subtotal,
    addItem,
    setQuantity,
    removeItem,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

