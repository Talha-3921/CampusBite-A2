import { useEffect, useMemo, useState } from 'react'
import { MenuCard } from '../components/MenuCard'
import { loadMenu } from '../data/menu'

export function Browse() {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('default')
  const [retryCount, setRetryCount] = useState(0)
  const [demoFailure, setDemoFailure] = useState(false)

  useEffect(() => {
    let active = true

    loadMenu({ forceError: demoFailure })
      .then((loadedItems) => {
        if (active) {
          setItems(loadedItems)
          setStatus('ready')
        }
      })
      .catch((loadError) => {
        if (active) {
          setError(loadError.message)
          setStatus('error')
        }
      })

    return () => {
      active = false
    }
  }, [retryCount, demoFailure])

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const filtered = items.filter((item) => {
      const matchesSearch =
        !normalizedQuery ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery)
      const matchesFilter =
        filter === 'all' ||
        (filter === 'veg' && item.isVeg) ||
        (filter === 'nonveg' && !item.isVeg)
      return matchesSearch && matchesFilter
    })

    if (sort === 'low') {
      return [...filtered].sort((first, second) => first.price - second.price)
    }
    if (sort === 'high') {
      return [...filtered].sort((first, second) => second.price - first.price)
    }
    return filtered
  }, [items, query, filter, sort])

  return (
    <main className="browse" id="main-content">
      <header className="browse-header">
        <div>
          <p className="eyebrow">CampusBite Islamabad</p>
          <h1>Browse the menu</h1>
          <p className="subtitle">Student-friendly meals for Islamabad and Wah Cantt.</p>
        </div>
        <button
          className="demo-error-button"
          type="button"
          onClick={() => {
            setStatus('loading')
            setError('')
            setDemoFailure(true)
            setRetryCount((count) => count + 1)
          }}
        >
          Demo load failure
        </button>
      </header>

      <section className="menu-controls" aria-label="Menu search and filters">
        <div className="search-field">
          <label htmlFor="menu-search">Search menu</label>
          <input
            id="menu-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a meal..."
          />
        </div>
        <div className="select-field">
          <label htmlFor="diet-filter">Diet</label>
          <select
            id="diet-filter"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="all">All items</option>
            <option value="veg">Vegetarian</option>
            <option value="nonveg">Non-veg</option>
          </select>
        </div>
        <div className="select-field">
          <label htmlFor="price-sort">Sort by price</label>
          <select
            id="price-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="default">Recommended</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>
      </section>

      {status === 'loading' && (
        <div className="menu-state" role="status" aria-live="polite">
          Loading menu...
        </div>
      )}

      {status === 'error' && (
        <div className="menu-state menu-state--error" role="alert">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => {
              setStatus('loading')
              setError('')
              setDemoFailure(false)
              setRetryCount((count) => count + 1)
            }}
          >
            Try again
          </button>
        </div>
      )}

      {status === 'ready' && visibleItems.length === 0 && (
        <div className="menu-state">
          <h2>No items found</h2>
          <p>Try a different search or filter.</p>
        </div>
      )}

      {status === 'ready' && visibleItems.length > 0 && (
        <section className="menu-grid" aria-label="Menu items">
          {visibleItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </section>
      )}
    </main>
  )
}
