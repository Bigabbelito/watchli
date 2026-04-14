import MovieCard from './MovieCard'
import { useWatchlist } from '../hooks/useWatchlist'

/**
 * TopList — renders all curated favorite movies in a responsive grid.
 * @param {{ movies: Array }} props
 */
export default function TopList({ movies }) {
  const { toggleWatchlist, isInWatchlist } = useWatchlist()

  return (
    <section aria-labelledby="toplist-heading">
      <h2 id="toplist-heading" className="section-title">Rekommenderade filmer</h2>
      <div className="movie-grid" role="list">
        {movies.map((movie) => (
          <div key={movie.imdbID} role="listitem">
            <MovieCard
              movie={movie}
              onWatchlistToggle={toggleWatchlist}
              isInWatchlist={isInWatchlist(movie.imdbID)}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
