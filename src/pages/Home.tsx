import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import HeroImage from '../components/HeroImage'
import { objectives, focusAreas, org } from '../data/content'

export default function Home() {
  return (
    <>
      {/* Hero: full-bleed image with the text laid over it. The image runs to
          the right edge and up behind the (transparent) navbar. */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        <HeroImage cover />

        {/* Dark overlays for a stylish, readable finish */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />

        {/* Text on the picture */}
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-36 lg:pt-40">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {org.slogan}
            </h1>
            <div className="mx-auto mt-5 h-0.5 w-16 rounded-full bg-warm-500" />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-warm-400">
              {org.sloganVerse}
            </p>

            <p className="mt-6 text-lg text-white/90">
              Inspired by the story of Dorcas, a woman{' '}
              <span className="italic">“full of good works and acts of charity”</span> (Acts
              9:36-42), Refuge of Hope serves the needy and underprivileged through practical
              acts of love.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/donate"
                className="rounded-full bg-warm-500 px-8 py-3 text-base font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-warm-600 hover:shadow-lg"
              >
                Donate now
              </Link>
              <Link
                to="/about"
                className="rounded-full border border-white/70 px-8 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Our story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission strip */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-slate-900">Our Mission</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          Just as Dorcas clothed the widows and cared for the poor of her city, we exist to
          bring relief, empowerment and dignity to the vulnerable, meeting real needs in{' '}
          <strong className="text-slate-800">education, agriculture and health</strong> across{' '}
          {org.jurisdiction}.
        </p>
      </section>

      {/* Focus areas */}
      <section className="bg-hope-700 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {focusAreas.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm"
              >
                <h3 className="text-xl font-semibold text-hope-700">{f.title}</h3>
                <p className="mt-3 text-slate-600">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives preview */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">What guides us</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Six commitments shape everything we do.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {objectives.map((o) => (
            <div
              key={o.title}
              className="rounded-2xl border border-slate-100 bg-white p-6 text-left shadow-sm transition hover:shadow-md"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-hope-100">
                <o.Icon className="h-6 w-6 text-hope-700" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{o.title}</h3>
              <p className="mt-2 text-slate-600">{o.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/what-we-do"
            className="inline-flex items-center gap-1.5 font-semibold text-hope-700 hover:underline"
          >
            See how we serve
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Be someone’s refuge today</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Every contribution helps a family, a student, a farmer, a patient. Your generosity
            becomes hope in action.
          </p>
          <Link
            to="/donate"
            className="mt-8 inline-block rounded-full bg-warm-500 px-8 py-3 text-base font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-warm-600 hover:shadow-lg"
          >
            Make a donation
          </Link>
        </div>
      </section>
    </>
  )
}
