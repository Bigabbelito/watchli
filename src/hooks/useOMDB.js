import { useState, useEffect } from 'react'
import { searchMovies, fetchMovieById } from '../utils/api'

/**
 * Custom hook for OMDB API calls.
 *
 * @param {'search' | 'detail'} type - Type of query
 * @param {string} param - Search query or imdbID
 * Returns { data, loading, error }
 */
export function useOMDB(type, param) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!param) {
      setData(null)
      setLoading(false)
      setError(null)
      return
    }

    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError(null)
        setData(null)

        let result
        if (type === 'search') {
          result = await searchMovies(param)
        } else if (type === 'detail') {
          result = await fetchMovieById(param)
        }

        if (!cancelled) setData(result)
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
  }, [type, param])

  return { data, loading, error }
}
