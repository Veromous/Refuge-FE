// Shared site content for Refuge of Hope Association.
// Copy is drawn from the association's founding documents (objectives,
// Dorcas inspiration, Douala/Wouri location). Refine the wording freely.
import { Users, HeartHandshake, GraduationCap, Leaf, Scale, Cross } from 'lucide-react'

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
    title: 'Evangelism & Soul Winning',
    Icon: Cross,
    text: 'We carry the Good News to those who have never heard it, and we stand with growing churches and upcoming servants of Christ who have laid down everything for the Gospel.',
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
  slogan: 'A disciple of Christ abounding in good deeds and acts of charity',
  sloganVerse: 'Acts 9:36',
  location: 'Bonanjo, Douala, Wouri Division, Cameroon',
  email: 'refugeofhope101@outlook.com',
  phone: '+237 672659398',
  foundedYear: 2021,
  jurisdiction: 'Wouri Division and beyond',
}

// Sample testimonials shown on the home page. Replace the quotes and names with
// real, consented stories from the people the association has served.
export const testimonials = [
  {
    quote:
      'When I could no longer pay my school fees, Refuge of Hope stepped in. Today I am back in class and dreaming again.',
    name: 'Grace M.',
    role: 'Student, Douala',
  },
  {
    quote:
      'They taught our cooperative better farming methods and gave us seeds. Our last harvest fed our families and left enough to sell.',
    name: 'Emmanuel T.',
    role: 'Farmer, Wouri',
  },
  {
    quote:
      'During my illness the association covered my treatment and prayed with me. I felt seen, cared for, and truly loved.',
    name: 'Rebecca N.',
    role: 'Community member',
  },
]
