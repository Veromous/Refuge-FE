import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import WhatWeDo from './pages/WhatWeDo'
import Gallery from './pages/Gallery'
// Events page is hidden for now. Uncomment this import and its route below to show it.
// import Events from './pages/Events'
import Partner from './pages/Partner'
import PartnerStatus from './pages/PartnerStatus'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminTestimonials from './pages/AdminTestimonials'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="what-we-do" element={<WhatWeDo />} />
        <Route path="gallery" element={<Gallery />} />
        {/* Events page is hidden for now. Uncomment to enable it. */}
        {/* <Route path="events" element={<Events />} /> */}
        <Route path="partner" element={<Partner />} />
        <Route path="partner/status" element={<PartnerStatus />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="admin/testimonials" element={<AdminTestimonials />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
