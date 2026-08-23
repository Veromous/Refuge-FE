import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Clock, XCircle, Loader2 } from 'lucide-react'
import { api } from '../lib/api'
import { causes } from '../data/causes'
import type { CauseId } from '../data/causes'

interface Partnership {
  reference: string
  provider: string
  amount: number
  currency: string
  status: 'PENDING' | 'SUCCESSFUL' | 'FAILED'
  cause: CauseId
  partnerName: string
  message: string | null
  createdAt: string
}

function causeLabel(id: CauseId): string {
  return causes.find((c) => c.id === id)?.label ?? ''
}

interface VerifyResponse {
  success: boolean
  partnership: Partnership
}

// Where the provider redirects the partner after checkout. We read our own
// reference from the URL and actively confirm the outcome with the backend
// (webhooks remain the source of truth, but this gives instant feedback).
export default function PartnerStatus() {
  const [params] = useSearchParams()
  const reference = params.get('ref')

  const [loading, setLoading] = useState(true)
  const [partnership, setPartnership] = useState<Partnership | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!reference) {
      setError('No partnership reference was provided.')
      setLoading(false)
      return
    }

    let cancelled = false
    api
      .post<VerifyResponse>(`/partnerships/${encodeURIComponent(reference)}/verify`)
      .then((res) => {
        if (!cancelled) setPartnership(res.partnership)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Could not verify the partnership.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [reference])

  return (
    <section className="mx-auto max-w-xl px-6 py-20">
      <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
        {loading && (
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 animate-spin text-hope-600" />
            <p className="mt-4 text-slate-600">Confirming your partnership...</p>
          </div>
        )}

        {!loading && error && (
          <Result
            icon={<XCircle className="h-12 w-12 text-red-500" />}
            title="We couldn’t confirm your partnership"
            body={error}
          />
        )}

        {!loading && partnership?.status === 'SUCCESSFUL' && (
          <Result
            icon={<CheckCircle2 className="h-12 w-12 text-hope-600" />}
            title="Thank you for your partnership"
            body={`Your partnership of ${partnership.amount.toLocaleString()} ${partnership.currency} toward ${causeLabel(partnership.cause)} was received. You are now someone’s refuge.`}
          />
        )}

        {!loading && partnership?.status === 'PENDING' && (
          <Result
            icon={<Clock className="h-12 w-12 text-warm-500" />}
            title="Your partnership is being processed"
            body="This can take a moment. We’ll confirm it as soon as your payment clears. You can safely close this page."
          />
        )}

        {!loading && partnership?.status === 'FAILED' && (
          <Result
            icon={<XCircle className="h-12 w-12 text-red-500" />}
            title="Your partnership didn’t go through"
            body="No charge was completed. Please try again, and reach out if the problem continues."
          />
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/partner"
            className="rounded-full bg-warm-500 px-6 py-2.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-warm-600 hover:shadow-lg"
          >
            Back to partner
          </Link>
          <Link
            to="/"
            className="rounded-full border border-slate-200 px-6 py-2.5 font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-hope-500 hover:text-hope-700"
          >
            Return home
          </Link>
        </div>

        {reference && (
          <p className="mt-6 text-xs text-slate-400">Reference: {reference}</p>
        )}
      </div>
    </section>
  )
}

function Result({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex flex-col items-center">
      {icon}
      <h1 className="mt-4 text-2xl font-bold text-slate-900">{title}</h1>
      <p className="mt-3 text-slate-600">{body}</p>
    </div>
  )
}
