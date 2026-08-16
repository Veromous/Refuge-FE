import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaXTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa6'
import Logo from './Logo'
import { org } from '../data/content'

// Social links are placeholders for now; real URLs will be added later.
const socials = [
  { label: 'Facebook', Icon: FaFacebookF },
  { label: 'Instagram', Icon: FaInstagram },
  { label: 'X (Twitter)', Icon: FaXTwitter },
  { label: 'WhatsApp', Icon: FaWhatsapp },
  { label: 'YouTube', Icon: FaYoutube },
]

const exploreLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/what-we-do', label: 'What We Do' },
]

const supportLinks = [
  { to: '/donate', label: 'Donate' },
  { to: '/about#faqs', label: 'FAQs' },
  { to: '/contact', label: 'Contact Us' },
]

interface FooterLink {
  to: string
  label: string
}

function LinkColumn({ heading, links }: { heading: string; links: FooterLink[] }) {
  return (
    <div>
      <h4 className="font-brand text-sm font-semibold uppercase tracking-wide text-white">
        {heading}
      </h4>
      <ul className="mt-4 space-y-2 text-sm text-hope-200">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="transition hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="mt-auto bg-hope-900 text-hope-100">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Left column: brand, address, socials */}
          <div>
            <Logo light />
            <div className="mt-5 space-y-1 text-sm text-hope-200">
              <p className="font-brand text-base font-semibold text-white">Refuge of Hope</p>
              <p>Bonanjo, Douala</p>
              <p>Littoral, Cameroon</p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-hope-800 text-hope-100 transition hover:bg-white hover:text-hope-800"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Right column: links in two groups */}
          <div className="grid grid-cols-2 gap-8 md:justify-items-end">
            <LinkColumn heading="Explore" links={exploreLinks} />
            <LinkColumn heading="Support" links={supportLinks} />
          </div>
        </div>

        <div className="mt-12 border-t border-hope-800 pt-6 text-sm text-hope-300">
          © {new Date().getFullYear()} {org.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
