import { Plus } from 'lucide-react'

const faqs = [
  {
    q: 'What is Refuge of Hope?',
    a: 'Refuge of Hope is a registered charity association based in Douala, Cameroon. Inspired by the story of Dorcas, we serve the needy and underprivileged through practical help in education, agriculture and health.',
  },
  {
    q: 'Who do you help?',
    a: 'We support vulnerable and underprivileged people in our communities, including children, families, students, farmers and those facing illness without adequate support.',
  },
  {
    q: 'Where do you operate?',
    a: 'Our home base is Bonanjo, Douala, in the Littoral Region. Our work reaches across Wouri Division, with room to grow into other parts of the country.',
  },
  {
    q: 'How can I donate?',
    a: 'You will soon be able to give securely online by card or Mobile Money through our Donate page. We are putting the finishing touches on secure payments.',
  },
  {
    q: 'Is my donation used well?',
    a: 'Yes. Gifts go directly toward our programs in education, agriculture and health. We are committed to transparency and good stewardship of every contribution.',
  },
  {
    q: 'Can I volunteer or partner with you?',
    a: 'Absolutely. We welcome volunteers, partners and honorary members who share our heart for service. Reach out through our Contact page to start a conversation.',
  },
]

// Reusable FAQ block. `scroll-mt-24` keeps the heading clear of the fixed
// navbar when linked to via #faqs.
export default function FaqSection() {
  return (
    <section id="faqs" className="scroll-mt-24 bg-slate-50 py-16">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Answers to the questions we hear most often.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-slate-900">
                {item.q}
                <Plus className="ml-4 h-5 w-5 shrink-0 text-hope-600 transition group-open:rotate-45" />
              </summary>
              <p className="mt-3 text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
