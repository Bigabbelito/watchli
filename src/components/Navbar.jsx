import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Film, Search, Bookmark, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    const q = searchValue.trim()
    if (q.length >= 2) {
      navigate(`/search?q=${encodeURIComponent(q)}`)
      setSearchValue('')
      setMenuOpen(false)
    }
  }

  const navLinkClass = ({ isActive }) =>
    `navbar__link${isActive ? ' navbar__link--active' : ''}`

  return (
    <header className="navbar" role="banner">
      <nav className="container navbar__inner" aria-label="Huvudnavigation">
        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="WatchLi — Hem">
          <Film size={24} aria-hidden="true" />
          <span className="navbar__logo-text">Watch<span className="gradient-text">Li</span></span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="navbar__links" role="list">
          <li>
            <NavLink to="/" end className={navLinkClass}>
              Hem
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" className={navLinkClass}>
              Utforska
            </NavLink>
          </li>
          <li>
            <NavLink to="/watchlist" className={navLinkClass}>
              <Bookmark size={15} aria-hidden="true" />
              Min lista
            </NavLink>
          </li>
        </ul>

        {/* Desktop Search */}
        <form className="navbar__search" onSubmit={handleSearch} role="search">
          <label htmlFor="navbar-search" className="visually-hidden">Sök filmer</label>
          <Search size={16} className="navbar__search-icon" aria-hidden="true" />
          <input
            id="navbar-search"
            type="search"
            className="navbar__search-input"
            placeholder="Sök filmer..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            aria-label="Sök filmer"
          />
        </form>

        {/* Mobile hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Stäng meny' : 'Öppna meny'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div id="mobile-menu" className="navbar__mobile" role="navigation" aria-label="Mobilnavigation">
          <form className="navbar__mobile-search" onSubmit={handleSearch} role="search">
            <label htmlFor="mobile-search" className="visually-hidden">Sök filmer</label>
            <Search size={16} aria-hidden="true" />
            <input
              id="mobile-search"
              type="search"
              placeholder="Sök filmer..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              aria-label="Sök filmer"
            />
          </form>
          <ul role="list">
            <li><NavLink to="/" end className={navLinkClass} onClick={() => setMenuOpen(false)}>Hem</NavLink></li>
            <li><NavLink to="/search" className={navLinkClass} onClick={() => setMenuOpen(false)}>Utforska</NavLink></li>
            <li><NavLink to="/watchlist" className={navLinkClass} onClick={() => setMenuOpen(false)}>Min lista</NavLink></li>
          </ul>
        </div>
      )}
    </header>
  )
}
