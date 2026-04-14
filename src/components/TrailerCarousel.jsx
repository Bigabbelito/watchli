import { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { pickRandom } from '../utils/api'

/**
 * TrailerCarousel — displays 5 random trailers from the favorites list.
 * Uses embla-carousel-react for smooth draggable slides.
 * @param {{ movies: Array }} props
 */
export default function TrailerCarousel({ movies }) {
  const [slides, setSlides] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [playing, setPlaying] = useState(null) // imdbID of currently playing trailer

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 8000, stopOnInteraction: true }),
  ])

  // Pick 5 random trailers on mount
  useEffect(() => {
    if (movies.length > 0) {
      setSlides(pickRandom(movies, 5))
    }
  }, [movies])

  // Track selected index
  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setActiveIndex(emblaApi.selectedScrollSnap())
    setPlaying(null) // stop iframe when sliding
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi, onSelect])

  const scrollPrev = () => {
    setPlaying(null)
    emblaApi?.scrollPrev()
  }
  const scrollNext = () => {
    setPlaying(null)
    emblaApi?.scrollNext()
  }
  const scrollTo = (index) => {
    setPlaying(null)
    emblaApi?.scrollTo(index)
  }

  if (slides.length === 0) return null

  return (
    <section className="trailer-carousel" aria-label="Filmtrailer-karusell">
      <div className="trailer-carousel__viewport" ref={emblaRef}>
        <div className="trailer-carousel__container" role="list">
          {slides.map((movie, i) => (
            <div
              key={movie.imdbID}
              className="trailer-carousel__slide"
              role="listitem"
              aria-label={`Trailer ${i + 1} av ${slides.length}: ${movie.Title}`}
            >
              {/* Thumbnail / iframe toggle */}
              {playing === movie.imdbID ? (
                <iframe
                  className="trailer-carousel__iframe"
                  src={`${movie.Trailer_link}?autoplay=1&rel=0&modestbranding=1`}
                  title={`Trailer för ${movie.Title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div
                  className="trailer-carousel__thumbnail"
                  onClick={() => setPlaying(movie.imdbID)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setPlaying(movie.imdbID)}
                  aria-label={`Spela trailer för ${movie.Title}`}
                >
                  {/* Poster as background */}
                  {movie.Poster && movie.Poster !== 'N/A' ? (
                    <img
                      className="trailer-carousel__bg"
                      src={movie.Poster}
                      alt={`Filmaffisch för ${movie.Title}`}
                    />
                  ) : (
                    <div className="trailer-carousel__bg-fallback" aria-hidden="true" />
                  )}
                  <div className="trailer-carousel__overlay" aria-hidden="true" />

                  {/* Play button */}
                  <div className="trailer-carousel__play-btn" aria-hidden="true">
                    <Play size={28} fill="currentColor" />
                  </div>

                  {/* Movie info */}
                  <div className="trailer-carousel__info">
                    <span className="trailer-carousel__label">🎬 Trailer</span>
                    <h2 className="trailer-carousel__title">{movie.Title}</h2>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Prev/Next Buttons */}
      <button
        className="trailer-carousel__btn trailer-carousel__btn--prev"
        onClick={scrollPrev}
        aria-label="Föregående trailer"
      >
        <ChevronLeft size={24} aria-hidden="true" />
      </button>
      <button
        className="trailer-carousel__btn trailer-carousel__btn--next"
        onClick={scrollNext}
        aria-label="Nästa trailer"
      >
        <ChevronRight size={24} aria-hidden="true" />
      </button>

      {/* Dot indicators */}
      <div className="trailer-carousel__dots" role="tablist" aria-label="Välj trailer">
        {slides.map((movie, i) => (
          <button
            key={movie.imdbID}
            className={`trailer-carousel__dot${i === activeIndex ? ' active' : ''}`}
            onClick={() => scrollTo(i)}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Gå till trailer ${i + 1}: ${movie.Title}`}
          />
        ))}
      </div>
    </section>
  )
}
