import { useState, useEffect } from 'react'
import { fetchFavorites } from '../utils/api'

/**
 * Custom hook for fetching the curated favorites list.
 * Returns { movies, loading, error }
 */
export function useFavorites() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchFavorites()
        if (!cancelled) setMovies(data)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return { movies, loading, error }
}
