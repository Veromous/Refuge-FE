import PageHeader from '../components/PageHeader'

const presets = [2000, 5000, 10000, 25000]

export default function Donate() {
  return (
    <>
      <PageHeader
        eyebrow="Give hope"
        title="Make a Donation"
        subtitle="Your generosity becomes someone’s refuge: a meal, a lesson, a harvest, a healing."
      />

      <section className="mx-auto max-w-2xl px-6 py-16">
        <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Choose an amount (XAF)</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {presets.map((amount) => (
              <button
                key={amount}
                type="button"
                className="rounded-xl border border-slate-200 py-3 font-semibold text-slate-700 transition hover:border-hope-500 hover:text-hope-700"
              >
                {amount.toLocaleString()}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium text-slate-700">Or enter an amount</label>
            <input
              type="number"
              min="100"
              placeholder="Amount in XAF"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-hope-500"
            />
          </div>

          <button
            type="button"
            disabled
            className="mt-8 w-full cursor-not-allowed rounded-full bg-warm-500/60 px-8 py-3 font-semibold text-white"
          >
            Online giving (coming soon)
          </button>
          <p className="mt-4 text-center text-sm text-slate-500">
            We’re setting up secure online payments (card &amp; Mobile Money). This form will be
            fully active shortly. Thank you for your patience and your heart to give.
          </p>
        </div>
      </section>
    </>
  )
}
