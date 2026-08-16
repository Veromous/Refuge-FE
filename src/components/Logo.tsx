import { useState } from 'react'
import { Link } from 'react-router-dom'

// Brand logo. Attempts to load /logo.png (place your file at
// frontend/public/logo.png) and gracefully falls back to a lettermark
// badge until that file exists.
// `light` renders the wordmark for use on dark backgrounds (e.g. the footer).
interface LogoProps {
  compact?: boolean
  light?: boolean
}

export default function Logo({ compact = false, light = false }: LogoProps) {
  const [imgOk, setImgOk] = useState(true)

  return (
    <Link to="/" className="flex items-center gap-2" aria-label="Refuge of Hope home">
      {imgOk ? (
        <img
          src="/logo.png"
          alt="Refuge of Hope logo"
          className="h-10 w-10 rounded-full object-cover"
          onError={() => setImgOk(false)}
        />
      ) : (
        <div
          className={`grid h-10 w-10 place-items-center rounded-full font-bold ${
            light ? 'bg-white text-hope-700' : 'bg-hope-600 text-white'
          }`}
        >
          R
        </div>
      )}
      {!compact && (
        <span
          className={`font-brand text-lg font-semibold ${
            light ? 'text-white' : 'text-hope-800'
          }`}
        >
          Refuge of Hope
        </span>
      )}
    </Link>
  )
}
