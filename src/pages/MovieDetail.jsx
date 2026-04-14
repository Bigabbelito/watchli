import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Star, Clock, Calendar, Award, Users, Video } from 'lucide-react'
import { useOMDB } from '../hooks/useOMDB'
import { useWatchlist } from '../hooks/useWatchlist'
import WatchlistButton from '../components/WatchlistButton'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

export default function MovieDetail() {
  const { imdbID } = useParams()
  const { data: movie, loading, error } = useOMDB('detail', imdbID)
  const { toggleWatchlist, isInWatchlist } = useWatchlist()

  const posterIsValid = movie?.Poster && movie.Poster !== 'N/A'

  // Normalize rating to number
  const rating = movie?.imdbRating && movie.imdbRating !== 'N/A'
    ? parseFloat(movie.imdbRating)
    : null

  return (
    <main id="main-content" className="page">
      <div className="container">
        {/* Back link */}
        <Link to="/" className="back-link" onClick={() => window.history.length > 2 && window.history.back()}>
          <ArrowLeft size={16} aria-hidden="true" />
          Tillbaka
        </Link>

        {loading && <LoadingSpinner label="Laddar filminfo..." />}
        {error && !loading && <ErrorMessage message={error} />}

        {movie && !loading && (
          <article className="detail fade-in-up" aria-label={`Filminfo: ${movie.Title}`}>
            {/* Hero backdrop */}
            <div className="detail__backdrop" aria-hidden="true">
              {posterIsValid && (
                <img
                  src={movie.Poster}
                  alt=""
                  className="detail__backdrop-img"
                />
              )}
              <div className="detail__backdrop-overlay" />
            </div>

            {/* Main content */}
            <div className="detail__content">
              {/* Poster */}
              <aside className="detail__poster-col" aria-label="Filmaffisch">
                {posterIsValid ? (
                  <img
                    className="detail__poster"
                    src={movie.Poster}
                    alt={`Filmaffisch för ${movie.Title}`}
                  />
                ) : (
                  <div className="detail__poster-placeholder" aria-hidden="true">
                    <Video size={48} />
                    <span>Ingen bild</span>
                  </div>
                )}

                {/* Watchlist button under poster */}
                <WatchlistButton
                  movie={{
                    imdbID: movie.imdbID,
                    Title: movie.Title,
                    Poster: movie.Poster,
                    Year: movie.Year,
                  }}
                  isInWatchlist={isInWatchlist(movie.imdbID)}
                  onToggle={toggleWatchlist}
                />
              </aside>

              {/* Info */}
              <section className="detail__info">
                {/* Badges */}
                <div className="detail__badges">
                  {movie.Genre &&
                    movie.Genre.split(',').map((g) => (
                      <span key={g.trim()} className="badge badge-accent">
                        {g.trim()}
                      </span>
                    ))}
                </div>

                <h1 className="detail__title">{movie.Title}</h1>

                {/* Quick stats */}
                <ul className="detail__stats" aria-label="Filmdetaljer">
                  {rating && (
                    <li className="detail__stat" title={`IMDb-betyg: ${movie.imdbRating}/10`}>
                      <Star size={16} className="detail__stat-icon detail__stat-icon--gold" aria-hidden="true" />
                      <strong>{movie.imdbRating}</strong>
                      <span className="detail__stat-label">/ 10 IMDb</span>
                    </li>
                  )}
                  {movie.Runtime && movie.Runtime !== 'N/A' && (
                    <li className="detail__stat">
                      <Clock size={16} className="detail__stat-icon" aria-hidden="true" />
                      <span>{movie.Runtime}</span>
                    </li>
                  )}
                  {movie.Year && (
                    <li className="detail__stat">
                      <Calendar size={16} className="detail__stat-icon" aria-hidden="true" />
                      <span>{movie.Year}</span>
                    </li>
                  )}
                  {movie.Rated && movie.Rated !== 'N/A' && (
                    <li className="detail__stat">
                      <span className="detail__rated">{movie.Rated}</span>
                    </li>
                  )}
                </ul>

                {/* Rating bar */}
                {rating && (
                  <div className="detail__rating-bar" aria-label={`Betyg: ${rating} av 10`}>
                    <div
                      className="detail__rating-fill"
                      style={{ width: `${(rating / 10) * 100}%` }}
                      aria-hidden="true"
                    />
                  </div>
                )}

                {/* Plot */}
                {movie.Plot && movie.Plot !== 'N/A' && (
                  <section aria-labelledby="plot-heading">
                    <h2 id="plot-heading" className="detail__section-heading">Handling</h2>
                    <p className="detail__plot">{movie.Plot}</p>
                  </section>
                )}

                {/* Crew */}
                <div className="detail__crew">
                  {movie.Director && movie.Director !== 'N/A' && (
                    <div className="detail__crew-item">
                      <Video size={14} aria-hidden="true" />
                      <span><strong>Regissör:</strong> {movie.Director}</span>
                    </div>
                  )}
                  {movie.Actors && movie.Actors !== 'N/A' && (
                    <div className="detail__crew-item">
                      <Users size={14} aria-hidden="true" />
                      <span><strong>Skådespelare:</strong> {movie.Actors}</span>
                    </div>
                  )}
                  {movie.Writer && movie.Writer !== 'N/A' && (
                    <div className="detail__crew-item">
                      <span>✍️</span>
                      <span><strong>Manusförfattare:</strong> {movie.Writer}</span>
                    </div>
                  )}
                </div>

                {/* Awards */}
                {movie.Awards && movie.Awards !== 'N/A' && (
                  <div className="detail__awards">
                    <Award size={16} aria-hidden="true" className="detail__stat-icon--gold" />
                    <span>{movie.Awards}</span>
                  </div>
                )}

                {/* Ratings from various sources */}
                {movie.Ratings && movie.Ratings.length > 0 && (
                  <section aria-labelledby="ratings-heading">
                    <h2 id="ratings-heading" className="detail__section-heading">Betyg</h2>
                    <ul className="detail__ratings-list">
                      {movie.Ratings.map((r) => (
                        <li key={r.Source} className="detail__rating-item">
                          <span className="detail__rating-source">{r.Source}</span>
                          <span className="detail__rating-value">{r.Value}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Additional info */}
                <dl className="detail__extra">
                  {movie.Language && movie.Language !== 'N/A' && (
                    <>
                      <dt>Språk</dt>
                      <dd>{movie.Language}</dd>
                    </>
                  )}
                  {movie.Country && movie.Country !== 'N/A' && (
                    <>
                      <dt>Land</dt>
                      <dd>{movie.Country}</dd>
                    </>
                  )}
                  {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                    <>
                      <dt>Box Office</dt>
                      <dd>{movie.BoxOffice}</dd>
                    </>
                  )}
                </dl>
              </section>
            </div>
          </article>
        )}
      </div>
    </main>
  )
}
