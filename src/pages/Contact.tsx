import { useState } from 'react'
import { AlertCircle, Send } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { org } from '../data/content'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email and message.')
      return
    }

    // Open the visitor's email app with a message pre-addressed to the
    // association, pre-filled with their details.
    const subject = `Message from ${name.trim()} via the website`
    const body = `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
    window.location.href = `mailto:${org.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact Us"
        subtitle="We would love to hear from you, whether you want to help, partner, or simply learn more."
      />

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Details */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Reach the association</h2>
            <ul className="mt-6 space-y-4 text-slate-600">
              <li>
                <span className="block text-sm font-medium text-slate-900">Location</span>
                {org.location}
              </li>
              <li>
                <span className="block text-sm font-medium text-slate-900">Area of work</span>
                {org.jurisdiction}
              </li>
              <li>
                <span className="block text-sm font-medium text-slate-900">Email</span>
                <a href={`mailto:${org.email}`} className="text-hope-700 transition hover:text-hope-800 hover:underline">
                  {org.email}
                </a>
              </li>
              <li>
                <span className="block text-sm font-medium text-slate-900">Phone</span>
                <a href={`tel:${org.phone.replace(/\s+/g, '')}`} className="text-hope-700 transition hover:text-hope-800 hover:underline">
                  {org.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Message form */}
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Send a message</h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-hope-500"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                autoComplete="email"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-hope-500"
              />
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help?"
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
                className="flex w-full items-center justify-center gap-2 rounded-full bg-hope-600 px-8 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-hope-700 hover:shadow-lg"
              >
                <Send className="h-4 w-4" />
                Send message
              </button>
              <p className="text-center text-xs text-slate-400">
                This opens your email app with the message ready to send to {org.email}.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
