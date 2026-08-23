import { useEffect, useState } from 'react'
import { Quote, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { api } from '../lib/api'
import { testimonials as sampleTestimonials } from '../data/content'

interface TestimonialItem {
  name: string
  role: string | null
  text: string
}

interface ApiTestimonial {
  id: string
  name: string
  role: string | null
  message: string
  createdAt: string
}

interface ListResponse {
  success: boolean
  testimonials: ApiTestimonial[]
}

// Fallback shown until (or unless) approved testimonials come back from the API.
const fallback: TestimonialItem[] = sampleTestimonials.map((t) => ({
  name: t.name,
  role: t.role,
  text: t.quote,
}))

// Home-page testimonials: displays approved stories and lets visitors submit
// their own (held for review before they appear).
export default function Testimonials() {
  const [items, setItems] = useState<TestimonialItem[]>(fallback)

  useEffect(() => {
    let cancelled = false
    api
      .get<ListResponse>('/testimonials')
      .then((res) => {
        if (cancelled || !res.testimonials?.length) return
        setItems(res.testimonials.map((t) => ({ name: t.name, role: t.role, text: t.message })))
      })
      .catch(() => {
        // Keep the fallback samples if the API is unavailable.
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="bg-hope-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">Voices of hope</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Real lives touched through education, agriculture, health and the Gospel.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <figure
              key={`${t.name}-${i}`}
              className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-8 text-left shadow-sm transition hover:shadow-md"
            >
              <Quote className="h-8 w-8 text-warm-500" strokeWidth={1.5} />
              <blockquote className="mt-4 flex-1 text-slate-600">“{t.text}”</blockquote>
              <figcaption className="mt-6">
                <span className="block font-semibold text-slate-900">{t.name}</span>
                {t.role && <span className="text-sm text-slate-500">{t.role}</span>}
              </figcaption>
            </figure>
          ))}
        </div>

        <TestimonialForm />
      </div>
    </section>
  )
}

// Submission form. Posts to the API; the testimonial is stored for review and
// only appears above once an admin approves it.
function TestimonialForm() {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }
    if (message.trim().length < 10) {
      setError('Please share a little more (at least 10 characters).')
      return
    }

    setLoading(true)
    try {
      await api.post('/testimonials', {
        name: name.trim(),
        role: role.trim() || undefined,
        message: message.trim(),
      })
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not submit your testimonial.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
      <h3 className="text-center text-xl font-semibold text-slate-900">Share your story</h3>
      <p className="mx-auto mt-2 max-w-md text-center text-sm text-slate-500">
        Has Refuge of Hope touched your life? Tell us about it. Submissions are reviewed before
        they appear here.
      </p>

      {submitted ? (
        <div className="mt-8 flex flex-col items-center text-center">
          <CheckCircle2 className="h-12 w-12 text-hope-600" />
          <p className="mt-4 font-semibold text-slate-900">Thank you for sharing.</p>
          <p className="mt-1 text-sm text-slate-600">
            Your testimonial has been submitted and will appear once it is approved.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={80}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-hope-500"
          />
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role or location (optional) — e.g. Student, Douala"
            maxLength={80}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-hope-500"
          />
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your story"
            maxLength={600}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-hope-500"
          />

          {error && (
            <div className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-warm-500 px-8 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-warm-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
            {loading ? 'Submitting...' : 'Submit testimonial'}
          </button>
        </form>
      )}
    </div>
  )
}
