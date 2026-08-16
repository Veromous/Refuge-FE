import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import { navLinks } from '../data/content'

// Fixed top navigation. On the home page it starts transparent over the hero
// image (white text) and turns solid white once the user scrolls. On every
// other page it is always solid white.
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Transparent only on the home hero, at the top, with the mobile menu closed.
  const transparent = isHome && !scrolled && !open

  const linkClass = ({ isActive }: { isActive: boolean }) => {
    const base = 'font-brand text-[17px] font-semibold transition'
    if (transparent) {
      return `${base} ${isActive ? 'text-white' : 'text-white/85 hover:text-white'}`
    }
    return `${base} ${isActive ? 'text-hope-700' : 'text-slate-800 hover:text-hope-700'}`
  }

  const signInClass = transparent
    ? 'font-brand text-[17px] font-semibold text-white/90 hover:text-white'
    : 'font-brand text-[17px] font-semibold text-slate-800 hover:text-hope-700'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        transparent
          ? 'bg-transparent'
          : 'border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Logo light={transparent} />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login" className={signInClass}>
            Sign in
          </Link>
          <Link
            to="/donate"
            className="rounded-full bg-warm-500 px-6 py-2.5 text-base font-semibold text-white shadow-sm transition hover:bg-warm-600"
          >
            Donate
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={`inline-flex h-10 w-10 items-center justify-center rounded-lg md:hidden ${
            transparent ? 'text-white' : 'text-slate-700'
          }`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu (always on a solid surface for readability) */}
      {open && (
        <nav className="border-t border-slate-100 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className="text-sm font-medium text-slate-600 hover:text-hope-700"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 flex items-center gap-3">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-600 hover:text-hope-700"
              >
                Sign in
              </Link>
              <Link
                to="/donate"
                onClick={() => setOpen(false)}
                className="rounded-full bg-warm-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-warm-600"
              >
                Donate
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
