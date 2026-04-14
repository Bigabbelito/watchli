import { AlertTriangle } from 'lucide-react'

export default function ErrorMessage({ message = 'Något gick fel. Försök igen.' }) {
  return (
    <div className="error-box" role="alert">
      <div className="error-box__icon" aria-hidden="true">
        <AlertTriangle size={32} />
      </div>
      <p><strong>Fel:</strong> {message}</p>
    </div>
  )
}
