import { useFavorites } from '../hooks/useFavorites'
import TrailerCarousel from '../components/TrailerCarousel'
import TopList from '../components/TopList'
import SearchBar from '../components/SearchBar'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { Clapperboard, TrendingUp } from 'lucide-react'

export default function Home() {
  const { movies, loading, error } = useFavorites()

  return (
    <main id="main-content">
      {/* Hero Section */}
      <section className="hero" aria-labelledby="hero-heading">
        {/* Trailer Carousel */}
        {loading ? (
          <div className="hero__carousel-loader">
            <LoadingSpinner label="Laddar trailers..." />
          </div>
        ) : error ? (
          <div className="container" style={{ padding: '2rem 0' }}>
            <ErrorMessage message={error} />
          </div>
        ) : (
          <TrailerCarousel movies={movies} />
        )}

        {/* Hero text overlay on top of carousel */}
        <div className="hero__content" aria-hidden={loading}>
          <div className="container">
            <div className="hero__text">
              <div className="hero__eyebrow">
                <Clapperboard size={16} aria-hidden="true" />
                <span>Din cineastiska destination</span>
              </div>
              <h1 id="hero-heading" className="hero__title">
                Hitta din nästa<br />
                <span className="gradient-text">favoritfilm</span>
              </h1>
              <p className="hero__subtitle">
                Utforska tusentals filmer, se trailers och bygg din personliga watchlist.
              </p>
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Top Picks Section */}
      <section className="page-section">
        <div className="container">
          <div className="section-header">
            <TrendingUp size={20} className="section-header__icon" aria-hidden="true" />
            <span className="section-header__label">Kuraterade toppval</span>
          </div>
          {loading ? (
            <LoadingSpinner label="Laddar topplistor..." />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <TopList movies={movies} />
          )}
        </div>
      </section>
    </main>
  )
}
