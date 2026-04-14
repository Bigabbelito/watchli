import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'

/**
 * Hero search bar for the home page.
 */
export default function SearchBar() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = query.trim()
    if (q.length >= 2) {
      navigate(`/search?q=${encodeURIComponent(q)}`)
    }
  }

  const clear = () => setQuery('')

  return (
    <form className="hero-search" onSubmit={handleSubmit} role="search">
      <label htmlFor="hero-search-input" className="visually-hidden">
        Sök bland tusentals filmer
      </label>
      <div className="hero-search__input-wrap">
        <Search
          size={20}
          className="hero-search__icon"
          aria-hidden="true"
        />
        <input
          id="hero-search-input"
          type="search"
          className="hero-search__input"
          placeholder="Sök bland tusentals filmer..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          aria-label="Sök bland tusentals filmer"
        />
        {query && (
          <button
            type="button"
            className="hero-search__clear"
            onClick={clear}
            aria-label="Rensa sökning"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="btn btn-primary hero-search__submit"
        disabled={query.trim().length < 2}
        aria-label="Sök"
      >
        Sök
      </button>
    </form>
  )
}
