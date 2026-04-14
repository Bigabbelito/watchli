import { Link } from 'react-router-dom'
import { Trash2, Compass } from 'lucide-react'
import { useWatchlist } from '../hooks/useWatchlist'

export default function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist()
  const posterIsValid = (poster) => poster && poster !== 'N/A'

  return (
    <main id="main-content" className="page">
      <div className="container">
        {/* Header */}
        <header className="watchlist-header">
          <div>
            <h1 className="section-title">Min Watchlist</h1>
            {watchlist.length > 0 && (
              <p className="watchlist-count">
                {watchlist.length} {watchlist.length === 1 ? 'film' : 'filmer'} sparade
              </p>
            )}
          </div>
        </header>

        {/* Empty State */}
        {watchlist.length === 0 && (
          <div className="empty-state fade-in-up">
            <div className="empty-state__icon" aria-hidden="true">🎞️</div>
            <h2 className="empty-state__title">Din watchlist är tom</h2>
            <p className="empty-state__text">
              Utforska filmer och klicka på bokmärket för att spara dem hit.
            </p>
            <Link to="/search" className="btn btn-primary">
              <Compass size={18} aria-hidden="true" />
              Utforska filmer
            </Link>
          </div>
        )}

        {/* Watchlist Grid */}
        {watchlist.length > 0 && (
          <section aria-label="Sparade filmer" className="fade-in-up">
            <div className="watchlist-grid" role="list">
              {watchlist.map((movie) => (
                <article
                  key={movie.imdbID}
                  className="watchlist-card"
                  role="listitem"
                >
                  {/* Poster */}
                  <Link
                    to={`/movie/${movie.imdbID}`}
                    className="watchlist-card__poster-link"
                    aria-label={`Visa detaljer för ${movie.Title}`}
                  >
                    <div className="watchlist-card__poster-wrap">
                      {posterIsValid(movie.Poster) ? (
                        <img
                          className="watchlist-card__poster"
                          src={movie.Poster}
                          alt={`Filmaffisch för ${movie.Title}`}
                          loading="lazy"
                        />
                      ) : (
                        <div className="watchlist-card__poster-placeholder" aria-hidden="true">
                          🎬
                        </div>
                      )}
                      <div className="watchlist-card__hover-overlay" aria-hidden="true">
                        <span>Visa info</span>
                      </div>
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="watchlist-card__body">
                    <Link
                      to={`/movie/${movie.imdbID}`}
                      className="watchlist-card__title"
                    >
                      {movie.Title}
                    </Link>
                    <span className="watchlist-card__year">{movie.Year || '—'}</span>

                    {/* Remove button */}
                    <button
                      className="watchlist-card__remove"
                      onClick={() => removeFromWatchlist(movie.imdbID)}
                      aria-label={`Ta bort ${movie.Title} från watchlist`}
                      title="Ta bort från watchlist"
                    >
                      <Trash2 size={14} aria-hidden="true" />
                      Ta bort
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
