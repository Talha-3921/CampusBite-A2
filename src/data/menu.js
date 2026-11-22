export const menuItems = [
  {
    id: 'classic-chicken-wrap',
    name: 'Classic Chicken Wrap',
    price: 450,
    category: 'Wraps',
    isVeg: false,
    description: 'Grilled chicken, fresh vegetables, and CampusBite sauce in a soft wrap.',
    image: '/menu-placeholder.svg',
  },
  {
    id: 'spicy-beef-bowl',
    name: 'Spicy Beef Bowl',
    price: 520,
    category: 'Bowls',
    isVeg: false,
    description: 'Spiced beef, seasoned rice, vegetables, and a smoky house sauce.',
    image: '/menu-placeholder.svg',
  },
  {
    id: 'veggie-protein-bowl',
    name: 'Veggie Protein Bowl',
    price: 480,
    category: 'Bowls',
    isVeg: true,
    description: 'Chickpeas, fresh vegetables, grains, greens, and herb dressing.',
    image: '/menu-placeholder.svg',
  },
  {
    id: 'chicken-shawarma-plate',
    name: 'Chicken Shawarma Plate',
    price: 550,
    category: 'Platters',
    isVeg: false,
    description: 'Shawarma-seasoned chicken with rice, salad, pita, and garlic sauce.',
    image: '/menu-placeholder.svg',
  },
  {
    id: 'egg-cheese-breakfast-wrap',
    name: 'Egg & Cheese Breakfast Wrap',
    price: 380,
    category: 'Breakfast',
    isVeg: true,
    description: 'Fluffy egg and melted cheese with peppers in a warm wrap.',
    image: '/menu-placeholder.svg',
  },
  {
    id: 'grilled-paneer-salad',
    name: 'Grilled Paneer Salad',
    price: 420,
    category: 'Salads',
    isVeg: true,
    description: 'Grilled paneer, crunchy vegetables, greens, and a zesty dressing.',
    image: '/menu-placeholder.svg',
  },
  {
    id: 'mini-burger-combo',
    name: 'Mini Burger Combo',
    price: 490,
    category: 'Combos',
    isVeg: false,
    description: 'Mini chicken burgers with fries and a chilled drink.',
    image: '/menu-placeholder.svg',
  },
  {
    id: 'weekly-student-bundle',
    name: 'Weekly Student Bundle (5 meals)',
    price: 2100,
    category: 'Bundles',
    isVeg: false,
    description: 'A five-meal weekly bundle that keeps vegetarian and non-vegetarian choices separate.',
    image: '/menu-placeholder.svg',
  },
  {
    id: 'protein-smoothie',
    name: 'Protein Smoothie',
    price: 320,
    category: 'Drinks',
    isVeg: true,
    description: 'A creamy protein smoothie with banana and a balanced breakfast boost.',
    image: '/menu-placeholder.svg',
  },
  {
    id: 'loaded-fries',
    name: 'Loaded Fries',
    price: 350,
    category: 'Sides',
    isVeg: false,
    description: 'Crispy fries topped with chicken, cheese, and signature sauce.',
    image: '/menu-placeholder.svg',
  },
  {
    id: 'chicken-tikka-rice-bowl',
    name: 'Chicken Tikka Rice Bowl',
    price: 510,
    category: 'Bowls',
    isVeg: false,
    description: 'Chicken tikka, fragrant rice, vegetables, and cooling yogurt sauce.',
    image: '/menu-placeholder.svg',
  },
  {
    id: 'falafel-wrap',
    name: 'Falafel Wrap',
    price: 430,
    category: 'Wraps',
    isVeg: true,
    description: 'Herbed falafel, crisp vegetables, pickles, and tahini in a soft wrap.',
    image: '/menu-placeholder.svg',
  },
]

export async function loadMenu({ forceError = false } = {}) {
  await new Promise((resolve) => setTimeout(resolve, 650))

  if (forceError) {
    throw new Error('The menu could not be loaded.')
  }

  return menuItems
}
