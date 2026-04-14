import { Bookmark, BookmarkCheck, Film } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

/**
 * Reusable movie card component.
 * @param {{ movie: Object, onWatchlistToggle: Function, isInWatchlist: boolean }} props
 * movie shape: { imdbID, Title, Poster, Year }
 */
export default function MovieCard({ movie, onWatchlistToggle, isInWatchlist }) {
  const navigate = useNavigate()
  const posterIsValid = movie.Poster && movie.Poster !== 'N/A'

  const handleCardClick = () => {
    navigate(`/movie/${movie.imdbID}`)
  }

  const handleWatchlistClick = (e) => {
    e.stopPropagation()
    if (onWatchlistToggle) {
      onWatchlistToggle(movie)
    }
  }

  return (
    <article
      className="movie-card"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
      aria-label={`${movie.Title}${movie.Year ? `, ${movie.Year}` : ''} — klicka för mer info`}
    >
      {/* Poster */}
      <div className="movie-card__poster-wrap">
        {posterIsValid ? (
          <img
            className="movie-card__poster"
            src={movie.Poster}
            alt={`Filmaffisch för ${movie.Title}`}
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        ) : null}
        <div
          className="movie-card__poster-placeholder"
          style={{ display: posterIsValid ? 'none' : 'flex' }}
          aria-hidden="true"
        >
          <Film size={32} />
          <span>Ingen bild</span>
        </div>

        {/* Hover overlay */}
        <div className="movie-card__overlay" aria-hidden="true">
          <button className="movie-card__overlay-btn">Visa detaljer</button>
        </div>
      </div>

      {/* Body */}
      <div className="movie-card__body">
        <h3 className="movie-card__title">{movie.Title}</h3>
        <div className="movie-card__meta">
          <span className="movie-card__year">{movie.Year || '—'}</span>
          {onWatchlistToggle && (
            <button
              className={`movie-card__watchlist-btn${isInWatchlist ? ' saved' : ''}`}
              onClick={handleWatchlistClick}
              aria-label={isInWatchlist ? `Ta bort ${movie.Title} från watchlist` : `Lägg till ${movie.Title} i watchlist`}
              title={isInWatchlist ? 'Ta bort från watchlist' : 'Lägg till i watchlist'}
            >
              {isInWatchlist
                ? <BookmarkCheck size={16} aria-hidden="true" />
                : <Bookmark size={16} aria-hidden="true" />
              }
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
