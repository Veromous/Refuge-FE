import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, MapPin, ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { events, type EventItem } from '../data/events'

// One event card. Upcoming events invite people to join; past events show
// what happened, with a few photos.
function EventCard({ event, upcoming }: { event: EventItem; upcoming: boolean }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      {event.photos && event.photos.length > 0 && (
        <div className="grid grid-cols-4 gap-1">
          {event.photos.slice(0, 4).map((src) => (
            <img
              key={src}
              src={`/gallery/${src}`}
              alt=""
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          ))}
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-hope-700">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <CalendarDays className="h-4 w-4" />
            {event.dateLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-500">
            <MapPin className="h-4 w-4" />
            {event.location}
          </span>
        </div>
        <h3 className="mt-3 text-xl font-bold text-slate-900">{event.title}</h3>
        <p className="mt-2 leading-relaxed text-slate-600">{event.description}</p>
        {upcoming && (
          <Link
            to="/partner"
            className="mt-4 inline-flex items-center gap-1.5 font-semibold text-hope-700 hover:text-hope-800"
          >
            Support this event
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </article>
  )
}

export default function Events() {
  const { upcoming, past } = useMemo(() => {
    // Compare on date only, so an event happening today still counts as upcoming.
    const today = new Date().toISOString().slice(0, 10)
    const upcoming = events
      .filter((e) => e.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date))
    const past = events
      .filter((e) => e.date < today)
      .sort((a, b) => b.date.localeCompare(a.date))
    return { upcoming, past }
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="Come and be part of it"
        title="Events"
        subtitle="The outreaches and gatherings through which we bring hope to our communities."
      />

      <section className="mx-auto max-w-5xl px-6 py-16">
        {/* Upcoming */}
        <h2 className="text-2xl font-bold text-slate-900">Upcoming events</h2>
        {upcoming.length === 0 ? (
          <p className="mt-4 text-slate-600">
            No events are scheduled right now. Please check back soon, or{' '}
            <Link to="/partner" className="font-semibold text-hope-700 hover:text-hope-800">
              partner with us
            </Link>{' '}
            to help make the next one happen.
          </p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {upcoming.map((e) => (
              <EventCard key={e.date + e.title} event={e} upcoming />
            ))}
          </div>
        )}

        {/* Past */}
        {past.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900">Past events</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {past.map((e) => (
                <EventCard key={e.date + e.title} event={e} upcoming={false} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}
