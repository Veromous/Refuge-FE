import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { objectives, focusAreas } from '../data/content'
import { causes } from '../data/causes'

const gospelCauses = causes.filter((c) => c.id !== 'GENERAL')

export default function WhatWeDo() {
  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="What We Do"
        subtitle="Turning compassion into concrete help for real people."
      />

      {/* Focus areas */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold text-slate-900">
          Three domains, one purpose
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          We concentrate our efforts where the need is greatest and the impact is lasting.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {focusAreas.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-hope-700">{f.title}</h3>
              <p className="mt-3 text-slate-600">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Objectives in detail */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-2xl font-bold text-slate-900">Our Commitments</h2>
          <div className="mt-10 space-y-4">
            {objectives.map((o) => (
              <div
                key={o.title}
                className="flex items-start gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-hope-100">
                  <o.Icon className="h-6 w-6 text-hope-700" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{o.title}</h3>
                  <p className="mt-1 text-slate-600">{o.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gospel & church support */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center">
          <span className="inline-block rounded-full bg-hope-100 px-4 py-1 text-sm font-medium text-hope-700">
            Faith in action
          </span>
          <h2 className="mt-4 text-2xl font-bold text-slate-900">Spreading the Gospel</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Beyond meeting physical needs, we carry hope to the soul. Your giving can go
            further than a meal: it can reach a heart, and hold up the hands of those who
            preach.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {gospelCauses.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-hope-100">
                <c.Icon className="h-6 w-6 text-hope-700" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{c.label}</h3>
              <p className="mt-2 text-slate-600">{c.description}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center italic text-slate-500">
          “Freely you have received; freely give.” (Matthew 10:8)
        </p>
        <div className="mt-8 text-center">
          <Link
            to="/donate"
            className="inline-block rounded-full bg-hope-700 px-8 py-3 text-base font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-hope-800 hover:shadow-lg"
          >
            Give toward the Gospel
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Help us do more</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Our work grows with every hand that joins it. Your gift helps us reach one more person
          in need.
        </p>
        <Link
          to="/donate"
          className="mt-8 inline-block rounded-full bg-warm-500 px-8 py-3 text-base font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-warm-600 hover:shadow-lg"
        >
          Support our work
        </Link>
      </section>
    </>
  )
}
