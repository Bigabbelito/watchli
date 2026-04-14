import { Bookmark, BookmarkCheck } from 'lucide-react'

/**
 * Standalone watchlist toggle button for the detail page.
 */
export default function WatchlistButton({ movie, isInWatchlist, onToggle, size = 'md' }) {
  return (
    <button
      className={`watchlist-btn watchlist-btn--${size}${isInWatchlist ? ' watchlist-btn--saved' : ''}`}
      onClick={() => onToggle(movie)}
      aria-label={isInWatchlist ? `Ta bort ${movie.Title} från watchlist` : `Lägg till ${movie.Title} i watchlist`}
    >
      {isInWatchlist ? (
        <>
          <BookmarkCheck size={18} aria-hidden="true" />
          Sparad
        </>
      ) : (
        <>
          <Bookmark size={18} aria-hidden="true" />
          Lägg till watchlist
        </>
      )}
    </button>
  )
}
