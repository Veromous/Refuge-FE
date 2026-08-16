import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

// Shared shell: navbar + page content + footer.
// Also scrolls to top whenever the route changes.
export default function Layout() {
  const { pathname, hash } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    // If the URL has a #section, scroll to it; otherwise go to the top.
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-700">
      <Navbar />
      {/* Home hero sits under the transparent navbar; other pages need
          top spacing to clear the fixed navbar. */}
      <main className={`flex-1 ${isHome ? '' : 'pt-24'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
