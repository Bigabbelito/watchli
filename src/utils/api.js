// API Configuration for WatchLi

export const OMDB_API_KEY = 'trilogy'
export const OMDB_BASE = 'https://www.omdbapi.com'
export const FAVORITES_API = 'https://santosnr6.github.io/Data/favoritemovies.json'

/**
 * Broad search — returns list of movies matching a query string
 * @param {string} query
 * @returns {Promise<{Search: Array, totalResults: string, Response: string}>}
 */
export async function searchMovies(query) {
  if (!query || query.trim().length < 2) {
    throw new Error('Sökfrasen måste vara minst 2 tecken.')
  }
  const url = `${OMDB_BASE}/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query.trim())}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Nätverksfel: ${res.status}`)
  const data = await res.json()
  if (data.Response === 'False') throw new Error(data.Error || 'Inga resultat hittades.')
  return data
}

/**
 * Fetch full details for a single movie by imdbID
 * @param {string} imdbID
 * @returns {Promise<Object>} Full movie object
 */
export async function fetchMovieById(imdbID) {
  if (!imdbID) throw new Error('Ogiltigt film-ID.')
  const url = `${OMDB_BASE}/?apikey=${OMDB_API_KEY}&plot=full&i=${imdbID}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Nätverksfel: ${res.status}`)
  const data = await res.json()
  if (data.Response === 'False') throw new Error(data.Error || 'Filmen hittades inte.')
  return data
}

/**
 * Fetch curated favorite movies list
 * @returns {Promise<Array>}
 */
export async function fetchFavorites() {
  const res = await fetch(FAVORITES_API)
  if (!res.ok) throw new Error(`Nätverksfel: ${res.status}`)
  return res.json()
}

/**
 * Pick N random items from an array (without mutation)
 * @param {Array} arr
 * @param {number} n
 */
export function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}
