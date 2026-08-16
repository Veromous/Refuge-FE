import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

// Placeholder sign-in page. The full flow (email/password + Google sign-in
// wired to the backend) is built in a later step.
export default function Login() {
  return (
    <>
      <PageHeader eyebrow="Welcome back" title="Sign in" />

      <section className="mx-auto max-w-md px-6 py-16">
        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-hope-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-hope-500"
            />
            <button
              type="button"
              disabled
              className="w-full cursor-not-allowed rounded-full bg-hope-600/60 px-8 py-3 font-semibold text-white"
            >
              Sign in (coming soon)
            </button>
          </div>

          <div className="my-6 flex items-center gap-3 text-sm text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            or
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            type="button"
            disabled
            className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-slate-200 px-8 py-3 font-medium text-slate-500"
          >
            Continue with Google (coming soon)
          </button>

          <p className="mt-6 text-center text-sm text-slate-500">
            New here?{' '}
            <Link to="/donate" className="font-semibold text-hope-700 hover:underline">
              Start by giving
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
