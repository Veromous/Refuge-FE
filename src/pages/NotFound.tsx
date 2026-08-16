import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="text-6xl font-bold text-hope-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-600">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-full bg-hope-600 px-8 py-3 font-semibold text-white transition hover:bg-hope-700"
      >
        Back home
      </Link>
    </section>
  )
}
