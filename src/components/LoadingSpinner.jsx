export default function LoadingSpinner({ label = 'Laddar...' }) {
  return (
    <div className="spinner-wrap" role="status" aria-label={label}>
      <div className="spinner" aria-hidden="true" />
    </div>
  )
}
