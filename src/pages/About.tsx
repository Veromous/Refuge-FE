import PageHeader from '../components/PageHeader'
import FaqSection from '../components/FaqSection'
import { leadership, org } from '../data/content'

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="Who we are"
        title="Our Story"
        subtitle="A community of people choosing compassion, again and again."
      />

      {/* The inspiration */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-bold text-slate-900">The heart behind the name</h2>
        <p className="mt-4 leading-relaxed text-slate-600">
          In the city of Joppa there lived a disciple named Dorcas, remembered in Scripture as
          a woman <span className="italic">“full of good works and acts of charity”</span>{' '}
          (Acts 9:36-42). She sewed garments for widows, cared for the poor, and wove her faith
          into the everyday needs of her neighbours. When she died, her community wept, for
          they had lost more than a friend; they had lost a refuge.
        </p>
        <p className="mt-4 leading-relaxed text-slate-600">
          Refuge of Hope Association carries that same spirit into our own time and place. We
          believe hope is not merely spoken; it is sewn, planted, taught and shared. Founded in{' '}
          {org.foundedYear} and based in {org.location}, we are a registered charity devoted to
          lifting up the vulnerable through practical, lasting help.
        </p>
      </section>

      {/* Vision & Mission */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto grid max-w-5xl gap-6 px-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-hope-700">Our Vision</h3>
            <p className="mt-3 text-slate-600">
              Communities where no one is left without help, and where dignity, opportunity and
              hope are within everyone’s reach.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-hope-700">Our Mission</h3>
            <p className="mt-3 text-slate-600">
              To assist needy and underprivileged persons through education, agriculture and
              health, while fostering solidarity, self-reliance and good citizenship.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Our Leadership</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            The executive council that guides the day-to-day work of the association.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((person) => (
            <div
              key={person.name}
              className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-hope-100 text-xl font-bold text-hope-700">
                {person.name
                  .split(' ')
                  .slice(0, 2)
                  .map((n) => n[0])
                  .join('')}
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{person.name}</h3>
              <p className="text-sm text-hope-700">{person.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* Legal note */}
      <section className="border-t border-slate-100 bg-white py-10">
        <p className="mx-auto max-w-3xl px-6 text-center text-sm text-slate-500">
          Refuge of Hope Association is a legally recognised association in the Republic of
          Cameroon, operating in {org.jurisdiction}, in conformity with the national law on
          freedom of association.
        </p>
      </section>
    </>
  )
}
