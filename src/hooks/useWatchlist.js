import { useState, useEffect } from 'react'

const STORAGE_KEY = 'watchli_watchlist'

/**
 * Custom hook for managing the watchlist in localStorage.
 * Returns { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }
 */
export function useWatchlist() {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Sync to localStorage whenever watchlist changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist))
    } catch (err) {
      console.error('Kunde inte spara watchlist:', err)
    }
  }, [watchlist])

  const isInWatchlist = (imdbID) =>
    watchlist.some((m) => m.imdbID === imdbID)

  const addToWatchlist = (movie) => {
    if (!isInWatchlist(movie.imdbID)) {
      setWatchlist((prev) => [...prev, movie])
    }
  }

  const removeFromWatchlist = (imdbID) => {
    setWatchlist((prev) => prev.filter((m) => m.imdbID !== imdbID))
  }

  const toggleWatchlist = (movie) => {
    if (isInWatchlist(movie.imdbID)) {
      removeFromWatchlist(movie.imdbID)
    } else {
      addToWatchlist(movie)
    }
  }

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    isInWatchlist,
  }
}
