import { useState } from 'react'
import { Loader2, AlertCircle, Wallet, Smartphone } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import CopyField from '../components/CopyField'
import { api } from '../lib/api'
import { cryptoAddresses, mobileMoney, givingIsPlaceholder } from '../data/giving'
import { causes, defaultCauseId } from '../data/causes'
import type { CauseId } from '../data/causes'

const presets = [2000, 5000, 10000, 25000]

interface InitializeResponse {
  success: boolean
  checkoutUrl: string
  reference: string
}

export default function Donate() {
  const [amount, setAmount] = useState<number | ''>(5000)
  const [cause, setCause] = useState<CauseId>(defaultCauseId)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (amount === '' || amount < 100) {
      setError('Please enter an amount of at least 100 XAF.')
      return
    }
    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email.')
      return
    }

    setLoading(true)
    try {
      const res = await api.post<InitializeResponse>('/donations', {
        amount,
        cause,
        name: name.trim(),
        email: email.trim(),
        message: message.trim() || undefined,
        provider: 'NOTCHPAY',
      })
      // Hand off to NotchPay's secure hosted checkout.
      window.location.href = res.checkoutUrl
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not start the payment.')
      setLoading(false)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Give hope"
        title="Make a Donation"
        subtitle="Your generosity becomes someone’s refuge: a meal, a lesson, a harvest, a healing."
      />

      <section className="mx-auto max-w-2xl px-6 py-16">
        {/* Online donation via NotchPay */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-slate-900">Direct your gift</h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose the work you would like your donation to support.
          </p>
          <div className="mt-5 grid gap-3">
            {causes.map((c) => {
              const active = cause === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCause(c.id)}
                  aria-pressed={active}
                  className={`flex items-start gap-4 rounded-xl border p-4 text-left transition ${
                    active
                      ? 'border-hope-500 bg-hope-50'
                      : 'border-slate-200 hover:border-hope-500'
                  }`}
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${
                      active ? 'bg-hope-500 text-white' : 'bg-hope-100 text-hope-700'
                    }`}
                  >
                    <c.Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span>
                    <span
                      className={`block font-semibold ${
                        active ? 'text-hope-700' : 'text-slate-900'
                      }`}
                    >
                      {c.label}
                    </span>
                    <span className="mt-0.5 block text-sm text-slate-600">{c.short}</span>
                  </span>
                </button>
              )
            })}
          </div>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">Choose an amount (XAF)</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {presets.map((preset) => {
              const active = amount === preset
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(preset)}
                  className={`rounded-xl border py-3 font-semibold transition ${
                    active
                      ? 'border-hope-500 bg-hope-50 text-hope-700'
                      : 'border-slate-200 text-slate-700 hover:border-hope-500 hover:text-hope-700'
                  }`}
                >
                  {preset.toLocaleString()}
                </button>
              )
            })}
          </div>

          <div className="mt-6">
            <label htmlFor="amount" className="text-sm font-medium text-slate-700">
              Or enter an amount
            </label>
            <input
              id="amount"
              type="number"
              min="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="Amount in XAF"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-hope-500"
            />
          </div>

          <h2 className="mt-8 text-xl font-semibold text-slate-900">Your details</h2>
          <div className="mt-4 space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              autoComplete="name"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-hope-500"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              autoComplete="email"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-hope-500"
            />
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Leave a message (optional)"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-hope-500"
            />
          </div>

          {error && (
            <div className="mt-6 flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-warm-500 px-8 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-warm-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
            {loading ? 'Redirecting to secure checkout...' : 'Donate with Mobile Money'}
          </button>
          <p className="mt-4 text-center text-sm text-slate-500">
            You will be taken to a secure NotchPay page to complete your gift.
          </p>
        </form>

        {/* Direct giving: crypto + Mobile Money */}
        <div className="mt-12">
          <div className="flex items-center gap-3 text-sm font-medium text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            Prefer to give directly?
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          {givingIsPlaceholder && (
            <div className="mt-8 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                The Mobile Money number and crypto addresses below are sample placeholders, not
                real. Do not send funds to them yet.
              </span>
            </div>
          )}

          {/* Mobile Money */}
          <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-hope-100 text-hope-700">
                <Smartphone className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="text-lg font-semibold text-slate-900">Mobile Money</h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Send from anywhere directly to our Mobile Money number.
            </p>
            <div className="mt-4">
              <CopyField value={mobileMoney.number} />
            </div>
            <div className="mt-3 text-sm text-slate-600">
              <p>
                <span className="font-medium text-slate-900">Account name:</span>{' '}
                {mobileMoney.accountName}
              </p>
              <p className="mt-1 text-slate-500">{mobileMoney.note}</p>
            </div>
          </div>

          {/* Crypto */}
          <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-hope-100 text-hope-700">
                <Wallet className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="text-lg font-semibold text-slate-900">Cryptocurrency</h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Give in crypto by sending to one of the wallet addresses below. Please double-check
              the network before sending.
            </p>
            <div className="mt-5 space-y-5">
              {cryptoAddresses.map((coin) => (
                <div key={coin.symbol}>
                  <p className="text-sm font-medium text-slate-900">
                    {coin.name}{' '}
                    <span className="font-normal text-slate-500">
                      ({coin.symbol} · {coin.network})
                    </span>
                  </p>
                  <div className="mt-1">
                    <CopyField value={coin.address} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            For direct gifts, please email us so we can thank you and record your donation.
          </p>
        </div>
      </section>
    </>
  )
}
