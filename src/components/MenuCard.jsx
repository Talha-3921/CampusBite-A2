import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/formatCurrency'

export function MenuCard({ item }) {
  return (
    <article className="menu-card">
      <div className="menu-card__image" aria-hidden="true">
        <span>{item.category.slice(0, 1)}</span>
      </div>
      <div className="menu-card__body">
        <div className="menu-card__heading">
          <span className="category">{item.category}</span>
          <span className={item.isVeg ? 'diet diet--veg' : 'diet diet--nonveg'}>
            {item.isVeg ? 'Vegetarian' : 'Non-veg'}
          </span>
        </div>
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <strong className="price">{formatCurrency(item.price)}</strong>
        <Link className="menu-card__link" to={`/item/${item.id}`}>
          View details
        </Link>
      </div>
    </article>
  )
}
