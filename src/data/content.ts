// Shared site content for Refuge of Hope Association.
// Copy is drawn from the association's founding documents (objectives,
// Dorcas inspiration, Douala/Wouri location). Refine the wording freely.
import { Users, HeartHandshake, GraduationCap, Leaf, Scale } from 'lucide-react'

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/what-we-do', label: 'What We Do' },
  { to: '/contact', label: 'Contact Us' },
]

export const objectives = [
  {
    title: 'Solidarity & Unity',
    Icon: Users,
    text: 'We bring people together to foster solidarity, unity, self-reliance and a spirit of genuine benevolence.',
  },
  {
    title: 'Help for the Needy',
    Icon: HeartHandshake,
    text: 'We assist needy and underprivileged persons in our communities across three vital domains: education, agriculture and health.',
  },
  {
    title: 'Livelihood Workshops',
    Icon: GraduationCap,
    text: 'We organize educative workshops that equip people with the skills to build sustainable, dignified livelihoods.',
  },
  {
    title: 'Peace & Environment',
    Icon: Leaf,
    text: 'We support our community in keeping peace, order and a clean, healthy environment for everyone.',
  },
  {
    title: 'Good Governance',
    Icon: Scale,
    text: 'We promote the ideals of good governance, responsible citizenship and respect for human rights.',
  },
]

export const focusAreas = [
  {
    title: 'Education',
    text: 'Supporting learners with the resources and encouragement to stay in school and thrive.',
  },
  {
    title: 'Agriculture',
    text: 'Helping families grow food and income through better farming knowledge and support.',
  },
  {
    title: 'Health',
    text: 'Bringing care, awareness and relief to those facing illness without adequate support.',
  },
]

export const leadership = [
  { name: 'Koti Ashiho Akwenmah', role: 'President' },
  { name: 'Motegue Valerie Fedjio Françoise', role: 'Vice President' },
  { name: 'Mulien Ngwambo Loveline', role: 'Secretary General' },
  { name: 'Nyamjoh Isaac Kongnyuy', role: 'Treasurer' },
  { name: 'Bake Nebare Prudencia', role: 'Adviser' },
  { name: 'Ngo Yomkil Therese', role: 'Public Relations Officer' },
]

export const org = {
  name: 'Refuge of Hope Association',
  tagline: 'Restoring hope and dignity to the vulnerable.',
  location: 'Bonanjo, Douala, Wouri Division, Cameroon',
  foundedYear: 2021,
  jurisdiction: 'Wouri Division and beyond',
}
