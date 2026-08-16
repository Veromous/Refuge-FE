import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Clock, XCircle, Loader2 } from 'lucide-react'
import { api } from '../lib/api'

interface Donation {
  reference: string
  provider: string
  amount: number
  currency: string
  status: 'PENDING' | 'SUCCESSFUL' | 'FAILED'
  donorName: string
  message: string | null
  createdAt: string
}

interface VerifyResponse {
  success: boolean
  donation: Donation
}

// Where the provider redirects the donor after checkout. We read our own
// reference from the URL and actively confirm the outcome with the backend
// (webhooks remain the source of truth, but this gives instant feedback).
export default function DonateStatus() {
  const [params] = useSearchParams()
  const reference = params.get('ref')

  const [loading, setLoading] = useState(true)
  const [donation, setDonation] = useState<Donation | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!reference) {
      setError('No donation reference was provided.')
      setLoading(false)
      return
    }

    let cancelled = false
    api
      .post<VerifyResponse>(`/donations/${encodeURIComponent(reference)}/verify`)
      .then((res) => {
        if (!cancelled) setDonation(res.donation)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Could not verify the donation.')
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
            <p className="mt-4 text-slate-600">Confirming your donation...</p>
          </div>
        )}

        {!loading && error && (
          <Result
            icon={<XCircle className="h-12 w-12 text-red-500" />}
            title="We couldn’t confirm your donation"
            body={error}
          />
        )}

        {!loading && donation?.status === 'SUCCESSFUL' && (
          <Result
            icon={<CheckCircle2 className="h-12 w-12 text-hope-600" />}
            title="Thank you for your gift"
            body={`Your donation of ${donation.amount.toLocaleString()} ${donation.currency} was received. You are now someone’s refuge.`}
          />
        )}

        {!loading && donation?.status === 'PENDING' && (
          <Result
            icon={<Clock className="h-12 w-12 text-warm-500" />}
            title="Your donation is being processed"
            body="This can take a moment. We’ll confirm it as soon as your payment clears. You can safely close this page."
          />
        )}

        {!loading && donation?.status === 'FAILED' && (
          <Result
            icon={<XCircle className="h-12 w-12 text-red-500" />}
            title="Your donation didn’t go through"
            body="No charge was completed. Please try again, and reach out if the problem continues."
          />
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/donate"
            className="rounded-full bg-warm-500 px-6 py-2.5 font-semibold text-white transition hover:bg-warm-600"
          >
            Back to donate
          </Link>
          <Link
            to="/"
            className="rounded-full border border-slate-200 px-6 py-2.5 font-semibold text-slate-700 transition hover:border-hope-500 hover:text-hope-700"
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
