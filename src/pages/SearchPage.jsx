import { useState, useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { Search, LayoutGrid, List, ArrowLeft, Bookmark, BookmarkCheck, Film } from 'lucide-react'
import { useOMDB } from '../hooks/useOMDB'
import { useWatchlist } from '../hooks/useWatchlist'
import MovieCard from '../components/MovieCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

/* ---- List Row (inline component, no hooks needed here) ---- */
function MovieListRow({ movie, onWatchlistToggle, isInWatchlist }) {
  const posterIsValid = movie.Poster && movie.Poster !== 'N/A'

  const handleWatchlistClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onWatchlistToggle(movie)
  }

  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      className="movie-list-row"
      aria-label={`${movie.Title}${movie.Year ? `, ${movie.Year}` : ''} — klicka för detaljer`}
    >
      <div className="movie-list-row__poster">
        {posterIsValid ? (
          <img
            src={movie.Poster}
            alt={`Filmaffisch för ${movie.Title}`}
            loading="lazy"
          />
        ) : (
          <div className="movie-list-row__poster-placeholder" aria-hidden="true">
            <Film size={20} />
          </div>
        )}
      </div>
      <div className="movie-list-row__info">
        <h3 className="movie-list-row__title">{movie.Title}</h3>
        <div className="movie-list-row__meta">
          <span className="movie-list-row__year">{movie.Year || '—'}</span>
          {movie.Type && (
            <span className="badge badge-accent">{movie.Type}</span>
          )}
        </div>
      </div>
      {onWatchlistToggle && (
        <button
          className={`movie-card__watchlist-btn${isInWatchlist ? ' saved' : ''}`}
          onClick={handleWatchlistClick}
          aria-label={isInWatchlist ? `Ta bort ${movie.Title} från watchlist` : `Lägg till ${movie.Title} i watchlist`}
        >
          {isInWatchlist
            ? <BookmarkCheck size={16} aria-hidden="true" />
            : <Bookmark size={16} aria-hidden="true" />
          }
        </button>
      )}
    </Link>
  )
}

/* ---- Main SearchPage ---- */
export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [inputValue, setInputValue] = useState(searchParams.get('q') || '')
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [viewMode, setViewMode] = useState('grid')

  const { data, loading, error } = useOMDB('search', query)
  const { toggleWatchlist, isInWatchlist } = useWatchlist()

  // Keep input in sync when URL param changes (e.g. navbar search)
  useEffect(() => {
    const q = searchParams.get('q') || ''
    setInputValue(q)
    setQuery(q)
  }, [searchParams])

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = inputValue.trim()
    if (q.length >= 2) {
      setSearchParams({ q })
    }
  }

  const results = data?.Search || []
  const totalResults = data?.totalResults

  return (
    <main id="main-content" className="page">
      <div className="container">
        {/* Back Link */}
        <Link to="/" className="back-link">
          <ArrowLeft size={16} aria-hidden="true" />
          Tillbaka till hem
        </Link>

        {/* Page Heading */}
        <header className="search-page__header">
          <h1 className="section-title">Sök filmer</h1>
          {totalResults && query && !loading && (
            <p className="search-page__count" aria-live="polite">
              {totalResults} resultat för <strong>"{query}"</strong>
            </p>
          )}
        </header>

        {/* Search Form */}
        <form className="search-page__form" onSubmit={handleSubmit} role="search">
          <label htmlFor="search-page-input" className="visually-hidden">Sök filmer</label>
          <div className="search-page__input-wrap">
            <Search size={18} className="search-page__icon" aria-hidden="true" />
            <input
              id="search-page-input"
              type="search"
              className="search-page__input"
              placeholder="Ange filmtitel..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoComplete="off"
              aria-label="Sök filmer"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={inputValue.trim().length < 2}
          >
            Sök
          </button>
        </form>

        {/* Toolbar */}
        {results.length > 0 && !loading && (
          <div className="search-page__toolbar">
            <p className="search-page__results-text">
              Visar {results.length} av {totalResults} träffar
            </p>
            <div className="view-toggle" role="group" aria-label="Välj visningsläge">
              <button
                className={`view-toggle__btn${viewMode === 'grid' ? ' active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-pressed={viewMode === 'grid'}
                aria-label="Rutnätsvy"
              >
                <LayoutGrid size={18} aria-hidden="true" />
              </button>
              <button
                className={`view-toggle__btn${viewMode === 'list' ? ' active' : ''}`}
                onClick={() => setViewMode('list')}
                aria-pressed={viewMode === 'list'}
                aria-label="Listvy"
              >
                <List size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && <LoadingSpinner label="Söker filmer..." />}

        {/* Error */}
        {error && !loading && <ErrorMessage message={error} />}

        {/* No results */}
        {!loading && !error && query && results.length === 0 && (
          <div className="empty-state fade-in-up">
            <div className="empty-state__icon" aria-hidden="true">🎬</div>
            <h2 className="empty-state__title">Inga filmer hittades</h2>
            <p className="empty-state__text">
              Inga resultat för <strong>"{query}"</strong>. Prova ett annat sökord.
            </p>
          </div>
        )}

        {/* No query entered yet */}
        {!loading && !error && !query && (
          <div className="empty-state fade-in-up">
            <div className="empty-state__icon" aria-hidden="true">🔍</div>
            <h2 className="empty-state__title">Börja söka</h2>
            <p className="empty-state__text">
              Skriv in en filmtitel för att hitta filmer.
            </p>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && !loading && (
          <section aria-label={`Sökresultat för ${query}`} className="fade-in-up">
            {viewMode === 'grid' ? (
              <div className="movie-grid" role="list">
                {results.map((movie) => (
                  <div key={movie.imdbID} role="listitem">
                    <MovieCard
                      movie={movie}
                      onWatchlistToggle={toggleWatchlist}
                      isInWatchlist={isInWatchlist(movie.imdbID)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <ul className="movie-list" aria-label="Sökresultat i listformat">
                {results.map((movie) => (
                  <li key={movie.imdbID}>
                    <MovieListRow
                      movie={movie}
                      onWatchlistToggle={toggleWatchlist}
                      isInWatchlist={isInWatchlist(movie.imdbID)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
    </main>
  )
}
