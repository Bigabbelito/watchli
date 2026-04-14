import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SearchPage from './pages/SearchPage'
import MovieDetail from './pages/MovieDetail'
import Watchlist from './pages/Watchlist'

/* Skip-to-main link for accessibility */
function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">
      Hoppa till innehåll
    </a>
  )
}

export default function App() {
  return (
    <>
      <SkipLink />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movie/:imdbID" element={<MovieDetail />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

function NotFound() {
  return (
    <main id="main-content" className="page">
      <div className="container">
        <div className="empty-state fade-in-up">
          <div className="empty-state__icon" aria-hidden="true">🎭</div>
          <h1 className="empty-state__title">404 — Sidan hittades inte</h1>
          <p className="empty-state__text">
            Den här sidan existerar inte. Kanske letade du efter en film?
          </p>
          <a href="/" className="btn btn-primary">Gå till startsidan</a>
        </div>
      </div>
    </main>
  )
}

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        <p className="footer__brand">
          🎬 <strong>WatchLi</strong>
        </p>
        <p className="footer__copy">
          Filmdata från{' '}
          <a href="https://www.omdbapi.com" target="_blank" rel="noopener noreferrer">
            OMDb API
          </a>
        </p>
      </div>
    </footer>
  )
}
