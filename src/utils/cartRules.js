export const MAX_QUANTITY = 8
export const DELIVERY_MINIMUM = 800

export function getDeliveryRemaining(subtotal) {
  return Math.max(0, DELIVERY_MINIMUM - subtotal)
}

export function getQuantityWithinLimit(quantity) {
  return Number.isInteger(quantity) && quantity >= 1 && quantity <= MAX_QUANTITY
}

export function getBundleConflict(cart) {
  const bundle = cart.find(
    (entry) => entry.id === 'weekly-student-bundle' && entry.bundleType,
  )
  if (!bundle) return null

  const hasOppositeItem = cart.some((entry) => {
    if (entry.id === 'weekly-student-bundle') return false
    if (!entry.item) return false
    const entryIsVeg = entry.item.isVeg
    return bundle.bundleType === 'veg' ? !entryIsVeg : entryIsVeg
  })

  if (!hasOppositeItem) return null

  return bundle.bundleType === 'veg'
    ? 'Vegetarian bundles cannot be mixed with non-vegetarian items.'
    : 'Non-vegetarian bundles cannot be mixed with vegetarian items.'
}
