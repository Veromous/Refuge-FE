import PageHeader from '../components/PageHeader'
import { org } from '../data/content'

export default function Contact() {
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
                <span className="text-slate-400">Add your contact email here</span>
              </li>
              <li>
                <span className="block text-sm font-medium text-slate-900">Phone</span>
                <span className="text-slate-400">Add your contact phone here</span>
              </li>
            </ul>
          </div>

          {/* Form (visual placeholder) */}
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Send a message</h2>
            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-hope-500"
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-hope-500"
              />
              <textarea
                rows={4}
                placeholder="How can we help?"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-hope-500"
              />
              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-full bg-hope-600/60 px-8 py-3 font-semibold text-white"
              >
                Sending (coming soon)
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
