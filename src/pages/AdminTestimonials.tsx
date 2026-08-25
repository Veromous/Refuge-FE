import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Loader2, Check, X, Quote, RefreshCw } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { api } from '../lib/api'
import { useAuth } from '../context/AuthContext'

type Status = 'PENDING' | 'APPROVED' | 'REJECTED'

interface AdminTestimonial {
  id: string
  name: string
  role: string | null
  message: string
  status: Status
  createdAt: string
}

interface ListResponse {
  success: boolean
  testimonials: AdminTestimonial[]
}

const filters: Status[] = ['PENDING', 'APPROVED', 'REJECTED']

export default function AdminTestimonials() {
  const { user, loading: authLoading } = useAuth()

  const [filter, setFilter] = useState<Status>('PENDING')
  const [items, setItems] = useState<AdminTestimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // Bump to force a refetch (e.g. the Refresh button).
  const [reloadKey, setReloadKey] = useState(0)
  // Ids currently being approved/rejected, to disable their buttons.
  const [busy, setBusy] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // Wait for auth to resolve, and only fetch for admins.
    if (authLoading || user?.role !== 'ADMIN') return

    let cancelled = false
    setLoading(true)
    setError(null)
    api
      .get<ListResponse>(`/testimonials/admin?status=${filter}`)
      .then((res) => {
        if (!cancelled) setItems(res.testimonials)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Could not load testimonials.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [filter, authLoading, user, reloadKey])

  async function moderate(id: string, status: Status) {
    setBusy((b) => ({ ...b, [id]: true }))
    try {
      await api.patch(`/testimonials/${id}/status`, { status })
      // Drop it from the current list; it no longer matches this filter.
      setItems((list) => list.filter((t) => t.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update the testimonial.')
    } finally {
      setBusy((b) => ({ ...b, [id]: false }))
    }
  }

  // Gate the page: wait for auth, then require an admin.
  if (authLoading) {
    return (
      <div className="grid place-items-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-hope-600" />
      </div>
    )
  }
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'ADMIN') return <Navigate to="/" replace />

  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Testimonials"
        subtitle="Review submissions. Approved ones appear on the home page."
      />

      <section className="mx-auto max-w-4xl px-6 py-16">
        {/* Filter tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === f
                  ? 'bg-hope-600 text-white'
                  : 'border border-slate-200 text-slate-600 hover:border-hope-500 hover:text-hope-700'
              }`}
            >
              {f.charAt(0) + f.slice(1).toLowerCase()}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-hope-700"
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {error && (
          <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )}

        {loading ? (
          <div className="grid place-items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-hope-600" />
          </div>
        ) : items.length === 0 ? (
          <p className="py-20 text-center text-slate-500">
            No {filter.toLowerCase()} testimonials.
          </p>
        ) : (
          <div className="mt-8 space-y-4">
            {items.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <Quote className="h-6 w-6 text-warm-500" strokeWidth={1.5} />
                <p className="mt-3 text-slate-700">“{t.message}”</p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm">
                    <span className="font-semibold text-slate-900">{t.name}</span>
                    {t.role && <span className="text-slate-500"> — {t.role}</span>}
                    <span className="block text-xs text-slate-400">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {t.status !== 'APPROVED' && (
                      <button
                        type="button"
                        disabled={busy[t.id]}
                        onClick={() => moderate(t.id, 'APPROVED')}
                        className="inline-flex items-center gap-1.5 rounded-full bg-hope-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-hope-700 disabled:opacity-60"
                      >
                        <Check className="h-4 w-4" />
                        Approve
                      </button>
                    )}
                    {t.status !== 'REJECTED' && (
                      <button
                        type="button"
                        disabled={busy[t.id]}
                        onClick={() => moderate(t.id, 'REJECTED')}
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:text-red-600 disabled:opacity-60"
                      >
                        <X className="h-4 w-4" />
                        Reject
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
